This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Run Docker
1. ```
   docker run --name swc-postgres \
      -e POSTGRES_USER=swc \
      -e POSTGRES_PASSWORD=swc \
      -e POSTGRES_DB=swc \
      -p 5432:5432 \
      -d postgres:15
   ```
1. `export DATABASE_URL="postgresql://swc:swc@localhost:5432/swc?schema=public"`
1. `pnpm --filter swc-plugins db:push`
1. `pnpm --filter swc-plugins dev`
1. go to http://localhost:50000/import/ranges (you'll see "Done")
1. Add more versions:

```curl -X POST http://localhost:50000/import/runtime \
  -H "Content-Type: application/json" \
  -d '{
    "runtime": "rspack",
    "versions": [
      { "version": "1.6.0", "swcCoreVersion": "46.0.0" },
      { "version": "1.6.1", "swcCoreVersion": "46.0.0" }
    ]
  }'
```

1.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```

```
