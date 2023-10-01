"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoriters = void 0;
const api_1 = require("./api");
const api_data_1 = require("./api-data");
const timeline_relationship_1 = require("./timeline-relationship");
async function getFavoriters(id, auth) {
    if (!auth.isLoggedIn()) {
        throw new Error('Scraper is not logged-in for profile following.');
    }
    const favoritersRequest = api_data_1.apiRequestFactory.createFavoritersRequest();
    favoritersRequest.variables.tweetId = id;
    favoritersRequest.variables.count = 20;
    delete favoritersRequest.variables.cursor;
    let favoritersAll = [];
    let loop = true;
    let cursor = undefined;
    while (loop) {
        if (cursor) {
            favoritersRequest.variables.cursor = cursor;
        }
        const res = await (0, api_1.requestApi)(favoritersRequest.toRequestUrl(), auth);
        if (!res.success) {
            throw res.err;
        }
        if (!res.value) {
            return null;
        }
        let { next, values, previous } = (0, timeline_relationship_1.parseEngagementimeline)(res.value, 'favoriters');
        if (values.length == 0) {
            loop = false;
            break;
        }
        cursor = next;
        favoritersAll = [...favoritersAll, ...values];
    }
    return favoritersAll;
}
exports.getFavoriters = getFavoriters;
//# sourceMappingURL=favoriters.js.map