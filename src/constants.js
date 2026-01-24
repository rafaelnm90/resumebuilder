// src/constants.js
const EXIBIR_LOGS = true;

if (EXIBIR_LOGS) {
    console.log("🚀 [constants.js] Carregando configurações...");
    console.log("🌐 Dicionário de Tradução (PT/EN) atualizado com avisos de risco detalhados.");
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
      version: "V8.0 - Security Update",
      downloadPdf: "Baixar PDF",
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
      colorDates: "Datas, Locais & Tech",
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
      expandEditor: "Expandir Editor em Tela Cheia",
      
      // NOVOS TEXTOS DE ALERTA (MAIS AGRESSIVOS)
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
      atsRecommendation: "RECOMENDAÇÃO TÉCNICA: Esta prática funcionava em 2015. Hoje, os algoritmos penalizam isso. Se não quiser correr o risco de 'Shadowban', clique em DESATIVAR acima.",
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
      version: "V8.0 - Security Update",
      downloadPdf: "Download PDF",
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
      
      // NEW AGGRESSIVE WARNING TEXTS (ENGLISH)
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
  itemSpacing: 3,         
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
    // ATENÇÃO: Referências Profissionais desativada por padrão
    references: { title: "Referências Profissionais", visible: false, id: 'references' },
    keywords: { title: "Camuflagem ATS (SEO)", visible: false, id: 'keywords' }
  },
  customSections: [], 
  personal: {
    name: "RAFAEL NOVAIS DE MIRANDA",
    email: "rafaelnovaismiranda@gmail.com",
    phone: "(34) 99777-9966",
    location: "Lavras, MG",
    linkedin: "linkedin.com/in/rafael-miranda",
    github: "github.com/rafael-miranda",
    youtube: "youtube.com/@rafael-miranda", 
    lattes: "lattes.cnpq.br/123456789", 
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
    photoShadow: false    
  },
  objective: "Atuar como Desenvolvedor de Software Full Stack, aplicando conhecimentos em Python e React para criar soluções escaláveis e eficientes.",
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
      link: "agrostat.streamlit.app", 
      tech: "Python, Streamlit, Pandas",
      description: [
        "Desenvolvimento **Fullstack** para automação de cálculos estatísticos.",
        "Transformação de scripts acadêmicos complexos em um produto de dados intuitivo (SaaS).",
        "Demonstração de entrega de software, saindo do ambiente de pesquisa para uma solução de mercado."
      ]
    },
    {
      title: "Suíte de Automação e Web Scraping",
      link: "github.com/rafael/automacao", 
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
  ],
  references: [
    {
      name: "Nome do Indicador",
      company: "Empresa Parceira / Anterior",
      role: "Cargo (ex: Gerente de Projetos)",
      email: "email.corporativo@empresa.com",
      phone: "(XX) 99999-9999"
    }
  ],
  keywords: "Python Java React SQL AWS Docker Kubernetes Leadership Management Agile Scrum Data Analysis Machine Learning AI Project Management Communication Teamwork Problem Solving Critical Thinking Creativity Time Management Adaptability Flexibility Sales Marketing Customer Service Finance Accounting HR Operations Strategy Innovation Growth Efficiency ROI KPIs Metrics Analytics Reporting"
};
