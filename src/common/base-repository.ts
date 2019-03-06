import { GraphQLClient } from 'graphql-request';
import * as queries from './queries';
import * as rp from 'request-promise';
import { Promise as Bluebird } from 'bluebird';
export default class Repository<T> {
    private client: GraphQLClient;

    constructor() {
        this.client = new GraphQLClient('https://api.github.com/graphql', {
            headers: {
                Authorization: 'Bearer 9ab304264cf6f75241ec353e2b568a71649ecc84',
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
        // https://github.community/t5/GitHub-API-Development-and/What-is-the-corresponding-object-in-GraphQL-API-v4-for-patch/td-p/14502 currently the Github GraphQL api 
        // does not expose such operation so using the v3 version for this endpoint

        const url = `https://github.com/vmware/${nameId}/commit/${patchId}.patch`;

        return new Promise((resolve, reject) => {
            rp(url)
                .then(body => resolve(body))
                .catch(err => reject(err))
        });
    };

    public getCommits = (nameId: string) => (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.client
                .request(queries.getCommits(nameId))
                .then((data: any) => resolve(data))
                .catch(err => reject(err));
        });
    };
}
