import * as Hapi from 'hapi';
import IRoute from '../../helper/route';
import Logger from '../../helper/logger';
import UserController from './controller';

export default class UserRoutes implements IRoute {
    public async register(server: Hapi.Server): Promise<any> {
        return new Promise(resolve => {
            Logger.info('UserRoutes - Start adding user routes.');
            const controller = new UserController();

            server.route([
                {
                    method: 'POST',
                    path: '/auth',
                    options: {
                        handler: controller.auth,
                        description: 'Method that authenticates user and returns a token',
                        tags: ['api', 'auth'],
                        auth: false,
                        cors: {
                            origin: ['*']
                        }
                    },
                },
                {
                    method: 'GET',
                    path: '/api/repos',
                    options: {
                        handler: controller.getRepos,
                        description: 'Method that gets all pinned GitHub repos for organization',
                        tags: ['api', 'pinned'],
                        auth: 'token',
                    },
                },
                {
                    method: 'GET',
                    path: '/api/generalInfo/{nameId}',
                    options: {
                        handler: controller.getGeneralInfo,
                        description: 'Method that looks up a repository owner (ie. either a User or an Organization) by login.',
                        tags: ['api', 'info'],
                        auth: 'token',
                    },
                },
                {
                    method: 'GET',
                    path: '/api/patch/{nameId}/{patchId}',
                    options: {
                        handler: controller.getPatch,
                        description: 'Method that gets patches for a repo.',
                        tags: ['api', 'patch'],
                        auth: 'token',
                    },
                },
                {
                    method: 'GET',
                    path: '/api/commits/{nameId}',
                    options: {
                        handler: controller.getCommits,
                        description: 'Method that gets last 20 commits for repo VMWare organization repository.',
                        tags: ['api', 'commits'],
                        auth: 'token',
                    },
                }
            ]);

            Logger.info('UserRoutes - Finish adding user routes.');

            resolve();
        });
    }
}
