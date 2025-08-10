/*
https://docs.nestjs.com/modules
*/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KisAuthService } from './kis-auth.service';
import { KisHttpService } from './kis-http.service';

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [KisHttpService, KisAuthService],
})
export class KisModule { }
