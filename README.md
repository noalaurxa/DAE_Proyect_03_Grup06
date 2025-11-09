# 🧪 Rick & Morty App

Aplicación web desarrollada en **React** que consume la [Rick and Morty API](https://rickandmortyapi.com/).  
Permite visualizar personajes, filtrarlos, navegar entre páginas y enviar mensajes de contacto mediante un formulario validado.  
Proyecto realizado como parte de la **Tarea: Aplicación Web con React y API Pública**.

---

## 🚀 Tecnologías Utilizadas

- ⚛️ **React 18** con Hooks  
- 🧭 **React Router DOM** — para navegación entre páginas  
- 🌐 **Axios** — para consumir la API  
- 💅 **React Bootstrap** — para el diseño responsive  
- 🧰 **TypeScript** (opcional según tu configuración)  
- 🧩 **Rick and Morty API** — fuente de datos pública  

---

## 📁 Estructura del Proyecto
src/
├── components/
│ ├── common/
│ │ ├── Navbar.tsx
│ │ ├── Footer.tsx
│ │ ├── LoadingSpinner.tsx
│ │ └── ErrorAlert.tsx
│ ├── home/
│ │ ├── HeroSection.tsx
│ │ └── PopularSection.tsx
│ ├── list/
│ │ ├── FilterBar.tsx
│ │ ├── EntityCard.tsx
│ │ └── Pagination.tsx
│ └── contact/
│ └── ContactForm.tsx
├── pages/
│ ├── HomePage.tsx
│ ├── ListPage.tsx
│ └── ContactPage.tsx
├── services/
│ ├── api.ts
│ └── entityService.ts
├── hooks/
│ ├── useEntities.ts
│ └── useEntity.ts
├── App.tsx
└── main.tsx

---

## ⚙️ Instalación y Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/noalaurxa/DAE_Proyect_03_Grup06
   cd DAE_Proyect_03_Grup06
   cd myproject03
   npm install
   npm run dev      

---

## ⚙️ Link de DESPLIEGUE
