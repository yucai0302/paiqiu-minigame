import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';

import type { PlayConfigResponse, PlayTokenResponse } from '@shared/api.interface';

export async function fetchPlayConfig(): Promise<PlayConfigResponse> {
  const res = await axiosForBackend({
    url: '/api/play/config',
    method: 'GET',
  });
  return res.data as PlayConfigResponse;
}

export async function fetchPlayToken(): Promise<PlayTokenResponse> {
  const res = await axiosForBackend({
    url: '/api/play/token',
    method: 'POST',
  });
  return res.data as PlayTokenResponse;
}
