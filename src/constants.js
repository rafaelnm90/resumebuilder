// src/constants.js
export const EXIBIR_LOGS = true;

if (EXIBIR_LOGS) {
    console.log("🚀 [constants.js] Carregando configurações...");
    console.log("🌐 Dados ajustados: Perfil Corporativo/Dev (Ex-Acadêmico) e CNH B.");
}

export const FONTS = {
  'Roboto': { name: 'Roboto (Padrão)', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
  'Merriweather': { name: 'Merriweather (Serif)', url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap' },
  'Lato': { name: 'Lato (Moderno)', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' },
  'Open Sans': { name: 'Open Sans (Neutro)', url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' },
  'Lora': { name: 'Lora (Elegante)', url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap' },
  'Arial': { name: 'Arial (Sistema)', url: '' },
  'Times New Roman': { name: 'Times New Roman (Sistema)', url: '' }
};

export const LIST_STYLES = {
  'disc': { label: 'Bolinha Padrão (●)', cssMain: 'list-disc', cssSub: 'list-[circle]' },
  'circle': { label: 'Círculo Vazado (○)', cssMain: 'list-[circle]', cssSub: 'list-[square]' },
  'square': { label: 'Quadrado (■)', cssMain: 'list-[square]', cssSub: 'list-[circle]' },
  'decimal': { label: 'Numérico (1, 2, 3)', cssMain: 'list-decimal', cssSub: 'list-[lower-alpha]' },
  'arrow': { label: 'Seta (➢)', cssMain: "list-['➢']", cssSub: "list-['↳']" }, 
  'check': { label: 'Check (✓)', cssMain: "list-['✓']", cssSub: "list-['◦']" },
  'dash': { label: 'Traço (–)', cssMain: "list-['–']", cssSub: "list-[circle]" }
};

export const TRANSLATIONS = {
  pt: {
    ui: {
      appName: "Resume Builder",
      version: "",
      downloadPdf: "Baixar PDF",
      exportJson: "Salvar Backup (JSON)",
      importJson: "Restaurar Backup",
      layoutTab: "Layout & Otimização",
      sectionsTab: "Gerenciar Seções",
      personalTab: "Pessoal",
      zoom: "ZOOM",
      addSection: "Nova Seção",
      text: "Texto",
      list: "Lista",
      detailed: "Detalhada",
      pageDecoration: "Decoração de Página",
      pageLines: "Linhas de Limite (Todas as Páginas)",
      pageLinesDesc: "Adiciona linhas finas coloridas no topo e base da área de texto.",
      geometry: "Geometria e Espaçamento",
      fontSize: "Tamanho da Fonte Base",
      lineHeight: "Altura da Linha (Entrelinha)",
      headerMargin: "Margem do Cabeçalho",
      markerStyle: "Estilo dos Marcadores",
      boldMarker: "Alternar Marcador em Negrito",
      colorMarker: "Cor do Marcador: Usar Tema",
      itemSpacing: "Espaçamento entre Itens (Global)",
      fineTune: "Ajuste Fino por Seção",
      sectionSpacing: "Espaçamento entre Seções",
      justifyText: "Justificar Texto",
      keepTogether: "Manter Itens Juntos (Evitar Quebra)",
      expColumn: "Coluna Direita: Experiência",
      eduColumn: "Coluna Direita: Formação",
      projColumn: "Coluna Direita: Projetos",
      leftColumn: "Ajuste de Competências (Esquerda)",
      guides: "Guias e Margens",
      showGuides: "Mostrar Linhas de Limites, Guias e Margens",
      typography: "Tipografia & Paleta",
      fontFamily: "Família da Fonte",
      themeOptions: "Opções de Cor do Tema",
      colorRoles: "Cargos, Instituições & URLs",
      colorDates: "Datas, Locations & Tech",
      boldDates: "Negrito em Datas e Locais (Direita)",
      linkIcon: "Mostrar Ícone de Link (🔗) em 'Projetos Relevantes'",
      accentColor: "Cor de Destaque",
      textColor: "Cor do Texto",
      photoSettings: "Foto do Perfil & Ajustes",
      showPhoto: "Exibir Foto?",
      uploadPhoto: "Carregar Foto",
      photoPos: "Posição da Foto",
      photoShape: "Formato",
      photoZoom: "Zoom",
      photoH: "Horizontal",
      photoV: "Vertical",
      photoShadow: "Sombra",
      photoBW: "P/B",
      photoFlip: "Espelhar",
      photoFill: "Preencher",
      photoBorder: "Borda Colorida",
      photoRotate: "Rotação",
      brightness: "Brilho",
      contrast: "Contraste",
      saturation: "Saturação",
      name: "Nome",
      email: "Email",
      phone: "Tel",
      location: "Local",
      linkedin: "LinkedIn",
      github: "GitHub",
      lattes: "Currículo Lattes (Link/ID)",
      youtube: "YouTube (Canal/Link)",
      expandEditor: "Expand Editor em Tela Cheia",
      
      driverLicenses: "CNH (Carteiras de Motorista)",
      addNewItem: "Adicionar Novo Item",
      
      footerSettings: "Rodapé: Data & Local",
      showFooter: "Exibir Data e Local no Final?",
      footerLocation: "Cidade/Estado",
      footerDate: "Data",
      footerAutoDate: "Usar Data Atual (Automático)",
      footerBold: "Negrito",
      footerColor: "Usar Cor do Tema",
      footerFormat: "Estilo da Data",
      footerFormatNumeric: "Numérica (31/01/2026)",
      footerFormatLong: "Por Extenso (31 de janeiro...)",

      atsTitle: "Camuflagem ATS (White Fonting)",
      atsStatusOn: "✅ ATIVADO",
      atsStatusOff: "❌ DESATIVADO",
      atsWarningTitle: "⛔ ALERTA DE SEGURANÇA: TÉCNICA 'BLACK HAT'",
      atsWarningText: "Você está utilizando 'White Fonting' (texto branco em fundo branco) para injetar palavras-chave. Entenda como o recrutador vai te pegar:",
      atsRisks: [
        "O ROBO NÃO VÊ COR: O ATS lê o código do arquivo. Ele ignora que a fonte é branca. Ele vai ler um bloco de texto sem sentido gramatical (ex: 'Java Python Vendas'). Isso é classificado como 'Keyword Stuffing' (SPAM).",
        "VISÃO DO RECRUTADOR: A maioria dos softwares de RH converte seu PDF para 'Texto Puro' antes de mostrar ao humano. Nesse formato, sua camuflagem aparece como um parágrafo de lixo no final do arquivo.",
        "DESCLASSIFICAÇÃO IMEDIATA: Se um humano der Ctrl+A (Selecionar Tudo) ou ler o Texto Puro, seu currículo será descartado por falta de transparência/ética.",
        "PÁGINA EM BRANCO: Mesmo invisível, o texto ocupa espaço físico. Isso pode gerar uma página em branco extra no final do PDF."
      ],
      atsRecommendation: "RECOMENDAÇÃO TÉCNICA: Para reduzir riscos, sugerimos integrar as palavras-chave organicamente dentro das descrições de suas experiências e projetos.  Se não quiser correr o risco de 'Shadowban', clique em DESATIVAR acima.",
      atsLabel: "Área de Injeção de Palavras-Chave (Cuidado)",
      atsFooter: "Este texto será renderizado na cor branca (FFFFFF) no rodapé do documento.",
      
      refName: "Nome Completo",
      refCompany: "Empresa",
      refRole: "Cargo",
      refEmail: "Email Corporativo",
      refPhone: "Telefone",
      addItem: "Adicionar Item",
      category: "Categoria",
      itemsList: "Itens (Lista)",
      title: "Título",
      link: "Link (URL)",
      tech: "Tech",
      company: "Empresa",
      role: "Cargo",
      period: "Período",
      institution: "Instituição",
      degree: "Grau",
      details: "Detalhes",
      catTitle: "Título da Categoria",
      activate: "ATIVAR (RISCO)",
      deactivate: "DESATIVAR (SEGURO)"
    },
    sections: {
      objective: "Objetivo",
      summary: "Resumo",
      skills: "Competências",
      projects: "Projetos Relevantes",
      experience: "Experiência Profissional",
      education: "Formação",
      others: "Idiomas e Certificações",
      references: "Referências Profissionais",
      keywords: "Camuflagem ATS (SEO)"
    }
  },
  en: {
    ui: {
      appName: "Resume Builder",
      version: "",
      downloadPdf: "Download PDF",
      exportJson: "Save Backup (JSON)",
      importJson: "Restore Backup",
      layoutTab: "Layout & Optimization",
      sectionsTab: "Manage Sections",
      personalTab: "Personal Info",
      zoom: "ZOOM",
      addSection: "New Section",
      text: "Text",
      list: "List",
      detailed: "Detailed",
      pageDecoration: "Page Decoration",
      pageLines: "Boundary Lines (All Pages)",
      pageLinesDesc: "Adds thin colored lines at the top and bottom of the text area.",
      geometry: "Geometry & Spacing",
      fontSize: "Base Font Size",
      lineHeight: "Line Height",
      headerMargin: "Header Margin",
      markerStyle: "Bullet Style",
      boldMarker: "Toggle Bold Marker",
      colorMarker: "Marker Color: Use Theme",
      itemSpacing: "Item Spacing (Global)",
      fineTune: "Fine Tune per Section",
      sectionSpacing: "Section Spacing",
      justifyText: "Justify Text",
      keepTogether: "Keep Items Together (Avoid Break)",
      expColumn: "Right Column: Experience",
      eduColumn: "Right Column: Education",
      projColumn: "Right Column: Projects",
      leftColumn: "Skills Adjustment (Left)",
      guides: "Guides & Margins",
      showGuides: "Show Boundary Lines, Guides & Margins",
      typography: "Typography & Palette",
      fontFamily: "Font Family",
      themeOptions: "Theme Color Options",
      colorRoles: "Roles, Institutions & URLs",
      colorDates: "Dates, Locations & Tech",
      boldDates: "Bold Dates & Locations (Right)",
      linkIcon: "Show Link Icon (🔗) in 'Relevant Projects'",
      accentColor: "Accent Color",
      textColor: "Text Color",
      photoSettings: "Profile Photo & Adjustments",
      showPhoto: "Show Photo?",
      uploadPhoto: "Upload Photo",
      photoPos: "Photo Position",
      photoShape: "Shape",
      photoZoom: "Zoom",
      photoH: "Horizontal",
      photoV: "Vertical",
      photoShadow: "Shadow",
      photoBW: "B/W",
      photoFlip: "Flip",
      photoFill: "Fill",
      photoBorder: "Colored Border",
      photoRotate: "Rotation",
      brightness: "Brightness",
      contrast: "Contrast",
      saturation: "Saturation",
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      linkedin: "LinkedIn",
      github: "GitHub",
      lattes: "Lattes CV (Link/ID)",
      youtube: "YouTube (Channel/Link)",
      expandEditor: "Expand Editor Fullscreen",
      
      driverLicenses: "Driver's License (Categories)",
      addNewItem: "Add New Item",
      
      footerSettings: "Footer: Date & Location",
      showFooter: "Show Date & Location at Bottom?",
      footerLocation: "City/State",
      footerDate: "Date",
      footerAutoDate: "Use Current Date (Auto)",
      footerBold: "Bold",
      footerColor: "Use Theme Color",
      footerFormat: "Date Style",
      footerFormatNumeric: "Numeric (31/01/2026)",
      footerFormatLong: "Long Form (January 31...)",
      
      atsTitle: "ATS Camouflage (White Fonting)",
      atsStatusOn: "✅ ENABLED",
      atsStatusOff: "❌ DISABLED",
      atsWarningTitle: "⛔ SECURITY ALERT: 'BLACK HAT' TECHNIQUE",
      atsWarningText: "You are using 'White Fonting' (white text on white background) to inject keywords. Here is how recruiters catch you:",
      atsRisks: [
        "ROBOTS DON'T SEE COLORS: The ATS reads the file's code. It ignores the font color and reads the text. It will see a block of nonsense (e.g., 'Java Python Sales'). This is flagged as 'Keyword Stuffing' (SPAM).",
        "RECRUITER VIEW: Most HR software converts your PDF to 'Plain Text' before showing it to a human. In this format, your camouflage appears as a garbage paragraph at the end of the file.",
        "INSTANT REJECTION: If a human uses Ctrl+A (Select All) or views the Plain Text, your resume will be discarded due to lack of transparency/ethics.",
        "BLANK PAGE: Even if invisible, the text takes up physical space. This often creates an awkward blank page at the end of the PDF."
      ],
      atsRecommendation: "TECHNICAL ADVICE: This trick worked in 2015. Today, algorithms penalize it. If you don't want to risk a 'Shadowban', click DISABLE above.",
      atsLabel: "Keyword Injection Area (Use with Caution)",
      atsFooter: "This text will be rendered in white (FFFFFF) at the document footer.",
      
      refName: "Full Name",
      refCompany: "Company",
      refRole: "Role/Position",
      refEmail: "Corporate Email",
      refPhone: "Phone",
      addItem: "Add Item",
      category: "Category",
      itemsList: "Items (List)",
      title: "Title",
      link: "Link (URL)",
      tech: "Tech",
      company: "Company",
      role: "Role",
      period: "Period",
      institution: "Institution",
      degree: "Degree",
      details: "Details",
      catTitle: "Category Title",
      activate: "ENABLE (RISK)",
      deactivate: "DISABLE (SAFE)"
    },
    sections: {
      objective: "Objective",
      summary: "Summary",
      skills: "Skills",
      projects: "Relevant Projects",
      experience: "Professional Experience",
      education: "Education",
      others: "Languages & Certifications",
      references: "Professional References",
      keywords: "ATS Camouflage (SEO)"
    }
  }
};

export const INITIAL_SETTINGS = {
  font: 'Roboto',
  themeColor: '#000000', 
  bodyColor: '#000000', 
  sectionTitleBold: true,
  showGuides: true,
  showPageLines: false, 
  
  fontSizeBase: 10,      
  textAlign: 'justify',
  listStyle: 'disc',
  
  listMarkerBold: false,         
  listMarkerUseThemeColor: false, 
  
  roleUseThemeColor: false,      
  rightTextUseThemeColor: false, 
  
  rightTextBold: false, 
  
  showLinkIcon: true, 
  
  lineHeight: 1.1,        
  headerSpacing: 5,      
  itemSpacing: 1.5,         
  sectionSpacing: 3,     
  pageBreakAuto: true,
  
  sectionItemSpacings: {
      education: 0        
  }, 
  
  experienceColumnWidth: 40, 
  educationColumnWidth: 40,  
  projectsColumnWidth: 32,   
  leftColumnWidth: 46        
};

export const INITIAL_DATA = {
  sectionOrder: ['objective', 'summary', 'skills', 'projects', 'experience', 'education', 'others', 'references', 'keywords'],

  structure: {
    objective: { title: "Objetivo", visible: true, id: 'objective' },
    summary: { title: "Resumo", visible: true, id: 'summary' },
    skills: { title: "Competências", visible: true, id: 'skills' },
    projects: { title: "Projetos Relevantes", visible: true, id: 'projects' },
    experience: { title: "Experiência Profissional", visible: true, id: 'experience' },
    education: { title: "Formação", visible: true, id: 'education' },
    others: { title: "Idiomas e Certificações", visible: true, id: 'others' },
    references: { title: "Referências Profissionais", visible: false, id: 'references' },
    keywords: { title: "Camuflagem ATS (SEO)", visible: false, id: 'keywords' }
  },
  
  customSections: [], 
  
  // ESTRUTURA PARA RODAPÉ (DATA/LOCAL)
  dateLocation: {
    visible: true,
    location: "Uberlândia, MG", 
    date: "",
    autoDate: true,
    useBold: false,
    useThemeColor: true,
    format: 'numeric' 
  },

  personal: {
    name: "RAFAEL NOVAIS DE MIRANDA",
    email: "rafaelnovaismiranda@gmail.com",
    phone: "(34) 99777-9966",
    location: "Lavras, MG",
    linkedin: "linkedin.com/in/rafael-miranda",
    github: "github.com/rafael-miranda",
    youtube: "youtube.com/@rafael-miranda", 
    lattes: "lattes.cnpq.br/6450189926093594", 
    website: "",
    photo: "", 
    showPhoto: false,
    photoAlignment: 'center', 
    photoShape: 'circle', 
    photoScale: 100,      
    photoX: 0,            
    photoY: 0,
    photoRotate: 0,        
    photoBrightness: 100,  
    photoContrast: 100,    
    photoSaturation: 100,
    photoGrayscale: false,
    photoFlip: false,     
    photoCover: false,    
    photoBorder: 0,       
    photoShadow: false,
    
    // CNH (Ajustado para B conforme solicitado)
    driverLicenses: ['B'] 
  },
  
  objective: "Desenvolvedor de Software e Analista de Dados, busco aplicar sólida experiência em resolução de problemas complexos, lógica algorítmica e gestão técnica para criar soluções de software escaláveis e orientadas a dados.",
  
  summary: "Desenvolvedor Full Stack e Cientista de Dados com background analítico robusto. Experiência prática na construção de aplicações SaaS (como o Editor de Currículo e o AgroStatPro), utilizando React, Python e SQL. Histórico comprovado em liderança técnica e gestão de projetos (Coordenação de TI - GEN), com foco em otimização de processos, automação e entrega de valor. Transfere competências de análise estatística avançada e rigor metodológico para o desenvolvimento de software corporativo.",
  
  skills: [
    { category: "Desenvolvimento de Software", items: "Python, JavaScript (React), HTML5/CSS3, SQL, Streamlit, Google Apps Script, Lógica de Programação." },
    { category: "Dados & Analytics", items: "Análise de Dados, Power BI, Estatística Avançada, Modelagem Preditiva, Excel Avançado, Visualização de Dados." },
    { category: "Ferramentas & DevOps", items: "Git/GitHub, Linux (Gerenciamento de Servidores/Bioinformática), Docker (Conceitos), VS Code." },
    { category: "Gestão & Liderança", items: "Gestão de Projetos Ágeis, Liderança de Equipes Multidisciplinares, Organização de Eventos, Planejamento Estratégico." },
    { category: "Outras Competências", items: "Resolução de Problemas, Comunicação Técnica, Inglês Avançado, Adaptabilidade." }
  ],
  
  projects: [
    {
      title: "Editor de Currículo Online (Resume Builder)",
      link: "editorcurriculumvitae.vercel.app", 
      tech: "React, Tailwind CSS, jsPDF",
      description: [
        "Desenvolvimento Full Stack de aplicação web para criação de currículos com preview em tempo real.",
        "Implementação de funcionalidades complexas de UX/UI, incluindo Drag & Drop e customização avançada de layout.",
        "Engenharia de software focada em performance e geração de documentos PDF no front-end."
      ]
    },
    {
      title: "AgroStatPro - SaaS de Análise de Dados",
      link: "agrostat.streamlit.app", 
      tech: "Python, Streamlit, Pandas, Cloud",
      description: [
        "Criação e implantação de um produto SaaS (Software as a Service) para automação de análises estatísticas.",
        "Transformação de scripts complexos em uma interface amigável, reduzindo o tempo de processamento de dados dos usuários."
      ]
    }
  ],
  
  experience: [
    {
      company: "Empresa de Pesquisa Agropecuária de Minas Gerais (EPAMIG)",
      role: "Analista de Dados e Inovação (Projeto BDCTI)",
      period: "2024 - 2025",
      location: "Minas Gerais",
      description: [
        "Gerenciamento de grandes volumes de dados experimentais em rede multiambiente.",
        "Aplicação de modelos estatísticos e algorítmicos para suporte à tomada de decisão estratégica.",
        "Implementação de processos de inovação tecnológica para otimização da cadeia produtiva."
      ]
    },
    {
      company: "Núcleo de Estudos em Genética (GEN/UFLA)",
      role: "Gerente de Projetos e Coordenador de TI",
      period: "2019 - 2023",
      location: "Lavras, MG",
      description: [
        "Liderança na modernização da infraestrutura digital e gestão de ativos web (CMS).",
        "Gestão financeira e logística de grandes eventos (4 Simpósios Internacionais), coordenando equipes e fornecedores.",
        "Implementação de sistemas digitais para otimização de inscrições e processos administrativos."
      ]
    },
    {
      company: "Universidade Federal de Lavras (UFLA)",
      role: "Cientista de Dados (Pesquisador Associado)",
      period: "2017 - 2023",
      location: "Lavras, MG",
      description: [
        "Desenvolvimento de pipelines de análise para Big Data Genômico (GWAS/DArTseq).",
        "Uso avançado de R e Linux para processamento de dados complexos e modelagem estatística.",
        "Resolução de problemas biológicos complexos através de abordagens computacionais."
      ]
    },
    {
      company: "Flora Novaes Paisagismo LTDA",
      role: "Gestão Comercial e Projetos",
      period: "2016 - 2017",
      location: "Uberlândia, MG",
      description: [
        "Gerenciamento administrativo e financeiro, incluindo controle de fluxo de caixa e negociação B2B.",
        "Elaboração de projetos técnicos utilizando ferramentas de CAD e modelagem 3D.",
        "Atendimento consultivo e prospecção ativa de clientes para expansão de negócios."
      ]
    }
  ],
  
  education: [
    {
      institution: "Gran Faculdade",
      degree: "Graduação em Ciência da Computação",
      period: "2024 - Atual",
      location: "EAD",
      details: "Foco em Engenharia de Software, Algoritmos e Estrutura de Dados."
    },
    {
      institution: "Universidade Federal de Lavras (UFLA)",
      degree: "Doutorado (Foco em Genética Quantitativa e Estatística)",
      period: "2019 - 2023",
      location: "Lavras, MG",
      details: "Ênfase em análise de dados massivos e modelagem computacional."
    },
    {
      institution: "Universidade Federal de Viçosa (UFV)",
      degree: "Especialização em Inteligência Artificial e Computacional",
      period: "2022",
      location: "Viçosa, MG",
      details: "Pós-graduação Lato Sensu focada em Machine Learning."
    },
    {
      institution: "Universidade Federal de Lavras (UFLA)",
      degree: "Mestrado (Foco em Biologia Molecular)",
      period: "2017 - 2019",
      location: "Lavras, MG",
      details: "Pesquisa envolvendo marcadores moleculares e expressão gênica."
    },
    {
      institution: "Universidade Federal de Uberlândia (UFU)",
      degree: "Graduação em Agronomia",
      period: "2009 - 2015",
      location: "Uberlândia, MG",
      details: "Base sólida em ciências exatas e biológicas."
    }
  ],
  
  others: [
    {
      title: "Idiomas",
      description: ["Português (Nativo)", "Inglês (Avançado - Fluente em leitura técnica e comunicação)"]
    },
    {
      title: "Certificações Técnicas",
      description: [
        "Google Data Analytics Professional Certificate (Google, 2023)",
        "Linux para Bioinformática (Infraestrutura/Shell Script) (2022)",
        "SQL e Bancos de Dados (Conquer, 2022)",
        "Business Intelligence com Power BI (Conquer, 2022)"
      ]
    },
    {
      title: "Competências Transversais",
      description: [
        "Comunicação de Alto Impacto e Oratória (Conquer)",
        "Gestão de Tempo e Produtividade",
        "Trabalho em Equipe e Liderança Ágil"
      ]
    }
  ],
  
  references: [],
  
  keywords: "Python React JavaScript SQL Data Science Machine Learning Artificial Intelligence Web Development Full Stack Product Management Business Intelligence Analytics Linux Git Agile Scrum Leadership SaaS Cloud Computing Innovation Problem Solving"
};
