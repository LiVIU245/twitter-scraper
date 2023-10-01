"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRetweets = void 0;
const api_1 = require("./api");
const api_data_1 = require("./api-data");
const timeline_relationship_1 = require("./timeline-relationship");
async function getRetweets(id, auth) {
    if (!auth.isLoggedIn()) {
        throw new Error('Scraper is not logged-in for profile following.');
    }
    const retweetRequest = api_data_1.apiRequestFactory.createRetweetersRequest();
    retweetRequest.variables.tweetId = id;
    retweetRequest.variables.count = 20;
    delete retweetRequest.variables.cursor;
    let retweetsAll = [];
    let loop = true;
    let cursor = undefined;
    while (loop) {
        if (cursor) {
            retweetRequest.variables.cursor = cursor;
        }
        const res = await (0, api_1.requestApi)(retweetRequest.toRequestUrl(), auth);
        if (!res.success) {
            throw res.err;
        }
        if (!res.value) {
            return null;
        }
        let { next, values, previous } = (0, timeline_relationship_1.parseEngagementimeline)(res.value, 'retweets');
        if (values.length == 0) {
            loop = false;
            break;
        }
        cursor = next;
        retweetsAll = [...retweetsAll, ...values];
    }
    return retweetsAll;
}
exports.getRetweets = getRetweets;
//# sourceMappingURL=retweets.js.map