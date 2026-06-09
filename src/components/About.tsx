import { memo, useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import './About.css'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const VALUES = [
  {
    title: 'Performance-First',
    desc: 'Every millisecond matters in human-AI collaboration. We design core systems for zero friction, high-throughput, and sub-50ms query rounds.',
    color: 'cyan',
  },
  {
    title: 'Unwavering Reliability',
    desc: 'AI infrastructure cannot be fragile. We engineer server redundancy, stateless scheduling brokers, and high-uptime fallbacks to ensure enterprise stability.',
    color: 'violet',
  },
  {
    title: 'Future-Proof Ingenuity',
    desc: 'The frontier of artificial intelligence shifts monthly. We build modular, protocol-agnostic interfaces so teams adapt instantly to new foundation research.',
    color: 'green',
  },
]

interface AboutProps {
  setView: (view: 'home' | 'about' | 'privacy' | 'careers') => void
}

const About = memo(function About({ setView }: AboutProps) {
  const storyRef = useRef<HTMLDivElement>(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: '-60px' })
  const valuesRef = useRef<HTMLDivElement>(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-60px' })

  const slideUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.8, ease: EASE_OUT },
    },
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <div className="about-page">
      {/* Background glow spot */}
      <div className="about-page__glow" aria-hidden="true" />

      {/* Header */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="about-hero__inner"
          >
            <motion.span className="s-label" variants={slideUp}>About Us</motion.span>
            <motion.h1 className="about-hero__title" variants={slideUp}>
              Built for speed. Engineered for <em>reliability</em>.
            </motion.h1>
            <motion.p className="about-hero__sub" variants={slideUp}>
              Cogniaris was founded to solve the fundamental latency and stability challenges
              faced by developer teams attempting to ship production-grade AI agents at scale.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story" ref={storyRef}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate={isStoryInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="about-story__grid"
          >
            <motion.div className="about-story__left" variants={slideUp}>
              <h2 className="s-title">The Core <em>Story</em></h2>
              <p className="story-lead">
                We believe that the bottleneck for AI adoption is no longer model intelligence — it is infrastructure reliability.
              </p>
            </motion.div>
            <motion.div className="about-story__right" variants={slideUp}>
              <p className="story-text">
                When we built our first AI agents, we quickly discovered that existing cloud hosting environments were completely unsuited for persistent agentic workflows. High latency spikes, cold starts, and fragile data pipelines broke the user experience.
              </p>
              <p className="story-text">
                We set out to build a platform that developers could trust blindly. By placing GPU computing clusters on the edge, engineering stateful cache brokers, and developing unified model interfaces, we brought response speeds down from seconds to milliseconds. Today, Cogniaris powers critical workflows for thousands of engineering teams.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission-vision" className="about-mv mv-core">
        <div className="container">
          <div className="mv-core__grid">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="mv-core__card mv-core__card--mission"
            >
              <div className="mv-core__card-icon mv-core__card-icon--cyan">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="mv-core__card-title">Our Mission</h2>
              <p className="mv-core__card-desc">
                To build the foundational runtime, optimization protocols, and low-latency APIs required by developers to ship autonomous AI agents that run flawlessly and scale instantly.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="mv-core__card mv-core__card--vision"
            >
              <div className="mv-core__card-icon mv-core__card-icon--violet">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M22 12h-4M6 12H2M12 2v4M12 18v4M16.24 7.76l-2.83 2.83M10.59 13.41l-2.83 2.83M7.05 7.05l3.54 3.54M13.41 13.41l3.54 3.54" />
                </svg>
              </div>
              <h2 className="mv-core__card-title">Our Vision</h2>
              <p className="mv-core__card-desc">
                A world where intelligence is an instantaneous resource. We envision a globally distributed computing fabric that powers hyper-personalized agent operations at edge speeds, creating a seamless partnership between humans and AI.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="about-values mv-values" ref={valuesRef}>
        <div className="container">
          <div className="mv-values__head">
            <span className="s-label">Core Values</span>
            <h2 className="s-title">The principles that <em>drive</em> us</h2>
          </div>

          <motion.div
            initial="hidden"
            animate={isValuesInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="mv-values__grid"
          >
            {VALUES.map((val) => (
              <motion.div
                key={val.title}
                variants={slideUp}
                className={`mv-value__card mv-value__card--${val.color}`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`mv-value__dot mv-value__dot--${val.color}`} aria-hidden="true" />
                <h3 className="mv-value__title">{val.title}</h3>
                <p className="mv-value__desc">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta__glow" aria-hidden="true" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="about-cta__box"
          >
            <h2>Accelerate your AI roadmap today</h2>
            <p>
              Join the elite engineering teams building low-latency agentic flows on the Cogniaris cloud.
            </p>
            <div className="about-cta__actions">
              <motion.button
                onClick={() => {
                  setView('home')
                  setTimeout(() => {
                    document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })
                  }, 150)
                }}
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Building →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
})

export default About
