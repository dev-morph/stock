/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { KisAuthService } from './kis-auth.service';

@Injectable()
export class KisHttpService {
    constructor(private readonly http: HttpService, private readonly auth: KisAuthService) { }

    async get<T>(
        url: string,
        headers: Record<string, string> = {},
        params?: any,
    ): Promise<AxiosResponse<T>> {
        const token = await this.auth.getToken();
        return this.http.axiosRef.get<T>(url, {
            baseURL: process.env.KIS_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                appkey: process.env.KIS_APP_KEY!,
                appsecret: process.env.KIS_APP_SECRET!,
                tr_id: headers['tr_id'] ?? '', // 엔드포인트별 TR ID 지정
            },
            params,
        });
    }
}
