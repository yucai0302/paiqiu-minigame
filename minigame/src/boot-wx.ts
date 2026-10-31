// 先安装 window/document 垫片，再加载 three 相关代码
import './platform/wx-shim';
import { boot } from './main';

void boot();
