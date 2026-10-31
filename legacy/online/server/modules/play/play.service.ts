import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';

import type { PlayTokenResponse } from '@shared/api.interface';

const SECRET = process.env.PLAY_TOKEN_SECRET ?? 'paiqiu-dev-secret';
const TTL_SECONDS = 300;

@Injectable()
export class PlayService {
  issueToken(userId: string, name: string): PlayTokenResponse {
    const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
    const payload = { uid: userId, name, exp };
    const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
    const sig = createHmac('sha256', SECRET).update(body).digest('base64url');
    return {
      token: `${body}.${sig}`,
      name,
      expiresAt: new Date(exp * 1000).toISOString(),
    };
  }
}
