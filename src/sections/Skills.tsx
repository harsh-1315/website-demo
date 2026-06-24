import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillBars = [
  { label: 'React / Next.js', width: '95%' },
  { label: 'TypeScript', width: '90%' },
  { label: 'Node.js', width: '88%' },
  { label: 'Python', width: '82%' },
  { label: 'UI/UX Design (Figma)', width: '92%' },
  { label: 'Database Design', width: '85%' },
]

const expectations = [
  'Clean, maintainable code with comprehensive documentation',
  'Responsive designs that work flawlessly on every device',
  'Clear communication and transparent project updates',
]

const techPills = ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Figma']

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const bars = barsRef.current
    if (!section || !title || !bars) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    tl.from(title, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    })

    const fills = bars.querySelectorAll('.skill-bar-fill')
    gsap.fromTo(
      fills,
      { width: '0%' },
      {
        width: (_i: number, el: Element) => (el as HTMLElement).dataset.width || '0%',
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section"
      style={{
        background: '#1a1a2e',
        padding: '140px 48px 100px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={titleRef} style={{ marginBottom: '64px' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '16px',
            }}
          >
            EXPERTISE
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: 'white',
              margin: 0,
            }}
          >
            Skills & Technologies
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
          }}
          className="skills-grid"
        >
          <div ref={barsRef}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px',
                fontWeight: 600,
                color: 'white',
                margin: '0 0 32px 0',
              }}
            >
              Technical Skills
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {skillBars.map((skill) => (
                <div key={skill.label}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#9ca3af',
                      }}
                    >
                      {skill.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#9ca3af',
                      }}
                    >
                      {skill.width}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      background: '#333340',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      className="skill-bar-fill"
                      data-width={skill.width}
                      style={{
                        height: '100%',
                        background: '#0f2b5e',
                        borderRadius: '3px',
                        width: '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px',
                fontWeight: 600,
                color: 'white',
                margin: '0 0 32px 0',
              }}
            >
              What You Can Expect
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
              {expectations.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <circle cx="10" cy="10" r="10" fill="#0f2b5e" />
                    <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: '#9ca3af',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {techPills.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    border: '1px solid #333340',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    color: 'white',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills {
            padding: 80px 24px 60px !important;
          }
          .skills-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
