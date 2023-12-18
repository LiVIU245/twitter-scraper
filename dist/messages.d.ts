import { RequestApiResult } from './api';
import { TwitterAuth } from './auth';
export interface Retweet {
    name?: string;
    id?: string;
}
export declare function sendDM(params: object, auth: TwitterAuth): Promise<RequestApiResult<any> | null>;
//# sourceMappingURL=messages.d.ts.map