# InFortRH - Portal do Colaborador

InFortRH é uma aplicação web moderna projetada para agilizar as operações de RH e melhorar a comunicação dentro da empresa. Ele fornece portais separados para funcionários e para o departamento de RH, cada um com um conjunto de funcionalidades específicas.

## Funcionalidades

### Portal do Colaborador
- **Dashboard:** Uma visão geral de informações importantes, como próximos eventos e anúncios.
- **Meus Eventos:** Visualize os eventos da empresa nos quais você está inscrito.
- **Holerites:** Acesse e baixe seus holerites.
- **Solicitar Folga:** Envie e acompanhe solicitações de folga.
- **Agendar Reunião:** Agende reuniões com outros funcionários.
- **Anúncios:** Mantenha-se atualizado com os anúncios da empresa.

### Portal de RH
- **Dashboard de RH:** Um painel central para gerenciar várias funções de RH.
- **Gerenciar Funcionários:** Adicione, visualize e gerencie informações dos funcionários.
- **Gerenciar Eventos:** Crie e gerencie eventos da empresa.
- **Gerenciar Reuniões:** Visualize e gerencie as reuniões agendadas.
- **Gerenciar Folgas:** Aprove ou rejeite solicitações de folga dos funcionários.
- **Publicar Anúncio:** Publique anúncios para toda a empresa.
- **Cadastrar Funcionário:** Registre novos funcionários no sistema.
- **Enviar Holerite:** Envie holerites para os funcionários.

## Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados:** MySQL
- **UI:** [React](https://react.dev/), [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Servidor de Desenvolvimento:** [Vite](https://vitejs.dev/)
- **Autenticação:** [JWT](https://jwt.io/) (JSON Web Tokens)

## Como Começar

### Pré-requisitos

- Node.js (v18 ou superior)
- pnpm (ou outro gerenciador de pacotes)
- Um servidor de banco de dados MySQL

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ProjetosOtgan/InFortRH.git
   cd InFortRH
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```
   MYSQL_HOST=seu_host_mysql
   MYSQL_USER=seu_usuario_mysql
   MYSQL_PASSWORD=sua_senha_mysql
   MYSQL_DATABASE=seu_banco_de_dados_mysql
   MYSQL_PORT=sua_porta_mysql
   ```

4. **Execute as migrações do banco de dados:**
   ```bash
   pnpm drizzle-kit generate
   pnpm drizzle-kit migrate
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

A aplicação estará disponível em `http://localhost:5173`.

## Estrutura de Pastas

```
/
├── app/                # Páginas e layouts do Next.js
├── components/         # Componentes React reutilizáveis
│   ├── employee/       # Componentes específicos do portal do colaborador
│   ├── hr/             # Componentes específicos do portal de RH
│   ├── shared/         # Componentes compartilhados entre os portais
│   └── ui/             # Componentes de UI (shadcn/ui)
├── public/             # Arquivos estáticos
├── server/             # Código do lado do servidor (API, banco de dados)
│   ├── middleware/     # Middlewares (ex: autenticação)
│   └── routes/         # Rotas da API
├── shared/             # Esquema do banco de dados (Drizzle)
└── styles/             # Estilos globais
```
