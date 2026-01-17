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

  const pageBreakClass = settings.pageBreakAuto ? '' : 'keep-together';

  const { 
    photo, showPhoto, photoAlignment,
    photoShape, photoScale, photoX, photoY, photoGrayscale,
    photoRotate, photoBrightness, photoContrast, photoSaturation,
    photoFlip, photoCover, photoBorder, photoShadow
  } = data.personal;

  // Função auxiliar para pegar espaçamento da seção ou o global
  const getSectionSpacing = (sectionId) => {
      const specific = settings.sectionItemSpacings?.[sectionId];
      return specific !== undefined ? `${specific}mm` : `${settings.itemSpacing}mm`;
  };

  // ESTILO DINÂMICO PARA TEXTO À DIREITA (DATA/LOCAL/TAGS)
  // Se a opção estiver marcada, usa bold e remove transparência. Se não, usa medium e opacidade.
  const rightTextStyle = settings.rightTextBold 
    ? "font-bold text-gray-900" 
    : "font-medium text-gray-700 opacity-75";

  // src/ResumePreview.js

  const renderListItems = (items, sectionId) => {
    const activeStyle = LIST_STYLES[settings.listStyle] || LIST_STYLES['disc'];
    const isWideMarker = ['arrow', 'check', 'dash'].includes(settings.listStyle);

    return (items || []).map((item, i) => {
        if (!item || !item.trim()) return null;
        
        const isHeader = item.startsWith('## ');
        const isSub = item.startsWith('>> ');
        
        let text = item;
        let bulletClass = activeStyle.cssMain;
        let indentClass = '';
        let extraClasses = '';

        if (isHeader) {
            text = item.slice(3);
            bulletClass = 'list-none'; 
            extraClasses = 'font-bold mt-6 mb-1 pt-1'; 
        } else if (isSub) {
            text = item.slice(3);
            bulletClass = activeStyle.cssSub;
            indentClass = 'ml-6';
            if (isWideMarker) extraClasses = 'pl-2';
        } else {
            if (isWideMarker) {
                extraClasses = 'pl-3';
            }
        }

        // ALTERAÇÃO: 
        // 1. Cor do marcador depende de settings.listMarkerUseThemeColor
        // 2. Se for TRUE: usa ThemeColor
        // 3. Se for FALSE: usa BodyColor
        
        const markerColor = settings.listMarkerUseThemeColor ? settings.themeColor : (settings.bodyColor || '#374151');

        return (
            <li 
                key={i} 
                className={`break-words ${indentClass} ${bulletClass} ${extraClasses} ${settings.listMarkerBold ? 'marker:font-bold' : ''}`} 
                style={{ 
                    textAlign: settings.textAlign, 
                    textJustify: 'inter-word',
                    color: isHeader ? settings.bodyColor : markerColor // Aqui aplica a lógica
                }}
            >
                <span style={{ color: settings.bodyColor || '#374151' }}>
                    {formatText(text)}
                </span>
            </li>
        );
    });
  };

  const renderHeader = () => {
    const isPhotoVisible = showPhoto && photo;
    const align = photoAlignment || 'center'; 

    let containerClasses = `border-b-2 flex `;
    let textContainerClasses = "flex-1 ";
    let photoContainerClasses = "flex-shrink-0 ";
    let contactJustify = "justify-center";
    
    const headerStyle = { 
        borderColor: settings.themeColor,
        marginBottom: `${settings.headerSpacing}mm`,
        paddingBottom: `${settings.headerSpacing / 2}mm` 
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

    const scaleX = (photoScale / 100) * (photoFlip ? -1 : 1);
    const scaleY = (photoScale / 100);

    const photoStyle = {
        width: '100%',
        height: '100%',
        objectFit: photoCover ? 'cover' : 'contain', 
        transform: `scale(${scaleX}, ${scaleY}) translate(${photoX}%, ${photoY}%) rotate(${photoRotate || 0}deg)`,
        filter: `${photoGrayscale ? 'grayscale(100%)' : ''} brightness(${photoBrightness || 100}%) contrast(${photoContrast || 100}%) saturate(${photoSaturation || 100}%)`,
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
                        className="w-28 h-28 overflow-hidden bg-gray-100"
                        style={{ 
                            borderRadius: frameRadius,
                            borderWidth: `${photoBorder || 0}px`,
                            borderColor: settings.themeColor,
                            borderStyle: 'solid',
                            boxShadow: photoShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
                        }}
                    >
                        <img src={photo} alt="Foto de Perfil" style={photoStyle} />
                    </div>
                </div>
            )}
            <div className={textContainerClasses}>
                <h1 className="font-extrabold tracking-wide uppercase leading-none mb-2 break-words" style={{ color: settings.themeColor, fontSize: '1.8em' }}>{data.personal.name}</h1>
                <div className={`flex flex-wrap gap-x-3 gap-y-1 text-[0.9em] font-medium leading-tight mb-2 ${contactJustify}`}>
                    {data.personal.email && <span className="flex items-center gap-1"><Mail size={'1em'}/> {data.personal.email}</span>}
                    {data.personal.phone && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><Phone size={'1em'}/> {data.personal.phone}</span>}
                    {data.personal.location && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><MapPin size={'1em'}/> {data.personal.location}</span>}
                </div>
                <div className={`flex flex-wrap gap-3 text-[0.9em] font-medium leading-tight ${contactJustify}`} style={{ color: settings.themeColor }}>
                    {data.personal.linkedin && <a href={`https://${data.personal.linkedin}`} className="flex items-center gap-1 hover:underline"><Linkedin size={'1em'}/> {data.personal.linkedin}</a>}
                    {data.personal.github && <a href={`https://${data.personal.github}`} className="flex items-center gap-1 hover:underline"><Github size={'1em'}/> {data.personal.github}</a>}
                    {data.personal.lattes && <a href={`https://${data.personal.lattes}`} className="flex items-center gap-1 hover:underline"><FileText size={'1em'}/> Lattes</a>}
                    {data.personal.youtube && <a href={`https://${data.personal.youtube}`} className="flex items-center gap-1 hover:underline"><Youtube size={'1em'}/> YouTube</a>}
                </div>
            </div>
        </header>
    );
  };

  const renderSection = (sectionId) => {
    const sectionStyle = { marginBottom: `${settings.sectionSpacing}mm` };
    const currentListStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: getSectionSpacing(sectionId)
    };

    if (sectionId.startsWith('custom-')) {
        const sec = customSections.find(s => s.id === sectionId);
        if (!sec || !sec.visible) return null;
        
        return (
            <section key={sec.id} className={`${pageBreakClass}`} style={sectionStyle}>
              <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{sec.title}</h3>
              {sec.type === 'text' && <p className="break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(sec.content)}</p>}
              {sec.type === 'list' && (
                <ul className="list-outside ml-4" style={currentListStyle}>
                  {renderListItems(sec.content, sectionId)}
                </ul>
              )}
              {sec.type === 'detailed' && (
                 <div style={currentListStyle}>
                  {(Array.isArray(sec.content) ? sec.content : []).map((item, i) => (
                    <div key={i} className={pageBreakClass}>
                      <div className="flex flex-row items-baseline justify-between flex-row-print">
                        <div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-3">{formatText(item.title)}</div>
                        <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS }}>{item.location}</div>
                      </div>
                      <div className="flex flex-row items-baseline justify-between flex-row-print">
                        <div className="italic font-medium leading-tight break-words flex-1 pr-3">{formatText(item.subtitle)}</div>
                        <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS }}>{item.date}</div>
                      </div>
                      <div className="mt-1" style={{ paddingRight: expColWidthCSS }}>
                        <ul className="list-outside ml-4" style={currentListStyle}>
                          {renderListItems(item.description, sectionId)}
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
                    <p className="break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(data.summary)}</p>
                </section>
            );
        case 'skills':
            return structure.skills.visible && data.skills.length > 0 && (
                <section key="skills" className={`${pageBreakClass}`} style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.skills.title}</h3>
                    <div style={currentListStyle}>
                    {data.skills.map((skill, i) => (
                        <div key={i} className="flex flex-row items-baseline gap-4" >
                        <div className="font-bold text-[0.95em] leading-tight break-words flex-shrink-0" style={{ width: `${settings.leftColumnWidth}mm` }}>{formatText(skill.category)}</div>
                        <div className="break-words leading-tight flex-1" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(skill.items)}</div>
                        </div>
                    ))}
                    </div>
                </section>
            );
        case 'projects':
            return structure.projects.visible && data.projects.length > 0 && (
                <section key="projects" style={sectionStyle}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-2 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.projects.title}</h3>
                    <div style={currentListStyle}>
                    {data.projects.map((proj, i) => (
                        <div key={i} className={`${pageBreakClass} flex flex-row items-start gap-8 flex-row-print`}>
                        <div className="flex-1">
                            <h4 className="font-bold text-[1.05em] break-words mb-1">{proj.title}</h4>
                            <ul className="list-outside ml-4" style={currentListStyle}>
                                {renderListItems(proj.description, sectionId)}
                            </ul>
                        </div>
                        <div className="flex-shrink-0 flex items-start justify-end mt-1" style={{ width: projColWidthCSS }}>
                            <span className={`text-[0.85em] bg-gray-100 px-2 py-1 rounded border border-gray-200 inline-block break-words hyphens-auto ${settings.rightTextBold ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`} style={{ hyphens: 'auto' }}>
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
                    <div style={currentListStyle}>
                    {data.experience.map((exp, i) => {
                        const hasContent = exp.company?.trim() || exp.role?.trim() || (exp.description || []).some(d => d.trim());
                        if (!hasContent) return null;
                        return (
                        <div key={i} className={pageBreakClass}>
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-4">{exp.company}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS }}>{exp.location}</div>
                        </div>
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="italic font-medium leading-tight break-words flex-1 pr-4">{exp.role}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS }}>{exp.period}</div>
                        </div>
                        <div className="mt-1" style={{ paddingRight: expColWidthCSS }}>
                            <ul className="list-outside ml-4" style={currentListStyle}>
                                {renderListItems(exp.description, sectionId)}
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
                    <div style={{ ...currentListStyle, gap: `${Math.min(parseFloat(getSectionSpacing(sectionId)), 4)}mm` }}>
                    {data.education.map((edu, i) => {
                        const hasContent = edu.institution?.trim() || edu.degree?.trim();
                        if (!hasContent) return null;
                        return (
                        <div key={i} className={pageBreakClass}>
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold leading-tight break-words flex-1 pr-4">{edu.degree}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: eduColWidthCSS }}>{edu.period}</div>
                            </div>
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="leading-tight break-words flex-1 pr-4">{edu.institution}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: eduColWidthCSS }}>{edu.location}</div>
                            </div>
                            {edu.details && (
                            <div className="mt-0.5" style={{ paddingRight: eduColWidthCSS }}>
                                <p className="text-[0.9em] opacity-75 italic break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(edu.details)}</p>
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
                    <div style={{ paddingRight: expColWidthCSS, ...currentListStyle }}>
                        {data.others.map((item, i) => (
                            <div key={i} className={pageBreakClass}>
                                {item.title && <h4 className="font-bold text-[0.95em] mb-1">{item.title}</h4>}
                                <ul className="list-outside ml-4" style={currentListStyle}>
                                    {renderListItems(item.description, sectionId)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            );
        default: return null;
    }
  };

  // --- MONTAGEM DO CONTEÚDO ---
  const ResumeContent = (
      <>
        {renderHeader()}
        {sectionOrder.map(sectionId => renderSection(sectionId))}
      </>
  );

  const lineStyle = { 
    width: '100%',
    height: '2px', 
    backgroundColor: settings.showPageLines ? settings.themeColor : 'transparent', // Se false, fica transparente mas ocupa espaço
  };

  const typographyStyles = {
    fontFamily: `'${settings.font}', sans-serif`,
    color: settings.bodyColor || '#374151', 
    fontSize: `${settings.fontSizeBase}pt`,
    lineHeight: settings.lineHeight, 
  };

  // ESTRUTURA UNIFICADA (TABELA PARA TODOS OS MODOS)
  return (
    <div id="resume-preview" lang="pt-BR" className="bg-white shadow-2xl relative" style={{
        ...typographyStyles,
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        position: 'relative'
    }}>
        {settings.showGuides && (
            <>
            <div className="absolute border border-green-400 border-dashed z-50 pointer-events-none page-guide" style={{ top: 0, bottom: 0, left: 0, right: 0 }}></div>
            <div className="absolute border-r border-blue-400 border-dashed h-full z-50 pointer-events-none opacity-50 page-guide" style={{ left: `${settings.leftColumnWidth}mm`, top: 0, bottom: 0 }}></div>
            </>
        )}

        {/* LINHA DE RODAPÉ FIXA (Controlada pela cor transparente) */}
        <div style={{
            position: 'fixed',
            bottom: '20mm', 
            left: '15mm',   
            right: '15mm',  
            height: '2px',
            backgroundColor: settings.showPageLines ? settings.themeColor : 'transparent', 
            zIndex: 9999
        }}></div>

        <table style={{ width: '100%', borderCollapse: 'collapse', ...typographyStyles }}>
            <thead>
                <tr>
                    <td style={{ paddingTop: '20mm', paddingBottom: '2mm', paddingLeft: '15mm', paddingRight: '15mm' }}>
                        {/* A linha existe fisicamente, mas fica invisível se a opção estiver desmarcada */}
                        <div className="preview-line" style={lineStyle}></div>
                    </td>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td style={{ height: '20mm', padding: 0 }}></td>
                </tr>
            </tfoot>
            <tbody>
                <tr>
                    <td style={{ verticalAlign: 'top', paddingLeft: '15mm', paddingRight: '15mm' }}>
                        <div className="content-container" style={{ width: '100%', ...typographyStyles }}>
                            {ResumeContent}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}
