# دليل النشر - Yemen Regions Widget

هذا الدليل يوضح خطوات نشر مكتبة Yemen Regions Widget على GitHub و npm بالتفصيل.

## المتطلبات الأساسية

### 1. إعداد Git و GitHub

```bash
# تهيئة Git (إذا لم يكن مُعدّاً)
git config --global user.name "اسمك"
git config --global user.email "بريدك@الإلكتروني.com"

# تسجيل الدخول إلى GitHub CLI (اختياري)
gh auth login
```

### 2. إعداد npm

```bash
# تسجيل الدخول إلى npm
npm login

# التحقق من تسجيل الدخول
npm whoami
```

## خطوات النشر على GitHub

### 1. إنشاء مستودع جديد على GitHub

1. اذهب إلى [GitHub](https://github.com)
2. انقر على "New repository"
3. اسم المستودع: `yemen-regions-widget`
4. الوصف: `مكتبة JavaScript لعرض المناطق اليمنية مع دعم اللغتين العربية والإنجليزية`
5. اجعل المستودع عاماً (Public)
6. لا تضف README أو .gitignore أو LICENSE (موجودة بالفعل)

### 2. ربط المشروع المحلي بـ GitHub

```bash
# الانتقال إلى مجلد المشروع
cd yemen-regions-widget

# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# أول commit
git commit -m "Initial commit: Yemen Regions Widget v1.0.0"

# ربط المستودع البعيد (استبدل username باسم المستخدم الخاص بك)
git remote add origin https://github.com/username/yemen-regions-widget.git

# رفع الكود
git branch -M main
git push -u origin main
```

### 3. إنشاء Release على GitHub

```bash
# إنشاء tag للإصدار
git tag -a v1.0.0 -m "Release version 1.0.0"

# رفع التاغ
git push origin v1.0.0
```

أو عبر واجهة GitHub:
1. اذهب إلى صفحة المستودع
2. انقر على "Releases"
3. انقر على "Create a new release"
4. Tag version: `v1.0.0`
5. Release title: `Yemen Regions Widget v1.0.0`
6. الوصف:
```markdown
## المميزات الجديدة
- دعم كامل للمناطق اليمنية (محافظة → مديرية → عزلة → قرية)
- دعم اللغتين العربية والإنجليزية
- قوائم مترابطة مع تحديث تلقائي
- دعم البحث داخل القوائم
- تخصيص كامل للتنسيقات والخيارات
- دعم npm و CDN

## التنصيب
```bash
npm install yemen-regions-widget
```

## الاستخدام السريع
```html
<script src="https://cdn.jsdelivr.net/npm/yemen-regions-widget/dist/yemen-regions-widget.min.js"></script>
<script>
const widget = new YemenRegionsWidget({
    container: '#my-container',
    language: 'ar'
});
</script>
```
```

## خطوات النشر على npm

### 1. التحقق من package.json

تأكد من أن ملف `package.json` يحتوي على المعلومات الصحيحة:

```json
{
  "name": "yemen-regions-widget",
  "version": "1.0.0",
  "description": "مكتبة JavaScript لعرض المناطق اليمنية (محافظة → مديرية → عزلة → قرية) مع دعم اللغتين العربية والإنجليزية",
  "main": "dist/yemen-regions-widget.min.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/username/yemen-regions-widget.git"
  },
  "keywords": [
    "yemen",
    "regions",
    "governorates",
    "districts",
    "javascript",
    "widget",
    "dropdown",
    "select",
    "arabic",
    "english"
  ],
  "author": "اسمك",
  "license": "MIT"
}
```

### 2. بناء المشروع

```bash
# تثبيت dependencies
npm install

# بناء المشروع
npm run build

# التحقق من الملفات المبنية
ls -la dist/
```

### 3. اختبار النشر محلياً

```bash
# إنشاء package محلي للاختبار
npm pack

# سيتم إنشاء ملف yemen-regions-widget-1.0.0.tgz
# يمكن اختباره في مشروع آخر:
# npm install ./yemen-regions-widget-1.0.0.tgz
```

### 4. نشر المكتبة على npm

```bash
# نشر المكتبة (تأكد من تسجيل الدخول أولاً)
npm publish

# إذا كان هذا أول نشر للمكتبة، استخدم:
npm publish --access public
```

### 5. التحقق من النشر

```bash
# البحث عن المكتبة
npm search yemen-regions-widget

# عرض معلومات المكتبة
npm info yemen-regions-widget

# تجربة التنصيب
npm install yemen-regions-widget
```

## تحديث الإصدارات

### 1. تحديث رقم الإصدار

```bash
# تحديث patch (1.0.0 → 1.0.1)
npm version patch

# تحديث minor (1.0.0 → 1.1.0)
npm version minor

# تحديث major (1.0.0 → 2.0.0)
npm version major
```

### 2. رفع التحديثات

```bash
# رفع التغييرات والتاغ الجديد
git push origin main --tags

# نشر الإصدار الجديد على npm
npm publish
```

## إعداد GitHub Actions (اختياري)

إنشاء ملف `.github/workflows/publish.yml` للنشر التلقائي:

```yaml
name: Publish to npm

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## التحقق من CDN Links

بعد النشر، تحقق من أن الروابط التالية تعمل:

### jsDelivr
```
https://cdn.jsdelivr.net/npm/yemen-regions-widget/dist/yemen-regions-widget.min.js
https://cdn.jsdelivr.net/npm/yemen-regions-widget@1.0.0/dist/yemen-regions-widget.min.js
```

### unpkg
```
https://unpkg.com/yemen-regions-widget/dist/yemen-regions-widget.min.js
https://unpkg.com/yemen-regions-widget@1.0.0/dist/yemen-regions-widget.min.js
```

## نصائح مهمة

### 1. قبل النشر
- ✅ تأكد من أن جميع الاختبارات تعمل
- ✅ تحقق من أن الملفات المبنية موجودة في `dist/`
- ✅ راجع `package.json` للتأكد من صحة المعلومات
- ✅ تأكد من وجود `README.md` شامل
- ✅ تحقق من ترخيص MIT في `LICENSE`

### 2. بعد النشر
- ✅ تحقق من صفحة npm: `https://www.npmjs.com/package/yemen-regions-widget`
- ✅ اختبر التنصيب: `npm install yemen-regions-widget`
- ✅ تحقق من CDN links
- ✅ اختبر الصفحة التجريبية

### 3. الصيانة
- 🔄 راقب Issues على GitHub
- 🔄 رد على أسئلة المستخدمين
- 🔄 حدّث البيانات عند الحاجة
- 🔄 أضف ميزات جديدة بناءً على طلبات المستخدمين

## استكشاف الأخطاء

### مشاكل npm شائعة

```bash
# إذا فشل النشر بسبب اسم المكتبة
npm publish --access public

# إذا كان الاسم محجوزاً، غيّر الاسم في package.json
# مثال: "name": "@username/yemen-regions-widget"

# مسح cache npm
npm cache clean --force

# إعادة تسجيل الدخول
npm logout
npm login
```

### مشاكل Git شائعة

```bash
# إذا فشل push بسبب conflicts
git pull origin main --rebase
git push origin main

# إذا نسيت إضافة remote
git remote add origin https://github.com/username/yemen-regions-widget.git

# التحقق من remotes
git remote -v
```

## الخلاصة

بعد اتباع هذه الخطوات، ستكون مكتبة Yemen Regions Widget متاحة على:

- **GitHub**: `https://github.com/username/yemen-regions-widget`
- **npm**: `https://www.npmjs.com/package/yemen-regions-widget`
- **jsDelivr CDN**: `https://cdn.jsdelivr.net/npm/yemen-regions-widget/`
- **unpkg CDN**: `https://unpkg.com/yemen-regions-widget/`

المكتبة ستكون جاهزة للاستخدام من قبل المطورين حول العالم! 🎉
