import { addApiFeatures, requestApi } from './api';
import { TwitterAuth } from './auth';
import { QueryRetweetsResponse} from './timeline-v1';
import { apiRequestFactory } from './api-data';
import {parseEngagementimeline} from "./timeline-relationship";
import {TimelineData} from "./timeline-v2";

export interface Retweet {
  name?: string;
  id?: string;
}

export async function getRetweets(
    id: string,
    auth: TwitterAuth,
): Promise<Retweet[] | null> {
  if (!auth.isLoggedIn()) {
    throw new Error('Scraper is not logged-in for profile following.');
  }

  const retweetRequest = apiRequestFactory.createRetweetersRequest();
  retweetRequest.variables.tweetId = id;
  retweetRequest.variables.count = '20';

  let retweetsAll: Retweet[] = []
  let loop: boolean = true
  let cursor: string | undefined = undefined

  while(loop){
    if(cursor){
      retweetRequest.variables.cursor = cursor;
    }

    const res = await requestApi<TimelineData>(
        retweetRequest.toRequestUrl(),
        auth,
    );

    if (!res.success) {
      throw res.err;
    }

    if (!res.value) {
      return null;
    }

    let {next,values,previous} = parseEngagementimeline(res.value,'retweets');
    if(values.length == 0){
      loop = false;
      break;
    }

    cursor = next;
    retweetsAll = [...retweetsAll,...values];
  }

  return retweetsAll;
}
