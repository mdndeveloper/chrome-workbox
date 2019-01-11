/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import * as _private from './_private.mjs';
import {clientClaim} from './clientClaim.mjs';
import {getCacheNames} from './getCacheNames.mjs';
import {registerQuotaErrorCallback} from './registerQuotaErrorCallback.mjs';
import {setCacheNameDetails} from './setCacheNameDetails.mjs';
import {skipWaiting} from './skipWaiting.mjs';
import './_version.mjs';


// Give our version strings something to hang off of.
// We do this
try {
  self.workbox.v = self.workbox.v || {};
} catch (errer) {
  // NOOP
}

/**
 * All of the Workbox service worker libraries use workbox-core for shared
 * code as well as setting default values that need to be shared (like cache
 * names).
 *
 * @namespace workbox.core
 */

export {
  _private,
  clientClaim,
  getCacheNames,
  registerQuotaErrorCallback,
  setCacheNameDetails,
  skipWaiting,
};
