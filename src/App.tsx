import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sun, 
  Moon, 
  FileText, 
  Package, 
  Briefcase, 
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  X,
  ArrowRight,
  Calendar,
  Tag,
  Check
} from 'lucide-react'
import './App.css'

// Types
interface Article {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readTime: string
}

interface Product {
  id: string
  name: string
  description: string
  fullDescription: string
  price: string
  status: 'Available' | 'Beta' | 'Coming Soon'
  features: string[]
}

interface Service {
  id: string
  title: string
  description: string
  fullDescription: string
  icon: string
  deliverables: string[]
}

// Data
const articles: Article[] = [
  {
    id: 'designing-biological-interfaces',
    title: 'Designing Biological Interfaces',
    date: 'Jan 2024',
    excerpt: 'Exploring the intersection of product design and bioinformatics to create intuitive tools for researchers.',
    content: `In the rapidly evolving field of bioinformatics, the gap between complex biological data and user-friendly interfaces has never been more apparent. As researchers grapple with terabytes of genomic data, the need for thoughtfully designed tools becomes critical.

## The Challenge

Traditional bioinformatics tools prioritize functionality over usability. Command-line interfaces, while powerful, create barriers for biologists without programming backgrounds. This disconnect slows research and limits collaboration.

## Design Principles for Bio-Tools

1. **Progressive Disclosure**: Show only what's needed at each step
2. **Visual Feedback**: Make data transformations visible and understandable
3. **Contextual Help**: Provide guidance without cluttering the interface
4. **Accessibility**: Ensure tools work for researchers with varying technical skills

## Case Study: SeqFlow Redesign

When redesigning SeqFlow, we focused on transforming a complex pipeline into an intuitive visual workflow. The result? 40% faster analysis times and significantly reduced training requirements.

The key was understanding that researchers think in terms of biological processes, not computational steps. By mapping the interface to their mental models, we created a tool that feels natural to use.`,
    tags: ['Design', 'Bioinformatics'],
    readTime: '5 min read'
  },
  {
    id: 'ml-models-protein-folding',
    title: 'ML Models for Protein Folding',
    date: 'Dec 2023',
    excerpt: 'A deep dive into applying machine learning techniques to predict protein structures.',
    content: `Protein folding has been one of biology's grand challenges for decades. With the advent of deep learning, we're witnessing a revolution in how we predict and understand protein structures.

## The AlphaFold Breakthrough

AlphaFold's success at CASP14 marked a turning point. But what makes it work? At its core, the model uses attention mechanisms to learn the spatial relationships between amino acids, effectively predicting 3D coordinates from sequence data.

## Beyond AlphaFold

Newer approaches are emerging:
- **ESMFold**: Leveraging protein language models
- **RoseTTAFold**: Combining multiple prediction strategies
- **OpenFold**: Open-source implementation for broader access

## Practical Applications

These models are accelerating:
- Drug discovery pipelines
- Enzyme engineering
- Understanding disease mechanisms
- Designing novel proteins

The future lies not just in prediction accuracy, but in making these tools accessible to researchers worldwide.`,
    tags: ['AI/ML', 'Biology'],
    readTime: '8 min read'
  },
  {
    id: 'engineering-scalable-bio-pipelines',
    title: 'Engineering Scalable Bio-pipelines',
    date: 'Nov 2023',
    excerpt: 'Building robust data pipelines for genomic analysis at scale.',
    content: `As genomic datasets grow from gigabytes to petabytes, the infrastructure supporting biological research must evolve. Building scalable pipelines is no longer optional—it's essential.

## Architecture Considerations

Modern bio-pipelines require:
- **Distributed Computing**: Process data across multiple nodes
- **Fault Tolerance**: Handle failures gracefully without losing progress
- **Version Control**: Track every parameter and tool version
- **Reproducibility**: Ensure results can be replicated exactly

## Technology Stack

Our recommended stack includes:
- **Nextflow** or **Snakemake** for workflow management
- **Docker/Singularity** for containerization
- **Cloud platforms** (AWS, GCP, Azure) for elastic scaling
- **Object storage** for cost-effective data management

## Lessons Learned

After building pipelines processing millions of samples, we've learned that simplicity beats cleverness. Clear, documented code with comprehensive testing saves more time than any optimization trick.`,
    tags: ['Engineering', 'Code'],
    readTime: '6 min read'
  },
  {
    id: 'future-computational-biology',
    title: 'The Future of Computational Biology',
    date: 'Oct 2023',
    excerpt: 'How AI is transforming our understanding of biological systems.',
    content: `We're at an inflection point in biology. The convergence of massive datasets, powerful compute, and sophisticated AI models is opening doors that seemed impossible just years ago.

## The Data Explosion

Single-cell sequencing, spatial transcriptomics, and cryo-EM are generating unprecedented data volumes. But data alone isn't enough—we need intelligent systems to extract meaning.

## AI-Driven Discovery

Machine learning is enabling:
- **Predictive modeling** of cellular behavior
- **Automated image analysis** for microscopy
- **Drug-target interaction** prediction
- **Synthetic biology** design

## The Human Element

Despite technological advances, the human researcher remains central. The goal of AI should be augmentation, not replacement. Tools that amplify human creativity and intuition will drive the next wave of discoveries.

## Looking Ahead

The next decade will see biology become increasingly computational. Researchers who can bridge both worlds—understanding both the biological questions and the computational tools—will be best positioned to make breakthrough contributions.`,
    tags: ['AI/ML', 'Biology', 'Design'],
    readTime: '7 min read'
  }
]

