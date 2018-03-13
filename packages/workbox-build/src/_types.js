/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import './_version.mjs';

 /**
 * @typedef {Object} ManifestEntry
 * @property {String} url The URL to the asset in the manifest.
 * @property {String} revision The revision details for the file. This is a
 * hash generated by node based on the file contents.
 *
 * @memberof module:workbox-build
 */

/**
 * @typedef {Object} ManifestTransformResult
 * @property {Array<ManifestEntry>} manifest
 * @property {Array<string>|undefined} warnings
 *
 * @memberof module:workbox-build
 */
