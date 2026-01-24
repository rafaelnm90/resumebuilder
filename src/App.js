import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, GraduationCap, User, Code, FileText, Download, Plus, Trash2, 
  ChevronRight, Globe, Settings, Palette, Type, Layout, Eye, EyeOff, 
  AlignJustify, Maximize2, MoveHorizontal, Columns, ZoomIn, ZoomOut,
  Menu, X, Layers, List, Grid, PenTool, GripVertical, Bold, Italic, Maximize,
  Image as ImageIcon, Upload, AlignLeft, AlignCenter, AlignRight,
  Circle, Square, Move, Crop, Info, 
  RotateCw, RotateCcw, Sun, FlipHorizontal, Droplet, Frame, Sliders, Link as LinkIcon,
  UserPlus, AlertTriangle
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ResumePreview from './ResumePreview';
import { INITIAL_DATA, INITIAL_SETTINGS, FONTS, LIST_STYLES, TRANSLATIONS } from './constants';

const SECTION_ICONS = {
  objective: FileText,
  summary: FileText,
  skills: Code,
  projects: Briefcase,
  experience: Briefcase,
  education: GraduationCap,
  others: Globe,
  references: UserPlus,
  keywords: EyeOff 
};

const ToggleSwitch = ({ checked, onChange, title }) => (
    <button 
        onClick={onChange}
        className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
        title={title}
    >
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow transition-transform ${checked ? 'left-6' : 'left-1'}`}></div>
    </button>
);

const insertFormatting = (ref, type) => {
  const input = ref.current;
  if (!input) return undefined;

  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = input.value;
  
  const marker = type === 'bold' ? '**' : '*';
  
  const newText = text.substring(0, start) + marker + text.substring(start, end) + marker + text.substring(end);
  return newText;
};

const handleFormatList = (ref, type, currentVal, setVal) => {
    const input = ref.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    const marker = type === 'bold' ? '**' : '*';
    const newText = text.substring(0, start) + marker + text.substring(start, end) + marker + text.substring(end);
    setVal(newText);
};

const RichTextToolbar = ({ onFormat, onExpand }) => (
  <div className="flex gap-1 items-center bg-gray-50 border-l border-t border-r rounded-t px-2 py-1 self-end mr-2">
    {onFormat && (
      <>
        <button onClick={(e) => {e.preventDefault(); onFormat('bold')}} className="p-1 hover:bg-gray-200 rounded text-gray-700" title="Negrito"><Bold size={12}/></button>
        <button onClick={(e) => {e.preventDefault(); onFormat('italic')}} className="p-1 hover:bg-gray-200 rounded text-gray-700" title="Itálico"><Italic size={12}/></button>
        <div className="w-px bg-gray-300 mx-1 h-3"></div>
      </>
    )}
    {onExpand && (
      <button onClick={(e) => {e.preventDefault(); onExpand()}} className="p-1 hover:bg-blue-100 text-blue-600 rounded" title="Expandir"><Maximize size={12}/></button>
    )}
  </div>
);

const Input = ({ label, value, onChange, onExpandRequest, enableRich = false }) => {
  const inputRef = useRef(null);

  const handleFormat = (type) => {
    const newVal = insertFormatting(inputRef, type);
    if (newVal !== undefined) onChange(newVal);
  };

  return (
    <div className="flex flex-col group relative mb-2">
      <div className="flex justify-between items-end">
        <label className="text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
        {(enableRich || onExpandRequest) && (
          <RichTextToolbar 
            onFormat={enableRich ? handleFormat : null} 
            onExpand={() => onExpandRequest && onExpandRequest(label, value, onChange)} 
          />
        )}
      </div>
      <input 
        ref={inputRef}
        type="text" 
        className={`p-2 border rounded-md outline-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full ${enableRich || onExpandRequest ? 'rounded-tr-none' : ''}`}
        value={value || ''} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
};

const DraggableListItemInput = ({ value, onChange, onRemove, dragHandleProps, onExpandRequest, labelForModal }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFormat = (type) => {
    const newVal = insertFormatting(inputRef, type);
    if (newVal !== undefined) onChange(newVal);
  };

  const handleIndent = () => {
    let cleanValue = value.replace(/^## /, '');
    if (cleanValue.startsWith('>> ')) {
        onChange(cleanValue.substring(3));
    } else {
        onChange('>> ' + cleanValue);
    }
  };

  const handleHeader = () => {
    let cleanValue = value.replace(/^>> /, '');
    if (cleanValue.startsWith('## ')) {
        onChange(cleanValue.substring(3));
    } else {
        onChange('## ' + cleanValue);
    }
  };

  const isHeader = value.startsWith('## ');
  const isSub = value.startsWith('>> ');

  return (
    <div className="flex flex-col w-full group">
        <div className={`self-end transition-opacity ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} h-6 mb-0.5`}>
             <RichTextToolbar 
                onFormat={handleFormat}
                onExpand={() => onExpandRequest(labelForModal, value, onChange)}
            />
        </div>
        
        <div className="flex gap-2 items-center relative">
            <div {...dragHandleProps} className="text-gray-300 hover:text-gray-500 cursor-grab"><GripVertical size={14} /></div>
            <div className="flex-1 relative">
                <input 
                    ref={inputRef}
                    className={`w-full p-2 border rounded text-xs focus:border-blue-500 outline-none ${isHeader ? 'font-bold text-gray-800 bg-gray-50' : ''}`}
                    value={value || ''} 
                    onChange={e => onChange(e.target.value)} 
                    placeholder={isHeader ? "Título do Tópico..." : ""}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
            </div>
            
            <button onClick={handleHeader} className={`text-gray-400 hover:text-blue-600 ${isHeader ? 'text-blue-600 bg-blue-50 rounded p-1' : 'p-1'}`} title="Tópico"><Type size={16}/></button>
            <button onClick={handleIndent} className={`text-gray-400 hover:text-blue-600 ${isSub ? 'text-blue-600 bg-blue-50 rounded p-1' : 'p-1'}`} title="Subtópico" disabled={isHeader}><ChevronRight size={16}/></button>
            <button onClick={onRemove} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14}/></button>
        </div>
    </div>
  );
};

const DraggableDescriptionList = ({ items, sectionId, itemIndex, onUpdate, onRemove, onAdd, onExpandRequest, t }) => {
  const droppableId = `desc-${sectionId}-${itemIndex}`;
  return (
    <Droppable droppableId={droppableId} type="DESCRIPTION_ITEM">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-1 mt-2">
          {(items || []).map((desc, index) => (
            <Draggable key={`${droppableId}-${index}`} draggableId={`${droppableId}-${index}`} index={index}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} className={`${snapshot.isDragging ? 'opacity-70' : ''}`}>
                    <DraggableListItemInput 
                        value={desc}
                        onChange={(val) => onUpdate(sectionId, itemIndex, 'description', index, val)}
                        onRemove={() => onRemove(sectionId, itemIndex, 'description', index)}
                        dragHandleProps={provided.dragHandleProps}
                        onExpandRequest={onExpandRequest}
                        labelForModal={`Item ${index + 1}`}
                    />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button onClick={() => onAdd(sectionId, itemIndex, 'description')} className="text-xs text-blue-600 flex items-center mt-1 ml-6"><Plus size={12} className="mr-1"/> {t.addItem}</button>
        </div>
      )}
    </Droppable>
  );
};

const DraggableSection = ({ sectionId, title, items, onAdd, onRemove, renderItem, isVisible, onToggle, t }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-bold capitalize">{title}</h2>
        <div className="flex items-center gap-3">
             <span className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors ${isVisible ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                {isVisible ? t.atsStatusOn : t.atsStatusOff}
             </span>
             <ToggleSwitch 
                checked={isVisible} 
                onChange={onToggle} 
                title={isVisible ? t.deactivate : t.activate}
             />
             <div className="h-4 w-px bg-gray-300 mx-1"></div>
             <button onClick={onAdd} className="text-blue-600 text-sm flex items-center hover:text-blue-800" title={t.addItem}>
                <Plus size={16} />
             </button>
        </div>
    </div>

    <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-60 pointer-events-none grayscale'}`}>
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
  </div>
);