const products: Product[] = [
  {
    id: 'biovis-toolkit',
    name: 'BioVis Toolkit',
    description: 'A comprehensive library for visualizing biological data in web applications.',
    fullDescription: `BioVis Toolkit is a React-based component library designed specifically for biological data visualization. It abstracts away the complexity of rendering genomic sequences, phylogenetic trees, protein structures, and more.

Built with performance in mind, BioVis handles large datasets smoothly while maintaining interactive responsiveness. Whether you're building a simple sequence viewer or a complex multi-omics dashboard, BioVis provides the building blocks you need.`,
    price: '$49',
    status: 'Available',
    features: [
      '20+ specialized visualization components',
      'TypeScript support with full type definitions',
      'Responsive and accessible by default',
      'Customizable themes and styling',
      'Performance optimized for large datasets',
      'Comprehensive documentation and examples',
      'Regular updates with new components'
    ]
  },
  {
    id: 'seqflow-pro',
    name: 'SeqFlow Pro',
    description: 'Streamlined sequence analysis pipeline for researchers and bioengineers.',
    fullDescription: `SeqFlow Pro transforms complex bioinformatics workflows into intuitive visual pipelines. No command-line required—design, run, and monitor your analyses through a beautiful web interface.

From quality control to variant calling, SeqFlow Pro guides you through each step with smart defaults while giving you full control when you need it. Built on industry-standard tools, it ensures your results are reproducible and publication-ready.`,
    price: '$99',
    status: 'Available',
    features: [
      'Visual pipeline builder with drag-and-drop',
      'Pre-configured workflows for common analyses',
      'Real-time monitoring and progress tracking',
      'Automatic report generation',
      'Cloud and on-premise deployment options',
      'Team collaboration features',
      'Integration with popular databases'
    ]
  },
  {
    id: 'proteinfold-ui',
    name: 'ProteinFold UI',
    description: 'Interactive 3D protein structure viewer with ML prediction integration.',
    fullDescription: `ProteinFold UI brings protein structures to life in the browser. Built on top of powerful rendering engines, it delivers smooth 3D visualization of even the largest molecular complexes.

With integrated ML prediction capabilities, you can visualize predicted structures alongside experimental data. Compare conformations, analyze binding sites, and create publication-quality figures—all within an intuitive interface.`,
    price: 'Coming Soon',
    status: 'Beta',
    features: [
      'High-performance 3D molecular rendering',
      'Integration with AlphaFold and ESMFold',
      'Structure comparison and alignment tools',
      'Annotation and measurement capabilities',
      'Export to multiple formats (PDB, mmCIF, images)',
      'Collaborative annotation features',
      'API for custom integrations'
    ]
  }
]

