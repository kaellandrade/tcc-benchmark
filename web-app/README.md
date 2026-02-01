<div align="center">
  <img src="web-app/src/assets/for-light/dcomp-lab-log-header-for-light.png" alt="Logo DcompLab" width="400px" />
  <br />
  <br />

  <p>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-19.0-blue?logo=react" alt="React" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite" alt="Vite" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript" />
    </a>
    <a href="https://web.dev/progressive-web-apps/">
      <img src="https://img.shields.io/badge/PWA-Ready-purple?logo=pwa" alt="PWA" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
    </a>
  </p>

<h3>Ambiente de Desenvolvimento PWA Acessível e Multilinguagem via WebAssembly.</h3>
</div>

<br />

## 📖 Sobre o Projeto

O **DcompLab** é uma IDE (Ambiente de Desenvolvimento Integrado) projetada para democratizar o ensino de programação. Diferente de soluções tradicionais que dependem de servidores pesados, o DcompLab utiliza **WebAssembly (WASM)** e tecnologias de **Edge Computing** para compilar e executar códigos diretamente no navegador do usuário.

Isso permite que estudantes programem em **Java, C e Python** mesmo em dispositivos com hardware limitado ou **sem conexão constante com a internet** (Offline-First).

### 🚀 Principais Diferenciais

* **Execução Client-Side:** Todo o processamento ocorre no dispositivo do usuário. Zero custo de servidor backend.
* **Suporte Offline (PWA):** Instale como um aplicativo nativo no Android, iOS ou Desktop e code sem internet.
* **Multilinguagem:**
    * ☕ **Java:** Virtualização da JVM no navegador via [CheerpJ](https://cheerpj.com/).
    * 🐍 **Python:** Execução via interpretador WASM com [Pyodide](https://pyodide.org/en/stable/).
    * ⚙️ **C:** Compilação e execução via [JSCPP](https://github.com/JSCPP/JSCPP).
* **Mobile First:** Interface pensada para telas de toque, com barra de ações rápidas (Tab, setas, símbolos) para facilitar a codificação em celulares.
* **Design Moderno:** Temas Claro/Escuro, animações fluídas e editor de código robusto.

---

## 📸 Screenshots

| Mobile Dark | Mobile Light | Desktop |
|:---:|:---:|:---:|
| <img src="web-app/public/screenshots/03_java_dark.jpg" width="200" /> | <img src="web-app/public/screenshots/05_java_light.jpg" width="200" /> | <img src="web-app/public/screenshots/07_desk_light.png" width="400" /> |

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna focada em performance e experiência do usuário:

* **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
* **Estilização:** [TailwindCSS v4](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/) (Radix UI)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)
* **Editor de Código:** [CodeMirror 6](https://codemirror.net/) (@uiw/react-codemirror)
* **Compilação Web:**
    * `JSCPP` (Para execução de C)
    * `CheerpJ` (Integração para Java)
    * `Pyodide` (Integração para Python)
* **PWA:** `vite-plugin-pwa` (Service Workers, Cache Strategy)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 📦 Como Rodar Localmente

Pré-requisitos: Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:kaellandrade/tcc-benchmark.git
    cd web-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    Abra `http://localhost:5173` para ver a aplicação rodando.

### Build para Produção

Para gerar a versão otimizada com PWA ativo:

```bash
npm run build
npm run preview