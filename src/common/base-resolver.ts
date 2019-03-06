import Repository from './base-repository';
import CacheService from '../cache/cache.service';
import AuthService, { Payload } from '../auth/auth.service';

export default class CrudResolver<T> {
    private cache: CacheService;
    private auth: AuthService;

    constructor(protected repository: Repository<T>) {
        this.cache = new CacheService(0); // Set corresponding TTL for prod
        this.auth = new AuthService();
    }

    public async getRepos(): Promise<T[]> {
        return this.cache.get('repos', this.repository.getRepos).then((result: any) => result);
    }

    public async getGeneralInfo(name: string): Promise<T[]> {
        return this.cache.get(`info_${name}`, this.repository.getGeneralInfo(name)).then((result: any) => result);
    }

    public async getPatch(patchId: string, nameId: string): Promise<T[]> {
        return this.cache.get(`info_${nameId}_${patchId}`, this.repository.getPatch(nameId, patchId)).then((result: any) => result);
    }

    public async getCommits(nameId: string): Promise<T[]> {
        return this.cache.get(`commits_${nameId}`, this.repository.getCommits(nameId)).then((result: any) => result);
    }

    public async getToken(payload: Payload): Promise<string> {
        return await this.auth.sign(payload);
    }
}
