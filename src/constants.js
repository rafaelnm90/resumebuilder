// src/constants.js
export const EXIBIR_LOGS = true;

if (EXIBIR_LOGS) {
    console.log("🚀 [constants.js] Carregando configurações...");
    console.log("🌐 Dados ajustados: Modo Template / Placeholders ativado.");
}

export const FONTS = {
  'Roboto': { name: 'Roboto (Padrão)', url: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap' },
  'Merriweather': { name: 'Merriweather (Serif)', url: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap' },
  'Lato': { name: 'Lato (Moderno)', url: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap' },
  'Open Sans': { name: 'Open Sans (Neutro)', url: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap' },
  'Lora': { name: 'Lora (Elegante)', url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap' },
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
      historyTab: "Histórico de Vagas",
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
      historyTab: "Application History",
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
  prefixUseThemeColor: true, 
  prefixBold: true, 
  
  rightTextBold: false, 
  
  showLinkIcon: true, 
  
  lineHeight: 1.1,        
  headerSpacing: 5,      
  itemSpacing: 1.5,         
  sectionSpacing: 3,     
  pageBreakAuto: true,
  
  sectionItemSpacings: {
      education: 1        
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
   history: [],
  
  // ESTRUTURA PARA RODAPÉ (DATA/LOCAL)
  dateLocation: {
    visible: false,
    location: "Sua Cidade, UF", 
    date: "",
    autoDate: true,
    useBold: false,
    useThemeColor: true,
    format: 'numeric' 
  },

  personal: {
    name: "SEU NOME COMPLETO",
    email: "seu.email@exemplo.com",
    phone: "(00) 00000-0000",
    location: "Sua Cidade, UF",
    linkedin: "linkedin.com/in/seuperfil",
    github: "github.com/seuperfil",
    youtube: "", 
    lattes: "", 
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
    
    driverLicenses: [] 
  },
  
  objective: "Insira aqui o seu objetivo profissional. Seja claro e direto sobre a posição ou a área em que você deseja atuar.",
  
  summary: "Insira aqui o seu resumo profissional. Destaque em poucas linhas suas principais experiências, habilidades mais fortes e o valor que você pode agregar à empresa.",
  
  skills: [
    { category: "Categoria (ex: Idiomas)", items: "Insira os itens separados por vírgula (ex: Inglês Avançado, Espanhol Intermediário)." },
    { category: "Categoria (ex: Softwares)", items: "Insira os itens (ex: Pacote Office, Photoshop, AutoCAD)." },
    { category: "Categoria (ex: Soft Skills)", items: "Liderança, Comunicação assertiva, Resolução de problemas." }
  ],
  
  projects: [
    {
      title: "Nome do seu Projeto ou Iniciativa",
      link: "linkdoseuprojeto.com.br", 
      tech: "Ferramenta 1, Ferramenta 2",
      description: [
        "Descreva brevemente qual foi o foco principal deste projeto.",
        "Destaque o seu papel específico na execução e desenvolvimento.",
        "Mencione os resultados alcançados ou o impacto gerado por ele."
      ]
    }
  ],
  
  experience: [
    {
      company: "Nome da Empresa Atual ou Mais Recente",
      role: "Seu Cargo",
      period: "Mês/Ano - Atual",
      location: "Cidade, UF",
      description: [
        { prefix: 'Atividades', text: "Insira a descrição da sua atividade principal." },
        { prefix: 'Responsabilidades', text: "Descreva uma responsabilidade importante que você assumiu." },
        { prefix: 'Resultados', text: "Mencione um resultado ou meta alcançada durante o período." }
      ]
    },
    {
      company: "Nome da Empresa Anterior",
      role: "Seu Cargo Anterior",
      period: "Mês/Ano - Mês/Ano",
      location: "Cidade, UF",
      description: [
        { prefix: 'Atividades', text: "Descreva a principal função exercida." },
        { prefix: 'Resultados', text: "Destaque um projeto entregue ou melhoria implementada." }
      ]
    }
  ],
  
  education: [
    {
      institution: "Nome da Instituição de Ensino",
      degree: "Nome do Curso / Formação",
      period: "Ano Início - Ano Conclusão",
      location: "Cidade, UF",
      details: "Insira detalhes como: tema do TCC, prêmios acadêmicos ou foco do curso (opcional)."
    }
  ],
  
  others: [
    {
      title: "Certificações ou Cursos Extracurriculares",
      description: [
        { text: "Nome do Curso ou Certificação (Instituição, Ano)", hours: "40h", details: "Insira uma breve descrição sobre o que aprendeu (opcional)." },
        { text: "Nome de outro Curso Relevante", hours: "15h", details: "" }
      ]
    }
  ],
  
  references: [
    { name: 'Nome da Referência', company: 'Empresa', role: 'Cargo da Pessoa', email: 'email@exemplo.com', phone: '(00) 00000-0000' }
  ],
  
  keywords: "PalavraChave1 PalavraChave2 SoftSkill Ferramenta Tecnologia Competencia (Estas palavras ficam ocultas no PDF para otimizar a leitura por robôs de RH)"
};
