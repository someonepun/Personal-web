// Site content
export interface Product {
  id: string
  name: string
  description: string
  fullDescription: string
  price: string
  status: 'Available' | 'Beta' | 'Coming Soon'
  features: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  fullDescription: string
  deliverables: string[]
}

// Data
export const products: Product[] = [
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

export const services: Service[] = [
  {
    id: 'product-design',
    title: 'Product Design',
    description: 'End-to-end design for bioinformatics tools and scientific software.',
    fullDescription: `I help scientific software companies and research institutions create intuitive, powerful tools that researchers love to use. From initial concept to polished interface, I bring a unique perspective that bridges design thinking with deep technical understanding.

My approach combines user research, iterative prototyping, and close collaboration with domain experts to ensure the final product not only looks great but solves real problems effectively.`,
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
