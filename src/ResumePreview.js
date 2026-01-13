// src/ResumePreview.js
import React from 'react';
import { MapPin, Mail, Phone, Linkedin, Github, FileText } from 'lucide-react';
import { DENSITY } from './constants';

const formatText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function ResumePreview({ data, settings }) {
  const currentDensity = DENSITY[settings.density];
  const { structure, customSections, sectionOrder } = data; // Lê a ordem agora
  
  const expColWidthCSS = `${settings.experienceColumnWidth}mm`;
  const eduColWidthCSS = `${settings.educationColumnWidth}mm`;
  const projColWidthCSS = `${settings.projectsColumnWidth}mm`;

  // Função auxiliar para renderizar cada bloco baseado no ID
  const renderSection = (sectionId) => {
    // 1. Verificar se é customizado
    if (sectionId.startsWith('custom-')) {
        const sec = customSections.find(s => s.id === sectionId);
        if (!sec || !sec.visible) return null;
        
        return (
            <section key={sec.id} className={`${currentDensity.mbSection} keep-together`}>
              <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{sec.title}</h3>
              {sec.type === 'text' && <p className="text-gray-800 break-words" style={{ textAlign: settings.textAlign }}>{formatText(sec.content)}</p>}
              {sec.type === 'list' && (
                <ul className={`list-disc list-outside ml-4 text-gray-800 ${currentDensity.listSpace}`}>
                  {(Array.isArray(sec.content) ? sec.content : []).map((item, i) => (
                    item && <li key={i} className="break-words" style={{ textAlign: settings.textAlign }}>{formatText(item)}</li>
                  ))}
                </ul>
              )}
              {sec.type === 'detailed' && (
                 <div className={settings.density === 'compact' ? 'space-y-2' : 'space-y-4'}>
                  {(Array.isArray(sec.content) ? sec.content : []).map((item, i) => (
                    <div key={i} className="keep-together">
                      <div className="flex flex-row items-baseline justify-between flex-row-print">
                        <div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-2">{formatText(item.title)}</div>
                        <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{item.location}</div>
                      </div>
                      <div className="flex flex-row items-baseline justify-between flex-row-print">
                        <div className="italic font-medium text-gray-800 leading-tight break-words flex-1 pr-2">{formatText(item.subtitle)}</div>
                        <div className="text-[0.9em] text-gray-600 font-medium text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{item.date}</div>
                      </div>
                      <div className="mt-1" style={{ paddingRight: expColWidthCSS }}>
                        <ul className={`list-disc list-outside ml-4 text-gray-800 ${currentDensity.listSpace}`}>
                          {item.description.map((desc, d) => (
                            desc && <li key={d} className="break-words" style={{ textAlign: settings.textAlign }}>{formatText(desc)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                 </div>
              )}
            </section>
        );
    }

    // 2. Verificar seções padrão
    switch(sectionId) {
        case 'summary':
            return structure.summary.visible && data.summary && (
                <section key="summary" className={`${currentDensity.mbSection} keep-together`}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.summary.title}</h3>
                    <p className="text-gray-800 break-words" style={{ textAlign: settings.textAlign }}>{formatText(data.summary)}</p>
                </section>
            );
        case 'skills':
            return structure.skills.visible && data.skills.length > 0 && (
                <section key="skills" className={`${currentDensity.mbSection} keep-together`}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.skills.title}</h3>
                    <div className={currentDensity.listSpace}>
                    {data.skills.map((skill, i) => (
                        <div key={i} className="flex flex-row items-baseline gap-4" >
                        <div className="font-bold text-[0.95em] leading-tight break-words text-gray-800 flex-shrink-0" style={{ width: `${settings.leftColumnWidth}mm` }}>{formatText(skill.category)}</div>
                        <div className="text-gray-800 break-words leading-tight flex-1" style={{ textAlign: settings.textAlign }}>{formatText(skill.items)}</div>
                        </div>
                    ))}
                    </div>
                </section>
            );
        case 'projects':
            // CORREÇÃO VISUAL SOLICITADA: items-start, mt-1 e gap-8
            return structure.projects.visible && data.projects.length > 0 && (
                <section key="projects" className={currentDensity.mbSection}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-2 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.projects.title}</h3>
                    <div className="space-y-3">
                    {data.projects.map((proj, i) => (
                        <div key={i} className="keep-together flex flex-row items-start gap-8 flex-row-print">
                        {/* LADO ESQUERDO: Título e Descrição */}
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-[1.05em] break-words mb-1">{proj.title}</h4>
                            <ul className={`list-disc list-outside ml-4 text-gray-800 ${currentDensity.listSpace}`}>
                            {proj.description.map((desc, d) => (
                                <li key={d} className="break-words" style={{ textAlign: settings.textAlign }}>{formatText(desc)}</li>
                            ))}
                            </ul>
                        </div>

                        {/* LADO DIREITO: Tech Box Alinhado ao Topo (items-start no pai) e mt-1 */}
                        <div className="flex-shrink-0 flex items-start justify-end mt-1" style={{ width: projColWidthCSS }}>
                            <span className="text-[0.85em] font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 border border-gray-200 inline-block w-full break-words text-center">
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
                <section key="experience" className={currentDensity.mbSection}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-2 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.experience.title}</h3>
                    <div className={settings.density === 'compact' ? 'space-y-2' : 'space-y-4'}>
                    {data.experience.map((exp, i) => {
                        const hasContent = exp.company?.trim() || exp.role?.trim() || (exp.description || []).some(d => d.trim());
                        if (!hasContent) return null;
                        return (
                        <div key={i} className="keep-together">
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold text-[1.05em] leading-tight break-words flex-1 pr-2">{exp.company}</div>
                            <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{exp.location}</div>
                        </div>
                        <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="italic font-medium text-gray-800 leading-tight break-words flex-1 pr-2">{exp.role}</div>
                            <div className="text-[0.9em] text-gray-600 font-medium text-right leading-tight flex-shrink-0" style={{ width: expColWidthCSS }}>{exp.period}</div>
                        </div>
                        <div className="mt-1" style={{ paddingRight: expColWidthCSS }}>
                            <ul className={`list-disc list-outside ml-4 text-gray-800 ${currentDensity.listSpace}`}>
                            {(exp.description || []).map((desc, d) => (
                                <li key={d} className="break-words" style={{ textAlign: settings.textAlign }}>{formatText(desc)}</li>
                            ))}
                            </ul>
                        </div>
                        </div>
                    )})}
                    </div>
                </section>
            );
        case 'education':
            return structure.education.visible && data.education.length > 0 && (
                <section key="education" className={currentDensity.mbSection}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-2 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.education.title}</h3>
                    <div className={settings.density === 'compact' ? 'space-y-2' : 'space-y-3'}>
                    {data.education.map((edu, i) => {
                        const hasContent = edu.institution?.trim() || edu.degree?.trim();
                        if (!hasContent) return null;
                        return (
                        <div key={i} className="keep-together">
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="font-bold leading-tight break-words flex-1 pr-2">{edu.degree}</div>
                            <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: eduColWidthCSS }}>{edu.period}</div>
                            </div>
                            <div className="flex flex-row items-baseline justify-between flex-row-print">
                            <div className="text-gray-800 leading-tight break-words flex-1 pr-2">{edu.institution}</div>
                            <div className="text-[0.9em] text-gray-600 text-right leading-tight flex-shrink-0" style={{ width: eduColWidthCSS }}>{edu.location}</div>
                            </div>
                            {edu.details && (
                            <div className="mt-0.5" style={{ paddingRight: eduColWidthCSS }}>
                                <p className="text-[0.9em] text-gray-600 italic break-words">{formatText(edu.details)}</p>
                            </div>
                            )}
                        </div>
                    )})}
                    </div>
                </section>
            );
        case 'others':
            // RENDERIZAÇÃO NOVA DE "OUTROS" (Suporte a Categorias + Itens)
            return structure.others.visible && data.others.length > 0 && (
                <section key="others" className={`${currentDensity.mbSection} keep-together`}>
                    <h3 className="dynamic-title text-[1.1em] uppercase tracking-wider mb-1 border-b" style={{ color: settings.themeColor, fontWeight: settings.sectionTitleBold ? '700' : '400', borderColor: settings.themeColor }}>{structure.others.title}</h3>
                    <div style={{ paddingRight: expColWidthCSS }} className="space-y-3">
                        {data.others.map((item, i) => (
                            <div key={i} className="keep-together">
                                {item.title && <h4 className="font-bold text-gray-900 text-[0.95em] mb-1">{item.title}</h4>}
                                <ul className={`list-disc list-outside ml-4 text-gray-800 ${currentDensity.listSpace}`}>
                                    {item.description.map((desc, d) => (
                                        desc.trim() ? <li key={d} className="break-words">{formatText(desc)}</li> : null
                                    ))}
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
      className={`bg-white shadow-2xl relative ${currentDensity.leading}`}
      style={{ 
        fontFamily: `'${settings.font}', sans-serif`,
        width: '210mm',
        minHeight: '297mm',
        paddingTop: '20mm',
        paddingBottom: '20mm',
        paddingLeft: '15mm',
        paddingRight: '15mm',
        fontSize: `${settings.fontSizeBase}pt`,
        lineHeight: settings.density === 'compact' ? '1.3' : '1.5',
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

        {/* HEADER (Sempre fixo no topo) */}
        <header className={`text-center border-b-2 ${currentDensity.headerPad}`} style={{ borderColor: settings.themeColor }}>
          <h1 className="font-extrabold tracking-wide uppercase leading-none mb-1 break-words" style={{ color: settings.themeColor, fontSize: '1.8em' }}>{data.personal.name}</h1>
          <div className="flex flex-wrap justify-center gap-2 text-[0.9em] font-medium text-gray-700 leading-tight">
            {data.personal.email && <span className="flex items-center gap-1"><Mail size={'1em'}/> {data.personal.email}</span>}
            {data.personal.phone && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><Phone size={'1em'}/> {data.personal.phone}</span>}
            {data.personal.location && <span className="flex items-center gap-1 border-l pl-2 border-gray-400"><MapPin size={'1em'}/> {data.personal.location}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-1 text-[0.9em] font-medium leading-tight" style={{ color: settings.themeColor }}>
            {data.personal.linkedin && <a href={`https://${data.personal.linkedin}`} className="flex items-center gap-1 hover:underline"><Linkedin size={'1em'}/> {data.personal.linkedin}</a>}
            {data.personal.github && <a href={`https://${data.personal.github}`} className="flex items-center gap-1 hover:underline"><Github size={'1em'}/> {data.personal.github}</a>}
            {data.personal.lattes && <a href={`https://${data.personal.lattes}`} className="flex items-center gap-1 hover:underline"><FileText size={'1em'}/> Lattes</a>}
          </div>
        </header>

        {/* RENDERIZAÇÃO DINÂMICA DAS SEÇÕES */}
        {sectionOrder.map(sectionId => renderSection(sectionId))}

      </div>
    </div>
  );
}