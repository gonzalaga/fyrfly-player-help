# Fyrfly Player Help

Static customer FAQ site for Fyrfly and Campfire Player support.

Open `index.html` directly or serve the folder with any static web server.

## Netlify manual FAQ admin

Open `/admin/` on the Netlify-hosted site to add manual FAQ entries.

This uses Netlify Identity plus Git Gateway through Decap CMS. Admins do not need a GitHub API token in the browser. Netlify commits changes to `manual-faqs.json` in GitHub, then Netlify deploys the updated site.

Required Netlify settings:

- Enable Identity.
- Enable Git Gateway.
- Invite admin users through Netlify Identity.
- Make sure the connected GitHub repo deploys from `main`.
