// Site content
export interface Article {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readTime: string
}

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
export const articles: Article[] = [
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
