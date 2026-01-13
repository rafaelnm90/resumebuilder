// src/App.js
import React, { useState } from 'react';
import { 
  Briefcase, GraduationCap, User, Code, FileText, Download, Plus, Trash2, 
  ChevronRight, Globe, Settings, Palette, Type, Hash, Layout, Eye, EyeOff, 
  AlignJustify, Maximize2, Minimize2, MoveHorizontal, Columns, ZoomIn, ZoomOut,
  Menu, X, Layers, List, Grid, PenTool, GripVertical
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ResumePreview from './ResumePreview';
import { INITIAL_DATA, INITIAL_SETTINGS, FONTS } from './constants';

// --- COMPONENTES AUXILIARES (MOVIDOS PARA FORA PARA CORRIGIR O BUG DE FOCO) ---

const Input = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
    <input 
      type="text" 
      className="p-2 border rounded-md outline-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
      value={value} 
      onChange={e => onChange(e.target.value)} 
    />
  </div>
);

const DraggableDescriptionList = ({ items, sectionId, itemIndex, onUpdate, onRemove, onAdd }) => {
  const droppableId = `desc-${sectionId}-${itemIndex}`;
  return (
    <Droppable droppableId={droppableId} type="DESCRIPTION_ITEM">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-1">
          {items.map((desc, index) => (
            <Draggable key={`${droppableId}-${index}`} draggableId={`${droppableId}-${index}`} index={index}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} className={`flex gap-2 items-center ${snapshot.isDragging ? 'opacity-70' : ''}`}>
                  <div {...provided.dragHandleProps} className="text-gray-300 hover:text-gray-500 cursor-grab"><GripVertical size={14} /></div>
                  <input className="flex-1 p-1 border rounded text-xs" value={desc} onChange={e => onUpdate(sectionId, itemIndex, 'description', index, e.target.value)} />
                  <button onClick={() => onRemove(sectionId, itemIndex, 'description', index)} className="text-red-400 hover:text-red-600"><Trash2 size={12}/></button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button onClick={() => onAdd(sectionId, itemIndex, 'description')} className="text-xs text-blue-600 flex items-center mt-1 ml-6"><Plus size={12} className="mr-1"/> Add Item</button>
        </div>
      )}
    </Droppable>
  );
};

