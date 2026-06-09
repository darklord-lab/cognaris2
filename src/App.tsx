import { lazy, memo, Suspense, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Cursor          from './components/Cursor'
import WebGLBackground from './components/WebGLBackground'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import './App.css'

const Services      = lazy(() => import('./components/Services'))
const Features      = lazy(() => import('./components/Features'))
const HowItWorks    = lazy(() => import('./components/HowItWorks'))
const Pricing       = lazy(() => import('./components/Pricing'))
const Footer        = lazy(() => import('./components/Footer'))
const About         = lazy(() => import('./components/About'))
const Privacy       = lazy(() => import('./components/Privacy'))
const Careers       = lazy(() => import('./components/Careers'))
const Blogs         = lazy(() => import('./components/Blogs'))
const Changelog     = lazy(() => import('./components/Changelog'))

/* ── SVG Logo ── */
const Logo = memo(function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="Cogniaris logo"
    >
      <rect width="32" height="32" rx="8" fill="url(#lg)" />
      <path d="M8 16 L16 8 L24 16 L16 24 Z"
        stroke="#fff" strokeWidth="1.5"
        fill="none" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3" fill="#fff" />
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00d4ff" />
          <stop offset="1" stopColor="#6b5ce7" />
        </linearGradient>
      </defs>
    </svg>
  )
})

/* ── Loader ── */
const Loader = memo(function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let frame = 0
    const total = 55
    const tick = () => {
      frame++
      setPct(Math.min(Math.round((frame / total) * 100), 100))
      if (frame < total) requestAnimationFrame(tick)
      else setTimeout(onDone, 200)
    }
    requestAnimationFrame(tick)
  }, [onDone])

  return (
    <div className="loader">
      <div className="loader__logo">
        <Logo size={36} />
        <span className="loader__wordmark">COGNIARIS</span>
      </div>
      <div className="loader__bar-track">
        <motion.div
          className="loader__bar-fill"
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>
      <span className="loader__pct">{pct}%</span>
    </div>
  )
})

const App = memo(function App() {
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'home' | 'about' | 'privacy' | 'careers' | 'blogs' | 'changelog'>('home')
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const handleDone = useCallback(() => setLoading(false), [])
  const handleSetView = useCallback((newView: 'home' | 'about' | 'privacy' | 'careers' | 'blogs' | 'changelog') => {
    setView(newView)
    setSelectedPostId(null)
  }, [])

  return (
    <div id="root">
      {/* Custom cursor — always on top */}
      <Cursor />

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 999 }}
          >
            <Loader onDone={handleDone} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WebGL stays pinned to background */}
      <WebGLBackground />

      {/* All page content sits above WebGL */}
      <div className="page">
        <Navbar logo={<Logo />} currentView={view} setView={handleSetView} />
        <main style={{ minHeight: 'calc(100vh - 200px)', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {view === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Hero />
                <Suspense fallback={null}>
                  <Services />
                  <Features />
                  <HowItWorks />
                  <Pricing />
                </Suspense>
              </motion.div>
            )}
            {view === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Suspense fallback={null}>
                  <About setView={handleSetView} />
                </Suspense>
              </motion.div>
            )}
            {view === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Suspense fallback={null}>
                  <Privacy />
                </Suspense>
              </motion.div>
            )}
            {view === 'careers' && (
              <motion.div
                key="careers"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Suspense fallback={null}>
                  <Careers />
                </Suspense>
              </motion.div>
            )}
            {view === 'blogs' && (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Suspense fallback={null}>
                  <Blogs selectedPostId={selectedPostId} setSelectedPostId={setSelectedPostId} />
                </Suspense>
              </motion.div>
            )}
            {view === 'changelog' && (
              <motion.div
                key="changelog"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Suspense fallback={null}>
                  <Changelog />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Suspense fallback={null}>
          <Footer logo={<Logo />} setView={handleSetView} />
        </Suspense>
      </div>
    </div>
  )
})

export default App