import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const imgColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const textCol = textColRef.current
    const imgCol = imgColRef.current
    if (!section || !textCol || !imgCol) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.from(textCol, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }).from(
      imgCol,
      {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.65'
    )

    return () => {
      tl.kill()
    }
  }, [])

  const stats = [
    { number: '80+', label: 'Projects Delivered' },
    { number: '8', label: 'Years Experience' },
    { number: '50+', label: 'Happy Clients' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#fafaf7',
        padding: '140px 48px 100px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: '64px',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        <div ref={textColRef}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0f2b5e',
              marginBottom: '16px',
            }}
          >
            ABOUT ME
          </p>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#1a1a2e',
              margin: '0 0 24px 0',
            }}
          >
            Building Digital Experiences That Matter
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6b7280',
              marginBottom: '20px',
            }}
          >
            With over 8 years of experience in full-stack development and UI design, I help startups and established businesses transform their ideas into polished, high-performing digital products. I believe great software is built at the intersection of clean code and thoughtful design.
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6b7280',
              marginBottom: '40px',
            }}
          >
            Based in San Francisco, I work with clients worldwide — from solo founders to Fortune 500 teams. Every project is an opportunity to create something meaningful.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '48px',
              flexWrap: 'wrap',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '36px',
                    fontWeight: 400,
                    color: '#1a1a2e',
                    margin: '0 0 4px 0',
                  }}
                >
                  {stat.number}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#6b7280',
                    margin: 0,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div ref={imgColRef}>
          <img
            src="/about-portrait.jpg"
            alt="Creative professional at work"
            style={{
              width: '100%',
              borderRadius: '8px',
              objectFit: 'cover',
              aspectRatio: '3/4',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about {
            padding: 80px 24px 60px !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
