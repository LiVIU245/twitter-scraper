import {addApiFeatures, requestApi, RequestApiResult} from './api';
import { TwitterAuth } from './auth';
import { apiRequestFactory } from './api-data';
import {parseEngagementimeline} from "./timeline-relationship";
import {TimelineData} from "./timeline-v2";

export interface Retweet {
  name?: string;
  id?: string;
}

function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export async function sendDM(
    params: object,
    auth: TwitterAuth,
): Promise<RequestApiResult<any> | null> {
  if (!auth.isLoggedIn()) {
    throw new Error('Scraper is not logged-in for profile following.');
  }

  const messageRequest = apiRequestFactory.createMessageRequest();

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
  }

  const res = await requestApi<TimelineData>(
      messageRequest.toRequestUrl(),
      auth,
      'POST',
      body
  );

  if (!res.success) {
    throw res.err;
  }

  if (!res.value) {
    return null;
  }

  return res
}
