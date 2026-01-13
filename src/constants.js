// src/constants.js
export const FONTS = {
  'Roboto': { name: 'Roboto (Padrão)', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
  'Merriweather': { name: 'Merriweather (Serif)', url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap' },
  'Lato': { name: 'Lato (Moderno)', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' },
  'Open Sans': { name: 'Open Sans (Neutro)', url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' },
  'Lora': { name: 'Lora (Elegante)', url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap' }
};

export const INITIAL_SETTINGS = {
  font: 'Roboto',
  themeColor: '#111827',
  sectionTitleBold: true,
  
  // Configurações de página removidas permanentemente
  
  showGuides: true,
  density: 'compact',
  fontSizeBase: 10,
  textAlign: 'justify',
  
  // Margens de Coluna
  experienceColumnWidth: 25, 
  educationColumnWidth: 25,  
  projectsColumnWidth: 30,   
  leftColumnWidth: 45        
};

export const DENSITY = {
  compact: { mbSection: 'mb-3', mbItem: 'mb-2', leading: 'leading-snug', headerPad: 'mb-4 pb-2', listSpace: 'space-y-0.5' },
  comfortable: { mbSection: 'mb-6', mbItem: 'mb-4', leading: 'leading-relaxed', headerPad: 'mb-6 pb-4', listSpace: 'space-y-1.5' }
};

export const INITIAL_DATA = {
  // Ordem inicial de renderização
  sectionOrder: ['summary', 'skills', 'projects', 'experience', 'education', 'others'],

  structure: {
    summary: { title: "Resumo", visible: true, id: 'summary' },
    skills: { title: "Competências", visible: true, id: 'skills' },
    projects: { title: "Projetos Relevantes", visible: true, id: 'projects' },
    experience: { title: "Experiência Profissional", visible: true, id: 'experience' },
    education: { title: "Formação", visible: true, id: 'education' },
    others: { title: "Idiomas e Certificações", visible: true, id: 'others' } 
  },
  customSections: [], 
  personal: {
    name: "RAFAEL NOVAIS DE MIRANDA",
    email: "rafaelnovaismiranda@gmail.com",
    phone: "(34) 99777-9966",
    location: "Lavras, MG",
    linkedin: "linkedin.com/in/rafael-miranda",
    github: "github.com/rafael-miranda",
    lattes: "lattes.cnpq.br/123456789", 
    website: ""
  },
  summary: "Doutor em Genética e Melhoramento com perfil híbrido e estratégico, integrando a expertise agronômica à engenharia de software (Ciência da Computação em curso). Especialista em **Computational Breeding**, atuo na interface entre Biologia e Dados desenvolvendo ferramentas AgTech que automatizam pipelines complexos de Big Data Genômico e análises biométricas. Busco integrar o time de P&D da **Bayer** em Uberlândia para traduzir desafios biológicos em soluções computacionais escaláveis, acelerando a inovação genética e a tomada de decisão no campo.",
  skills: [
    { category: "Computational Breeding", items: "R (Avançado para Biometria), Python (Pandas/NumPy), Automação de Pipelines, Linux HPC." },
    { category: "Estatística & Modelagem", items: "Modelos Mistos (REML/BLUP), GWAS, Seleção Genômica, Análise Espacial, Testes Multi-ambientes." },
    { category: "Engenharia de Software", items: "SQL, Git/GitHub, Streamlit (Dashboarding). Conceitos de Cloud Computing, Docker." },
    { category: "Automação & Google Stack", items: "Especialista em Planilhas (Google Sheets/Excel) + Apps Script (Bots de Coleta/Web Scraping, Fórmulas Avançadas)." },
    { category: "IA Generativa", items: "Engenharia de Prompt e uso avançado de assistentes de IA para aceleração de desenvolvimento." }
  ],
  projects: [
    {
      title: "AgroStatPro - Solução SaaS para Pesquisa Agrícola",
      tech: "Python, Streamlit, Pandas",
      description: [
        "Desenvolvimento **Fullstack** para automação de cálculos estatísticos.",
        "Transformação de scripts acadêmicos complexos em um produto de dados intuitivo (SaaS).",
        "Demonstração de entrega de software, saindo do ambiente de pesquisa para uma solução de mercado."
      ]
    },
    {
      title: "Suíte de Automação e Web Scraping",
      tech: "Google Apps Script, Sheets",
      description: [
        "Desenvolvimento de robôs de coleta (**Web Scraping**) integrados ao Google Sheets.",
        "Criação de scripts para automação de fluxo de trabalho (ETL leve)."
      ]
    }
  ],
  experience: [
    {
      company: "Aroeira Agricultura Consultoria",
      role: "Consultor Agronômico",
      period: "2024 - Atual",
      location: "Sul de Minas, MG",
      description: [
        "Consultoria técnica especializada em grandes culturas (Milho, Soja, Feijão).",
        "Monitoramento de campo e coleta estratégica de dados agronômicos.",
        "Orientação prática de manejo visando retorno financeiro (**ROI**)."
      ]
    },
    {
      company: "EPAMIG",
      role: "Pesquisador de Dados e Estatística",
      period: "2023 - 2024",
      location: "Minas Gerais",
      description: [
        "Gestão estratégica de dados de uma Rede Experimental Multi-ambiente (MET).",
        "Aplicação de estatística espacial e modelos de adaptabilidade.",
        "Implementação de cultura **Data-Driven** na análise de ensaios."
      ]
    },
    {
      company: "Universidade Federal de Lavras (UFLA)",
      role: "Coordenador de Informática e Vice-Coordenador Geral - GEN",
      period: "2019 - 2023",
      location: "Lavras, MG",
      description: [
        "Liderança técnica na modernização da infraestrutura digital.",
        "Organização executiva de 4 Simpósios Internacionais.",
        "Mentoria em ferramentas computacionais (R/Python)."
      ]
    }
  ],
  education: [
    {
      institution: "Gran Faculdade",
      degree: "Bacharelado em Ciência da Computação",
      period: "2024 - 2028 (Prev.)",
      location: "EAD",
      details: "Foco em Engenharia de Software e Ciência de Dados para automação AgTech."
    },
    {
      institution: "Universidade Federal de Viçosa (UFV)",
      degree: "Especialização em Inteligência Artificial e Computacional",
      period: "2022",
      location: "Viçosa, MG",
      details: "Aprofundamento em Machine Learning e visão computacional aplicada."
    },
    {
      institution: "Universidade Federal de Lavras (UFLA)",
      degree: "Doutorado em Genética e Melhoramento",
      period: "2019 - 2023",
      location: "Lavras, MG",
      details: "Pesquisa avançada em mapeamento genético (GWAS)."
    }
  ],
  // REESTRUTURADO: Agora "Others" suporta Título e Lista de Itens (igual a Projetos)
  others: [
    {
      title: "Idiomas",
      description: ["Inglês Avançado (Leitura e Escrita)"]
    },
    {
      title: "Certificações",
      description: [
        "Google Data Analytics Professional Certificate (2023)",
        "Linux para Bioinformática (EMAS, 2022)"
      ]
    }
  ]
};