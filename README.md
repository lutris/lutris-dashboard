<h1 align="center">vue-admin-box</h1>
<p align="center">
    <a href="https://github.com/vuejs/vue-next">
        <img src="https://img.shields.io/badge/vue3-3.0.5-brightgreen.svg" alt="vue">
    </a>
    <a href="https://github.com/element-plus/element-plus">
        <img src="https://img.shields.io/badge/elementPlus-1.0.2beta.42-brightgreen.svg" alt="element-plus">
    </a>
    <a href="https://github.com/vitejs/vite">
        <img src="https://img.shields.io/badge/vite-2.2.3-brightgreen.svg" alt="vite">
    </a>
    <a href="https://github.com/microsoft/TypeScript">
        <img src="https://img.shields.io/badge/typescript-4.1.3-brightgreen.svg" alt="typescript">
    </a>
    <a href="https://github.com/hsiangleev/element-plus-admin/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
    </a>
</p>

###

## Introduction

- [Changelog](./VERSION.md)
- After over three months of iteration, version 1.0 was officially released on August 10, 2021, along with four base templates for general use
- This is a personal open-source project with no restrictions on commercial use or personal research. Please give it a Star before using it
- Any illegal or inappropriate activities involving this project are unrelated to the source code

## Preview

- [demo](http://vue-admin-box.51weblove.com)

## Base Templates
Four base templates are available, all suitable for starting a project from scratch. They can be viewed directly in the vue-admin-box-template repository:
1. template-ts-i18n — Base template with TypeScript + internationalization [demo](http://vue-admin-box-template.51weblove.com/ts-i18n/)
2. template-ts — Base template with TypeScript only, no internationalization [demo](http://vue-admin-box-template.51weblove.com/ts)
3. template-js-i18n — Base template with JavaScript + internationalization [demo](http://vue-admin-box-template.51weblove.com/js-i18n)
4. template-js — Base template with JavaScript only, no internationalization [demo](http://vue-admin-box-template.51weblove.com/js)

## About

vue-admin-box is a free and open-source admin dashboard template. Built with the latest versions of Vue 3 + Vite + Element Plus, it aims to simplify the complex configuration typically required for general-purpose back-office systems.

#### Key Features

- Router configuration and state management suited for admin dashboards (state supports local storage by default), with well-encapsulated Axios and API management
- Easily extensible theme configuration with three classic admin dashboard styles built in
- Simple page caching — just set the `noCache` property, no need to configure component names, route names, or other settings required by many frameworks
- Three types of business tables for typical CRUD operations — see "Business Tables", "Category-Linked Tables", and "Tree-Linked Tables" under the Pages section
- Refresh without route navigation, supporting cached page refresh — a feature most frameworks do not support
- Easily extensible internationalization solution, with two non-i18n base templates and two i18n base templates (TypeScript / JavaScript versions)
- Handwritten custom directives
- Battle-tested shared table and dialog components used across multiple admin projects — see "Business Tables", "Category-Linked Tables", and "Tree-Linked Tables" under the Pages section

#### Tech Stack

- MVVM Framework: Vue v3
- Build Tool: Vite v2
- UI Framework: Element Plus
- Router: Vue Router v4
- State Management: Vuex v4
- HTTP Client: Axios
- Utilities: @vueuse/core



## Screenshots

<p align="center">
    <img src="http://blog.51weblove.com/wp-content/uploads/2021/08/QQ截图20210810174824.png">
    <img src="http://blog.51weblove.com/wp-content/uploads/2021/08/QQ截图20210810174848.png">
    <img src="http://blog.51weblove.com/wp-content/uploads/2021/08/QQ截图20210810174923.png">
    <img src="http://blog.51weblove.com/wp-content/uploads/2021/08/QQ截图20210810174940.png">
    <img src="http://blog.51weblove.com/wp-content/uploads/2021/08/QQ截图20210810175009.png">
</p>


## Usage

1. Clone the repository

   ```
   git clone https://github.com/cmdparkour/vue-admin-box.git
   ```



2. Install dependencies

   ```
   npm install
   ```



3. Run

   ```
   npm run dev or npm run start
   ```



4. Build

   ```
   npm run build
   ```

