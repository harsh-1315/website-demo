import { useEffect, useRef, useState } from 'react'

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { label: 'About', target: '#about' },
    { label: 'Services', target: '#services' },
    { label: 'Projects', target: '#projects' },
    { label: 'Skills', target: '#skills' },
    { label: 'Contact', target: '#contact' },
  ]

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      const scrolled = window.scrollY > 100
      if (scrolled) {
        nav.classList.add('scrolled', 'border-bottom')
        nav.classList.remove('transparent')
      } else {
        nav.classList.remove('scrolled', 'border-bottom')
        nav.classList.add('transparent')
      }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    setMobileOpen(false)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target)
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="transparent"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          maxWidth: '100%',
          transition: 'background 0.3s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#1a1a2e',
            textDecoration: 'none',
          }}
        >
          ALEX MERCER
        </a>

        <div
          className="nav-links-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: '#1a1a2e',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0f2b5e')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1a1a2e')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
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
            Hire Me
          </a>
        </div>

        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#1a1a2e', transition: 'transform 0.3s, opacity 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#1a1a2e', transition: 'opacity 0.3s', opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#1a1a2e', transition: 'transform 0.3s, opacity 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(250, 250, 247, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '24px',
                fontWeight: 500,
                color: '#1a1a2e',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              background: '#0f2b5e',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        nav.scrolled {
          background: rgba(250, 250, 247, 0.92) !important;
          backdrop-filter: blur(12px);
        }
        nav.border-bottom {
          border-bottom: 1px solid #e5e5e5;
        }
        nav.transparent {
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
          nav {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </>
  )
}
