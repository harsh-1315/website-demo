import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    gsap.from(content, {
      scale: 0.95,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: '#f0eeea',
        padding: '140px 48px 140px',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1a1a2e',
            margin: '0 0 24px 0',
          }}
        >
          Let's Build Something Great Together
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.7,
            color: '#6b7280',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Have a project in mind? I'd love to hear about it. Whether you need a full website, a design system, or a complex web application, let's discuss how I can help.
        </p>

        <a
          href="mailto:hello@alexmercer.dev"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            background: '#0f2b5e',
            color: 'white',
            padding: '18px 40px',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '24px',
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
          Start a Conversation
        </a>

        <div>
          <a
            href="mailto:hello@alexmercer.dev"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#0f2b5e',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#0f2b5e')}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
          >
            hello@alexmercer.dev
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            padding: 80px 24px 80px !important;
          }
        }
      `}</style>
    </section>
  )
}
