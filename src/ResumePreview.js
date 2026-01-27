// src/ResumePreview.js
import React from 'react';
import { MapPin, Mail, Phone, Linkedin, Github, FileText, Youtube, Link } from 'lucide-react';
import { LIST_STYLES } from './constants';

const EXIBIR_LOGS = true;

if (EXIBIR_LOGS) {
    console.log("🚀 [ResumePreview.js] Carregando...");
}

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
  const projectsColWidthCSS = `${settings.projectsColumnWidth}mm`;

  const pageBreakClass = settings.pageBreakAuto ? 'keep-together' : '';

  const { 
    photo, showPhoto, photoAlignment,
    photoShape, photoScale, photoX, photoY, photoGrayscale,
    photoRotate, photoBrightness, photoContrast, photoSaturation,
    photoFlip, photoCover, photoBorder, photoShadow
  } = data.personal;

  const themeColorStyle = settings.themeColor;
  const roleColor = settings.roleUseThemeColor ? themeColorStyle : undefined;
  const rightTextColor = settings.rightTextUseThemeColor ? themeColorStyle : undefined;

  const typographyStyles = {
    fontFamily: `'${settings.font}', sans-serif`,
    color: settings.bodyColor || '#374151', 
    fontSize: `${settings.fontSizeBase}pt`,
    lineHeight: settings.lineHeight, 
  };

  const getSectionSpacing = (sectionId) => {
      const specific = settings.sectionItemSpacings?.[sectionId];
      return specific !== undefined ? `${specific}mm` : `${settings.itemSpacing}mm`;
  };

  const rightTextStyle = settings.rightTextBold 
    ? "font-bold text-gray-900" 
    : "font-medium text-gray-700 opacity-75";

  const getHeaderStyle = (isSimple = false) => ({
      color: settings.themeColor, 
      fontWeight: settings.sectionTitleBold ? '700' : '400', 
      borderColor: settings.themeColor,
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      margin: 0,
      marginBottom: '4px', 
      paddingBottom: '2px',
      lineHeight: 1.2,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '1.1em',
      display: 'block',
      width: '100%',
      backgroundColor: 'white', 
      boxSizing: 'border-box',
      ...(isSimple ? { backgroundColor: 'transparent' } : {})
  });

  const SimpleSectionWrapper = ({ title, children, sectionId }) => (
      <div style={{ marginBottom: `${settings.sectionSpacing}mm`, width: '100%' }}>
          <div style={getHeaderStyle(true)}>
              {title}
          </div>
          <div style={{ marginTop: '1mm' }}>
              {children}
          </div>
      </div>
  );

  const PaginatedSectionWrapper = ({ title, children }) => {
    return (
        <div style={{ position: 'relative', marginBottom: `${settings.sectionSpacing}mm`, width: '100%' }}>
            <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', 
                zIndex: 20, pointerEvents: 'none', backgroundColor: 'white'
            }}>
                <div style={getHeaderStyle(false)}>
                    {title}
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', ...typographyStyles }}>
                <thead style={{ display: 'table-header-group' }}>
                    <tr style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                        <td style={{ padding: 0, border: 'none' }}>
                            <div style={getHeaderStyle(false)}>
                                {title} <span style={{ fontSize: '0.65em', fontWeight: 'normal', opacity: 0.7, textTransform: 'none' }}>(Continuação)</span>
                            </div>
                            <div style={{ height: '1mm' }}></div> 
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: 0, border: 'none', verticalAlign: 'top' }}>
                            {children}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  };

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
            extraClasses = 'font-bold mt-0 mb-0 pt-0'; 
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

        const markerColor = settings.listMarkerUseThemeColor ? settings.themeColor : (settings.bodyColor || '#374151');

        return (
            <li 
                key={i} 
                className={`break-words ${indentClass} ${bulletClass} ${extraClasses} ${settings.listMarkerBold ? 'marker:font-bold' : ''}`} 
                style={{ 
                    textAlign: settings.textAlign, 
                    textJustify: 'inter-word',
                    color: isHeader ? settings.bodyColor : markerColor 
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

    let dynamicPhotoSize = "w-28 h-28";     
    let dynamicGap = "gap-6";               
    let dynamicTitleSize = "1.8em";         
    let dynamicTextSize = "text-[0.9em]";   

    if (isPhotoVisible && (align === 'left' || align === 'right')) {
        dynamicPhotoSize = "w-24 h-24";     
        dynamicGap = "gap-4";               
        dynamicTitleSize = "2em";           
        dynamicTextSize = "text-[0.95em]";  
    }

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
            containerClasses += `flex-row items-center ${dynamicGap} text-left`;
            textContainerClasses += "text-left";
            contactJustify = "justify-start";
        } else if (align === 'right') {
            containerClasses += `flex-row-reverse items-center ${dynamicGap} text-right`;
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
                        className={`${dynamicPhotoSize} overflow-hidden bg-gray-100`}
                        style={{ 
                            borderRadius: frameRadius,
                            borderWidth: `${photoBorder || 0}px`,
                            borderColor: settings.themeColor,
                            borderStyle: 'solid',
                            boxShadow: photoShadow ? '0 4px 6px 1px rgba(0, 0, 0, 0.35), 0 2px 4px -1px rgba(0, 0, 0, 0.15)' : 'none'
                        }}
                    >
                        <img src={photo} alt="Foto de Perfil" style={photoStyle} />
                    </div>
                </div>
            )}
            <div className={textContainerClasses}>
                <h1 className="font-extrabold tracking-wide uppercase leading-none mb-2 break-words" style={{ color: settings.themeColor, fontSize: dynamicTitleSize }}>{data.personal.name}</h1>
                <div className={`flex flex-wrap gap-x-3 gap-y-1 ${dynamicTextSize} font-medium leading-tight mb-2 ${contactJustify}`}>
                    {data.personal.email && <span className="flex items-center gap-1"><Mail size={'1em'}/> {data.personal.email}</span>}
                    {data.personal.phone && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><Phone size={'1em'}/> {data.personal.phone}</span>}
                    {data.personal.location && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><MapPin size={'1em'}/> {data.personal.location}</span>}
                </div>
                <div className={`flex flex-wrap gap-3 ${dynamicTextSize} font-medium leading-tight ${contactJustify}`} style={{ color: settings.themeColor }}>
                    {data.personal.linkedin && (
                        <a 
                            href={data.personal.linkedin.startsWith('http') ? data.personal.linkedin : `https://${data.personal.linkedin}`} 
                            className="flex items-center gap-1 hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Linkedin size={'1em'}/> {data.personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                    )}
                    
                    {data.personal.github && (
                        <a 
                            href={data.personal.github.startsWith('http') ? data.personal.github : `https://${data.personal.github}`} 
                            className="flex items-center gap-1 hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Github size={'1em'}/> {data.personal.github.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                    )}
                    
                    {data.personal.lattes && (
                        <a 
                            href={data.personal.lattes.startsWith('http') ? data.personal.lattes : `https://${data.personal.lattes}`}
                            className="flex items-center gap-1 hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FileText size={'1em'}/> {data.personal.lattes.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                    )}

                    {data.personal.youtube && (
                        <a 
                            href={data.personal.youtube.startsWith('http') ? data.personal.youtube : `https://${data.personal.youtube}`}
                            className="flex items-center gap-1 hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Youtube size={'1em'}/> {data.personal.youtube.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
  };

  const renderSection = (sectionId) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: getSectionSpacing(sectionId)
    };
    
    const innerListStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5mm' 
    };
    
    let displayTitle = '';
    let isCustom = false;
    let customType = '';

    if (sectionId.startsWith('custom-')) {
        const sec = customSections.find(s => s.id === sectionId);
        displayTitle = sec ? sec.title : '';
        isCustom = true;
        customType = sec ? sec.type : '';
    } else {
        displayTitle = structure[sectionId] ? structure[sectionId].title : '';
    }

    const usePaginatedWrapper = 
        ['experience', 'education', 'projects'].includes(sectionId) || 
        (isCustom && customType === 'detailed');

    const Wrapper = usePaginatedWrapper ? PaginatedSectionWrapper : SimpleSectionWrapper;

    if (sectionId.startsWith('custom-')) {
        const sec = customSections.find(s => s.id === sectionId);
        if (!sec || !sec.visible) return null;
        if (sec.type === 'text') { 
            return (
                <SimpleSectionWrapper title={displayTitle} sectionId={sectionId}>
                    {/* ATENÇÃO AQUI: whiteSpace: 'pre-line' permite quebras de linha */}
                    <p className="break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word', whiteSpace: 'pre-line' }}>{formatText(sec.content)}</p>
                </SimpleSectionWrapper>
            ); 
        }
        if (sec.type === 'list') { return (<SimpleSectionWrapper title={displayTitle} sectionId={sectionId}><ul className="list-outside ml-4" style={containerStyle}>{renderListItems(sec.content, sectionId)}</ul></SimpleSectionWrapper>); }
        if (sec.type === 'detailed') { return (<PaginatedSectionWrapper title={displayTitle}><div style={containerStyle}>{(Array.isArray(sec.content) ? sec.content : []).map((item, i) => (<div key={i} className={pageBreakClass}><div className="flex flex-row items-baseline justify-between flex-row-print"><div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-3">{formatText(item.title)}</div><div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS, color: rightTextColor }}>{item.location}</div></div><div className="flex flex-row items-baseline justify-between flex-row-print"><div className="italic font-medium leading-tight break-words flex-1 pr-3" style={{ color: roleColor }}>{formatText(item.subtitle)}</div><div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS, color: rightTextColor }}>{item.date}</div></div><div className="mt-1" style={{ paddingRight: expColWidthCSS }}><ul className="list-outside ml-4" style={innerListStyle}>{renderListItems(item.description, sectionId)}</ul></div></div>))}</div></PaginatedSectionWrapper>); }
    }

    switch(sectionId) {
        case 'objective':
            return structure.objective.visible && data.objective && (
                <SimpleSectionWrapper title={displayTitle} sectionId={sectionId}>
                    <p className="break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(data.objective)}</p>
                </SimpleSectionWrapper>
            );
        case 'summary':
            return structure.summary.visible && data.summary && (
                <SimpleSectionWrapper title={displayTitle} sectionId={sectionId}>
                    <p className="break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(data.summary)}</p>
                </SimpleSectionWrapper>
            );
        case 'skills':
            return structure.skills.visible && data.skills.length > 0 && (
                <SimpleSectionWrapper title={displayTitle} sectionId={sectionId}>
                    <div style={containerStyle}>
                    {data.skills.map((skill, i) => {
                        // Verifica se tem quebras de linha para decidir se renderiza lista ou texto
                        const hasNewLines = skill.items && skill.items.includes('\n');
                        const listItems = hasNewLines ? skill.items.split('\n').filter(item => item.trim() !== '') : [];

                        return (
                            <div key={i} className="flex flex-row items-baseline gap-4" >
                                <div className="font-bold text-[0.95em] leading-tight break-words flex-shrink-0" style={{ width: `${settings.leftColumnWidth}mm` }}>
                                    {formatText(skill.category)}
                                </div>
                                <div className="break-words leading-tight flex-1" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>
                                    {hasNewLines ? (
                                        <ul className="list-outside ml-4" style={innerListStyle}>
                                            {renderListItems(listItems, sectionId)}
                                        </ul>
                                    ) : (
                                        formatText(skill.items)
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </SimpleSectionWrapper>
            );
        case 'projects':
            return structure.projects.visible && data.projects.length > 0 && (
                <PaginatedSectionWrapper title={displayTitle}>
                    <div style={containerStyle}>
                    {data.projects.map((proj, i) => (
                        <div key={i} className={`${pageBreakClass} flex flex-row items-start gap-8 flex-row-print`}>
                        <div className="flex-1">
                            <h4 className="font-bold text-[1.05em] break-words mb-0.5" style={{ color: settings.bodyColor }}>{proj.title}</h4>
                            {proj.link && (
                                <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer"
                                   className="flex items-center gap-1 italic font-medium text-[0.9em] mb-1 hover:underline" style={{ color: roleColor || 'inherit' }}>
                                    {settings.showLinkIcon !== false && <Link size={12} />}
                                    <span>{proj.link.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                </a>
                            )}
                            <ul className="list-outside ml-4" style={innerListStyle}>
                                {renderListItems(proj.description, sectionId)}
                            </ul>
                        </div>
                        <div className="flex-shrink-0 flex items-start justify-start mt-1" style={{ width: projectsColWidthCSS }}>
                             {/* CORREÇÃO: Adicionado block w-full text-center para esticar e centralizar */}
                            <span className={`text-[0.85em] bg-gray-100 px-2 py-1 rounded border border-gray-200 inline-block break-words hyphens-auto block w-full text-center ${settings.rightTextBold ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`} 
                                  style={{ hyphens: 'auto', color: rightTextColor, borderColor: rightTextColor ? rightTextColor : undefined }}>
                                {proj.tech}
                            </span>
                        </div>
                        </div>
                    ))}
                    </div>
                </PaginatedSectionWrapper>
            );
        case 'experience':
            return structure.experience.visible && data.experience.length > 0 && (
                <PaginatedSectionWrapper title={displayTitle}>
                    <div style={containerStyle}>
                    {data.experience.map((exp, i) => {
                        const hasContent = exp.company?.trim() || exp.role?.trim() || (exp.description || []).some(d => d.trim());
                        if (!hasContent) return null;
                        return (
                        <div key={i} className={pageBreakClass}>
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-4">{exp.company}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS, color: rightTextColor }}>{exp.location}</div>
                        </div>
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="italic font-medium leading-tight break-words flex-1 pr-4" style={{ color: roleColor }}>{exp.role}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: expColWidthCSS, color: rightTextColor }}>{exp.period}</div>
                        </div>
                        <div className="mt-0" style={{ paddingRight: expColWidthCSS }}>
                            <ul className="list-outside ml-4" style={innerListStyle}>
                                {renderListItems(exp.description, sectionId)}
                            </ul>
                        </div>
                        </div>
                    )})}
                    </div>
                </PaginatedSectionWrapper>
            );
        case 'education':
            return structure.education.visible && data.education.length > 0 && (
                <PaginatedSectionWrapper title={displayTitle}>
                    <div style={containerStyle}>
                    {data.education.map((edu, i) => {
                        const hasContent = edu.institution?.trim() || edu.degree?.trim();
                        if (!hasContent) return null;
                        return (
                        <div key={i} className={pageBreakClass}>
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold leading-tight break-words flex-1 pr-4">{edu.degree}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: eduColWidthCSS, color: rightTextColor }}>{edu.period}</div>
                            </div>
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="leading-tight break-words flex-1 pr-4" style={{ color: roleColor }}>{edu.institution}</div>
                            <div className={`text-[0.9em] text-right leading-tight flex-shrink-0 ${rightTextStyle}`} style={{ width: eduColWidthCSS, color: rightTextColor }}>{edu.location}</div>
                            </div>
                            {edu.details && (
                            <div className="mt-0.5" style={{ paddingRight: eduColWidthCSS }}>
                                <p className="text-[0.9em] opacity-75 italic break-words" style={{ textAlign: settings.textAlign, textJustify: 'inter-word' }}>{formatText(edu.details)}</p>
                            </div>
                            )}
                        </div>
                    )})}
                    </div>
                </PaginatedSectionWrapper>
            );
        case 'others':
            return structure.others.visible && data.others.length > 0 && (
                <SimpleSectionWrapper title={displayTitle} sectionId={sectionId}>
                    <div style={{ paddingRight: expColWidthCSS, ...containerStyle }}>
                        {data.others.map((item, i) => (
                            <div key={i} className={pageBreakClass}>
                                {item.title && <h4 className="font-bold text-[0.95em] mb-1">{item.title}</h4>}
                                <ul className="list-outside ml-4" style={innerListStyle}>
                                    {renderListItems(item.description, sectionId)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </SimpleSectionWrapper>
            );
        case 'references':
            return structure.references.visible && data.references && data.references.length > 0 && (
                <SimpleSectionWrapper title={displayTitle} sectionId={sectionId}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ gap: `${settings.itemSpacing}mm` }}>
                        {data.references.map((ref, i) => (
                            <div key={i} className="break-inside-avoid">
                                <div className="font-bold text-[0.95em]" style={{ color: settings.bodyColor }}>{ref.name}</div>
                                {(ref.role || ref.company) && (
                                    <div className="text-[0.9em] italic mb-0.5" style={{ color: roleColor }}>
                                        {ref.role}{ref.role && ref.company ? ' | ' : ''}{ref.company}
                                    </div>
                                )}
                                <div className="text-[0.85em] space-y-0.5 text-gray-600">
                                    {ref.email && (
                                        <div className="flex items-center gap-1.5">
                                            <Mail size={10} />
                                            <span>{ref.email}</span>
                                        </div>
                                    )}
                                    {ref.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <Phone size={10} />
                                            <span>{ref.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </SimpleSectionWrapper>
            );

        case 'keywords':
            return structure.keywords.visible && data.keywords && (
                <div 
                    style={{ 
                        color: '#FFFFFF',      
                        fontSize: '6pt',       
                        lineHeight: '1em',
                        marginTop: '5mm',      
                        userSelect: 'none',    
                        zIndex: -1,
                        position: 'relative'   
                    }}
                    className="ats-camouflage"
                >
                    {data.keywords}
                </div>
            );

        default: return null;
    }
  };

  const ResumeContent = (
      <>
        {renderHeader()}
        {sectionOrder.map(sectionId => renderSection(sectionId))}
      </>
  );

  const lineStyle = { 
    width: '100%',
    height: '2px', 
    backgroundColor: settings.showPageLines ? settings.themeColor : 'transparent', 
  };

  return (
    <div id="resume-preview" lang="pt-BR" className="bg-white shadow-2xl relative" style={{
        ...typographyStyles,
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        position: 'relative'
    }}>
        {settings.showGuides && (
            <div className="absolute inset-0 z-50 pointer-events-none page-guide">
                <div
                    className="absolute border border-green-600 border-dashed opacity-100"
                    style={{
                        top: '20mm',
                        bottom: '20mm',
                        left: '15mm',
                        right: '15mm'
                    }}
                >
                    <span className="absolute top-0 right-0 bg-green-600 text-white text-[9px] px-1 font-bold">Margem</span>
                </div>

                <div
                    className="absolute border-r border-blue-600 border-dashed h-full opacity-100"
                    style={{
                        top: '20mm',
                        bottom: '20mm',
                        left: `calc(15mm + ${settings.leftColumnWidth}mm)`
                    }}
                >
                    <span className="absolute top-2 -right-1 translate-x-full bg-blue-100 text-blue-800 text-[9px] px-1 border border-blue-300 rounded font-bold whitespace-nowrap">Competências</span>
                </div>

                <div className="absolute border-l border-blue-600 border-dotted h-full opacity-100"
                    style={{ top: '20mm', bottom: '20mm', right: `calc(15mm + ${settings.experienceColumnWidth}mm)` }}>
                      <span className="absolute top-10 -left-1 -translate-x-full bg-blue-50 text-blue-600 text-[9px] px-1 border border-blue-200 rounded font-bold whitespace-nowrap">Experiências</span>
                </div>

                <div className="absolute border-l border-red-500 border-dotted h-full opacity-100"
                    style={{ top: '20mm', bottom: '20mm', right: `calc(15mm + ${settings.educationColumnWidth}mm)` }}>
                      <span className="absolute top-16 -left-1 -translate-x-full bg-red-50 text-red-600 text-[9px] px-1 border border-red-200 rounded font-bold whitespace-nowrap">Formação</span>
                </div>

                <div className="absolute border-l border-purple-500 border-dotted h-full opacity-100"
                    style={{ top: '20mm', bottom: '20mm', right: `calc(15mm + ${settings.projectsColumnWidth}mm)` }}>
                      <span className="absolute top-24 -left-1 -translate-x-full bg-purple-50 text-purple-600 text-[9px] px-1 border border-purple-200 rounded font-bold whitespace-nowrap">Projetos</span>
                </div>
            </div>
        )}

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
