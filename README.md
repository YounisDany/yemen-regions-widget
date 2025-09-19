# Yemen Regions Widget

مكتبة JavaScript شاملة لعرض المناطق اليمنية (محافظة → مديرية → عزلة → قرية) مع دعم اللغتين العربية والإنجليزية.

[![npm version](https://badge.fury.io/js/yemen-regions-widget.svg)](https://badge.fury.io/js/yemen-regions-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## المميزات

✅ **دعم كامل للمناطق اليمنية**: محافظات، مديريات، عزل، وقرى  
✅ **دعم اللغتين**: العربية والإنجليزية مع RTL للعربية  
✅ **قوائم مترابطة**: تحديث تلقائي للقوائم التابعة  
✅ **مرونة في الاستخدام**: اختيار المستويات المطلوبة  
✅ **دعم البحث**: بحث سريع داخل القوائم  
✅ **تخصيص كامل**: CSS classes وplaceholders قابلة للتخصيص  
✅ **سهولة التكامل**: دعم npm وCDN  
✅ **بيانات محدثة**: مبنية على [مشروع Yemen-info](https://github.com/YemenOpenSource/Yemen-info)

## التنصيب

### عبر npm

```bash
npm install yemen-regions-widget
```

### عبر CDN

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/yemen-regions-widget/dist/yemen-regions-widget.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/yemen-regions-widget/dist/yemen-regions-widget.min.js"></script>
```

## الاستخدام

### الاستخدام الأساسي

```html
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yemen Regions Widget</title>
</head>
<body>
    <div id="yemen-regions"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/yemen-regions-widget/dist/yemen-regions-widget.min.js"></script>
    <script>
        const widget = new YemenRegionsWidget({
            container: '#yemen-regions',
            language: 'ar'
        });
    </script>
</body>
</html>
```

### مع ES6 Modules

```javascript
import YemenRegionsWidget from 'yemen-regions-widget';

const widget = new YemenRegionsWidget({
    container: '#yemen-regions',
    language: 'ar',
    levels: ['governorate', 'district'],
    onChange: (values, level) => {
        console.log('تم تغيير:', level, values);
    },
    onComplete: (values) => {
        console.log('اكتمل الاختيار:', values);
    }
});
```

### مع Node.js

```javascript
const YemenRegionsWidget = require('yemen-regions-widget');

const widget = new YemenRegionsWidget({
    container: document.getElementById('yemen-regions'),
    language: 'en'
});
```

## خيارات التكوين

| الخيار | النوع | الافتراضي | الوصف |
|--------|------|----------|-------|
| `container` | string\|Element | **مطلوب** | العنصر الحاوي للمكتبة |
| `language` | string | `'ar'` | اللغة (`'ar'` أو `'en'`) |
| `levels` | Array | `['governorate', 'district', 'uzlah', 'village']` | المستويات المطلوبة |
| `placeholders` | Object | - | النصوص الافتراضية للقوائم |
| `cssClasses` | Object | - | CSS classes مخصصة |
| `searchEnabled` | boolean | `true` | تفعيل البحث |
| `onChange` | Function | `null` | دالة تستدعى عند التغيير |
| `onComplete` | Function | `null` | دالة تستدعى عند اكتمال الاختيار |

### تفاصيل الخيارات

#### `levels`
```javascript
// محافظة فقط
levels: ['governorate']

// محافظة ومديرية
levels: ['governorate', 'district']

// كامل المستويات
levels: ['governorate', 'district', 'uzlah', 'village']
```

#### `placeholders`
```javascript
placeholders: {
    governorate: 'اختر المحافظة',
    district: 'اختر المديرية',
    uzlah: 'اختر العزلة',
    village: 'اختر القرية'
}
```

#### `cssClasses`
```javascript
cssClasses: {
    container: 'my-container',
    select: 'my-select',
    disabled: 'my-disabled'
}
```

## الطرق المتاحة

### `getSelectedValues()`
الحصول على القيم المختارة حالياً.

```javascript
const values = widget.getSelectedValues();
console.log(values);
// { governorate: "1", district: "5", uzlah: "12", village: "45" }
```

### `getSelectedData()`
الحصول على البيانات الكاملة للعناصر المختارة.

```javascript
const data = widget.getSelectedData();
console.log(data.governorate.name_ar); // "أمانة العاصمة"
console.log(data.district.name_en); // "Al-Wahdah"
```

### `reset()`
إعادة تعيين جميع القوائم.

```javascript
widget.reset();
```

### `setLanguage(language)`
تغيير اللغة.

```javascript
widget.setLanguage('en'); // التبديل للإنجليزية
widget.setLanguage('ar'); // التبديل للعربية
```

### `setLevels(levels)`
تغيير المستويات المطلوبة.

```javascript
widget.setLevels(['governorate', 'district']); // محافظة ومديرية فقط
```

## أمثلة متقدمة

### مثال شامل مع جميع الخيارات

```javascript
const widget = new YemenRegionsWidget({
    container: '#yemen-regions',
    language: 'ar',
    levels: ['governorate', 'district', 'uzlah'],
    placeholders: {
        governorate: 'اختر المحافظة...',
        district: 'اختر المديرية...',
        uzlah: 'اختر العزلة...'
    },
    cssClasses: {
        container: 'custom-container',
        select: 'custom-select',
        disabled: 'custom-disabled'
    },
    searchEnabled: true,
    onChange: (values, changedLevel) => {
        console.log(`تم تغيير ${changedLevel}:`, values);
        
        // حفظ في localStorage
        localStorage.setItem('yemenRegions', JSON.stringify(values));
    },
    onComplete: (values) => {
        console.log('اكتمل الاختيار:', values);
        
        // إرسال البيانات للخادم
        fetch('/api/save-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
    }
});

// استرجاع القيم المحفوظة
const savedValues = localStorage.getItem('yemenRegions');
if (savedValues) {
    const values = JSON.parse(savedValues);
    // يمكن تطبيق القيم المحفوظة هنا
}
```

### مثال مع React

```jsx
import React, { useEffect, useRef, useState } from 'react';
import YemenRegionsWidget from 'yemen-regions-widget';

function YemenRegionsComponent() {
    const containerRef = useRef(null);
    const [selectedData, setSelectedData] = useState({});
    
    useEffect(() => {
        const widget = new YemenRegionsWidget({
            container: containerRef.current,
            language: 'ar',
            levels: ['governorate', 'district'],
            onChange: (values) => {
                setSelectedData(values);
            }
        });
        
        return () => {
            // تنظيف عند إلغاء التحميل
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);
    
    return (
        <div>
            <div ref={containerRef}></div>
            <div>
                <h3>القيم المختارة:</h3>
                <pre>{JSON.stringify(selectedData, null, 2)}</pre>
            </div>
        </div>
    );
}

export default YemenRegionsComponent;
```

### مثال مع Vue.js

```vue
<template>
    <div>
        <div ref="yemenRegions"></div>
        <div v-if="selectedData.governorate">
            <h3>المحافظة المختارة:</h3>
            <p>{{ selectedData.governorate }}</p>
        </div>
    </div>
</template>

<script>
import YemenRegionsWidget from 'yemen-regions-widget';

export default {
    name: 'YemenRegions',
    data() {
        return {
            widget: null,
            selectedData: {}
        };
    },
    mounted() {
        this.widget = new YemenRegionsWidget({
            container: this.$refs.yemenRegions,
            language: 'ar',
            onChange: (values) => {
                this.selectedData = values;
            }
        });
    },
    beforeDestroy() {
        if (this.widget) {
            this.$refs.yemenRegions.innerHTML = '';
        }
    }
};
</script>
```

## التخصيص والتنسيق

### CSS الافتراضي

المكتبة تأتي مع تنسيقات افتراضية جميلة، ولكن يمكنك تخصيصها:

```css
/* تخصيص الحاوي الرئيسي */
.yemen-regions-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
}

/* تخصيص القوائم المنسدلة */
.yemen-regions-select {
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    font-size: 16px;
    background: white;
    transition: all 0.3s ease;
}

.yemen-regions-select:focus {
    border-color: #007cba;
    box-shadow: 0 0 0 3px rgba(0, 124, 186, 0.1);
}

/* القوائم المعطلة */
.yemen-regions-select.yemen-regions-disabled {
    background: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
}

/* دعم الوضع المظلم */
@media (prefers-color-scheme: dark) {
    .yemen-regions-container {
        background: #2d3748;
    }
    
    .yemen-regions-select {
        background: #4a5568;
        border-color: #718096;
        color: white;
    }
}
```

## بنية البيانات

### مثال على البيانات المُرجعة

```javascript
// getSelectedValues()
{
    "governorate": "1",
    "district": "5",
    "uzlah": "12",
    "village": "45"
}

// getSelectedData()
{
    "governorate": {
        "id": 1,
        "name_en": "Amant Al-Asmah",
        "name_ar": "أمانة العاصمة",
        "name_ar_tashkeel": "أَمانَة العاصِمَةِ",
        "phone_numbering_plan": "01",
        "capital_name_ar": "",
        "capital_name_en": "",
        "name_ar_normalized": "امانه العاصمه",
        "name_en_normalized": "Amant Al Asmah"
    },
    "district": {
        "id": 1,
        "name_en": "Sana'a Al-qadimah",
        "name_ar": "صنعاء القديمة",
        "name_ar_tashkeel": "صَنعاء القَديمَةِ",
        "name_ar_normalized": "صنعاء القديمه",
        "name_en_normalized": "Sanaa Al qadimah"
    }
}
```

## المتطلبات

- **المتصفحات المدعومة**: جميع المتصفحات الحديثة (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **Node.js**: 14+ (للتطوير)
- **حجم الملف**: ~5.6 MB (يتضمن جميع بيانات اليمن)

## الأداء

- **تحميل سريع**: البيانات مضمنة في المكتبة
- **ذاكرة محسنة**: تحميل البيانات عند الحاجة فقط
- **استجابة فورية**: لا توجد طلبات شبكة إضافية

## المساهمة

نرحب بمساهماتكم! يرجى:

1. عمل Fork للمستودع
2. إنشاء branch جديد للميزة
3. إجراء التغييرات المطلوبة
4. إضافة اختبارات إن أمكن
5. إرسال Pull Request

## الترخيص

هذا المشروع مرخص تحت [رخصة MIT](LICENSE).






## الروابط

- **GitHub Repository**: [https://github.com/YounisDany/yemen-regions-widget](https://github.com/YounisDany/yemen-regions-widget)
- **npm Package**: [https://www.npmjs.com/package/yemen-regions-widget](https://www.npmjs.com/package/yemen-regions-widget)
- **jsDelivr CDN**: [https://cdn.jsdelivr.net/npm/yemen-regions-widget/](https://cdn.jsdelivr.net/npm/yemen-regions-widget/)
- **unpkg CDN**: [https://unpkg.com/yemen-regions-widget/](https://unpkg.com/yemen-regions-widget/)

## الدعم

إذا واجهت أي مشاكل أو لديك اقتراحات، يرجى:

- فتح [Issue جديد](https://github.com/YounisDany/yemen-regions-widget/issues)
- مراسلتنا عبر البريد الإلكتروني
- المساهمة في تطوير المشروع

---

**صُنع بـ ❤️ للمجتمع اليمني**
