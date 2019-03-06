import * as NodeCache from 'node-cache';
import { Promise as Bluebird } from 'bluebird';

class CacheService {
    private cache: NodeCache;
    constructor(ttlSeconds: number) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    public async get(key: string, storeFunction: any) {
        const get = Bluebird.promisify(this.cache.get)
        const value = await get(key);

        if (value) {
            return Bluebird.resolve(value);
        }

        return storeFunction()
            .then((result: NodeCache.Callback<NodeCache.Data>) => {
                this.cache.set(key, result);
                return result;
        });
    }

    public async del(keys: string | string[]) {
        const del = Bluebird.promisify(this.cache.del)
        return del(keys);
    }
}

export default CacheService;
