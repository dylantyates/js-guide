# workbox

Workbox testing for now

## Requirements

- [Workbox](https://developers.google.com/web/tools/workbox/)

## Installation

```bash
# Install workbox-cli globally
$ npm install -g workbox-cli

# Generate workbox-config.js
$ workbox wizard
```

## Workbox Precaching

There are many mistakes I made when first working with service workers. Here are some of the more frequent mistakes I made and how to correct them.

### 1. Precache Revisions Update On New Service Worker Build

#### How It Works

Precaching assets in `globPatterns` will serve content from the ServiceWorker. Look at the screenshot notice how the precached assets are being served `(from ServiceWorker)`.

![Precached Assets Network Tab](https://github.com/dylantyates/js-lib/blob/master/workbox/gotchas/precached-assets-network-tab.png)

`Chrome > Developer Tools > Network Tab`

This means that the user will always receive this revision of the css until you generate a new service worker.

#### Solution

Rebuild the service worker for a new

```bash
$ workbox generateSW workbox-config.js
```

Now your revision for your `styles.css` changes from

```js
"revision": "[old hash]"
```

to

```js
"revision": "[new hash]"
```

This allows workbox-precaching to know when the file has changed and update it.
