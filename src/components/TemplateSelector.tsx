import React from 'react';
import { Template, TEMPLATES_DATA } from '../data/templates';
import { CategoryFilter } from '../types/dukaan';
import { Language } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  language: Language;
  activeCategory: CategoryFilter;
  onCategoryChange: (cat: CategoryFilter) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
  language,
  activeCategory,
  onCategoryChange,
}) => {
  const categories: { id: CategoryFilter; labelHinglish: string; labelHindi: string; labelEnglish: string; icon: string }[] = [
    { id: 'all', labelHinglish: 'Sabhi (All)', labelHindi: 'सभी (All)', labelEnglish: 'All', icon: '✨' },
    { id: 'morning', labelHinglish: 'Shubh Prabhat', labelHindi: 'शुभ प्रभात', labelEnglish: 'Morning Suvichar', icon: '🌅' },
    { id: 'festival', labelHinglish: 'Tyohar (Festivals)', labelHindi: 'पावन त्योहार', labelEnglish: 'Festivals', icon: '🪔' },
    { id: 'offers', labelHinglish: 'Dukaan Sale', labelHindi: 'दुकान सेल व ऑफर', labelEnglish: 'Sale & Offers', icon: '🏷️' },
    { id: 'udhar', labelHinglish: 'Udhar & Bill', labelHindi: 'उधारी व बिल रसीद', labelEnglish: 'Udhar / Bill Notice', icon: '🧾' },
    { id: 'card', labelHinglish: 'Visiting Card', labelHindi: 'विजिटिंग कार्ड', labelEnglish: 'Business Card', icon: '🪪' },
    { id: 'night', labelHinglish: 'Shubh Ratri', labelHindi: 'शुभ रात्रि', labelEnglish: 'Good Night', icon: '🌙' },
  ];

  const filteredTemplates = activeCategory === 'all'
    ? TEMPLATES_DATA
    : TEMPLATES_DATA.filter((t) => t.category === activeCategory);

  const isEn = language === 'english';
  const isHi = language === 'hindi';

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const label = isEn ? cat.labelEnglish : isHi ? cat.labelHindi : cat.labelHinglish;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredTemplates.map((template) => {
          const isSelected = template.id === selectedTemplate.id;
          const headerTag = isEn ? template.headerTagEnglish : template.headerTagHindi;
          const title = isEn ? template.titleEnglish : template.titleHindi;
          const mainQuote = isEn ? template.mainQuoteEnglish : template.mainQuoteHindi;

          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`relative rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer border transition-all text-left group overflow-hidden ${
                isSelected
                  ? 'ring-2 ring-amber-400 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-900'
              }`}
              style={{
                background: `linear-gradient(135deg, ${template.bgColors[0]}22, ${template.bgColors[2]}44)`,
              }}
            >
              {/* Top Tag & Selection Indicator */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border truncate max-w-[120px]"
                  style={{
                    color: template.accentColor,
                    borderColor: `${template.accentColor}40`,
                    background: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {headerTag}
                </span>

                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    {template.ornamentSymbol.split(' ')[0]}
                  </span>
                )}
              </div>

              {/* Title & Preview Quote */}
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-white line-clamp-1 mb-1">
                  {title}
                </h5>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  "{mainQuote}"
                </p>
              </div>

              {/* Bottom decorative color bar */}
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span className="capitalize">{template.category}</span>
                <span className="text-amber-300 font-semibold group-hover:underline">
                  {isEn ? 'Select →' : isHi ? 'चुनें →' : 'Chunein →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
