import * as Hapi from 'hapi';

import Config from '../config';
import Logger from '../helper/logger';
import AuthService from '../auth/auth.service';
import Utils from '../helper/utils';

export default class Plugins {
    public static async status(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering status-monitor');

            await Plugins.register(server, {
                options: Config.status.options,
                plugin: require('hapijs-status-monitor'),
            });
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering status plugin: ${error}`);
        }
    }

    public static async swagger(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering swagger-ui');

            await Plugins.register(server, [
                require('vision'),
                require('inert'),
                {
                    options: Config.swagger.options,
                    plugin: require('hapi-swagger'),
                },
            ]);
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`);
        }
    }

    public static async boom(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering hapi-boom-decorators');

            await Plugins.register(server, {
                plugin: require('hapi-boom-decorators'),
            });
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering hapi-boom-decorators plugin: ${error}`);
        }
    }

    public static async jwt(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering hapi-auth-bearer-token');

            await Plugins.register(server, {
                plugin: require('hapi-auth-bearer-token'),
            });

            const auth = new AuthService();

            server.auth.strategy('token', 'bearer-access-token', {
                allowQueryToken: true,
                allowCookieToken: true,
                async validate(request: Hapi.Request, token: string) {
                    try {
                        Logger.info(`GET - ${Utils.getUrl(request)}`);
                        
                        const credentials = await auth.verify(token)

                        return { isValid: true, credentials };
                    } catch (error) {
                        return { isValid: false };
                    }
                },
            });

            server.auth.default('token');
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering hapi-auth-bearer-token: ${error}`);
        }
    }

    public static async registerAll(server: Hapi.Server): Promise<Error | any> {
        if (process.env.NODE_ENV === 'development') {
            await Plugins.status(server);
            await Plugins.swagger(server);
        }

        await Plugins.boom(server);
        await Plugins.jwt(server);
    }

    private static register(server: Hapi.Server, plugin: any): Promise<void> {
        Logger.debug('registering: ' + JSON.stringify(plugin));
        return new Promise((resolve, reject) => {
            server.register(plugin);
            resolve();
        });
    }
}
