import { useRef, useEffect } from 'react'

const VERT_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG_SRC = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = rand(i);
  float b = rand(i + vec2(1.0, 0.0));
  float c = rand(i + vec2(0.0, 1.0));
  float d = rand(i + vec2(1.0, 1.0));
  return mix(a, b, f.x) + (c - a) * f.y * (1.0 - f.x) + (d - b) * f.x * f.y;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * 0.00028;
  vec2 slow = vec2(t * 0.7, t * 0.45);

  vec2 p1 = vec2(0.5 + sin(slow.x) * 0.22 + cos(slow.y * 0.73) * 0.08, 0.48 + cos(slow.x * 0.86) * 0.17 + sin(slow.y * 1.1) * 0.06);
  vec2 p2 = vec2(0.35 + cos(slow.x * 1.13 + 2.0) * 0.19 + sin(slow.y * 0.61 + 1.0) * 0.07, 0.55 + sin(slow.x * 0.79 + 4.0) * 0.15 + cos(slow.y * 1.27 + 3.0) * 0.06);
  vec2 p3 = vec2(0.65 + sin(slow.x * 0.91 + 5.0) * 0.18 + cos(slow.y * 1.09 + 2.0) * 0.07, 0.42 + cos(slow.x * 1.21 + 1.0) * 0.14 + sin(slow.y * 0.83 + 4.0) * 0.06);
  vec2 p4 = vec2(0.5 + cos(slow.x * 1.07 + 3.0) * 0.14 + sin(slow.y * 0.97 + 5.0) * 0.07, 0.6 + sin(slow.x * 0.67 + 6.0) * 0.12 + cos(slow.y * 1.31 + 1.0) * 0.06);

  float d1 = distance(uv, p1);
  float d2 = distance(uv, p2);
  float d3 = distance(uv, p3);
  float d4 = distance(uv, p4);

  float blend = smin(d1, d2, 0.35);
  blend = smin(blend, d3, 0.35);
  blend = smin(blend, d4, 0.35);

  float mask = smoothstep(0.75, 0.0, blend);

  float m1 = smoothstep(0.55, 0.0, d1);
  float m2 = smoothstep(0.55, 0.0, d2);
  float m3 = smoothstep(0.55, 0.0, d3);
  float m4 = smoothstep(0.55, 0.0, d4);

  float total = m1 + m2 + m3 + m4 + 0.0001;
  m1 /= total;
  m2 /= total;
  m3 /= total;
  m4 /= total;

  vec3 base1 = mix(u_color1, u_color2, noise(uv * 1.8 + slow * 0.5) * 0.6 + 0.3);
  vec3 base2 = mix(u_color2, u_color3, noise(uv * 2.1 + slow * 0.4 + 50.0) * 0.6 + 0.3);
  vec3 base3 = mix(u_color3, u_color4, noise(uv * 1.9 + slow * 0.6 + 100.0) * 0.6 + 0.3);
  vec3 base4 = mix(u_color4, u_color1, noise(uv * 2.2 + slow * 0.45 + 150.0) * 0.6 + 0.3);

  vec3 organic = base1 * m1 + base2 * m2 + base3 * m3 + base4 * m4;
  vec3 fieldColor = mix(organic, vec3(1.0), 0.25);

  float centerGlow = exp(-blend * blend * 3.5);
  vec3 glowColor = vec3(1.0, 0.98, 0.94) * centerGlow * 0.5;

  vec3 col = fieldColor * mask + glowColor * (1.0 - mask);

  vec2 hC = vec2(0.5 + sin(slow.x * 1.5 + 3.0) * 0.18, 0.5 + cos(slow.y * 1.2 + 1.0) * 0.15);
  float hD = distance(uv, hC);
  float hM = exp(-hD * hD * 5.0);
  vec3 hCol = vec3(1.0, 0.995, 0.985);
  col = mix(col, hCol, hM * 0.12 * mask);

  float vig = 1.0 - smoothstep(0.35, 1.3, length(uv - 0.5) * 1.3);
  col *= 0.55 + vig * 0.45;

  float grain = rand(gl_FragCoord.xy * 0.5 + fract(u_time * 0.1) * 100.0);
  col += (grain - 0.5) * 0.018;

  col = pow(col, vec3(1.05, 0.98, 0.92));

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog))
      return
    }

    const aPos = gl.getAttribLocation(prog, 'a_pos')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uColor1 = gl.getUniformLocation(prog, 'u_color1')
    const uColor2 = gl.getUniformLocation(prog, 'u_color2')
    const uColor3 = gl.getUniformLocation(prog, 'u_color3')
    const uColor4 = gl.getUniformLocation(prog, 'u_color4')

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    let needsResize = true
    let running = true

    const resize = () => {
      needsResize = false
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const onResize = () => { needsResize = true }
    window.addEventListener('resize', onResize)
    resize()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          running = entry.isIntersecting
          if (running) requestAnimationFrame(render)
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const render = (now: number) => {
      if (!running) return
      if (needsResize) resize()
      gl.useProgram(prog)
      gl.uniform1f(uTime, now)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform3f(uColor1, 0.89, 0.85, 0.79)
      gl.uniform3f(uColor2, 0.85, 0.80, 0.83)
      gl.uniform3f(uColor3, 0.75, 0.80, 0.86)
      gl.uniform3f(uColor4, 0.87, 0.83, 0.78)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

    return () => {
      running = false
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
