# 合成小程序头像：东京蓝球场背景 + 绿/珊瑚 Q 版角色 + 排球
# 2048 超采样绘制，输出 512 与 144
import math
from PIL import Image, ImageDraw, ImageFilter

S = 4  # 512 设计空间 -> 2048 画布
CANVAS = 512 * S

# 采样自游戏截图的色板
GREEN = (36, 197, 95, 255)      # 我方草绿
CORAL = (225, 67, 122, 255)     # 对手珊瑚
SKIN = (248, 203, 166, 255)     # 肤色
DARK = (43, 48, 64, 255)        # 深色（裤子/描边/五官）
CHEEK = (247, 166, 166, 255)    # 腮红
WHITE = (248, 248, 248, 255)
SHOE = (250, 250, 250, 255)
LINE_BLUE = (117, 143, 193, 255)  # 场地线蓝

img = Image.new('RGBA', (CANVAS, CANVAS))

# ---------- 背景：东京蓝渐变 ----------
bg = Image.new('RGBA', (CANVAS, CANVAS))
bp = bg.load()
top, bot = (20, 32, 56), (44, 74, 128)
for y in range(CANVAS):
    t = y / (CANVAS - 1)
    r = int(top[0] + (bot[0] - top[0]) * t)
    g = int(top[1] + (bot[1] - top[1]) * t)
    b = int(top[2] + (bot[2] - top[2]) * t)
    for x in range(CANVAS):
        bp[x, y] = (r, g, b, 255)
img.alpha_composite(bg)

# 中央聚光光晕
glow = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([100*S, 60*S, 420*S, 400*S], fill=(90, 140, 200, 85))
glow = glow.filter(ImageFilter.GaussianBlur(60*S))
img.alpha_composite(glow)

# 场地白线（弧线，模拟球场边界）
lines = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
ld = ImageDraw.Draw(lines)
ld.arc([256*S-430*S, 700*S-430*S, 256*S+430*S, 700*S+430*S],
       205, 335, fill=(255, 255, 255, 75), width=int(9*S))
ld.arc([256*S-330*S, 700*S-330*S, 256*S+330*S, 700*S+330*S],
       215, 325, fill=(255, 255, 255, 45), width=int(5*S))
ld.line([(0, 470*S), (512*S, 380*S)], fill=(255, 255, 255, 22), width=int(3*S))
img.alpha_composite(lines)


def rrect(d, box, radius, fill):
    d.rounded_rectangle(box, radius=radius, fill=fill)


def draw_char(base, cx, feet_y, h, body_color, hair=None, ring=None):
    """按游戏角色比例绘制 Q 版角色：头(40%)+身+裤+鞋"""
    d = ImageDraw.Draw(base)
    u = h / 290.0  # 以绿角色 290 高为基准的缩放
    # 脚下阴影 + 队伍光环
    if ring:
        d.ellipse([cx-95*u, feet_y-14*u, cx+95*u, feet_y+16*u],
                  outline=ring, width=max(2, int(6*u)))
    d.ellipse([cx-70*u, feet_y-8*u, cx+70*u, feet_y+10*u], fill=(10, 16, 28, 90))
    shoe_w, shoe_h = 42*u, 20*u
    leg_h = 34*u
    # 裤腿
    d.rounded_rectangle([cx-38*u, feet_y-shoe_h-leg_h, cx-6*u, feet_y-shoe_h+6*u],
                        radius=10*u, fill=DARK)
    d.rounded_rectangle([cx+6*u, feet_y-shoe_h-leg_h, cx+38*u, feet_y-shoe_h+6*u],
                        radius=10*u, fill=DARK)
    # 鞋
    d.rounded_rectangle([cx-46*u, feet_y-shoe_h, cx-4*u, feet_y],
                        radius=int(9*u), fill=SHOE)
    d.rounded_rectangle([cx+4*u, feet_y-shoe_h, cx+46*u, feet_y],
                        radius=int(9*u), fill=SHOE)
    # 身体（含手臂圆突）
    body_top = feet_y - shoe_h - leg_h - 108*u
    body_bot = feet_y - shoe_h - leg_h + 14*u
    rrect(d, [cx-80*u, body_top, cx+80*u, body_bot], 62*u, body_color)
    d.ellipse([cx-96*u, body_top+40*u, cx-48*u, body_top+96*u], fill=body_color)
    d.ellipse([cx+48*u, body_top+40*u, cx+96*u, body_top+96*u], fill=body_color)
    # 头
    head_r = 62*u
    head_cy = body_top - head_r + 26*u
    d.ellipse([cx-head_r, head_cy-head_r, cx+head_r, head_cy+head_r], fill=SKIN)
    # 发型
    if hair == 'cap':  # 绿角色：头顶细发际线
        d.arc([cx-head_r+3*u, head_cy-head_r+3*u, cx+head_r-3*u, head_cy+head_r-3*u],
              215, 325, fill=DARK, width=max(2, int(6*u)))
    elif hair == 'band':  # 珊瑚角色：深色头发+黄发带
        d.pieslice([cx-head_r, head_cy-head_r, cx+head_r, head_cy+head_r],
                   190, 350, fill=DARK)
        d.arc([cx-head_r+4*u, head_cy-head_r+4*u, cx+head_r-4*u, head_cy+head_r-4*u],
              200, 340, fill=(245, 190, 70, 255), width=max(2, int(9*u)))
    # 五官
    eye_dy = head_cy + 8*u
    d.ellipse([cx-28*u-7*u, eye_dy-10*u, cx-28*u+7*u, eye_dy+10*u], fill=DARK)
    d.ellipse([cx+28*u-7*u, eye_dy-10*u, cx+28*u+7*u, eye_dy+10*u], fill=DARK)
    d.arc([cx-20*u, eye_dy-8*u, cx+20*u, eye_dy+26*u], 20, 160,
          fill=DARK, width=max(2, int(5*u)))
    d.ellipse([cx-20*u, eye_dy+6*u, cx-14*u, eye_dy+12*u], fill=DARK)
    d.ellipse([cx+14*u, eye_dy+6*u, cx+20*u, eye_dy+12*u], fill=DARK)
    d.ellipse([cx-46*u, head_cy+26*u, cx-26*u, head_cy+42*u], fill=CHEEK)
    d.ellipse([cx+26*u, head_cy+26*u, cx+46*u, head_cy+42*u], fill=CHEEK)


