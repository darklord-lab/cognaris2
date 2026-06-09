import { memo } from 'react'
import { motion } from 'framer-motion'
import './Changelog.css'

const Changelog = memo(function Changelog() {
  return (
    <div className="changelog-page">
      <div className="changelog-page__glow" aria-hidden="true" />

      <section className="changelog-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="changelog-hero__inner"
          >
            <span className="s-label">Platform Updates</span>
            <h1 className="changelog-hero__title">What's New at <em>Cogniaris</em></h1>
            <p className="changelog-hero__sub">
              Major announcements, software releases, and platform bug fixes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="changelog-content-sec">
        <div className="container">
          <motion.div 
            className="changelog-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="changelog-box__header">
              <span className="changelog-badge">LATEST RELEASE</span>
              <h2>Automating the Teacher Lifecycle</h2>
            </div>
            
            <div className="changelog-box__body">
              <p className="lead-text">
                We are building a comprehensive software solution designed to automate the entire teacher lifecycle. This custom EdTech infrastructure automates lesson planning, grading pipelines, real-time oral testing evaluation, automated mock test generation, instant results publication, and personalized student analytics. By streamlining administrative workloads and automating test lifecycle assessments, teachers can focus completely on instruction.
              </p>
              
              <div className="changelog-divider" />
              
              <h3>Intelligent Classroom Orchestration</h3>
              <p className="sub-text">
                Our EdTech software suite introduces advanced orchestration features to power modern classrooms:
              </p>
              <ul className="changelog-bullets">
                <li>
                  <strong>Auto-Adaptive Quizzes:</strong> Dynamically adjusts quiz difficulty based on real-time student performance analytics to personalize the learning path.
                </li>
                <li>
                  <strong>Smart Whiteboard Sync:</strong> Automatically transcribes whiteboard sketches and explanations into organized, searchable lecture notes.
                </li>
                <li>
                  <strong>Parent-Teacher Communications:</strong> Generates instant, narrative-based progress reports detailing key strengths and areas of growth for parents.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
})

export default Changelog
