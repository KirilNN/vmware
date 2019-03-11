import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { db } from './db';

export interface IPayload {
    email: string;
    password: string;
}

class AuthService {
    private options = {
        issuer: 'VMWare',
        subject: 'somebody@vmware.com',
        audience: 'http://vmware.com',
        expiresIn: '30d', // 30 days validity
        algorithm: 'RS256', // RSASSA options[ "RS256", "RS384", "RS512" ]
    };

    public async sign(payload: IPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.checkCredentials(payload)) {
                const privateKEY = readFileSync(path.resolve(__dirname, './private.key'));
                try {
                    const token = jwt.sign(payload, privateKEY, this.options);
                    resolve(token);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject();
            }
        });
    }

    public async verify(token: string): Promise<string | object> {
        return new Promise((resolve, reject) => {
            const publicKEY = readFileSync(path.resolve(__dirname, './public.key'));
            try {
                const result = jwt.verify(token, publicKEY, this.options);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    private checkCredentials(payload: IPayload): boolean {
        return db.some(item => item.email === payload.email && item.password === payload.password);
    }
}

export default AuthService;
