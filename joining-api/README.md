# Joining Form Backend (`joining-api/`)

Isolated Cloudflare Worker backend for the Ganga Seva Sangat Joining Form.

This directory is self-contained. It is **not** part of the main website Worker and
shares no code, config, or build pipeline with it.

## Resources

| Item | Value |
|---|---|
| Worker | `gss-main-joining-api` |
| URL | https://gss-main-joining-api.sgangasevasangat.workers.dev |
| D1 database | `gss-main-joining-db` |
| D1 ID | `5ef00ef2-aee1-4f4f-a7ad-280ba24bb38a` |
| D1 binding | `DB` |
| Secret | `RATE_LIMIT_SALT` |

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | Liveness check — returns `{ ok: true, service: "gss-main-joining-api" }` |
| `POST` | `/api/join` | Submit a joining form registration |
| `OPTIONS` | any | CORS preflight |

CORS is restricted to `https://gangasevasangat.com` and `https://www.gangasevasangat.com`.

## Schema

Tables in `gss-main-joining-db`:

- `registrations` — `registration_id`, `request_id`, `name`, `mobile`, `email`, `payload_json`
- `rate_limits` — `ip_hash`, `window_start`, `count` (5 requests per IP per minute)

Indexes: `idx_registrations_mobile`, `idx_registrations_created_at`.

## Local development

```bash
cd joining-api
npx wrangler dev
```

Create a `.dev.vars` file for local secrets (it is gitignored):

```
RATE_LIMIT_SALT="any-local-value"
```

## Deployment

Deployment is automated via Cloudflare Workers Builds on pushes to `main` that
touch `joining-api/**`. Manual deploy, if ever needed:

```bash
cd joining-api
npx wrangler deploy
```

### Important: the salt must be a secret, not a var

`RATE_LIMIT_SALT` must be stored as a **secret** binding. If it is stored as a
plain-text var and this directory is deployed, `wrangler deploy` will remove it
because it is not declared in `wrangler.toml`, and every request will fail with
`503 Service configuration error`.

Set or rotate it with:

```bash
cd joining-api
npx wrangler secret put RATE_LIMIT_SALT
```

## Boundaries

Do not add to this directory:

- routes or custom domains for `gangasevasangat.com`
- references to the main website Worker, the Alert System, or the Assistance app
- the `joining-form.html` frontend (it lives with the main site and is deployed separately)
