# workbox

My workbox guide

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Requirements](#requirements)
- [Installation](#installation)
- [Precaching](#precaching)
  1. [Revisions](#revisions)
- [Development](#development)
  - [Future](#future)
  - [History](#history)
  - [Community](#community)
- [Credits](#credits)
- [License](#license)

## Requirements

- [Workbox](https://developers.google.com/web/tools/workbox/)

## Installation

```bash
# Install workbox-cli globally
$ npm install -g workbox-cli

# Generate workbox-config.js
$ workbox wizard
```

## Precaching

There are many mistakes I made when first working with service workers. Here are some of the more frequent mistakes I made and how to correct them.

### 1. Revisions

#### How It Works

Precaching assets in `globPatterns` will serve content from the ServiceWorker. Look at the screenshot notice how the precached assets are being served `(from ServiceWorker)`.

![Precached Assets Network Tab](https://github.com/dylantyates/js-lib/blob/master/workbox/screenshots/precached-assets-network-tab.png)

`Chrome > Developer Tools > Network Tab`

This means that the user will always receive precached assets by associative revision hash from your last generated service worker.

#### Development Steps

Rebuild the service worker for a new

```bash
$ workbox generateSW workbox-config.js
```

Now your revisions for precached assets in your generated `sw.js` have been updated.

<hr>

#### Example

Previously generated `sw.js`

```js
  {
    "url": "index.html",
    "revision": "351c397cf0439a0b42e33b2a5370a668"
  },
  {
    "url": "styles.css",
    "revision": "0a853908487fd3fa70753ec2e9b48def"
  }
```

Newly generated `sw.js`

```js
{
    "url": "index.html",
    "revision": "243f397cf0439a0487fd3fac2e9b48df"
  },
  {
    "url": "styles.css",
    "revision": "3908487fe33b2a397cf04r3b2a5370a6"
  }
```

<hr>

Above is a simple example of how the revision hashes change. This allows workbox-precaching to know when the file has changed and update it.
