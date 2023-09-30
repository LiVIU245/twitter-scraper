import { TwitterAuth } from './auth';
export interface Retweet {
    name?: string;
    id?: string;
}
export declare function getRetweets(id: string, auth: TwitterAuth): Promise<Retweet[] | null>;
//# sourceMappingURL=retweets.d.ts.map