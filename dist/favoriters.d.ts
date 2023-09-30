import { TwitterAuth } from './auth';
export interface Favoriter {
    name?: string;
    id?: string;
}
export declare function getFavoriters(id: string, auth: TwitterAuth): Promise<Favoriter[] | null>;
//# sourceMappingURL=favoriters.d.ts.map