import { useEffect, useRef } from 'react';

import { Game } from '@client/src/game/game';
import type { OnlineSession } from '@client/src/game/game';
import type { PlayClient } from '@client/src/net/play-client';
import '@client/src/game/game.css';

interface GamePageProps {
  client?: PlayClient;
  seed?: number;
  slot?: number;
  names?: string[];
  onExit?: () => void;
}

const GamePage = ({ client, seed, slot, names, onExit }: GamePageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !fxRef.current) return;
    const online: OnlineSession | undefined =
      client && seed !== undefined && slot !== undefined && names
        ? { client, seed, slot, names }
        : undefined;
    const game = new Game(canvasRef.current, fxRef.current, { online, onExit });
    gameRef.current = game;
    return () => {
      game.dispose();
      gameRef.current = null;
    };
  }, [client, seed, slot, names, onExit]);

  return (
    <div className="game-root">
      <div id="app">
        <canvas id="scene" ref={canvasRef} />

        <div id="ui">
          <div className="hud-top">
            <div className="timer" id="timer">
              90
            </div>
            <div className="scoreboard">
              <div className="team home">HOME</div>
              <div className="score">
                <span id="score-home">0</span>
                <i>—</i>
                <span id="score-away">0</span>
              </div>
              <div className="team away">AWAY</div>
            </div>
            <div className="sb-sub">
              <span id="set-label">SET 1</span>
              <span id="dots" className="dots" />
              <span className="to">to 7</span>
            </div>
            <div className="set-dots" id="set-dots" />
          </div>

          <div id="announce" className="announce">
            <b />
            <span />
          </div>

          <div className="touch" id="touch">
            <span className="touch-label">触球</span>
            <div className="pips" id="touch-pips">
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="servebar" id="servebar">
            <span>蓄力</span>
            <div className="servebar-track">
              <div className="servebar-fill" id="serve-fill" />
            </div>
          </div>

          <div className="hint">
            <div>
              <kbd>W</kbd>
              <kbd>A</kbd>
              <kbd>S</kbd>
              <kbd>D</kbd> 移动
            </div>
            <div>
              <kbd>Shift</kbd> 冲刺扑救
            </div>
            <div>
              <kbd>Space</kbd> 跳跃
            </div>
            <div>
              <kbd>J</kbd> 击球（按住持续挥击）
            </div>
            <div>
              <kbd>K</kbd> 网前自动起跳拦网
            </div>
            <div>
              <kbd>Esc</kbd> 暂停
            </div>
          </div>

          <div id="fx-layer" ref={fxRef} />
        </div>

        <div className="screen" id="start">
          <div className="panel">
            <div className="logo">
              <span>Q</span>版排球
            </div>
            <p className="tagline">2v2 人机训练赛 · 先到 7 分 · 三局两胜</p>
            <div className="row">
              <span className="row-label">难度</span>
              <div className="seg" id="difficulty">
                <button data-skill="easy">简单</button>
                <button data-skill="normal" className="on">
                  普通
                </button>
                <button data-skill="hard">困难</button>
              </div>
            </div>
            <button className="btn primary" id="btn-start">
              开始比赛
            </button>
            <div className="keys">
              <span>
                <kbd>WASD</kbd> 移动
              </span>
              <span>
                <kbd>Shift</kbd> 冲刺 / 扑救
              </span>
              <span>
                <kbd>Space</kbd> 跳跃
              </span>
              <span>
                <kbd>J</kbd> 击球 / 扣球（可按住）
              </span>
              <span>
                <kbd>K</kbd> 网前拦网
              </span>
            </div>
            <p className="tip">球落下前把它打过网：一传垫给队友 → 二传托到网前 → 起跳扣杀</p>
          </div>
        </div>

        <div className="screen hidden" id="result">
          <div className="panel">
            <h2 id="result-title">胜利</h2>
            <p className="tagline" id="result-sub" />
            <div className="result-score" id="result-score">
              2 : 0
            </div>
            <div className="mvp" id="result-mvp" />
            <div className="row-btns">
              <button className="btn primary" id="btn-again">
                再来一局
              </button>
              <button className="btn" id="btn-home">
                返回大厅
              </button>
            </div>
          </div>
        </div>

        <div className="screen hidden" id="pause">
          <div className="panel">
            <h2>暂停</h2>
            <div className="row-btns">
              <button className="btn primary" id="btn-resume">
                继续比赛
              </button>
              <button className="btn" id="btn-quit">
                返回大厅
              </button>
            </div>
            <p className="tip">
              音效开关：<kbd>M</kbd>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
