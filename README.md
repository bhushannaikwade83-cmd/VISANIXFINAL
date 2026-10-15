# VisaNix — Complete Website

React 19, TanStack Start, TypeScript and Tailwind CSS. All website pages and animation media included.

## Run locally
Install current Node.js and Bun, then run:
```sh
bun install
bun run dev
```
Open the local URL printed in the terminal. Fresh openings show the video. Explore Full Website opens the complete homepage.

## Production
```sh
bun run build
```
Configuration targets Cloudflare via Nitro; deployment requires compatible hosting setup.

## Notes
Enquiry form is frontend-only: no email sending service is connected. Media is local in public/media; Google Fonts requires internet. Dependencies and generated build output are excluded.
