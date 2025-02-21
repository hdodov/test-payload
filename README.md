# test-payload

Example repo to play around with Payload CMS.

## Usage

**Payload _inside_ Docker:**

1. `pnpm docker` for dev mode (with docker-compose)

**Payload outside Docker:**

1. Make sure you have MongoDB running and available on `localhost:27017`
   - You could use Docker just for the DB:
     ```bash
     docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
     ```
2. `pnpm dev` for dev mode
3. `pnpm build` then `pnpm start` for prod mode
