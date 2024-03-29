import * as Hapi from 'hapi';
import * as DotEnv from 'dotenv';

import Logger from './helper/logger';
import Plugin from './plugin';
import Router from './router';

export default class Server {
    private static _instance: Hapi.Server;

    public static async start(): Promise<Hapi.Server> {
        try {
            DotEnv.config({
                path: `${process.cwd()}/.env`,
            });

            Server._instance = new Hapi.Server({
                port: 8080,
                routes: {
                    cors: true,
                },
            });

            await Plugin.registerAll(Server._instance);
            await Router.loadRoutes(Server._instance);
            await Server._instance.start();

            Logger.info('Server - Up and running!');
            Logger.info(`Visit: http://loclahost:8080/api/ for REST API`);
            Logger.info(`Visit: http://localhost:8080/documentation for Swagger docs`);

            return Server._instance;
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);

            throw error;
        }
    }

    public static stop(): Promise<Error | void> {
        Logger.info(`Server - Stopping!`);

        return Server._instance.stop();
    }

    public static async recycle(): Promise<Hapi.Server> {
        await Server.stop();

        return await Server.start();
    }

    public static instance(): Hapi.Server {
        return Server._instance;
    }

    public static async inject(options: string | Hapi.ServerInjectOptions): Promise<Hapi.ServerInjectResponse> {
        return await Server._instance.inject(options);
    }
}
