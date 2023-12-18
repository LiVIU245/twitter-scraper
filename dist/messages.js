"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDM = void 0;
const api_1 = require("./api");
const api_data_1 = require("./api-data");
function generateUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
async function sendDM(params, auth) {
    if (!auth.isLoggedIn()) {
        throw new Error('Scraper is not logged-in for profile following.');
    }
    const messageRequest = api_data_1.apiRequestFactory.createMessageRequest();
    //generate uuid
    const uuid = generateUUID();
    let body = {
        cards_platform: "Web-12",
        dm_users: false,
        include_cards: 1,
        include_quote_count: true,
        recipient_ids: false,
        request_id: uuid,
        ...params,
    };
    const res = await (0, api_1.requestApi)(messageRequest.toRequestUrl(), auth, 'POST', body);
    if (!res.success) {
        throw res.err;
    }
    if (!res.value) {
        return null;
    }
    return res;
}
exports.sendDM = sendDM;
//# sourceMappingURL=messages.js.map