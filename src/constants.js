// src/constants.js
export const EXIBIR_LOGS = true;

if (EXIBIR_LOGS) {
    console.log("🚀 [constants.js] Carregando configurações...");
    console.log("🌐 Dados preenchidos com base no Currículo Lattes (Histórico Completo).");
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
    
    // CNH
    driverLicenses: ['A', 'C'] 
  },
  
  objective: "Profissional com perfil multidisciplinar, atuando na interface entre as Ciências Agrárias e a Ciência da Computação. Busco oportunidades que permitam integrar análise de dados, desenvolvimento de software e gestão técnica para otimização de processos e tomada de decisão estratégica.",
  
  summary: "Doutor em Genética e Melhoramento de Plantas pela UFLA, atualmente graduando em Ciência da Computação para expandir a aplicação de métodos computacionais. Possui sólida experiência em análise experimental, modelagem de dados e liderança técnica, tendo atuado como pesquisador na EPAMIG e coordenador de TI no Núcleo de Estudos em Genética (GEN). Desenvolvedor do software AgroStatPro, com domínio de Python, R, SQL e ferramentas de Business Intelligence.",
  
  skills: [
    { category: "Linguagens & Desenvolvimento", items: "Python, R (Avançado), SQL, Google Apps Script, Streamlit, HTML/CSS." },
    { category: "Dados & BI", items: "Power BI, Excel Avançado, Google Data Analytics, Análise Multivariada, Modelos Mistos, Estatística Experimental." },
    { category: "Infraestrutura & Ferramentas", items: "Linux (Bioinformática), Git/GitHub, Docker, Google Cloud Platform (Conceitos)." },
    { category: "Gestão & Soft Skills", items: "Liderança de Equipes, Organização de Eventos, Gestão Financeira, Comunicação Estratégica, Planejamento de Projetos." },
    { category: "Agrárias & Bio", items: "Genética Quantitativa, GWAS, Biologia Molecular, Manejo de Culturas (Milho/Feijão/Cana), Fitopatologia." }
  ],
  
  projects: [
    {
      title: "AgroStatPro - Software de Análise Estatística",
      link: "agrostat.streamlit.app", 
      tech: "Python, Streamlit, Pandas",
      description: [
        "Desenvolvimento integral de solução SaaS focada em análise estatística agronômica.",
        "Integração de inteligência de dados e otimização de processos para pesquisadores."
      ]
    },
    {
      title: "Coordenação Geral e de TI - GEN (Núcleo de Estudos)",
      link: "ufla.br", 
      tech: "Gestão, Web, CMS",
      description: [
        "Liderança na modernização da infraestrutura digital e gestão de ativos web.",
        "Responsável pela organização logística e financeira de 4 Simpósios Internacionais e 12 Cursos.",
        "Implementação de sistemas de gestão de inscrições e suporte tecnológico em eventos."
      ]
    },
    {
      title: "Mapeamento Genético (GWAS) em Feijão-Comum",
      link: "lattes.cnpq.br/6450189926093594", 
      tech: "R, Linux, Genomics",
      description: [
        "Identificação de marcadores moleculares para resistência à Mancha Angular usando modelos mistos.",
        "Análise de grandes volumes de dados genotípicos (DArTseq) e fenotípicos."
      ]
    }
  ],
  
  experience: [
    {
      company: "Empresa de Pesquisa Agropecuária de Minas Gerais (EPAMIG)",
      role: "Pesquisador Doutor (Bolsista BDCTI-I)",
      period: "2024 - 2025",
      location: "Minas Gerais",
      description: [
        "Condução de ensaios de Valor de Cultivo e Uso (VCU) de milho em rede multiambiente.",
        "Gestão de dados experimentais e análise estatística para posicionamento ecofisiológico de híbridos.",
        "Difusão de tecnologias inovadoras para o setor produtivo e mitigação de riscos na safra."
      ]
    },
    {
      company: "Universidade Federal de Lavras (UFLA)",
      role: "Pesquisador (Doutorado) & Vice-Coordenador GEN",
      period: "2019 - 2023",
      location: "Lavras, MG",
      description: [
        "Pesquisa em Genética Quantitativa e Genômica (GWAS).",
        "Atuação como Vice-Coordenador Geral e Coordenador de Informática do GEN.",
        "Representante Discente no Colegiado do Programa de Pós-Graduação e na Comissão de Bolsas (PROEX/CAPES)."
      ]
    },
    {
      company: "Universidade Federal de Lavras (UFLA)",
      role: "Pesquisador (Mestrado)",
      period: "2017 - 2019",
      location: "Lavras, MG",
      description: [
        "Investigação de expressão gênica diferencial (cDNA-RAPD) em feijoeiro.",
        "Otimização de protocolos laboratoriais para extração de RNA.",
        "Coordenação de Informática no Núcleo de Estudos (GEN)."
      ]
    },
    {
      company: "Flora Novaes Paisagismo LTDA",
      role: "Assistente Comercial e Técnico",
      period: "2016 - 2017",
      location: "Uberlândia, MG",
      description: [
        "Elaboração de projetos executivos e paisagísticos (AutoCAD/SketchUp).",
        "Gestão administrativa, controle de fluxo de caixa e negociação com fornecedores.",
        "Consultoria técnica agronômica e prospecção de clientes."
      ]
    },
    {
      company: "Vazante Agropecuária LTDA",
      role: "Estagiário (Agronomia)",
      period: "2012",
      location: "Vazante, MG",
      description: [
        "Monitoramento técnico de produção comercial de cana-de-açúcar.",
        "Controle de qualidade de plantio, tratos culturais e logística de colheita (CTT)."
      ]
    }
  ],
  
  education: [
    {
      institution: "Gran Faculdade",
      degree: "Graduação em Ciência da Computação",
      period: "2024 - Atual",
      location: "EAD",
      details: "Foco em desenvolvimento de software e algoritmos."
    },
    {
      institution: "Universidade Federal de Lavras (UFLA)",
      degree: "Doutorado em Genética e Melhoramento de Plantas",
      period: "2019 - 2023",
      location: "Lavras, MG",
      details: "Tese em mapeamento associativo (GWAS) e resistência a doenças."
    },
    {
      institution: "Universidade Federal de Viçosa (UFV)",
      degree: "Especialização em Inteligência Artificial e Computacional",
      period: "2022",
      location: "Viçosa, MG",
      details: "Pós-graduação Lato Sensu (420h)."
    },
    {
      institution: "Universidade Federal de Lavras (UFLA)",
      degree: "Mestrado em Genética e Melhoramento de Plantas",
      period: "2017 - 2019",
      location: "Lavras, MG",
      details: "Dissertação em expressão gênica diferencial e marcadores moleculares."
    },
    {
      institution: "Universidade Federal de Uberlândia (UFU)",
      degree: "Graduação em Agronomia",
      period: "2009 - 2016",
      location: "Uberlândia, MG",
      details: "Inclui período de mobilidade acadêmica na UFLA."
    }
  ],
  
  others: [
    {
      title: "Idiomas",
      description: ["Português (Nativo)", "Inglês (Avançado - Leitura, Escrita e Fala)"]
    },
    {
      title: "Certificações Técnicas",
      description: [
        "Google Data Analytics Professional Certificate (Google, 2023)",
        "Linux para Bioinformática (EMAS, 2022)",
        "SQL: A linguagem dos bancos de dados (Conquer, 2022)",
        "Análise de Dados e Power BI (Conquer, 2022)",
        "Excel Avançado (Conquer, 2022)"
      ]
    },
    {
      title: "Soft Skills & Outros",
      description: [
        "Apresentações de Alto Impacto (Conquer, 2022)",
        "Liderança e Gestão de Equipes (Experiência Prática no GEN)"
      ]
    }
  ],
  
  references: [],
  
  keywords: "Python R SQL Data Science Machine Learning Artificial Intelligence Agronomy Genetics Plant Breeding Bioinformatics Linux Git GitHub Leadership Project Management Event Management Financial Management Sales Customer Service AutoCAD SketchUp Microsoft Office Power BI Google Analytics Research Development Innovation"
};
