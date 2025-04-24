# 🦍 FURIA Club - Web App Interativo para Fãs de CS

Bem-vindo ao **FURIA Club**, uma aplicação web desenvolvida especialmente para os fãs da FURIA, um dos maiores times de CS:GO do Brasil! 🎯

Esta plataforma oferece uma **experiência imersiva de comunidade**, com interface nostálgica inspirada no CS 1.6, e funcionalidades pensadas para engajar, entreter e informar os torcedores da FURIA.

---

## ✨ Funcionalidades

- 🔐 **Sistema de Login/Registro** com armazenamento local
  - Os dados dos usuários são salvos **localmente no navegador** (localStorage), sem necessidade de backend.
- 💬 **Chat personalizado**
  - Interface temática baseada em jogos da série Counter-Strike
  - Ideal para trocar ideias com outros fãs
- 📊 **Dashboard interativo**
  - Acompanhe os próximos jogos, estatísticas, resultados e notícias da FURIA
- 🧠 **Quiz interativo**
  - Teste seus conhecimentos sobre a equipe e ganhe pontos!
- 🔈 **Frases icônicas e áudios memoráveis**
  - Clássicas falas dos jogos e momentos históricos da FURIA
- 🏆 **Ranking de fãs**
  - Interaja, pontue e suba no ranking entre os membros do clube

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React + Vite
- **Estilo**: Tailwind CSS + Radix UI
- **Gerenciamento de formulários**: React Hook Form + Zod
- **Validação**: Zod
- **Componentes**: shadcn/ui, lucide-react
- **Armazenamento**: `localStorage` (usuários e interações)

---

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/furia-club.git

# Entre na pasta do projeto
cd furia-club

# Instale as dependências
npm install

# Rode a aplicação localmente
npm run dev

🗂️ Estrutura do Projeto

furia-club/
├── components/            # Componentes reutilizáveis
├── pages/                 # Páginas principais da aplicação
├── assets/                # Imagens e mídias
├── styles/                # Estilos globais e configurações Tailwind
├── utils/                 # Funções auxiliares
├── localStorage/          # Gerenciamento local de dados dos usuários
├── index.html             # HTML principal
├── vite.config.ts         # Configuração do Vite
└── package.json           # Dependências e scripts

💾 Armazenamento Local
Todos os dados do usuário (login, pontuação, progresso nos quizzes, etc.) são salvos no localStorage do navegador. Isso significa:

Sem necessidade de conexão com banco de dados

Experiência rápida e offline

Ideal para protótipos ou MVPs

🙌 Contribuições
Quer contribuir com melhorias, novas funcionalidades ou correções? Fique à vontade para abrir uma issue ou fazer um pull request! 💻

📢 Créditos
Desenvolvido por fãs, para fãs.
Inspirado pela paixão da torcida FURIA.
Design nostálgico inspirado na era do CS 1.6.