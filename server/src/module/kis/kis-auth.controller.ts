/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { KisAuthService } from './kis-auth.service';

@Controller()
export class KisAuthController {
    constructor(private readonly kisAuthService: KisAuthService) { }

    @Post('kis/auth')
    async getToken() {
        const token = await this.kisAuthService.getToken();
        return token;
    }
}