const services: Service[] = [
  {
    id: 'product-design',
    title: 'Product Design',
    description: 'End-to-end design for bioinformatics tools and scientific software.',
    fullDescription: `I help scientific software companies and research institutions create intuitive, powerful tools that researchers love to use. From initial concept to polished interface, I bring a unique perspective that bridges design thinking with deep technical understanding.

My approach combines user research, iterative prototyping, and close collaboration with domain experts to ensure the final product not only looks great but solves real problems effectively.`,
    icon: '🎨',
    deliverables: [
      'User research and persona development',
      'Information architecture and user flows',
      'Interactive prototypes and wireframes',
      'High-fidelity UI design',
      'Design system creation',
      'Usability testing and iteration'
    ]
  },
  {
    id: 'bio-engineering',
    title: 'Bio-Engineering',
    description: 'Custom pipeline development and genomic data infrastructure.',
    fullDescription: `Building robust, scalable infrastructure for biological data analysis requires expertise in both software engineering and bioinformatics. I design and implement pipelines that process data efficiently while maintaining reproducibility and traceability.

Whether you need a complete pipeline architecture or optimization of existing workflows, I can help you build systems that scale with your research needs.`,
    icon: '🧬',
    deliverables: [
      'Pipeline architecture design',
      'Nextflow/Snakemake workflow development',
      'Cloud infrastructure setup',
      'Containerization and deployment',
      'Performance optimization',
      'Documentation and training'
    ]
  },
  {
    id: 'ai-ml-consulting',
    title: 'AI/ML Consulting',
    description: 'Machine learning solutions for biological data analysis.',
    fullDescription: `Machine learning is transforming biology, but implementing effective ML solutions requires domain expertise. I help teams navigate the landscape of bioinformatics ML—from model selection to deployment.

With experience across protein structure prediction, genomic analysis, and drug discovery applications, I can guide your project from proof-of-concept to production-ready systems.`,
    icon: '🤖',
    deliverables: [
      'ML strategy and feasibility assessment',
      'Model selection and architecture design',
      'Data preprocessing pipelines',
      'Model training and optimization',
      'Deployment and monitoring setup',
      'Performance evaluation and reporting'
    ]
  },
  {
    id: 'full-stack-development',
    title: 'Full-Stack Development',
    description: 'Building scalable web applications for scientific computing.',
    fullDescription: `Modern scientific applications demand responsive, scalable web interfaces. I build full-stack solutions that bring complex computational tools to researchers' browsers—from interactive visualizations to real-time collaboration features.

Using modern frameworks and cloud technologies, I create applications that are fast, reliable, and maintainable.`,
    icon: '💻',
    deliverables: [
      'Frontend development (React, TypeScript)',
      'Backend API design and implementation',
      'Database architecture',
      'Real-time features and collaboration',
      'Testing and quality assurance',
      'Deployment and DevOps'
    ]
  }
]

// Panel Components
interface PanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

function BottomPanel({ isOpen, onClose, title, children }: PanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh]"
          >
            <div className="mx-auto max-w-3xl bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl overflow-hidden">
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-medium">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Content */}
              <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(85vh - 80px)' }}>
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Detail Page Components
function ArticleDetail({ article, onBack }: { article: Article; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-2xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Articles
      </button>
      
      <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {article.date}
        </span>
        <span>{article.readTime}</span>
      </div>
      
      <h1 className="text-3xl font-medium mb-4">{article.title}</h1>
      
      <div className="flex gap-2 mb-8">
        {article.tags.map((tag, i) => (
          <span 
            key={i}
            className="px-3 py-1 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        {article.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={i} className="text-xl font-medium mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(item => item.trim())
            return (
              <ul key={i} className="list-disc pl-5 space-y-2 my-4">
                {items.map((item, j) => (
                  <li key={j} className="text-zinc-600 dark:text-zinc-400">{item.replace(/^[-\d.]+\s*/, '')}</li>
                ))}
              </ul>
            )
          }
          return <p key={i} className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{paragraph}</p>
        })}
      </div>
    </motion.div>
  )
}

function ProductDetail({ product, onBack }: { product: Product; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-2xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Products
      </button>
      
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-3xl font-medium">{product.name}</h1>
        <span className={`px-3 py-1 text-sm rounded-full ${
          product.status === 'Available' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
        }`}>
          {product.status}
        </span>
      </div>
      
      <p className="text-2xl font-light text-zinc-900 dark:text-white mb-6">{product.price}</p>
      
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
        {product.fullDescription}
      </p>
      
      <h3 className="text-lg font-medium mb-4">Features</h3>
      <ul className="space-y-3 mb-8">
        {product.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-zinc-600 dark:text-zinc-400">{feature}</span>
          </li>
        ))}
      </ul>
      
      {product.status === 'Available' && (
        <button className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:scale-[1.02] transition-transform">
          Get Access
        </button>
      )}
      {product.status === 'Beta' && (
        <button className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-medium hover:scale-[1.02] transition-transform">
          Join Beta Waitlist
        </button>
      )}
    </motion.div>
  )
}

