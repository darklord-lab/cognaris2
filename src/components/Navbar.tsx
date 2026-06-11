import { memo, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const LINKS = [
  { label: 'Services',         href: '#services'        },
  { label: 'Features',         href: '#features'        },
  { label: 'How It Works',     href: '#how-it-works'    },
  { label: 'Pricing',          href: '#pricing'         },
]

interface NavbarProps {
  logo: React.ReactNode
  currentView: 'home' | 'about' | 'privacy' | 'careers' | 'blogs' | 'changelog' | 'demo'
  setView: (view: 'home' | 'about' | 'privacy' | 'careers' | 'blogs' | 'changelog' | 'demo') => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const Navbar = memo(function Navbar({ logo, currentView, setView, theme, toggleTheme }: NavbarProps) {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [activeLink,   setActiveLink]   = useState('')

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setScrolled(window.scrollY > 40)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      if (currentView !== 'home') {
        setView('home')
        setActiveLink(href)
        const scrollToElement = () => {
          const el = document.querySelector(href)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          } else {
            let attempts = 0
            const interval = setInterval(() => {
              const element = document.querySelector(href)
              attempts++
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                clearInterval(interval)
              } else if (attempts > 12) {
                clearInterval(interval)
              }
            }, 80)
          }
        }
        setTimeout(scrollToElement, 120)
      } else {
        setActiveLink(href)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setView(href as any)
      setActiveLink(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentView, setView])

  const handleNavClick = useCallback((href: string, e: React.MouseEvent) => {
    e.preventDefault()
    handleNav(href)
  }, [handleNav])

  const toggleMobile = useCallback(() => setMobileOpen(p => !p), [])

  const isLinkActive = useCallback((href: string) => {
    if (href.startsWith('#')) {
      return currentView === 'home' && activeLink === href
    }
    return currentView === href
  }, [currentView, activeLink])

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          {/* Brand */}
          <a
            href="#home"
            className="navbar__brand"
            onClick={e => {
              e.preventDefault()
              setView('home')
              setActiveLink('')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label="Cogniaris home"
          >
            {logo}
            <span className="navbar__wordmark">COGNIARIS</span>
          </a>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${isLinkActive(link.href) ? 'navbar__link--active' : ''}`}
                  onClick={e => handleNavClick(link.href, e)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar__actions">
            <motion.a
              href="#demo"
              className="btn-primary"
              onClick={e => {
                e.preventDefault()
                setView('demo')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Get Started →
            </motion.a>

            <motion.button
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Mobile Actions */}
          <div className="navbar__mobile-actions">
            <motion.button
              className="navbar__theme-toggle navbar__theme-toggle--mobile"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </motion.button>

            <button
              className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={toggleMobile}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`navbar__mobile-link ${isLinkActive(link.href) ? 'navbar__mobile-link--active' : ''}`}
                onClick={e => handleNavClick(link.href, e)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#demo"
              className="btn-primary"
              onClick={e => {
                e.preventDefault()
                setView('demo')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              style={{ marginTop: '0.5rem' }}
            >
              Get Started →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default Navbar