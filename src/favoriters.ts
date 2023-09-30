import { addApiFeatures, requestApi } from './api';
import { TwitterAuth } from './auth';
import { apiRequestFactory } from './api-data';
import {parseEngagementimeline} from "./timeline-relationship";
import {TimelineData} from "./timeline-v2";

export interface Favoriter {
  name?: string;
  id?: string;
}

export async function getFavoriters(
    id: string,
    auth: TwitterAuth,
): Promise<Favoriter[] | null> {
  if (!auth.isLoggedIn()) {
    throw new Error('Scraper is not logged-in for profile following.');
  }

  const favoritersRequest = apiRequestFactory.createFavoritersRequest();
  favoritersRequest.variables.tweetId = id;
  favoritersRequest.variables.count = '20';

  let favoritersAll: Favoriter[] = []
  let loop: boolean = true
  let cursor: string | undefined = undefined

  while(loop){
    if(cursor){
      favoritersRequest.variables.cursor = cursor;
    }

    const res = await requestApi<TimelineData>(
        favoritersRequest.toRequestUrl(),
        auth,
    );

    if (!res.success) {
      throw res.err;
    }

    if (!res.value) {
      return null;
    }

    let {next,values,previous} = parseEngagementimeline(res.value,'favoriters');
    if(values.length == 0){
      loop = false;
      break;
    }

    cursor = next;
    favoritersAll = [...favoritersAll,...values];
  }

  return favoritersAll;
}
