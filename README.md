This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Required environment variables

| Key                       | Default Value                             | Description                                  |
| ------------------------- | ----------------------------------------- | -------------------------------------------- |
| NEXT_PUBLIC_RPC_URL       | https://sepolia.base.org                  | The RPC server URL for network interactions. |
| NEXT_PUBLIC_PATH          | http://localhost:3000                     | Path for static assets or routes.            |
| AUTH0_SECRET              | -                                         | Auth0 secret for signing tokens.             |
| AUTH0_BASE_URL            | http://localhost:3000                     | Base URL of your application.                |
| AUTH0_ISSUER_BASE_URL     | https://dev-i30bktnwxomv4ur8.us.auth0.com | Auth0 issuer URL.                            |
| AUTH0_CLIENT_ID           | -                                         | Client ID for Auth0 integration.             |
| AUTH0_REDIRECT_URI        | http://localhost:3000                     | Redirect URL after authentication.           |
| AUTH0_API_AUDIENCE        | http://localhost:3001                     | API audience for authentication.             |
| BACKEND_URL               | http://localhost:3001                     | Base URL of the backend.                     |
| ENVIRONMENT               | `local` or `stage`                        | Application environment.                     |
| WALLET_CONNECT_PROJECT_ID | -                                         | Project ID for Wallet Connect.               |
| PRIVY_APP_ID              | -                                         | Privy App ID.                                |
| PRIVY_CLIENT_ID           | -                                         | Privy Client ID.                             |


## Getting Started

1. Create and fill the environment file `.env`:

2. Make sure that your github account has permission to work with self-created packages (`getrewards-backend-api`, `getrewards-contracts`).
   Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Build in production mode with current environment:

   ```bash
   npm run build
   ```

5. Sinse for the build version Next.js use `output: 'export'` (static-site generation), generated files can be tested locally using `serve` library:

   ```bash
   npx serve@latest out
   ```

## Deploy to staging

The deployment of the frontend to the staging environment is automated and built using GitHub Actions. The trigger for the deployment is a push to the `main` branch.

## Deploy to production

Easiest way to deploy frontend is to open package.json file and increasing version (e.g. version 0.2.20 to 0.2.21).
Then open terminal. Go to root of the project vaultleap-frontend and run commands one by one

```
npm install
git commit -m "v{version}"
git tag @klydo-io/getrewards-frontend@v{version}
```

where {version} needs to be replaced with actual app version.
Then you need to run command

```
git push origin -u main && git push --tags
```

to push latest commit and tag to github so the deployment will be triggered automatically to production
