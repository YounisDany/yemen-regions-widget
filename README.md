# Yemen Regions Widget

مكتبة JavaScript شاملة لعرض المناطق اليمنية (محافظة → مديرية → عزلة → قرية) مع دعم اللغتين العربية والإنجليزية.

[![npm version](https://badge.fury.io/js/yemen-regions-widget.svg)](https://badge.fury.io/js/yemen-regions-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## المميزات

✅ **دعم كامل للمناطق اليمنية**: محافظات، مديريات، عزل، وقرى  
✅ **دعم اللغتين**: العربية والإنجليزية مع RTL للعربية  
✅ **قوائم مترابطة**: تحديث تلقائي للقوائم التابعة  
✅ **مرونة في الاستخدام**: اختيار المستويات المطلوبة مع تحقق صارم من صحة المدخلات  
✅ **دعم البحث**: بحث سريع داخل القوائم  
✅ **تخصيص كامل**: CSS classes وplaceholders قابلة للتخصيص  
✅ **سهولة التكامل**: دعم npm وCDN  
✅ **تحسينات في الأداء**: معالجة مشكلة حجم ملف البيانات الكبير (انظر قسم الأداء)  

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

### الاستخدام الأساسي (في المتصفح)

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
    
    <!-- تحميل المكتبة من CDN -->
    <script src="https://cdn.jsdelivr.net/npm/yemen-regions-widget/dist/yemen-regions-widget.min.js"></script>
    <script>
        // تهيئة الودجت بعد تحميل المكتبة
        const widget = new YemenRegionsWidget({
            container: '#yemen-regions',
            language: 'ar'
        });
    </script>
</body>
</html>
```

### مع ES6 Modules (في بيئات التطوير الحديثة)

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

### مع Node.js (للاستخدام في الخادم أو بيئات البناء)

```javascript
const YemenRegionsWidget = require('yemen-regions-widget');

// ملاحظة: المكتبة مصممة بشكل أساسي للعمل في المتصفح،
// ولكن يمكن استيرادها في Node.js إذا كانت هناك حاجة لمعالجة البيانات.
// لا يمكنها إنشاء عناصر DOM في بيئة Node.js.
const widget = new YemenRegionsWidget({
    // لا يمكن استخدام عنصر DOM هنا في Node.js
    // قد تحتاج إلى محاكاة DOM أو استخدامها لمعالجة البيانات فقط
    container: null, 
    language: 'en'
});
```

## خيارات التكوين

| الخيار | النوع | الافتراضي | الوصف |
|--------|------|----------|-------|
| `container` | string\|Element | **مطلوب** | العنصر الحاوي للمكتبة (معرف CSS أو عنصر DOM) |
| `language` | string | `ar` | اللغة (`ar` أو `en`) |
| `levels` | Array | `['governorate', 'district', 'uzlah', 'village']` | المستويات المطلوبة. يجب أن تبدأ بـ `governorate`. |
| `placeholders` | Object | - | النصوص الافتراضية للقوائم المنسدلة. |
| `cssClasses` | Object | - | CSS classes مخصصة للعناصر المختلفة. |
| `searchEnabled` | boolean | `true` | تفعيل ميزة البحث داخل القوائم المنسدلة. |
| `onChange` | Function | `null` | دالة callback تستدعى عند كل تغيير في الاختيار. تستقبل `(values, changedLevel)`. |
| `onComplete` | Function | `null` | دالة callback تستدعى عند اكتمال جميع المستويات المختارة. تستقبل `(values)`. |

### تفاصيل الخيارات

#### `levels`
تحدد المستويات الجغرافية التي ستعرضها الودجت. يجب أن تكون مصفوفة، وأول عنصر يجب أن يكون `governorate`.

```javascript
// محافظة فقط
levels: ['governorate']

// محافظة ومديرية
levels: ['governorate', 'district']

// كامل المستويات
levels: ['governorate', 'district', 'uzlah', 'village']
```

#### `placeholders`
تخصيص النصوص الافتراضية التي تظهر في القوائم المنسدلة قبل الاختيار.

```javascript
placeholders: {
    governorate: 'اختر المحافظة...',
    district: 'اختر المديرية...',
    uzlah: 'اختر العزلة...',
    village: 'اختر القرية...'
}
```

#### `cssClasses`
تخصيص أسماء الفئات (classes) لـ CSS لتطبيق تنسيقات مخصصة.

```javascript
cssClasses: {
    container: 'my-custom-container',
    select: 'my-custom-select-box',
    disabled: 'my-custom-disabled-state'
}
```

## الطرق المتاحة

### `getSelectedValues()`
تُرجع كائنًا يحتوي على معرفات (IDs) القيم المختارة حالياً لكل مستوى.

```javascript
const values = widget.getSelectedValues();
console.log(values);
// مثال: { governorate: "1", district: "5", uzlah: "12", village: "45" }
```

### `getSelectedData()`
تُرجع كائنًا يحتوي على البيانات الكاملة (بما في ذلك الأسماء المترجمة وغيرها) للعناصر المختارة لكل مستوى.

```javascript
const data = widget.getSelectedData();
console.log(data.governorate.name_ar); // مثال: "أمانة العاصمة"
console.log(data.district.name_en); // مثال: "Al-Wahdah"
```

### `reset()`
تعيد تعيين جميع القوائم المنسدلة إلى حالتها الأولية، وتمسح جميع الاختيارات.

```javascript
widget.reset();
```

### `setLanguage(language)`
تغير لغة عرض الودجت إلى اللغة المحددة (`'ar'` أو `'en'`) وتعيد تحميل القوائم بالنصوص الجديدة.

```javascript
widget.setLanguage('en'); // التبديل للإنجليزية
widget.setLanguage('ar'); // التبديل للعربية
```

### `setLevels(levels)`
تغير المستويات الجغرافية التي تعرضها الودجت. يجب أن تكون مصفوفة صالحة من المستويات.

```javascript
widget.setLevels(['governorate', 'district']); // عرض محافظة ومديرية فقط
```

## أمثلة متقدمة

### مثال شامل مع جميع الخيارات

```javascript
const widget = new YemenRegionsWidget({
    container: '#yemen-regions-full',
    language: 'ar',
    levels: ['governorate', 'district', 'uzlah'],
    placeholders: {
        governorate: 'اختر المحافظة من فضلك',
        district: 'اختر المديرية من فضلك',
        uzlah: 'اختر العزلة من فضلك'
    },
    cssClasses: {
        container: 'my-custom-flex-container',
        select: 'my-custom-dropdown',
        disabled: 'my-custom-disabled-dropdown'
    },
    searchEnabled: true,
    onChange: (values, changedLevel) => {
        console.log(`تم تغيير المستوى: ${changedLevel}`, values);
        // مثال: حفظ القيم في التخزين المحلي للمتصفح
        localStorage.setItem('yemenRegionsSelection', JSON.stringify(values));
    },
    onComplete: (values) => {
        console.log('اكتمل الاختيار النهائي:', values);
        // مثال: إرسال البيانات إلى خادم (API)
        // fetch('/api/save-location', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(values)
        // });
    }
});

// مثال: استرجاع القيم المحفوظة وتطبيقها (يتطلب منطقًا إضافيًا في المكتبة لتطبيق القيم)
const savedSelection = localStorage.getItem('yemenRegionsSelection');
if (savedSelection) {
    const values = JSON.parse(savedSelection);
    // حاليًا، لا توجد دالة مباشرة لـ `setValues`، ولكن يمكن تطويرها إذا لزم الأمر.
    // يمكن إعادة تهيئة الودجت بالقيم الافتراضية إذا كانت متوفرة.
}
```

### مثال مع React (محدث)

```jsx
import React, { useEffect, useRef, useState } from 'react';
import YemenRegionsWidget from 'yemen-regions-widget';

function YemenRegionsComponent() {
    const containerRef = useRef(null);
    const [selectedValues, setSelectedValues] = useState({});
    const widgetInstance = useRef(null);
    
    useEffect(() => {
        if (containerRef.current && !widgetInstance.current) {
            widgetInstance.current = new YemenRegionsWidget({
                container: containerRef.current,
                language: 'ar',
                levels: ['governorate', 'district', 'uzlah', 'village'],
                onChange: (values) => {
                    setSelectedValues(values);
                }
            });
        }
        
        return () => {
            // تنظيف عند إلغاء تحميل المكون
            if (widgetInstance.current) {
                // لا توجد دالة `destroy` حاليًا، ولكن يمكن مسح المحتوى يدوياً
                containerRef.current.innerHTML = '';
                widgetInstance.current = null;
            }
        };
    }, []);
    
    return (
        <div>
            <div ref={containerRef}></div>
            <div>
                <h3>القيم المختارة:</h3>
                <pre>{JSON.stringify(selectedValues, null, 2)}</pre>
            </div>
        </div>
    );
}

export default YemenRegionsComponent;
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
    },
    "uzlah": {
        "id": 1,
        "name_en": "Sana'a Al-qadimah",
        "name_ar": "صنعاء القديمة",
        "name_ar_tashkeel": "صَنعاء القَديمَةِ",
        "name_ar_normalized": "صنعاء القديمه",
        "name_en_normalized": "Sanaa Al qadimah"
    }
    // ... وقد تحتوي على village إذا تم اختيارها
}
```

## المتطلبات

- **المتصفحات المدعومة**: جميع المتصفحات الحديثة (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **Node.js**: 14+ (للتطوير)

## الأداء وحجم البيانات

ملف `yemen-info.json` كبير جدًا (حوالي 5.6 ميجابايت). يتم تحميل هذا الملف بالكامل في كل مرة يتم فيها تهيئة المكتبة. قد يؤثر هذا على أداء التطبيق، خاصة على الأجهزة ذات الموارد المحدودة أو الاتصالات البطيئة.

**لتحسين الأداء، يمكن النظر في الحلول التالية:**

1.  **التحميل الكسول (Lazy Loading):** تعديل بنية البيانات والمكتبة لتحميل بيانات المستويات الدنيا (مثل العزلات والقرى) فقط عند الحاجة إليها (عند اختيار المديرية أو العزلة). هذا يتطلب إعادة هيكلة لملف البيانات أو تقسيمها إلى ملفات أصغر. 
2.  **تقسيم البيانات:** تقسيم ملف JSON الكبير إلى ملفات أصغر لكل محافظة أو مديرية وتحميلها ديناميكيًا عند الطلب. 
3.  **استخدام IndexedDB:** تخزين البيانات محليًا في المتصفح باستخدام IndexedDB بعد التحميل الأول لتقليل طلبات الشبكة في الزيارات اللاحقة. 
4.  **خادم خلفي (Backend Service):** إذا كان التطبيق يتطلب أداءً عاليًا جدًا، يمكن نقل البيانات إلى خدمة خلفية (API) تقوم بتقديم البيانات المطلوبة عند الطلب، مما يقلل من حجم الحزمة الأمامية بشكل كبير.

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

