/**
 * Yemen Regions Widget
 * مكتبة JavaScript لعرض المناطق اليمنية (محافظة → مديرية → عزلة → قرية)
 * مع دعم اللغتين العربية والإنجليزية
 * 
 * @version 1.0.0
 * @author Yemen Regions Widget
 * @license MIT
 */

// استيراد بيانات اليمن
import yemenData from './yemen-info.json';

class YemenRegionsWidget {
  constructor(options = {}) {
    this.options = {
      // الحاوي الرئيسي
      container: options.container || null,
      
      // اللغة (ar أو en)
      language: options.language || 'ar',
      
      // المستويات المطلوبة
      levels: options.levels || ['governorate', 'district', 'uzlah', 'village'],
      
      // النصوص الافتراضية
      placeholders: {
        governorate: options.placeholders?.governorate || (options.language === 'ar' ? 'اختر المحافظة' : 'Select Governorate'),
        district: options.placeholders?.district || (options.language === 'ar' ? 'اختر المديرية' : 'Select District'),
        uzlah: options.placeholders?.uzlah || (options.language === 'ar' ? 'اختر العزلة' : 'Select Uzlah'),
        village: options.placeholders?.village || (options.language === 'ar' ? 'اختر القرية' : 'Select Village')
      },
      
      // CSS classes مخصصة
      cssClasses: {
        container: options.cssClasses?.container || 'yemen-regions-container',
        select: options.cssClasses?.select || 'yemen-regions-select',
        disabled: options.cssClasses?.disabled || 'yemen-regions-disabled'
      },
      
      // دعم البحث
      searchEnabled: options.searchEnabled !== false,
      
      // callback functions
      onChange: options.onChange || null,
      onComplete: options.onComplete || null
    };

    this.data = yemenData;
    this.selectedValues = {};
    this.elements = {};
    
    this.init();
  }

  init() {
    if (!this.options.container) {
      throw new Error('Container element is required');
    }

    const container = typeof this.options.container === 'string' 
      ? document.querySelector(this.options.container)
      : this.options.container;

    if (!container) {
      throw new Error('Container element not found');
    }

    this.container = container;
    this.createElements();
    this.bindEvents();
    this.loadGovernorates();
  }

  createElements() {
    // إنشاء الحاوي الرئيسي
    this.container.className = this.options.cssClasses.container;
    
    // تطبيق RTL للعربية
    if (this.options.language === 'ar') {
      this.container.style.direction = 'rtl';
    }

    // إنشاء عناصر القوائم المنسدلة
    this.options.levels.forEach(level => {
      const wrapper = document.createElement('div');
      wrapper.className = `${this.options.cssClasses.container}-${level}`;
      
      const select = document.createElement('select');
      select.className = this.options.cssClasses.select;
      select.id = `yemen-${level}`;
      select.disabled = level !== 'governorate';
      
      if (select.disabled) {
        select.classList.add(this.options.cssClasses.disabled);
      }

      // إضافة البحث إذا كان مفعلاً
      if (this.options.searchEnabled) {
        select.setAttribute('data-search', 'true');
      }

      wrapper.appendChild(select);
      this.container.appendChild(wrapper);
      this.elements[level] = select;
    });
  }

  bindEvents() {
    // ربط الأحداث لكل قائمة منسدلة
    Object.keys(this.elements).forEach((level, index) => {
      this.elements[level].addEventListener('change', (e) => {
        this.handleSelectionChange(level, e.target.value, index);
      });
    });
  }

  handleSelectionChange(level, value, levelIndex) {
    this.selectedValues[level] = value;

    // مسح القوائم التالية
    const nextLevels = this.options.levels.slice(levelIndex + 1);
    nextLevels.forEach(nextLevel => {
      this.clearSelect(nextLevel);
      this.selectedValues[nextLevel] = null;
    });

    // تحميل البيانات للمستوى التالي
    const nextLevel = this.options.levels[levelIndex + 1];
    if (nextLevel && value) {
      this.loadNextLevel(level, value, nextLevel);
    }

    // استدعاء callback
    if (this.options.onChange) {
      this.options.onChange(this.selectedValues, level);
    }

    // التحقق من اكتمال الاختيار
    this.checkCompletion();
  }

  loadGovernorates() {
    const governorateSelect = this.elements.governorate;
    if (!governorateSelect) return;

    this.clearSelect('governorate');
    this.addDefaultOption(governorateSelect, this.options.placeholders.governorate);

    this.data.governorates.forEach(gov => {
      const option = document.createElement('option');
      option.value = gov.id;
      option.textContent = this.getLocalizedName(gov);
      governorateSelect.appendChild(option);
    });
  }