const DraggableSection = ({ sectionId, title, items, onAdd, onRemove, renderItem }) => (
  <div className="space-y-4">
    <div className="flex justify-between border-b pb-2">
      <h2 className="text-xl font-bold capitalize">{title}</h2>
      <button onClick={onAdd} className="text-blue-600 text-sm"><Plus size={16}/></button>
    </div>
    <Droppable droppableId={sectionId} type="SECTION_ITEM">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
          {items.map((item, index) => (
            <Draggable key={`${sectionId}-${index}`} draggableId={`${sectionId}-${index}`} index={index}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} className={`bg-gray-50 p-3 rounded relative border ${snapshot.isDragging ? 'border-blue-500 shadow-lg z-50' : 'border-gray-200'}`}>
                  <div className="flex gap-2">
                    <div {...provided.dragHandleProps} className="flex-shrink-0 mt-2 text-gray-400 cursor-grab hover:text-gray-700"><GripVertical size={20} /></div>
                    <div className="flex-1">
                      <button onClick={() => onRemove(index)} className="absolute top-2 right-2 text-red-400 z-10 hover:text-red-600"><Trash2 size={16}/></button>
                      {renderItem(item, index)}
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [activeTab, setActiveTab] = useState('personal');
  const [zoom, setZoom] = useState(0.7); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- LÓGICA DE DRAG & DROP ---
  const handleDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // 1. REORDENAR AS SEÇÕES PRINCIPAIS
    if (type === 'MAIN_SECTION_ORDER') {
      const newOrder = Array.from(data.sectionOrder);
      const [movedId] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, movedId);
      setData(prev => ({ ...prev, sectionOrder: newOrder }));
      return;
    }

    // 2. Reordenando CARDS/BLOCOS
    if (type === 'SECTION_ITEM') {
      const listId = source.droppableId;
      const currentList = Array.from(data[listId]);
      const [reorderedItem] = currentList.splice(source.index, 1);
      currentList.splice(destination.index, 0, reorderedItem);
      setData(prev => ({ ...prev, [listId]: currentList }));
    }

    // 3. Reordenando TÓPICOS/ITENS DE LISTA
    if (type === 'DESCRIPTION_ITEM') {
      const parts = source.droppableId.split('-');
      const sectionId = parts[1];
      const itemIdx = parseInt(parts[2]);

      const sectionItems = Array.from(data[sectionId]);
      const targetItem = { ...sectionItems[itemIdx] };
      const currentDescriptions = Array.from(targetItem.description);

      const [reorderedDesc] = currentDescriptions.splice(source.index, 1);
      currentDescriptions.splice(destination.index, 0, reorderedDesc);

      targetItem.description = currentDescriptions;
      sectionItems[itemIdx] = targetItem;

      setData(prev => ({ ...prev, [sectionId]: sectionItems }));
    }
  };

  // --- GERENCIAMENTO DE SEÇÕES ---
  const addCustomSection = (type) => {
    const id = `custom-${Date.now()}`;
    const newSection = { id: id, title: "Nova Seção", type: type, content: type === 'text' ? '' : [], visible: true };
    setData(prev => ({ ...prev, customSections: [...prev.customSections, newSection], sectionOrder: [...prev.sectionOrder, id] }));
    setActiveTab(id);
  };

  const removeCustomSection = (id) => {
    setData(prev => ({ 
      ...prev, 
      customSections: prev.customSections.filter(s => s.id !== id),
      sectionOrder: prev.sectionOrder.filter(sid => sid !== id)
    }));
    if (activeTab === id) setActiveTab('sections');
  };

  const updateCustomSectionTitle = (id, newTitle) => {
    setData(prev => ({ ...prev, customSections: prev.customSections.map(s => s.id === id ? { ...s, title: newTitle } : s) }));
  };

  // --- MÉTODOS DE ATUALIZAÇÃO ---
  const updateStructure = (sectionId, field, value) => {
    setData(prev => ({ ...prev, structure: { ...prev.structure, [sectionId]: { ...prev.structure[sectionId], [field]: value } } }));
  };
  const updateField = (s, f, v) => setData(p => ({ ...p, [s]: { ...p[s], [f]: v } }));
  const updateSimpleField = (f, v) => setData(p => ({ ...p, [f]: v }));
  
  const addItem = (s, item) => setData(p => ({ ...p, [s]: [...p[s], item] }));
  const removeItem = (s, idx) => setData(p => ({ ...p, [s]: p[s].filter((_, i) => i !== idx) }));
  const updateItem = (s, idx, f, v) => setData(p => ({ ...p, [s]: p[s].map((it, i) => i === idx ? { ...it, [f]: v } : it) }));
  
  const updateArrayItem = (s, iIdx, arrF, arrI, v) => setData(p => ({ ...p, [s]: p[s].map((it, i) => i !== iIdx ? it : { ...it, [arrF]: [...it[arrF]].map((val, k) => k === arrI ? v : val) }) }));
  const addArrayItemToItem = (s, iIdx, arrF) => setData(p => ({ ...p, [s]: p[s].map((it, i) => i === iIdx ? { ...it, [arrF]: [...it[arrF], ""] } : it) }));
  const removeArrayItemFromItem = (s, iIdx, arrF, arrI) => setData(p => ({ ...p, [s]: p[s].map((it, i) => i === iIdx ? { ...it, [arrF]: it[arrF].filter((_, k) => k !== arrI) } : it) }));

  // Custom Sections Helpers
  const addDetailedItem = (sid) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: [...s.content, { title: '', subtitle: '', date: '', location: '', description: [''] }] } : s) }));
  const removeDetailedItem = (sid, idx) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.filter((_, i) => i !== idx) } : s) }));
  const updateDetailedItem = (sid, idx, f, v) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.map((item, i) => i === idx ? { ...item, [f]: v } : item) } : s) }));
  const updateDetailedItemDesc = (sid, idx, di, v) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.map((item, i) => i === idx ? { ...item, description: item.description.map((d, k) => k === di ? v : d) } : item) } : s) }));
  const addDetailedItemDescLine = (sid, idx) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.map((item, i) => i === idx ? { ...item, description: [...item.description, ""] } : item) } : s) }));
  const removeDetailedItemDescLine = (sid, idx, di) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.map((item, i) => i === idx ? { ...item, description: item.description.filter((_, k) => k !== di) } : item) } : s) }));

  // --- IMPRESSÃO ---
  const handlePrint = () => {
    const resumeContent = document.getElementById('resume-preview');
    if (!resumeContent) return alert("Erro ao gerar PDF.");
    const printWindow = window.open('', '', 'height=800,width=900');
    if (!printWindow) return alert("Por favor, permita pop-ups para baixar o PDF.");

    const contentClone = resumeContent.cloneNode(true);
    const guides = contentClone.querySelectorAll('.page-guide');
    guides.forEach(g => g.remove());
    const pageBreaks = contentClone.querySelectorAll('[class*="border-dashed"]');
    pageBreaks.forEach(el => el.remove());
    
    contentClone.style.transform = 'none';
    contentClone.style.zoom = '1';
    contentClone.style.margin = '0'; 
    contentClone.style.padding = '0'; 

    printWindow.document.write(`
      <html lang="pt-BR">
        <head>
          <title>Currículo - ${data.personal.name}</title>
          <link href="${FONTS[settings.font].url}" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            *, *::before, *::after { box-sizing: border-box !important; }
            .keep-together { page-break-inside: avoid !important; break-inside: avoid !important; display: block !important; }
            h3, .dynamic-title { page-break-after: avoid !important; break-after: avoid !important; }
            html, body, p, li, div, span { -webkit-hyphens: auto !important; -ms-hyphens: auto !important; hyphens: auto !important; word-break: break-word !important; }
            @media print {
              @page { size: A4; margin: 20mm 15mm; }
              body { margin: 0; padding: 0; background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              #resume-preview { width: 100% !important; height: auto !important; margin: 0 !important; padding: 0 !important; border: none !important; box-shadow: none !important; transform: none !important; overflow: visible !important; }
              .flex-row-print { display: flex !important; flex-direction: row !important; }
              .dynamic-title { color: ${settings.themeColor} !important; }
              .content-container { width: 100% !important; margin: 0 !important; }
              a { text-decoration: none !important; color: inherit !important; }
            }
            body { font-family: '${settings.font}', sans-serif; }
            .dynamic-title { color: ${settings.themeColor} !important; font-weight: ${settings.sectionTitleBold ? '700' : '400'} !important; border-bottom: 1px solid ${settings.themeColor} !important; opacity: 0.9; }
          </style>
        </head>
        <body>${contentClone.outerHTML}<script>setTimeout(() => { window.print(); window.close(); }, 1000);</script></body>
      </html>
    `);
    printWindow.document.close();
  };

  // --- FORMS (AGORA USAM OS COMPONENTES EXTERNOS) ---
  const renderSettingsForm = () => (<div className="space-y-6"><h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center"><Layout className="mr-2" size={20}/> Layout & Otimização</h2><div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-4"><label className="flex items-center text-sm font-bold text-blue-800"><Maximize2 size={16} className="mr-2"/> Densidade e Texto</label><div className="flex gap-2 p-1 bg-white rounded border border-blue-100"><button onClick={() => setSettings({...settings, density: 'compact'})} className={`flex-1 flex items-center justify-center py-2 text-xs font-bold rounded transition-colors ${settings.density === 'compact' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}><Minimize2 size={14} className="mr-1"/> Compacto</button><button onClick={() => setSettings({...settings, density: 'comfortable'})} className={`flex-1 flex items-center justify-center py-2 text-xs font-bold rounded transition-colors ${settings.density === 'comfortable' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}><Maximize2 size={14} className="mr-1"/> Confortável</button></div><div className="space-y-1"><div className="flex justify-between text-xs text-blue-800 font-semibold"><span>Tamanho da Fonte Base</span><span>{settings.fontSizeBase}pt</span></div><input type="range" min="9" max="12" step="0.5" value={settings.fontSizeBase} onChange={e => setSettings({...settings, fontSizeBase: parseFloat(e.target.value)})} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" /></div><div className="flex items-center justify-between"><span className="text-sm text-blue-800">Justificar Texto</span><button onClick={() => setSettings({...settings, textAlign: settings.textAlign === 'justify' ? 'left' : 'justify'})} className={`p-1 rounded ${settings.textAlign === 'justify' ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-400'}`}><AlignJustify size={18}/></button></div><div className="space-y-4 mt-4 border-t border-blue-200 pt-3"><div className="space-y-2"><div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><MoveHorizontal size={14} className="mr-1"/> Coluna Direita: Experiência</span></div><div className="flex items-center gap-2"><input type="range" min="20" max="60" step="1" value={settings.experienceColumnWidth} onChange={e => setSettings({...settings, experienceColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/><span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.experienceColumnWidth}mm</span></div></div><div className="space-y-2"><div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><MoveHorizontal size={14} className="mr-1"/> Coluna Direita: Formação</span></div><div className="flex items-center gap-2"><input type="range" min="20" max="60" step="1" value={settings.educationColumnWidth} onChange={e => setSettings({...settings, educationColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/><span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.educationColumnWidth}mm</span></div></div><div className="space-y-2"><div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><MoveHorizontal size={14} className="mr-1"/> Coluna Direita: Projetos</span></div><div className="flex items-center gap-2"><input type="range" min="20" max="60" step="1" value={settings.projectsColumnWidth} onChange={e => setSettings({...settings, projectsColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/><span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.projectsColumnWidth}mm</span></div></div><div className="space-y-2 border-t border-blue-100 pt-2"><div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><Columns size={14} className="mr-1"/> Ajuste de Competências (Esquerda)</span></div><div className="flex items-center gap-2"><input type="range" min="30" max="80" step="1" value={settings.leftColumnWidth} onChange={e => setSettings({...settings, leftColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/><span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.leftColumnWidth}mm</span></div></div></div></div><div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 space-y-4"><label className="flex items-center text-sm font-bold text-yellow-800">{settings.showGuides ? <Eye size={16} className="mr-2"/> : <EyeOff size={16} className="mr-2"/>} Guias e Margens</label><div className="flex items-center justify-between"><span className="text-sm text-yellow-800">Mostrar Linhas de Limite</span><input type="checkbox" checked={settings.showGuides} onChange={e => setSettings({...settings, showGuides: e.target.checked})} className="w-5 h-5 text-yellow-600 rounded cursor-pointer" /></div></div><div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4"><label className="flex items-center text-sm font-bold text-gray-700"><Palette size={16} className="mr-2"/> Cores e Títulos</label><div className="flex items-center gap-2"><input type="color" value={settings.themeColor} onChange={e => setSettings({...settings, themeColor: e.target.value})} className="h-8 w-12 cursor-pointer border rounded" /><span className="text-xs font-mono">{settings.themeColor}</span></div></div></div>);
  const renderSectionManagementForm = () => (<div className="space-y-6"><h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center"><Layers className="mr-2" size={20}/> Reordenar Seções</h2><div className="grid grid-cols-2 gap-2 mb-4"><button onClick={() => addCustomSection('text')} className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors"><FileText size={16} className="mr-2"/> Texto</button><button onClick={() => addCustomSection('list')} className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors"><List size={16} className="mr-2"/> Lista</button><button onClick={() => addCustomSection('detailed')} className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors col-span-2"><Grid size={16} className="mr-2"/> Detalhada</button></div><Droppable droppableId="section-ordering" type="MAIN_SECTION_ORDER">{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">{data.sectionOrder.map((sectionId, index) => {const isCustom = sectionId.startsWith('custom-');const config = isCustom ? data.customSections.find(s => s.id === sectionId) : data.structure[sectionId];if (!config) return null;return (<Draggable key={sectionId} draggableId={sectionId} index={index}>{(provided, snapshot) => (<div ref={provided.innerRef} {...provided.draggableProps} className={`bg-white p-3 rounded border flex items-center gap-3 ${snapshot.isDragging ? 'shadow-lg border-blue-500 z-50' : 'border-gray-200'}`}><div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab"><GripVertical size={20}/></div>{isCustom ? (<div className="flex-1 flex justify-between items-center"><span className="text-sm font-semibold">{config.title} <span className="text-gray-400 text-xs">({config.type})</span></span><button onClick={() => removeCustomSection(sectionId)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button></div>) : (<div className="flex-1 flex justify-between items-center"><input type="text" value={config.title} onChange={(e) => updateStructure(sectionId, 'title', e.target.value)} className="flex-1 p-1 text-sm border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"/><button onClick={() => updateStructure(sectionId, 'visible', !config.visible)} className={`w-10 h-5 rounded-full relative transition-colors ${config.visible ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow transition-transform ${config.visible ? 'left-6' : 'left-1'}`}></div></button></div>)}</div>)}</Draggable>);})}{provided.placeholder}</div>)}</Droppable></div>);
  const renderCustomTabForm = (sectionId) => { const section = data.customSections.find(s => s.id === sectionId); if (!section) return <div>Seção não encontrada</div>; return (<div className="space-y-4"><div className="flex justify-between border-b pb-2"><input value={section.title} onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)} className="text-xl font-bold bg-transparent outline-none w-full" /><button onClick={() => removeCustomSection(section.id)} className="text-red-400"><Trash2 size={16}/></button></div>{section.type === 'text' && (<div className="space-y-1"><p className="text-xs text-gray-500">Dica: Use **palavra** para negrito.</p><textarea className="w-full h-48 p-3 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" value={section.content} onChange={(e) => {setData(prev => ({...prev, customSections: prev.customSections.map(s => s.id === section.id ? { ...s, content: e.target.value } : s)}))}} placeholder="Digite o texto da seção aqui..."/></div>)}{section.type === 'list' && (<div className="space-y-2"><p className="text-xs text-gray-500">Adicione itens (um por linha):</p><textarea className="w-full h-48 p-3 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" value={Array.isArray(section.content) ? section.content.join('\n') : section.content} onChange={(e) => {setData(prev => ({...prev, customSections: prev.customSections.map(s => s.id === section.id ? { ...s, content: e.target.value.split('\n') } : s)}))}}/></div>)}{section.type === 'detailed' && (<div className="space-y-4"><div className="flex justify-end"><button onClick={() => addDetailedItem(section.id)} className="text-blue-600 text-sm flex items-center font-bold"><Plus size={16} className="mr-1"/> Adicionar Item</button></div>{section.content.map((item, i) => (<div key={i} className="bg-gray-50 p-3 rounded relative border border-gray-200"><button onClick={() => removeDetailedItem(section.id, i)} className="absolute top-2 right-2 text-red-400"><Trash2 size={16}/></button><div className="grid grid-cols-2 gap-2 mb-2"><Input label="Título / Empresa" value={item.title} onChange={v => updateDetailedItem(section.id, i, 'title', v)} /><Input label="Subtítulo / Cargo" value={item.subtitle} onChange={v => updateDetailedItem(section.id, i, 'subtitle', v)} /><Input label="Data / Período" value={item.date} onChange={v => updateDetailedItem(section.id, i, 'date', v)} /><Input label="Local" value={item.location} onChange={v => updateDetailedItem(section.id, i, 'location', v)} /></div><div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Descrição (Tópicos)</label><DraggableDescriptionList items={item.description} sectionId={section.id} itemIndex={i} onUpdate={updateDetailedItemDesc} onRemove={removeDetailedItemDescLine} onAdd={addDetailedItemDescLine} /></div></div>))}</div>)}</div>);};
  const renderPersonalForm = () => (<div className="space-y-4"><h2 className="text-xl font-bold border-b pb-2">Pessoal</h2><div className="grid md:grid-cols-2 gap-4"><Input label="Nome" value={data.personal.name} onChange={v=>updateField('personal','name',v)}/><Input label="Email" value={data.personal.email} onChange={v=>updateField('personal','email',v)}/><Input label="Tel" value={data.personal.phone} onChange={v=>updateField('personal','phone',v)}/><Input label="Local" value={data.personal.location} onChange={v=>updateField('personal','location',v)}/><Input label="LinkedIn" value={data.personal.linkedin} onChange={v=>updateField('personal','linkedin',v)}/><Input label="GitHub" value={data.personal.github} onChange={v=>updateField('personal','github',v)}/><Input label="Currículo Lattes (Link/ID)" value={data.personal.lattes || ''} onChange={v=>updateField('personal','lattes',v)}/></div></div>);
  const renderSummaryForm = () => (<div className="space-y-4"><h2 className="text-xl font-bold border-b pb-2">Resumo</h2><p className="text-xs text-gray-500 mb-1">Dica: Use **palavra** para negrito.</p><textarea className="w-full h-48 p-3 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.summary} onChange={e => updateSimpleField('summary', e.target.value)} /></div>);
  
  // PASSANDO OS DADOS CORRETOS PARA O COMPONENTE EXTERNO
  const renderSkillsForm = () => (<DraggableSection sectionId="skills" title={data.structure.skills.title} items={data.skills} onAdd={() => addItem('skills', {category:'', items:''})} onRemove={(idx) => removeItem('skills', idx)} renderItem={(s, i) => (<><Input label="Categoria" value={s.category} onChange={v=>updateItem('skills', i, 'category', v)}/><Input label="Itens" value={s.items} onChange={v=>updateItem('skills', i, 'items', v)}/></>)}/>);
  const renderProjectsForm = () => (<DraggableSection sectionId="projects" title={data.structure.projects.title} items={data.projects} onAdd={() => addItem('projects', {title:'', tech:'', description:['']})} onRemove={(idx) => removeItem('projects', idx)} renderItem={(p, i) => (<><div className="grid gap-2 mb-2"><Input label="Título" value={p.title} onChange={v=>updateItem('projects', i, 'title', v)}/><Input label="Tech" value={p.tech} onChange={v=>updateItem('projects', i, 'tech', v)}/></div><DraggableDescriptionList items={p.description} sectionId="projects" itemIndex={i} onUpdate={updateArrayItem} onRemove={removeArrayItemFromItem} onAdd={addArrayItemToItem} /></>)}/>);
  const renderExperienceForm = () => (<DraggableSection sectionId="experience" title={data.structure.experience.title} items={data.experience} onAdd={() => addItem('experience', {company:'', role:'', period:'', location:'', description:['']})} onRemove={(idx) => removeItem('experience', idx)} renderItem={(ex, i) => (<><div className="grid grid-cols-2 gap-2 mb-2"><Input label="Empresa" value={ex.company} onChange={v=>updateItem('experience', i, 'company', v)}/><Input label="Cargo" value={ex.role} onChange={v=>updateItem('experience', i, 'role', v)}/><Input label="Período" value={ex.period} onChange={v=>updateItem('experience', i, 'period', v)}/><Input label="Local" value={ex.location} onChange={v=>updateItem('experience', i, 'location', v)}/></div><DraggableDescriptionList items={ex.description} sectionId="experience" itemIndex={i} onUpdate={updateArrayItem} onRemove={removeArrayItemFromItem} onAdd={addArrayItemToItem} /></>)}/>);
  const renderEducationForm = () => (<DraggableSection sectionId="education" title={data.structure.education.title} items={data.education} onAdd={() => addItem('education', {institution:'', degree:'', period:'', location:'', details:''})} onRemove={(idx) => removeItem('education', idx)} renderItem={(ed, i) => (<><Input label="Instituição" value={ed.institution} onChange={v=>updateItem('education', i, 'institution', v)}/><Input label="Grau" value={ed.degree} onChange={v=>updateItem('education', i, 'degree', v)}/><div className="grid grid-cols-2 gap-2"><Input label="Período" value={ed.period} onChange={v=>updateItem('education', i, 'period', v)}/><Input label="Local" value={ed.location} onChange={v=>updateItem('education', i, 'location', v)}/></div><Input label="Detalhes" value={ed.details} onChange={v=>updateItem('education', i, 'details', v)}/></>)}/>);
  
  const renderOthersForm = () => (
    <DraggableSection 
      sectionId="others" 
      title={data.structure.others.title}
      items={data.others} 
      onAdd={() => addItem('others', {title: 'Nova Categoria', description: ['']})}
      onRemove={(idx) => removeItem('others', idx)}
      renderItem={(item, i) => (
        <>
          <div className="mb-2">
            <Input label="Título da Categoria" value={item.title} onChange={v=>updateItem('others', i, 'title', v)}/>
          </div>
          <DraggableDescriptionList 
            items={item.description}
            sectionId="others"
            itemIndex={i}
            onUpdate={updateArrayItem}
            onRemove={removeArrayItemFromItem}
            onAdd={addArrayItemToItem}
          />
        </>
      )}
    />
  );

  const renderActiveSection = () => {
    if (activeTab.startsWith('custom-')) { return renderCustomTabForm(activeTab); }
    switch(activeTab) {
      case 'settings': return renderSettingsForm();
      case 'sections': return renderSectionManagementForm();
      case 'personal': return renderPersonalForm();
      case 'summary': return renderSummaryForm();
      case 'skills': return renderSkillsForm();
      case 'projects': return renderProjectsForm();
      case 'experience': return renderExperienceForm();
      case 'education': return renderEducationForm();
      case 'others': return renderOthersForm();
      default: return renderSettingsForm();
    }
  };

  const tabs = [
    { id: 'settings', label: 'Layout & Otimização', icon: Settings },
    { id: 'sections', label: 'Gerenciar Seções', icon: Layers },
    { id: 'personal', label: 'Pessoal', icon: User },
    { id: 'summary', label: 'Resumo', icon: FileText },
    { id: 'skills', label: 'Competências', icon: Code },
    { id: 'projects', label: 'Projetos', icon: Briefcase },
    { id: 'experience', label: 'Experiência', icon: Briefcase },
    { id: 'education', label: 'Formação', icon: GraduationCap },
    { id: 'others', label: 'Outros', icon: Globe },
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col md:flex-row overflow-hidden">
        <link href={FONTS[settings.font].url} rel="stylesheet" />
        <nav className={`bg-slate-900 text-slate-300 flex-shrink-0 h-auto md:h-screen sticky top-0 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'w-full md:w-64' : 'w-0 md:w-0 overflow-hidden'}`}>
          <div className="p-6 border-b border-slate-700 flex justify-between items-center"><div><h1 className="text-white font-bold text-xl whitespace-nowrap">Resume Builder</h1><p className="text-xs text-slate-500 mt-1 whitespace-nowrap">V7.2 - Focus Fix</p></div></div>
          <div className="p-4 space-y-1">
            {tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'} ${tab.id === 'settings' ? 'mb-4 ring-1 ring-slate-600' : ''}`}><tab.icon size={18} /><span className="font-medium">{tab.label}</span>{activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}</button>))}
            {data.customSections.map(sec => (<button key={sec.id} onClick={() => setActiveTab(sec.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === sec.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}><PenTool size={18} /><span className="font-medium truncate">{sec.title}</span>{activeTab === sec.id && <ChevronRight size={16} className="ml-auto" />}</button>))}
          </div>
          <div className="p-6 mt-auto border-t border-slate-700"><button onClick={handlePrint} className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"><Download size={20} className="mr-2" /> Baixar PDF</button></div>
        </nav>
        <div className="absolute top-4 left-4 z-50 md:relative md:top-0 md:left-0 md:p-2 bg-gray-100 md:bg-transparent"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-800 text-white rounded-md shadow hover:bg-slate-700 transition-colors">{isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}</button></div>
        <main className={`flex-1 p-8 overflow-y-auto bg-white border-r border-gray-200 transition-all ${isSidebarOpen ? 'md:max-w-xl lg:max-w-2xl' : 'w-full'}`}>{renderActiveSection()}</main>
        <div className="flex-1 bg-gray-200 p-8 overflow-y-auto flex flex-col items-center justify-start"><div className="mb-4 bg-white p-2 rounded shadow-md flex items-center gap-4 sticky top-0 z-10"><span className="text-xs font-bold text-gray-500 uppercase">Zoom</span><button onClick={() => setZoom(Math.max(0.3, zoom - 0.1))} className="p-1 hover:bg-gray-100 rounded"><ZoomOut size={16} /></button><span className="text-sm font-mono w-12 text-center">{Math.round(zoom * 100)}%</span><button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-1 hover:bg-gray-100 rounded"><ZoomIn size={16} /></button><input type="range" min="0.3" max="1.5" step="0.1" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div><div className="w-full flex justify-center items-start overflow-visible min-h-screen pb-32"><div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}><ResumePreview data={data} settings={settings} /></div></div></div>
      </div>
    </DragDropContext>
  );
}