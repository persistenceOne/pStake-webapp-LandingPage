import { getAssetFromKV, mapRequestToAsset, serveSinglePageApp } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  if (url.pathname.includes('/getTokenInfo')) {
    return await getTokenInfo(event.request)
  }

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }
    options.mapRequestToAsset = serveSinglePageApp
    const page = await getAssetFromKV(event, options);

    // allow headers to be altered
    const response = new Response(page.body, page);

    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "unsafe-url");
    response.headers.set("Feature-Policy", "none");

    return response;

  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

async function getTokenInfo(request) {
  const cacheUrl = new URL(request.url);

  // Construct the cache key from the cache URL
  const cacheKey = new Request(cacheUrl.toString(), request);
  const cache = caches.default;
  const ethUrl = `https://api.ethplorer.io/getTokenInfo/0x2C5Bcad9Ade17428874855913Def0A02D8bE2324?apiKey=${ETHPLORER_API_KEY}`;
  const atomUrl = `https://api.ethplorer.io/getTokenInfo/0x44017598f2AF1bD733F9D87b5017b4E7c1B28DDE?apiKey=${ETHPLORER_API_KEY}`;
  const xprtUrl = `https://api.ethplorer.io/getTokenInfo/0x45e007750Cc74B1D2b4DD7072230278d9602C499?apiKey=${ETHPLORER_API_KEY}`;

  // Check whether the value is already available in the cache
  // if not, you will need to fetch it from origin, and store it in the cache
  // for future access
  let response = await cache.match(cacheKey);
  let data = {
    ethData:{},
    atomData:{},
    xprtData:{},
  }

  if (response === undefined) {
    console.log(
      `Response for request url: ${request.url} not present in cache. Fetching and caching request.`
    );
    // If not in cache, get it from origin
    response = await fetch(ethUrl);
    data.ethData = new Response(response.body, response);

    response = await fetch(atomUrl);
    data.atomData = new Response(response.body, response);

    response = await fetch(xprtUrl);
    data.xprtData = new Response(response.body, response);

    // Must use Response constructor to inherit all of response's fields
    //response = new Response(response.body, response);

    // Cache API respects Cache-Control headers. Setting s-max-age to 10
    // will limit the response to be in cache for 10 seconds max
    // Any changes made to the response here will be reflected in the cached value
    response.headers.set('Cache-Control', 's-maxage=5');

    // Store the fetched response as cacheKey
    // Use waitUntil so you can return the response without blocking on
    // writing to cache
    await cache.put(cacheKey, response.clone());
  } else {
    console.log(`Cache hit for: ${request.url}.`);
  }
  return data;
}