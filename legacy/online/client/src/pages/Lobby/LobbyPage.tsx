import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCurrentUserProfile } from '@lark-apaas/client-toolkit/hooks/useCurrentUserProfile';
import { resolveAppUrl } from '@lark-apaas/client-toolkit/utils/resolveAppUrl';

import { fetchPlayConfig, fetchPlayToken } from '@client/src/api/play';
import { Button } from '@client/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@client/src/components/ui/card';
import { Input } from '@client/src/components/ui/input';
import { PlayClient } from '@client/src/net/play-client';
import type { RoomPlayerInfo, RoomState, StartInfo } from '@client/src/net/play-client';
import GamePage from '@client/src/pages/Game/GamePage';

type Phase = 'idle' | 'connecting' | 'room' | 'playing';

const sortBySlot = (players: RoomPlayerInfo[]): RoomPlayerInfo[] =>
  [...players].sort((a, b) => a.slot - b.slot);

const LobbyPage = () => {
  const navigate = useNavigate();
  const userInfo = useCurrentUserProfile();
  const initialCode = new URLSearchParams(window.location.search).get('room') ?? '';

  const [phase, setPhase] = useState<Phase>('idle');
  const [room, setRoom] = useState<RoomState | null>(null);
  const [start, setStart] = useState<StartInfo | null>(null);
  const [joinCode, setJoinCode] = useState(initialCode.replace(/\D/g, '').slice(0, 6));
  const [error, setError] = useState('');
  const clientRef = useRef<PlayClient | null>(null);
  const closingRef = useRef(false);

  const reset = useCallback((): void => {
    clientRef.current = null;
    closingRef.current = false;
    setPhase('idle');
    setRoom(null);
    setStart(null);
    setError('');
  }, []);

  useEffect(() => {
    return () => {
      closingRef.current = true;
      clientRef.current?.leave();
      clientRef.current = null;
    };
  }, []);

  const connect = async (action: 'create' | 'join', code = ''): Promise<void> => {
    setPhase('connecting');
    setError('');
    try {
      const [token, config] = await Promise.all([fetchPlayToken(), fetchPlayConfig()]);
      if (!config.wsUrl) {
        setPhase('idle');
        setError('对局服务地址未配置，请联系管理员');
        toast.error('对局服务地址未配置');
        return;
      }
      const client = new PlayClient(token.token, config.wsUrl, {
        onRoom: (next: RoomState): void => {
          setRoom(next);
          setPhase('room');
        },
        onStart: (info: StartInfo): void => {
          setStart(info);
          setPhase('playing');
        },
        onPeerLeft: (): void => {
          closingRef.current = true;
          toast.error('队友已离开房间');
          reset();
        },
        onError: (message: string): void => {
          closingRef.current = true;
          setError(message);
          toast.error(message);
          clientRef.current?.leave();
          reset();
          setError(message);
        },
        onClose: (): void => {
          if (closingRef.current) return;
          closingRef.current = true;
          reset();
          toast.error('与对局服务的连接已断开');
        },
      });
      clientRef.current = client;
      if (action === 'create') client.createRoom();
      else client.joinRoom(code);
    } catch (err) {
      setPhase('idle');
      setError('无法进入对局服务，请稍后重试');
      toast.error('无法进入对局服务，请稍后重试');
      void err;
    }
  };

  const handleLeave = (): void => {
    closingRef.current = true;
    clientRef.current?.leave();
    reset();
  };

  const handleExitGame = (): void => {
    handleLeave();
  };

  const copyInvite = async (code: string): Promise<void> => {
    try {
      const url = resolveAppUrl(`/?room=${code}`);
      await navigator.clipboard.writeText(`来打一局 Q版排球：${url}`);
      toast.success('邀请链接已复制');
    } catch {
      toast.error('复制失败，请手动记下房间码');
    }
  };

  if (phase === 'playing' && start && room && clientRef.current) {
    const names = sortBySlot(start.players).map((p: RoomPlayerInfo) => p.name);
    return (
      <GamePage
        client={clientRef.current}
        seed={start.seed}
        slot={room.you}
        names={names}
        onExit={handleExitGame}
      />
    );
  }

  const players = room ? sortBySlot(room.players) : [];
  const isHost = room?.you === 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black tracking-tight">Q版排球</span>
          <span className="text-sm text-muted-foreground">双人开黑 · 对战 AI</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {userInfo?.name ? `你好，${userInfo.name}` : '加载中…'}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <Card className="w-full max-w-md">
          {phase === 'idle' && (
            <>
              <CardHeader>
                <CardTitle>开一局</CardTitle>
                <CardDescription>
                  和同事组队，2 人一队对战 AI。先到 7 分，三局两胜。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Button className="w-full" size="lg" onClick={() => void connect('create')}>
                  创建房间
                </Button>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  或加入好友的房间
                  <span className="h-px flex-1 bg-border" />
                </div>

                <div className="flex gap-2">
                  <Input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="输入 6 位房间码"
                    inputMode="numeric"
                    maxLength={6}
                    aria-label="房间码"
                  />
                  <Button
                    variant="secondary"
                    disabled={joinCode.length !== 6}
                    onClick={() => void connect('join', joinCode)}
                  >
                    加入
                  </Button>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button variant="ghost" className="w-full" onClick={() => navigate('/play')}>
                  先单机练一局
                </Button>
              </CardContent>
            </>
          )}

          {phase === 'connecting' && (
            <CardContent className="py-16 text-center space-y-3">
              <p className="text-lg font-medium">正在进入对局服务…</p>
              <p className="text-sm text-muted-foreground">首次连接需要一秒钟</p>
            </CardContent>
          )}

          {phase === 'room' && room && (
            <>
              <CardHeader>
                <CardTitle>房间 {room.code}</CardTitle>
                <CardDescription>
                  {isHost ? '把房间码发给队友，等他就位后开赛' : '等房主开始比赛'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/40 px-4 py-3 flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold tracking-[0.3em]">{room.code}</span>
                  <Button size="sm" variant="secondary" onClick={() => void copyInvite(room.code)}>
                    复制邀请链接
                  </Button>
                </div>

                <div className="space-y-2">
                  {[0, 1].map((slot) => {
                    const player = players.find((p: RoomPlayerInfo) => p.slot === slot);
                    return (
                      <div
                        key={slot}
                        className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                      >
                        <span className="text-muted-foreground">{slot === 0 ? '房主' : '队友'}</span>
                        <span className={player ? 'font-medium' : 'text-muted-foreground'}>
                          {player ? player.name : '等待加入…'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {isHost ? (
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={players.length < 2}
                    onClick={() => clientRef.current?.start()}
                  >
                    {players.length < 2 ? '等队友进来' : '开始比赛'}
                  </Button>
                ) : (
                  <p className="text-center text-sm text-muted-foreground">房主准备好后会开赛</p>
                )}

                <Button variant="ghost" className="w-full" onClick={handleLeave}>
                  离开房间
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

export default LobbyPage;
