# Cronograma de Desenvolvimento - Data Frontier E-commerce

Este é o cronograma planejado para a execução do sistema de E-commerce. As entregas serão separadas em fases evolutivas para garantir entregas consistentes.

## FASE 1: Estruturação Inicial (Semana 1)
- **Objetivo:** Preparar o ambiente de trabalho e os esqueletos dos projetos.
- [x] Planejamento de Arquitetura e Estrutura de Pastas.
- [x] Criação de `README.md`, `.gitignore` e `CRONOGRAMA.md`.
- [ ] Setup do **Frontend**: Inicializar VITE com React, instalar bibliotecas (Tailwind, Lucide).
- [ ] Componentização base: Integrar os componentes criados no arquivo `.txt` base do layout (landing page).
- [ ] Setup do **Backend**: Inicializar NestJS, criar endpoins básicos para teste de conectividade.
- [ ] Setup de **Banco de Dados Local**: Criar `docker-compose.yml` para PostgreSQL.

## FASE 2: Backend e Modelagem de Dados (Semanas 2-3)
- **Objetivo:** Desenvolver a Engine principal do E-commerce.
- [ ] Arquitetar o schema Prisma (`schema.prisma`) contemplando:
  - Usuários/Clientes.
  - Produtos, Categorias e Variações.
  - Carrinho de Compras e Pedidos.
- [ ] Desenvolver módulos NestJS para gerenciar o CRUD destas entidades.
- [ ] Implementar autenticação básica (JWT).
- [ ] Inserir os mocks de dados (Seed) que foram passados na Landing Page de demonstração.

## FASE 3: Integração Frontend e Funcionalidades (Semanas 4-5)
- **Objetivo:** Conectar o Frontend com os dados reais do Backend.
- [ ] Substituir Mock de Dados estáticos da landing page por requisições à API.
- [ ] Desenvolvimento da tela de Login/Cadastro.
- [ ] Implementar mecânica funcional de Adicionar ao Carrinho e Resumo de Carrinho.
- [ ] Responsividade avançada e refinamentos de UI.

## FASE 4: Infraestrutura Cloud e Kubernetes (Semana 6)
- **Objetivo:** Hospedagem em nuvem no Google Cloud Platform.
- [ ] Construir `.Dockerfile` otimizado para Frontend (Multi-stage com Nginx).
- [ ] Construir `.Dockerfile` otimizado para Backend (Build production).
- [ ] Escrever manifestos Kubernetes (`deployment`, `service`) para a pasta `/k8s/`.
- [ ] Configurar Ingress ou LoadBalancers para a distribuição.
- [ ] Testes de carga e escalabilidade.
