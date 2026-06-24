import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'E-Commerce Platform Redesign',
    description: 'Complete redesign and rebuild of a fashion e-commerce platform, resulting in a 40% increase in conversions and 25% faster page loads.',
    tags: ['React', 'Next.js', 'Stripe'],
    image: '/project-ecommerce.jpg',
    imageLeft: true,
  },
  {
    title: 'SaaS Dashboard',
    description: 'A comprehensive analytics dashboard for a fintech startup, featuring real-time data visualization, custom reporting, and role-based access control.',
    tags: ['TypeScript', 'D3.js', 'PostgreSQL'],
    image: '/project-saas.jpg',
    imageLeft: false,
  },
  {
    title: 'Mobile Banking App',
    description: 'UI/UX design and frontend development for a mobile banking application used by 200K+ active users. Focused on security, accessibility, and seamless user experience.',
    tags: ['React Native', 'Figma', 'AWS'],
    image: '/project-mobile.jpg',
    imageLeft: true,
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    if (!section || !title) return

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

    rowRefs.current.forEach((row) => {
      if (!row) return
      const img = row.querySelector('.project-img-wrap')
      const text = row.querySelector('.project-text')

      gsap.fromTo(
        row,
        { scale: 0.9, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1.5,
          },
        }
      )

      if (img) {
        gsap.from(img, {
          x: row.classList.contains('img-left') ? -30 : 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      if (text) {
        gsap.from(text, {
          x: row.classList.contains('img-left') ? 30 : -30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        background: '#fafaf7',
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
              color: '#0f2b5e',
              marginBottom: '16px',
            }}
          >
            SELECTED WORK
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
            Projects That Speak for Themselves
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {projects.map((project, idx) => (
            <div
              key={project.title}
              ref={(el) => { rowRefs.current[idx] = el }}
              className={`project-row ${project.imageLeft ? 'img-left' : 'img-right'}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '64px',
                alignItems: 'center',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="project-img-wrap"
                style={{
                  order: project.imageLeft ? 0 : 1,
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

              <div
                className="project-text"
                style={{ order: project.imageLeft ? 1 : 0 }}
              >
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
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: '#6b7280',
                    margin: '0 0 24px 0',
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        fontWeight: 500,
                        background: '#f0eeea',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        color: '#1a1a2e',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              background: '#0f2b5e',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-block',
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
            View All Projects
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects {
            padding: 80px 24px 60px !important;
          }
          .project-row {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .project-row .project-img-wrap {
            order: 0 !important;
          }
          .project-row .project-text {
            order: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
