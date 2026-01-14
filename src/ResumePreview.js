// src/ResumePreview.js
import React from 'react';
import { MapPin, Mail, Phone, Linkedin, Github, FileText, Youtube } from 'lucide-react';
import { LIST_STYLES } from './constants';

const formatText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

export default function ResumePreview({ data, settings }) {
  const { structure, customSections, sectionOrder } = data; 
  
  const expColWidthCSS = `${settings.experienceColumnWidth}mm`;
  const eduColWidthCSS = `${settings.educationColumnWidth}mm`;
  const projColWidthCSS = `${settings.projectsColumnWidth}mm`;

  // Lógica de Espaçamento Dinâmico (Flex Gap)
  const listContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: `${settings.itemSpacing}mm`
  };

  // Lógica de Quebra de Página (Se Auto=True, remove 'keep-together')
  const pageBreakClass = settings.pageBreakAuto ? '' : 'keep-together';

  const { 
    photo, showPhoto, photoAlignment,
    photoShape, photoScale, photoX, photoY, photoGrayscale 
  } = data.personal;

  // Helper para renderizar itens de lista
  const renderListItems = (items) => {
    // Busca a configuração de estilo (Padrão: disc)
    const activeStyle = LIST_STYLES[settings.listStyle] || LIST_STYLES['disc'];
    
    // Verifica se é um dos estilos que precisa de mais espaçamento
    const isWideMarker = ['arrow', 'check', 'dash'].includes(settings.listStyle);

    return (items || []).map((item, i) => {
        if (!item || !item.trim()) return null; // Oculta itens vazios
        
        const isHeader = item.startsWith('## ');
        const isSub = item.startsWith('>> ');
        
        let text = item;
        let bulletClass = activeStyle.cssMain;
        let indentClass = '';
        let extraClasses = '';

        if (isHeader) {
            text = item.slice(3);
            bulletClass = 'list-none'; // Remove bullet
            // MARGEM SUPERIOR AUMENTADA (mt-6) para separar visualmente do bloco anterior
            extraClasses = 'font-bold text-gray-900 mt-6 mb-1 pt-1'; 
        } else if (isSub) {
            text = item.slice(3);
            bulletClass = activeStyle.cssSub;
            indentClass = 'ml-6';
            // Ajuste fino para sub-itens de ícones largos
            if (isWideMarker) extraClasses = 'pl-2';
        } else {
            // Item normal
            // PADDING LATERAL AUMENTADO (pl-3) para ícones largos
            if (isWideMarker) {
                extraClasses = 'pl-3';
            }
        }

        return (
            <li key={i} className={`break-words ${indentClass} ${bulletClass} ${extraClasses}`} style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>
                {formatText(text)}
            </li>
        );
    });
  };

  // Lógica de Renderização do Header
  const renderHeader = () => {
    const isPhotoVisible = showPhoto && photo;
    const align = photoAlignment || 'center'; 

    let containerClasses = `border-b-2 flex `;
    let textContainerClasses = "flex-1 ";
    let photoContainerClasses = "flex-shrink-0 ";
    let contactJustify = "justify-center";
    
    // PADDING INFERIOR DO HEADER (CONTROLADO PELO SLIDER)
    const headerStyle = { 
        borderColor: settings.themeColor,
        marginBottom: `${settings.headerSpacing}mm`,
        paddingBottom: `${settings.headerSpacing / 2}mm` // Padding proporcional à margem
    };

    if (isPhotoVisible) {
        if (align === 'left') {
            containerClasses += "flex-row items-center gap-6 text-left";
            textContainerClasses += "text-left";
            contactJustify = "justify-start";
        } else if (align === 'right') {
            containerClasses += "flex-row-reverse items-center gap-6 text-right";
            textContainerClasses += "text-right";
            contactJustify = "justify-end";
        } else {
            containerClasses += "flex-col items-center text-center";
            textContainerClasses += "text-center";
            contactJustify = "justify-center";
            photoContainerClasses += "mb-4";
        }
    } else {
        containerClasses += "flex-col items-center text-center";
        textContainerClasses += "text-center";
    }

    const photoStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'contain', 
        transform: `scale(${photoScale / 100}) translate(${photoX}%, ${photoY}%)`,
        filter: photoGrayscale ? 'grayscale(100%)' : 'none',
        transition: 'transform 0.1s'
    };

    let frameRadius = '50%'; 
    if (photoShape === 'square') frameRadius = '0%';
    if (photoShape === 'rounded') frameRadius = '12px';

    return (
        <header className={containerClasses} style={headerStyle}>
            {isPhotoVisible && (
                <div className={photoContainerClasses}>
                    <div 
                        className="w-28 h-28 border-2 border-gray-200 shadow-sm overflow-hidden bg-gray-100"
                        style={{ borderRadius: frameRadius }}
                    >
                        <img src={photo} alt="Foto de Perfil" style={photoStyle} />
                    </div>
                </div>
            )}
            <div className={textContainerClasses}>
                <h1 className="font-extrabold tracking-wide uppercase leading-none mb-2 break-words" style={{ color: settings.themeColor, fontSize: '1.8em' }}>{data.personal.name}</h1>
                <div className={`flex flex-wrap gap-x-3 gap-y-1 text-[0.9em] font-medium text-gray-700 leading-tight mb-2 ${contactJustify}`}>
                    {data.personal.email && <span className="flex items-center gap-1"><Mail size={'1em'}/> {data.personal.email}</span>}
                    {data.personal.phone && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><Phone size={'1em'}/> {data.personal.phone}</span>}
                    {data.personal.location && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><MapPin size={'1em'}/> {data.personal.location}</span>}
                </div>
                <div className={`flex flex-wrap gap-3 text-[0.9em] font-medium leading-tight ${contactJustify}`} style={{ color: settings.themeColor }}>
                    {data.personal.linkedin && <a href={`https://${data.personal.linkedin}`} className="flex items-center gap-1 hover:underline"><Linkedin size={'1em'}/> {data.personal.linkedin}</a>}
                    {data.personal.github && <a href={`https://${data.personal.github}`} className="flex items-center gap-1 hover:underline"><Github size={'1em'}/> {data.personal.github}</a>}
                    {data.personal.youtube && <a href={`https://${data.personal.youtube}`} className="flex items-center gap-1 hover:underline"><Youtube size={'1em'}/> YouTube</a>}
                    {data.personal.lattes && <a href={`https://${data.personal.lattes}`} className="flex items-center gap-1 hover:underline"><FileText size={'1em'}/> Lattes</a>}
                </div>
            </div>
        </header>
    );
  };

  const renderSection = (sectionId) => {
    // Helper de estilo para margin-bottom dinâmico
    const sectionStyle = { marginBottom: `${settings.sectionSpacing}mm` };

    if (sectionId.startsWith('custom-')) {
        const sec = customSections.find(s => s.id === sectionId);
        if (!sec || !sec.visible) return null;
        
        return (
            <section key={sec.id} className={`${pageBreakClass}`} style={sectionStyle}>
              <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{sec.title}</h3>
              {sec.type === 'text' && <p className="text-gray-800 break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(sec.content)}</p>}
              {sec.type === 'list' && (
                <ul className="list-outside ml-4 text-gray-800" style={listContainerStyle}>
                  {renderListItems(sec.content)}
                </ul>
              )}
              {sec.type === 'detailed' && (
                 <div style={listContainerStyle}>
                  {(Array.isArray(sec.content) ? sec.content : []).map((item, i) => (
                    <div key={i} className={pageBreakClass}>
                      <div className="flex flex-row items-baseline justify-between flex-row-print">
                        <div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-3">{formatText(item.title)}</div>
                        <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{item.location}</div>
                      </div>
                      <div className="flex flex-row items-baseline justify-between flex-row-print">
                        <div className="italic font-medium text-gray-800 leading-tight break-words flex-1 pr-3">{formatText(item.subtitle)}</div>
                        <div className="text-[0.9em] text-gray-600 font-medium text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{item.date}</div>
                      </div>
                      <div className="mt-1" style={{ paddingRight: expColWidthCSS }}>
                        <ul className="list-outside ml-4 text-gray-800" style={listContainerStyle}>
                          {renderListItems(item.description)}
                        </ul>
                      </div>
                    </div>
                  ))}
                 </div>
              )}
            </section>
        );
    }

    switch(sectionId) {
        case 'summary':
            return structure.summary.visible && data.summary && (
                <section key="summary" className={`${pageBreakClass}`} style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.summary.title}</h3>
                    <p className="text-gray-800 break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(data.summary)}</p>
                </section>
            );
        case 'skills':
            return structure.skills.visible && data.skills.length > 0 && (
                <section key="skills" className={`${pageBreakClass}`} style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.skills.title}</h3>
                    <div style={listContainerStyle}>
                    {data.skills.map((skill, i) => (
                        <div key={i} className="flex flex-row items-baseline gap-4" >
                        <div className="font-bold text-[0.95em] leading-tight break-words text-gray-800 flex-shrink-0" style={{ width: `${settings.leftColumnWidth}mm` }}>{formatText(skill.category)}</div>
                        <div className="text-gray-800 break-words leading-tight flex-1" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(skill.items)}</div>
                        </div>
                    ))}
                    </div>
                </section>
            );
        case 'projects':
            return structure.projects.visible && data.projects.length > 0 && (
                <section key="projects" style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-2 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.projects.title}</h3>
                    <div style={listContainerStyle}>
                    {data.projects.map((proj, i) => (
                        <div key={i} className={`${pageBreakClass} flex flex-row items-start gap-8 flex-row-print`}>
                        {/* LADO ESQUERDO */}
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-[1.05em] break-words mb-1">{proj.title}</h4>
                            <ul className="list-outside ml-4 text-gray-800" style={listContainerStyle}>
                                {renderListItems(proj.description)}
                            </ul>
                        </div>

                        {/* LADO DIREITO: Tech Box */}
                        <div className="flex-shrink-0 flex items-start justify-end mt-1" style={{ width: projColWidthCSS }}>
                            <span className="text-[0.85em] font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 border border-gray-200 inline-block break-words">
                                {proj.tech}
                            </span>
                        </div>
                        </div>
                    ))}
                    </div>
                </section>
            );
        case 'experience':
            return structure.experience.visible && data.experience.length > 0 && (
                <section key="experience" style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-2 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.experience.title}</h3>
                    <div style={listContainerStyle}>
                    {data.experience.map((exp, i) => {
                        const hasContent = exp.company?.trim() || exp.role?.trim() || (exp.description || []).some(d => d.trim());
                        if (!hasContent) return null;
                        return (
                        <div key={i} className={pageBreakClass}>
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-4">{exp.company}</div>
                            <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{exp.location}</div>
                        </div>
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="italic font-medium text-gray-800 leading-tight break-words flex-1 pr-4">{exp.role}</div>
                            <div className="text-[0.9em] text-gray-600 font-medium text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{exp.period}</div>
                        </div>
                        <div className="mt-1" style={{ paddingRight: expColWidthCSS }}>
                            <ul className="list-outside ml-4 text-gray-800" style={listContainerStyle}>
                                {renderListItems(exp.description)}
                            </ul>
                        </div>
                        </div>
                    )})}
                    </div>
                </section>
            );
        case 'education':
            return structure.education.visible && data.education.length > 0 && (
                <section key="education" style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-2 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.education.title}</h3>
                    <div style={{ ...listContainerStyle, gap: `${Math.min(settings.itemSpacing, 4)}mm` }}>
                    {data.education.map((edu, i) => {
                        const hasContent = edu.institution?.trim() || edu.degree?.trim();
                        if (!hasContent) return null;
                        return (
                        <div key={i} className={pageBreakClass}>
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold leading-tight break-words flex-1 pr-4">{edu.degree}</div>
                            <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: eduColWidthCSS }}>{edu.period}</div>
                            </div>
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="text-gray-800 leading-tight break-words flex-1 pr-4">{edu.institution}</div>
                            <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: eduColWidthCSS }}>{edu.location}</div>
                            </div>
                            {edu.details && (
                            <div className="mt-0.5" style={{ paddingRight: eduColWidthCSS }}>
                                <p className="text-[0.9em] text-gray-600 italic break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(edu.details)}</p>
                            </div>
                            )}
                        </div>
                    )})}
                    </div>
                </section>
            );
        case 'others':
            return structure.others.visible && data.others.length > 0 && (
                <section key="others" className={`${pageBreakClass}`} style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.others.title}</h3>
                    <div style={{ paddingRight: expColWidthCSS, ...listContainerStyle }}>
                        {data.others.map((item, i) => (
                            <div key={i} className={pageBreakClass}>
                                {item.title && <h4 className="font-bold text-gray-900 text-[0.95em] mb-1">{item.title}</h4>}
                                <ul className="list-outside ml-4 text-gray-800" style={listContainerStyle}>
                                    {renderListItems(item.description)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            );
        default: return null;
    }
  };

  return (
    <div 
      id="resume-preview" 
      lang="pt-BR"
      className="bg-white shadow-2xl relative"
      style={{ 
        fontFamily: `'${settings.font}', sans-serif`,
        width: '210mm',
        minHeight: '297mm',
        paddingTop: '20mm',
        paddingBottom: '20mm',
        paddingLeft: '15mm',
        paddingRight: '15mm',
        fontSize: `${settings.fontSizeBase}pt`,
        lineHeight: settings.lineHeight, // AGORA USA O SLIDER DIRETAMENTE
        boxSizing: 'border-box'
      }}
    >
      <div className="content-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
        
        {settings.showGuides && (
          <>
            <div className="absolute border border-green-400 border-dashed z-50 pointer-events-none page-guide" style={{ top: 0, bottom: 0, left: 0, right: 0 }}></div>
            <div className="absolute border-r border-blue-400 border-dashed h-full z-50 pointer-events-none opacity-50 page-guide" style={{ left: `${settings.leftColumnWidth}mm`, top: 0, bottom: 0 }}></div>
            <div className="absolute border-l border-red-400 border-dashed h-full z-50 pointer-events-none opacity-40 page-guide" style={{ right: expColWidthCSS, top: 0, bottom: 0 }}></div>
            <div className="absolute border-l border-orange-400 border-dotted h-full z-50 pointer-events-none opacity-60 page-guide" style={{ right: eduColWidthCSS, top: 0, bottom: 0 }}></div>
             <div className="absolute border-l border-purple-400 border-dotted h-full z-50 pointer-events-none opacity-60 page-guide" style={{ right: projColWidthCSS, top: 0, bottom: 0 }}></div>
          </>
        )}

        {renderHeader()}

        {sectionOrder.map(sectionId => renderSection(sectionId))}

      </div>
    </div>
  );
}
