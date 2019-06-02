
## Introduction

This is the moderator's dashboard for Lutris built with [vue-element-admin](http://panjiachen.github.io/vue-element-admin). It is based on [vue](https://github.com/vuejs/vue) and uses the UI Toolkit [element](https://github.com/ElemeFE/element).

## Getting started

```bash
# clone the project
git clone https://github.com/lutris/lutris-dashboard.git

# install dependencies
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527.

## Build

```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced

```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information