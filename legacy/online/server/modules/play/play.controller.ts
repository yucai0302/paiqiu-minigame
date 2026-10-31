import { Controller, Get, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { NeedLogin } from '@lark-apaas/fullstack-nestjs-core';

import { PlayService } from './play.service';

@Controller('api/play')
@NeedLogin()
export class PlayController {
  constructor(private readonly playService: PlayService) {}

  @Get('config')
  getConfig() {
    return { wsUrl: process.env.GAME_WS_URL ?? '' };
  }

  @Post('token')
  issueToken(@Req() req: Request) {
    const { userId, userName } = req.userContext;
    return this.playService.issueToken(userId, userName || '玩家');
  }
}
