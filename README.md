# Slow Payload load times https://github.com/payloadcms/payload/discussions/9085

1. `git clone git@github.com:hdodov/test-payload.git`
2. `pnpm docker`
3. Open `http://localhost:3000/`
4. You'll wait **over 10 seconds**
5. Open `http://localhost:3000/admin/login`
6. You'll wait **over 20 seconds**
