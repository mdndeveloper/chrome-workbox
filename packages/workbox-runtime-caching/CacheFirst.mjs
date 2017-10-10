/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import {_private} from 'workbox-core';

/**
 * An implementation of a [cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)
 * request strategy.
 *
 * A cache first strategy is useful for assets that are revisioned since it
 * assets can be cached for long periods of time, saving the users data.
 *
 * @param {FetchEvent} event The request to handle.
 * @return {Promise<Response>}
 *
 * @memberof module:workbox-runtime-caching
 */
class CacheFirst {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by `workbox-core`.
   * @param {string} options.plugins Workbox plugins you may want to use in
   * conjunction with this caching strategy.
   */
  constructor(options = {}) {
    this._cacheName =
      _private.cacheNames.getRuntimeName(options.cacheName);
      this._plugins = options.plugins || [];
  }

  /**
   * Handle the provided fetch event.
   *
   * @param {FetchEvent} event
   * @return {Promise<Response>}
   */
  async handle(event) {
    if (process.env.NODE_ENV !== 'production') {
      // TODO: Switch to core.assert
      // core.assert.isInstance({event}, FetchEvent);
    }

    const cachedResponse = await _private.cacheWrapper.match(
      this._cacheName,
      event.request,
      this._plugins
    );

    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await _private.fetchWrapper.fetch(
      event.request,
      this._plugins
    );

    // Keep the service worker while we put the request to the cache
    const responseClone = response.clone();
    event.waitUntil(
      _private.cacheWrapper.put(
        this._cacheName,
        event.request,
        responseClone,
        this._plugins
      )
    );

    return response;
  }
}

export default CacheFirst;
