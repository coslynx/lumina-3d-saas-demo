<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
lumina-3d-saas-demo
</h1>
<h4 align="center"> Showcase SaaS with immersive 3D, smooth animations, and parallax effects.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Frontend-TypeScript%20%7C%20HTML%20%7C%20CSS-blue" alt="TypeScript, HTML, CSS">
  <img src="https://img.shields.io/badge/3D-Three.js-3377FF" alt="Three.js">
  <img src="https://img.shields.io/badge/Animation-GSAP-8BC34A" alt="GSAP">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/lumina-3d-saas-demo?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/lumina-3d-saas-demo?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/lumina-3d-saas-demo?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) that is a 3D SaaS landing page featuring interactive 3D models, smooth animations, and parallax scrolling effects. The landing page showcases a SaaS product and is built using React, Three.js, and TypeScript. 

## 📦 Features
|    | Feature             | Description                                                                                                        |
|----|---------------------|--------------------------------------------------------------------------------------------------------------------|
| 🧊 | **3D Core**         | Manages Three.js scenes, rendering, and camera configurations. Implements core 3D rendering functionalities.         |
| 📦 | **Model Loading**   | Facilitates loading and managing 3D models efficiently using utilities like DRACO compression and LOD.           |
| ✨ | **Animations**      | Provides smooth animations and transitions using GSAP. Includes scroll-based and interactive animations.          |
| 💡 | **Lighting**        | Implements lighting systems to enhance visual appeal and realism in the 3D environment.                           |
| 🧱 | **Materials**       | Creates and manages materials for 3D objects, supporting PBR and custom shader effects.                            |
| 🖼️ | **UI Components**   | Includes reusable UI components such as Header, Footer, and layout structures.  Provides a structured UI layout.            |
| 📷 | **Camera**          | Configures and controls camera movements and perspectives within the 3D scene. Provides utility and control |
| 👆 | **Interaction**      | Manages user interactions with 3D objects using raycasting and event handling. |
| ⚡️ | **Performance**     | Optimize for frame rate and memory usage to use Three.js with stability by providing features to optomize it, for a higher score.                                                        |
| 📝 | **Base Template**   | Central for setting up structure for themes and components.               |
   
## 📂 Structure
```
lumina-3d-saas-demo/
├── public/                 
│   └── models/             
├── src/
│   ├── components/          
│   │   ├── 3d/             
│   │   │   ├── AdvancedScene.tsx
│   │   │   ├── ModelLoader.tsx  
│   │   │   ├── ScrollScene.tsx  
│   │   │   ├── ThreeScene.tsx   
│   │   ├── layout/          
│   │   │   ├── Footer.tsx      
│   │   │   ├── Header.tsx      
│   │   │   ├── MinimalLayout.tsx
│   │   ├── sections/        
│   │   │   ├── LandingHero.tsx
│   │   ├── App.tsx            
│   ├── hooks/              
│   │   ├── use3DAnimation.tsx 
│   │   ├── use3DInteraction.tsx
│   │   ├── useScrollAnimation.tsx
│   │   ├── useToggle.tsx
│   ├── pages/              
│   │   ├── AboutPage.tsx     
│   │   ├── ContactPage.tsx   
│   │   ├── ExperiencePage.tsx
│   │   ├── ModelShowcasePage.tsx
│   ├── styles/             
│   │   ├── base.css        
│   │   ├── components/       
│   │   ├── layout/           
│   │   ├── pages/             
│   ├── utils/              
│   │   ├── format.ts       
│   │   ├── modelManager.ts   
│   │   ├── sampleModelHelper.ts
│   ├── vite-env.d.ts       
│   ├── vite.config.ts      
│   ├── tsconfig.json       
│   ├── tailwind.config.js   
│   ├── index.html            
│   ├── main.tsx          
├── README.md               
├── package.json            
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18 or higher
> - npm v8 or higher

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/lumina-3d-saas-demo.git
   cd lumina-3d-saas-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the application:
   - Web interface: [http://localhost:5173](http://localhost:5173)

> [!TIP]
> ### ⚙️ Configuration
> - `src/components`: This directory contains the core React components, including layout elements, UI components, and 3D renderings.
> - `src/hooks`: This directory contains custom React hooks for managing state, animations, and 3D scene interactions.
> - `src/utils`: This directory contains utility functions for various tasks, such as model loading, formatting, and theming.

### 📚 Examples
Provide specific examples relevant to the MVP's core features:

- 🌐 **Interactive 3D Model Showcase**: Navigate to `/model-showcase` to view and interact with the 3D model.
- ✨ **Experience Parallax Scrolling**: Scroll through the landing page to experience parallax effects, navigate to `/experience` to test it well..
- 🌙 **Theme Toggle**: Use the theme toggle in the header to switch between light and dark modes.

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to Netlify
1.  **Create a Netlify account** (if you don't have one) and install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build the project for production:
   ```bash
   npm run build
   ```
3. Deploy the application:
   ```bash
   netlify deploy --prod
   ```
   This command will deploy the contents of your `dist` directory to Netlify. Netlify will provide you with a production URL for your deployed application.

### 🔑 Environment Variables
The following environment variables are set in the .env file:
- `VITE_APP_TITLE`: The title of the application.
  Example: `Lumina SaaS 3D Demo`
- `VITE_PUBLIC_URL`: The public URL where the app is served.
  Example: `/`

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: lumina-3d-saas-demo
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>