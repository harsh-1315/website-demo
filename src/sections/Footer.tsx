export default function Footer() {
  const navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Services', target: '#services' },
    { label: 'Projects', target: '#projects' },
    { label: 'Skills', target: '#skills' },
    { label: 'Contact', target: '#contact' },
  ]

  const socialLinks = [
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'Twitter', href: '#' },
  ]

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#1a1a2e',
        padding: '80px 48px 40px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '48px',
          }}
          className="footer-grid"
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'white',
                margin: '0 0 8px 0',
              }}
            >
              ALEX MERCER
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
              }}
            >
              Full-Stack Developer & UI Designer
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => handleClick(e, link.target)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #333340',
            paddingTop: '32px',
            marginTop: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#6b7280',
              margin: 0,
            }}
          >
            2025 Alex Mercer. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#6b7280',
              margin: 0,
            }}
          >
            Built with React & passion
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer {
            padding: 60px 24px 32px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}
