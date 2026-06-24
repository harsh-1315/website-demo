import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CodeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0f2b5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,18 8,24 16,30" />
    <polyline points="32,18 40,24 32,30" />
    <line x1="28" y1="14" x2="20" y2="34" />
  </svg>
)

const PaletteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0f2b5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18" />
    <circle cx="18" cy="20" r="3" fill="#0f2b5e" />
    <circle cx="30" cy="20" r="3" />
    <circle cx="24" cy="30" r="3" />
  </svg>
)

const LayersIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0f2b5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="24,6 42,16 24,26 6,16" />
    <polyline points="6,26 24,36 42,26" />
    <polyline points="6,36 24,46 42,36" />
  </svg>
)

const services = [
  {
    icon: <CodeIcon />,
    title: 'Web Development',
    body: 'From landing pages to complex web applications, I build fast, responsive, and scalable websites using modern technologies like React, Next.js, and Node.js.',
  },
  {
    icon: <PaletteIcon />,
    title: 'UI/UX Design',
    body: 'I create intuitive, visually compelling interfaces that users love. Every pixel is purposeful, every interaction is smooth, every experience is memorable.',
  },
  {
    icon: <LayersIcon />,
    title: 'Full-Stack Solutions',
    body: 'End-to-end product development — from database architecture and API design to frontend implementation and deployment. One partner, complete solutions.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current
    if (!section || !title || !cards) return

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
    }).from(
      cards.children,
      {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      },
      '-=0.4'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: '#f0eeea',
        padding: '140px 48px 100px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
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
            WHAT I DO
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#1a1a2e',
              margin: 0,
            }}
          >
            Services Built for Your Success
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="service-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                background: 'white',
                borderRadius: '8px',
                padding: '48px 36px',
                boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ marginBottom: '24px' }}>{service.icon}</div>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: '#1a1a2e',
                  margin: '0 0 16px 0',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: '#6b7280',
                  margin: 0,
                }}
              >
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #services {
            padding: 80px 24px 60px !important;
          }
          .service-cards {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .service-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
