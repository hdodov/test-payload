# test-payload

Example repo to play around with Payload CMS.

## Usage

**Payload _inside_ Docker (with docker-compose):**

- `pnpm docker` for dev mode
- `pnpm docker:prod` for building the container in prod mode
- `pnpm docker:prod:lb` for a load-balanced setup

**Payload outside Docker:**

1. Make sure you have MongoDB running and available on `localhost:27017`
   - You could use Docker just for the DB:
     ```bash
     docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
     ```
2. `pnpm dev` for dev mode
3. `pnpm build` then `node .next/standalone/server.js` for prod mode
