import HeroShader from './HeroShader'

interface HeroProps {
  lenisRef: React.MutableRefObject<any>
}

export default function Hero({ lenisRef }: HeroProps) {
  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target)
    }
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <HeroShader />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#6b7280',
            marginBottom: '20px',
          }}
        >
          Full-Stack Developer & UI Designer
        </p>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#1a1a2e',
            margin: '0 0 24px 0',
            textShadow: '0 2px 30px rgba(255,255,255,0.6)',
          }}
        >
          Alex Mercer
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: 1.7,
            color: '#6b7280',
            maxWidth: '560px',
            marginBottom: '40px',
          }}
        >
          I design and build digital experiences that help businesses grow
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="#projects"
            onClick={(e) => handleClick(e, '#projects')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              background: '#0f2b5e',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'background 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a3a6e'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0f2b5e'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              background: 'transparent',
              color: '#1a1a2e',
              padding: '16px 32px',
              borderRadius: '4px',
              border: '1px solid #1a1a2e',
              textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a1a2e'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#1a1a2e'
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
