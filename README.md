# Lista de Tarefas

Aplicação web de lista de tarefas desenvolvida com HTML, CSS e JavaScript, com foco em simplicidade, acessibilidade, responsividade e boa experiência de uso.

## 🌐 Demonstração

**Site publicado:**
https://lista-tarefas-ecru.vercel.app/

## 📋 Funcionalidades

* Adicionar novas tarefas
* Concluir e desmarcar tarefas
* Editar tarefas
* Excluir tarefas
* Excluir todas as tarefas concluídas
* Filtrar tarefas por:

  * Todas
  * Pendentes
  * Concluídas
* Contador de tarefas
* Persistência das tarefas no navegador
* Modo claro e escuro
* Preferência de tema armazenada no navegador
* Navegação por teclado
* Estados de foco visíveis
* Layout responsivo para diferentes tamanhos de tela
* HTML semântico
* Recursos de acessibilidade

## 🛠️ Tecnologias

* HTML5
* CSS3
* JavaScript
* Vite
* Git
* GitHub
* Vercel

## 🚀 Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/ThiagoHVP/lista-tarefas.git
```

### 2. Entre na pasta do projeto

```bash
cd lista-tarefas
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Depois, abra no navegador o endereço informado pelo Vite.

## 📦 Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar a versão de produção localmente:

```bash
npm run preview
```

## 📁 Estrutura do projeto

```text
lista-tarefas/
├── public/
├── src/
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## ♿ Acessibilidade

O projeto foi desenvolvido considerando boas práticas de acessibilidade, incluindo:

* HTML semântico
* Labels associados aos campos de formulário
* Uso de `aria-label` e `aria-pressed` quando necessário
* Indicadores visuais de foco
* Navegação por teclado
* Contraste entre elementos da interface
* Feedback para diferentes estados da aplicação

## ☁️ Deploy

O projeto está publicado na Vercel e conectado ao repositório do GitHub.

Cada atualização enviada para a branch `main` pode gerar automaticamente um novo deploy.

## 🎯 Objetivo

Este projeto foi desenvolvido como prática de desenvolvimento front-end, trabalhando conceitos de:

* Manipulação do DOM
* Eventos em JavaScript
* Gerenciamento de estado
* `localStorage`
* Design responsivo
* Acessibilidade
* Versionamento com Git
* Publicação de aplicações web

## 📄 Licença

Este projeto está disponível para fins de estudo e portfólio.