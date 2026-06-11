import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Demo.css'

interface DemoProps {
  setView: (view: 'home' | 'about' | 'privacy' | 'careers' | 'blogs' | 'changelog' | 'demo') => void
}

const Demo = memo(function Demo({ setView }: DemoProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [budget, setBudget] = useState('')
  const [helpWith, setHelpWith] = useState<string[]>([])
  const [projectDetails, setProjectDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!firstName.trim()) newErrors.firstName = 'First name is required'
    if (!lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!company.trim()) newErrors.company = 'Company name is required'
    if (!jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    if (!email.trim()) {
      newErrors.email = 'Work email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid work email'
    }
    if (!country) newErrors.country = 'Country is required'
    if (!projectDetails.trim()) newErrors.projectDetails = 'Project details are required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheckboxChange = (value: string) => {
    setHelpWith(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="demo-view">
      <div className="container">
        <div className="demo-view__layout">
          {/* Form container */}
          <div className="demo-view__card">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="demo-view__header">
                    <h1 className="demo-view__title">Let's Scale Together</h1>
                    <p className="demo-view__desc">
                      Join leading AI teams accelerating their ML development with Cogniaris. 
                      Book a 1:1 demo with us to get started.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="demo-form" noValidate>
                    {/* Row 1: First Name / Last Name */}
                    <div className="demo-form__row">
                      <div className={`demo-form__group ${firstName ? 'has-value' : ''} ${errors.firstName ? 'has-error' : ''}`}>
                        <input
                          id="first-name"
                          type="text"
                          value={firstName}
                          onChange={e => {
                            setFirstName(e.target.value)
                            if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }))
                          }}
                          required
                        />
                        <label htmlFor="first-name">First name*</label>
                        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                      </div>

                      <div className={`demo-form__group ${lastName ? 'has-value' : ''} ${errors.lastName ? 'has-error' : ''}`}>
                        <input
                          id="last-name"
                          type="text"
                          value={lastName}
                          onChange={e => {
                            setLastName(e.target.value)
                            if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }))
                          }}
                          required
                        />
                        <label htmlFor="last-name">Last name*</label>
                        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                      </div>
                    </div>

                    {/* Row 2: Company Name / Job Title */}
                    <div className="demo-form__row">
                      <div className={`demo-form__group ${company ? 'has-value' : ''} ${errors.company ? 'has-error' : ''}`}>
                        <input
                          id="company-name"
                          type="text"
                          value={company}
                          onChange={e => {
                            setCompany(e.target.value)
                            if (errors.company) setErrors(prev => ({ ...prev, company: '' }))
                          }}
                          required
                        />
                        <label htmlFor="company-name">Company name*</label>
                        {errors.company && <span className="error-text">{errors.company}</span>}
                      </div>

                      <div className={`demo-form__group ${jobTitle ? 'has-value' : ''} ${errors.jobTitle ? 'has-error' : ''}`}>
                        <input
                          id="job-title"
                          type="text"
                          value={jobTitle}
                          onChange={e => {
                            setJobTitle(e.target.value)
                            if (errors.jobTitle) setErrors(prev => ({ ...prev, jobTitle: '' }))
                          }}
                          required
                        />
                        <label htmlFor="job-title">Job title*</label>
                        {errors.jobTitle && <span className="error-text">{errors.jobTitle}</span>}
                      </div>
                    </div>

                    {/* Row 3: Work Email / Country */}
                    <div className="demo-form__row">
                      <div className={`demo-form__group ${email ? 'has-value' : ''} ${errors.email ? 'has-error' : ''}`}>
                        <input
                          id="work-email"
                          type="email"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value)
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                          }}
                          required
                        />
                        <label htmlFor="work-email">Work email*</label>
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>

                      <div className={`demo-form__group ${country ? 'has-value' : ''} ${errors.country ? 'has-error' : ''}`}>
                        <input
                          id="country"
                          type="text"
                          value={country}
                          onChange={e => {
                            setCountry(e.target.value)
                            if (errors.country) setErrors(prev => ({ ...prev, country: '' }))
                          }}
                          required
                        />
                        <label htmlFor="country">Country*</label>
                        {errors.country && <span className="error-text">{errors.country}</span>}
                      </div>
                    </div>

                    {/* Radio Group: Project Budget */}
                    <div className="demo-form__section">
                      <h3 className="demo-form__section-title">Project Budget</h3>
                      <div className="demo-form__radio-list">
                        {[
                          { label: '$500k-1M', value: '$500k-1M' },
                          { label: '$1M+', value: '$1M+' },
                          { label: '<$100k', value: '<$100k' },
                          { label: '$100k-500k', value: '$100k-500k' }
                        ].map(opt => (
                          <label key={opt.value} className="demo-form__radio-item">
                            <input
                              type="radio"
                              name="project-budget"
                              value={opt.value}
                              checked={budget === opt.value}
                              onChange={() => setBudget(opt.value)}
                            />
                            <span className="radio-control"></span>
                            <span className="radio-label">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Checkbox Group: What can we help with? */}
                    <div className="demo-form__section">
                      <h3 className="demo-form__section-title">What can we help with? Select all that apply:</h3>
                      <div className="demo-form__checkbox-list">
                        {[
                          'Data Annotation and Curation for Autonomy',
                          'Data Generation and RLHF for LLMs',
                          'Enterprise Agentic Solutions and Scale GenAI Platform',
                          'Model Test and Evaluation',
                          'Robotics and IOT',
                          'EdTech',
                          'MedTech',
                          'Public Sector: Defense, Government, and Non-Profits',
                          'Other'
                        ].map(option => (
                          <label key={option} className="demo-form__checkbox-item">
                            <input
                              type="checkbox"
                              checked={helpWith.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                            />
                            <span className="checkbox-control">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span className="checkbox-label">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <div className={`demo-form__group textarea-group ${projectDetails ? 'has-value' : ''} ${errors.projectDetails ? 'has-error' : ''}`}>
                      <textarea
                        id="project-details"
                        value={projectDetails}
                        onChange={e => {
                          setProjectDetails(e.target.value)
                          if (errors.projectDetails) setErrors(prev => ({ ...prev, projectDetails: '' }))
                        }}
                        rows={5}
                        required
                      />
                      <label htmlFor="project-details">Please describe your project in detail (data type, volume, timeline, budget, etc.)*</label>
                      {errors.projectDetails && <span className="error-text">{errors.projectDetails}</span>}
                    </div>

                    <motion.button
                      type="submit"
                      className="btn-submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? (
                        <div className="spinner"></div>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <span className="arrow">→</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="demo-view__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2>Request Submitted</h2>
                  <p>
                    Thank you, {firstName}! We have received your demo request. 
                    An AI solutions engineer will review your use case and contact you at {email} within 24 hours.
                  </p>
                  <button onClick={() => setView('home')} className="btn-primary">
                    Return to Homepage
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Demo
