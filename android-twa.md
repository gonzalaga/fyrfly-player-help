# Android TWA Packaging

This site is now PWA-ready for Android Trusted Web Activity packaging.

## Required production values

- Netlify HTTPS origin: `https://YOUR_NETLIFY_DOMAIN`
- Android package name: `com.remix8.fyrflyhelp`
- App name: `Fyrfly Player Help`

Use the final Netlify domain before building the Android project. TWA verification is origin-specific, so changing domains later requires updating the Android project and the hosted Digital Asset Links file.

## Build with Bubblewrap

Install Bubblewrap:

```sh
npm install -g @bubblewrap/cli
```

Initialize the Android wrapper:

```sh
bubblewrap init --manifest https://YOUR_NETLIFY_DOMAIN/manifest.webmanifest
```

When prompted, use:

- Package ID: `com.remix8.fyrflyhelp`
- App name: `Fyrfly Player Help`
- Launcher name: `Fyrfly Help`
- Start URL: `https://YOUR_NETLIFY_DOMAIN/`
- Display mode: `standalone`

Build a release bundle:

```sh
bubblewrap build
```

## Digital Asset Links

After Bubblewrap creates the signing key, get the release SHA-256 fingerprint:

```sh
keytool -list -v -keystore ./android.keystore -alias android
```

Copy `.well-known/assetlinks.template.json` to `.well-known/assetlinks.json`, replace `REPLACE_WITH_RELEASE_KEY_SHA256_FINGERPRINT`, commit it, and deploy to Netlify.

Verify it is reachable:

```sh
curl https://YOUR_NETLIFY_DOMAIN/.well-known/assetlinks.json
```

The app should only ship after Android verifies the domain. If verification fails, Android may show the site in a browser-like custom tab instead of a full-screen app.