function ServiceDetail({ service, onBack }: { service: Service; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-2xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Services
      </button>
      
      <div className="text-5xl mb-4">{service.icon}</div>
      <h1 className="text-3xl font-medium mb-4">{service.title}</h1>
      
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
        {service.fullDescription}
      </p>
      
      <h3 className="text-lg font-medium mb-4">What You Get</h3>
      <ul className="space-y-3 mb-8">
        {service.deliverables.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <span className="text-zinc-600 dark:text-zinc-400">{item}</span>
          </li>
        ))}
      </ul>
      
      <button className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:scale-[1.02] transition-transform">
        Discuss Your Project
      </button>
    </motion.div>
  )
}

// List Components
function ArticlesList({ onSelect }: { onSelect: (article: Article) => void }) {
  return (
    <div className="space-y-4">
      {articles.map((article, i) => (
        <motion.article
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(article)}
          className="group cursor-pointer"
        >
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
            <h3 className="text-lg font-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {article.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">
              {article.excerpt}
            </p>
            <div className="flex gap-2">
              {article.tags.map((tag, j) => (
                <span 
                  key={j}
                  className="px-2 py-1 text-xs rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function ProductsList({ onSelect }: { onSelect: (product: Product) => void }) {
  return (
    <div className="space-y-4">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(product)}
          className="p-5 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer group hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {product.name}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              product.status === 'Available' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
            }`}>
              {product.status}
            </span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-light">{product.price}</span>
            {product.status === 'Available' && (
              <span className="text-sm text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                View Details
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ServicesList({ onSelect }: { onSelect: (service: Service) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Available for freelance projects and collaborations. Let&apos;s build something that bridges biology, design, and technology.
      </p>
      {services.map((service, i) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(service)}
          className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group"
        >
          <span className="text-3xl">{service.icon}</span>
          <div className="flex-1">
            <h3 className="font-medium mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {service.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {service.description}
            </p>
          </div>
        </motion.div>
      ))}
      <div className="mt-6 p-6 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-center">
        <p className="text-sm mb-3">Have a project in mind?</p>
        <button className="px-6 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full text-sm font-medium hover:scale-105 transition-transform">
          Get in Touch
        </button>
      </div>
    </div>
  )
}

// Main App
function App() {
  const [isDark, setIsDark] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  const menuItems = [
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'services', label: 'Services', icon: Briefcase },
  ]

  const handleClosePanel = () => {
    setActivePanel(null)
    setSelectedArticle(null)
    setSelectedProduct(null)
    setSelectedService(null)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center">
              <span className="text-white dark:text-zinc-900 font-bold text-lg">n</span>
            </div>
            <span className="text-xl font-medium tracking-tight">nStudio</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleTheme}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </header>

        {/* Center Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              Biology <span className="text-zinc-400">×</span> Design{' '}
              <span className="text-zinc-400">×</span> Code
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Product designer & engineer exploring the intersection of 
              bioinformatics, AI/ML, and human-centered design.
            </p>
          </motion.div>

          {/* Navigation Menu */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item.id)}
                  className="group flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )
            })}
          </motion.nav>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between p-6 md:p-10"
        >
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>© 2024 nStudio</span>
          </div>
          
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Mail, href: '#' },
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </motion.footer>
      </div>

      {/* Bottom Panels */}
      <BottomPanel
        isOpen={activePanel === 'articles'}
        onClose={handleClosePanel}
        title={selectedArticle ? 'Article' : 'Articles'}
      >
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <ArticleDetail 
              key="detail"
              article={selectedArticle} 
              onBack={() => setSelectedArticle(null)} 
            />
          ) : (
            <ArticlesList key="list" onSelect={setSelectedArticle} />
          )}
        </AnimatePresence>
      </BottomPanel>

      <BottomPanel
        isOpen={activePanel === 'products'}
        onClose={handleClosePanel}
        title={selectedProduct ? 'Product' : 'Products'}
      >
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <ProductDetail 
              key="detail"
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)} 
            />
          ) : (
            <ProductsList key="list" onSelect={setSelectedProduct} />
          )}
        </AnimatePresence>
      </BottomPanel>

      <BottomPanel
        isOpen={activePanel === 'services'}
        onClose={handleClosePanel}
        title={selectedService ? 'Service' : 'Services'}
      >
        <AnimatePresence mode="wait">
          {selectedService ? (
            <ServiceDetail 
              key="detail"
              service={selectedService} 
              onBack={() => setSelectedService(null)} 
            />
          ) : (
            <ServicesList key="list" onSelect={setSelectedService} />
          )}
        </AnimatePresence>
      </BottomPanel>
    </div>
  )
}

export default App
