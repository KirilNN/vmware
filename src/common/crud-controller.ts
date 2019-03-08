import * as Hapi from 'hapi';
import * as Boom from 'boom';

import Utils from '../helper/utils';
import Logger from '../helper/logger';
import CrudResolver from '../common/base-resolver';

export default class CrudController<T> {
    constructor(private crudResolver: CrudResolver<T>) {}

    public getRepos = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const entities: T[] = await this.crudResolver.getRepos();

            return h.response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public getGeneralInfo = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const entities: T[] = await this.crudResolver.getGeneralInfo(request.params.nameId);

            return h.response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public getPatch = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);
            const { patchId, nameId } = request.params;
            const entities: T[] = await this.crudResolver.getPatch(patchId, nameId);
            
            return h
                .response({
                    statusCode: 200,
                    data: entities
                }).type("application/text");
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public getCommits = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const entities: T[] = await this.crudResolver.getCommits(request.params.nameId);

            return h.response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public auth = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);
            
            const { email, password } = JSON.parse(request.payload as string);
            const entities: string = await this.crudResolver.getToken({email, password });

            return h.response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return Boom.unauthorized(error);
        }
    };
}
