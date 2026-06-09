import { memo } from 'react'
import { motion } from 'framer-motion'
import './Careers.css'

const Careers = memo(function Careers() {
  return (
    <div className="careers-page">
      <div className="careers-page__glow" aria-hidden="true" />
      
      <section className="careers-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="careers-hero__inner"
          >
            <span className="s-label">Join the Team</span>
            <h1 className="careers-hero__title">Shape the Future of <em>AI Infra</em></h1>
            <p className="careers-hero__sub">
              We are building a globally distributed, low-latency execution layer for autonomous intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="careers-openings">
        <div className="container">
          <div className="careers-openings__content">
            <div className="no-openings-card">
              <div className="no-openings-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h2 className="no-openings-card__title">No Active Openings</h2>
              <p className="no-openings-card__desc">
                We do not have any open positions at this time. Please check back later for future opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

export default Careers
