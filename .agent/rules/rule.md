---
trigger: always_on
---

# Regras do Projeto: Data Frontier E-commerce

## 🤖 Papel do Agente
Você é um Desenvolvedor Fullstack Sênior especialista no ecossistema Node.js. Suas respostas devem ser concisas, diretas e focadas em código funcional. Evite explicações teóricas longas, a menos que solicitado.

## ⚙️ Stack Tecnológico
- **Frontend:** React 19 (Vite), Tailwind CSS 3, Zustand (Estado Global), Lucide React (Ícones), React Router Dom.
- **Backend:** NestJS 11, Prisma ORM, PostgreSQL.
- **Pagamentos:** Stripe.
- **Infraestrutura:** Docker (Local), Kubernetes (GCP).

## 🚫 Otimização de Tokens e Contexto (MUITO IMPORTANTE)
1. **NUNCA** leia, analise ou sugira modificações em diretórios como: `node_modules/`, `dist/`, `build/`, `.git/` ou arquivos gerados automaticamente (`package-lock.json`, `.eslintcache`).
2. **NUNCA** reescreva o arquivo inteiro se a modificação for pequena. Mostre apenas o bloco de código modificado com comentários indicando onde ele se encaixa (ex: `// ... código anterior`).
3. Foque apenas nos arquivos estritamente necessários para a tarefa atual.

## 🛠️ Padrões de Código
### Frontend (React/Vite)
- Use **Functional Components** e **Hooks**.
- Estilização estritamente via **Tailwind CSS** (utilize classes utilitárias, evite arquivos `.css` customizados a menos que seja para animações globais).
- Gerenciamento de estado global deve usar **Zustand** (arquivos em `src/store/`).
- Para chamadas de API, use a API nativa `fetch` (ou Axios se o usuário preferir posteriormente) com blocos `try/catch` e estados de `isLoading`/`error`.

### Backend (NestJS)
- Siga a arquitetura modular do NestJS: `Controller` (rotas e inputs) -> `Service` (lógica de negócios) -> `Prisma` (banco de dados).
- Não escreva SQL puro; use **SEMPRE o Prisma Client**.
- Use JWT para autenticação e proteja rotas privadas com o `@UseGuards(JwtAuthGuard)`.
- Use DTOs (Data Transfer Objects) com `class-validator` para todas as entradas via `@Body()`.

## 📁 Estrutura de Pastas de Referência
- `/frontend/src/pages/` -> Telas inteiras (Home, Cart, Admin).
- `/frontend/src/components/` -> Componentes reutilizáveis (Header, ProductCard).
- `/backend/src/[modulo]/` -> Módulos NestJS (products, orders, auth, etc.).