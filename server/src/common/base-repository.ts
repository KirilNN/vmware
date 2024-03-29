import { GraphQLClient } from 'graphql-request';
import * as queries from './queries';
import * as rp from 'request-promise';
import * as path from 'path';
import { readFileSync } from 'fs';
export default class Repository<T> {
    private client: GraphQLClient;

    constructor() {
        const key = readFileSync(path.resolve(__dirname, '../auth/github.key'), 'utf-8');
        const buff = Buffer.from(key, 'base64');
        const token = buff.toString('ascii');

        this.client = new GraphQLClient('https://api.github.com/graphql', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    public getRepos = (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.client
                .request(queries.getRepos())
                .then((data: any) => resolve(data.organization.pinnedRepositories.edges))
                .catch(err => reject(err));
        });
    };

    public getGeneralInfo = (nameId: string) => (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.client
                .request(queries.getGeneralInfo(nameId))
                .then((data: any) => resolve(data))
                .catch(err => reject(err));
        });
    };

    public getPatch = (nameId: string, patchId: string) => (): Promise<any> => {
        // https://bit.ly/2VMJvbW
        // currently the Github GraphQL api does not expose such operation so using the v3 version for this endpoint

        const url = `https://github.com/vmware/${nameId}/commit/${patchId}.patch`;

        return new Promise((resolve, reject) => {
            rp(url)
                .then(body => resolve(body))
                .catch(err => reject(err));
        });
    };

    public getCommits = (nameId: string) => (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.client
                .request(queries.getCommits(nameId))
                .then((data: any) => resolve(data.repository.ref.target.history.edges))
                .catch(err => reject(err));
        });
    };
}
