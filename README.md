# Data Frontier E-commerce

Bem-vindo ao repositório do E-commerce da Data Frontier! Este projeto estrutura um sistema completo de e-commerce dividido em um frontend construído com React, um backend robusto em NestJS, e banco de dados PostgreSQL, tudo orquestrado para implantação no Google Cloud Platform (GCP) com Kubernetes.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Node.js, React (Vite), Tailwind CSS, Lucide React
- **Backend:** Node.js, NestJS, Prisma ORM, PostgreSQL
- **Banco de Dados Local:** PostgreSQL via Docker Compose
- **Infraestrutura Cloud:** Google Cloud (GKE), Kubernetes, Helm/YAML Manifests

## 📂 Estrutura do Projeto

\`\`\`bash
├── frontend/           # Aplicação web React
├── backend/            # API NestJS
├── database/           # Configurações do Docker Compose (PostgreSQL local)
├── k8s/                # Manifestos de Deployment do Kubernetes
├── CRONOGRAMA.md       # Planejamento e fases de desenvolvimento
└── README.md           # Documentação principal
\`\`\`

## 🖥️ Como Executar Localmente

**Pré-requisitos:** Node.js (v18+), Docker, Docker Compose, Git.

### 1. Iniciar Banco de Dados:
\`\`\`bash
cd database
docker-compose up -d
\`\`\`

### 2. Iniciar o Backend:
\`\`\`bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
\`\`\`

### 3. Iniciar o Frontend:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
O frontend estará acessível em `http://localhost:5173` ou porta especificada pelo Vite.

## ☁️ Arquitetura Google Cloud e Kubernetes

A implantação em produção utiliza Kubernetes (GKE) no Google Cloud.  
Todo o tráfego do domínio é recebido por um `Ingress Controller` do GCP, que faz o balanceamento de carga para os "Services" do Kubernetes, separando as chamadas de API (Backend) e requisições para assets web (Frontend).
 O banco de dados pode usar um StateFulSet persistente ou idealmente usar **Cloud SQL para PostgreSQL** no Google Cloud. 

Veja a pasta `/k8s` para os manifestos de implantação detalhados.
