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

/* eslint-env mocha, browser */
/* global chai */

'use strict';

const IDBHelper = require('../../../../lib/idb-helper.js');
const constants = require('../../src/lib/constants.js');
const enqueueRequest = require('../../src/lib/enqueue-request');
const fetchMock = require('fetch-mock');
const replayRequests = require('../../src/lib/replay-queued-requests.js');

const idbHelper = new IDBHelper(constants.IDB.NAME, constants.IDB.VERSION,
  constants.IDB.STORE);

describe('replay-queued-requests', () => {
  const urlPrefix = 'https://replay-queued-requests.com/';

  before(() => {
    fetchMock.mock(`^${urlPrefix}`, new Response());
  });

  it('should replay requests saved in IndexedDB', () => {
    const urls = ['one', 'two?three=4'].map(suffix => urlPrefix + suffix);
    const time = Date.now();
    const urlsWithQt = urls.map(url => {
      const newUrl = new URL(url);
      newUrl.search += (newUrl.search ? '&' : '') + 'qt=' + time;
      return newUrl.toString();
    });

    return Promise.all(urls.map(url => enqueueRequest(new Request(url), time)))
      .then(() => replayRequests())
      .then(() => fetchMock.calls().matched.map(match => match[0]))
      .then(matchedUrls =>
        chai.expect(matchedUrls).to.include.members(urlsWithQt))
      .then(() => idbHelper.getAllKeys())
      .then(keys => chai.expect(keys).to.not.include.members(urlsWithQt));
  });

  after(() => {
    fetchMock.restore();
  });
});