const ExpandedModal = ({ isOpen, onClose, title, value, onSave }) => {
  const [localValue, setLocalValue] = useState(value);
  const textRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value, isOpen]);

  if (!isOpen) return null;

  const handleFormat = (type) => {
    const newValue = insertFormatting(textRef, type);
    if (newValue !== undefined) setLocalValue(newValue);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">{title || 'Editar Texto'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24}/></button>
        </div>
        <div className="p-2 bg-gray-50 border-b flex gap-2">
            <button onClick={() => handleFormat('bold')} className="p-1 hover:bg-gray-200 rounded font-bold" title="Negrito"><Bold size={16}/></button>
            <button onClick={() => handleFormat('italic')} className="p-1 hover:bg-gray-200 rounded italic" title="Itálico"><Italic size={16}/></button>
        </div>
        <div className="flex-1 p-4">
          <textarea 
            ref={textRef}
            className="w-full h-full p-4 border rounded resize-none outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            value={localValue || ''}
            onChange={(e) => setLocalValue(e.target.value)}
          />
        </div>
        <div className="p-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
          <button onClick={() => { onSave(localValue); onClose(); }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [activeTab, setActiveTab] = useState('personal');
  const [zoom, setZoom] = useState(0.7); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [language, setLanguage] = useState('pt');
  const t = TRANSLATIONS[language].ui;

  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const [expandedField, setExpandedField] = useState(null);
  const [isSpacingAdvancedOpen, setIsSpacingAdvancedOpen] = useState(false);

  const listTextRef = useRef(null); 
  const summaryRef = useRef(null);
  const objectiveRef = useRef(null);

  const changeLanguage = (newLang) => {
      setLanguage(newLang);
      const newTitles = TRANSLATIONS[newLang].sections;
      
      setData(prevData => {
          const newStructure = { ...prevData.structure };
          Object.keys(newStructure).forEach(key => {
              if (newTitles[key]) {
                  newStructure[key] = { ...newStructure[key], title: newTitles[key] };
              }
          });
          return { ...prevData, structure: newStructure };
      });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            updateField('personal', 'photo', reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    if (isResizing) setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 280 && newWidth < 800) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing]);

  const handlePrint = () => {
    const resumeContent = document.getElementById('resume-preview');
    if (!resumeContent) return alert("Erro ao gerar PDF.");
    const printWindow = window.open('', '', 'height=800,width=900');
    if (!printWindow) return alert("Por favor, permita pop-ups para baixar o PDF.");

    const contentClone = resumeContent.cloneNode(true);
    const guides = contentClone.querySelectorAll('.page-guide');
    guides.forEach(g => g.remove());
    
    contentClone.style.transform = 'none';
    contentClone.style.zoom = '1';
    contentClone.style.margin = '0'; 
    contentClone.style.padding = '0'; 

    printWindow.document.write(`
      <html lang="pt-BR">
        <head>
          <title>Currículo - ${data.personal.name}</title>
          ${FONTS[settings.font].url ? `<link href="${FONTS[settings.font].url}" rel="stylesheet">` : ''}
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            *, *::before, *::after { box-sizing: border-box !important; }
            .keep-together { page-break-inside: avoid !important; break-inside: avoid !important; display: block !important; }
            h3, .dynamic-title { page-break-after: avoid !important; break-after: avoid !important; }
            html, body, p, li, div, span { -webkit-hyphens: auto !important; -ms-hyphens: auto !important; hyphens: auto !important; word-break: break-word !important; }
            
            @media print {
              @page { size: A4; margin: 0; }
              body { margin: 0; background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              #resume-preview { width: 100% !important; height: auto !important; margin: 0 !important; border: none !important; box-shadow: none !important; transform: none !important; overflow: visible !important; }
              .flex-row-print { display: flex !important; flex-direction: row !important; }
              .dynamic-title { color: ${settings.themeColor} !important; }
              .content-container { width: 100% !important; margin: 0 !important; }
              a { text-decoration: none !important; }
              thead { display: table-header-group; }
              tfoot { display: table-footer-group; }
            }
            body { font-family: '${settings.font}', sans-serif; }
            .dynamic-title { color: ${settings.themeColor} !important; font-weight: ${settings.sectionTitleBold ? '700' : '400'} !important; border-bottom: 1px solid ${settings.themeColor} !important; opacity: 0.9; }
          </style>
        </head>
        <body>
            ${contentClone.outerHTML}
            <script>setTimeout(() => { window.print(); window.close(); }, 1000);</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleOpenExpand = (title, currentValue, saveCallback) => {
    setExpandedField({ title, value: currentValue, onSave: saveCallback });
  };

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === 'MAIN_SECTION_ORDER') {
      const newOrder = Array.from(data.sectionOrder);
      const [movedId] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, movedId);
      setData(prev => ({ ...prev, sectionOrder: newOrder }));
      return;
    }

    if (type === 'SECTION_ITEM') {
      const listId = source.droppableId;
      const currentList = Array.from(data[listId]);
      const [reorderedItem] = currentList.splice(source.index, 1);
      currentList.splice(destination.index, 0, reorderedItem);
      setData(prev => ({ ...prev, [listId]: currentList }));
    }

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

  const addCustomSection = (type) => {
    const id = `custom-${Date.now()}`;
    const newSection = { id: id, title: t.addSection, type: type, content: type === 'text' ? '' : [], visible: true };
    setData(prev => ({ ...prev, customSections: [...prev.customSections, newSection], sectionOrder: [...prev.sectionOrder, id] }));
    setActiveTab(id);
  };
  const removeCustomSection = (id) => {
    setData(prev => ({ ...prev, customSections: prev.customSections.filter(s => s.id !== id), sectionOrder: prev.sectionOrder.filter(sid => sid !== id) }));
    if (activeTab === id) setActiveTab('sections');
  };
  const updateCustomSectionTitle = (id, newTitle) => {
    setData(prev => ({ ...prev, customSections: prev.customSections.map(s => s.id === id ? { ...s, title: newTitle } : s) }));
  };
  const addDetailedItem = (sid) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: [...s.content, { title: '', subtitle: '', date: '', location: '', description: [''] }] } : s) }));
  const removeDetailedItem = (sid, idx) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.filter((_, i) => i !== idx) } : s) }));
  const updateDetailedItem = (sid, idx, f, v) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.map((item, i) => i === idx ? { ...item, [f]: v } : item) } : s) }));
  
  const updateDetailedItemDesc = (sid, idx, ignoredField, di, v) => {
    setData(p => ({
        ...p,
        customSections: p.customSections.map(s => 
            s.id === sid ? {
                ...s,
                content: s.content.map((item, i) => 
                    i === idx ? {
                        ...item,
                        description: item.description.map((d, k) => k === di ? v : d)
                    } : item
                )
            } : s
        )
    }));
  };
  
  const addDetailedItemDescLine = (sid, idx) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.map((item, i) => i === idx ? { ...item, description: [...item.description, ""] } : item) } : s) }));
  const removeDetailedItemDescLine = (sid, idx, di) => setData(p => ({ ...p, customSections: p.customSections.map(s => s.id === sid ? { ...s, content: s.content.map((item, i) => i === idx ? { ...item, description: item.description.filter((_, k) => k !== di) } : item) } : s) }));
  
  const updateSectionSpacing = (sectionId, value) => {
      setSettings(prev => ({
          ...prev,
          sectionItemSpacings: {
              ...prev.sectionItemSpacings,
              [sectionId]: parseFloat(value)
          }
      }));
  };

  const renderSectionHeader = (sectionId, title) => {
    const isCustom = sectionId.startsWith('custom-');
    const config = isCustom ? data.customSections.find(s => s.id === sectionId) : data.structure[sectionId];
    
    if (!config) return <h2 className="text-xl font-bold border-b pb-2 mb-4">{title}</h2>;

    const isVisible = config.visible;
    const Icon = SECTION_ICONS[sectionId] || (isCustom ? PenTool : FileText);

    return (
        <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-bold flex items-center text-gray-800">
                <Icon size={20} className="mr-2"/> {title}
            </h2>
            <div className="flex items-center gap-3">
                 <span className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors ${isVisible ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                    {isVisible ? t.atsStatusOn : t.atsStatusOff}
                 </span>
                 <ToggleSwitch 
                    checked={isVisible} 
                    onChange={() => {
                        if (isCustom) {
                             setData(prev => ({ ...prev, customSections: prev.customSections.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s) }));
                        } else {
                             updateStructure(sectionId, 'visible', !isVisible);
                        }
                    }} 
                    title={isVisible ? t.deactivate : t.activate}
                 />
            </div>
        </div>
    );
  };

  const renderSettingsForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center"><Layout className="mr-2" size={20}/> {t.layoutTab}</h2>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 shadow-sm">
         <label className="flex items-center text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
            <Frame size={16} className="mr-2"/> {t.pageDecoration}
         </label>
         
         <div className="space-y-1">
             <div className="flex justify-between items-center text-xs text-gray-800 font-semibold">
                <span>{t.pageLines}</span>
                <ToggleSwitch checked={settings.showPageLines} onChange={() => setSettings({...settings, showPageLines: !settings.showPageLines})} />
             </div>
             <p className="text-[10px] text-gray-500 leading-tight pr-4">{t.pageLinesDesc}</p>
         </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-4">
        <label className="flex items-center text-sm font-bold text-blue-800"><Maximize2 size={16} className="mr-2"/> {t.geometry}</label>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-blue-800 font-semibold"><span>{t.fontSize}</span><span>{settings.fontSizeBase}pt</span></div>
          <input type="range" min="9" max="12" step="0.5" value={settings.fontSizeBase} onChange={e => setSettings({...settings, fontSizeBase: parseFloat(e.target.value)})} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-blue-800 font-semibold"><span>{t.lineHeight}</span><span>{settings.lineHeight}</span></div>
          <input type="range" min="1.0" max="2.0" step="0.05" value={settings.lineHeight} onChange={e => setSettings({...settings, lineHeight: parseFloat(e.target.value)})} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        
        <div className="space-y-1">
             <div className="flex justify-between text-xs text-blue-800 font-semibold">
                <span>{t.headerMargin}</span>
                <span>{settings.headerSpacing}mm</span>
             </div>
             <input 
                type="range" min="0" max="20" step="1" 
                value={settings.headerSpacing || 0} 
                onChange={e => setSettings({...settings, headerSpacing: parseFloat(e.target.value)})}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
             />
        </div>

        <div className="space-y-1 border-t border-blue-100 pt-3">
             <div className="flex justify-between text-xs text-blue-800 font-semibold mb-1"><span>{t.markerStyle}</span></div>
             <div className="flex gap-2">
                 <select 
                    value={settings.listStyle || 'disc'} 
                    onChange={e => setSettings({...settings, listStyle: e.target.value})}
                    className="flex-1 p-2 text-sm border rounded bg-white focus:border-blue-500 outline-none"
                 >
                    {Object.entries(LIST_STYLES).map(([key, style]) => (
                        <option key={key} value={key}>{style.label}</option>
                    ))}
                 </select>
                 
                 <button 
                    onClick={() => setSettings({...settings, listMarkerBold: !settings.listMarkerBold})}
                    className={`px-3 border rounded transition-colors ${settings.listMarkerBold ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-300 hover:bg-gray-50'}`}
                    title={t.boldMarker}
                 >
                    <Bold size={16} />
                 </button>

                 <button 
                    onClick={() => setSettings({...settings, listMarkerUseThemeColor: !settings.listMarkerUseThemeColor})}
                    className={`px-3 border rounded transition-colors ${settings.listMarkerUseThemeColor ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-300 hover:bg-gray-50'}`}
                    title={t.colorMarker}
                 >
                    <Palette size={16} />
                 </button>
             </div>
        </div>

        <div className="space-y-1 border-t border-blue-100 pt-3">
             <div className="flex justify-between text-xs text-blue-800 font-semibold mb-2">
                <span>{t.itemSpacing}</span>
                <span>{settings.itemSpacing}mm</span>
             </div>
             <input 
                type="range" min="0" max="15" step="0.5" 
                value={settings.itemSpacing || 0} 
                onChange={e => setSettings({...settings, itemSpacing: parseFloat(e.target.value)})}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mb-2"
             />

             <div className="bg-white bg-opacity-60 rounded border border-blue-200 overflow-hidden">
                 <button 
                    onClick={() => setIsSpacingAdvancedOpen(!isSpacingAdvancedOpen)}
                    className="w-full px-3 py-2 flex items-center justify-between text-xs text-blue-700 font-bold hover:bg-blue-100 transition-colors"
                 >
                     <span className="flex items-center"><Sliders size={12} className="mr-2"/> {t.fineTune}</span>
                     <ChevronRight size={14} className={`transform transition-transform ${isSpacingAdvancedOpen ? 'rotate-90' : ''}`}/>
                 </button>
                 
                 {isSpacingAdvancedOpen && (
                     <div className="p-3 space-y-3 border-t border-blue-100 animate-in fade-in slide-in-from-top-1 duration-200">
                         {data.sectionOrder.map(sectionId => {
                             if (sectionId === 'summary') return null; 
                             const isCustom = sectionId.startsWith('custom-');
                             const config = isCustom ? data.customSections.find(s => s.id === sectionId) : data.structure[sectionId];
                             if (!config || !config.visible) return null;
                             if (isCustom && config.type === 'text') return null;

                             const currentVal = settings.sectionItemSpacings[sectionId];
                             const displayVal = currentVal !== undefined ? `${currentVal}mm` : '(Global)';

                             return (
                                 <div key={sectionId} className="space-y-1">
                                     <div className="flex justify-between text-[11px] text-blue-900 font-medium">
                                         <span className="truncate w-2/3">{config.title}</span>
                                         <span className="text-gray-500">{displayVal}</span>
                                     </div>
                                     <div className="flex items-center gap-2">
                                        <input 
                                            type="range" min="-1" max="15" step="0.5" 
                                            value={currentVal !== undefined ? currentVal : -1} 
                                            onChange={e => {
                                                const val = parseFloat(e.target.value);
                                                if (val === -1) {
                                                    const newSpacings = {...settings.sectionItemSpacings};
                                                    delete newSpacings[sectionId];
                                                    setSettings({...settings, sectionItemSpacings: newSpacings});
                                                } else {
                                                    updateSectionSpacing(sectionId, val);
                                                }
                                            }}
                                            className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        {currentVal !== undefined && (
                                            <button 
                                                onClick={() => {
                                                    const newSpacings = {...settings.sectionItemSpacings};
                                                    delete newSpacings[sectionId];
                                                    setSettings({...settings, sectionItemSpacings: newSpacings});
                                                }}
                                                className="text-red-400 hover:text-red-600 p-0.5"
                                                title="Resetar para Global"
                                            >
                                                <X size={12}/>
                                            </button>
                                        )}
                                     </div>
                                 </div>
                             );
                         })}
                     </div>
                 )}
             </div>
        </div>

        <div className="space-y-1 border-t border-blue-100 pt-3">
             <div className="flex justify-between text-xs text-blue-800 font-semibold mb-2">
                <span>{t.sectionSpacing}</span>
                <span>{settings.sectionSpacing}mm</span>
             </div>
             <input 
                type="range" min="0" max="20" step="0.5" 
                value={settings.sectionSpacing || 0} 
                onChange={e => setSettings({...settings, sectionSpacing: parseFloat(e.target.value)})}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
             />
        </div>

        <div className="flex items-center justify-between border-t border-blue-100 pt-3">
          <span className="text-sm text-blue-800">{t.justifyText}</span>
          <button onClick={() => setSettings({...settings, textAlign: settings.textAlign === 'justify' ? 'left' : 'justify'})} className={`p-1 rounded ${settings.textAlign === 'justify' ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-400'}`}><AlignJustify size={18}/></button>
        </div>

        <div className="flex items-center justify-between border-t border-blue-100 pt-3">
          <div className="flex items-center gap-4 group relative">
            <span className="text-sm text-blue-800 cursor-help">{t.keepTogether}</span>
            <Info size={20} className="text-blue-600 cursor-help"/>
            <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded shadow-lg hidden group-hover:block z-[9999] pointer-events-none">
              Quando ativado, força um item inteiro (ex: uma experiência) a ir para a próxima página caso não caiba na atual, evitando que ele seja cortado ao meio.
              <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
          <ToggleSwitch checked={settings.pageBreakAuto} onChange={() => setSettings({...settings, pageBreakAuto: !settings.pageBreakAuto})} />
        </div>

        <div className="space-y-4 mt-4 border-t border-blue-200 pt-3">
            <div className="space-y-2">
                <div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><MoveHorizontal size={14} className="mr-1"/> {t.expColumn}</span></div>
                <div className="flex items-center gap-2">
                    <input type="range" min="20" max="60" step="1" value={settings.experienceColumnWidth} onChange={e => setSettings({...settings, experienceColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/>
                    <span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.experienceColumnWidth}mm</span>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><MoveHorizontal size={14} className="mr-1"/> {t.eduColumn}</span></div>
                <div className="flex items-center gap-2">
                    <input type="range" min="20" max="60" step="1" value={settings.educationColumnWidth} onChange={e => setSettings({...settings, educationColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/>
                    <span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.educationColumnWidth}mm</span>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><MoveHorizontal size={14} className="mr-1"/> {t.projColumn}</span></div>
                <div className="flex items-center gap-2">
                    <input type="range" min="20" max="60" step="1" value={settings.projectsColumnWidth} onChange={e => setSettings({...settings, projectsColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/>
                    <span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.projectsColumnWidth}mm</span>
                </div>
            </div>
            <div className="space-y-2 border-t border-blue-100 pt-2">
                <div className="flex flex-col gap-1"><span className="flex items-center text-xs font-bold text-blue-800"><Columns size={14} className="mr-1"/> {t.leftColumn}</span></div>
                <div className="flex items-center gap-2">
                <input type="range" min="30" max="80" step="1" value={settings.leftColumnWidth} onChange={e => setSettings({...settings, leftColumnWidth: parseInt(e.target.value)})} className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"/>
                <span className="text-xs font-mono text-blue-800 w-8 text-right">{settings.leftColumnWidth}mm</span>
                </div>
            </div>
        </div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 space-y-4">
        <label className="flex items-center text-sm font-bold text-yellow-800">
          {settings.showGuides ? <Eye size={16} className="mr-2"/> : <EyeOff size={16} className="mr-2"/>} 
          {t.guides}
        </label>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-yellow-800">{t.showGuides}</span>
          <ToggleSwitch checked={settings.showGuides} onChange={() => setSettings({...settings, showGuides: !settings.showGuides})} />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 shadow-sm">
        <label className="flex items-center text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
          <Type size={16} className="mr-2"/> {t.typography}
        </label>

        <div className="space-y-1">
             <div className="flex justify-between text-xs text-gray-600 font-semibold mb-1"><span>{t.fontFamily}</span></div>
             <select 
                value={settings.font} 
                onChange={e => setSettings({...settings, font: e.target.value})}
                className="w-full p-2 text-sm border rounded bg-gray-50 focus:border-blue-500 outline-none"
             >
                {Object.entries(FONTS).map(([key, fontData]) => (
                    <option key={key} value={key}>{fontData.name}</option>
                ))}
             </select>
        </div>

        <div className="space-y-2 pt-2 border-t border-gray-100 mt-2">
            <span className="text-xs font-bold text-gray-600 block">{t.themeOptions}</span>
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => setSettings({...settings, roleUseThemeColor: !settings.roleUseThemeColor})}
                    className={`px-3 py-2 border rounded transition-colors flex items-center justify-center gap-2 text-xs font-medium ${settings.roleUseThemeColor ? 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-200' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                    title={t.colorRoles}
                >
                    <Palette size={14} /> {t.colorRoles}
                </button>
                <button
                    onClick={() => setSettings({...settings, rightTextUseThemeColor: !settings.rightTextUseThemeColor})}
                    className={`px-3 py-2 border rounded transition-colors flex items-center justify-center gap-2 text-xs font-medium ${settings.rightTextUseThemeColor ? 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-200' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                    title={t.colorDates}
                >
                    <Palette size={14} /> {t.colorDates}
                </button>
            </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
            <span className="text-xs font-bold text-gray-600">{t.boldDates}</span>
            <ToggleSwitch checked={settings.rightTextBold} onChange={() => setSettings({...settings, rightTextBold: !settings.rightTextBold})} />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
            <span className="text-xs font-bold text-gray-600">{t.linkIcon}</span>
            <ToggleSwitch checked={settings.showLinkIcon} onChange={() => setSettings({...settings, showLinkIcon: !settings.showLinkIcon})} />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500 block mb-1">{t.accentColor}</span>
                <div className="flex items-center gap-2 border p-1 rounded bg-gray-50">
                    <input type="color" value={settings.themeColor} onChange={e => setSettings({...settings, themeColor: e.target.value})} className="h-8 w-10 cursor-pointer border-none bg-transparent" title="Escolher cor do tema"/>
                    <span className="text-xs font-mono text-gray-600">{settings.themeColor}</span>
                </div>
            </div>

            <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500 block mb-1">{t.textColor}</span>
                <div className="flex items-center gap-2 border p-1 rounded bg-gray-50">
                    <input type="color" value={settings.bodyColor || '#374151'} onChange={e => setSettings({...settings, bodyColor: e.target.value})} className="h-8 w-10 cursor-pointer border-none bg-transparent" title="Escolher cor do texto"/>
                    <span className="text-xs font-mono text-gray-600">{settings.bodyColor}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
  
  const renderSectionManagementForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center"><Layers className="mr-2" size={20}/> {t.sectionsTab}</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button onClick={() => addCustomSection('text')} className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors"><FileText size={16} className="mr-2"/> {t.text}</button>
        <button onClick={() => addCustomSection('list')} className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors"><List size={16} className="mr-2"/> {t.list}</button>
        <button onClick={() => addCustomSection('detailed')} className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors col-span-2"><Grid size={16} className="mr-2"/> {t.detailed}</button>
      </div>
      <Droppable droppableId="section-ordering" type="MAIN_SECTION_ORDER">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {data.sectionOrder.map((sectionId, index) => {
              const isCustom = sectionId.startsWith('custom-');
              const config = isCustom ? data.customSections.find(s => s.id === sectionId) : data.structure[sectionId];
              if (!config) return null;
              return (
                <Draggable key={sectionId} draggableId={sectionId} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className={`bg-white p-3 rounded border flex items-center gap-3 ${snapshot.isDragging ? 'shadow-lg border-blue-500 z-50' : 'border-gray-200'}`}>
                      <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab"><GripVertical size={20}/></div>
                      {isCustom ? (
                        <div className="flex-1 flex justify-between items-center">
                          <span className="text-sm font-semibold">{config.title} <span className="text-gray-400 text-xs">({config.type})</span></span>
                          <button onClick={() => removeCustomSection(sectionId)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                        </div>
                      ) : (
                        <div className="flex-1 flex justify-between items-center">
                          <input type="text" value={config.title} onChange={(e) => updateStructure(sectionId, 'title', e.target.value)} className="flex-1 p-1 text-sm border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"/>
                          <ToggleSwitch checked={config.visible} onChange={() => updateStructure(sectionId, 'visible', !config.visible)} />
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  const renderCustomTabForm = (sectionId) => { 
    const section = data.customSections.find(s => s.id === sectionId); 
    if (!section) return <div>Seção não encontrada</div>; 

    return (
      <div className="space-y-4">
        {/* CABEÇALHO PADRONIZADO COM TOGGLE */}
        {renderSectionHeader(sectionId, section.title)}
        
        <div className="mb-4">
             <Input label={t.catTitle} value={section.title} onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)} onExpandRequest={handleOpenExpand}/>
             <div className="flex justify-end mt-1">
                <button onClick={() => removeCustomSection(section.id)} className="text-red-400 flex items-center text-xs hover:text-red-600"><Trash2 size={12} className="mr-1"/> Remover Seção</button>
             </div>
        </div>
        
        {/* CORREÇÃO AQUI: Envolver conteúdo com div de opacidade */}
        <div className={`transition-opacity duration-300 ${section.visible ? 'opacity-100' : 'opacity-50 pointer-events-none grayscale'}`}>
            {section.type === 'text' && (
            <div className="space-y-1 relative group">
                <p className="text-xs text-gray-500">Dica: Use **palavra** para negrito.</p>
                <textarea 
                    className="w-full h-48 p-3 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    value={section.content} 
                    onChange={(e) => {setData(prev => ({...prev, customSections: prev.customSections.map(s => s.id === section.id ? { ...s, content: e.target.value } : s)}))}} 
                    placeholder="Digite o texto da seção aqui..."
                    disabled={!section.visible} // Desabilita edição
                />
                <RichTextToolbar 
                onFormat={(type) => {/* Simplificação */}} 
                onExpand={() => handleOpenExpand(section.title, section.content, (val) => setData(prev => ({...prev, customSections: prev.customSections.map(s => s.id === section.id ? { ...s, content: val } : s)})) )}
                />
            </div>
            )}
            
            {section.type === 'list' && (
            <div className="space-y-1 relative group">
                <p className="text-xs text-gray-500">Adicione itens (um por linha):</p>
                <textarea 
                    ref={listTextRef}
                    className="w-full h-48 p-3 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    value={Array.isArray(section.content) ? section.content.join('\n') : section.content} 
                    onChange={(e) => {setData(prev => ({...prev, customSections: prev.customSections.map(s => s.id === section.id ? { ...s, content: e.target.value.split('\n') } : s)}))}}
                    disabled={!section.visible} // Desabilita edição
                />
                <RichTextToolbar 
                    onFormat={(type) => {
                            const currentVal = Array.isArray(section.content) ? section.content.join('\n') : section.content;
                            handleFormatList(listTextRef, type, currentVal, (newVal) => {
                                setData(prev => ({...prev, customSections: prev.customSections.map(s => s.id === section.id ? { ...s, content: newVal.split('\n') } : s)}));
                            });
                    }}
                    onExpand={() => handleOpenExpand(section.title, Array.isArray(section.content) ? section.content.join('\n') : section.content, (val) => setData(prev => ({...prev, customSections: prev.customSections.map(s => s.id === section.id ? { ...s, content: val.split('\n') } : s)})) )}
                />
            </div>
            )}
            
            {section.type === 'detailed' && (
            <div className="space-y-4">
                <div className="flex justify-end">
                <button onClick={() => addDetailedItem(section.id)} className="text-blue-600 text-sm flex items-center font-bold"><Plus size={16} className="mr-1"/> {t.addItem}</button>
                </div>
                {section.content.map((item, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded relative border border-gray-200">
                    <button onClick={() => removeDetailedItem(section.id, i)} className="absolute top-2 right-2 text-red-400"><Trash2 size={16}/></button>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input label={t.title + " / " + t.company} value={item.title} onChange={v => updateDetailedItem(section.id, i, 'title', v)} onExpandRequest={handleOpenExpand} />
                    <Input label="Subtítulo / Cargo" value={item.subtitle} onChange={v => updateDetailedItem(section.id, i, 'subtitle', v)} onExpandRequest={handleOpenExpand} />
                    <Input label={t.period} value={item.date} onChange={v => updateDetailedItem(section.id, i, 'date', v)} onExpandRequest={handleOpenExpand} />
                    <Input label={t.location} value={item.location} onChange={v => updateDetailedItem(section.id, i, 'location', v)} onExpandRequest={handleOpenExpand} />
                    </div>
                    <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Descrição (Tópicos)</label>
                    <DraggableDescriptionList 
                        items={item.description} 
                        sectionId={section.id} 
                        itemIndex={i} 
                        onUpdate={updateDetailedItemDesc} 
                        onRemove={removeDetailedItemDescLine} 
                        onAdd={addDetailedItemDescLine} 
                        onExpandRequest={handleOpenExpand}
                        t={t}
                    />
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
      </div>
    );
  };

  const renderPersonalForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">{t.personalTab}</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
            <ImageIcon size={16} className="mr-2"/> {t.photoSettings}
        </label>
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
                <div className="flex-1 space-y-3">
                     <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t.showPhoto}</span>
                        <ToggleSwitch checked={data.personal.showPhoto} onChange={() => updateField('personal', 'showPhoto', !data.personal.showPhoto)} />
                     </div>
                     <label className="cursor-pointer flex items-center justify-center w-full p-2 bg-white border border-dashed border-gray-400 rounded hover:bg-gray-50 text-sm text-gray-600 transition-colors">
                        <Upload size={16} className="mr-2"/>
                        <span>{t.uploadPhoto}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                     </label>
                </div>
                {data.personal.photo && (
                    <div className="w-20 h-20 rounded border border-gray-300 overflow-hidden bg-white shadow-sm flex-shrink-0 flex items-center justify-center">
                        <img src={data.personal.photo} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                )}
            </div>

            {data.personal.showPhoto && (
                <div className="border-t border-gray-200 pt-3 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase flex items-center"><Layout size={12} className="mr-1"/> {t.photoPos}</span>
                        <div className="flex gap-1">
                            <button onClick={() => updateField('personal', 'photoAlignment', 'left')} className={`p-1.5 rounded ${data.personal.photoAlignment === 'left' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`} title="Esquerda"><AlignLeft size={16}/></button>
                            <button onClick={() => updateField('personal', 'photoAlignment', 'center')} className={`p-1.5 rounded ${data.personal.photoAlignment === 'center' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`} title="Centro"><AlignCenter size={16}/></button>
                            <button onClick={() => updateField('personal', 'photoAlignment', 'right')} className={`p-1.5 rounded ${data.personal.photoAlignment === 'right' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`} title="Direita"><AlignRight size={16}/></button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase flex items-center"><Crop size={12} className="mr-1"/> {t.photoShape}</span>
                        <div className="flex gap-1">
                            <button onClick={() => updateField('personal', 'photoShape', 'circle')} className={`p-1.5 rounded ${data.personal.photoShape === 'circle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`} title="Círculo"><Circle size={16}/></button>
                            <button onClick={() => updateField('personal', 'photoShape', 'rounded')} className={`p-1.5 rounded ${data.personal.photoShape === 'rounded' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`} title="Arredondado"><Square size={16} className="rounded-sm"/></button>
                            <button onClick={() => updateField('personal', 'photoShape', 'square')} className={`p-1.5 rounded ${data.personal.photoShape === 'square' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`} title="Quadrado"><Square size={16}/></button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                            <span className="flex items-center"><ZoomIn size={12} className="mr-1"/> {t.photoZoom}</span>
                            <span>{data.personal.photoScale}%</span>
                        </div>
                        <input 
                            type="range" min="50" max="200" step="1" 
                            value={data.personal.photoScale || 100} 
                            onChange={(e) => updateField('personal', 'photoScale', parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span className="flex items-center"><MoveHorizontal size={12} className="mr-1"/> {t.photoH}</span>
                            </div>
                            <input 
                                type="range" min="-100" max="100" step="1" 
                                value={data.personal.photoX || 0} 
                                onChange={(e) => updateField('personal', 'photoX', parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span className="flex items-center"><Move size={12} className="mr-1"/> {t.photoV}</span>
                            </div>
                            <input 
                                type="range" min="-100" max="100" step="1" 
                                value={data.personal.photoY || 0} 
                                onChange={(e) => updateField('personal', 'photoY', parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center"><Layers size={12} className="mr-1"/> {t.photoShadow}</span>
                            <ToggleSwitch checked={data.personal.photoShadow} onChange={() => updateField('personal', 'photoShadow', !data.personal.photoShadow)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center"><Circle size={12} className="mr-1"/> {t.photoBW}</span>
                            <ToggleSwitch checked={data.personal.photoGrayscale} onChange={() => updateField('personal', 'photoGrayscale', !data.personal.photoGrayscale)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center"><FlipHorizontal size={12} className="mr-1"/> {t.photoFlip}</span>
                            <ToggleSwitch checked={data.personal.photoFlip} onChange={() => updateField('personal', 'photoFlip', !data.personal.photoFlip)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center"><Maximize size={12} className="mr-1"/> {t.photoFill}</span>
                            <ToggleSwitch checked={data.personal.photoCover} onChange={() => updateField('personal', 'photoCover', !data.personal.photoCover)} />
                        </div>
                    </div>

                    <div className="space-y-1 pt-2">
                        <div className="flex justify-between text-xs text-gray-600">
                            <span className="flex items-center"><Frame size={12} className="mr-1"/> {t.photoBorder}</span>
                            <span>{data.personal.photoBorder || 0}px</span>
                        </div>
                        <input 
                            type="range" min="0" max="10" step="1" 
                            value={data.personal.photoBorder || 0} 
                            onChange={(e) => updateField('personal', 'photoBorder', parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-bold text-gray-500 uppercase flex items-center"><RotateCw size={12} className="mr-1"/> {t.photoRotate}</span>
                        <div className="flex gap-1">
                            <button onClick={() => updateField('personal', 'photoRotate', (data.personal.photoRotate || 0) - 90)} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="-90º"><RotateCcw size={16}/></button>
                            <button onClick={() => updateField('personal', 'photoRotate', (data.personal.photoRotate || 0) + 90)} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="+90º"><RotateCw size={16}/></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="space-y-1">
                            <div className="flex justify-center text-xs text-gray-600" title={t.brightness}><Sun size={12}/></div>
                            <input type="range" min="50" max="150" value={data.personal.photoBrightness || 100} onChange={(e) => updateField('personal', 'photoBrightness', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"/>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-center text-xs text-gray-600" title={t.contrast}><Circle size={12}/></div>
                            <input type="range" min="50" max="150" value={data.personal.photoContrast || 100} onChange={(e) => updateField('personal', 'photoContrast', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"/>
                        </div>
                         <div className="space-y-1">
                            <div className="flex justify-center text-xs text-gray-600" title={t.saturation}><Droplet size={12}/></div>
                            <input type="range" min="0" max="200" value={data.personal.photoSaturation || 100} onChange={(e) => updateField('personal', 'photoSaturation', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input label={t.name} value={data.personal.name} onChange={v=>updateField('personal','name',v)} onExpandRequest={handleOpenExpand}/>
        <Input label={t.email} value={data.personal.email} onChange={v=>updateField('personal','email',v)} onExpandRequest={handleOpenExpand}/>
        <Input label={t.phone} value={data.personal.phone} onChange={v=>updateField('personal','phone',v)} onExpandRequest={handleOpenExpand}/>
        <Input label={t.location} value={data.personal.location} onChange={v=>updateField('personal','location',v)} onExpandRequest={handleOpenExpand}/>
        <Input label={t.linkedin} value={data.personal.linkedin} onChange={v=>updateField('personal','linkedin',v)} onExpandRequest={handleOpenExpand}/>
        <Input label={t.github} value={data.personal.github} onChange={v=>updateField('personal','github',v)} onExpandRequest={handleOpenExpand}/>
        <Input label={t.lattes} value={data.personal.lattes || ''} onChange={v=>updateField('personal','lattes',v)} onExpandRequest={handleOpenExpand}/>
        <Input label={t.youtube} value={data.personal.youtube || ''} onChange={v=>updateField('personal','youtube',v)} onExpandRequest={handleOpenExpand}/>
      </div>
    </div>
  );
  
  const renderSummaryForm = () => {
    const isVisible = data.structure.summary.visible; // VERIFICA VISIBILIDADE
    const handleFormatSummary = (type) => {
      const newVal = insertFormatting(summaryRef, type);
      if(newVal !== undefined) updateSimpleField('summary', newVal);
    };

    return (
      <div className="space-y-4 relative group">
        {renderSectionHeader('summary', t.sections?.summary || "Resumo")}
        
        {/* WRAPPER PARA ACINZENTAR E DESABILITAR */}
        <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-50 pointer-events-none grayscale'}`}>
            <p className="text-xs text-gray-500 mb-1">Dica: Selecione o texto e use os botões que aparecem no canto.</p>
            <div className="relative">
              <textarea 
                ref={summaryRef}
                className="w-full h-48 p-3 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                value={data.summary} 
                onChange={e => updateSimpleField('summary', e.target.value)} 
                disabled={!isVisible} // DESABILITA TEXTAREA
              />
              <RichTextToolbar 
                onFormat={handleFormatSummary} 
                onExpand={() => handleOpenExpand(t.sections?.summary || "Resumo", data.summary, (val) => updateSimpleField('summary', val))}
              />
            </div>
        </div>
      </div>
    );
  };

  const renderObjectiveForm = () => {
    const isVisible = data.structure.objective.visible; // VERIFICA VISIBILIDADE
    const handleFormatObjective = (type) => {
      const newVal = insertFormatting(objectiveRef, type);
      if(newVal !== undefined) updateSimpleField('objective', newVal);
    };

    return (
      <div className="space-y-4 relative group">
        {renderSectionHeader('objective', t.sections?.objective || "Objetivo")}
        
        {/* WRAPPER PARA ACINZENTAR E DESABILITAR */}
        <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-50 pointer-events-none grayscale'}`}>
            <p className="text-xs text-gray-500 mb-1">Dica: Selecione o texto e use os botões que aparecem no canto.</p>
            <div className="relative">
              <textarea 
                ref={objectiveRef}
                className="w-full h-32 p-3 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                value={data.objective} 
                onChange={e => updateSimpleField('objective', e.target.value)} 
                disabled={!isVisible} // DESABILITA TEXTAREA
              />
              <RichTextToolbar 
                onFormat={handleFormatObjective} 
                onExpand={() => handleOpenExpand(t.sections?.objective || "Objetivo", data.objective, (val) => updateSimpleField('objective', val))}
              />
            </div>
        </div>
      </div>
    );
  };
  
  const renderSkillsForm = () => (
    <DraggableSection 
      sectionId="skills" 
      title={t.sections?.skills || "Competências"} 
      items={data.skills} 
      onAdd={() => addItem('skills', {category:'', items:''})} 
      onRemove={(idx) => removeItem('skills', idx)} 
      renderHeader={renderSectionHeader}
      isVisible={data.structure.skills.visible}
      onToggle={() => updateStructure('skills', 'visible', !data.structure.skills.visible)}
      t={t}
      renderItem={(s, i) => (
        <>
          <Input label={t.category} value={s.category} onChange={v=>updateItem('skills', i, 'category', v)} onExpandRequest={handleOpenExpand}/>
          <div className="mt-2">
            <Input label={t.itemsList} value={s.items} onChange={v=>updateItem('skills', i, 'items', v)} enableRich={true} onExpandRequest={handleOpenExpand}/>
          </div>
        </>
      )}
    />
  );
  
  const renderProjectsForm = () => (
    <DraggableSection 
      sectionId="projects" 
      title={t.sections?.projects || "Projetos"} 
      items={data.projects} 
      onAdd={() => addItem('projects', {title:'', tech:'', description:['']})} 
      onRemove={(idx) => removeItem('projects', idx)} 
      renderHeader={renderSectionHeader}
      isVisible={data.structure.projects.visible}
      onToggle={() => updateStructure('projects', 'visible', !data.structure.projects.visible)}
      t={t}
      renderItem={(p, i) => (
        <>
            <div className="grid gap-2 mb-2">
                <Input label={t.title} value={p.title} onChange={v=>updateItem('projects', i, 'title', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.link} value={p.link || ''} onChange={v=>updateItem('projects', i, 'link', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.tech} value={p.tech} onChange={v=>updateItem('projects', i, 'tech', v)} onExpandRequest={handleOpenExpand}/>
            </div>
            <DraggableDescriptionList items={p.description} sectionId="projects" itemIndex={i} onUpdate={updateArrayItem} onRemove={removeArrayItemFromItem} onAdd={addArrayItemToItem} onExpandRequest={handleOpenExpand} t={t} />
        </>
      )}
    />
  );

  const renderExperienceForm = () => (
    <DraggableSection 
      sectionId="experience" 
      title={t.sections?.experience || "Experiência"} 
      items={data.experience} 
      onAdd={() => addItem('experience', {company:'', role:'', period:'', location:'', description:['']})} 
      onRemove={(idx) => removeItem('experience', idx)} 
      renderHeader={renderSectionHeader}
      isVisible={data.structure.experience.visible}
      onToggle={() => updateStructure('experience', 'visible', !data.structure.experience.visible)}
      t={t}
      renderItem={(ex, i) => (
        <>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <Input label={t.company} value={ex.company} onChange={v=>updateItem('experience', i, 'company', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.role} value={ex.role} onChange={v=>updateItem('experience', i, 'role', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.period} value={ex.period} onChange={v=>updateItem('experience', i, 'period', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.location} value={ex.location} onChange={v=>updateItem('experience', i, 'location', v)} onExpandRequest={handleOpenExpand}/>
            </div>
            <DraggableDescriptionList items={ex.description} sectionId="experience" itemIndex={i} onUpdate={updateArrayItem} onRemove={removeArrayItemFromItem} onAdd={addArrayItemToItem} onExpandRequest={handleOpenExpand} t={t} />
        </>
      )}
    />
  );

  const renderEducationForm = () => (
    <DraggableSection 
      sectionId="education" 
      title={t.sections?.education || "Formação"} 
      items={data.education} 
      onAdd={() => addItem('education', {institution:'', degree:'', period:'', location:'', details:''})} 
      onRemove={(idx) => removeItem('education', idx)} 
      renderHeader={renderSectionHeader}
      isVisible={data.structure.education.visible}
      onToggle={() => updateStructure('education', 'visible', !data.structure.education.visible)}
      t={t}
      renderItem={(ed, i) => (
        <>
            <Input label={t.institution} value={ed.institution} onChange={v=>updateItem('education', i, 'institution', v)} onExpandRequest={handleOpenExpand}/>
            <Input label={t.degree} value={ed.degree} onChange={v=>updateItem('education', i, 'degree', v)} onExpandRequest={handleOpenExpand}/>
            <div className="grid grid-cols-2 gap-2">
                <Input label={t.period} value={ed.period} onChange={v=>updateItem('education', i, 'period', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.location} value={ed.location} onChange={v=>updateItem('education', i, 'location', v)} onExpandRequest={handleOpenExpand}/>
            </div>
            <Input label={t.details} value={ed.details} onChange={v=>updateItem('education', i, 'details', v)} enableRich={true} onExpandRequest={handleOpenExpand}/>
        </>
      )}
    />
  );
  
  const renderOthersForm = () => (
    <DraggableSection 
      sectionId="others" 
      title={t.sections?.others || "Outros"}
      items={data.others} 
      onAdd={() => addItem('others', {title: 'Nova Categoria', description: ['']})}
      onRemove={(idx) => removeItem('others', idx)}
      renderHeader={renderSectionHeader}
      isVisible={data.structure.others.visible}
      onToggle={() => updateStructure('others', 'visible', !data.structure.others.visible)}
      t={t}
      renderItem={(item, i) => (
        <>
          <div className="mb-2">
            <Input label={t.catTitle} value={item.title} onChange={v=>updateItem('others', i, 'title', v)} onExpandRequest={handleOpenExpand}/>
          </div>
          <DraggableDescriptionList 
            items={item.description}
            sectionId="others"
            itemIndex={i}
            onUpdate={updateArrayItem}
            onRemove={removeArrayItemFromItem}
            onAdd={addArrayItemToItem}
            onExpandRequest={handleOpenExpand}
            t={t}
          />
        </>
      )}
    />
  );

  const renderReferencesForm = () => (
    <DraggableSection 
      sectionId="references" 
      title={t.sections?.references || "Referências"} 
      items={data.references} 
      onAdd={() => addItem('references', { name: '', company: '', role: '', email: '', phone: '' })} 
      onRemove={(idx) => removeItem('references', idx)} 
      renderHeader={renderSectionHeader}
      isVisible={data.structure.references.visible}
      onToggle={() => updateStructure('references', 'visible', !data.structure.references.visible)}
      t={t}
      renderItem={(item, i) => (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <Input label={t.refName} value={item.name} onChange={v=>updateItem('references', i, 'name', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.refCompany} value={item.company} onChange={v=>updateItem('references', i, 'company', v)} onExpandRequest={handleOpenExpand}/>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <Input label={t.refRole} value={item.role} onChange={v=>updateItem('references', i, 'role', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.refEmail} value={item.email} onChange={v=>updateItem('references', i, 'email', v)} onExpandRequest={handleOpenExpand}/>
                <Input label={t.refPhone} value={item.phone} onChange={v=>updateItem('references', i, 'phone', v)} onExpandRequest={handleOpenExpand}/>
            </div>
        </div>
      )}
    />
  );

  const renderKeywordsForm = () => {
    const isKeywordsVisible = data.structure.keywords.visible;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-bold flex items-center text-gray-800">
                    <EyeOff size={20} className="mr-2"/> {t.atsTitle}
                </h2>
                <div className="flex items-center gap-3">
                     <span className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors ${isKeywordsVisible ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                        {isKeywordsVisible ? t.atsStatusOn : t.atsStatusOff}
                     </span>
                     <ToggleSwitch 
                        checked={isKeywordsVisible} 
                        onChange={() => updateStructure('keywords', 'visible', !isKeywordsVisible)} 
                        title={isKeywordsVisible ? t.deactivate : t.activate}
                     />
                </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
                <div className="flex items-center">
                    <AlertTriangle className="text-red-500 mr-2 flex-shrink-0" size={24} />
                    <p className="text-red-700 font-bold text-sm uppercase">{t.atsWarningTitle}</p>
                </div>
                <div className="mt-2 text-xs text-red-600 space-y-1">
                    <p>{t.atsWarningText}</p>
                    <ul className="list-disc pl-4 space-y-1 my-2">
                        {(t.atsRisks || []).map((risk, index) => (
                            <li key={index}>{risk}</li>
                        ))}
                    </ul>
                    <p className="font-bold">{t.atsRecommendation}</p>
                </div>
            </div>

            <div className={`space-y-2 relative group transition-opacity duration-300 ${isKeywordsVisible ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">{t.atsLabel}</label>
                <textarea 
                    className={`w-full h-64 p-3 border rounded text-sm outline-none font-mono text-gray-600 resize-y focus:ring-2 ${isKeywordsVisible ? 'focus:ring-green-500 border-green-300' : 'focus:ring-gray-400 border-gray-300'}`}
                    value={data.keywords || ''} 
                    onChange={e => updateSimpleField('keywords', e.target.value)} 
                    placeholder="Ex: Python Java AWS Leadership Sales..."
                    disabled={!isKeywordsVisible} 
                />
                
                <button 
                    onClick={() => handleOpenExpand(t.atsTitle, data.keywords, (val) => updateSimpleField('keywords', val))}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center text-xs font-bold transition-colors border border-gray-300 shadow-sm active:scale-[0.98]"
                    disabled={!isKeywordsVisible}
                >
                    <Maximize size={14} className="mr-2"/> {t.expandEditor}
                </button>

                <p className="text-[10px] text-gray-400 text-center">{t.atsFooter}</p>
            </div>
        </div>
    );
  };

  const renderActiveSection = () => {
    if (activeTab.startsWith('custom-')) { return renderCustomTabForm(activeTab); }
    switch(activeTab) {
      case 'settings': return renderSettingsForm();
      case 'sections': return renderSectionManagementForm();
      case 'personal': return renderPersonalForm();
      case 'objective': return renderObjectiveForm(); 
      case 'summary': return renderSummaryForm();
      case 'skills': return renderSkillsForm();
      case 'projects': return renderProjectsForm();
      case 'experience': return renderExperienceForm();
      case 'education': return renderEducationForm();
      case 'others': return renderOthersForm();
      case 'references': return renderReferencesForm();
      case 'keywords': return renderKeywordsForm();
      default: return renderSettingsForm();
    }
  };

  const tabs = [
    { id: 'settings', label: t.layoutTab, icon: Settings },
    { id: 'sections', label: t.sectionsTab, icon: Layers },
    { id: 'personal', label: t.personalTab, icon: User },
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ExpandedModal 
        isOpen={!!expandedField} 
        onClose={() => setExpandedField(null)} 
        title={expandedField?.title} 
        value={expandedField?.value || ''} 
        onSave={expandedField?.onSave} 
      />

      {/* ALTERAÇÃO 1: Mudança de min-h-screen para h-screen (fixo) para resolver problema do fundo preto cortado */}
      <div className="h-screen w-screen bg-gray-100 font-sans text-gray-900 flex flex-col md:flex-row overflow-hidden select-none" onMouseMove={isResizing ? resize : null} onMouseUp={stopResizing}>
        <link href={FONTS[settings.font].url} rel="stylesheet" />
        
        {/* ALTERAÇÃO 1 (Continuação): Remover 'sticky' e garantir h-full/h-screen dentro do contexto flex */}
        <nav className={`bg-slate-900 text-slate-300 flex-shrink-0 h-full md:h-screen overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'w-full md:w-64' : 'w-0 md:w-0 overflow-hidden'}`}>
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <div>
                  <h1 className="text-white font-bold text-xl whitespace-nowrap">{t.appName}</h1>
                  <p className="text-xs text-slate-500 mt-1 whitespace-nowrap">{t.version}</p>
              </div>
              <div className="flex gap-2">
                  <button onClick={() => changeLanguage('pt')} className={`text-xl hover:scale-110 transition-transform ${language === 'pt' ? 'opacity-100 scale-110' : 'opacity-50'}`} title="Português">🇧🇷</button>
                  <button onClick={() => changeLanguage('en')} className={`text-xl hover:scale-110 transition-transform ${language === 'en' ? 'opacity-100 scale-110' : 'opacity-50'}`} title="English">🇺🇸</button>
              </div>
          </div>
          <div className="p-4 space-y-1">
            {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'} ${tab.id === 'settings' ? 'mb-4 ring-1 ring-slate-600' : ''}`}>
                    <tab.icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
            ))}

            <div className="pt-2 border-t border-slate-700 mt-2">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase mb-2 tracking-wider">SEÇÕES</p>
                {data.sectionOrder.map(sectionId => {
                    const isCustom = sectionId.startsWith('custom-');
                    const sectionConfig = isCustom 
                        ? data.customSections.find(s => s.id === sectionId) 
                        : data.structure[sectionId];
                    if (!sectionConfig) return null;
                    const IconComponent = isCustom ? PenTool : (SECTION_ICONS[sectionId] || FileText);

                    return (
                        <button 
                            key={sectionId} 
                            onClick={() => setActiveTab(sectionId)} 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === sectionId ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}
                        >
                            <IconComponent size={18} />
                            <span className="font-medium truncate">{sectionConfig.title}</span>
                            {activeTab === sectionId && <ChevronRight size={16} className="ml-auto" />}
                        </button>
                    );
                })}
            </div>
          </div>
          <div className="p-6 mt-auto border-t border-slate-700"><button onClick={handlePrint} className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"><Download size={20} className="mr-2" /> {t.downloadPdf}</button></div>
        </nav>

        <aside 
            className="flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto relative h-full flex flex-col"
            style={{ width: isSidebarOpen ? (window.innerWidth < 768 ? '100%' : `${sidebarWidth}px`) : '0px', transition: isResizing ? 'none' : 'width 0.3s' }}
        >
             <div className="p-8 pb-20 flex-1">
                {renderActiveSection()}
             </div>
        </aside>

        {isSidebarOpen && (
            <div 
                className="hidden md:flex w-4 bg-gray-200 hover:bg-blue-500 cursor-col-resize items-center justify-center transition-colors z-20 shadow-sm border-l border-r border-gray-300 flex-shrink-0 h-full"
                onMouseDown={startResizing}
            >
                <GripVertical size={16} className="text-gray-400"/>
            </div>
        )}

        {/* ALTERAÇÃO 2 (Continuação): Adicionado ref={previewScrollRef} para permitir controle externo */}
        <div className="flex-1 bg-gray-200 p-8 overflow-y-auto flex flex-col items-center justify-start relative h-full">
            <div className="absolute top-4 left-4 z-50 md:hidden"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-800 text-white rounded-md shadow hover:bg-slate-700 transition-colors">{isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}</button></div>

            <div className="mb-4 bg-white p-2 rounded shadow-md flex items-center gap-4 sticky top-0 z-10">
                <span className="text-xs font-bold text-gray-500 uppercase">{t.zoom}</span>
                <button onClick={() => setZoom(Math.max(0.3, zoom - 0.1))} className="p-1 hover:bg-gray-100 rounded"><ZoomOut size={16} /></button>
                <span className="text-sm font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-1 hover:bg-gray-100 rounded"><ZoomIn size={16} /></button>
                <input type="range" min="0.3" max="1.5" step="0.1" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            
            <div className="w-full flex justify-center items-start overflow-visible min-h-screen pb-32">
                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                    <ResumePreview data={data} settings={settings} />
                </div>
            </div>
        </div>
      </div>
    </DragDropContext>
  );
}
