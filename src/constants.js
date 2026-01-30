// src/constants.js
export const EXIBIR_LOGS = true;

if (EXIBIR_LOGS) {
    console.log("🚀 [constants.js] Carregando configurações e Backup Lattes Completo...");
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
      version: "v1.3 (Lattes + CNH)",
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
      addItem: "Adicionar Item (Topo)",
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
      summary: "Resumo Profissional",
      skills: "Competências & Habilidades",
      projects: "Projetos Relevantes",
      experience: "Experiência Profissional",
      education: "Formação Acadêmica",
      others: "Idiomas, Certificações e Eventos",
      references: "Referências Profissionais",
      keywords: "Camuflagem ATS (SEO)"
    }
  },
  en: {
    ui: {
      appName: "Resume Builder",
      version: "v1.3 (Lattes + CNH)",
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
      addItem: "Add Item (Top)",
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
  themeColor: '#1e40af', 
  bodyColor: '#1f2937', 
  sectionTitleBold: true,
  showGuides: false,
  showPageLines: false, 
  
  fontSizeBase: 9.5,      
  textAlign: 'justify',
  listStyle: 'disc',
  
  listMarkerBold: false,         
  listMarkerUseThemeColor: true, 
  
  roleUseThemeColor: true,      
  rightTextUseThemeColor: false, 
  
  rightTextBold: true, 
  
  showLinkIcon: true, 
  
  lineHeight: 1.15,        
  headerSpacing: 4,      
  itemSpacing: 1.0,         
  sectionSpacing: 2.5,     
  pageBreakAuto: true,
  
  sectionItemSpacings: {
      education: 1.0,
      skills: 0.5
  }, 
  
  experienceColumnWidth: 35, 
  educationColumnWidth: 35,  
  projectsColumnWidth: 35,   
  leftColumnWidth: 45        
};

// DADOS EXTRAÍDOS DO LATTES (2025/2026)
export const INITIAL_DATA = {
  sectionOrder: ['summary', 'skills', 'experience', 'projects', 'education', 'others', 'references', 'keywords'],

  structure: {
    objective: { title: "Objetivo", visible: false, id: 'objective' },
    summary: { title: "Resumo Profissional", visible: true, id: 'summary' },
    skills: { title: "Competências & Habilidades", visible: true, id: 'skills' },
    projects: { title: "Projetos Relevantes", visible: true, id: 'projects' },
    experience: { title: "Experiência Profissional", visible: true, id: 'experience' },
    education: { title: "Formação Acadêmica", visible: true, id: 'education' },
    others: { title: "Idiomas, Certificações e Eventos", visible: true, id: 'others' },
    references: { title: "Referências Profissionais", visible: false, id: 'references' },
    keywords: { title: "Camuflagem ATS (SEO)", visible: false, id: 'keywords' }
  },
  customSections: [], 
  personal: {
    name: "RAFAEL NOVAIS DE MIRANDA",
    email: "rafaelnovaismiranda@gmail.com",
    phone: "(35) 3821-1829", // Telefone da UFLA disponível no Lattes, altere para o celular se necessário
    location: "Minas Gerais, Brasil",
    linkedin: "linkedin.com/in/rafael-miranda", // Placeholder baseado no nome
    github: "github.com/rafael-miranda", // Placeholder baseado no nome
    youtube: "", 
    lattes: "lattes.cnpq.br/6450189926093594", 
    website: "agrostat.streamlit.app",
    
    // CAMPO NOVO PARA CNH
    cnh: [], 

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
  objective: "Atuar na interface entre Ciências Agrárias e Ciência da Computação (AgTech), aplicando conhecimentos de Genética, Estatística e Desenvolvimento de Software para criar soluções data-driven.",
  summary: "Profissional com perfil multidisciplinar atuando na interface entre Ciências Agrárias e Ciência da Computação. Doutor em Genética e Melhoramento de Plantas (UFLA) e graduando em Ciência da Computação. Possui sólida experiência em análise experimental, modelagem de dados e genética quantitativa (GWAS). Desenvolvedor de soluções de software voltadas para automação e análise estatística agronômica, com domínio em Python, R e Google Apps Script. Atualmente Pesquisador Doutor na EPAMIG, liderando projetos de inovação tecnológica para a cadeia de grãos e gestão de redes experimentais multi-ambientes.",
  skills: [
    { 
        category: "Linguagens & Dev", 
        items: "Python (Pandas, Streamlit), R (Análise Estatística/Biometria), Google Apps Script, SQL." 
    },
    { 
        category: "Data Science", 
        items: "Genética Quantitativa, GWAS (Genome-Wide Association Study), Modelos Mistos (REML/BLUP), Estatística Espacial." 
    },
    { 
        category: "Bioinformática", 
        items: "Análise de expressão diferencial (cDNA-RAPD), Linux para Bioinformática, Desenho de primers." 
    },
    { 
        category: "Agronomia", 
        items: "Melhoramento Genético, Gestão de Redes de VCU (Milho/Feijão), Fitopatologia (Mofo branco, Mancha angular)." 
    },
    { 
        category: "Gestão & Soft Skills", 
        items: "Gestão de Projetos, Organização de Eventos Internacionais, Liderança de Equipes, Comunicação Técnica." 
    }
  ],
  projects: [
    {
      title: "AgroStatPro - Solução SaaS para Pesquisa Agrícola",
      link: "agrostat.streamlit.app", 
      tech: "Python, Streamlit",
      description: [
        "Desenvolvimento integral de software focado em análise estatística agronômica.",
        "Integração de inteligência de dados e otimização de processos de pesquisa."
      ]
    },
    {
      title: "Mapeamento GWAS em Feijão (Doutorado)",
      link: "", 
      tech: "R, FarmCPU, DArTseq",
      description: [
        "Identificação de região genômica (QTL) no cromossomo Pv04 associada à resistência à mancha angular.",
        "Uso de painel de 180 linhagens e modelos estatísticos avançados (FarmCPU) explicando 47% da variação fenotípica."
      ]
    },
    {
      title: "Portal e Sistemas do GEN (UFLA)",
      link: "", 
      tech: "Web, CMS, Gestão",
      description: [
        "Liderança na modernização da infraestrutura digital e gestão de ativos web do núcleo.",
        "Implementação de sistemas de gestão de inscrições e submissão de trabalhos para eventos internacionais."
      ]
    }
  ],
  experience: [
    {
      company: "EPAMIG (Empresa de Pesquisa Agropecuária de Minas Gerais)",
      role: "Pesquisador Doutor (Bolsista BDCTI-I)",
      period: "2024 - 2025",
      location: "Minas Gerais",
      description: [
        "Gestão de Rede Experimental Multi-ambiente de VCU (Valor de Cultivo e Uso) de milho.",
        "Análise estratégica de dados utilizando modelos biométricos e estatística espacial.",
        "Difusão de tecnologia e posicionamento ecofisiológico de híbridos para o setor produtivo."
      ]
    },
    {
      company: "UFLA - Núcleo de Estudos em Genética (GEN)",
      role: "Vice-Coordenador Geral e Coord. de Informática",
      period: "2019 - 2023",
      location: "Lavras, MG",
      description: [
        "Liderança executiva no planejamento estratégico e organização de 4 Simpósios Internacionais.",
        "Modernização da presença digital, gestão de website e suporte de TI para eventos.",
        "Gestão financeira e captação de recursos junto à iniciativa privada."
      ]
    },
    {
      company: "Flora Novaes Paisagismo LTDA",
      role: "Assistente Comercial e Técnico",
      period: "2016 - 2017",
      location: "Brasil",
      description: [
        "Elaboração de projetos executivos (CAD) e consultoria técnica agronômica.",
        "Gestão administrativa, controle de estoque e prospecção ativa de clientes."
      ]
    },
    {
      company: "Vazante Agropecuária LTDA",
      role: "Estagiário (Agronomia)",
      period: "2012",
      location: "Brasil",
      description: [
        "Monitoramento de produção de cana-de-açúcar de alta performance.",
        "Controle de qualidade de plantio, tratos culturais e logística de colheita."
      ]
    },
    {
      company: "UFU - Laboratório de Análise de Solos (LABAS)",
      role: "Estagiário",
      period: "2012",
      location: "Uberlândia, MG",
      description: [
        "Execução de rotinas laboratoriais de análise física e química de solos."
      ]
    }
  ],
  education: [
    {
      institution: "Gran Faculdade",
      degree: "Graduação em Ciência da Computação",
      period: "2024 - Atual",
      location: "EAD",
      details: "Foco em expansão de métodos computacionais para problemas biológicos complexos."
    },
    {
      institution: "Universidade Federal de Lavras (UFLA)",
      degree: "Doutorado em Genética e Melhoramento de Plantas",
      period: "2019 - 2023",
      location: "Lavras, MG",
      details: "Tese sobre GWAS em feijão-comum. Bolsista CNPq."
    },
    {
      institution: "Universidade Federal de Viçosa (UFV)",
      degree: "Especialização em Inteligência Artificial e Computacional",
      period: "2022 - 2022",
      location: "Viçosa, MG",
      details: "Carga horária: 420h."
    },
    {
      institution: "Universidade Federal de Lavras (UFLA)",
      degree: "Mestrado em Genética e Melhoramento de Plantas",
      period: "2017 - 2019",
      location: "Lavras, MG",
      details: "Pesquisa em expressão gênica diferencial (cDNA-RAPD) na interação planta-patógeno."
    },
    {
      institution: "Universidade Federal de Uberlândia (UFU)",
      degree: "Graduação em Agronomia",
      period: "2009 - 2016",
      location: "Uberlândia, MG",
      details: "Mobilidade acadêmica na UFLA (2013)."
    }
  ],
  others: [
    {
      title: "Idiomas",
      description: [
        "Inglês: Compreende Bem, Fala Bem, Lê Bem, Escreve Bem.",
        "Português: Nativo."
      ]
    },
    {
      title: "Certificações Técnicas",
      description: [
        "Google Data Analytics (Google, 2023)",
        "Linux Para Bioinformática (EMAS, 2022)",
        "SQL: A linguagem dos bancos de dados (Conquer, 2022)",
        "Análises de Dados e Power BI (Conquer, 2022)",
        "Estatística Experimental Avançada no Software Genes (UFV, 2021)",
        "Uso do R em Genética Molecular (UFLA, 2019)"
      ]
    },
    {
      title: "Organização de Eventos (Destaques)",
      description: [
        "XXVI International Symposium in Genetics and Plant Breeding (2022)",
        "XXV International Symposium in Genetics and Plant Breeding (2021)",
        "XXIV International Symposium in Genetics and Plant Breeding (2020)"
      ]
    }
  ],
  references: [],
  keywords: "Python R SQL Java Genetics Breeding GWAS Statistics Data Analysis Bioinformática Agriculture AgTech Research Leadership Project Management English Plant Pathology Molecular Biology Automation Web Scraping Streamlit Pandas Numpy Linux Machine Learning Artificial Intelligence"
};
