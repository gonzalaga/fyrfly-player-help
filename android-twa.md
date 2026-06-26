# Android TWA Packaging

This site is now PWA-ready for Android Trusted Web Activity packaging.

## Required production values

- Netlify HTTPS origin: `https://remix8.netlify.app`
- Android package name: `com.remix8.fyrflyhelp`
- App name: `Fyrfly Player Help`
- Android project folder: `/Users/danielgonzalez/Dropbox (Personal)/concepts/cfp/gorgias_faq_generator/android-twa`
- Current release APK: `/Users/danielgonzalez/Dropbox (Personal)/concepts/cfp/gorgias_faq_generator/android-twa/app-release-signed.apk`
- Current release bundle: `/Users/danielgonzalez/Dropbox (Personal)/concepts/cfp/gorgias_faq_generator/android-twa/app-release-bundle.aab`

TWA verification is origin-specific, so changing domains later requires updating the Android project and the hosted Digital Asset Links file.

## Build with Bubblewrap

Install Bubblewrap:

```sh
npm install -g @bubblewrap/cli
```

Initialize the Android wrapper:

```sh
npx --yes @bubblewrap/cli init --manifest https://remix8.netlify.app/manifest.webmanifest
```

When prompted, use:

- Package ID: `com.remix8.fyrflyhelp`
- App name: `Fyrfly Player Help`
- Launcher name: `Fyrfly Help`
- Start URL: `https://remix8.netlify.app/`
- Display mode: `standalone`
- Orientation: `portrait`
- Play Billing: `No`
- Geolocation permission: `No`
- Notifications: disabled in the generated Android config

Build a release bundle:

```sh
npx --yes @bubblewrap/cli build
```

## Digital Asset Links

After Bubblewrap creates the signing key, get the release SHA-256 fingerprint:

```sh
/Users/danielgonzalez/.bubblewrap/jdk/jdk-17.0.11+9/Contents/Home/bin/keytool \
  -list -v \
  -keystore ./android.keystore \
  -alias fyrflyhelp
```

The current release fingerprint is:

```text
56:B7:AB:06:37:DB:E1:AC:07:0C:8C:29:35:82:46:34:AA:BB:6D:0F:2F:D1:1A:A5:DD:CA:01:33:CD:41:5A:01
```

This fingerprint is already published in `.well-known/assetlinks.json`. Commit it and deploy to Netlify before testing the app as a verified TWA.

Verify it is reachable:

```sh
curl https://remix8.netlify.app/.well-known/assetlinks.json
```

The app should only ship after Android verifies the domain. If verification fails, Android may show the site in a browser-like custom tab instead of a full-screen app.