# 绿色主角（大，带队伍光环）
draw_char(img, 225*S, 445*S, 290*S, GREEN, hair='cap', ring=(60, 220, 120, 170))
# 珊瑚对手（小，右侧偏后）
draw_char(img, 362*S, 402*S, 202*S, CORAL, hair='band')

# ---------- 排球 ----------
bx, by, br = 322*S, 96*S, 44*S
ball = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
bd = ImageDraw.Draw(ball)
bd.ellipse([bx-br+4*S, by-br+6*S, bx+br+4*S, by+br+6*S], fill=(170, 182, 200, 255))  # 投影
bd.ellipse([bx-br, by-br, bx+br, by+br], fill=WHITE)
# 十字排球缝线：两个正交椭圆轮廓，裁进球体
seams = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
sd = ImageDraw.Draw(seams)
sd.ellipse([bx-0.5*br, by-1.05*br, bx+0.5*br, by+1.05*br], outline=LINE_BLUE, width=int(2.6*S))
sd.ellipse([bx-1.05*br, by-0.5*br, bx+1.05*br, by+0.5*br], outline=LINE_BLUE, width=int(2.6*S))
clip = Image.new('L', (CANVAS, CANVAS), 0)
ImageDraw.Draw(clip).ellipse([bx-br+1*S, by-br+1*S, bx+br-1*S, by+br-1*S], fill=255)
seams.putalpha(Image.composite(seams.split()[3], Image.new('L', (CANVAS, CANVAS), 0), clip))
ball.alpha_composite(seams)
ball = ball.filter(ImageFilter.GaussianBlur(0.4*S))
img.alpha_composite(ball)

# ---------- 暗角（圆形裁切安全区外压暗） ----------
vig = Image.new('L', (CANVAS, CANVAS), 0)
vd = ImageDraw.Draw(vig)
vd.ellipse([CANVAS*0.5-CANVAS*0.52, CANVAS*0.5-CANVAS*0.52,
            CANVAS*0.5+CANVAS*0.52, CANVAS*0.5+CANVAS*0.52], fill=110)
vig = vig.filter(ImageFilter.GaussianBlur(40*S))
dark = Image.new('RGBA', (CANVAS, CANVAS), (8, 12, 22, 255))
img = Image.composite(img, dark, vig.point(lambda v: 255 - v))

# ---------- 输出 ----------
import os
os.makedirs('docs/assets', exist_ok=True)
src = img.convert('RGBA')
src.resize((512, 512), Image.LANCZOS).save('docs/assets/avatar-512.png')
src.resize((144, 144), Image.LANCZOS).save('docs/assets/avatar-144.png')

# 圆形裁切预览（模拟微信头像圆形展示）
def circle_preview(size):
    im = src.resize((size, size), Image.LANCZOS)
    mask = Image.new('L', (size*4, size*4), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size*4, size*4], fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out

prev = Image.new('RGBA', (360, 200), (245, 245, 245, 255))
prev.paste(circle_preview(180), (10, 10), circle_preview(180))
prev.paste(circle_preview(80), (210, 10), circle_preview(80))
p144 = Image.open('docs/assets/avatar-144.png').convert('RGBA')
prev.paste(p144, (250, 106), p144)
prev.convert('RGB').save('docs/assets/avatar-preview-circle.png')
print('done')
