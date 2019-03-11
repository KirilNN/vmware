import { serverTest, extractPayload } from './helpers';

interface IUser {
    id?: string;
    age: number;
    name: string;
    lastName: string;
}

serverTest('[POST] /auth should return 401 status if no credentials', async (server, t) => {
    const response = await server.inject({
        method: 'POST',
        url: '/auth',
    });    

    t.equals(response.statusCode, 401, 'Status code is 401');
});

serverTest('[GET] /api/repos should return 401 status if no token', async (server, t) => {
    const response = await server.inject({
        method: 'GET',
        url: '/api/repos',
    });    

    t.equals(response.statusCode, 401, 'Status code is 401');
});

serverTest('[GET] /api/patch/{nameId}/{patchId} should return 401 status if no token', async (server, t) => {
    const response = await server.inject({
        method: 'GET',
        url: '/api/patch/foo/bar',
    });    

    t.equals(response.statusCode, 401, 'Status code is 401');
});

serverTest('[GET] /api/commits/{nameId} should return 401 status if no token', async (server, t) => {
    const response = await server.inject({
        method: 'GET',
        url: '/api/commits/foo',
    });    

    t.equals(response.statusCode, 401, 'Status code is 401');
});

serverTest('[GET] /api/generalInfo/{nameId} should return 401 status if no token', async (server, t) => {
    const response = await server.inject({
        method: 'GET',
        url: '/api/generalInfo/foo',
    });    

    t.equals(response.statusCode, 401, 'Status code is 401');
});