  loadNextLevel(currentLevel, currentValue, nextLevel) {
    const nextSelect = this.elements[nextLevel];
    if (!nextSelect) return;

    this.clearSelect(nextLevel);
    this.addDefaultOption(nextSelect, this.options.placeholders[nextLevel]);

    let data = [];

    switch (nextLevel) {
      case 'district':
        const governorate = this.data.governorates.find(g => g.id == currentValue);
        data = governorate ? governorate.districts : [];
        break;
      
      case 'uzlah':
        const gov = this.data.governorates.find(g => g.id == this.selectedValues.governorate);
        const district = gov ? gov.districts.find(d => d.id == currentValue) : null;
        data = district ? district.uzlahs : [];
        break;
      
      case 'village':
        const g = this.data.governorates.find(g => g.id == this.selectedValues.governorate);
        const d = g ? g.districts.find(d => d.id == this.selectedValues.district) : null;
        const uzlah = d ? d.uzlahs.find(u => u.id == currentValue) : null;
        data = uzlah ? uzlah.villages : [];
        break;
    }

    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = this.getLocalizedName(item);
      nextSelect.appendChild(option);
    });

    // تفعيل القائمة
    nextSelect.disabled = false;
    nextSelect.classList.remove(this.options.cssClasses.disabled);
  }

  clearSelect(level) {
    const select = this.elements[level];
    if (!select) return;

    select.innerHTML = '';
    select.disabled = true;
    select.classList.add(this.options.cssClasses.disabled);
  }

  addDefaultOption(select, text) {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = text;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
  }

  getLocalizedName(item) {
    if (this.options.language === 'ar') {
      return item.name_ar_tashkeel || item.name_ar || item.name_en;
    } else {
      return item.name_en || item.name_ar;
    }
  }

  checkCompletion() {
    const lastLevel = this.options.levels[this.options.levels.length - 1];
    const isComplete = this.selectedValues[lastLevel] && this.selectedValues[lastLevel] !== '';

    if (isComplete && this.options.onComplete) {
      this.options.onComplete(this.selectedValues);
    }
  }

  // الحصول على القيم المختارة
  getSelectedValues() {
    return { ...this.selectedValues };
  }

  // إعادة تعيين القوائم
  reset() {
    this.selectedValues = {};
    this.options.levels.forEach((level, index) => {
      if (index === 0) {
        this.loadGovernorates();
      } else {
        this.clearSelect(level);
      }
    });
  }

  // تحديث اللغة
  setLanguage(language) {
    this.options.language = language;
    
    // تطبيق/إزالة RTL
    if (language === 'ar') {
      this.container.style.direction = 'rtl';
    } else {
      this.container.style.direction = 'ltr';
    }

    // إعادة تحميل البيانات
    this.reset();
  }

  // تحديث المستويات
  setLevels(levels) {
    this.options.levels = levels;
    this.container.innerHTML = '';
    this.elements = {};
    this.selectedValues = {};
    this.createElements();
    this.bindEvents();
    this.loadGovernorates();
  }

  // الحصول على البيانات الكاملة للعنصر المختار
  getSelectedData() {
    const result = {};
    
    if (this.selectedValues.governorate) {
      const gov = this.data.governorates.find(g => g.id == this.selectedValues.governorate);
      result.governorate = gov;
      
      if (this.selectedValues.district && gov) {
        const district = gov.districts.find(d => d.id == this.selectedValues.district);
        result.district = district;
        
        if (this.selectedValues.uzlah && district) {
          const uzlah = district.uzlahs.find(u => u.id == this.selectedValues.uzlah);
          result.uzlah = uzlah;
          
          if (this.selectedValues.village && uzlah) {
            const village = uzlah.villages.find(v => v.id == this.selectedValues.village);
            result.village = village;
          }
        }
      }
    }
    
    return result;
  }
}

// CSS افتراضي
const defaultCSS = `
.yemen-regions-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: Arial, sans-serif;
}

.yemen-regions-container[style*="rtl"] {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.yemen-regions-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.yemen-regions-select:focus {
  outline: none;
  border-color: #007cba;
  box-shadow: 0 0 0 2px rgba(0, 124, 186, 0.2);
}

.yemen-regions-select.yemen-regions-disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.yemen-regions-container-governorate,
.yemen-regions-container-district,
.yemen-regions-container-uzlah,
.yemen-regions-container-village {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .yemen-regions-container {
    flex-direction: row;
    align-items: center;
  }
  
  .yemen-regions-container-governorate,
  .yemen-regions-container-district,
  .yemen-regions-container-uzlah,
  .yemen-regions-container-village {
    flex: 1;
  }
}
`;

// إضافة CSS إلى الصفحة
function injectCSS() {
  if (!document.getElementById('yemen-regions-widget-css')) {
    const style = document.createElement('style');
    style.id = 'yemen-regions-widget-css';
    style.textContent = defaultCSS;
    document.head.appendChild(style);
  }
}

// تصدير المكتبة
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YemenRegionsWidget;
} else if (typeof window !== 'undefined') {
  // إضافة CSS عند التحميل
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCSS);
  } else {
    injectCSS();
  }
  
  window.YemenRegionsWidget = YemenRegionsWidget;
}

export default YemenRegionsWidget;
