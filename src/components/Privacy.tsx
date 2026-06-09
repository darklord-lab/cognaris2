import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import './Privacy.css'

const SECTIONS = [
  { id: 'intro',    label: '1. Introduction' },
  { id: 'collect',  label: '2. Information We Collect' },
  { id: 'use',      label: '3. How We Use Data' },
  { id: 'security', label: '4. Security & Storage' },
  { id: 'rights',   label: '5. Your Rights' },
]

const Privacy = memo(function Privacy() {
  const handleAnchorClick = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="privacy-page">
      <div className="privacy-page__glow" aria-hidden="true" />

      {/* Header */}
      <section className="privacy-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="privacy-hero__inner"
          >
            <span className="s-label">Compliance</span>
            <h1 className="privacy-hero__title">Privacy Policy</h1>
            <p className="privacy-hero__sub">Last updated: June 8, 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content">
        <div className="container">
          <div className="privacy-grid">
            {/* Sidebar */}
            <aside className="privacy-sidebar">
              <nav className="privacy-sidebar__nav">
                <span className="privacy-sidebar__title">On this page</span>
                <ul className="privacy-sidebar__list">
                  {SECTIONS.map(sec => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        className="privacy-sidebar__link"
                        onClick={e => handleAnchorClick(sec.id, e)}
                      >
                        {sec.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Document Body */}
            <article className="privacy-body">
              <section id="intro" className="privacy-section">
                <h2>1. Introduction</h2>
                <p>
                  At Cogniaris, we take your privacy extremely seriously. This Privacy Policy describes how we collect, use, and process your personal and telemetry data when you use our low-latency AI orchestration platform, developer console, API keys, and website.
                </p>
                <p>
                  By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our developer tools.
                </p>
              </section>

              <section id="collect" className="privacy-section">
                <h2>2. Information We Collect</h2>
                <p>
                  We collect information necessary to deliver stable, high-performance computing services:
                </p>
                <ul>
                  <li><strong>Account Information:</strong> Name, business email, billing address, and credentials when you sign up.</li>
                  <li><strong>Developer Telemetry:</strong> Log payloads, API request rates, system latency, error rates, and regional routing targets.</li>
                  <li><strong>Input Prompt Vectors:</strong> For optimization and caching services, we process embedding inputs. However, we do not store raw prompts unless query caching is explicitly enabled by your configuration.</li>
                </ul>
              </section>

              <section id="use" className="privacy-section">
                <h2>3. How We Use Data</h2>
                <p>
                  Your information is processed for specific, business-critical reasons:
                </p>
                <ul>
                  <li>To provision developer accounts and manage billing.</li>
                  <li>To run regional GPU schedulers and routing protocols to guarantee sub-50ms query latency.</li>
                  <li>To diagnose bugs, identify service disruptions, and monitor network safety.</li>
                  <li>To train core platform telemetry routers (we do NOT train models on your enterprise data).</li>
                </ul>
              </section>

              <section id="security" className="privacy-section">
                <h2>4. Security & Storage</h2>
                <p>
                  Cogniaris is built on enterprise-grade security protocols:
                </p>
                <p>
                  All database payloads are encrypted at rest using AES-256 standards, and all telemetry transmissions are encrypted in transit via TLS 1.3. We deploy zero-knowledge network nodes on the edge, ensuring your API key secrets are never exposed. Data is stored across multiple geographic cloud regions, adhering to strict access controls.
                </p>
              </section>

              <section id="rights" className="privacy-section">
                <h2>5. Your Rights</h2>
                <p>
                  Depending on your jurisdiction (such as GDPR in Europe or CCPA in California), you have rights regarding your information:
                </p>
                <ul>
                  <li>The right to request access to and download copies of your account history.</li>
                  <li>The right to request rectification of inaccurate account details.</li>
                  <li>The right to request erasure of your data ("right to be forgotten"), subject to outstanding billing cycles.</li>
                </ul>
              </section>


            </article>
          </div>
        </div>
      </section>
    </div>
  )
})

export default Privacy
