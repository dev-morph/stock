/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class KisAuthService {
    private accessToken?: string;
    private expAt?: number;

    constructor(private readonly http: HttpService) { }

    async getToken(): Promise<string> {
        if (this.accessToken && this.expAt && Date.now() < this.expAt - 60_000) {
            return this.accessToken;
        }
        // KIS 샘플 저장소의 kis_auth.py와 동일 개념: 앱키/시크릿로 토큰 발급 후 캐시
        // (정확한 토큰 엔드포인트/파라미터는 포털/샘플을 따르세요)
        const { data } = await this.http.axiosRef.post(
            `${process.env.KIS_BASE_URL}/oauth2/tokenP`,
            {
                grant_type: 'client_credentials',
                appkey: process.env.KIS_APP_KEY,
                appsecret: process.env.KIS_APP_SECRET,
            },
            { headers: { 'Content-Type': 'application/json' } },
        );

        console.log("TOKEN ---> ", data?.access_token);
        console.log("Data ---> ", data);

        this.accessToken = data?.access_token;

        return this.accessToken!;
    }
}
