import { memo, useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import './Blogs.css'

interface PostBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'code' | 'quote' | 'list'
  text?: string
  code?: string
  language?: string
  items?: string[]
  author?: string
}

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  readTime: string
  gradient: string
  image: string
  content: PostBlock[]
}

const POSTS: Post[] = [
  {
    id: 1,
    title: 'Real-Time AI in EdTech: Bridging the Latency Gap for Virtual Tutors',
    excerpt: 'How sub-50ms AI response times are changing how students learn, enabling truly interactive voice-based virtual classrooms without lag.',
    date: 'June 5, 2026',
    author: 'Dr. Evelyn Thorne',
    category: 'EdTech',
    readTime: '5 min read',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #6b5ce7 100%)',
    image: '/images/blog_edtech_tutor.png',
    content: [
      {
        type: 'paragraph',
        text: 'Traditional web interactions are built around request-response cycles. You type, you wait, you receive. But in education, human-to-human interaction is dynamic, synchronized, and conversational. When a student pauses to ask a question, a delay of even 500 milliseconds (half a second) breaks the conversational illusion and causes cognitive friction.'
      },
      {
        type: 'heading',
        text: 'The Latency Budget of Human Conversation'
      },
      {
        type: 'paragraph',
        text: 'Psycholinguistic studies show that typical gaps between speakers in natural dialogue hover around 200ms. In an AI-driven learning environment, we must achieve a total round-trip time (RTT) that mirrors this. This budget is split across speech-to-text (STT), Large Language Model (LLM) generation, and text-to-speech (TTS) synthesis.'
      },
      {
        type: 'quote',
        text: 'Every millisecond we save in the infrastructure layer translates directly to improved student engagement and learning retention.',
        author: 'Dr. Evelyn Thorne'
      },
      {
        type: 'heading',
        text: 'Pipelining the Audio Stream'
      },
      {
        type: 'paragraph',
        text: 'To achieve sub-50ms latency, we cannot run these stages sequentially. Instead, we use WebRTC to stream audio chunks from the client. As the raw audio arrives, we stream transcription tokens immediately. The moment a sentence boundary is detected, it is fed to our LLM edge router. Here is a simplified code snippet showing how we handle real-time audio chunk pipelining:'
      },
      {
        type: 'code',
        language: 'typescript',
        code: `import { WebRTCStream, LLMPipeline } from '@cogniaris/core';\n\nconst stream = new WebRTCStream({ audioOnly: true });\nconst pipeline = new LLMPipeline({\n  model: 'cogniaris-speech-ultra-v3',\n  latencyMode: 'ultra-low'\n});\n\nstream.on('chunk', async (audioChunk) => {\n  // Feed streaming audio into the real-time transcriber\n  const textToken = await pipeline.transcribeChunk(audioChunk);\n  \n  if (textToken) {\n    // Feed output immediately into the LLM context buffer\n    pipeline.appendPrompt(textToken);\n  }\n});\n\npipeline.on('response-token', (ttsToken) => {\n  // Stream synthesized audio straight back to client WebRTC player\n  stream.sendAudioFeedback(ttsToken);\n});`
      },
      {
        type: 'heading',
        text: 'Edge GPU Orchestration'
      },
      {
        type: 'paragraph',
        text: 'By hosting custom speech-to-text models directly on edge GPUs located within 15ms of our target audience, we completely eliminate global routing delays. This decentralized infrastructure ensures that students in New York, Tokyo, or Berlin experience the exact same crisp, zero-latency interactions.'
      }
    ]
  },
  {
    id: 2,
    title: 'Quantizing LLMs for High-Throughput Student Portals',
    excerpt: 'A deep dive into advanced quantization methodologies to support concurrent connections from millions of learners during peak exam seasons.',
    date: 'May 28, 2026',
    author: 'Sarah Jenkins',
    category: 'Engineering',
    readTime: '8 min read',
    gradient: 'linear-gradient(135deg, #6b5ce7 0%, #00ff9d 100%)',
    image: '/images/blog_llm_quantization.png',
    content: [
      {
        type: 'paragraph',
        text: 'Scaling generative AI to handle peak traffic is one of the most expensive and complex challenges in modern EdTech. During final exam weeks, student portals experience traffic spikes that can crash standard API configurations. To solve this, developers must look beyond raw GPU scaling and focus on model compression.'
      },
      {
        type: 'heading',
        text: 'What is LLM Quantization?'
      },
      {
        type: 'paragraph',
        text: 'Quantization is the process of mapping continuous, high-precision floating-point numbers (usually 16-bit float) to lower-precision representations (like 8-bit or 4-bit integers). This reduces the memory footprint of LLMs, enabling them to run on cheaper hardware with significantly higher throughput.'
      },
      {
        type: 'list',
        items: [
          'FP16 (Half Precision): 16 bits per parameter. Highest accuracy, but requires massive VRAM.',
          'INT8 (8-bit quantization): Reduces memory size by 50% with near-zero accuracy loss.',
          'INT4 (4-bit quantization): Reduces memory size by 75%, allowing massive models to run on consumer-grade edge hardware.'
        ]
      },
      {
        type: 'heading',
        text: 'Implementing AWQ (Activation-aware Weight Quantization)'
      },
      {
        type: 'paragraph',
        text: 'Unlike naive quantization which treats all weights equally, AWQ identifies the most important weights (usually 1% of the network) by analyzing activation distributions. By keeping these critical weights at higher precision while compressing the remaining 99% to 4-bit, we preserve accuracy while quadrupling throughput.'
      },
      {
        type: 'code',
        language: 'python',
        code: `# Loading an AWQ quantized model using the Cogniaris edge runtime\nfrom cogniaris.models import AutoModelForCausalLM\nfrom cogniaris.quantization import AWQConfig\n\nquant_config = AWQConfig(\n    bits=4,\n    group_size=128,\n    zero_point=True\n)\n\nmodel = AutoModelForCausalLM.from_pretrained(\n    "cogniaris/llama-3-8b-instruct-awq",\n    quantization_config=quant_config,\n    device_map="auto"\n)\n\n# Execute high-throughput inference\nresults = model.generate(\n    prompt="Explain quantum entanglement to a 10 year old",\n    max_new_tokens=256\n)`
      },
      {
        type: 'quote',
        text: 'AWQ allows us to deploy 70B parameter models on a single Nvidia A100 GPU, offering enterprise-level intelligence at a fraction of the operating cost.',
        author: 'Sarah Jenkins'
      },
      {
        type: 'paragraph',
        text: 'By combining AWQ with vLLM\'s PagedAttention, we successfully scaled our student portal to support 50,000 active concurrent chat sessions with a tail latency (p99) below 120ms.'
      }
    ]
  },
  {
    id: 3,
    title: 'Designing for Sub-10ms Context Swaps: Edge Caching Techniques',
    excerpt: 'How we use stateful caching brokers and edge routers to dynamically swap context windows for AI agents without costly cache misses.',
    date: 'May 12, 2026',
    author: 'Marcus Chen',
    category: 'Edge Computing',
    readTime: '6 min read',
    gradient: 'linear-gradient(135deg, #ff007f 0%, #7b2cbf 100%)',
    image: '/images/blog_edge_caching.png',
    content: [
      {
        type: 'paragraph',
        text: 'In multi-agent systems, agents frequently jump between different contexts, files, and conversation histories. In a standard setup, each context swap requires reloading the entire prompt history into the GPU\'s memory. This process introduces latency spikes, taking anywhere from 200ms to over a second depending on the size of the history.'
      },
      {
        type: 'heading',
        text: 'The Bottleneck: KV Cache Recomputation'
      },
      {
        type: 'paragraph',
        text: 'The Key-Value (KV) cache stores intermediate attention states during transformer computation. When an agent switches tasks, reloading or recalculating this KV cache is the main culprit behind context-swap delays. To achieve truly real-time operations, we need a system that caches and swaps these memory segments instantly.'
      },
      {
        type: 'heading',
        text: 'RadixAttention: Tree-Structured Cache Sharing'
      },
      {
        type: 'paragraph',
        text: 'At Cogniaris, we implemented a tree-structured caching system called RadixAttention. Instead of treating the KV cache as a flat buffer, we store it in a prefix-tree (Radix Tree) structure. If two agents share the same system instructions or initial document context, they reuse the exact same memory nodes, completely bypassing recomputation.'
      },
      {
        type: 'quote',
        text: 'By organizing cache memory as a hierarchy of prefixes, we achieve cache hit rates above 85% for multi-agent workflows.',
        author: 'Marcus Chen'
      },
      {
        type: 'heading',
        text: 'Stateful Caching Configuration'
      },
      {
        type: 'paragraph',
        text: 'Our edge routers are designed to predict which agent is likely to execute next based on user navigation and pre-load the corresponding KV cache nodes into the edge GPU\'s fast memory. Here is how you configure stateful prefix caching in your SDK initialization:'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const cogniaris = new Cogniaris({\n  apiKey: process.env.COGNIARIS_API_KEY,\n  caching: {\n    strategy: 'radix-attention',\n    ttlSeconds: 300, // Keep KV cache active for 5 minutes\n    prewarmOnPredictiveTriggers: true\n  }\n});\n\n// Subsequent calls with matching prefix are instant\nconst response = await cogniaris.chat({\n  agentId: 'support-tier-1',\n  prompt: 'Help me debug this database query...'\n});`
      },
      {
        type: 'paragraph',
        text: 'Through radix tree caching, context-swapping latency is reduced from 650ms to less than 8ms, paving the way for seamless, multi-agent interactions that feel instantaneous.'
      }
    ]
  },
  {
    id: 4,
    title: 'The Art of Multi-Agent Choreography: Beyond Linear Pipelines',
    excerpt: 'Moving from static chains to event-driven dynamic agent topologies for highly resilient and self-correcting workflows.',
    date: 'April 29, 2026',
    author: 'Elena Rostova',
    category: 'Architecture',
    readTime: '7 min read',
    gradient: 'linear-gradient(135deg, #00ff9d 0%, #005f73 100%)',
    image: '/images/blog_multi_agent.png',
    content: [
      {
        type: 'paragraph',
        text: 'First-generation AI applications relied on linear pipelines: User Input -> Prompt -> LLM -> Output. While simple, this architecture fails when handling complex, non-deterministic tasks. If the output of the LLM is incorrect, the entire pipeline fails. To build resilient software, we must transition to multi-agent choreography.'
      },
      {
        type: 'heading',
        text: 'Choreography vs. Orchestration'
      },
      {
        type: 'paragraph',
        text: 'In centralized orchestration, a single controller directs every step. In choreography, individual agents react to events, publish their own outputs, and collaborate dynamically. This event-driven approach allows agents to self-correct, validate each other\'s work, and run parallel tasks.'
      },
      {
        type: 'list',
        items: [
          'Self-Correction: A validator agent reviews the output of a coder agent. If it finds bugs, it sends the logs back to the coder for a fix.',
          'Parallel Execution: A research agent splits a topic into sub-topics, delegates them to five parallel summarizer agents, and aggregates the results.',
          'Consensus Protocols: Multiple agents evaluate a proposal and vote on the best course of action.'
        ]
      },
      {
        type: 'heading',
        text: 'Designing an Event-Driven Agent Mesh'
      },
      {
        type: 'paragraph',
        text: 'Using the Cogniaris SDK, you can define a mesh of agents that communicate through an event broker. Here is an example of setting up a dynamic coder-validator feedback loop:'
      },
      {
        type: 'code',
        language: 'typescript',
        code: `import { AgentMesh } from '@cogniaris/mesh';\n\nconst mesh = new AgentMesh();\n\nconst coder = mesh.registerAgent('Coder', {\n  role: 'Generate React components',\n  model: 'cogniaris-code-1.0'\n});\n\nconst validator = mesh.registerAgent('Validator', {\n  role: 'Compile code and check for lint errors',\n  model: 'cogniaris-spec-1.0'\n});\n\nmesh.on('ticket-created', async (ticket) => {\n  const code = await coder.execute({ task: ticket.desc });\n  mesh.emit('code-generated', { code, ticketId: ticket.id });\n});\n\nmesh.on('code-generated', async ({ code, ticketId }) => {\n  const report = await validator.validate(code);\n  if (report.hasErrors) {\n    mesh.emit('code-failed', { errors: report.errors, code, ticketId });\n  } else {\n    mesh.emit('code-approved', { code, ticketId });\n  }\n});`
      },
      {
        type: 'quote',
        text: 'Event-driven multi-agent systems represent the future of complex software automation, turning fragile prompts into robust, self-healing systems.',
        author: 'Elena Rostova'
      }
    ]
  }
]

interface BlogsProps {
  selectedPostId: number | null
  setSelectedPostId: (id: number | null) => void
}

const Blogs = memo(function Blogs({ selectedPostId, setSelectedPostId }: BlogsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Scroll to top when selectedPostId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedPostId])

  // Framer Motion scroll progress indicator
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const selectedPost = POSTS.find(p => p.id === selectedPostId)

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // --- RENDERING READ-ONLY DETAIL VIEW ---
  if (selectedPost) {
    return (
      <div className="blogs-page blog-detail-active">
        {/* Top hardware accelerated reading progress bar */}
        <motion.div className="blog-detail__progress" style={{ scaleX }} />
        
        <div className="container">
          {/* Back button 1: Primary top back button */}
          <motion.button
            onClick={() => setSelectedPostId(null)}
            className="blog-detail__back-btn"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ x: -4 }}
          >
            ← Back to Insights
          </motion.button>

          <article className="blog-detail__card">
            <motion.div 
              className="blog-detail__cover" 
              style={{ background: selectedPost.gradient }}
              layoutId={`blog-cover-${selectedPost.id}`}
            >
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="blog-detail__cover-img" 
              />
              <span className="blog-detail__category">{selectedPost.category}</span>
            </motion.div>

            <div className="blog-detail__content">
              <header className="blog-detail__header">
                {/* Back button 2: Back button inside the header card */}
                <button 
                  className="blog-detail__header-back"
                  onClick={() => setSelectedPostId(null)}
                  aria-label="Back to blog list"
                >
                  ← Back to Articles
                </button>

                <div className="blog-detail__meta">
                  <span>{selectedPost.date}</span>
                  <span className="blog-detail__meta-dot" />
                  <span>{selectedPost.readTime}</span>
                </div>
                <h1 className="blog-detail__title">{selectedPost.title}</h1>
                
                <div className="blog-detail__author-section">
                  <div className="blog-detail__author-avatar" style={{ background: selectedPost.gradient }}>
                    {selectedPost.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="blog-detail__author-name">By {selectedPost.author}</div>
                    <div className="blog-detail__author-role">Technical Staff, Cogniaris</div>
                  </div>
                </div>
              </header>

              <div className="blog-detail__body">
                {selectedPost.content.map((block, blockIdx) => {
                  switch (block.type) {
                    case 'paragraph':
                      return (
                        <p key={blockIdx} className="blog-detail__paragraph">
                          {block.text}
                        </p>
                      )
                    case 'heading':
                      return (
                        <h2 key={blockIdx} className="blog-detail__heading">
                          {block.text}
                        </h2>
                      )
                    case 'subheading':
                      return (
                        <h3 key={blockIdx} className="blog-detail__subheading">
                          {block.text}
                        </h3>
                      )
                    case 'code':
                      return (
                        <div key={blockIdx} className="blog-detail__code-wrapper">
                          <div className="blog-detail__code-header">
                            <span className="blog-detail__code-lang">{block.language || 'typescript'}</span>
                            <button
                              className={`blog-detail__copy-btn ${copiedIndex === blockIdx ? 'is-copied' : ''}`}
                              onClick={() => handleCopyCode(block.code || '', blockIdx)}
                            >
                              {copiedIndex === blockIdx ? 'Copied!' : 'Copy Code'}
                            </button>
                          </div>
                          <pre className="blog-detail__pre">
                            <code className="blog-detail__code">{block.code}</code>
                          </pre>
                        </div>
                      )
                    case 'quote':
                      return (
                        <blockquote key={blockIdx} className="blog-detail__quote">
                          <p className="blog-detail__quote-text">“{block.text}”</p>
                          {block.author && <cite className="blog-detail__quote-author">— {block.author}</cite>}
                        </blockquote>
                      )
                    case 'list':
                      return (
                        <ul key={blockIdx} className="blog-detail__list">
                          {block.items?.map((item, i) => (
                            <li key={i} className="blog-detail__list-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )
                    default:
                      return null
                  }
                })}

                {/* Back button 3: Back button at the bottom of the article */}
                <div className="blog-detail__footer-nav">
                  <button 
                    className="blog-detail__footer-back-btn"
                    onClick={() => setSelectedPostId(null)}
                  >
                    ← Back to Blogs
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  // --- RENDERING GRID VIEW ---
  return (
    <div className="blogs-page">
      <div className="blogs-page__glow" aria-hidden="true" />
      
      <section className="blogs-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="blogs-hero__inner"
          >
            <span className="s-label">Insights</span>
            <h1 className="blogs-hero__title">The Cogniaris <em>Blog</em></h1>
            <p className="blogs-hero__sub">
              Deep dives into high-performance computing, low-latency AI agents, and real-time learning software.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="blogs-grid-sec">
        <div className="container">
          <div className="blogs-grid">
            {POSTS.map((post, idx) => (
              <motion.article 
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPostId(post.id)}
                style={{ cursor: 'pointer' }}
              >
                <motion.div 
                  className="blog-card__cover" 
                  style={{ background: post.gradient }}
                  layoutId={`blog-cover-${post.id}`}
                >
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="blog-card__cover-img" 
                  />
                  <span className="blog-card__category">{post.category}</span>
                </motion.div>
                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <span>{post.date}</span>
                    <span className="blog-card__meta-dot" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <div className="blog-card__footer">
                    <span className="blog-card__author">By {post.author}</span>
                    <span className="blog-card__more">Read Article →</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})

export default Blogs
