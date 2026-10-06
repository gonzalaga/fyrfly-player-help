# Fyrfly Player Help

Static customer FAQ site for Fyrfly and Campfire Player support.

Open `index.html` directly or serve the folder with any static web server.

## Progressive Web App

The customer FAQ is PWA-ready with `manifest.webmanifest`, `sw.js`, offline fallback, and app icons.

## FAQ content

`faqs.json` is the single source of truth for the public website and the native Fyrfly Support Android app. All customer-facing questions must be maintained there rather than embedded in `index.html`.

## Netlify FAQ admin

Open `/admin/` on the Netlify-hosted site to manage FAQ entries.

This uses Netlify Identity plus Git Gateway through Decap CMS. Admins do not need a GitHub API token in the browser. Netlify commits changes to `faqs.json` in GitHub, then Netlify deploys the updated site.

Required Netlify settings:

- Enable Identity.
- Enable Git Gateway.
- Invite admin users through Netlify Identity.
- Make sure the connected GitHub repo deploys from `main`.

If login succeeds but Decap shows a Git Gateway API error, reconnect or regenerate the Git Gateway token in Netlify's Identity settings and leave the Git Gateway roles field blank unless role-based editor access is intentionally configured.
