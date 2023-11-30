## Node Express Prisma Boilerplate

🦄 Starter template for your Express Prisma PostgresSQL API

## 🍔 Stack Specs

- Node.js
- Express
- Prisma
- PostgresSQL

## 🧬 Development

- Duplicate .env.example to .env file

- Start docker container

```
docker compose up
```

- Create prisma client

```
npm run prisma:genereate:host
```
- Run migration
```
npm run prisma:migrate-dev:host
```

