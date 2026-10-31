"use strict";(()=>{var Gh=Object.defineProperty;var va=(s,t)=>()=>(s&&(t=s(s=0)),t);var pl=(s,t)=>{for(var e in t)Gh(s,e,{get:t[e],enumerable:!0})};var xa,gn,en,Je,gl,vl,ml,Tn,xl,Ke,_a=va(()=>{"use strict";xa=typeof globalThis!="undefined"?globalThis:GameGlobal,gn=wx.createCanvas(),en=(wx.getWindowInfo?wx.getWindowInfo():wx.getSystemInfoSync())||{},Je={width:en.windowWidth||en.screenWidth||375,height:en.windowHeight||en.screenHeight||667,dpr:Math.min(en.pixelRatio||2,2),safeTop:en.safeArea?Math.max(0,en.safeArea.top||0):0,safeBottom:en.safeArea?Math.max(0,(en.windowHeight||en.screenHeight||0)-en.safeArea.bottom):0},gl=s=>typeof gn.requestAnimationFrame=="function"?gn.requestAnimationFrame(s):setTimeout(()=>s(Date.now()),16),vl=s=>{typeof gn.cancelAnimationFrame=="function"?gn.cancelAnimationFrame(s):clearTimeout(s)},ml=(s=1,t=1)=>wx.createOffscreenCanvas({type:"2d",width:s,height:t}),Tn={devicePixelRatio:Je.dpr,innerWidth:Je.width,innerHeight:Je.height,addEventListener(){},removeEventListener(){},requestAnimationFrame:gl,cancelAnimationFrame:vl,setTimeout,clearTimeout,setInterval,clearInterval,performance:{now:()=>Date.now()},navigator:{userAgent:"wechat-minigame",platform:"wechat"},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}};Tn.AudioContext=function(){return wx.createWebAudioContext?wx.createWebAudioContext():null};Tn.webkitAudioContext=Tn.AudioContext;xl={createElement(s){return s==="canvas"?ml():{style:{},appendChild(){},remove(){}}},createElementNS(s,t){return t==="canvas"?ml():{style:{}}},createTextNode(s){return{textContent:s}},documentElement:{style:{}},body:{style:{},appendChild(){}},addEventListener(){},removeEventListener(){}};Tn.document=xl;Ke=(s,t)=>{try{xa[s]=t}catch(e){}if(xa[s]!==t)try{Object.defineProperty(xa,s,{value:t,configurable:!0,writable:!0})}catch(e){}};Ke("window",Tn);Ke("self",Tn);Ke("document",xl);Ke("navigator",Tn.navigator);Ke("performance",Tn.performance);Ke("devicePixelRatio",Je.dpr);Ke("innerWidth",Je.width);Ke("innerHeight",Je.height);Ke("requestAnimationFrame",gl);Ke("cancelAnimationFrame",vl);Ke("AudioContext",Tn.AudioContext);Ke("Image",function(){return{}})});var Dh={};pl(Dh,{createWxPlatform:()=>D0});function D0(){return{canvas:gn,width:Je.width,height:Je.height,dpr:Je.dpr,safeTop:Je.safeTop,safeBottom:Je.safeBottom,createCanvas(s,t){return wx.createOffscreenCanvas({type:"2d",width:s,height:t})},raf(s){return typeof gn.requestAnimationFrame=="function"?gn.requestAnimationFrame(s):setTimeout(()=>s(Date.now()),16)},cancelRaf(s){typeof gn.cancelAnimationFrame=="function"?gn.cancelAnimationFrame(s):clearTimeout(s)},now:()=>Date.now(),createAudioContext(){return wx.createWebAudioContext?wx.createWebAudioContext():null},onTouchStart(s){wx.onTouchStart(t=>s(zs(t.changedTouches)))},onTouchMove(s){wx.onTouchMove(t=>s(zs(t.touches)))},onTouchEnd(s){wx.onTouchEnd(t=>s(zs(t.changedTouches),zs(t.touches)))},onTouchCancel(s){wx.onTouchCancel(t=>s(zs(t.touches)))},vibrateShort(){try{wx.vibrateShort({type:"light"})}catch(s){}}}}var zs,Uh=va(()=>{"use strict";_a();zs=s=>(s||[]).map(t=>({id:typeof t.identifier=="number"?t.identifier:0,x:t.clientX,y:t.clientY}))});var Nh={};pl(Nh,{createWebPlatform:()=>U0});function U0(){tn=document.getElementById("scene");let s=tn.clientWidth||390,t=tn.clientHeight||844,e=new Map;tn.addEventListener("contextmenu",i=>i.preventDefault()),tn.addEventListener("touchstart",i=>{i.preventDefault();let r=Array.from(i.changedTouches).map(a=>ol(a));r.forEach(a=>e.set(a.id,a)),pn.start.forEach(a=>a(r))}),tn.addEventListener("touchmove",i=>{i.preventDefault();for(let a of Array.from(i.changedTouches)){let o=ol(a);e.has(o.id)&&e.set(o.id,o)}let r=Array.from(e.values());pn.move.forEach(a=>a(r))}),tn.addEventListener("touchend",i=>{i.preventDefault();let r=Array.from(i.changedTouches).map(o=>ol(o));r.forEach(o=>e.delete(o.id));let a=Array.from(e.values());pn.end.forEach(o=>o(r,a))}),tn.addEventListener("touchcancel",()=>{e.clear(),pn.cancel.forEach(i=>i([]))});let n=-1;return tn.addEventListener("mousedown",i=>{if(n>=0)return;n=100;let r=al(i,n);e.set(r.id,r),pn.start.forEach(a=>a([r]))}),window.addEventListener("mousemove",i=>{if(n<0)return;let r=al(i,n);e.set(r.id,r),pn.move.forEach(a=>a(Array.from(e.values())))}),window.addEventListener("mouseup",i=>{if(n<0)return;let r=al(i,n);e.delete(r.id),pn.end.forEach(a=>a([r],Array.from(e.values()))),n=-1}),{canvas:tn,width:s,height:t,dpr:Math.min(window.devicePixelRatio||1,2),safeTop:0,safeBottom:0,createCanvas(i,r){let a=document.createElement("canvas");return a.width=i,a.height=r,a},raf:i=>window.requestAnimationFrame(i),cancelRaf:i=>window.cancelAnimationFrame(i),now:()=>performance.now(),createAudioContext(){var r;let i=(r=window.AudioContext)!=null?r:window.webkitAudioContext;return i?new i:null},onTouchStart(i){pn.start.push(i)},onTouchMove(i){pn.move.push(i)},onTouchEnd(i){pn.end.push(i)},onTouchCancel(i){pn.cancel.push(i)},vibrateShort(){var i;(i=navigator.vibrate)==null||i.call(navigator,10)}}}var al,tn,pn,ol,Oh=va(()=>{"use strict";al=(s,t)=>{let e=tn.getBoundingClientRect();return{id:t,x:s.clientX-e.left,y:s.clientY-e.top}};pn={start:[],move:[],end:[],cancel:[]},ol=s=>{let t=tn.getBoundingClientRect();return{id:s.identifier,x:s.clientX-t.left,y:s.clientY-t.top}}});_a();var Vs=class{constructor(t){this.createContext=t;this.ctx=null;this.master=null;this.sfx=null;this.music=null;this.noise=null;this.nextBeat=0;this.beat=0;this.bgmRunning=!1;this.muted=!1}unlock(){if(!this.ctx){let t=this.createContext?this.createContext():(()=>{var a;let r=(a=window.AudioContext)!=null?a:window.webkitAudioContext;return r?new r:null})();if(!t)return;this.ctx=t,this.master=t.createGain(),this.master.gain.value=this.muted?0:.85,this.master.connect(t.destination),this.sfx=t.createGain(),this.sfx.gain.value=.9,this.sfx.connect(this.master),this.music=t.createGain(),this.music.gain.value=.5,this.music.connect(this.master);let e=Math.floor(t.sampleRate*.3),n=t.createBuffer(1,e,t.sampleRate),i=n.getChannelData(0);for(let r=0;r<e;r++)i[r]=Math.random()*2-1;this.noise=n}this.ctx.state==="suspended"&&this.ctx.resume()}get isMuted(){return this.muted}toggleMute(){return this.muted=!this.muted,this.ctx&&this.master&&this.master.gain.setTargetAtTime(this.muted?0:.85,this.ctx.currentTime,.04),this.muted}startBgm(){this.ctx&&(this.bgmRunning||(this.bgmRunning=!0,this.nextBeat=this.ctx.currentTime+.2))}stopBgm(){this.bgmRunning=!1}tone(t){var o,l,c;let e=this.ctx,n=this.sfx;if(!e||!n)return;let i=e.currentTime+((o=t.delay)!=null?o:0),r=e.createOscillator(),a=e.createGain();r.type=(l=t.type)!=null?l:"sine",r.frequency.setValueAtTime(Math.max(20,t.freq),i),t.to&&r.frequency.exponentialRampToValueAtTime(Math.max(20,t.to),i+t.dur),a.gain.setValueAtTime(1e-4,i),a.gain.exponentialRampToValueAtTime(Math.max(.001,(c=t.gain)!=null?c:.2),i+.012),a.gain.exponentialRampToValueAtTime(1e-4,i+t.dur),r.connect(a).connect(n),r.start(i),r.stop(i+t.dur+.03)}noiseBurst(t){var l,c,h,u;let e=this.ctx,n=this.sfx;if(!e||!n||!this.noise)return;let i=e.currentTime+((l=t.delay)!=null?l:0),r=e.createBufferSource();r.buffer=this.noise;let a=e.createBiquadFilter();a.type=(c=t.type)!=null?c:"bandpass",a.frequency.value=t.freq,a.Q.value=(h=t.q)!=null?h:.9;let o=e.createGain();o.gain.setValueAtTime(Math.max(.001,(u=t.gain)!=null?u:.2),i),o.gain.exponentialRampToValueAtTime(1e-4,i+t.dur),r.connect(a).connect(o).connect(n),r.start(i),r.stop(i+t.dur+.02)}hit(t,e){let n=Math.min(1,Math.max(0,t/100));this.tone({freq:e?165:220,to:e?62:130,dur:e?.22:.14,type:"sine",gain:e?.4:.3}),this.noiseBurst({freq:800+n*1500,dur:.09,gain:e?.26:.18}),this.tone({freq:480+n*620,dur:.09,type:"triangle",gain:.12+n*.08,delay:.005})}jump(){this.tone({freq:320,to:520,dur:.11,type:"sine",gain:.09})}swing(){this.noiseBurst({freq:1100,q:.7,dur:.12,gain:.1})}dive(){this.noiseBurst({freq:500,dur:.22,gain:.12,type:"lowpass"})}serve(){this.noiseBurst({freq:1400,q:.6,dur:.18,gain:.18}),this.tone({freq:300,to:700,dur:.16,type:"triangle",gain:.12})}block(){this.tone({freq:180,to:90,dur:.16,type:"square",gain:.16}),this.noiseBurst({freq:320,dur:.14,gain:.2,type:"lowpass"})}net(){this.tone({freq:120,to:70,dur:.2,type:"sine",gain:.18}),this.noiseBurst({freq:260,dur:.16,gain:.1,type:"lowpass"})}land(){this.tone({freq:140,to:60,dur:.24,type:"sine",gain:.3}),this.noiseBurst({freq:420,dur:.2,gain:.18,type:"lowpass"})}tick(){this.tone({freq:660,dur:.09,type:"square",gain:.1})}whistle(){this.tone({freq:1750,dur:.12,type:"square",gain:.08}),this.tone({freq:2050,dur:.14,type:"square",gain:.08,delay:.13})}score(){[523.25,659.25,783.99].forEach((e,n)=>this.tone({freq:e,dur:.2,type:"triangle",gain:.16,delay:n*.075}))}fanfare(){[523.25,659.25,783.99,1046.5].forEach((e,n)=>this.tone({freq:e,dur:.32,type:"triangle",gain:.17,delay:n*.12}))}update(t){let e=this.ctx,n=this.music;if(!e||!n||!this.bgmRunning)return;let i=e.currentTime;for(this.nextBeat<i&&(this.nextBeat=i+.05);this.nextBeat<i+.35;)this.scheduleBeat(this.nextBeat,this.beat++),this.nextBeat+=.46}scheduleBeat(t,e){let n=this.ctx,i=this.music;if(!n||!i)return;let r=[130.81,174.61,146.83,196],a=r[Math.floor(e/8)%r.length];e%8===0&&[1,1.25,1.5].forEach(d=>{let f=n.createOscillator();f.type="sine",f.frequency.value=a*d*2;let g=n.createGain();g.gain.setValueAtTime(1e-4,t),g.gain.linearRampToValueAtTime(.028,t+1.1),g.gain.linearRampToValueAtTime(1e-4,t+4.2),f.connect(g).connect(i),f.start(t),f.stop(t+4.3)});let o=[0,4,7,12,7,4,2,4],l=o[e%o.length],c=a*4*Math.pow(2,l/12),h=n.createOscillator();h.type="triangle",h.frequency.value=c;let u=n.createGain();u.gain.setValueAtTime(1e-4,t),u.gain.exponentialRampToValueAtTime(.018,t+.02),u.gain.exponentialRampToValueAtTime(1e-4,t+.5),h.connect(u).connect(i),h.start(t),h.stop(t+.55)}};var Wh=0,_l=1,Xh=2;var jc=1,qh=2,In=3,Kn=0,Le=1,jt=2,Zn=0,Zi=1,Ki=2,yl=3,Ml=4,Yh=5,mi=100,Zh=101,$h=102,bl=103,Sl=104,Jh=200,Kh=201,jh=202,Qh=203,io=204,so=205,tu=206,eu=207,nu=208,iu=209,su=210,ru=211,au=212,ou=213,lu=214,cu=0,hu=1,uu=2,xr=3,du=4,fu=5,pu=6,mu=7,Qc=0,gu=1,vu=2,$n=0,xu=1,_u=2,yu=3,Mu=4,bu=5,Su=6,Eu=7;var th=300,ji=301,Qi=302,ro=303,ao=304,Zr=306,jn=1e3,an=1001,oo=1002,Be=1003,El=1004;var ds=1005;var we=1006,ya=1007;var vi=1008;var Jn=1009,Tu=1010,wu=1011,Ko=1012,eh=1013,Yn=1014,Dn=1015,Ts=1016,nh=1017,ih=1018,_i=1020,Au=1021,on=1023,Ru=1024,Cu=1025,yi=1026,ts=1027,Pu=1028,sh=1029,Iu=1030,rh=1031,ah=1033,Ma=33776,ba=33777,Sa=33778,Ea=33779,Tl=35840,wl=35841,Al=35842,Rl=35843,oh=36196,Cl=37492,Pl=37496,Il=37808,Ll=37809,Dl=37810,Ul=37811,Nl=37812,Ol=37813,Fl=37814,Bl=37815,zl=37816,Hl=37817,kl=37818,Vl=37819,Gl=37820,Wl=37821,Ta=36492,Xl=36494,ql=36495,Lu=36283,Yl=36284,Zl=36285,$l=36286;var _r=2300,yr=2301,wa=2302,Jl=2400,Kl=2401,jl=2402;var Du=3200,Uu=3201,lh=0,Nu=1,qn="",ae="srgb",ii="srgb-linear",jo="display-p3",$r="display-p3-linear",Mr="linear",ne="srgb",br="rec709",Sr="p3";var wi=7680;var Ql=519,Ou=512,Fu=513,Bu=514,ch=515,zu=516,Hu=517,ku=518,Vu=519,lo=35044;var tc="300 es",co=1035,Un=2e3,Er=2001,Qn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ec=1234567,ys=Math.PI/180,ws=180/Math.PI;function Nn(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[s&255]+Pe[s>>8&255]+Pe[s>>16&255]+Pe[s>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function ye(s,t,e){return Math.max(t,Math.min(e,s))}function Qo(s,t){return(s%t+t)%t}function Gu(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Wu(s,t,e){return s!==t?(e-s)/(t-s):0}function Ms(s,t,e){return(1-e)*s+e*t}function Xu(s,t,e,n){return Ms(s,t,1-Math.exp(-e*n))}function qu(s,t=1){return t-Math.abs(Qo(s,t*2)-t)}function Yu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Zu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function $u(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Ju(s,t){return s+Math.random()*(t-s)}function Ku(s){return s*(.5-Math.random())}function ju(s){s!==void 0&&(ec=s);let t=ec+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Qu(s){return s*ys}function td(s){return s*ws}function ho(s){return(s&s-1)===0&&s!==0}function ed(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Tr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function nd(s,t,e,n,i){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ln(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function $t(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Xe={DEG2RAD:ys,RAD2DEG:ws,generateUUID:Nn,clamp:ye,euclideanModulo:Qo,mapLinear:Gu,inverseLerp:Wu,lerp:Ms,damp:Xu,pingpong:qu,smoothstep:Yu,smootherstep:Zu,randInt:$u,randFloat:Ju,randFloatSpread:Ku,seededRandom:ju,degToRad:Qu,radToDeg:td,isPowerOfTwo:ho,ceilPowerOfTwo:ed,floorPowerOfTwo:Tr,setQuaternionFromProperEuler:nd,normalize:$t,denormalize:ln},at=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Nt=class s{constructor(t,e,n,i,r,a,o,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=i[0],m=i[3],p=i[6],M=i[1],v=i[4],S=i[7],R=i[2],w=i[5],A=i[8];return r[0]=a*x+o*M+l*R,r[3]=a*m+o*v+l*w,r[6]=a*p+o*S+l*A,r[1]=c*x+h*M+u*R,r[4]=c*m+h*v+u*w,r[7]=c*p+h*S+u*A,r[2]=d*x+f*M+g*R,r[5]=d*m+f*v+g*w,r[8]=d*p+f*S+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(o*n-i*a)*x,t[3]=d*x,t[4]=(h*e-i*l)*x,t[5]=(i*r-o*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Aa.makeScale(t,e)),this}rotate(t){return this.premultiply(Aa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Aa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Aa=new Nt;function hh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function wr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function id(){let s=wr("canvas");return s.style.display="block",s}var nc={};function uh(s){s in nc||(nc[s]=!0,console.warn(s))}var ic=new Nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),sc=new Nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Gs={[ii]:{transfer:Mr,primaries:br,toReference:s=>s,fromReference:s=>s},[ae]:{transfer:ne,primaries:br,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[$r]:{transfer:Mr,primaries:Sr,toReference:s=>s.applyMatrix3(sc),fromReference:s=>s.applyMatrix3(ic)},[jo]:{transfer:ne,primaries:Sr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(sc),fromReference:s=>s.applyMatrix3(ic).convertLinearToSRGB()}},sd=new Set([ii,$r]),Kt={enabled:!0,_workingColorSpace:ii,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!sd.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;let n=Gs[t].toReference,i=Gs[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Gs[s].primaries},getTransfer:function(s){return s===qn?Mr:Gs[s].transfer}};function $i(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ra(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ai,Ar=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ai===void 0&&(Ai=wr("canvas")),Ai.width=t.width,Ai.height=t.height;let n=Ai.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ai}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=wr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=$i(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($i(e[n]/255)*255):e[n]=$i(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},rd=0,Rr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Nn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ca(i[a].image)):r.push(Ca(i[a]))}else r=Ca(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ca(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?Ar.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ad=0,We=class s extends Qn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=an,i=an,r=we,a=vi,o=on,l=Jn,c=s.DEFAULT_ANISOTROPY,h=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Nn(),this.name="",this.source=new Rr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==th)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jn:t.x=t.x-Math.floor(t.x);break;case an:t.x=t.x<0?0:1;break;case oo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jn:t.y=t.y-Math.floor(t.y);break;case an:t.y=t.y<0?0:1;break;case oo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}};We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=th;We.DEFAULT_ANISOTROPY=1;var Me=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,S=(f+1)/2,R=(p+1)/2,w=(h+d)/4,A=(u+x)/4,P=(g+m)/4;return v>S&&v>R?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=w/n,r=A/n):S>R?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=w/i,r=P/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=A/r,i=P/r),this.set(n,i,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},uo=class extends Qn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:we,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);let r=new We(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Rr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},On=class extends uo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Cr=class extends We{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Be,this.minFilter=Be,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var fo=class extends We{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Be,this.minFilter=Be,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ti=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let m=1-o,p=l*d+c*f+h*g+u*x,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let R=Math.sqrt(v),w=Math.atan2(R,p*M);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}let S=o*M;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+x*S,m===1-o){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(rc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(rc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Pa.copy(this).projectOnVector(t),this.sub(Pa)}reflect(t){return this.sub(Pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Pa=new C,rc=new ti,Mi=class{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ws.copy(n.boundingBox)),Ws.applyMatrix4(t.matrixWorld),this.union(Ws)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),Xs.subVectors(this.max,fs),Ri.subVectors(t.a,fs),Ci.subVectors(t.b,fs),Pi.subVectors(t.c,fs),Hn.subVectors(Ci,Ri),kn.subVectors(Pi,Ci),li.subVectors(Ri,Pi);let e=[0,-Hn.z,Hn.y,0,-kn.z,kn.y,0,-li.z,li.y,Hn.z,0,-Hn.x,kn.z,0,-kn.x,li.z,0,-li.x,-Hn.y,Hn.x,0,-kn.y,kn.x,0,-li.y,li.x,0];return!Ia(e,Ri,Ci,Pi,Xs)||(e=[1,0,0,0,1,0,0,0,1],!Ia(e,Ri,Ci,Pi,Xs))?!1:(qs.crossVectors(Hn,kn),e=[qs.x,qs.y,qs.z],Ia(e,Ri,Ci,Pi,Xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},wn=[new C,new C,new C,new C,new C,new C,new C,new C],nn=new C,Ws=new Mi,Ri=new C,Ci=new C,Pi=new C,Hn=new C,kn=new C,li=new C,fs=new C,Xs=new C,qs=new C,ci=new C;function Ia(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ci.fromArray(s,r);let o=i.x*Math.abs(ci.x)+i.y*Math.abs(ci.y)+i.z*Math.abs(ci.z),l=t.dot(ci),c=e.dot(ci),h=n.dot(ci);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var od=new Mi,ps=new C,La=new C,bi=class{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):od.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);let e=ps.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ps,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(La.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(La)),this.expandByPoint(ps.copy(t.center).sub(La))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},An=new C,Da=new C,Ys=new C,Vn=new C,Ua=new C,Zs=new C,Na=new C,As=class{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Da.copy(t).add(e).multiplyScalar(.5),Ys.copy(e).sub(t).normalize(),Vn.copy(this.origin).sub(Da);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ys),o=Vn.dot(this.direction),l=-Vn.dot(Ys),c=Vn.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Da).addScaledVector(Ys,d),f}intersectSphere(t,e){An.subVectors(t.center,this.origin);let n=An.dot(this.direction),i=An.dot(An)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,i,r){Ua.subVectors(e,t),Zs.subVectors(n,t),Na.crossVectors(Ua,Zs);let a=this.direction.dot(Na),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vn.subVectors(this.origin,t);let l=o*this.direction.dot(Zs.crossVectors(Vn,Zs));if(l<0)return null;let c=o*this.direction.dot(Ua.cross(Vn));if(c<0||l+c>a)return null;let h=-o*Vn.dot(Na);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},oe=class s{constructor(t,e,n,i,r,a,o,l,c,h,u,d,f,g,x,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,x,m)}set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),a=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,f=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-x*c,e[9]=-o*l,e[2]=x-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d+x*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=x+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d-x*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=x-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,f=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ld,t,cd)}lookAt(t,e,n){let i=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Gn.crossVectors(n,Ve),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Gn.crossVectors(n,Ve)),Gn.normalize(),$s.crossVectors(Ve,Gn),i[0]=Gn.x,i[4]=$s.x,i[8]=Ve.x,i[1]=Gn.y,i[5]=$s.y,i[9]=Ve.y,i[2]=Gn.z,i[6]=$s.z,i[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],v=n[7],S=n[11],R=n[15],w=i[0],A=i[4],P=i[8],N=i[12],_=i[1],E=i[5],G=i[9],Z=i[13],I=i[2],W=i[6],V=i[10],$=i[14],X=i[3],q=i[7],tt=i[11],it=i[15];return r[0]=a*w+o*_+l*I+c*X,r[4]=a*A+o*E+l*W+c*q,r[8]=a*P+o*G+l*V+c*tt,r[12]=a*N+o*Z+l*$+c*it,r[1]=h*w+u*_+d*I+f*X,r[5]=h*A+u*E+d*W+f*q,r[9]=h*P+u*G+d*V+f*tt,r[13]=h*N+u*Z+d*$+f*it,r[2]=g*w+x*_+m*I+p*X,r[6]=g*A+x*E+m*W+p*q,r[10]=g*P+x*G+m*V+p*tt,r[14]=g*N+x*Z+m*$+p*it,r[3]=M*w+v*_+S*I+R*X,r[7]=M*A+v*E+S*W+R*q,r[11]=M*P+v*G+S*V+R*tt,r[15]=M*N+v*Z+S*$+R*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+x*(+e*l*f-e*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+m*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=u*m*c-x*d*c+x*l*f-o*m*f-u*l*p+o*d*p,v=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,S=h*x*c-g*u*c+g*o*f-a*x*f-h*o*p+a*u*p,R=g*u*l-h*x*l-g*o*d+a*x*d+h*o*m-a*u*m,w=e*M+n*v+i*S+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return t[0]=M*A,t[1]=(x*d*r-u*m*r-x*i*f+n*m*f+u*i*p-n*d*p)*A,t[2]=(o*m*r-x*l*r+x*i*c-n*m*c-o*i*p+n*l*p)*A,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*A,t[4]=v*A,t[5]=(h*m*r-g*d*r+g*i*f-e*m*f-h*i*p+e*d*p)*A,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*A,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*f+e*l*f)*A,t[8]=S*A,t[9]=(g*u*r-h*x*r-g*n*f+e*x*f+h*n*p-e*u*p)*A,t[10]=(a*x*r-g*o*r+g*n*c-e*x*c-a*n*p+e*o*p)*A,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*A,t[12]=R*A,t[13]=(h*x*i-g*u*i+g*n*d-e*x*d-h*n*m+e*u*m)*A,t[14]=(g*o*i-a*x*i-g*n*l+e*x*l+a*n*m-e*o*m)*A,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*A,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,x=a*h,m=a*u,p=o*u,M=l*c,v=l*h,S=l*u,R=n.x,w=n.y,A=n.z;return i[0]=(1-(x+p))*R,i[1]=(f+S)*R,i[2]=(g-v)*R,i[3]=0,i[4]=(f-S)*w,i[5]=(1-(d+p))*w,i[6]=(m+M)*w,i[7]=0,i[8]=(g+v)*A,i[9]=(m-M)*A,i[10]=(1-(d+x))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Ii.set(i[0],i[1],i[2]).length(),a=Ii.set(i[4],i[5],i[6]).length(),o=Ii.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],sn.copy(this);let c=1/r,h=1/a,u=1/o;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,e.setFromRotationMatrix(sn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Un){let l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),f,g;if(o===Un)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Er)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Un){let l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-r),d=(e+t)*c,f=(n+i)*h,g,x;if(o===Un)g=(a+r)*u,x=-2*u;else if(o===Er)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ii=new C,sn=new oe,ld=new C(0,0,0),cd=new C(1,1,1),Gn=new C,$s=new C,Ve=new C,ac=new oe,oc=new ti,xn=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ac.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ac,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oc.setFromEuler(this),this.setFromQuaternion(oc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER="XYZ";var Pr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},hd=0,lc=new C,Li=new ti,Rn=new oe,Js=new C,ms=new C,ud=new C,dd=new ti,cc=new C(1,0,0),hc=new C(0,1,0),uc=new C(0,0,1),fd={type:"added"},pd={type:"removed"},Oa={type:"childadded",child:null},Fa={type:"childremoved",child:null},be=class s extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new C,e=new xn,n=new ti,i=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new oe},normalMatrix:{value:new Nt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(cc,t)}rotateY(t){return this.rotateOnAxis(hc,t)}rotateZ(t){return this.rotateOnAxis(uc,t)}translateOnAxis(t,e){return lc.copy(t).applyQuaternion(this.quaternion),this.position.add(lc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(cc,t)}translateY(t){return this.translateOnAxis(hc,t)}translateZ(t){return this.translateOnAxis(uc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Js.copy(t):Js.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ms,Js,this.up):Rn.lookAt(Js,ms,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Li.setFromRotationMatrix(Rn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(fd),Oa.child=t,this.dispatchEvent(Oa),Oa.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pd),Fa.child=t,this.dispatchEvent(Fa),Fa.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,ud),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,dd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++){let o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};be.DEFAULT_UP=new C(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rn=new C,Cn=new C,Ba=new C,Pn=new C,Di=new C,Ui=new C,dc=new C,za=new C,Ha=new C,ka=new C,xi=class s{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),rn.subVectors(t,e),i.cross(rn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){rn.subVectors(i,e),Cn.subVectors(n,e),Ba.subVectors(t,e);let a=rn.dot(rn),o=rn.dot(Cn),l=rn.dot(Ba),c=Cn.dot(Cn),h=Cn.dot(Ba),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pn.x),l.addScaledVector(a,Pn.y),l.addScaledVector(o,Pn.z),l)}static isFrontFacing(t,e,n,i){return rn.subVectors(n,e),Cn.subVectors(t,e),rn.cross(Cn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),rn.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;Di.subVectors(i,n),Ui.subVectors(r,n),za.subVectors(t,n);let l=Di.dot(za),c=Ui.dot(za);if(l<=0&&c<=0)return e.copy(n);Ha.subVectors(t,i);let h=Di.dot(Ha),u=Ui.dot(Ha);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Di,a);ka.subVectors(t,r);let f=Di.dot(ka),g=Ui.dot(ka);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ui,o);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return dc.subVectors(r,i),o=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(dc,o);let p=1/(m+x+d);return a=x*p,o=d*p,e.copy(n).addScaledVector(Di,a).addScaledVector(Ui,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function Va(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Kt.workingColorSpace){if(t=Qo(t,1),e=ye(e,0,1),n=ye(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Va(a,r,t+1/3),this.g=Va(a,r,t),this.b=Va(a,r,t-1/3)}return Kt.toWorkingColorSpace(this,i),this}setStyle(t,e=ae){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ae){let n=dh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$i(t.r),this.g=$i(t.g),this.b=$i(t.b),this}copyLinearToSRGB(t){return this.r=Ra(t.r),this.g=Ra(t.g),this.b=Ra(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ae){return Kt.fromWorkingColorSpace(Ie.copy(this),t),Math.round(ye(Ie.r*255,0,255))*65536+Math.round(ye(Ie.g*255,0,255))*256+Math.round(ye(Ie.b*255,0,255))}getHexString(t=ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Ie.copy(this),e);let n=Ie.r,i=Ie.g,r=Ie.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=ae){Kt.fromWorkingColorSpace(Ie.copy(this),t);let e=Ie.r,n=Ie.g,i=Ie.b;return t!==ae?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Wn),this.setHSL(Wn.h+t,Wn.s+e,Wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wn),t.getHSL(Ks);let n=Ms(Wn.h,Ks.h,e),i=Ms(Wn.s,Ks.s,e),r=Ms(Wn.l,Ks.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new wt;wt.NAMES=dh;var md=0,_n=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=Zi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=io,this.blendDst=so,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wt(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==io&&(n.blendSrc=this.blendSrc),this.blendDst!==so&&(n.blendDst=this.blendDst),this.blendEquation!==mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Jt=class extends _n{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var pe=new C,js=new at,me=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=lo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return uh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),i=$t(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),i=$t(i,this.array),r=$t(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==lo&&(t.usage=this.usage),t}};var Ir=class extends me{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Lr=class extends me{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var qt=class extends me{constructor(t,e,n){super(new Float32Array(t),e,n)}},gd=0,je=new oe,Ga=new be,Ni=new C,Ge=new Mi,gs=new Mi,_e=new C,ce=class s extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hh(t)?Lr:Ir)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return Ga.lookAt(t),Ga.updateMatrix(),this.applyMatrix4(Ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){let n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];gs.setFromBufferAttribute(o),this.morphTargetsRelative?(_e.addVectors(Ge.min,gs.min),Ge.expandByPoint(_e),_e.addVectors(Ge.max,gs.max),Ge.expandByPoint(_e)):(Ge.expandByPoint(gs.min),Ge.expandByPoint(gs.max))}Ge.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)_e.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(_e));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)_e.fromBufferAttribute(o,c),l&&(Ni.fromBufferAttribute(t,c),_e.add(Ni)),i=Math.max(i,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new me(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new C,l[P]=new C;let c=new C,h=new C,u=new C,d=new at,f=new at,g=new at,x=new C,m=new C;function p(P,N,_){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,N),u.fromBufferAttribute(n,_),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,N),g.fromBufferAttribute(r,_),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let E=1/(f.x*g.y-g.x*f.y);isFinite(E)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(E),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(E),o[P].add(x),o[N].add(x),o[_].add(x),l[P].add(m),l[N].add(m),l[_].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let P=0,N=M.length;P<N;++P){let _=M[P],E=_.start,G=_.count;for(let Z=E,I=E+G;Z<I;Z+=3)p(t.getX(Z+0),t.getX(Z+1),t.getX(Z+2))}let v=new C,S=new C,R=new C,w=new C;function A(P){R.fromBufferAttribute(i,P),w.copy(R);let N=o[P];v.copy(N),v.sub(R.multiplyScalar(R.dot(N))).normalize(),S.crossVectors(w,N);let E=S.dot(l[P])<0?-1:1;a.setXYZW(P,v.x,v.y,v.z,E)}for(let P=0,N=M.length;P<N;++P){let _=M[P],E=_.start,G=_.count;for(let Z=E,I=E+G;Z<I;Z+=3)A(t.getX(Z+0)),A(t.getX(Z+1)),A(t.getX(Z+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new me(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},fc=new oe,hi=new As,Qs=new bi,pc=new C,Oi=new C,Fi=new C,Bi=new C,Wa=new C,tr=new C,er=new at,nr=new at,ir=new at,mc=new C,gc=new C,vc=new C,sr=new C,rr=new C,rt=class extends be{constructor(t=new ce,e=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){tr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Wa.fromBufferAttribute(u,t),a?tr.addScaledVector(Wa,h):tr.addScaledVector(Wa.sub(e),h))}e.add(tr)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qs.copy(n.boundingSphere),Qs.applyMatrix4(r),hi.copy(t.ray).recast(t.near),!(Qs.containsPoint(hi.origin)===!1&&(hi.intersectSphere(Qs,pc)===null||hi.origin.distanceToSquared(pc)>(t.far-t.near)**2))&&(fc.copy(r).invert(),hi.copy(t.ray).applyMatrix4(fc),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,R=v;S<R;S+=3){let w=o.getX(S),A=o.getX(S+1),P=o.getX(S+2);i=ar(this,p,t,n,c,h,u,w,A,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let M=o.getX(m),v=o.getX(m+1),S=o.getX(m+2);i=ar(this,a,t,n,c,h,u,M,v,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,R=v;S<R;S+=3){let w=S,A=S+1,P=S+2;i=ar(this,p,t,n,c,h,u,w,A,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let M=m,v=m+1,S=m+2;i=ar(this,a,t,n,c,h,u,M,v,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function vd(s,t,e,n,i,r,a,o){let l;if(t.side===Le?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Kn,o),l===null)return null;rr.copy(o),rr.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(rr);return c<e.near||c>e.far?null:{distance:c,point:rr.clone(),object:s}}function ar(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Oi),s.getVertexPosition(l,Fi),s.getVertexPosition(c,Bi);let h=vd(s,t,e,n,Oi,Fi,Bi,sr);if(h){i&&(er.fromBufferAttribute(i,o),nr.fromBufferAttribute(i,l),ir.fromBufferAttribute(i,c),h.uv=xi.getInterpolation(sr,Oi,Fi,Bi,er,nr,ir,new at)),r&&(er.fromBufferAttribute(r,o),nr.fromBufferAttribute(r,l),ir.fromBufferAttribute(r,c),h.uv1=xi.getInterpolation(sr,Oi,Fi,Bi,er,nr,ir,new at)),a&&(mc.fromBufferAttribute(a,o),gc.fromBufferAttribute(a,l),vc.fromBufferAttribute(a,c),h.normal=xi.getInterpolation(sr,Oi,Fi,Bi,mc,gc,vc,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new C,materialIndex:0};xi.getNormal(Oi,Fi,Bi,u.normal),h.face=u}return h}var cn=class s extends ce{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function g(x,m,p,M,v,S,R,w,A,P,N){let _=S/A,E=R/P,G=S/2,Z=R/2,I=w/2,W=A+1,V=P+1,$=0,X=0,q=new C;for(let tt=0;tt<V;tt++){let it=tt*E-Z;for(let dt=0;dt<W;dt++){let Pt=dt*_-G;q[x]=Pt*M,q[m]=it*v,q[p]=I,c.push(q.x,q.y,q.z),q[x]=0,q[m]=0,q[p]=w>0?1:-1,h.push(q.x,q.y,q.z),u.push(dt/A),u.push(1-tt/P),$+=1}}for(let tt=0;tt<P;tt++)for(let it=0;it<A;it++){let dt=d+it+W*tt,Pt=d+it+W*(tt+1),H=d+(it+1)+W*(tt+1),K=d+(it+1)+W*tt;l.push(dt,Pt,K),l.push(Pt,H,K),X+=6}o.addGroup(f,X,N),f+=X,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function es(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Fe(s){let t={};for(let e=0;e<s.length;e++){let n=es(s[e]);for(let i in n)t[i]=n[i]}return t}function xd(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function fh(s){return s.getRenderTarget()===null?s.outputColorSpace:Kt.workingColorSpace}var _d={clone:es,merge:Fe},yd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Md=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yn=class extends _n{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yd,this.fragmentShader=Md,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=es(t.uniforms),this.uniformsGroups=xd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Dr=class extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Un}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Xn=new C,xc=new at,_c=new at,ze=class extends Dr{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xn.x,Xn.y).multiplyScalar(-t/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xn.x,Xn.y).multiplyScalar(-t/Xn.z)}getViewSize(t,e){return this.getViewBounds(t,xc,_c),e.subVectors(_c,xc)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ys*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},zi=-90,Hi=1,po=class extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new ze(zi,Hi,t,e);i.layers=this.layers,this.add(i);let r=new ze(zi,Hi,t,e);r.layers=this.layers,this.add(r);let a=new ze(zi,Hi,t,e);a.layers=this.layers,this.add(a);let o=new ze(zi,Hi,t,e);o.layers=this.layers,this.add(o);let l=new ze(zi,Hi,t,e);l.layers=this.layers,this.add(l);let c=new ze(zi,Hi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ur=class extends We{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ji,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},mo=class extends On{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ur(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:we}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new cn(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:Zn});r.uniforms.tEquirect.value=e;let a=new rt(i,r),o=e.minFilter;return e.minFilter===vi&&(e.minFilter=we),new po(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Xa=new C,bd=new C,Sd=new Nt,Ln=class{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Xa.subVectors(n,e).cross(bd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Xa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Sd.getNormalMatrix(t),i=this.coplanarPoint(Xa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ui=new bi,or=new C,Rs=class{constructor(t=new Ln,e=new Ln,n=new Ln,i=new Ln,r=new Ln,a=new Ln){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un){let n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],x=i[10],m=i[11],p=i[12],M=i[13],v=i[14],S=i[15];if(n[0].setComponents(l-r,d-c,m-f,S-p).normalize(),n[1].setComponents(l+r,d+c,m+f,S+p).normalize(),n[2].setComponents(l+a,d+h,m+g,S+M).normalize(),n[3].setComponents(l-a,d-h,m-g,S-M).normalize(),n[4].setComponents(l-o,d-u,m-x,S-v).normalize(),e===Un)n[5].setComponents(l+o,d+u,m+x,S+v).normalize();else if(e===Er)n[5].setComponents(o,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(t){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(or.x=i.normal.x>0?t.max.x:t.min.x,or.y=i.normal.y>0?t.max.y:t.min.y,or.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(or)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function ph(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Ed(s,t){let e=t.isWebGL2,n=new WeakMap;function i(c,h){let u=c.array,d=c.usage,f=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),c.onUploadCallback();let x;if(u instanceof Float32Array)x=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)x=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=s.SHORT;else if(u instanceof Uint32Array)x=s.UNSIGNED_INT;else if(u instanceof Int32Array)x=s.INT;else if(u instanceof Int8Array)x=s.BYTE;else if(u instanceof Uint8Array)x=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,u){let d=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,c),f.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let x=0,m=g.length;x<m;x++){let p=g[x];e?s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}var Se=class s extends ce{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let M=p*d-a;for(let v=0;v<c;v++){let S=v*u-r;g.push(S,-M,0),x.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let v=M+c*p,S=M+c*(p+1),R=M+1+c*(p+1),w=M+1+c*p;f.push(v,S,w),f.push(S,R,w)}this.setIndex(f),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(x,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Td=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ad=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Id=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ld=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dd=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ud=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Nd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Od=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Zd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$d=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ef="gl_FragColor = linearToOutputTexel( gl_FragColor );",nf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,sf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,af=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,of=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,df=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ff=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,pf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,mf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_f=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ef=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Af=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Rf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,If=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Lf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Df=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Of=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ff=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Vf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Gf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Wf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$f=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ep=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,np=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,op=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,cp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,up=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_p=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ap=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ip=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Up=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Np=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$p=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Kp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:Td,alphahash_pars_fragment:wd,alphamap_fragment:Ad,alphamap_pars_fragment:Rd,alphatest_fragment:Cd,alphatest_pars_fragment:Pd,aomap_fragment:Id,aomap_pars_fragment:Ld,batching_pars_vertex:Dd,batching_vertex:Ud,begin_vertex:Nd,beginnormal_vertex:Od,bsdfs:Fd,iridescence_fragment:Bd,bumpmap_pars_fragment:zd,clipping_planes_fragment:Hd,clipping_planes_pars_fragment:kd,clipping_planes_pars_vertex:Vd,clipping_planes_vertex:Gd,color_fragment:Wd,color_pars_fragment:Xd,color_pars_vertex:qd,color_vertex:Yd,common:Zd,cube_uv_reflection_fragment:$d,defaultnormal_vertex:Jd,displacementmap_pars_vertex:Kd,displacementmap_vertex:jd,emissivemap_fragment:Qd,emissivemap_pars_fragment:tf,colorspace_fragment:ef,colorspace_pars_fragment:nf,envmap_fragment:sf,envmap_common_pars_fragment:rf,envmap_pars_fragment:af,envmap_pars_vertex:of,envmap_physical_pars_fragment:_f,envmap_vertex:lf,fog_vertex:cf,fog_pars_vertex:hf,fog_fragment:uf,fog_pars_fragment:df,gradientmap_pars_fragment:ff,lightmap_fragment:pf,lightmap_pars_fragment:mf,lights_lambert_fragment:gf,lights_lambert_pars_fragment:vf,lights_pars_begin:xf,lights_toon_fragment:yf,lights_toon_pars_fragment:Mf,lights_phong_fragment:bf,lights_phong_pars_fragment:Sf,lights_physical_fragment:Ef,lights_physical_pars_fragment:Tf,lights_fragment_begin:wf,lights_fragment_maps:Af,lights_fragment_end:Rf,logdepthbuf_fragment:Cf,logdepthbuf_pars_fragment:Pf,logdepthbuf_pars_vertex:If,logdepthbuf_vertex:Lf,map_fragment:Df,map_pars_fragment:Uf,map_particle_fragment:Nf,map_particle_pars_fragment:Of,metalnessmap_fragment:Ff,metalnessmap_pars_fragment:Bf,morphinstance_vertex:zf,morphcolor_vertex:Hf,morphnormal_vertex:kf,morphtarget_pars_vertex:Vf,morphtarget_vertex:Gf,normal_fragment_begin:Wf,normal_fragment_maps:Xf,normal_pars_fragment:qf,normal_pars_vertex:Yf,normal_vertex:Zf,normalmap_pars_fragment:$f,clearcoat_normal_fragment_begin:Jf,clearcoat_normal_fragment_maps:Kf,clearcoat_pars_fragment:jf,iridescence_pars_fragment:Qf,opaque_fragment:tp,packing:ep,premultiplied_alpha_fragment:np,project_vertex:ip,dithering_fragment:sp,dithering_pars_fragment:rp,roughnessmap_fragment:ap,roughnessmap_pars_fragment:op,shadowmap_pars_fragment:lp,shadowmap_pars_vertex:cp,shadowmap_vertex:hp,shadowmask_pars_fragment:up,skinbase_vertex:dp,skinning_pars_vertex:fp,skinning_vertex:pp,skinnormal_vertex:mp,specularmap_fragment:gp,specularmap_pars_fragment:vp,tonemapping_fragment:xp,tonemapping_pars_fragment:_p,transmission_fragment:yp,transmission_pars_fragment:Mp,uv_pars_fragment:bp,uv_pars_vertex:Sp,uv_vertex:Ep,worldpos_vertex:Tp,background_vert:wp,background_frag:Ap,backgroundCube_vert:Rp,backgroundCube_frag:Cp,cube_vert:Pp,cube_frag:Ip,depth_vert:Lp,depth_frag:Dp,distanceRGBA_vert:Up,distanceRGBA_frag:Np,equirect_vert:Op,equirect_frag:Fp,linedashed_vert:Bp,linedashed_frag:zp,meshbasic_vert:Hp,meshbasic_frag:kp,meshlambert_vert:Vp,meshlambert_frag:Gp,meshmatcap_vert:Wp,meshmatcap_frag:Xp,meshnormal_vert:qp,meshnormal_frag:Yp,meshphong_vert:Zp,meshphong_frag:$p,meshphysical_vert:Jp,meshphysical_frag:Kp,meshtoon_vert:jp,meshtoon_frag:Qp,points_vert:tm,points_frag:em,shadow_vert:nm,shadow_frag:im,sprite_vert:sm,sprite_frag:rm},nt={common:{diffuse:{value:new wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new wt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},vn={basic:{uniforms:Fe([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Fe([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new wt(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Fe([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new wt(0)},specular:{value:new wt(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Fe([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Fe([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new wt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Fe([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Fe([nt.points,nt.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Fe([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Fe([nt.common,nt.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Fe([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Fe([nt.sprite,nt.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:Fe([nt.common,nt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:Fe([nt.lights,nt.fog,{color:{value:new wt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};vn.physical={uniforms:Fe([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new wt(0)},specularColor:{value:new wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};var lr={r:0,b:0,g:0},di=new xn,am=new oe;function om(s,t,e,n,i,r,a){let o=new wt(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let M=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?e:t).get(v)),v===null?x(o,l):v&&v.isColor&&(x(v,1),M=!0);let S=s.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Zr)?(h===void 0&&(h=new rt(new cn(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:es(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),di.copy(p.backgroundRotation),di.x*=-1,di.y*=-1,di.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(am.makeRotationFromEuler(di)),h.material.toneMapped=Kt.getTransfer(v.colorSpace)!==ne,(u!==v||d!==v.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new rt(new Se(2,2),new yn({name:"BackgroundMaterial",uniforms:es(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(v.colorSpace)!==ne,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,p){m.getRGB(lr,fh(s)),n.buffers.color.setClear(lr.r,lr.g,lr.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(o,l)},render:g}}function lm(s,t,e,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null),c=l,h=!1;function u(I,W,V,$,X){let q=!1;if(a){let tt=x($,V,W);c!==tt&&(c=tt,f(c.object)),q=p(I,$,V,X),q&&M(I,$,V,X)}else{let tt=W.wireframe===!0;(c.geometry!==$.id||c.program!==V.id||c.wireframe!==tt)&&(c.geometry=$.id,c.program=V.id,c.wireframe=tt,q=!0)}X!==null&&e.update(X,s.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,P(I,W,V,$),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(I){return n.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function x(I,W,V){let $=V.wireframe===!0,X=o[I.id];X===void 0&&(X={},o[I.id]=X);let q=X[W.id];q===void 0&&(q={},X[W.id]=q);let tt=q[$];return tt===void 0&&(tt=m(d()),q[$]=tt),tt}function m(I){let W=[],V=[],$=[];for(let X=0;X<i;X++)W[X]=0,V[X]=0,$[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:V,attributeDivisors:$,object:I,attributes:{},index:null}}function p(I,W,V,$){let X=c.attributes,q=W.attributes,tt=0,it=V.getAttributes();for(let dt in it)if(it[dt].location>=0){let H=X[dt],K=q[dt];if(K===void 0&&(dt==="instanceMatrix"&&I.instanceMatrix&&(K=I.instanceMatrix),dt==="instanceColor"&&I.instanceColor&&(K=I.instanceColor)),H===void 0||H.attribute!==K||K&&H.data!==K.data)return!0;tt++}return c.attributesNum!==tt||c.index!==$}function M(I,W,V,$){let X={},q=W.attributes,tt=0,it=V.getAttributes();for(let dt in it)if(it[dt].location>=0){let H=q[dt];H===void 0&&(dt==="instanceMatrix"&&I.instanceMatrix&&(H=I.instanceMatrix),dt==="instanceColor"&&I.instanceColor&&(H=I.instanceColor));let K={};K.attribute=H,H&&H.data&&(K.data=H.data),X[dt]=K,tt++}c.attributes=X,c.attributesNum=tt,c.index=$}function v(){let I=c.newAttributes;for(let W=0,V=I.length;W<V;W++)I[W]=0}function S(I){R(I,0)}function R(I,W){let V=c.newAttributes,$=c.enabledAttributes,X=c.attributeDivisors;V[I]=1,$[I]===0&&(s.enableVertexAttribArray(I),$[I]=1),X[I]!==W&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,W),X[I]=W)}function w(){let I=c.newAttributes,W=c.enabledAttributes;for(let V=0,$=W.length;V<$;V++)W[V]!==I[V]&&(s.disableVertexAttribArray(V),W[V]=0)}function A(I,W,V,$,X,q,tt){tt===!0?s.vertexAttribIPointer(I,W,V,X,q):s.vertexAttribPointer(I,W,V,$,X,q)}function P(I,W,V,$){if(n.isWebGL2===!1&&(I.isInstancedMesh||$.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();let X=$.attributes,q=V.getAttributes(),tt=W.defaultAttributeValues;for(let it in q){let dt=q[it];if(dt.location>=0){let Pt=X[it];if(Pt===void 0&&(it==="instanceMatrix"&&I.instanceMatrix&&(Pt=I.instanceMatrix),it==="instanceColor"&&I.instanceColor&&(Pt=I.instanceColor)),Pt!==void 0){let H=Pt.normalized,K=Pt.itemSize,ut=e.get(Pt);if(ut===void 0)continue;let Et=ut.buffer,vt=ut.type,ft=ut.bytesPerElement,Zt=n.isWebGL2===!0&&(vt===s.INT||vt===s.UNSIGNED_INT||Pt.gpuType===eh);if(Pt.isInterleavedBufferAttribute){let Tt=Pt.data,U=Tt.stride,Ee=Pt.offset;if(Tt.isInstancedInterleavedBuffer){for(let _t=0;_t<dt.locationSize;_t++)R(dt.location+_t,Tt.meshPerAttribute);I.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Tt.meshPerAttribute*Tt.count)}else for(let _t=0;_t<dt.locationSize;_t++)S(dt.location+_t);s.bindBuffer(s.ARRAY_BUFFER,Et);for(let _t=0;_t<dt.locationSize;_t++)A(dt.location+_t,K/dt.locationSize,vt,H,U*ft,(Ee+K/dt.locationSize*_t)*ft,Zt)}else{if(Pt.isInstancedBufferAttribute){for(let Tt=0;Tt<dt.locationSize;Tt++)R(dt.location+Tt,Pt.meshPerAttribute);I.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Pt.meshPerAttribute*Pt.count)}else for(let Tt=0;Tt<dt.locationSize;Tt++)S(dt.location+Tt);s.bindBuffer(s.ARRAY_BUFFER,Et);for(let Tt=0;Tt<dt.locationSize;Tt++)A(dt.location+Tt,K/dt.locationSize,vt,H,K*ft,K/dt.locationSize*Tt*ft,Zt)}}else if(tt!==void 0){let H=tt[it];if(H!==void 0)switch(H.length){case 2:s.vertexAttrib2fv(dt.location,H);break;case 3:s.vertexAttrib3fv(dt.location,H);break;case 4:s.vertexAttrib4fv(dt.location,H);break;default:s.vertexAttrib1fv(dt.location,H)}}}}w()}function N(){G();for(let I in o){let W=o[I];for(let V in W){let $=W[V];for(let X in $)g($[X].object),delete $[X];delete W[V]}delete o[I]}}function _(I){if(o[I.id]===void 0)return;let W=o[I.id];for(let V in W){let $=W[V];for(let X in $)g($[X].object),delete $[X];delete W[V]}delete o[I.id]}function E(I){for(let W in o){let V=o[W];if(V[I.id]===void 0)continue;let $=V[I.id];for(let X in $)g($[X].object),delete $[X];delete V[I.id]}}function G(){Z(),h=!0,c!==l&&(c=l,f(c.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:G,resetDefaultState:Z,dispose:N,releaseStatesOfGeometry:_,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:S,disableUnusedAttributes:w}}function cm(s,t,e,n){let i=n.isWebGL2,r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,d){if(d===0)return;let f,g;if(i)f=s,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),e.update(u,r,d)}function c(h,u,d){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function hm(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),x=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,S=a||t.has("OES_texture_float"),R=v&&S,w=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:R,maxSamples:w}}function um(s){let t=this,e=null,n=0,i=!1,r=!1,a=new Ln,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,v=M*4,S=p.clippingState||null;l.value=S,S=h(g,d,v,f);for(let R=0;R!==v;++R)S[R]=e[R];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,S=f;v!==x;++v,S+=4)a.copy(u[v]).applyMatrix4(M,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function dm(s){let t=new WeakMap;function e(a,o){return o===ro?a.mapping=ji:o===ao&&(a.mapping=Qi),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===ro||o===ao)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new mo(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ns=class extends Dr{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},qi=4,yc=[.125,.215,.35,.446,.526,.582],gi=20,qa=new ns,Mc=new wt,Ya=null,Za=0,$a=0,pi=(1+Math.sqrt(5))/2,ki=1/pi,bc=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,pi,ki),new C(0,pi,-ki),new C(ki,0,pi),new C(-ki,0,pi),new C(pi,ki,0),new C(-pi,ki,0)],Nr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ya=this._renderer.getRenderTarget(),Za=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ya,Za,$a),t.scissorTest=!1,cr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ji||t.mapping===Qi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ya=this._renderer.getRenderTarget(),Za=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:we,minFilter:we,generateMipmaps:!1,type:Ts,format:on,colorSpace:ii,depthBuffer:!1},i=Sc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fm(r)),this._blurMaterial=pm(r,t,e)}return i}_compileMaterial(t){let e=new rt(this._lodPlanes[0],t);this._renderer.compile(e,qa)}_sceneToCubeUV(t,e,n,i){let o=new ze(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Mc),h.toneMapping=$n,h.autoClear=!1;let f=new Jt({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),g=new rt(new cn,f),x=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Mc),x=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let v=this._cubeSize;cr(i,M*v,p>2?v:0,v,v),h.setRenderTarget(i),x&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===ji||t.mapping===Qi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ec());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new rt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;cr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,qa)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=bc[(i-1)%bc.length];this._blur(t,i-1,i,r,a)}e.autoClear=n}_blur(t,e,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new rt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gi-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):gi;m>gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gi}`);let p=[],M=0;for(let A=0;A<gi;++A){let P=A/x,N=Math.exp(-P*P/2);p.push(N),A===0?M+=N:A<m&&(M+=2*N)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;let S=this._sizeLods[i],R=3*S*(i>v-qi?i-v+qi:0),w=4*(this._cubeSize-S);cr(e,R,w,3*S,2*S),l.setRenderTarget(e),l.render(u,qa)}};function fm(s){let t=[],e=[],n=[],i=s,r=s-qi+1+yc.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let l=1/o;a>s-qi?l=yc[a-s+qi-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*f),v=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let w=0;w<f;w++){let A=w%3*2/3-1,P=w>2?0:-1,N=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];M.set(N,x*g*w),v.set(d,m*g*w);let _=[w,w,w,w,w,w];S.set(_,p*g*w)}let R=new ce;R.setAttribute("position",new me(M,x)),R.setAttribute("uv",new me(v,m)),R.setAttribute("faceIndex",new me(S,p)),t.push(R),i>qi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Sc(s,t,e){let n=new On(s,t,e);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function cr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function pm(s,t,e){let n=new Float32Array(gi),i=new C(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ec(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Tc(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function tl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mm(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===ro||l===ao,h=l===ji||l===Qi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new Nr(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{let u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new Nr(s));let d=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function gm(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function vm(s,t,e,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],s.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let M=f.array;x=f.version;for(let v=0,S=M.length;v<S;v+=3){let R=M[v+0],w=M[v+1],A=M[v+2];d.push(R,w,w,A,A,R)}}else if(g!==void 0){let M=g.array;x=g.version;for(let v=0,S=M.length/3-1;v<S;v+=3){let R=v+0,w=v+1,A=v+2;d.push(R,w,w,A,A,R)}}else return;let m=new(hh(d)?Lr:Ir)(d,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function xm(s,t,e,n){let i=n.isWebGL2,r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(r,g,o,f*l),e.update(g,r,1)}function u(f,g,x){if(x===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,f*l,x),e.update(g,r,x)}function d(f,g,x){if(x===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,f,0,x);let p=0;for(let M=0;M<x;M++)p+=g[M];e.update(p,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function _m(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function ym(s,t){return s[0]-t[0]}function Mm(s,t){return Math.abs(t[1])-Math.abs(s[1])}function bm(s,t,e){let n={},i=new Float32Array(8),r=new WeakMap,a=new Me,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){let d=c.morphTargetInfluences;if(t.isWebGL2===!0){let f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0,x=r.get(h);if(x===void 0||x.count!==g){let G=function(){_.dispose(),r.delete(h),h.removeEventListener("dispose",G)};x!==void 0&&x.texture.dispose();let m=h.morphAttributes.position!==void 0,p=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,v=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],R=h.morphAttributes.color||[],w=0;m===!0&&(w=1),p===!0&&(w=2),M===!0&&(w=3);let A=h.attributes.position.count*w,P=1;A>t.maxTextureSize&&(P=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);let N=new Float32Array(A*P*4*g),_=new Cr(N,A,P,g);_.type=Dn,_.needsUpdate=!0;let E=w*4;for(let Z=0;Z<g;Z++){let I=v[Z],W=S[Z],V=R[Z],$=A*P*4*Z;for(let X=0;X<I.count;X++){let q=X*E;m===!0&&(a.fromBufferAttribute(I,X),N[$+q+0]=a.x,N[$+q+1]=a.y,N[$+q+2]=a.z,N[$+q+3]=0),p===!0&&(a.fromBufferAttribute(W,X),N[$+q+4]=a.x,N[$+q+5]=a.y,N[$+q+6]=a.z,N[$+q+7]=0),M===!0&&(a.fromBufferAttribute(V,X),N[$+q+8]=a.x,N[$+q+9]=a.y,N[$+q+10]=a.z,N[$+q+11]=V.itemSize===4?a.w:1)}}x={count:g,texture:_,size:new at(A,P)},r.set(h,x),h.addEventListener("dispose",G)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)u.getUniforms().setValue(s,"morphTexture",c.morphTexture,e);else{let m=0;for(let M=0;M<d.length;M++)m+=d[M];let p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",p),u.getUniforms().setValue(s,"morphTargetInfluences",d)}u.getUniforms().setValue(s,"morphTargetsTexture",x.texture,e),u.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}else{let f=d===void 0?0:d.length,g=n[h.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<f;v++){let S=g[v];S[0]=v,S[1]=d[v]}g.sort(Mm);for(let v=0;v<8;v++)v<f&&g[v][1]?(o[v][0]=g[v][0],o[v][1]=g[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(ym);let x=h.morphAttributes.position,m=h.morphAttributes.normal,p=0;for(let v=0;v<8;v++){let S=o[v],R=S[0],w=S[1];R!==Number.MAX_SAFE_INTEGER&&w?(x&&h.getAttribute("morphTarget"+v)!==x[R]&&h.setAttribute("morphTarget"+v,x[R]),m&&h.getAttribute("morphNormal"+v)!==m[R]&&h.setAttribute("morphNormal"+v,m[R]),i[v]=w,p+=w):(x&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}let M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",M),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function Sm(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var Or=class extends We{constructor(t,e,n,i,r,a,o,l,c,h){if(h=h!==void 0?h:yi,h!==yi&&h!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===yi&&(n=Yn),n===void 0&&h===ts&&(n=_i),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Be,this.minFilter=l!==void 0?l:Be,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},mh=new We,gh=new Or(1,1);gh.compareFunction=ch;var vh=new Cr,xh=new fo,_h=new Ur,wc=[],Ac=[],Rc=new Float32Array(16),Cc=new Float32Array(9),Pc=new Float32Array(4);function ls(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=wc[i];if(r===void 0&&(r=new Float32Array(i),wc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function ge(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ve(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Jr(s,t){let e=Ac[t];e===void 0&&(e=new Int32Array(t),Ac[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Em(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Tm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2fv(this.addr,t),ve(e,t)}}function wm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;s.uniform3fv(this.addr,t),ve(e,t)}}function Am(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4fv(this.addr,t),ve(e,t)}}function Rm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Pc.set(n),s.uniformMatrix2fv(this.addr,!1,Pc),ve(e,n)}}function Cm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Cc.set(n),s.uniformMatrix3fv(this.addr,!1,Cc),ve(e,n)}}function Pm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Rc.set(n),s.uniformMatrix4fv(this.addr,!1,Rc),ve(e,n)}}function Im(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Lm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2iv(this.addr,t),ve(e,t)}}function Dm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3iv(this.addr,t),ve(e,t)}}function Um(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4iv(this.addr,t),ve(e,t)}}function Nm(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Om(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2uiv(this.addr,t),ve(e,t)}}function Fm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3uiv(this.addr,t),ve(e,t)}}function Bm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4uiv(this.addr,t),ve(e,t)}}function zm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?gh:mh;e.setTexture2D(t||r,i)}function Hm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||xh,i)}function km(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||_h,i)}function Vm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||vh,i)}function Gm(s){switch(s){case 5126:return Em;case 35664:return Tm;case 35665:return wm;case 35666:return Am;case 35674:return Rm;case 35675:return Cm;case 35676:return Pm;case 5124:case 35670:return Im;case 35667:case 35671:return Lm;case 35668:case 35672:return Dm;case 35669:case 35673:return Um;case 5125:return Nm;case 36294:return Om;case 36295:return Fm;case 36296:return Bm;case 35678:case 36198:case 36298:case 36306:case 35682:return zm;case 35679:case 36299:case 36307:return Hm;case 35680:case 36300:case 36308:case 36293:return km;case 36289:case 36303:case 36311:case 36292:return Vm}}function Wm(s,t){s.uniform1fv(this.addr,t)}function Xm(s,t){let e=ls(t,this.size,2);s.uniform2fv(this.addr,e)}function qm(s,t){let e=ls(t,this.size,3);s.uniform3fv(this.addr,e)}function Ym(s,t){let e=ls(t,this.size,4);s.uniform4fv(this.addr,e)}function Zm(s,t){let e=ls(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function $m(s,t){let e=ls(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Jm(s,t){let e=ls(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Km(s,t){s.uniform1iv(this.addr,t)}function jm(s,t){s.uniform2iv(this.addr,t)}function Qm(s,t){s.uniform3iv(this.addr,t)}function tg(s,t){s.uniform4iv(this.addr,t)}function eg(s,t){s.uniform1uiv(this.addr,t)}function ng(s,t){s.uniform2uiv(this.addr,t)}function ig(s,t){s.uniform3uiv(this.addr,t)}function sg(s,t){s.uniform4uiv(this.addr,t)}function rg(s,t,e){let n=this.cache,i=t.length,r=Jr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||mh,r[a])}function ag(s,t,e){let n=this.cache,i=t.length,r=Jr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||xh,r[a])}function og(s,t,e){let n=this.cache,i=t.length,r=Jr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||_h,r[a])}function lg(s,t,e){let n=this.cache,i=t.length,r=Jr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||vh,r[a])}function cg(s){switch(s){case 5126:return Wm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return Zm;case 35675:return $m;case 35676:return Jm;case 5124:case 35670:return Km;case 35667:case 35671:return jm;case 35668:case 35672:return Qm;case 35669:case 35673:return tg;case 5125:return eg;case 36294:return ng;case 36295:return ig;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return lg}}var go=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Gm(e.type)}},vo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cg(e.type)}},xo=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},Ja=/(\w+)(\])?(\[|\.)?/g;function Ic(s,t){s.seq.push(t),s.map[t.id]=t}function hg(s,t,e){let n=s.name,i=n.length;for(Ja.lastIndex=0;;){let r=Ja.exec(n),a=Ja.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ic(e,c===void 0?new go(o,s,t):new vo(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new xo(o),Ic(e,u)),e=u}}}var Ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);hg(r,a,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Lc(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var ug=37297,dg=0;function fg(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function pg(s){let t=Kt.getPrimaries(Kt.workingColorSpace),e=Kt.getPrimaries(s),n;switch(t===e?n="":t===Sr&&e===br?n="LinearDisplayP3ToLinearSRGB":t===br&&e===Sr&&(n="LinearSRGBToLinearDisplayP3"),s){case ii:case $r:return[n,"LinearTransferOETF"];case ae:case jo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Dc(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+fg(s.getShaderSource(t),a)}else return i}function mg(s,t){let e=pg(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function gg(s,t){let e;switch(t){case xu:e="Linear";break;case _u:e="Reinhard";break;case yu:e="OptimizedCineon";break;case Mu:e="ACESFilmic";break;case Su:e="AgX";break;case Eu:e="Neutral";break;case bu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function vg(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.alphaToCoverage||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Yi).join(`
`)}function xg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)}function _g(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function yg(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Yi(s){return s!==""}function Uc(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function _o(s){return s.replace(Mg,Sg)}var bg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Sg(s,t){let e=Ut[t];if(e===void 0){let n=bg.get(t);if(n!==void 0)e=Ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return _o(e)}var Eg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oc(s){return s.replace(Eg,Tg)}function Tg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Fc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	`;return s.isWebGL2&&(t+=`precision ${s.precision} sampler3D;
		precision ${s.precision} sampler2DArray;
		precision ${s.precision} sampler2DShadow;
		precision ${s.precision} samplerCubeShadow;
		precision ${s.precision} sampler2DArrayShadow;
		precision ${s.precision} isampler2D;
		precision ${s.precision} isampler3D;
		precision ${s.precision} isamplerCube;
		precision ${s.precision} isampler2DArray;
		precision ${s.precision} usampler2D;
		precision ${s.precision} usampler3D;
		precision ${s.precision} usamplerCube;
		precision ${s.precision} usampler2DArray;
		`),s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===jc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===qh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===In&&(t="SHADOWMAP_TYPE_VSM"),t}function Ag(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ji:case Qi:t="ENVMAP_TYPE_CUBE";break;case Zr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Rg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Qi:t="ENVMAP_MODE_REFRACTION";break}return t}function Cg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Qc:t="ENVMAP_BLENDING_MULTIPLY";break;case gu:t="ENVMAP_BLENDING_MIX";break;case vu:t="ENVMAP_BLENDING_ADD";break}return t}function Pg(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Ig(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=wg(e),c=Ag(e),h=Rg(e),u=Cg(e),d=Pg(e),f=e.isWebGL2?"":vg(e),g=xg(e),x=_g(r),m=i.createProgram(),p,M,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Yi).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Yi).join(`
`),M.length>0&&(M+=`
`)):(p=[Fc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),M=[f,Fc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Ut.tonemapping_pars_fragment:"",e.toneMapping!==$n?gg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,mg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yi).join(`
`)),a=_o(a),a=Uc(a,e),a=Nc(a,e),o=_o(o),o=Uc(o,e),o=Nc(o,e),a=Oc(a),o=Oc(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);let S=v+p+a,R=v+M+o,w=Lc(i,i.VERTEX_SHADER,S),A=Lc(i,i.FRAGMENT_SHADER,R);i.attachShader(m,w),i.attachShader(m,A),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function P(G){if(s.debug.checkShaderErrors){let Z=i.getProgramInfoLog(m).trim(),I=i.getShaderInfoLog(w).trim(),W=i.getShaderInfoLog(A).trim(),V=!0,$=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,w,A);else{let X=Dc(i,w,"vertex"),q=Dc(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+Z+`
`+X+`
`+q)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(I===""||W==="")&&($=!1);$&&(G.diagnostics={runnable:V,programLog:Z,vertexShader:{log:I,prefix:p},fragmentShader:{log:W,prefix:M}})}i.deleteShader(w),i.deleteShader(A),N=new Ji(i,m),_=yg(i,m)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let _;this.getAttributes=function(){return _===void 0&&P(this),_};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(m,ug)),E},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dg++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}var Lg=0,yo=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Mo(t),e.set(t,n)),n}},Mo=class{constructor(t){this.id=Lg++,this.code=t,this.usedTimes=0}};function Dg(s,t,e,n,i,r,a){let o=new Pr,l=new yo,c=new Set,h=[],u=i.isWebGL2,d=i.logarithmicDepthBuffer,f=i.vertexTextures,g=i.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return c.add(_),_===0?"uv":`uv${_}`}function p(_,E,G,Z,I){let W=Z.fog,V=I.geometry,$=_.isMeshStandardMaterial?Z.environment:null,X=(_.isMeshStandardMaterial?e:t).get(_.envMap||$),q=X&&X.mapping===Zr?X.image.height:null,tt=x[_.type];_.precision!==null&&(g=i.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));let it=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,dt=it!==void 0?it.length:0,Pt=0;V.morphAttributes.position!==void 0&&(Pt=1),V.morphAttributes.normal!==void 0&&(Pt=2),V.morphAttributes.color!==void 0&&(Pt=3);let H,K,ut,Et;if(tt){let te=vn[tt];H=te.vertexShader,K=te.fragmentShader}else H=_.vertexShader,K=_.fragmentShader,l.update(_),ut=l.getVertexShaderID(_),Et=l.getFragmentShaderID(_);let vt=s.getRenderTarget(),ft=I.isInstancedMesh===!0,Zt=I.isBatchedMesh===!0,Tt=!!_.map,U=!!_.matcap,Ee=!!X,_t=!!_.aoMap,Bt=!!_.lightMap,Mt=!!_.bumpMap,Gt=!!_.normalMap,Ot=!!_.displacementMap,Ht=!!_.emissiveMap,he=!!_.metalnessMap,T=!!_.roughnessMap,y=_.anisotropy>0,k=_.clearcoat>0,Y=_.iridescence>0,j=_.sheen>0,J=_.transmission>0,It=y&&!!_.anisotropyMap,bt=k&&!!_.clearcoatMap,st=k&&!!_.clearcoatNormalMap,lt=k&&!!_.clearcoatRoughnessMap,Lt=Y&&!!_.iridescenceMap,Q=Y&&!!_.iridescenceThicknessMap,fe=j&&!!_.sheenColorMap,kt=j&&!!_.sheenRoughnessMap,xt=!!_.specularMap,pt=!!_.specularColorMap,mt=!!_.specularIntensityMap,Wt=J&&!!_.transmissionMap,Rt=J&&!!_.thicknessMap,ie=!!_.gradientMap,L=!!_.alphaMap,ot=_.alphaTest>0,F=!!_.alphaHash,et=!!_.extensions,ct=$n;_.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(ct=s.toneMapping);let Vt={isWebGL2:u,shaderID:tt,shaderType:_.type,shaderName:_.name,vertexShader:H,fragmentShader:K,defines:_.defines,customVertexShaderID:ut,customFragmentShaderID:Et,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:Zt,instancing:ft,instancingColor:ft&&I.instanceColor!==null,instancingMorph:ft&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:vt===null?s.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:ii,alphaToCoverage:!!_.alphaToCoverage,map:Tt,matcap:U,envMap:Ee,envMapMode:Ee&&X.mapping,envMapCubeUVHeight:q,aoMap:_t,lightMap:Bt,bumpMap:Mt,normalMap:Gt,displacementMap:f&&Ot,emissiveMap:Ht,normalMapObjectSpace:Gt&&_.normalMapType===Nu,normalMapTangentSpace:Gt&&_.normalMapType===lh,metalnessMap:he,roughnessMap:T,anisotropy:y,anisotropyMap:It,clearcoat:k,clearcoatMap:bt,clearcoatNormalMap:st,clearcoatRoughnessMap:lt,iridescence:Y,iridescenceMap:Lt,iridescenceThicknessMap:Q,sheen:j,sheenColorMap:fe,sheenRoughnessMap:kt,specularMap:xt,specularColorMap:pt,specularIntensityMap:mt,transmission:J,transmissionMap:Wt,thicknessMap:Rt,gradientMap:ie,opaque:_.transparent===!1&&_.blending===Zi&&_.alphaToCoverage===!1,alphaMap:L,alphaTest:ot,alphaHash:F,combine:_.combine,mapUv:Tt&&m(_.map.channel),aoMapUv:_t&&m(_.aoMap.channel),lightMapUv:Bt&&m(_.lightMap.channel),bumpMapUv:Mt&&m(_.bumpMap.channel),normalMapUv:Gt&&m(_.normalMap.channel),displacementMapUv:Ot&&m(_.displacementMap.channel),emissiveMapUv:Ht&&m(_.emissiveMap.channel),metalnessMapUv:he&&m(_.metalnessMap.channel),roughnessMapUv:T&&m(_.roughnessMap.channel),anisotropyMapUv:It&&m(_.anisotropyMap.channel),clearcoatMapUv:bt&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:st&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:kt&&m(_.sheenRoughnessMap.channel),specularMapUv:xt&&m(_.specularMap.channel),specularColorMapUv:pt&&m(_.specularColorMap.channel),specularIntensityMapUv:mt&&m(_.specularIntensityMap.channel),transmissionMapUv:Wt&&m(_.transmissionMap.channel),thicknessMapUv:Rt&&m(_.thicknessMap.channel),alphaMapUv:L&&m(_.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Gt||y),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!V.attributes.uv&&(Tt||L),fog:!!W,useFog:_.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:I.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:Pt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&G.length>0,shadowMapType:s.shadowMap.type,toneMapping:ct,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Tt&&_.map.isVideoTexture===!0&&Kt.getTransfer(_.map.colorSpace)===ne,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===jt,flipSided:_.side===Le,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:et&&_.extensions.derivatives===!0,extensionFragDepth:et&&_.extensions.fragDepth===!0,extensionDrawBuffers:et&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:et&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:et&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:et&&_.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Vt.vertexUv1s=c.has(1),Vt.vertexUv2s=c.has(2),Vt.vertexUv3s=c.has(3),c.clear(),Vt}function M(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let G in _.defines)E.push(G),E.push(_.defines[G]);return _.isRawShaderMaterial===!1&&(v(E,_),S(E,_),E.push(s.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function v(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function S(_,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.instancingMorph&&o.enable(4),E.matcap&&o.enable(5),E.envMap&&o.enable(6),E.normalMapObjectSpace&&o.enable(7),E.normalMapTangentSpace&&o.enable(8),E.clearcoat&&o.enable(9),E.iridescence&&o.enable(10),E.alphaTest&&o.enable(11),E.vertexColors&&o.enable(12),E.vertexAlphas&&o.enable(13),E.vertexUv1s&&o.enable(14),E.vertexUv2s&&o.enable(15),E.vertexUv3s&&o.enable(16),E.vertexTangents&&o.enable(17),E.anisotropy&&o.enable(18),E.alphaHash&&o.enable(19),E.batching&&o.enable(20),_.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.alphaToCoverage&&o.enable(20),_.push(o.mask)}function R(_){let E=x[_.type],G;if(E){let Z=vn[E];G=_d.clone(Z.uniforms)}else G=_.uniforms;return G}function w(_,E){let G;for(let Z=0,I=h.length;Z<I;Z++){let W=h[Z];if(W.cacheKey===E){G=W,++G.usedTimes;break}}return G===void 0&&(G=new Ig(s,E,_,r),h.push(G)),G}function A(_){if(--_.usedTimes===0){let E=h.indexOf(_);h[E]=h[h.length-1],h.pop(),_.destroy()}}function P(_){l.remove(_)}function N(){l.dispose()}return{getParameters:p,getProgramCacheKey:M,getUniforms:R,acquireProgram:w,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:N}}function Ug(){let s=new WeakMap;function t(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function e(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Ng(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Bc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function zc(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,g,x,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function o(u,d,f,g,x,m){let p=a(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,g,x,m){let p=a(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||Ng),n.length>1&&n.sort(d||Bc),i.length>1&&i.sort(d||Bc)}function h(){for(let u=t,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Og(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new zc,s.set(n,[a])):i>=r.length?(a=new zc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Fg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new wt};break;case"SpotLight":e={position:new C,direction:new C,color:new wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new wt,groundColor:new wt};break;case"RectAreaLight":e={color:new wt,position:new C,halfWidth:new C,halfHeight:new C};break}return s[t.id]=e,e}}}function Bg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var zg=0;function Hg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function kg(s,t){let e=new Fg,n=Bg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new C);let r=new C,a=new oe,o=new oe;function l(h,u){let d=0,f=0,g=0;for(let G=0;G<9;G++)i.probe[G].set(0,0,0);let x=0,m=0,p=0,M=0,v=0,S=0,R=0,w=0,A=0,P=0,N=0;h.sort(Hg);let _=u===!0?Math.PI:1;for(let G=0,Z=h.length;G<Z;G++){let I=h[G],W=I.color,V=I.intensity,$=I.distance,X=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=W.r*V*_,f+=W.g*V*_,g+=W.b*V*_;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],V);N++}else if(I.isDirectionalLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity*_),I.castShadow){let tt=I.shadow,it=n.get(I);it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,i.directionalShadow[x]=it,i.directionalShadowMap[x]=X,i.directionalShadowMatrix[x]=I.shadow.matrix,S++}i.directional[x]=q,x++}else if(I.isSpotLight){let q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(W).multiplyScalar(V*_),q.distance=$,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[p]=q;let tt=I.shadow;if(I.map&&(i.spotLightMap[A]=I.map,A++,tt.updateMatrices(I),I.castShadow&&P++),i.spotLightMatrix[p]=tt.matrix,I.castShadow){let it=n.get(I);it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,i.spotShadow[p]=it,i.spotShadowMap[p]=X,w++}p++}else if(I.isRectAreaLight){let q=e.get(I);q.color.copy(W).multiplyScalar(V),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[M]=q,M++}else if(I.isPointLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity*_),q.distance=I.distance,q.decay=I.decay,I.castShadow){let tt=I.shadow,it=n.get(I);it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,it.shadowCameraNear=tt.camera.near,it.shadowCameraFar=tt.camera.far,i.pointShadow[m]=it,i.pointShadowMap[m]=X,i.pointShadowMatrix[m]=I.shadow.matrix,R++}i.point[m]=q,m++}else if(I.isHemisphereLight){let q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(V*_),q.groundColor.copy(I.groundColor).multiplyScalar(V*_),i.hemi[v]=q,v++}}M>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;let E=i.hash;(E.directionalLength!==x||E.pointLength!==m||E.spotLength!==p||E.rectAreaLength!==M||E.hemiLength!==v||E.numDirectionalShadows!==S||E.numPointShadows!==R||E.numSpotShadows!==w||E.numSpotMaps!==A||E.numLightProbes!==N)&&(i.directional.length=x,i.spot.length=p,i.rectArea.length=M,i.point.length=m,i.hemi.length=v,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=w+A-P,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=N,E.directionalLength=x,E.pointLength=m,E.spotLength=p,E.rectAreaLength=M,E.hemiLength=v,E.numDirectionalShadows=S,E.numPointShadows=R,E.numSpotShadows=w,E.numSpotMaps=A,E.numLightProbes=N,i.version=zg++)}function c(h,u){let d=0,f=0,g=0,x=0,m=0,p=u.matrixWorldInverse;for(let M=0,v=h.length;M<v;M++){let S=h[M];if(S.isDirectionalLight){let R=i.directional[d];R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),d++}else if(S.isSpotLight){let R=i.spot[g];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),g++}else if(S.isRectAreaLight){let R=i.rectArea[x];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),o.identity(),a.copy(S.matrixWorld),a.premultiply(p),o.extractRotation(a),R.halfWidth.set(S.width*.5,0,0),R.halfHeight.set(0,S.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),x++}else if(S.isPointLight){let R=i.point[f];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){let R=i.hemi[m];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:i}}function Hc(s,t){let e=new kg(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Vg(s,t){let e=new WeakMap;function n(r,a=0){let o=e.get(r),l;return o===void 0?(l=new Hc(s,t),e.set(r,[l])):a>=o.length?(l=new Hc(s,t),o.push(l)):l=o[a],l}function i(){e=new WeakMap}return{get:n,dispose:i}}var bo=class extends _n{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},So=class extends _n{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Gg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Xg(s,t,e){let n=new Rs,i=new at,r=new at,a=new Me,o=new bo({depthPacking:Uu}),l=new So,c={},h=e.maxTextureSize,u={[Kn]:Le,[Le]:Kn,[jt]:jt},d=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:Gg,fragmentShader:Wg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new ce;g.setAttribute("position",new me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new rt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jc;let p=this.type;this.render=function(w,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let N=s.getRenderTarget(),_=s.getActiveCubeFace(),E=s.getActiveMipmapLevel(),G=s.state;G.setBlending(Zn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let Z=p!==In&&this.type===In,I=p===In&&this.type!==In;for(let W=0,V=w.length;W<V;W++){let $=w[W],X=$.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);let q=X.getFrameExtents();if(i.multiply(q),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/q.x),i.x=r.x*q.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/q.y),i.y=r.y*q.y,X.mapSize.y=r.y)),X.map===null||Z===!0||I===!0){let it=this.type!==In?{minFilter:Be,magFilter:Be}:{};X.map!==null&&X.map.dispose(),X.map=new On(i.x,i.y,it),X.map.texture.name=$.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();let tt=X.getViewportCount();for(let it=0;it<tt;it++){let dt=X.getViewport(it);a.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),G.viewport(a),X.updateMatrices($,it),n=X.getFrustum(),S(A,P,X.camera,$,this.type)}X.isPointLightShadow!==!0&&this.type===In&&M(X,P),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(N,_,E)};function M(w,A){let P=t.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new On(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(A,null,P,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(A,null,P,f,x,null)}function v(w,A,P,N){let _=null,E=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(E!==void 0)_=E;else if(_=P.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let G=_.uuid,Z=A.uuid,I=c[G];I===void 0&&(I={},c[G]=I);let W=I[Z];W===void 0&&(W=_.clone(),I[Z]=W,A.addEventListener("dispose",R)),_=W}if(_.visible=A.visible,_.wireframe=A.wireframe,N===In?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:u[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,P.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let G=s.properties.get(_);G.light=P}return _}function S(w,A,P,N,_){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===In)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);let Z=t.update(w),I=w.material;if(Array.isArray(I)){let W=Z.groups;for(let V=0,$=W.length;V<$;V++){let X=W[V],q=I[X.materialIndex];if(q&&q.visible){let tt=v(w,q,N,_);w.onBeforeShadow(s,w,A,P,Z,tt,X),s.renderBufferDirect(P,null,Z,tt,w,X),w.onAfterShadow(s,w,A,P,Z,tt,X)}}}else if(I.visible){let W=v(w,I,N,_);w.onBeforeShadow(s,w,A,P,Z,W,null),s.renderBufferDirect(P,null,Z,W,w,null),w.onAfterShadow(s,w,A,P,Z,W,null)}}let G=w.children;for(let Z=0,I=G.length;Z<I;Z++)S(G[Z],A,P,N,_)}function R(w){w.target.removeEventListener("dispose",R);for(let P in c){let N=c[P],_=w.target.uuid;_ in N&&(N[_].dispose(),delete N[_])}}}function qg(s,t,e){let n=e.isWebGL2;function i(){let L=!1,ot=new Me,F=null,et=new Me(0,0,0,0);return{setMask:function(ct){F!==ct&&!L&&(s.colorMask(ct,ct,ct,ct),F=ct)},setLocked:function(ct){L=ct},setClear:function(ct,Vt,te,Te,Ze){Ze===!0&&(ct*=Te,Vt*=Te,te*=Te),ot.set(ct,Vt,te,Te),et.equals(ot)===!1&&(s.clearColor(ct,Vt,te,Te),et.copy(ot))},reset:function(){L=!1,F=null,et.set(-1,0,0,0)}}}function r(){let L=!1,ot=null,F=null,et=null;return{setTest:function(ct){ct?ft(s.DEPTH_TEST):Zt(s.DEPTH_TEST)},setMask:function(ct){ot!==ct&&!L&&(s.depthMask(ct),ot=ct)},setFunc:function(ct){if(F!==ct){switch(ct){case cu:s.depthFunc(s.NEVER);break;case hu:s.depthFunc(s.ALWAYS);break;case uu:s.depthFunc(s.LESS);break;case xr:s.depthFunc(s.LEQUAL);break;case du:s.depthFunc(s.EQUAL);break;case fu:s.depthFunc(s.GEQUAL);break;case pu:s.depthFunc(s.GREATER);break;case mu:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}F=ct}},setLocked:function(ct){L=ct},setClear:function(ct){et!==ct&&(s.clearDepth(ct),et=ct)},reset:function(){L=!1,ot=null,F=null,et=null}}}function a(){let L=!1,ot=null,F=null,et=null,ct=null,Vt=null,te=null,Te=null,Ze=null;return{setTest:function(ee){L||(ee?ft(s.STENCIL_TEST):Zt(s.STENCIL_TEST))},setMask:function(ee){ot!==ee&&!L&&(s.stencilMask(ee),ot=ee)},setFunc:function(ee,Ne,mn){(F!==ee||et!==Ne||ct!==mn)&&(s.stencilFunc(ee,Ne,mn),F=ee,et=Ne,ct=mn)},setOp:function(ee,Ne,mn){(Vt!==ee||te!==Ne||Te!==mn)&&(s.stencilOp(ee,Ne,mn),Vt=ee,te=Ne,Te=mn)},setLocked:function(ee){L=ee},setClear:function(ee){Ze!==ee&&(s.clearStencil(ee),Ze=ee)},reset:function(){L=!1,ot=null,F=null,et=null,ct=null,Vt=null,te=null,Te=null,Ze=null}}}let o=new i,l=new r,c=new a,h=new WeakMap,u=new WeakMap,d={},f={},g=new WeakMap,x=[],m=null,p=!1,M=null,v=null,S=null,R=null,w=null,A=null,P=null,N=new wt(0,0,0),_=0,E=!1,G=null,Z=null,I=null,W=null,V=null,$=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,q=0,tt=s.getParameter(s.VERSION);tt.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(tt)[1]),X=q>=1):tt.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),X=q>=2);let it=null,dt={},Pt=s.getParameter(s.SCISSOR_BOX),H=s.getParameter(s.VIEWPORT),K=new Me().fromArray(Pt),ut=new Me().fromArray(H);function Et(L,ot,F,et){let ct=new Uint8Array(4),Vt=s.createTexture();s.bindTexture(L,Vt),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let te=0;te<F;te++)n&&(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)?s.texImage3D(ot,0,s.RGBA,1,1,et,0,s.RGBA,s.UNSIGNED_BYTE,ct):s.texImage2D(ot+te,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ct);return Vt}let vt={};vt[s.TEXTURE_2D]=Et(s.TEXTURE_2D,s.TEXTURE_2D,1),vt[s.TEXTURE_CUBE_MAP]=Et(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(vt[s.TEXTURE_2D_ARRAY]=Et(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),vt[s.TEXTURE_3D]=Et(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ft(s.DEPTH_TEST),l.setFunc(xr),Ot(!1),Ht(_l),ft(s.CULL_FACE),Mt(Zn);function ft(L){d[L]!==!0&&(s.enable(L),d[L]=!0)}function Zt(L){d[L]!==!1&&(s.disable(L),d[L]=!1)}function Tt(L,ot){return f[L]!==ot?(s.bindFramebuffer(L,ot),f[L]=ot,n&&(L===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=ot),L===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=ot)),!0):!1}function U(L,ot){let F=x,et=!1;if(L){F=g.get(ot),F===void 0&&(F=[],g.set(ot,F));let ct=L.textures;if(F.length!==ct.length||F[0]!==s.COLOR_ATTACHMENT0){for(let Vt=0,te=ct.length;Vt<te;Vt++)F[Vt]=s.COLOR_ATTACHMENT0+Vt;F.length=ct.length,et=!0}}else F[0]!==s.BACK&&(F[0]=s.BACK,et=!0);if(et)if(e.isWebGL2)s.drawBuffers(F);else if(t.has("WEBGL_draw_buffers")===!0)t.get("WEBGL_draw_buffers").drawBuffersWEBGL(F);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function Ee(L){return m!==L?(s.useProgram(L),m=L,!0):!1}let _t={[mi]:s.FUNC_ADD,[Zh]:s.FUNC_SUBTRACT,[$h]:s.FUNC_REVERSE_SUBTRACT};if(n)_t[bl]=s.MIN,_t[Sl]=s.MAX;else{let L=t.get("EXT_blend_minmax");L!==null&&(_t[bl]=L.MIN_EXT,_t[Sl]=L.MAX_EXT)}let Bt={[Jh]:s.ZERO,[Kh]:s.ONE,[jh]:s.SRC_COLOR,[io]:s.SRC_ALPHA,[su]:s.SRC_ALPHA_SATURATE,[nu]:s.DST_COLOR,[tu]:s.DST_ALPHA,[Qh]:s.ONE_MINUS_SRC_COLOR,[so]:s.ONE_MINUS_SRC_ALPHA,[iu]:s.ONE_MINUS_DST_COLOR,[eu]:s.ONE_MINUS_DST_ALPHA,[ru]:s.CONSTANT_COLOR,[au]:s.ONE_MINUS_CONSTANT_COLOR,[ou]:s.CONSTANT_ALPHA,[lu]:s.ONE_MINUS_CONSTANT_ALPHA};function Mt(L,ot,F,et,ct,Vt,te,Te,Ze,ee){if(L===Zn){p===!0&&(Zt(s.BLEND),p=!1);return}if(p===!1&&(ft(s.BLEND),p=!0),L!==Yh){if(L!==M||ee!==E){if((v!==mi||w!==mi)&&(s.blendEquation(s.FUNC_ADD),v=mi,w=mi),ee)switch(L){case Zi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ki:s.blendFunc(s.ONE,s.ONE);break;case yl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ml:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Zi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ki:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case yl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ml:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}S=null,R=null,A=null,P=null,N.set(0,0,0),_=0,M=L,E=ee}return}ct=ct||ot,Vt=Vt||F,te=te||et,(ot!==v||ct!==w)&&(s.blendEquationSeparate(_t[ot],_t[ct]),v=ot,w=ct),(F!==S||et!==R||Vt!==A||te!==P)&&(s.blendFuncSeparate(Bt[F],Bt[et],Bt[Vt],Bt[te]),S=F,R=et,A=Vt,P=te),(Te.equals(N)===!1||Ze!==_)&&(s.blendColor(Te.r,Te.g,Te.b,Ze),N.copy(Te),_=Ze),M=L,E=!1}function Gt(L,ot){L.side===jt?Zt(s.CULL_FACE):ft(s.CULL_FACE);let F=L.side===Le;ot&&(F=!F),Ot(F),L.blending===Zi&&L.transparent===!1?Mt(Zn):Mt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);let et=L.stencilWrite;c.setTest(et),et&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),T(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ft(s.SAMPLE_ALPHA_TO_COVERAGE):Zt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(L){G!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),G=L)}function Ht(L){L!==Wh?(ft(s.CULL_FACE),L!==Z&&(L===_l?s.cullFace(s.BACK):L===Xh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Zt(s.CULL_FACE),Z=L}function he(L){L!==I&&(X&&s.lineWidth(L),I=L)}function T(L,ot,F){L?(ft(s.POLYGON_OFFSET_FILL),(W!==ot||V!==F)&&(s.polygonOffset(ot,F),W=ot,V=F)):Zt(s.POLYGON_OFFSET_FILL)}function y(L){L?ft(s.SCISSOR_TEST):Zt(s.SCISSOR_TEST)}function k(L){L===void 0&&(L=s.TEXTURE0+$-1),it!==L&&(s.activeTexture(L),it=L)}function Y(L,ot,F){F===void 0&&(it===null?F=s.TEXTURE0+$-1:F=it);let et=dt[F];et===void 0&&(et={type:void 0,texture:void 0},dt[F]=et),(et.type!==L||et.texture!==ot)&&(it!==F&&(s.activeTexture(F),it=F),s.bindTexture(L,ot||vt[L]),et.type=L,et.texture=ot)}function j(){let L=dt[it];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function J(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function It(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function bt(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function st(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function lt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Lt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function kt(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pt(L){K.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),K.copy(L))}function mt(L){ut.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),ut.copy(L))}function Wt(L,ot){let F=u.get(ot);F===void 0&&(F=new WeakMap,u.set(ot,F));let et=F.get(L);et===void 0&&(et=s.getUniformBlockIndex(ot,L.name),F.set(L,et))}function Rt(L,ot){let et=u.get(ot).get(L);h.get(ot)!==et&&(s.uniformBlockBinding(ot,et,L.__bindingPointIndex),h.set(ot,et))}function ie(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},it=null,dt={},f={},g=new WeakMap,x=[],m=null,p=!1,M=null,v=null,S=null,R=null,w=null,A=null,P=null,N=new wt(0,0,0),_=0,E=!1,G=null,Z=null,I=null,W=null,V=null,K.set(0,0,s.canvas.width,s.canvas.height),ut.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:ft,disable:Zt,bindFramebuffer:Tt,drawBuffers:U,useProgram:Ee,setBlending:Mt,setMaterial:Gt,setFlipSided:Ot,setCullFace:Ht,setLineWidth:he,setPolygonOffset:T,setScissorTest:y,activeTexture:k,bindTexture:Y,unbindTexture:j,compressedTexImage2D:J,compressedTexImage3D:It,texImage2D:kt,texImage3D:xt,updateUBOMapping:Wt,uniformBlockBinding:Rt,texStorage2D:Q,texStorage3D:fe,texSubImage2D:bt,texSubImage3D:st,compressedTexSubImage2D:lt,compressedTexSubImage3D:Lt,scissor:pt,viewport:mt,reset:ie}}function Yg(s,t,e,n,i,r,a){let o=i.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new at,u=new WeakMap,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(T){}function x(T,y){return g?new OffscreenCanvas(T,y):wr("canvas")}function m(T,y,k,Y){let j=1,J=he(T);if((J.width>Y||J.height>Y)&&(j=Y/Math.max(J.width,J.height)),j<1||y===!0)if(typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&T instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&T instanceof ImageBitmap||typeof VideoFrame!="undefined"&&T instanceof VideoFrame){let It=y?Tr:Math.floor,bt=It(j*J.width),st=It(j*J.height);d===void 0&&(d=x(bt,st));let lt=k?x(bt,st):d;return lt.width=bt,lt.height=st,lt.getContext("2d").drawImage(T,0,0,bt,st),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+bt+"x"+st+")."),lt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function p(T){let y=he(T);return ho(y.width)&&ho(y.height)}function M(T){return o?!1:T.wrapS!==an||T.wrapT!==an||T.minFilter!==Be&&T.minFilter!==we}function v(T,y){return T.generateMipmaps&&y&&T.minFilter!==Be&&T.minFilter!==we}function S(T){s.generateMipmap(T)}function R(T,y,k,Y,j=!1){if(o===!1)return y;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let J=y;if(y===s.RED&&(k===s.FLOAT&&(J=s.R32F),k===s.HALF_FLOAT&&(J=s.R16F),k===s.UNSIGNED_BYTE&&(J=s.R8)),y===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(J=s.R8UI),k===s.UNSIGNED_SHORT&&(J=s.R16UI),k===s.UNSIGNED_INT&&(J=s.R32UI),k===s.BYTE&&(J=s.R8I),k===s.SHORT&&(J=s.R16I),k===s.INT&&(J=s.R32I)),y===s.RG&&(k===s.FLOAT&&(J=s.RG32F),k===s.HALF_FLOAT&&(J=s.RG16F),k===s.UNSIGNED_BYTE&&(J=s.RG8)),y===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(J=s.RG8UI),k===s.UNSIGNED_SHORT&&(J=s.RG16UI),k===s.UNSIGNED_INT&&(J=s.RG32UI),k===s.BYTE&&(J=s.RG8I),k===s.SHORT&&(J=s.RG16I),k===s.INT&&(J=s.RG32I)),y===s.RGBA){let It=j?Mr:Kt.getTransfer(Y);k===s.FLOAT&&(J=s.RGBA32F),k===s.HALF_FLOAT&&(J=s.RGBA16F),k===s.UNSIGNED_BYTE&&(J=It===ne?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function w(T,y,k){return v(T,k)===!0||T.isFramebufferTexture&&T.minFilter!==Be&&T.minFilter!==we?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function A(T){return T===Be||T===El||T===ds?s.NEAREST:s.LINEAR}function P(T){let y=T.target;y.removeEventListener("dispose",P),_(y),y.isVideoTexture&&u.delete(y)}function N(T){let y=T.target;y.removeEventListener("dispose",N),G(y)}function _(T){let y=n.get(T);if(y.__webglInit===void 0)return;let k=T.source,Y=f.get(k);if(Y){let j=Y[y.__cacheKey];j.usedTimes--,j.usedTimes===0&&E(T),Object.keys(Y).length===0&&f.delete(k)}n.remove(T)}function E(T){let y=n.get(T);s.deleteTexture(y.__webglTexture);let k=T.source,Y=f.get(k);delete Y[y.__cacheKey],a.memory.textures--}function G(T){let y=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let j=0;j<y.__webglFramebuffer[Y].length;j++)s.deleteFramebuffer(y.__webglFramebuffer[Y][j]);else s.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)s.deleteFramebuffer(y.__webglFramebuffer[Y]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let k=T.textures;for(let Y=0,j=k.length;Y<j;Y++){let J=n.get(k[Y]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(k[Y])}n.remove(T)}let Z=0;function I(){Z=0}function W(){let T=Z;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),Z+=1,T}function V(T){let y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function $(T,y){let k=n.get(T);if(T.isVideoTexture&&Ot(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){let Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ut(k,T,y);return}}e.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+y)}function X(T,y){let k=n.get(T);if(T.version>0&&k.__version!==T.version){ut(k,T,y);return}e.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+y)}function q(T,y){let k=n.get(T);if(T.version>0&&k.__version!==T.version){ut(k,T,y);return}e.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+y)}function tt(T,y){let k=n.get(T);if(T.version>0&&k.__version!==T.version){Et(k,T,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+y)}let it={[jn]:s.REPEAT,[an]:s.CLAMP_TO_EDGE,[oo]:s.MIRRORED_REPEAT},dt={[Be]:s.NEAREST,[El]:s.NEAREST_MIPMAP_NEAREST,[ds]:s.NEAREST_MIPMAP_LINEAR,[we]:s.LINEAR,[ya]:s.LINEAR_MIPMAP_NEAREST,[vi]:s.LINEAR_MIPMAP_LINEAR},Pt={[Ou]:s.NEVER,[Vu]:s.ALWAYS,[Fu]:s.LESS,[ch]:s.LEQUAL,[Bu]:s.EQUAL,[ku]:s.GEQUAL,[zu]:s.GREATER,[Hu]:s.NOTEQUAL};function H(T,y,k){if(y.type===Dn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===we||y.magFilter===ya||y.magFilter===ds||y.magFilter===vi||y.minFilter===we||y.minFilter===ya||y.minFilter===ds||y.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),k?(s.texParameteri(T,s.TEXTURE_WRAP_S,it[y.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,it[y.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,it[y.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,dt[y.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,dt[y.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(y.wrapS!==an||y.wrapT!==an)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,A(y.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,A(y.minFilter)),y.minFilter!==Be&&y.minFilter!==we&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,Pt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Be||y.minFilter!==ds&&y.minFilter!==vi||y.type===Dn&&t.has("OES_texture_float_linear")===!1||o===!1&&y.type===Ts&&t.has("OES_texture_half_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let Y=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function K(T,y){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",P));let Y=y.source,j=f.get(Y);j===void 0&&(j={},f.set(Y,j));let J=V(y);if(J!==T.__cacheKey){j[J]===void 0&&(j[J]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),j[J].usedTimes++;let It=j[T.__cacheKey];It!==void 0&&(j[T.__cacheKey].usedTimes--,It.usedTimes===0&&E(y)),T.__cacheKey=J,T.__webglTexture=j[J].texture}return k}function ut(T,y,k){let Y=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=s.TEXTURE_3D);let j=K(T,y),J=y.source;e.bindTexture(Y,T.__webglTexture,s.TEXTURE0+k);let It=n.get(J);if(J.version!==It.__version||j===!0){e.activeTexture(s.TEXTURE0+k);let bt=Kt.getPrimaries(Kt.workingColorSpace),st=y.colorSpace===qn?null:Kt.getPrimaries(y.colorSpace),lt=y.colorSpace===qn||bt===st?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);let Lt=M(y)&&p(y.image)===!1,Q=m(y.image,Lt,!1,i.maxTextureSize);Q=Ht(y,Q);let fe=p(Q)||o,kt=r.convert(y.format,y.colorSpace),xt=r.convert(y.type),pt=R(y.internalFormat,kt,xt,y.colorSpace,y.isVideoTexture);H(Y,y,fe);let mt,Wt=y.mipmaps,Rt=o&&y.isVideoTexture!==!0&&pt!==oh,ie=It.__version===void 0||j===!0,L=J.dataReady,ot=w(y,Q,fe);if(y.isDepthTexture)pt=s.DEPTH_COMPONENT,o?y.type===Dn?pt=s.DEPTH_COMPONENT32F:y.type===Yn?pt=s.DEPTH_COMPONENT24:y.type===_i?pt=s.DEPTH24_STENCIL8:pt=s.DEPTH_COMPONENT16:y.type===Dn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===yi&&pt===s.DEPTH_COMPONENT&&y.type!==Ko&&y.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Yn,xt=r.convert(y.type)),y.format===ts&&pt===s.DEPTH_COMPONENT&&(pt=s.DEPTH_STENCIL,y.type!==_i&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=_i,xt=r.convert(y.type))),ie&&(Rt?e.texStorage2D(s.TEXTURE_2D,1,pt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,pt,Q.width,Q.height,0,kt,xt,null));else if(y.isDataTexture)if(Wt.length>0&&fe){Rt&&ie&&e.texStorage2D(s.TEXTURE_2D,ot,pt,Wt[0].width,Wt[0].height);for(let F=0,et=Wt.length;F<et;F++)mt=Wt[F],Rt?L&&e.texSubImage2D(s.TEXTURE_2D,F,0,0,mt.width,mt.height,kt,xt,mt.data):e.texImage2D(s.TEXTURE_2D,F,pt,mt.width,mt.height,0,kt,xt,mt.data);y.generateMipmaps=!1}else Rt?(ie&&e.texStorage2D(s.TEXTURE_2D,ot,pt,Q.width,Q.height),L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Q.width,Q.height,kt,xt,Q.data)):e.texImage2D(s.TEXTURE_2D,0,pt,Q.width,Q.height,0,kt,xt,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Rt&&ie&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ot,pt,Wt[0].width,Wt[0].height,Q.depth);for(let F=0,et=Wt.length;F<et;F++)mt=Wt[F],y.format!==on?kt!==null?Rt?L&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,F,0,0,0,mt.width,mt.height,Q.depth,kt,mt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,F,pt,mt.width,mt.height,Q.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Rt?L&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,F,0,0,0,mt.width,mt.height,Q.depth,kt,xt,mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,F,pt,mt.width,mt.height,Q.depth,0,kt,xt,mt.data)}else{Rt&&ie&&e.texStorage2D(s.TEXTURE_2D,ot,pt,Wt[0].width,Wt[0].height);for(let F=0,et=Wt.length;F<et;F++)mt=Wt[F],y.format!==on?kt!==null?Rt?L&&e.compressedTexSubImage2D(s.TEXTURE_2D,F,0,0,mt.width,mt.height,kt,mt.data):e.compressedTexImage2D(s.TEXTURE_2D,F,pt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Rt?L&&e.texSubImage2D(s.TEXTURE_2D,F,0,0,mt.width,mt.height,kt,xt,mt.data):e.texImage2D(s.TEXTURE_2D,F,pt,mt.width,mt.height,0,kt,xt,mt.data)}else if(y.isDataArrayTexture)Rt?(ie&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ot,pt,Q.width,Q.height,Q.depth),L&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,kt,xt,Q.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,pt,Q.width,Q.height,Q.depth,0,kt,xt,Q.data);else if(y.isData3DTexture)Rt?(ie&&e.texStorage3D(s.TEXTURE_3D,ot,pt,Q.width,Q.height,Q.depth),L&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,kt,xt,Q.data)):e.texImage3D(s.TEXTURE_3D,0,pt,Q.width,Q.height,Q.depth,0,kt,xt,Q.data);else if(y.isFramebufferTexture){if(ie)if(Rt)e.texStorage2D(s.TEXTURE_2D,ot,pt,Q.width,Q.height);else{let F=Q.width,et=Q.height;for(let ct=0;ct<ot;ct++)e.texImage2D(s.TEXTURE_2D,ct,pt,F,et,0,kt,xt,null),F>>=1,et>>=1}}else if(Wt.length>0&&fe){if(Rt&&ie){let F=he(Wt[0]);e.texStorage2D(s.TEXTURE_2D,ot,pt,F.width,F.height)}for(let F=0,et=Wt.length;F<et;F++)mt=Wt[F],Rt?L&&e.texSubImage2D(s.TEXTURE_2D,F,0,0,kt,xt,mt):e.texImage2D(s.TEXTURE_2D,F,pt,kt,xt,mt);y.generateMipmaps=!1}else if(Rt){if(ie){let F=he(Q);e.texStorage2D(s.TEXTURE_2D,ot,pt,F.width,F.height)}L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,kt,xt,Q)}else e.texImage2D(s.TEXTURE_2D,0,pt,kt,xt,Q);v(y,fe)&&S(Y),It.__version=J.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function Et(T,y,k){if(y.image.length!==6)return;let Y=K(T,y),j=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+k);let J=n.get(j);if(j.version!==J.__version||Y===!0){e.activeTexture(s.TEXTURE0+k);let It=Kt.getPrimaries(Kt.workingColorSpace),bt=y.colorSpace===qn?null:Kt.getPrimaries(y.colorSpace),st=y.colorSpace===qn||It===bt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);let lt=y.isCompressedTexture||y.image[0].isCompressedTexture,Lt=y.image[0]&&y.image[0].isDataTexture,Q=[];for(let F=0;F<6;F++)!lt&&!Lt?Q[F]=m(y.image[F],!1,!0,i.maxCubemapSize):Q[F]=Lt?y.image[F].image:y.image[F],Q[F]=Ht(y,Q[F]);let fe=Q[0],kt=p(fe)||o,xt=r.convert(y.format,y.colorSpace),pt=r.convert(y.type),mt=R(y.internalFormat,xt,pt,y.colorSpace),Wt=o&&y.isVideoTexture!==!0,Rt=J.__version===void 0||Y===!0,ie=j.dataReady,L=w(y,fe,kt);H(s.TEXTURE_CUBE_MAP,y,kt);let ot;if(lt){Wt&&Rt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,L,mt,fe.width,fe.height);for(let F=0;F<6;F++){ot=Q[F].mipmaps;for(let et=0;et<ot.length;et++){let ct=ot[et];y.format!==on?xt!==null?Wt?ie&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et,0,0,ct.width,ct.height,xt,ct.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et,mt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?ie&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et,0,0,ct.width,ct.height,xt,pt,ct.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et,mt,ct.width,ct.height,0,xt,pt,ct.data)}}}else{if(ot=y.mipmaps,Wt&&Rt){ot.length>0&&L++;let F=he(Q[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,L,mt,F.width,F.height)}for(let F=0;F<6;F++)if(Lt){Wt?ie&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,0,0,Q[F].width,Q[F].height,xt,pt,Q[F].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,mt,Q[F].width,Q[F].height,0,xt,pt,Q[F].data);for(let et=0;et<ot.length;et++){let Vt=ot[et].image[F].image;Wt?ie&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et+1,0,0,Vt.width,Vt.height,xt,pt,Vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et+1,mt,Vt.width,Vt.height,0,xt,pt,Vt.data)}}else{Wt?ie&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,0,0,xt,pt,Q[F]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,mt,xt,pt,Q[F]);for(let et=0;et<ot.length;et++){let ct=ot[et];Wt?ie&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et+1,0,0,xt,pt,ct.image[F]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,et+1,mt,xt,pt,ct.image[F])}}}v(y,kt)&&S(s.TEXTURE_CUBE_MAP),J.__version=j.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function vt(T,y,k,Y,j,J){let It=r.convert(k.format,k.colorSpace),bt=r.convert(k.type),st=R(k.internalFormat,It,bt,k.colorSpace);if(!n.get(y).__hasExternalTextures){let Lt=Math.max(1,y.width>>J),Q=Math.max(1,y.height>>J);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,J,st,Lt,Q,y.depth,0,It,bt,null):e.texImage2D(j,J,st,Lt,Q,0,It,bt,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),Gt(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,j,n.get(k).__webglTexture,0,Mt(y)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Y,j,n.get(k).__webglTexture,J),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ft(T,y,k){if(s.bindRenderbuffer(s.RENDERBUFFER,T),y.depthBuffer&&!y.stencilBuffer){let Y=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(k||Gt(y)){let j=y.depthTexture;j&&j.isDepthTexture&&(j.type===Dn?Y=s.DEPTH_COMPONENT32F:j.type===Yn&&(Y=s.DEPTH_COMPONENT24));let J=Mt(y);Gt(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,J,Y,y.width,y.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,J,Y,y.width,y.height)}else s.renderbufferStorage(s.RENDERBUFFER,Y,y.width,y.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(y.depthBuffer&&y.stencilBuffer){let Y=Mt(y);k&&Gt(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Y,s.DEPTH24_STENCIL8,y.width,y.height):Gt(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Y,s.DEPTH24_STENCIL8,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{let Y=y.textures;for(let j=0;j<Y.length;j++){let J=Y[j],It=r.convert(J.format,J.colorSpace),bt=r.convert(J.type),st=R(J.internalFormat,It,bt,J.colorSpace),lt=Mt(y);k&&Gt(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,lt,st,y.width,y.height):Gt(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,lt,st,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,st,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Zt(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),$(y.depthTexture,0);let Y=n.get(y.depthTexture).__webglTexture,j=Mt(y);if(y.depthTexture.format===yi)Gt(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Y,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Y,0);else if(y.depthTexture.format===ts)Gt(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Y,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Tt(T){let y=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Zt(y.__webglFramebuffer,T)}else if(k){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]=s.createRenderbuffer(),ft(y.__webglDepthbuffer[Y],T,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=s.createRenderbuffer(),ft(y.__webglDepthbuffer,T,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function U(T,y,k){let Y=n.get(T);y!==void 0&&vt(Y.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Tt(T)}function Ee(T){let y=T.texture,k=n.get(T),Y=n.get(y);T.addEventListener("dispose",N);let j=T.textures,J=T.isWebGLCubeRenderTarget===!0,It=j.length>1,bt=p(T)||o;if(It||(Y.__webglTexture===void 0&&(Y.__webglTexture=s.createTexture()),Y.__version=y.version,a.memory.textures++),J){k.__webglFramebuffer=[];for(let st=0;st<6;st++)if(o&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[st]=[];for(let lt=0;lt<y.mipmaps.length;lt++)k.__webglFramebuffer[st][lt]=s.createFramebuffer()}else k.__webglFramebuffer[st]=s.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let st=0;st<y.mipmaps.length;st++)k.__webglFramebuffer[st]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(It)if(i.drawBuffers)for(let st=0,lt=j.length;st<lt;st++){let Lt=n.get(j[st]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=s.createTexture(),a.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&Gt(T)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let st=0;st<j.length;st++){let lt=j[st];k.__webglColorRenderbuffer[st]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[st]);let Lt=r.convert(lt.format,lt.colorSpace),Q=r.convert(lt.type),fe=R(lt.internalFormat,Lt,Q,lt.colorSpace,T.isXRRenderTarget===!0),kt=Mt(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,kt,fe,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.RENDERBUFFER,k.__webglColorRenderbuffer[st])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),ft(k.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),H(s.TEXTURE_CUBE_MAP,y,bt);for(let st=0;st<6;st++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let lt=0;lt<y.mipmaps.length;lt++)vt(k.__webglFramebuffer[st][lt],T,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+st,lt);else vt(k.__webglFramebuffer[st],T,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);v(y,bt)&&S(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let st=0,lt=j.length;st<lt;st++){let Lt=j[st],Q=n.get(Lt);e.bindTexture(s.TEXTURE_2D,Q.__webglTexture),H(s.TEXTURE_2D,Lt,bt),vt(k.__webglFramebuffer,T,Lt,s.COLOR_ATTACHMENT0+st,s.TEXTURE_2D,0),v(Lt,bt)&&S(s.TEXTURE_2D)}e.unbindTexture()}else{let st=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?st=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(st,Y.__webglTexture),H(st,y,bt),o&&y.mipmaps&&y.mipmaps.length>0)for(let lt=0;lt<y.mipmaps.length;lt++)vt(k.__webglFramebuffer[lt],T,y,s.COLOR_ATTACHMENT0,st,lt);else vt(k.__webglFramebuffer,T,y,s.COLOR_ATTACHMENT0,st,0);v(y,bt)&&S(st),e.unbindTexture()}T.depthBuffer&&Tt(T)}function _t(T){let y=p(T)||o,k=T.textures;for(let Y=0,j=k.length;Y<j;Y++){let J=k[Y];if(v(J,y)){let It=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,bt=n.get(J).__webglTexture;e.bindTexture(It,bt),S(It),e.unbindTexture()}}}function Bt(T){if(o&&T.samples>0&&Gt(T)===!1){let y=T.textures,k=T.width,Y=T.height,j=s.COLOR_BUFFER_BIT,J=[],It=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,bt=n.get(T),st=y.length>1;if(st)for(let lt=0;lt<y.length;lt++)e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let lt=0;lt<y.length;lt++){J.push(s.COLOR_ATTACHMENT0+lt),T.depthBuffer&&J.push(It);let Lt=bt.__ignoreDepthValues!==void 0?bt.__ignoreDepthValues:!1;if(Lt===!1&&(T.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),st&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,bt.__webglColorRenderbuffer[lt]),Lt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[It]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[It])),st){let Q=n.get(y[lt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Q,0)}s.blitFramebuffer(0,0,k,Y,0,0,k,Y,j,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,J)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),st)for(let lt=0;lt<y.length;lt++){e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.RENDERBUFFER,bt.__webglColorRenderbuffer[lt]);let Lt=n.get(y[lt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.TEXTURE_2D,Lt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}}function Mt(T){return Math.min(i.maxSamples,T.samples)}function Gt(T){let y=n.get(T);return o&&T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ot(T){let y=a.render.frame;u.get(T)!==y&&(u.set(T,y),T.update())}function Ht(T,y){let k=T.colorSpace,Y=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===co||k!==ii&&k!==qn&&(Kt.getTransfer(k)===ne?o===!1?t.has("EXT_sRGB")===!0&&Y===on?(T.format=co,T.minFilter=we,T.generateMipmaps=!1):y=Ar.sRGBToLinear(y):(Y!==on||j!==Jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),y}function he(T){return typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement?(h.width=T.naturalWidth||T.width,h.height=T.naturalHeight||T.height):typeof VideoFrame!="undefined"&&T instanceof VideoFrame?(h.width=T.displayWidth,h.height=T.displayHeight):(h.width=T.width,h.height=T.height),h}this.allocateTextureUnit=W,this.resetTextureUnits=I,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=tt,this.rebindTextures=U,this.setupRenderTarget=Ee,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Gt}function Zg(s,t,e){let n=e.isWebGL2;function i(r,a=qn){let o,l=Kt.getTransfer(a);if(r===Jn)return s.UNSIGNED_BYTE;if(r===nh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===ih)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Tu)return s.BYTE;if(r===wu)return s.SHORT;if(r===Ko)return s.UNSIGNED_SHORT;if(r===eh)return s.INT;if(r===Yn)return s.UNSIGNED_INT;if(r===Dn)return s.FLOAT;if(r===Ts)return n?s.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Au)return s.ALPHA;if(r===on)return s.RGBA;if(r===Ru)return s.LUMINANCE;if(r===Cu)return s.LUMINANCE_ALPHA;if(r===yi)return s.DEPTH_COMPONENT;if(r===ts)return s.DEPTH_STENCIL;if(r===co)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Pu)return s.RED;if(r===sh)return s.RED_INTEGER;if(r===Iu)return s.RG;if(r===rh)return s.RG_INTEGER;if(r===ah)return s.RGBA_INTEGER;if(r===Ma||r===ba||r===Sa||r===Ea)if(l===ne)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ma)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ba)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Sa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ea)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ma)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ba)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Sa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ea)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Tl||r===wl||r===Al||r===Rl)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Tl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===wl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Al)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Rl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===oh)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Cl||r===Pl)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Cl)return l===ne?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Pl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Il||r===Ll||r===Dl||r===Ul||r===Nl||r===Ol||r===Fl||r===Bl||r===zl||r===Hl||r===kl||r===Vl||r===Gl||r===Wl)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Il)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ll)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Dl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ul)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Nl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ol)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Fl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Bl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===zl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Hl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===kl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Vl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Gl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Wl)return l===ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ta||r===Xl||r===ql)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Ta)return l===ne?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Xl)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ql)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Lu||r===Yl||r===Zl||r===$l)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Ta)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Yl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Zl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===$l)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===_i?n?s.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var Eo=class extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Yt=class extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}},$g={type:"move"},bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($g)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Jg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Kg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,To=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new We,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}render(t,e){if(this.texture!==null){if(this.mesh===null){let n=e.cameras[0].viewport,i=new yn({extensions:{fragDepth:!0},vertexShader:Jg,fragmentShader:Kg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new rt(new Se(20,20),i)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}},wo=class extends Qn{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=new To,m=e.getContextAttributes(),p=null,M=null,v=[],S=[],R=new at,w=null,A=new ze;A.layers.enable(1),A.viewport=new Me;let P=new ze;P.layers.enable(2),P.viewport=new Me;let N=[A,P],_=new Eo;_.layers.enable(1),_.layers.enable(2);let E=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let K=v[H];return K===void 0&&(K=new bs,v[H]=K),K.getTargetRaySpace()},this.getControllerGrip=function(H){let K=v[H];return K===void 0&&(K=new bs,v[H]=K),K.getGripSpace()},this.getHand=function(H){let K=v[H];return K===void 0&&(K=new bs,v[H]=K),K.getHandSpace()};function Z(H){let K=S.indexOf(H.inputSource);if(K===-1)return;let ut=v[K];ut!==void 0&&(ut.update(H.inputSource,H.frame,c||a),ut.dispatchEvent({type:H.type,data:H.inputSource}))}function I(){i.removeEventListener("select",Z),i.removeEventListener("selectstart",Z),i.removeEventListener("selectend",Z),i.removeEventListener("squeeze",Z),i.removeEventListener("squeezestart",Z),i.removeEventListener("squeezeend",Z),i.removeEventListener("end",I),i.removeEventListener("inputsourceschange",W);for(let H=0;H<v.length;H++){let K=S[H];K!==null&&(S[H]=null,v[H].disconnect(K))}E=null,G=null,x.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,M=null,Pt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",Z),i.addEventListener("selectstart",Z),i.addEventListener("selectend",Z),i.addEventListener("squeeze",Z),i.addEventListener("squeezestart",Z),i.addEventListener("squeezeend",Z),i.addEventListener("end",I),i.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let K={antialias:i.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,K),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new On(f.framebufferWidth,f.framebufferHeight,{format:on,type:Jn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let K=null,ut=null,Et=null;m.depth&&(Et=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,K=m.stencil?ts:yi,ut=m.stencil?_i:Yn);let vt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(vt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new On(d.textureWidth,d.textureHeight,{format:on,type:Jn,depthTexture:new Or(d.textureWidth,d.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0});let ft=t.properties.get(M);ft.__ignoreDepthValues=d.ignoreDepthValues}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Pt.setContext(i),Pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function W(H){for(let K=0;K<H.removed.length;K++){let ut=H.removed[K],Et=S.indexOf(ut);Et>=0&&(S[Et]=null,v[Et].disconnect(ut))}for(let K=0;K<H.added.length;K++){let ut=H.added[K],Et=S.indexOf(ut);if(Et===-1){for(let ft=0;ft<v.length;ft++)if(ft>=S.length){S.push(ut),Et=ft;break}else if(S[ft]===null){S[ft]=ut,Et=ft;break}if(Et===-1)break}let vt=v[Et];vt&&vt.connect(ut)}}let V=new C,$=new C;function X(H,K,ut){V.setFromMatrixPosition(K.matrixWorld),$.setFromMatrixPosition(ut.matrixWorld);let Et=V.distanceTo($),vt=K.projectionMatrix.elements,ft=ut.projectionMatrix.elements,Zt=vt[14]/(vt[10]-1),Tt=vt[14]/(vt[10]+1),U=(vt[9]+1)/vt[5],Ee=(vt[9]-1)/vt[5],_t=(vt[8]-1)/vt[0],Bt=(ft[8]+1)/ft[0],Mt=Zt*_t,Gt=Zt*Bt,Ot=Et/(-_t+Bt),Ht=Ot*-_t;K.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Ht),H.translateZ(Ot),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let he=Zt+Ot,T=Tt+Ot,y=Mt-Ht,k=Gt+(Et-Ht),Y=U*Tt/T*he,j=Ee*Tt/T*he;H.projectionMatrix.makePerspective(y,k,Y,j,he,T),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function q(H,K){K===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(K.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;x.texture!==null&&(H.near=x.depthNear,H.far=x.depthFar),_.near=P.near=A.near=H.near,_.far=P.far=A.far=H.far,(E!==_.near||G!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),E=_.near,G=_.far,A.near=E,A.far=G,P.near=E,P.far=G,A.updateProjectionMatrix(),P.updateProjectionMatrix(),H.updateProjectionMatrix());let K=H.parent,ut=_.cameras;q(_,K);for(let Et=0;Et<ut.length;Et++)q(ut[Et],K);ut.length===2?X(_,A,P):_.projectionMatrix.copy(A.projectionMatrix),tt(H,_,K)};function tt(H,K,ut){ut===null?H.matrix.copy(K.matrixWorld):(H.matrix.copy(ut.matrixWorld),H.matrix.invert(),H.matrix.multiply(K.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(K.projectionMatrix),H.projectionMatrixInverse.copy(K.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=ws*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(H){l=H,d!==null&&(d.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return x.texture!==null};let it=null;function dt(H,K){if(h=K.getViewerPose(c||a),g=K,h!==null){let ut=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Et=!1;ut.length!==_.cameras.length&&(_.cameras.length=0,Et=!0);for(let ft=0;ft<ut.length;ft++){let Zt=ut[ft],Tt=null;if(f!==null)Tt=f.getViewport(Zt);else{let Ee=u.getViewSubImage(d,Zt);Tt=Ee.viewport,ft===0&&(t.setRenderTargetTextures(M,Ee.colorTexture,d.ignoreDepthValues?void 0:Ee.depthStencilTexture),t.setRenderTarget(M))}let U=N[ft];U===void 0&&(U=new ze,U.layers.enable(ft),U.viewport=new Me,N[ft]=U),U.matrix.fromArray(Zt.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(Zt.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(Tt.x,Tt.y,Tt.width,Tt.height),ft===0&&(_.matrix.copy(U.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),Et===!0&&_.cameras.push(U)}let vt=i.enabledFeatures;if(vt&&vt.includes("depth-sensing")){let ft=u.getDepthInformation(ut[0]);ft&&ft.isValid&&ft.texture&&x.init(t,ft,i.renderState)}}for(let ut=0;ut<v.length;ut++){let Et=S[ut],vt=v[ut];Et!==null&&vt!==void 0&&vt.update(Et,K,c||a)}x.render(t,_),it&&it(H,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}let Pt=new ph;Pt.setAnimationLoop(dt),this.setAnimationLoop=function(H){it=H},this.dispose=function(){}}},fi=new xn,jg=new oe;function Qg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,fh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,v,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Le&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Le&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),v=M.envMap,S=M.envMapRotation;if(v&&(m.envMap.value=v,fi.copy(S),fi.x*=-1,fi.y*=-1,fi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),m.envMapRotation.value.setFromMatrix4(jg.makeRotationFromEuler(fi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let R=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*R,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Le&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function t0(s,t,e,n){let i={},r={},a=[],o=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){let S=v.program;n.uniformBlockBinding(M,S)}function c(M,v){let S=i[M.id];S===void 0&&(g(M),S=h(M),i[M.id]=S,M.addEventListener("dispose",m));let R=v.program;n.updateUBOMapping(M,R);let w=t.render.frame;r[M.id]!==w&&(d(M),r[M.id]=w)}function h(M){let v=u();M.__bindingPointIndex=v;let S=s.createBuffer(),R=M.__size,w=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,R,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,S),S}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let v=i[M.id],S=M.uniforms,R=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let w=0,A=S.length;w<A;w++){let P=Array.isArray(S[w])?S[w]:[S[w]];for(let N=0,_=P.length;N<_;N++){let E=P[N];if(f(E,w,N,R)===!0){let G=E.__offset,Z=Array.isArray(E.value)?E.value:[E.value],I=0;for(let W=0;W<Z.length;W++){let V=Z[W],$=x(V);typeof V=="number"||typeof V=="boolean"?(E.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,G+I,E.__data)):V.isMatrix3?(E.__data[0]=V.elements[0],E.__data[1]=V.elements[1],E.__data[2]=V.elements[2],E.__data[3]=0,E.__data[4]=V.elements[3],E.__data[5]=V.elements[4],E.__data[6]=V.elements[5],E.__data[7]=0,E.__data[8]=V.elements[6],E.__data[9]=V.elements[7],E.__data[10]=V.elements[8],E.__data[11]=0):(V.toArray(E.__data,I),I+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,E.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,v,S,R){let w=M.value,A=v+"_"+S;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{let P=R[A];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[A]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(M){let v=M.uniforms,S=0,R=16;for(let A=0,P=v.length;A<P;A++){let N=Array.isArray(v[A])?v[A]:[v[A]];for(let _=0,E=N.length;_<E;_++){let G=N[_],Z=Array.isArray(G.value)?G.value:[G.value];for(let I=0,W=Z.length;I<W;I++){let V=Z[I],$=x(V),X=S%R;X!==0&&R-X<$.boundary&&(S+=R-X),G.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=$.storage}}}let w=S%R;return w>0&&(S+=R-w),M.__size=S,M.__cache={},this}function x(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){let v=M.target;v.removeEventListener("dispose",m);let S=a.indexOf(v.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(let M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Cs=class{constructor(t={}){let{canvas:e=id(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;let f=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,p=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ae,this._useLegacyLights=!1,this.toneMapping=$n,this.toneMappingExposure=1;let v=this,S=!1,R=0,w=0,A=null,P=-1,N=null,_=new Me,E=new Me,G=null,Z=new wt(0),I=0,W=e.width,V=e.height,$=1,X=null,q=null,tt=new Me(0,0,W,V),it=new Me(0,0,W,V),dt=!1,Pt=new Rs,H=!1,K=!1,ut=null,Et=new oe,vt=new at,ft=new C,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Tt(){return A===null?$:1}let U=n;function Ee(b,D){for(let B=0;B<b.length;B++){let z=b[B],O=e.getContext(z,D);if(O!==null)return O}return null}try{let b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r162"),e.addEventListener("webglcontextlost",ie,!1),e.addEventListener("webglcontextrestored",L,!1),e.addEventListener("webglcontextcreationerror",ot,!1),U===null){let D=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&D.shift(),U=Ee(D,b),U===null)throw Ee(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let _t,Bt,Mt,Gt,Ot,Ht,he,T,y,k,Y,j,J,It,bt,st,lt,Lt,Q,fe,kt,xt,pt,mt;function Wt(){_t=new gm(U),Bt=new hm(U,_t,t),_t.init(Bt),xt=new Zg(U,_t,Bt),Mt=new qg(U,_t,Bt),Gt=new _m(U),Ot=new Ug,Ht=new Yg(U,_t,Mt,Ot,Bt,xt,Gt),he=new dm(v),T=new mm(v),y=new Ed(U,Bt),pt=new lm(U,_t,y,Bt),k=new vm(U,y,Gt,pt),Y=new Sm(U,k,y,Gt),Q=new bm(U,Bt,Ht),st=new um(Ot),j=new Dg(v,he,T,_t,Bt,pt,st),J=new Qg(v,Ot),It=new Og,bt=new Vg(_t,Bt),Lt=new om(v,he,T,Mt,Y,d,l),lt=new Xg(v,Y,Bt),mt=new t0(U,Gt,Bt,Mt),fe=new cm(U,_t,Gt,Bt),kt=new xm(U,_t,Gt,Bt),Gt.programs=j.programs,v.capabilities=Bt,v.extensions=_t,v.properties=Ot,v.renderLists=It,v.shadowMap=lt,v.state=Mt,v.info=Gt}Wt();let Rt=new wo(v,U);this.xr=Rt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let b=_t.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=_t.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(b){b!==void 0&&($=b,this.setSize(W,V,!1))},this.getSize=function(b){return b.set(W,V)},this.setSize=function(b,D,B=!0){if(Rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=b,V=D,e.width=Math.floor(b*$),e.height=Math.floor(D*$),B===!0&&(e.style.width=b+"px",e.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(W*$,V*$).floor()},this.setDrawingBufferSize=function(b,D,B){W=b,V=D,$=B,e.width=Math.floor(b*B),e.height=Math.floor(D*B),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(_)},this.getViewport=function(b){return b.copy(tt)},this.setViewport=function(b,D,B,z){b.isVector4?tt.set(b.x,b.y,b.z,b.w):tt.set(b,D,B,z),Mt.viewport(_.copy(tt).multiplyScalar($).round())},this.getScissor=function(b){return b.copy(it)},this.setScissor=function(b,D,B,z){b.isVector4?it.set(b.x,b.y,b.z,b.w):it.set(b,D,B,z),Mt.scissor(E.copy(it).multiplyScalar($).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(b){Mt.setScissorTest(dt=b)},this.setOpaqueSort=function(b){X=b},this.setTransparentSort=function(b){q=b},this.getClearColor=function(b){return b.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(b=!0,D=!0,B=!0){let z=0;if(b){let O=!1;if(A!==null){let ht=A.texture.format;O=ht===ah||ht===rh||ht===sh}if(O){let ht=A.texture.type,gt=ht===Jn||ht===Yn||ht===Ko||ht===_i||ht===nh||ht===ih,yt=Lt.getClearColor(),St=Lt.getClearAlpha(),Ft=yt.r,At=yt.g,Ct=yt.b;gt?(f[0]=Ft,f[1]=At,f[2]=Ct,f[3]=St,U.clearBufferuiv(U.COLOR,0,f)):(g[0]=Ft,g[1]=At,g[2]=Ct,g[3]=St,U.clearBufferiv(U.COLOR,0,g))}else z|=U.COLOR_BUFFER_BIT}D&&(z|=U.DEPTH_BUFFER_BIT),B&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ie,!1),e.removeEventListener("webglcontextrestored",L,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),It.dispose(),bt.dispose(),Ot.dispose(),he.dispose(),T.dispose(),Y.dispose(),pt.dispose(),mt.dispose(),j.dispose(),Rt.dispose(),Rt.removeEventListener("sessionstart",Ze),Rt.removeEventListener("sessionend",ee),ut&&(ut.dispose(),ut=null),Ne.stop()};function ie(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let b=Gt.autoReset,D=lt.enabled,B=lt.autoUpdate,z=lt.needsUpdate,O=lt.type;Wt(),Gt.autoReset=b,lt.enabled=D,lt.autoUpdate=B,lt.needsUpdate=z,lt.type=O}function ot(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function F(b){let D=b.target;D.removeEventListener("dispose",F),et(D)}function et(b){ct(b),Ot.remove(b)}function ct(b){let D=Ot.get(b).programs;D!==void 0&&(D.forEach(function(B){j.releaseProgram(B)}),b.isShaderMaterial&&j.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,B,z,O,ht){D===null&&(D=Zt);let gt=O.isMesh&&O.matrixWorld.determinant()<0,yt=zh(b,D,B,z,O);Mt.setMaterial(z,gt);let St=B.index,Ft=1;if(z.wireframe===!0){if(St=k.getWireframeAttribute(B),St===void 0)return;Ft=2}let At=B.drawRange,Ct=B.attributes.position,ue=At.start*Ft,ke=(At.start+At.count)*Ft;ht!==null&&(ue=Math.max(ue,ht.start*Ft),ke=Math.min(ke,(ht.start+ht.count)*Ft)),St!==null?(ue=Math.max(ue,0),ke=Math.min(ke,St.count)):Ct!=null&&(ue=Math.max(ue,0),ke=Math.min(ke,Ct.count));let xe=ke-ue;if(xe<0||xe===1/0)return;pt.setup(O,z,yt,B,St);let En,le=fe;if(St!==null&&(En=y.get(St),le=kt,le.setIndex(En)),O.isMesh)z.wireframe===!0?(Mt.setLineWidth(z.wireframeLinewidth*Tt()),le.setMode(U.LINES)):le.setMode(U.TRIANGLES);else if(O.isLine){let Dt=z.linewidth;Dt===void 0&&(Dt=1),Mt.setLineWidth(Dt*Tt()),O.isLineSegments?le.setMode(U.LINES):O.isLineLoop?le.setMode(U.LINE_LOOP):le.setMode(U.LINE_STRIP)}else O.isPoints?le.setMode(U.POINTS):O.isSprite&&le.setMode(U.TRIANGLES);if(O.isBatchedMesh)le.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)le.renderInstances(ue,xe,O.count);else if(B.isInstancedBufferGeometry){let Dt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,fa=Math.min(B.instanceCount,Dt);le.renderInstances(ue,xe,fa)}else le.render(ue,xe)};function Vt(b,D,B){b.transparent===!0&&b.side===jt&&b.forceSinglePass===!1?(b.side=Le,b.needsUpdate=!0,ks(b,D,B),b.side=Kn,b.needsUpdate=!0,ks(b,D,B),b.side=jt):ks(b,D,B)}this.compile=function(b,D,B=null){B===null&&(B=b),m=bt.get(B),m.init(),M.push(m),B.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),b!==B&&b.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights(v._useLegacyLights);let z=new Set;return b.traverse(function(O){let ht=O.material;if(ht)if(Array.isArray(ht))for(let gt=0;gt<ht.length;gt++){let yt=ht[gt];Vt(yt,B,O),z.add(yt)}else Vt(ht,B,O),z.add(ht)}),M.pop(),m=null,z},this.compileAsync=function(b,D,B=null){let z=this.compile(b,D,B);return new Promise(O=>{function ht(){if(z.forEach(function(gt){Ot.get(gt).currentProgram.isReady()&&z.delete(gt)}),z.size===0){O(b);return}setTimeout(ht,10)}_t.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let te=null;function Te(b){te&&te(b)}function Ze(){Ne.stop()}function ee(){Ne.start()}let Ne=new ph;Ne.setAnimationLoop(Te),typeof self!="undefined"&&Ne.setContext(self),this.setAnimationLoop=function(b){te=b,Rt.setAnimationLoop(b),b===null?Ne.stop():Ne.start()},Rt.addEventListener("sessionstart",Ze),Rt.addEventListener("sessionend",ee),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Rt.enabled===!0&&Rt.isPresenting===!0&&(Rt.cameraAutoUpdate===!0&&Rt.updateCamera(D),D=Rt.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,D,A),m=bt.get(b,M.length),m.init(),M.push(m),Et.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Pt.setFromProjectionMatrix(Et),K=this.localClippingEnabled,H=st.init(this.clippingPlanes,K),x=It.get(b,p.length),x.init(),p.push(x),mn(b,D,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(X,q),this.info.render.frame++,H===!0&&st.beginShadows();let B=m.state.shadowsArray;if(lt.render(B,b,D),H===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Rt.enabled===!1||Rt.isPresenting===!1||Rt.hasDepthSensing()===!1)&&Lt.render(x,b),m.setupLights(v._useLegacyLights),D.isArrayCamera){let z=D.cameras;for(let O=0,ht=z.length;O<ht;O++){let gt=z[O];ll(x,b,gt,gt.viewport)}}else ll(x,b,D);A!==null&&(Ht.updateMultisampleRenderTarget(A),Ht.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(v,b,D),pt.resetDefaultState(),P=-1,N=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function mn(b,D,B,z){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Pt.intersectsSprite(b)){z&&ft.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Et);let gt=Y.update(b),yt=b.material;yt.visible&&x.push(b,gt,yt,B,ft.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Pt.intersectsObject(b))){let gt=Y.update(b),yt=b.material;if(z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ft.copy(b.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),ft.copy(gt.boundingSphere.center)),ft.applyMatrix4(b.matrixWorld).applyMatrix4(Et)),Array.isArray(yt)){let St=gt.groups;for(let Ft=0,At=St.length;Ft<At;Ft++){let Ct=St[Ft],ue=yt[Ct.materialIndex];ue&&ue.visible&&x.push(b,gt,ue,B,ft.z,Ct)}}else yt.visible&&x.push(b,gt,yt,B,ft.z,null)}}let ht=b.children;for(let gt=0,yt=ht.length;gt<yt;gt++)mn(ht[gt],D,B,z)}function ll(b,D,B,z){let O=b.opaque,ht=b.transmissive,gt=b.transparent;m.setupLightsView(B),H===!0&&st.setGlobalState(v.clippingPlanes,B),ht.length>0&&Bh(O,ht,D,B),z&&Mt.viewport(_.copy(z)),O.length>0&&Hs(O,D,B),ht.length>0&&Hs(ht,D,B),gt.length>0&&Hs(gt,D,B),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Bh(b,D,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;let ht=Bt.isWebGL2;ut===null&&(ut=new On(1,1,{generateMipmaps:!0,type:_t.has("EXT_color_buffer_half_float")?Ts:Jn,minFilter:vi,samples:ht?4:0})),v.getDrawingBufferSize(vt),ht?ut.setSize(vt.x,vt.y):ut.setSize(Tr(vt.x),Tr(vt.y));let gt=v.getRenderTarget();v.setRenderTarget(ut),v.getClearColor(Z),I=v.getClearAlpha(),I<1&&v.setClearColor(16777215,.5),v.clear();let yt=v.toneMapping;v.toneMapping=$n,Hs(b,B,z),Ht.updateMultisampleRenderTarget(ut),Ht.updateRenderTargetMipmap(ut);let St=!1;for(let Ft=0,At=D.length;Ft<At;Ft++){let Ct=D[Ft],ue=Ct.object,ke=Ct.geometry,xe=Ct.material,En=Ct.group;if(xe.side===jt&&ue.layers.test(z.layers)){let le=xe.side;xe.side=Le,xe.needsUpdate=!0,cl(ue,B,z,ke,xe,En),xe.side=le,xe.needsUpdate=!0,St=!0}}St===!0&&(Ht.updateMultisampleRenderTarget(ut),Ht.updateRenderTargetMipmap(ut)),v.setRenderTarget(gt),v.setClearColor(Z,I),v.toneMapping=yt}function Hs(b,D,B){let z=D.isScene===!0?D.overrideMaterial:null;for(let O=0,ht=b.length;O<ht;O++){let gt=b[O],yt=gt.object,St=gt.geometry,Ft=z===null?gt.material:z,At=gt.group;yt.layers.test(B.layers)&&cl(yt,D,B,St,Ft,At)}}function cl(b,D,B,z,O,ht){b.onBeforeRender(v,D,B,z,O,ht),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(v,D,B,z,b,ht),O.transparent===!0&&O.side===jt&&O.forceSinglePass===!1?(O.side=Le,O.needsUpdate=!0,v.renderBufferDirect(B,D,z,O,b,ht),O.side=Kn,O.needsUpdate=!0,v.renderBufferDirect(B,D,z,O,b,ht),O.side=jt):v.renderBufferDirect(B,D,z,O,b,ht),b.onAfterRender(v,D,B,z,O,ht)}function ks(b,D,B){D.isScene!==!0&&(D=Zt);let z=Ot.get(b),O=m.state.lights,ht=m.state.shadowsArray,gt=O.state.version,yt=j.getParameters(b,O.state,ht,D,B),St=j.getProgramCacheKey(yt),Ft=z.programs;z.environment=b.isMeshStandardMaterial?D.environment:null,z.fog=D.fog,z.envMap=(b.isMeshStandardMaterial?T:he).get(b.envMap||z.environment),z.envMapRotation=z.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Ft===void 0&&(b.addEventListener("dispose",F),Ft=new Map,z.programs=Ft);let At=Ft.get(St);if(At!==void 0){if(z.currentProgram===At&&z.lightsStateVersion===gt)return ul(b,yt),At}else yt.uniforms=j.getUniforms(b),b.onBuild(B,yt,v),b.onBeforeCompile(yt,v),At=j.acquireProgram(yt,St),Ft.set(St,At),z.uniforms=yt.uniforms;let Ct=z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ct.clippingPlanes=st.uniform),ul(b,yt),z.needsLights=kh(b),z.lightsStateVersion=gt,z.needsLights&&(Ct.ambientLightColor.value=O.state.ambient,Ct.lightProbe.value=O.state.probe,Ct.directionalLights.value=O.state.directional,Ct.directionalLightShadows.value=O.state.directionalShadow,Ct.spotLights.value=O.state.spot,Ct.spotLightShadows.value=O.state.spotShadow,Ct.rectAreaLights.value=O.state.rectArea,Ct.ltc_1.value=O.state.rectAreaLTC1,Ct.ltc_2.value=O.state.rectAreaLTC2,Ct.pointLights.value=O.state.point,Ct.pointLightShadows.value=O.state.pointShadow,Ct.hemisphereLights.value=O.state.hemi,Ct.directionalShadowMap.value=O.state.directionalShadowMap,Ct.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ct.spotShadowMap.value=O.state.spotShadowMap,Ct.spotLightMatrix.value=O.state.spotLightMatrix,Ct.spotLightMap.value=O.state.spotLightMap,Ct.pointShadowMap.value=O.state.pointShadowMap,Ct.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=At,z.uniformsList=null,At}function hl(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=Ji.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function ul(b,D){let B=Ot.get(b);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function zh(b,D,B,z,O){D.isScene!==!0&&(D=Zt),Ht.resetTextureUnits();let ht=D.fog,gt=z.isMeshStandardMaterial?D.environment:null,yt=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ii,St=(z.isMeshStandardMaterial?T:he).get(z.envMap||gt),Ft=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,At=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ct=!!B.morphAttributes.position,ue=!!B.morphAttributes.normal,ke=!!B.morphAttributes.color,xe=$n;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(xe=v.toneMapping);let En=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,le=En!==void 0?En.length:0,Dt=Ot.get(z),fa=m.state.lights;if(H===!0&&(K===!0||b!==N)){let $e=b===N&&z.id===P;st.setState(z,b,$e)}let se=!1;z.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==fa.state.version||Dt.outputColorSpace!==yt||O.isBatchedMesh&&Dt.batching===!1||!O.isBatchedMesh&&Dt.batching===!0||O.isInstancedMesh&&Dt.instancing===!1||!O.isInstancedMesh&&Dt.instancing===!0||O.isSkinnedMesh&&Dt.skinning===!1||!O.isSkinnedMesh&&Dt.skinning===!0||O.isInstancedMesh&&Dt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Dt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Dt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Dt.instancingMorph===!1&&O.morphTexture!==null||Dt.envMap!==St||z.fog===!0&&Dt.fog!==ht||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==st.numPlanes||Dt.numIntersection!==st.numIntersection)||Dt.vertexAlphas!==Ft||Dt.vertexTangents!==At||Dt.morphTargets!==Ct||Dt.morphNormals!==ue||Dt.morphColors!==ke||Dt.toneMapping!==xe||Bt.isWebGL2===!0&&Dt.morphTargetsCount!==le)&&(se=!0):(se=!0,Dt.__version=z.version);let ai=Dt.currentProgram;se===!0&&(ai=ks(z,D,O));let dl=!1,us=!1,pa=!1,Ce=ai.getUniforms(),oi=Dt.uniforms;if(Mt.useProgram(ai.program)&&(dl=!0,us=!0,pa=!0),z.id!==P&&(P=z.id,us=!0),dl||N!==b){Ce.setValue(U,"projectionMatrix",b.projectionMatrix),Ce.setValue(U,"viewMatrix",b.matrixWorldInverse);let $e=Ce.map.cameraPosition;$e!==void 0&&$e.setValue(U,ft.setFromMatrixPosition(b.matrixWorld)),Bt.logarithmicDepthBuffer&&Ce.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Ce.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),N!==b&&(N=b,us=!0,pa=!0)}if(O.isSkinnedMesh){Ce.setOptional(U,O,"bindMatrix"),Ce.setOptional(U,O,"bindMatrixInverse");let $e=O.skeleton;$e&&(Bt.floatVertexTextures?($e.boneTexture===null&&$e.computeBoneTexture(),Ce.setValue(U,"boneTexture",$e.boneTexture,Ht)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Ce.setOptional(U,O,"batchingTexture"),Ce.setValue(U,"batchingTexture",O._matricesTexture,Ht));let ma=B.morphAttributes;if((ma.position!==void 0||ma.normal!==void 0||ma.color!==void 0&&Bt.isWebGL2===!0)&&Q.update(O,B,ai),(us||Dt.receiveShadow!==O.receiveShadow)&&(Dt.receiveShadow=O.receiveShadow,Ce.setValue(U,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(oi.envMap.value=St,oi.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),us&&(Ce.setValue(U,"toneMappingExposure",v.toneMappingExposure),Dt.needsLights&&Hh(oi,pa),ht&&z.fog===!0&&J.refreshFogUniforms(oi,ht),J.refreshMaterialUniforms(oi,z,$,V,ut),Ji.upload(U,hl(Dt),oi,Ht)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ji.upload(U,hl(Dt),oi,Ht),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Ce.setValue(U,"center",O.center),Ce.setValue(U,"modelViewMatrix",O.modelViewMatrix),Ce.setValue(U,"normalMatrix",O.normalMatrix),Ce.setValue(U,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let $e=z.uniformsGroups;for(let ga=0,Vh=$e.length;ga<Vh;ga++)if(Bt.isWebGL2){let fl=$e[ga];mt.update(fl,ai),mt.bind(fl,ai)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ai}function Hh(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function kh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,D,B){Ot.get(b.texture).__webglTexture=D,Ot.get(b.depthTexture).__webglTexture=B;let z=Ot.get(b);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||_t.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,D){let B=Ot.get(b);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,B=0){A=b,R=D,w=B;let z=!0,O=null,ht=!1,gt=!1;if(b){let St=Ot.get(b);St.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(U.FRAMEBUFFER,null),z=!1):St.__webglFramebuffer===void 0?Ht.setupRenderTarget(b):St.__hasExternalTextures&&Ht.rebindTextures(b,Ot.get(b.texture).__webglTexture,Ot.get(b.depthTexture).__webglTexture);let Ft=b.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(gt=!0);let At=Ot.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(At[D])?O=At[D][B]:O=At[D],ht=!0):Bt.isWebGL2&&b.samples>0&&Ht.useMultisampledRTT(b)===!1?O=Ot.get(b).__webglMultisampledFramebuffer:Array.isArray(At)?O=At[B]:O=At,_.copy(b.viewport),E.copy(b.scissor),G=b.scissorTest}else _.copy(tt).multiplyScalar($).floor(),E.copy(it).multiplyScalar($).floor(),G=dt;if(Mt.bindFramebuffer(U.FRAMEBUFFER,O)&&Bt.drawBuffers&&z&&Mt.drawBuffers(b,O),Mt.viewport(_),Mt.scissor(E),Mt.setScissorTest(G),ht){let St=Ot.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,St.__webglTexture,B)}else if(gt){let St=Ot.get(b.texture),Ft=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,St.__webglTexture,B||0,Ft)}P=-1},this.readRenderTargetPixels=function(b,D,B,z,O,ht,gt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=Ot.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt){Mt.bindFramebuffer(U.FRAMEBUFFER,yt);try{let St=b.texture,Ft=St.format,At=St.type;if(Ft!==on&&xt.convert(Ft)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ct=At===Ts&&(_t.has("EXT_color_buffer_half_float")||Bt.isWebGL2&&_t.has("EXT_color_buffer_float"));if(At!==Jn&&xt.convert(At)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(At===Dn&&(Bt.isWebGL2||_t.has("OES_texture_float")||_t.has("WEBGL_color_buffer_float")))&&!Ct){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-z&&B>=0&&B<=b.height-O&&U.readPixels(D,B,z,O,xt.convert(Ft),xt.convert(At),ht)}finally{let St=A!==null?Ot.get(A).__webglFramebuffer:null;Mt.bindFramebuffer(U.FRAMEBUFFER,St)}}},this.copyFramebufferToTexture=function(b,D,B=0){let z=Math.pow(2,-B),O=Math.floor(D.image.width*z),ht=Math.floor(D.image.height*z);Ht.setTexture2D(D,0),U.copyTexSubImage2D(U.TEXTURE_2D,B,0,0,b.x,b.y,O,ht),Mt.unbindTexture()},this.copyTextureToTexture=function(b,D,B,z=0){let O=D.image.width,ht=D.image.height,gt=xt.convert(B.format),yt=xt.convert(B.type);Ht.setTexture2D(B,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment),D.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,z,b.x,b.y,O,ht,gt,yt,D.image.data):D.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,z,b.x,b.y,D.mipmaps[0].width,D.mipmaps[0].height,gt,D.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,z,b.x,b.y,gt,yt,D.image),z===0&&B.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(b,D,B,z,O=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let ht=Math.round(b.max.x-b.min.x),gt=Math.round(b.max.y-b.min.y),yt=b.max.z-b.min.z+1,St=xt.convert(z.format),Ft=xt.convert(z.type),At;if(z.isData3DTexture)Ht.setTexture3D(z,0),At=U.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)Ht.setTexture2DArray(z,0),At=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);let Ct=U.getParameter(U.UNPACK_ROW_LENGTH),ue=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ke=U.getParameter(U.UNPACK_SKIP_PIXELS),xe=U.getParameter(U.UNPACK_SKIP_ROWS),En=U.getParameter(U.UNPACK_SKIP_IMAGES),le=B.isCompressedTexture?B.mipmaps[O]:B.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,le.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,b.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,b.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,b.min.z),B.isDataTexture||B.isData3DTexture?U.texSubImage3D(At,O,D.x,D.y,D.z,ht,gt,yt,St,Ft,le.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(At,O,D.x,D.y,D.z,ht,gt,yt,St,le.data):U.texSubImage3D(At,O,D.x,D.y,D.z,ht,gt,yt,St,Ft,le),U.pixelStorei(U.UNPACK_ROW_LENGTH,Ct),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ue),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ke),U.pixelStorei(U.UNPACK_SKIP_ROWS,xe),U.pixelStorei(U.UNPACK_SKIP_IMAGES,En),O===0&&z.generateMipmaps&&U.generateMipmap(At),Mt.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?Ht.setTextureCube(b,0):b.isData3DTexture?Ht.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ht.setTexture2DArray(b,0):Ht.setTexture2D(b,0),Mt.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,Mt.reset(),pt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===jo?"display-p3":"srgb",e.unpackColorSpace=Kt.workingColorSpace===$r?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},Ao=class extends Cs{};Ao.prototype.isWebGL1Renderer=!0;var Fr=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new wt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},is=class extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ro=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=lo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return uh("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Oe=new C,Br=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),i=$t(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),i=$t(i,this.array),r=$t(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},hn=class extends _n{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Vi,vs=new C,Gi=new C,Wi=new C,Xi=new at,xs=new at,yh=new oe,hr=new C,_s=new C,ur=new C,kc=new at,Ka=new at,Vc=new at,Mn=class extends be{constructor(t=new hn){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new ce;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ro(e,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new Br(n,3,0,!1)),Vi.setAttribute("uv",new Br(n,2,3,!1))}this.geometry=Vi,this.material=t,this.center=new at(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),yh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Wi.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;dr(hr.set(-.5,-.5,0),Wi,a,Gi,i,r),dr(_s.set(.5,-.5,0),Wi,a,Gi,i,r),dr(ur.set(.5,.5,0),Wi,a,Gi,i,r),kc.set(0,0),Ka.set(1,0),Vc.set(1,1);let o=t.ray.intersectTriangle(hr,_s,ur,!1,vs);if(o===null&&(dr(_s.set(-.5,.5,0),Wi,a,Gi,i,r),Ka.set(0,1),o=t.ray.intersectTriangle(hr,ur,_s,!1,vs),o===null))return;let l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:xi.getInterpolation(vs,hr,_s,ur,kc,Ka,Vc,new at),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function dr(s,t,e,n,i,r){Xi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(xs.x=r*Xi.x-i*Xi.y,xs.y=i*Xi.x+r*Xi.y):xs.copy(Xi),s.copy(t),s.x+=xs.x,s.y+=xs.y,s.applyMatrix4(yh)}var ss=class extends _n{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Gc=new C,Wc=new C,Xc=new oe,ja=new As,fr=new bi,rs=class extends be{constructor(t=new ce,e=new ss){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Gc.fromBufferAttribute(e,i-1),Wc.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Gc.distanceTo(Wc);t.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(i),fr.radius+=r,t.ray.intersectsSphere(fr)===!1)return;Xc.copy(i).invert(),ja.copy(t.ray).applyMatrix4(Xc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,h=new C,u=new C,d=new C,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let v=p,S=M-1;v<S;v+=f){let R=g.getX(v),w=g.getX(v+1);if(c.fromBufferAttribute(m,R),h.fromBufferAttribute(m,w),ja.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);let P=t.ray.origin.distanceTo(d);P<t.near||P>t.far||e.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let v=p,S=M-1;v<S;v+=f){if(c.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),ja.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);let w=t.ray.origin.distanceTo(d);w<t.near||w>t.far||e.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};var Ps=class extends _n{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},qc=new oe,Co=new As,pr=new bi,mr=new C,zr=class extends be{constructor(t=new ce,e=new Ps){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(i),pr.radius+=r,t.ray.intersectsSphere(pr)===!1)return;qc.copy(i).invert(),Co.copy(t.ray).applyMatrix4(qc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,x=f;g<x;g++){let m=c.getX(g);mr.fromBufferAttribute(u,m),Yc(mr,m,l,i,t,e,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,x=f;g<x;g++)mr.fromBufferAttribute(u,g),Yc(mr,g,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Yc(s,t,e,n,i,r,a){let o=Co.distanceSqToPoint(s);if(o<e){let l=new C;Co.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}var Ae=class extends We{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Qe=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new at:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new C,i=[],r=[],a=[],o=new C,l=new oe;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ye(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(ye(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Is=class extends Qe{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new at){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Po=class extends Is{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function el(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var gr=new C,Qa=new el,to=new el,eo=new el,Io=class extends Qe{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new C){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(gr.subVectors(i[0],i[1]).add(i[0]),c=gr);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(gr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=gr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Qa.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),to.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),eo.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Qa.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),to.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),eo.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Qa.calc(l),to.calc(l),eo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new C().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Zc(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function e0(s,t){let e=1-s;return e*e*t}function n0(s,t){return 2*(1-s)*s*t}function i0(s,t){return s*s*t}function Ss(s,t,e,n){return e0(s,t)+n0(s,e)+i0(s,n)}function s0(s,t){let e=1-s;return e*e*e*t}function r0(s,t){let e=1-s;return 3*e*e*s*t}function a0(s,t){return 3*(1-s)*s*s*t}function o0(s,t){return s*s*s*t}function Es(s,t,e,n,i){return s0(s,t)+r0(s,e)+a0(s,n)+o0(s,i)}var Hr=class extends Qe{constructor(t=new at,e=new at,n=new at,i=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new at){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Es(t,i.x,r.x,a.x,o.x),Es(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Lo=class extends Qe{constructor(t=new C,e=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new C){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Es(t,i.x,r.x,a.x,o.x),Es(t,i.y,r.y,a.y,o.y),Es(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},kr=class extends Qe{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Do=class extends Qe{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vr=class extends Qe{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ss(t,i.x,r.x,a.x),Ss(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Uo=class extends Qe{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ss(t,i.x,r.x,a.x),Ss(t,i.y,r.y,a.y),Ss(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gr=class extends Qe{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Zc(o,l.x,c.x,h.x,u.x),Zc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new at().fromArray(i))}return this}},$c=Object.freeze({__proto__:null,ArcCurve:Po,CatmullRomCurve3:Io,CubicBezierCurve:Hr,CubicBezierCurve3:Lo,EllipseCurve:Is,LineCurve:kr,LineCurve3:Do,QuadraticBezierCurve:Vr,QuadraticBezierCurve3:Uo,SplineCurve:Gr}),No=class extends Qe{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $c[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new $c[i.type]().fromJSON(i))}return this}},Oo=class extends No{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new kr(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Vr(this.currentPoint.clone(),new at(t,e),new at(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new Hr(this.currentPoint.clone(),new at(t,e),new at(n,i),new at(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Gr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new Is(t,e,n,i,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Fo=class s extends ce{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=ye(i,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,u=new C,d=new at,f=new C,g=new C,x=new C,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let M=0;M<=e;M++){let v=n+M*h*i,S=Math.sin(v),R=Math.cos(v);for(let w=0;w<=t.length-1;w++){u.x=t[w].x*S,u.y=t[w].y,u.z=t[w].x*R,a.push(u.x,u.y,u.z),d.x=M/e,d.y=w/(t.length-1),o.push(d.x,d.y);let A=l[3*w+0]*S,P=l[3*w+1],N=l[3*w+0]*R;c.push(A,P,N)}}for(let M=0;M<e;M++)for(let v=0;v<t.length-1;v++){let S=v+M*t.length,R=S,w=S+t.length,A=S+t.length+1,P=S+1;r.push(R,w,P),r.push(A,P,w)}this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("uv",new qt(o,2)),this.setAttribute("normal",new qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},ei=class s extends Fo{constructor(t=1,e=1,n=4,i=8){let r=new Oo;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new s(t.radius,t.length,t.capSegments,t.radialSegments)}},ni=class s extends ce{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new C,h=new at;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(o,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},bn=class s extends ce{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],m=n/2,p=0;M(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(f,2));function M(){let S=new C,R=new C,w=0,A=(e-t)/n;for(let P=0;P<=r;P++){let N=[],_=P/r,E=_*(e-t)+t;for(let G=0;G<=i;G++){let Z=G/i,I=Z*l+o,W=Math.sin(I),V=Math.cos(I);R.x=E*W,R.y=-_*n+m,R.z=E*V,u.push(R.x,R.y,R.z),S.set(W,A,V).normalize(),d.push(S.x,S.y,S.z),f.push(Z,1-_),N.push(g++)}x.push(N)}for(let P=0;P<i;P++)for(let N=0;N<r;N++){let _=x[N][P],E=x[N+1][P],G=x[N+1][P+1],Z=x[N][P+1];h.push(_,E,Z),h.push(E,G,Z),w+=6}c.addGroup(p,w,0),p+=w}function v(S){let R=g,w=new at,A=new C,P=0,N=S===!0?t:e,_=S===!0?1:-1;for(let G=1;G<=i;G++)u.push(0,m*_,0),d.push(0,_,0),f.push(.5,.5),g++;let E=g;for(let G=0;G<=i;G++){let I=G/i*l+o,W=Math.cos(I),V=Math.sin(I);A.x=N*V,A.y=m*_,A.z=N*W,u.push(A.x,A.y,A.z),d.push(0,_,0),w.x=W*.5+.5,w.y=V*.5*_+.5,f.push(w.x,w.y),g++}for(let G=0;G<i;G++){let Z=R+G,I=E+G;S===!0?h.push(I,I+1,Z):h.push(I+1,I,Z),P+=3}c.addGroup(p,P,S===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},as=class s extends bn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bo=class s extends ce{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let v=new C,S=new C,R=new C;for(let w=0;w<e.length;w+=3)f(e[w+0],v),f(e[w+1],S),f(e[w+2],R),l(v,S,R,M)}function l(M,v,S,R){let w=R+1,A=[];for(let P=0;P<=w;P++){A[P]=[];let N=M.clone().lerp(S,P/w),_=v.clone().lerp(S,P/w),E=w-P;for(let G=0;G<=E;G++)G===0&&P===w?A[P][G]=N:A[P][G]=N.clone().lerp(_,G/E)}for(let P=0;P<w;P++)for(let N=0;N<2*(w-P)-1;N++){let _=Math.floor(N/2);N%2===0?(d(A[P][_+1]),d(A[P+1][_]),d(A[P][_])):(d(A[P][_+1]),d(A[P+1][_+1]),d(A[P+1][_]))}}function c(M){let v=new C;for(let S=0;S<r.length;S+=3)v.x=r[S+0],v.y=r[S+1],v.z=r[S+2],v.normalize().multiplyScalar(M),r[S+0]=v.x,r[S+1]=v.y,r[S+2]=v.z}function h(){let M=new C;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];let S=m(M)/2/Math.PI+.5,R=p(M)/Math.PI+.5;a.push(S,1-R)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){let v=a[M+0],S=a[M+2],R=a[M+4],w=Math.max(v,S,R),A=Math.min(v,S,R);w>.9&&A<.1&&(v<.2&&(a[M+0]+=1),S<.2&&(a[M+2]+=1),R<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,v){let S=M*3;v.x=t[S+0],v.y=t[S+1],v.z=t[S+2]}function g(){let M=new C,v=new C,S=new C,R=new C,w=new at,A=new at,P=new at;for(let N=0,_=0;N<r.length;N+=9,_+=6){M.set(r[N+0],r[N+1],r[N+2]),v.set(r[N+3],r[N+4],r[N+5]),S.set(r[N+6],r[N+7],r[N+8]),w.set(a[_+0],a[_+1]),A.set(a[_+2],a[_+3]),P.set(a[_+4],a[_+5]),R.copy(M).add(v).add(S).divideScalar(3);let E=m(R);x(w,_+0,M,E),x(A,_+2,v,E),x(P,_+4,S,E)}}function x(M,v,S,R){R<0&&M.x===1&&(a[v]=M.x-1),S.x===0&&S.z===0&&(a[v]=R/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}};var Wr=class s extends Bo{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Fn=class s extends ce{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=t,d=(e-t)/i,f=new C,g=new at;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){let p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<i;x++){let m=x*(n+1);for(let p=0;p<n;p++){let M=p+m,v=M,S=M+n+1,R=M+n+2,w=M+1;o.push(v,S,w),o.push(S,R,w)}}this.setIndex(o),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var De=class s extends ce{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new C,d=new C,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let M=[],v=p/n,S=0;p===0&&a===0?S=.5/e:p===n&&l===Math.PI&&(S=-.5/e);for(let R=0;R<=e;R++){let w=R/e;u.x=-t*Math.cos(i+w*r)*Math.sin(a+v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(i+w*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(w+S,1-v),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let v=h[p][M+1],S=h[p][M],R=h[p+1][M],w=h[p+1][M+1];(p!==0||a>0)&&f.push(v,S,w),(p!==n-1||l<Math.PI)&&f.push(S,R,w)}this.setIndex(f),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(x,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Bn=class s extends ce{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let x=g/i*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let x=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,M=(i+1)*f+g;a.push(x,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var de=class extends _n{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Xr=class extends ss{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function vr(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function l0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var os=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},zo=class extends os{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jl,endingEnd:Jl}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Kl:r=t,o=2*e-n;break;case jl:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Kl:a=t,l=2*n-e;break;case jl:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,v=(-1-f)*m+(1.5+f)*x+.5*g,S=f*m-f*x;for(let R=0;R!==o;++R)r[R]=p*a[h+R]+M*a[c+R]+v*a[l+R]+S*a[u+R];return r}},Ho=class extends os{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},ko=class extends os{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},un=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=vr(e,this.TimeBufferType),this.values=vr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:vr(t.times,Array),values:vr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ko(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ho(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new zo(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case _r:e=this.InterpolantFactoryMethodDiscrete;break;case yr:e=this.InterpolantFactoryMethodLinear;break;case wa:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _r;case this.InterpolantFactoryMethodLinear:return yr;case this.InterpolantFactoryMethodSmooth:return wa}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&l0(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===wa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=yr;var Si=class extends un{};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=_r;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var Vo=class extends un{};Vo.prototype.ValueTypeName="color";var Go=class extends un{};Go.prototype.ValueTypeName="number";var Wo=class extends os{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)ti.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ls=class extends un{InterpolantFactoryMethodLinear(t){return new Wo(this.times,this.values,this.getValueSize(),t)}};Ls.prototype.ValueTypeName="quaternion";Ls.prototype.DefaultInterpolation=yr;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends un{};Ei.prototype.ValueTypeName="string";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=_r;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Xo=class extends un{};Xo.prototype.ValueTypeName="vector";var qo=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},c0=new qo,Yo=class{constructor(t){this.manager=t!==void 0?t:c0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Yo.DEFAULT_MATERIAL_NAME="__DEFAULT";var qr=class extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Yr=class extends qr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},no=new oe,Jc=new C,Kc=new C,Zo=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rs,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Jc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Jc),Kc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kc),e.updateMatrixWorld(),no.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(no),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(no)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var $o=class extends Zo{constructor(){super(new ns(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ds=class extends qr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new $o}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var nl="\\[\\]\\.:\\/",h0=new RegExp("["+nl+"]","g"),il="[^"+nl+"]",u0="[^"+nl.replace("\\.","")+"]",d0=/((?:WC+[\/:])*)/.source.replace("WC",il),f0=/(WCOD+)?/.source.replace("WCOD",u0),p0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",il),m0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",il),g0=new RegExp("^"+d0+f0+p0+m0+"$"),v0=["material","materials","bones","map"],Jo=class{constructor(t,e,n){let i=n||re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},re=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(h0,"")}static parseTrackName(t){let e=g0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);v0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};re.Composite=Jo;re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};re.prototype.GetterByBindingType=[re.prototype._getValue_direct,re.prototype._getValue_array,re.prototype._getValue_arrayElement,re.prototype._getValue_toArray];re.prototype.SetterByBindingTypeAndVersioning=[[re.prototype._setValue_direct,re.prototype._setValue_direct_setNeedsUpdate,re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[re.prototype._setValue_array,re.prototype._setValue_array_setNeedsUpdate,re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[re.prototype._setValue_arrayElement,re.prototype._setValue_arrayElement_setNeedsUpdate,re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[re.prototype._setValue_fromArray,re.prototype._setValue_fromArray_setNeedsUpdate,re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var B0=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"162"}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="162");function Xt(s,t,e){return s<t?t:s>e?e:s}function x0(s,t,e){return s+(t-s)*e}function Us(s,t,e,n){return x0(s,t,1-Math.exp(-e*n))}function Mh(s){let t=s>>>0||2654435769;return(e,n)=>{t=t+1831565813>>>0;let i=t;i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61);let r=((i^i>>>14)>>>0)/4294967296;return e+r*(n-e)}}function si(s,t,e,n){return Math.hypot(s-e,t-n)}var sl=Math.PI*2;function _0(s,t,e){let n=(t-s)%sl;return n>Math.PI&&(n-=sl),n<-Math.PI&&(n+=sl),s+n*e}function Kr(s,t,e,n){return _0(s,t,1-Math.exp(-e*n))}var Qt={halfWidth:4,halfLength:8,netHeight:2,netHalfWidth:3.95,antennaX:4.12},Ue={radius:.2,gravity:18,drag:.05},Re={radius:.42,moveSpeed:6,sprintSpeed:11,sprintDuration:.4,sprintCooldown:3,jumpVelocity:8,gravity:22,reach:1.4,chestHeight:1,hitCooldown:.28,hitGap:.1,diveStun:.8,serveMaxCharge:.9},He={pointsToWinSet:7,setsToWin:2,setSeconds:120,kickoffSeconds:3,pointSeconds:2,setEndSeconds:2.4};function Ns(s,t){let e=document.createElement("canvas");return e.width=s,e.height=t,[e,e.getContext("2d")]}function bh(){let[s,t]=Ns(4,256),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#9ed3ff"),e.addColorStop(.5,"#d3ecff"),e.addColorStop(1,"#f6fbff"),t.fillStyle=e,t.fillRect(0,0,4,256);let n=new Ae(s);return n.colorSpace=ae,n}function Sh(){let[s,t]=Ns(128,128),e=t.createRadialGradient(64,64,4,64,64,62);return e.addColorStop(0,"rgba(18,44,70,0.55)"),e.addColorStop(.6,"rgba(18,44,70,0.22)"),e.addColorStop(1,"rgba(18,44,70,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),new Ae(s)}function Eh(){let[s,t]=Ns(512,256);t.fillStyle="#f6c445",t.fillRect(0,0,512,256),t.lineCap="round",t.strokeStyle="#2f57c8",t.lineWidth=14;for(let n=0;n<3;n++){let i=n*176+30;t.beginPath(),t.moveTo(i,16),t.bezierCurveTo(i+96,74,i-34,176,i+62,244),t.stroke()}t.strokeStyle="rgba(255,255,255,0.9)",t.lineWidth=7,t.beginPath(),t.moveTo(0,128),t.bezierCurveTo(128,92,384,168,512,128),t.stroke();let e=new Ae(s);return e.colorSpace=ae,e}function y0(){let[s,t]=Ns(64,64);t.fillStyle="#fbfdff",t.fillRect(0,0,64,64),t.fillStyle="#e8f0f7",t.fillRect(0,0,32,32),t.fillRect(32,32,32,32);let e=new Ae(s);return e.wrapS=jn,e.wrapT=jn,e.repeat.set(4,8),e.colorSpace=ae,e.anisotropy=8,e}function M0(){let[s,t]=Ns(256,128);t.clearRect(0,0,256,128),t.strokeStyle="rgba(26,42,60,0.55)",t.lineWidth=2;let e=16;for(let i=0;i<=256;i+=e)t.beginPath(),t.moveTo(i,0),t.lineTo(i,128),t.stroke();for(let i=0;i<=128;i+=e)t.beginPath(),t.moveTo(0,i),t.lineTo(256,i),t.stroke();let n=new Ae(s);return n.wrapS=jn,n.wrapT=jn,n.repeat.set(7,1),n.colorSpace=ae,n}var jr=class{constructor(){this.group=new Yt;this.group.add(this.buildGround()),this.group.add(this.buildCourt()),this.group.add(this.buildNet()),this.group.add(this.buildDecor())}buildGround(){let t=new Yt,e=new rt(new Se(180,180),new de({color:15857660,roughness:.98,metalness:0}));e.rotation.x=-Math.PI/2,e.position.y=-.04,t.add(e);for(let n=0;n<10;n++){let i=new rt(new De(2.2,12,8),new de({color:15398141,roughness:1})),r=n/10*Math.PI*2;i.position.set(Math.cos(r)*(15+n%3*4),-.7,Math.sin(r)*(17+n%4*5)),i.scale.set(1.2,.45,1.2),t.add(i)}return t}buildCourt(){let t=new Yt,e=Qt.halfWidth*2,n=Qt.halfLength*2,i=new rt(new Se(e,n),new de({map:y0(),roughness:.82,metalness:0,color:16777215}));i.rotation.x=-Math.PI/2,i.position.y=.002,t.add(i);let r=new Jt({color:3895264}),a=(o,l,c,h)=>{let u=new rt(new Se(o,l),r);u.rotation.x=-Math.PI/2,u.position.set(c,.014,h),t.add(u)};return a(.1,n,-Qt.halfWidth,0),a(.1,n,Qt.halfWidth,0),a(e,.1,0,-Qt.halfLength),a(e,.1,0,Qt.halfLength),a(e,.06,0,0),a(e,.05,0,3),a(e,.05,0,-3),t}buildNet(){let t=new Yt,e=Qt.netHalfWidth*2+.2,n=1.15,i=Qt.netHeight,r=new rt(new Se(e,i-n),new Jt({map:M0(),transparent:!0,alphaTest:.12,side:jt,depthWrite:!1}));r.position.set(0,(i+n)/2,0),t.add(r);let a=new de({color:16777215,roughness:.6}),o=new rt(new cn(e+.1,.09,.06),a);o.position.set(0,i+.02,0),t.add(o);let l=new rt(new cn(e,.05,.05),a);l.position.set(0,n,0),t.add(l);let c=new de({color:14674418,roughness:.4,metalness:.35});for(let d of[-Qt.halfWidth-.25,Qt.halfWidth+.25]){let f=new rt(new bn(.07,.08,2.55,12),c);f.position.set(d,1.275,0),t.add(f);let g=new rt(new bn(.22,.26,.12,14),c);g.position.set(d,.06,0),t.add(g)}let h=new de({color:16731486,roughness:.5}),u=new de({color:16777215,roughness:.5});for(let d of[-Qt.antennaX,Qt.antennaX])for(let f=0;f<4;f++){let g=new rt(new bn(.026,.026,.25,8),f%2?h:u);g.position.set(d,i+.125+f*.25,0),t.add(g)}return t}buildDecor(){let t=new Yt,e=new de({color:16251903,roughness:.9}),n=new de({color:13625599,roughness:.35,metalness:.1}),i=[[-42,1.5,-34,6],[46,1.2,-28,5],[-48,1.4,10,5.5],[44,1.6,26,6],[12,1.4,-50,7]];for(let[r,a,o,l]of i){let c=new rt(new Wr(1,0),a>3?n:e);c.position.set(r,a,o),c.scale.set(l,l*.8,l),c.rotation.set(r,a,o),t.add(c)}return t}};function b0(){let s=document.createElement("canvas");s.width=128,s.height=128;let t=s.getContext("2d");t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=7,t.beginPath(),t.arc(64,64,48,0,Math.PI*2),t.stroke();let e=new Ae(s),n=new hn({map:e,transparent:!0,opacity:.9,depthWrite:!1,blending:Ki}),i=new Mn(n);return i.scale.setScalar(1.1),i}var Qr=class{constructor(){this.group=new Yt;this.trailPts=new Float32Array(48);this.pulse=b0();this.t=0;this.visible=!0;let t=new De(.2,24,16),e=new de({map:Eh(),roughness:.55,metalness:0});this.mesh=new rt(t,e),this.group.add(this.mesh);for(let r=0;r<16;r++)this.trailPts[r*3]=0,this.trailPts[r*3+1]=-50,this.trailPts[r*3+2]=0;let n=new ce;n.setAttribute("position",new me(this.trailPts,3));let i=new ss({color:11990271,transparent:!0,opacity:.45,depthWrite:!1});this.trail=new rs(n,i),this.trail.frustumCulled=!1,this.group.add(this.trail),this.pulse.visible=!1,this.group.add(this.pulse)}setVisible(t){this.visible=t,this.group.visible=t}resetTrail(){for(let e=0;e<16;e++)this.trailPts[e*3]=0,this.trailPts[e*3+1]=-50,this.trailPts[e*3+2]=0;let t=this.trail.geometry;t.getAttribute("position").needsUpdate=!0}update(t,e,n,i,r){if(!this.visible)return;this.mesh.position.set(e,n,i);let a=this.trailPts;for(let l=15;l>0;l--)a[l*3]=a[(l-1)*3],a[l*3+1]=a[(l-1)*3+1],a[l*3+2]=a[(l-1)*3+2];a[0]=e,a[1]=n,a[2]=i;let o=this.trail.geometry;if(o.getAttribute("position").needsUpdate=!0,this.t+=t,this.pulse.visible=r,r){this.pulse.position.set(e,n,i);let l=.95+Math.sin(this.t*9)*.13;this.pulse.scale.setScalar(l),this.pulse.material.opacity=.55+Math.sin(this.t*9)*.25}}};var Th=["#f8cba6","#eab792","#d49a72","#b07a52"],wh=["#2e2622","#4a2f22","#1a2440","#c9932f","#e2643f","#3f3a63"],Ah=["#2fd07a","#1fbf85","#4ade9a","#16a86d"],Rh=["#ff5f8f","#ff7a5c","#ef4f6d","#ff9a63"],S0=1911613,zt={head:new De(.37,24,18),body:new ei(.3,.18,8,20),arm:new ei(.072,.24,4,10),leg:new ei(.095,.24,4,10),sleeve:new ei(.1,.07,4,12),cuff:new Bn(.1,.018,6,14),wrist:new Bn(.078,.02,6,14),hand:new De(.085,10,8),shoe:new De(.115,12,10),sole:new cn(.22,.05,.32),sock:new bn(.098,.104,.12,12),knee:new Bn(.098,.024,6,14),shorts:new bn(.265,.245,.22,16),waist:new Bn(.255,.02,6,18),stripe:new cn(.03,.3,.13),number:new Se(.4,.4),eye:new De(.085,12,12),glint:new De(.026,8,8),mouth:new Bn(.055,.014,6,12,Math.PI),cheek:new ni(.05,14),hairCap:new De(.398,24,16,0,Math.PI*2,0,Math.PI*.4),hairBack:new De(.37,20,14),hairBlob:new De(.13,12,10),hairBun:new De(.115,12,10),hairTail:new ei(.075,.2,4,10),spike:new as(.09,.2,8),headband:new Bn(.39,.028,8,22),ring:new Fn(.46,.62,44),shadow:new Se(1.45,1.45)},E0=Sh();function T0(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}function w0(s,t,e){let n=document.createElement("canvas");n.width=256,n.height=112;let i=n.getContext("2d");i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font='700 36px "PingFang SC","Microsoft YaHei",system-ui,sans-serif',i.lineWidth=9,i.strokeStyle="rgba(9,26,44,0.82)",i.strokeText(s,128,34),i.fillStyle="#ffffff",i.fillText(s,128,34);let r=60,a=32;i.fillStyle=t,T0(i,128-r/2,62,r,a,16),i.fill(),i.fillStyle="#08202f",i.font="900 24px system-ui,sans-serif",i.fillText(String(e).padStart(2,"0"),128,79);let o=new Ae(n);o.colorSpace=ae;let l=new hn({map:o,transparent:!0,depthWrite:!1}),c=new Mn(l);return c.scale.set(2.35,1.03,1),c}function A0(s){let t=document.createElement("canvas");t.width=128,t.height=128;let e=t.getContext("2d");e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.font='900 92px "PingFang SC","Microsoft YaHei",system-ui,sans-serif',e.lineWidth=14,e.strokeStyle="rgba(14,30,46,0.9)",e.strokeText(String(s),64,70),e.fillStyle="#ffffff",e.fillText(String(s),64,70);let n=new Ae(t);return n.colorSpace=ae,n}var ta=class{constructor(t,e){this.root=new Yt;this.rig=new Yt;this.head=new Yt;this.eyes=[];this.lArm=new Yt;this.rArm=new Yt;this.lLeg=new Yt;this.rLeg=new Yt;this.phase=Math.random()*Math.PI*2;this.cheerTimer=0;this.headBaseY=1.47;let n=Th[e%Th.length],i=wh[(e*3+1)%wh.length],r=t.team===0?Ah[e%Ah.length]:Rh[e%Rh.length],a=t.team===0?"#4dffa0":"#ff8a7a";this.blinkTimer=e*.7,this.blinkPeriod=3.1+e%3*.55;let o=new de({color:r,roughness:.58}),l=new de({color:new wt(r).multiplyScalar(.62),roughness:.68}),c=new de({color:16777215,roughness:.5}),h=new de({color:n,roughness:.64}),u=new de({color:i,roughness:.72}),d=new de({color:2301994,roughness:.35}),f=new Jt({color:16777215}),g=new Jt({color:8007226}),x=new Jt({color:16748448,transparent:!0,opacity:.45,depthWrite:!1}),m=new Jt({color:S0,side:Le}),p=(P,N,_)=>{let E=new rt(P,m);return E.position.y=N,E.scale.setScalar(_),E};this.shadowMat=new Jt({map:E0,transparent:!0,opacity:.55,depthWrite:!1}),this.shadow=new rt(zt.shadow,this.shadowMat),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.012,this.root.add(this.shadow),this.ringMat=new Jt({color:a,transparent:!0,opacity:.55,side:jt,depthWrite:!1}),this.ring=new rt(zt.ring,this.ringMat),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=.02,this.root.add(this.ring),this.root.add(this.rig);let M=new rt(zt.body,o);M.position.y=.8,this.rig.add(M),this.rig.add(p(zt.body,.8,1.045));for(let P of[-1,1]){let N=new rt(zt.stripe,c);N.position.set(P*.286,.82,0),this.rig.add(N)}let v=new Jt({map:A0(t.id+1),transparent:!0,depthWrite:!1,toneMapped:!1}),S=new rt(zt.number,v);S.position.set(0,.86,-.302),S.rotation.y=Math.PI,this.rig.add(S);let R=new rt(zt.shorts,l);R.position.y=.545,this.rig.add(R);let w=new rt(zt.waist,c);w.rotation.x=Math.PI/2,w.position.y=.648,this.rig.add(w);for(let P of[-1,1]){let N=new rt(zt.stripe,c);N.scale.set(.7,.55,.55),N.position.set(P*.243,.55,0),this.rig.add(N)}this.head.position.y=this.headBaseY,this.rig.add(this.head);let A=new rt(zt.head,h);this.head.add(A),this.head.add(p(zt.head,0,1.05)),this.buildHair(e,u,c);for(let P of[-1,1]){let N=new Yt;N.position.set(P*.135,.02,.332);let _=new rt(zt.eye,d);_.scale.set(1,1.3,.55),N.add(_);let E=new rt(zt.glint,f);E.position.set(P*-.022,.045,.042),N.add(E),this.head.add(N),this.eyes.push(N)}this.mouth=new rt(zt.mouth,g),this.mouth.position.set(0,-.1,.348),this.mouth.rotation.z=Math.PI,this.head.add(this.mouth);for(let P of[-1,1]){let N=new rt(zt.cheek,x);N.position.set(P*.215,-.055,.3),N.rotation.y=P*.55,this.head.add(N)}this.lArm.position.set(-.3,1.1,0),this.rArm.position.set(.3,1.1,0);for(let[P,N]of[[this.lArm,-1],[this.rArm,1]]){let _=new rt(zt.arm,h);_.position.y=-.22,P.add(_);let E=new rt(zt.sleeve,o);E.position.y=-.05,P.add(E);let G=new rt(zt.cuff,c);G.rotation.x=Math.PI/2,G.position.y=-.17,P.add(G);let Z=new rt(zt.wrist,c);Z.rotation.x=Math.PI/2,Z.position.y=-.365,P.add(Z);let I=new rt(zt.hand,h);I.position.set(N*.004,-.43,0),P.add(I),this.rig.add(P)}this.lLeg.position.set(-.135,.56,0),this.rLeg.position.set(.135,.56,0);for(let P of[this.lLeg,this.rLeg]){let N=new rt(zt.leg,h);N.position.y=-.2,P.add(N);let _=new rt(zt.knee,c);_.rotation.x=Math.PI/2,_.position.y=-.235,P.add(_);let E=new rt(zt.sock,c);E.position.y=-.345,P.add(E);let G=new rt(zt.shoe,l);G.position.set(0,-.43,.05),G.scale.set(1.05,.72,1.5),P.add(G);let Z=new rt(zt.sole,c);Z.position.set(0,-.492,.06),P.add(Z),this.rig.add(P)}this.label=w0(t.name,a,t.id+1),this.label.position.y=2.55,this.root.add(this.label)}buildHair(t,e,n){let i=new Yt;this.head.add(i);let r=new rt(zt.hairCap,e);r.rotation.y=t*.9,i.add(r);let a=new rt(zt.hairBack,e);a.position.set(0,-.05,-.12),a.scale.set(1.07,1.06,.76),i.add(a);let o=t%4;if(o===0){for(let l of[-.16,0,.16]){let c=new rt(zt.hairBlob,e);c.position.set(l,.21,.3),c.scale.set(.95,.62,.85),i.add(c)}for(let l of[-1,1]){let c=new rt(zt.hairBlob,e);c.position.set(l*.34,-.1,.03),c.scale.set(.55,1.15,.75),i.add(c)}}else if(o===1){let l=new rt(zt.hairBlob,e);l.position.set(.02,.22,.29),l.scale.set(1.6,.62,.8),l.rotation.z=-.16,i.add(l);let c=new rt(zt.hairBlob,e);c.position.set(-.33,-.08,.02),c.scale.set(.6,1.05,.7),i.add(c);let h=new rt(zt.headband,n);h.rotation.x=Math.PI/2,h.position.y=.09,i.add(h)}else if(o===2){let l=new rt(zt.hairBun,e);l.position.set(0,.12,-.36),l.scale.set(1.05,1.05,.9),i.add(l);let c=new rt(zt.hairTail,e);c.position.set(0,-.17,-.43),c.rotation.x=-.22,c.scale.set(.9,1.2,.9),i.add(c);let h=new rt(zt.hairBlob,e);h.position.set(0,.22,.29),h.scale.set(1.3,.62,.85),i.add(h)}else{for(let c of[-1,1]){let h=new rt(zt.hairBun,e);h.position.set(c*.27,.26,-.04),h.scale.setScalar(.95),i.add(h)}for(let c=0;c<3;c++){let h=new rt(zt.spike,e);h.position.set((c-1)*.14,.36,.08),h.rotation.z=(c-1)*-.5,h.rotation.x=-.2,i.add(h)}let l=new rt(zt.hairBlob,e);l.position.set(0,.22,.29),l.scale.set(1.25,.62,.85),i.add(l)}}celebrate(){this.cheerTimer=1.6}dispose(){this.root.traverse(t=>{let e=t;if(!e.isMesh&&!t.isSprite)return;let n=e.material,i=Array.isArray(n)?n:[n];for(let r of i){let a=r.map;a&&a.dispose(),r.dispose()}}),this.shadowMat.dispose(),this.ringMat.dispose()}update(t,e,n,i){this.root.position.x=e,this.root.position.z=n,this.root.rotation.y=i.facing,this.cheerTimer=Math.max(0,this.cheerTimer-t),this.phase+=t*(i.moving&&i.grounded?13:2.4);let r=0,a=0,o=0,l=0,c=0,h=i.pos.y,u=0,d=0,f=1,g=1;if(this.cheerTimer>0)o=-2.6,l=-2.6,u=Math.abs(Math.sin(this.phase*5))*.16,d=-.12,f=.34,g=1.9;else if(i.blocking)o=-2.95,l=-2.95,r=-.18,a=.18,c=.08,d=.06,f=.75;else switch(i.anim){case"run":{let v=Math.sin(this.phase);r=v*.85,a=-v*.85,o=-v*.75,l=v*.75,u=Math.abs(Math.sin(this.phase))*.05,d=.05;break}case"jump":{r=-.45,a=.3,o=-2.1,l=-2.1,d=-.08,f=.8;break}case"hit":{let v=1-Math.min(1,i.animTimer/.26),S=Math.sin(v*Math.PI);o=-2.2*S,l=-2.7*S,c=.16*S,d=.1*S,f=.62;break}case"dive":{c=1.25,h=.3,o=-2.4,l=-2.4,d=.15,f=.55;break}case"stun":{c=1.5,h=.22,o=-1.2,l=-1.2,d=.2,f=.45,g=-.9;break}default:{let v=Math.sin(this.phase);o=.06+v*.06,l=-.06-v*.06,u=Math.sin(this.phase*2)*.015,d=Math.sin(this.phase*.9)*.03;break}}this.rig.position.y=Xe.damp(this.rig.position.y,h+u,26,t),this.rig.rotation.x=Xe.damp(this.rig.rotation.x,c,16,t),this.lLeg.rotation.x=Xe.damp(this.lLeg.rotation.x,r,20,t),this.rLeg.rotation.x=Xe.damp(this.rLeg.rotation.x,a,20,t),this.lArm.rotation.x=Xe.damp(this.lArm.rotation.x,o,20,t),this.rArm.rotation.x=Xe.damp(this.rArm.rotation.x,l,20,t),this.lArm.rotation.z=Xe.damp(this.lArm.rotation.z,-.08,12,t),this.rArm.rotation.z=Xe.damp(this.rArm.rotation.z,.08,12,t),this.head.position.y=Xe.damp(this.head.position.y,this.headBaseY+(i.moving?Math.abs(Math.sin(this.phase))*.02:Math.sin(this.phase)*.01),18,t),this.head.rotation.x=Xe.damp(this.head.rotation.x,d,14,t),this.blinkTimer+=t;let p=this.blinkTimer%this.blinkPeriod>this.blinkPeriod-.12?.12:f;for(let v of this.eyes)v.scale.y=Xe.damp(v.scale.y,p,36,t);this.mouth.scale.y=Xe.damp(this.mouth.scale.y,g,14,t),this.label.position.y=2.55+i.pos.y;let M=Math.min(1,i.pos.y/1.5);this.shadow.scale.setScalar(1-M*.35),this.shadowMat.opacity=.55*(1-M*.65),this.ringMat.opacity=.5*(1-M*.5)}};var R0={pass:"\u4E00\u4F20",set:"\u4E8C\u4F20",send:"\u8FC7\u7F51",attack:"\u6263\u7403"},ea=class{constructor(t,e){this.floaters=[];this.count=300;this.cursor=0;this.ripples=[];this.t=0;this.scene=t,this.camera=e,this.pPos=new Float32Array(this.count*3),this.pCol=new Float32Array(this.count*3),this.pVel=new Float32Array(this.count*3),this.pLife=new Float32Array(this.count),this.pMax=new Float32Array(this.count);for(let a=0;a<this.count;a++)this.pPos[a*3+1]=-100;let n=new ce;n.setAttribute("position",new me(this.pPos,3)),n.setAttribute("color",new me(this.pCol,3));let i=new Ps({size:.12,vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,blending:Ki,sizeAttenuation:!0});this.points=new zr(n,i),this.points.frustumCulled=!1,t.add(this.points);let r=new Fn(.42,.56,40);this.landingMat=new Jt({color:16756768,transparent:!0,opacity:.75,side:jt,depthWrite:!1}),this.landing=new rt(r,this.landingMat),this.landing.rotation.x=-Math.PI/2,this.landing.position.y=.03,this.landing.visible=!1,t.add(this.landing);for(let a=0;a<10;a++){let o=new rt(new Fn(.82,1,48),new Jt({color:16777215,transparent:!0,opacity:0,side:jt,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.visible=!1,t.add(o),this.ripples.push({mesh:o,mat:o.material,t:0,dur:0,max:1})}}update(t){this.t+=t;for(let n=0;n<this.count;n++)if(!(this.pLife[n]<=0)){if(this.pLife[n]-=t,this.pLife[n]<=0){this.pPos[n*3+1]=-100;continue}this.pVel[n*3+1]-=7*t,this.pPos[n*3]+=this.pVel[n*3]*t,this.pPos[n*3+1]+=this.pVel[n*3+1]*t,this.pPos[n*3+2]+=this.pVel[n*3+2]*t,this.pPos[n*3+1]<.05&&(this.pPos[n*3+1]=.05,this.pVel[n*3+1]*=-.3,this.pVel[n*3]*=.7,this.pVel[n*3+2]*=.7)}let e=this.points.geometry;e.getAttribute("position").needsUpdate=!0,e.getAttribute("color").needsUpdate=!0;for(let n of this.ripples){if(n.t<=0)continue;n.t-=t;let i=1-n.t/n.dur,r=.3+i*n.max;n.mesh.scale.setScalar(r),n.mat.opacity=Math.max(0,.85*(1-i)),n.t<=0&&(n.mesh.visible=!1)}if(this.landing.visible){let n=1+Math.sin(this.t*5)*.08;this.landing.scale.setScalar(n),this.landingMat.opacity=.55+Math.sin(this.t*5)*.2}for(let n=this.floaters.length-1;n>=0;n--){let i=this.floaters[n];i.t-=t;let r=1-i.t/i.dur;i.sprite.position.y=i.y0+r*1.05;let a=i.sprite.material;a.opacity=Math.max(0,Math.min(1,i.t/i.dur*2)),i.t<=0&&(this.scene.remove(i.sprite),a.dispose(),i.tex.dispose(),this.floaters.splice(n,1))}}setLanding(t,e,n){this.landing.visible=n,n&&this.landing.position.set(t,.03,e)}burst(t,e,n,i,r=18,a=5){let o=new wt(i);for(let l=0;l<r;l++){let c=this.cursor;this.cursor=(this.cursor+1)%this.count;let h=Math.random()*Math.PI*2,u=Math.random()*.9+.2,d=a*(.35+Math.random()*.9);this.pPos[c*3]=t,this.pPos[c*3+1]=e,this.pPos[c*3+2]=n,this.pVel[c*3]=Math.cos(h)*d,this.pVel[c*3+1]=u*d,this.pVel[c*3+2]=Math.sin(h)*d;let f=.35+Math.random()*.45;this.pLife[c]=f,this.pMax[c]=f,this.pCol[c*3]=o.r,this.pCol[c*3+1]=o.g,this.pCol[c*3+2]=o.b}}puff(t,e,n){let i=new wt(n);for(let r=0;r<2;r++){let a=this.cursor;this.cursor=(this.cursor+1)%this.count,this.pPos[a*3]=t+(Math.random()-.5)*.45,this.pPos[a*3+1]=.08,this.pPos[a*3+2]=e+(Math.random()-.5)*.45,this.pVel[a*3]=(Math.random()-.5)*.9,this.pVel[a*3+1]=.9+Math.random()*.8,this.pVel[a*3+2]=(Math.random()-.5)*.9;let o=.28+Math.random()*.3;this.pLife[a]=o,this.pMax[a]=o,this.pCol[a*3]=i.r,this.pCol[a*3+1]=i.g,this.pCol[a*3+2]=i.b}}ripple(t,e,n,i=4,r=.6){var o;let a=(o=this.ripples.find(l=>l.t<=0))!=null?o:this.ripples[0];a.mesh.visible=!0,a.mesh.position.set(t,.04,e),a.mesh.scale.setScalar(.3),a.mat.color.set(n),a.mat.opacity=.85,a.t=r,a.dur=r,a.max=i}popNumber(t,e,n,i,r,a,o){var M;let u=document.createElement("canvas");u.width=420,u.height=192;let d=u.getContext("2d");d.scale(2,2),d.textAlign="center",d.textBaseline="middle",d.lineJoin="round";let f=(M=R0[o])!=null?M:"";d.font='700 15px "PingFang SC","Microsoft YaHei",sans-serif',d.lineWidth=5,d.strokeStyle="rgba(8,24,40,0.75)",d.fillStyle=a?"#ffd75e":"#ffffff",d.strokeText(f,210/2,22),d.fillText(f,210/2,22),d.font='900 34px "PingFang SC","Microsoft YaHei",sans-serif';let g=r>1?`${i}  x${r}`:`${i}`;d.lineWidth=7,d.strokeText(g,210/2,58),d.fillText(g,210/2,58);let x=new Ae(u);x.colorSpace=ae;let m=new hn({map:x,transparent:!0,depthWrite:!1,depthTest:!1}),p=new Mn(m);p.scale.set(1.55,.71,1),p.position.set(t,e+.4,n),p.renderOrder=20,this.scene.add(p),this.floaters.push({sprite:p,tex:x,t:.9,dur:.9,y0:e+.4})}};var Os={pos:new C(0,11.9,19.6),look:new C(0,.55,1.1),fov:54},na=class{constructor(t,e,n,i,r){this.scene=new is;this.arena=new jr;this.ballView=new Qr;this.views=new Map;this.camPos=Os.pos.clone();this.camLook=Os.look.clone();this.shake=0;this.dustTimer=0;this.elapsed=0;this.previewPts=new Float32Array(210);this.width=e,this.height=n,this.padHeight=i,this.renderer=new Cs({canvas:t,antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.setPixelRatio(r),this.renderer.outputColorSpace=ae,this.renderer.shadowMap.enabled=!1,this.renderer.autoClear=!1,this.camera=new ze(Os.fov,e/(n-i),.1,260),this.camera.position.copy(this.camPos),this.camera.lookAt(this.camLook),this.scene.background=bh(),this.scene.fog=new Fr(14873085,38,100);let a=new Yr(15398911,16777215,1.15);this.scene.add(a);let o=new Ds(16774886,1.65);o.position.set(7,13,9),this.scene.add(o);let l=new Ds(12574975,.45);l.position.set(-8,6,-10),this.scene.add(l),this.scene.add(this.arena.group),this.scene.add(this.ballView.group),this.effects=new ea(this.scene,this.camera);let c=new ce;c.setAttribute("position",new me(this.previewPts,3)),c.setDrawRange(0,0),this.previewLine=new rs(c,new Xr({color:16743080,dashSize:.26,gapSize:.18,transparent:!0,opacity:.95,depthWrite:!1})),this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.receiverMark=new rt(new as(.2,.32,4),new Jt({color:16756768,transparent:!0,opacity:.95})),this.receiverMark.rotation.x=Math.PI,this.receiverMark.visible=!1,this.scene.add(this.receiverMark),this.resize(e,n,i)}resize(t,e,n){this.width=t,this.height=e,this.padHeight=n,this.renderer.setSize(t,e,!1),this.camera.aspect=t/Math.max(1,e-n),this.camera.updateProjectionMatrix()}build(t){for(let e of this.views.values())this.scene.remove(e.root),e.dispose();this.views.clear();for(let e of t.players){let n=new ta(e,e.id);this.views.set(e.id,n),this.scene.add(n.root)}}sync(t,e,n){this.elapsed+=n;for(let x of t.players){let m=this.views.get(x.id);if(!m)continue;let p=x.prev.x+(x.pos.x-x.prev.x)*e,M=x.prev.z+(x.pos.z-x.prev.z)*e;m.update(n,p,M,x)}let i=t.ball,r=i.prev.x+(i.pos.x-i.prev.x)*e,a=i.prev.y+(i.pos.y-i.prev.y)*e,o=i.prev.z+(i.pos.z-i.prev.z)*e,l=t.players.find(x=>x.id===t.localPlayerId),c=t.phase==="rally"&&l!==void 0&&t.ballInReach(l);this.ballView.setVisible(i.live||i.heldBy!==null),i.heldBy!==null&&this.ballView.resetTrail(),this.ballView.update(n,r,a,o,c);let h=t.servePreview();if(h&&h.length>1){let x=Math.min(h.length,70);for(let M=0;M<x;M++)this.previewPts[M*3]=h[M].x,this.previewPts[M*3+1]=h[M].y,this.previewPts[M*3+2]=h[M].z;let m=this.previewLine.geometry;m.getAttribute("position").needsUpdate=!0,m.setDrawRange(0,x),this.previewLine.computeLineDistances(),this.previewLine.visible=!0;let p=h[x-1];this.effects.setLanding(p.x,p.z,!0)}else{this.previewLine.visible=!1;let x=t.phase==="rally"?t.predictLanding():null;x?this.effects.setLanding(x.x,x.z,!0):this.effects.setLanding(0,0,!1)}if(this.dustTimer-=n,this.dustTimer<=0){this.dustTimer=.045;for(let x of t.players)x.sprintTimer>0&&x.grounded&&this.effects.puff(x.pos.x,x.pos.z,x.team===0?"#8bffc4":"#ffc0b0")}let u=t.phase==="rally"?t.receiverOf(t.humanTeam):null,d=u!==null?t.players.find(x=>x.id===u):null;if(d){this.receiverMark.visible=!0,this.receiverMark.position.set(d.pos.x,3.1+d.pos.y,d.pos.z);let x=1+Math.sin(this.elapsed*9)*.12;this.receiverMark.scale.setScalar(x)}else this.receiverMark.visible=!1;let f=Xt(r*.3,-2,2),g=Os.pos.z+Xt(o*.12,-1.2,1.2);this.camPos.x=Us(this.camPos.x,f,2.4,n),this.camPos.z=Us(this.camPos.z,g,2.4,n),this.camLook.x=Us(this.camLook.x,r*.14,2.4,n),this.camLook.z=Us(this.camLook.z,Os.look.z+o*.1,2.4,n),this.shake=Math.max(0,this.shake-n*2.2),this.camera.position.copy(this.camPos),this.shake>.001&&(this.camera.position.x+=(Math.random()-.5)*this.shake,this.camera.position.y+=(Math.random()-.5)*this.shake),this.camera.lookAt(this.camLook),this.effects.update(n)}render(){let t=this.renderer,e=this.height-this.padHeight;t.setScissorTest(!0),t.setScissor(0,this.padHeight,this.width,e),t.setViewport(0,this.padHeight,this.width,e),t.clear(),t.render(this.scene,this.camera),t.setScissorTest(!1)}onHit(t){let e=t.team===0?"#8dffc0":"#ffa6b8";this.shake=Math.min(.5,this.shake+t.power/220),this.effects.burst(t.x,t.y,t.z,e,t.kind==="attack"?16:8,t.kind==="attack"?6:3.4),this.effects.popNumber(t.x,t.y+.25,t.z,t.power,t.combo,t.perfect,t.kind)}onBlock(t){this.shake=Math.min(.4,this.shake+.16),this.effects.burst(t.x,t.y,t.z,"#ffffff",14,5)}onLand(t){let e=t.winner===0?"#5dffae":"#ff7a9a";this.effects.ripple(t.x,t.z,e,4.2,.75),this.effects.burst(t.x,.3,t.z,e,26,6.5),this.shake=Math.min(.4,this.shake+.12)}celebratePlayer(t){var e;(e=this.views.get(t))==null||e.celebrate()}};var ia=class{constructor(){this.map=new Map}on(t,e){let n=this.map.get(t);return n||(n=new Set,this.map.set(t,n)),n.add(e),()=>this.off(t,e)}off(t,e){var n;(n=this.map.get(t))==null||n.delete(e)}emit(t,e){let n=this.map.get(t);if(n)for(let i of n)i(e)}clear(){this.map.clear()}};function Ch(s,t,e,n=Ue.gravity){let i=Math.max(.08,e);return{x:(t.x-s.x)/i,y:(t.y-s.y)/i+.5*n*i,z:(t.z-s.z)/i}}function cs(s,t,e){let n=Ue.gravity,i=Math.max(e,s.y+.4,t.y+.4),r=Math.sqrt(2*n*(i-s.y)),a=r/n,o=Math.sqrt(Math.max(1e-4,2*(i-t.y)/n)),l=a+o;return{x:(t.x-s.x)/l,y:r,z:(t.z-s.z)/l}}var sa=class{constructor(){this.pos={x:0,y:1,z:0};this.prev={x:0,y:1,z:0};this.vel={x:0,y:0,z:0};this.live=!1;this.dead=!1;this.heldBy=null;this.lastHitTeam=null;this.lastHitterId=null;this.landX=0;this.landZ=0}reset(){this.pos={x:0,y:1.4,z:0},this.prev={...this.pos},this.vel={x:0,y:0,z:0},this.live=!1,this.dead=!1,this.heldBy=null,this.lastHitTeam=null,this.lastHitterId=null,this.landX=0,this.landZ=0}step(t,e,n){if(!this.live||this.dead||this.heldBy!==null)return;this.prev={...this.pos},this.vel.y-=Ue.gravity*t;let i=Math.max(0,1-Ue.drag*t);this.vel.x*=i,this.vel.z*=i,this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t,this.pos.z+=this.vel.z*t;let r=this.prev.z,a=this.pos.z;if(r>0&&a<=0||r<0&&a>=0){let l=r/(r-a),c=this.prev.x+(this.pos.x-this.prev.x)*l,h=this.prev.y+(this.pos.y-this.prev.y)*l;if(Math.abs(c)<=Qt.netHalfWidth&&h<=Qt.netHeight+.05){let u=e.find(d=>Math.abs(c-d.x)<=d.halfW&&h>=d.minY&&h<=d.maxY);this.pos.z=r,u?(this.vel.z=-this.vel.z*.55,this.vel.x*=.55,this.vel.y=Math.min(this.vel.y,-1.4),n({type:"block",playerId:u.playerId,x:c,y:h,z:0})):(this.vel.z*=-.45,this.vel.y*=.5,n({type:"net",x:c,y:h,z:0}))}else n({type:"cross",x:c,y:h,z:0})}this.pos.y<=Ue.radius&&(this.pos.y=Ue.radius,this.landX=this.pos.x,this.landZ=this.pos.z,this.dead=!0,this.live=!1,n({type:"ground",x:this.pos.x,y:Ue.radius,z:this.pos.z}))}};var Ph={1:[{x:0,d:4.5}],2:[{x:-1.9,d:3.1},{x:1.9,d:5.8}],3:[{x:-2.4,d:2.4},{x:0,d:4.7},{x:2.4,d:6.4}],4:[{x:-2.6,d:2.2},{x:-.9,d:4},{x:.9,d:5.6},{x:2.6,d:7}]};function C0(s){var t;return(t=Ph[s])!=null?t:Ph[2]}function Fs(s,t,e){let n=C0(t),i=n[Math.min(e,n.length-1)];return{x:i.x,z:s===0?i.d:-i.d}}function ri(){return{moveX:0,moveZ:0,sprint:!1,jump:!1,hit:!1,hitHeld:!1,block:!1,blockHeld:!1}}var rl={easy:{label:"\u7B80\u5355",moveScale:.72,reaction:.42,aimError:.85,canSpike:!1},normal:{label:"\u666E\u901A",moveScale:.95,reaction:.22,aimError:.45,canSpike:!0},hard:{label:"\u56F0\u96BE",moveScale:1.06,reaction:.1,aimError:.18,canSpike:!0}},ra=class{constructor(t,e){this.phase="idle";this.thinkTimer=0;this.target=null;this.servePower=.6;this.cfg=rl[t],this.rng=e,this.thinkTimer=e(0,.1)}get moveScale(){return this.cfg.moveScale}think(t,e,n){let i=ri(),r=t.phase;if(r!==this.phase&&(r==="serve"&&(this.servePower=this.rng(.5,.95),this.thinkTimer=0,this.target=null),this.phase=r),r==="idle"||r==="point"||r==="setend"||r==="matchend")return i;if(r==="serve"){if(e.id===t.serverId)i.hitHeld=e.charge<this.servePower;else{let x=Fs(e.team,t.teamSize,e.slot);this.moveTo(e,i,x.x,x.z)}return i}let a=t.ball,o=t.predictLanding();this.thinkTimer-=n,(this.thinkTimer<=0||!this.target)&&(this.thinkTimer=this.cfg.reaction,this.updateTarget(t,e,o)),this.target&&this.moveTo(e,i,this.target.x,this.target.z);let l=t.ballInReach(e),c=t.touches[e.team],h=this.isClosest(t,e,o),u=si(a.pos.x,a.pos.z,e.pos.x,e.pos.z),d=t.attackPlan[e.team],f=d.setterId===e.id,g=d.attackerId===null||d.attackerId===e.id;if(c>=2)if(g){if(e.grounded&&this.cfg.canSpike&&u<1.9&&a.pos.y>2.5&&a.pos.y<4.7&&(i.jump=!0),l&&(h||u<1)){i.hit=!0;let x=0,m=t.players.filter(p=>p.team!==e.team);for(let p of m)x+=p.pos.x;x=m.length?x/m.length:0,i.aimX=Xt(-Math.sign(x||1)*this.rng(2.2,3.4),-3.5,3.5)}}else l&&a.pos.y<1.4&&u<1&&(i.hit=!0);else if(c===1){let x=d.setterId!==null?t.players.find(M=>M.id===d.setterId):null,m=x?si(x.pos.x,x.pos.z,a.pos.x,a.pos.z)<1.9&&!(x.isHuman&&!x.moving):!1;l&&(!g||!m)&&(f||h||u<.9)&&(i.hit=!0)}else l&&(h||u<.8)&&(i.hit=!0);return i}updateTarget(t,e,n){let i=e.team===0?1:-1,r=Fs(e.team,t.teamSize,e.slot),a=t.ball,o=t.touches[e.team],l=t.attackPlan[e.team],c=this.cfg.aimError,h=n!==null&&Math.sign(n.z)===i&&a.live;if(h&&n.t<1.8){let d=1/0;for(let f of t.players){if(f.team!==e.team)continue;let g=si(f.pos.x,f.pos.z,n.x,n.z);f.isHuman&&!f.moving&&(g+=1.2),d=Math.min(d,g)}if(d>1.5){this.target={x:n.x,z:n.z};return}}if(!h){let d=r.x,f=r.z,g=t.touches[e.team===0?1:0];a.live&&Math.sign(a.pos.z)!==i&&g>=2&&(d=Xt(a.pos.x*.45+r.x*.3,-3,3),f=i*4.1),this.target={x:d,z:f};return}let u={x:Xt(n.x+this.rng(-c,c),-Qt.halfWidth+.3,Qt.halfWidth-.3),z:Xt(n.z+this.rng(-c,c),i>0?.6:-8.4,i>0?8.4:-.6)};if(o===0){this.isClosest(t,e,n)?this.target=u:this.target={x:Xt(r.x*.75+n.x*.2,-3,3),z:i*2.4};return}if(o===1){if(l.setterId===null||l.setterId===e.id)this.target=u;else if(l.attackerId===e.id){let d=t.attackZone(e.team);this.target={x:d.x,z:d.z}}else this.target={x:r.x,z:r.z};return}l.attackerId===null||l.attackerId===e.id?this.target=u:this.target={x:r.x,z:i*Math.max(4,Math.abs(r.z))}}isClosest(t,e,n){if(!n)return!1;let i=si(e.pos.x,e.pos.z,n.x,n.z);for(let r of t.players){if(r.team!==e.team||r.id===e.id)continue;let a=si(r.pos.x,r.pos.z,n.x,n.z);if(r.isHuman&&!r.moving&&(a+=2.2),a<i-.35)return!1}return!0}moveTo(t,e,n,i){let r=n-t.pos.x,a=i-t.pos.z,o=Math.hypot(r,a);o<.24||(e.moveX=r/o,e.moveZ=a/o,o>2.6&&t.sprintCd<=0&&t.grounded&&(e.sprint=!0))}};var Ih=["\u963F\u6D1B","\u5C0F\u5317","\u8C46\u8C46","\u7403\u7403"],Lh=["\u7C73\u5A05","\u5361\u5C14","\u6CE2\u6CE2","\u5A1C\u5A1C"],aa=class{constructor(t){this.events=new ia;this.players=[];this.ball=new sa;this.phase="idle";this.phaseTimer=0;this.scores=[0,0];this.setsWon=[0,0];this.setIndex=0;this.clock=He.setSeconds;this.timeUp=!1;this.suddenDeath=!1;this.touches=[0,0];this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}];this.servingTeam=0;this.serverId=0;this.matchWinner=null;this.slowmoTimer=0;this.time=0;this.serveElapsed=0;this.brains=new Map;this.lastHitterByTeam=[null,null];this.lastHitAt=-10;this.lastCount=-1;this.inputProvider=null;var e,n,i,r,a,o;this.teamSize=Xt(Math.round(t.teamSize),1,4),this.humanTeam=(e=t.humanTeam)!=null?e:0,this.humanCount=Xt(Math.round((n=t.humanCount)!=null?n:1),1,this.teamSize),this.localPlayerId=Xt(Math.round((i=t.localPlayerId)!=null?i:0),0,this.teamSize-1),this.roster=(r=t.names)!=null?r:[],this.rng=Mh((a=t.seed)!=null?a:Date.now()%2147483647),this.createPlayers(t.skill,(o=t.humanName)!=null?o:"\u4F60"),this.resetPlayers()}startMatch(){this.scores=[0,0],this.setsWon=[0,0],this.setIndex=0,this.clock=He.setSeconds,this.timeUp=!1,this.suddenDeath=!1,this.matchWinner=null,this.servingTeam=this.humanTeam,this.lastHitterByTeam=[null,null],this.slowmoTimer=0;for(let t of this.players)t.stats.points=0,t.stats.hits=0;this.resetPlayers(),this.ball.reset(),this.setPhase("kickoff"),this.phaseTimer=He.kickoffSeconds,this.lastCount=-1,this.events.emit("announce",{text:"\u51C6\u5907",sub:`${He.pointsToWinSet} \u5206\u5236 \xB7 \u4E09\u5C40\u4E24\u80DC`,ms:900})}step(t){this.time+=t;let e=new Map;for(let n of this.players)if(n.isHuman)e.set(n.id,this.inputProvider?this.inputProvider(n.id):ri());else{let i=this.brains.get(n.id);e.set(n.id,i?i.think(this,n,t):ri())}for(let n of this.players)this.stepPlayer(n,e.get(n.id),t);this.stepBall(t),this.stepPhase(t)}predictLanding(){let t=this.ball;if(!t.live||t.dead||t.heldBy!==null)return null;let e=t.pos.x,n=t.pos.y,i=t.pos.z,r=t.vel.x,a=t.vel.y,o=t.vel.z,l=1/30;for(let c=0;c<3.6;c+=l)if(a-=Ue.gravity*l,e+=r*l,n+=a*l,i+=o*l,n<=Ue.radius)return{x:e,z:i,t:c};return null}attackZone(t){let e=this.attackPlan[t],n=e.setterId!==null?this.players.find(r=>r.id===e.setterId):void 0,i=t===0?1:-1;return{x:Xt((n?n.pos.x:0)*.8,-2.6,2.6),z:i*1.75}}receiverOf(t){let e=this.predictLanding();if(!e||!this.ball.live)return null;let n=t===0?1:-1;if(Math.sign(e.z)!==n)return null;let i=null,r=1/0;for(let a of this.players){if(a.team!==t)continue;let o=si(a.pos.x,a.pos.z,e.x,e.z);a.isHuman&&!a.moving&&(o+=2.2),o<r&&(r=o,i=a.id)}return i}ballInReach(t){let e=this.ball;if(!e.live||e.dead||e.heldBy!==null||this.touches[t.team]>=3||!(t.team===0?e.pos.z>-.4:e.pos.z<.4))return!1;let i=t.pos.y+Re.chestHeight;return Math.hypot(e.pos.x-t.pos.x,e.pos.y-i,e.pos.z-t.pos.z)<=Re.reach+Ue.radius}mvpName(){let t=this.matchWinner,e=t===null?this.players:this.players.filter(i=>i.team===t),n=e[0];for(let i of e)i.stats.points>n.stats.points&&(n=i);return n?n.name:""}createPlayers(t,e){var i;let n=this.teamSize;for(let r=0;r<n;r++){let a=r<this.humanCount&&this.humanTeam===0;this.players.push(this.makePlayer({id:r,team:0,slot:r===0?n-1:r-1,human:a,name:(i=this.roster[r])!=null?i:r===0?e:Ih[(r-1)%Ih.length],skill:t}))}for(let r=0;r<n;r++)this.players.push(this.makePlayer({id:n+r,team:1,slot:r,human:!1,name:Lh[r%Lh.length],skill:t}))}makePlayer(t){return t.human||this.brains.set(t.id,new ra(t.skill,this.rng)),{id:t.id,name:t.name,team:t.team,isHuman:t.human,slot:t.slot,speedScale:t.human?1:rl[t.skill].moveScale,pos:{x:0,y:0,z:0},prev:{x:0,y:0,z:0},vel:{x:0,y:0,z:0},facing:t.team===0?Math.PI:0,grounded:!0,moving:!1,blocking:!1,sprintTimer:0,sprintCd:0,sprintDir:{x:0,z:0},hitCd:0,blockCd:0,hitBuffer:0,stun:0,charge:0,serveAim:0,anim:"idle",animTimer:0,stats:{points:0,hits:0}}}resetPlayers(){for(let t of this.players){let e=Fs(t.team,this.teamSize,t.slot);t.pos={x:e.x,y:0,z:e.z},t.prev={...t.pos},t.vel={x:0,y:0,z:0},t.grounded=!0,t.moving=!1,t.blocking=!1,t.sprintTimer=0,t.sprintCd=0,t.stun=0,t.hitBuffer=0,t.charge=0,t.anim="idle",t.animTimer=0,t.facing=t.team===0?Math.PI:0}}stepPlayer(t,e,n){if(t.prev.x=t.pos.x,t.prev.y=t.pos.y,t.prev.z=t.pos.z,t.sprintCd=Math.max(0,t.sprintCd-n),t.hitCd=Math.max(0,t.hitCd-n),t.blockCd=Math.max(0,t.blockCd-n),t.animTimer=Math.max(0,t.animTimer-n),t.stun>0){t.stun=Math.max(0,t.stun-n),t.anim!=="dive"&&(t.anim="stun"),t.vel.x*=.9,t.vel.z*=.9,t.pos.x+=t.vel.x*n,t.pos.z+=t.vel.z*n,this.clampToCourt(t),this.stepVertical(t,n),t.blocking=!1,t.moving=!1;return}let i=this.phase==="serve"||this.phase==="rally",r=this.phase==="serve"&&t.id===this.serverId;if(i&&!r){if(e.sprint&&t.grounded&&t.sprintCd<=0){let l=Math.hypot(e.moveX,e.moveZ);l>.05&&(t.sprintTimer=Re.sprintDuration,t.sprintCd=Re.sprintCooldown,t.sprintDir={x:e.moveX/l,z:e.moveZ/l})}let a=0,o=0;if(t.sprintTimer>0)t.sprintTimer=Math.max(0,t.sprintTimer-n),a=t.sprintDir.x*Re.sprintSpeed,o=t.sprintDir.z*Re.sprintSpeed;else{let l=Math.hypot(e.moveX,e.moveZ);if(l>.05){let c=Re.moveSpeed*t.speedScale*(t.grounded?1:.55);a=e.moveX/l*c,o=e.moveZ/l*c}}a!==0||o!==0?(t.pos.x+=a*n,t.pos.z+=o*n,t.vel.x=a,t.vel.z=o,t.moving=!0,t.facing=Kr(t.facing,Math.atan2(a,o),16,n)):(t.moving=!1,t.vel.x=0,t.vel.z=0),e.jump&&t.grounded&&(t.vel.y=Re.jumpVelocity,t.grounded=!1,this.events.emit("jump",{playerId:t.id}))}else t.moving=!1,t.vel.x=0,t.vel.z=0;if(r){let a=t.team===0?Math.PI:0;t.facing=Kr(t.facing,a,10,n)}this.clampToCourt(t),this.stepVertical(t,n),this.phase==="rally"&&e.block&&t.grounded&&t.stun<=0&&Math.abs(t.pos.z)<1.8&&(t.vel.y=Re.jumpVelocity,t.grounded=!1,t.blockCd=.7,this.events.emit("jump",{playerId:t.id})),e.block&&Math.abs(t.pos.z)<1.8&&(t.blockCd=Math.max(t.blockCd,.7)),t.blocking=this.phase==="rally"&&(e.blockHeld||t.blockCd>0)&&!t.grounded&&Math.abs(t.pos.z)<1.8,this.phase==="rally"&&(e.hit&&(t.hitBuffer=.35),t.hitBuffer=Math.max(0,t.hitBuffer-n),(t.hitBuffer>0||e.hitHeld)&&(this.tryHit(t,e)?t.hitBuffer=0:e.hit&&(t.anim="hit",t.animTimer=.22,this.events.emit("swing",{playerId:t.id})))),this.phase==="serve"&&t.id===this.serverId&&(e.hit&&t.charge<=0&&(t.charge=.06),e.hitHeld?(t.charge=Math.min(1,t.charge+n/Re.serveMaxCharge),t.isHuman&&(t.serveAim=Xt(t.pos.x*.25+e.moveX*1.8,-3.2,3.2))):t.charge>0&&this.doServe(t,t.charge),t.facing=Kr(t.facing,t.team===0?Math.PI:0,10,n)),!(t.animTimer>0&&(t.anim==="hit"||t.anim==="dive"||t.anim==="cheer"))&&(t.grounded?t.moving?t.anim="run":t.anim="idle":t.anim="jump")}stepVertical(t,e){t.pos.y+=t.vel.y*e,t.vel.y-=Re.gravity*e,t.pos.y<=0?(t.pos.y=0,t.vel.y<0&&(t.vel.y=0),t.grounded=!0):t.grounded=!1}clampToCourt(t){t.pos.x=Xt(t.pos.x,-Qt.halfWidth-.45,Qt.halfWidth+.45),t.team===0?t.pos.z=Xt(t.pos.z,.5,Qt.halfLength+.6):t.pos.z=Xt(t.pos.z,-Qt.halfLength-.6,-.5)}handPos(t){let e=t.team===0?-1:1;return{x:t.pos.x+.32,y:t.pos.y+1.35,z:t.pos.z+e*.25}}tryHit(t,e){var p,M;if(!this.ballInReach(t)||t.hitCd>0||this.time-this.lastHitAt<Re.hitGap)return!1;let n=this.ball,i=t.team===0?-1:1,r=t.pos.y+Re.chestHeight,a=Math.hypot(n.pos.x-t.pos.x,n.pos.y-r,n.pos.z-t.pos.z),o=!t.grounded,l=n.pos.y>t.pos.y+1.5,c=this.touches[t.team],h="pass";o&&l?h="attack":c===2?h="send":c===1&&(h="set");let u=this.players.find(v=>v.team===t.team&&v.id!==t.id),d={x:n.pos.x,y:n.pos.y,z:n.pos.z},f=Ue.radius;if(h==="attack"){let v=this.players.filter(_=>_.team!==t.team),S=0;for(let _ of v)S+=_.pos.x;S=v.length?S/v.length:0;let R=-Math.sign(S||this.rng(-.5,.5))*this.rng(2.3,3.6),w=(p=e.aimX)!=null?p:e.moveX!==0?Xt(t.pos.x+e.moveX*3,-3.6,3.6):R,A={x:Xt(w,-3.7,3.7),y:f,z:i*(3.6+this.rng(0,2.8))},P=Math.hypot(A.x-d.x,A.z-d.z),N=Xt(P/18,.38,.65);n.vel=Ch(d,A,N)}else if(h==="set"){let v=this.attackZone(t.team);n.vel=cs(d,{x:v.x,y:f,z:v.z},5.8)}else if(h==="send"){let v=(M=e.aimX)!=null?M:Xt(t.pos.x+e.moveX*2.6,-3.5,3.5);n.vel=cs(d,{x:v,y:f,z:i*(4.4+this.rng(0,2.4))},5.2)}else if(u){let v=-i*Xt(Math.abs(u.pos.z)*.9,1.2,4.2);n.vel=cs(d,{x:Xt(u.pos.x*.85,-3,3),y:f,z:v},5.4)}else n.vel=cs(d,{x:t.pos.x*.5,y:f,z:t.pos.z*.7},5.4);let g=Xt(1-Math.abs(a-.55)/1.05,.1,1),x=Math.round(10+40*g);if(h==="attack"&&(x*=2),c>0&&this.lastHitterByTeam[t.team]===t.id&&(x=Math.round(x*.5)),c===0){let v=null;for(let S of this.players)S.team!==t.team||S.id===t.id||(!v||Math.abs(S.pos.z)<Math.abs(v.pos.z))&&(v=S);this.attackPlan[t.team]={setterId:v?v.id:t.id,attackerId:t.id}}return this.touches[t.team]=c+1,this.lastHitAt=this.time,this.lastHitterByTeam[t.team]=t.id,n.lastHitTeam=t.team,n.lastHitterId=t.id,t.hitCd=Re.hitCooldown,t.stats.hits++,t.anim="hit",t.animTimer=.26,t.sprintTimer>.06&&t.grounded&&(t.stun=Re.diveStun,t.anim="dive",t.animTimer=Re.diveStun,t.vel.x=t.sprintDir.x*6,t.vel.z=t.sprintDir.z*6,t.sprintTimer=0,this.events.emit("dive",{playerId:t.id})),this.events.emit("hit",{playerId:t.id,team:t.team,power:x,combo:this.touches[t.team],kind:h,perfect:g>.78,x:n.pos.x,y:n.pos.y,z:n.pos.z}),!0}serveTrajectory(t,e){let n=t.team===0?-1:1,i=this.handPos(t),r=6.4-2.3*e,a=cs(i,{x:t.serveAim,y:Ue.radius,z:n*(4.6+3*e)},r);return{start:i,vel:a}}servePreview(){if(this.phase!=="serve")return null;let t=this.players.find(d=>d.id===this.serverId);if(!t||t.charge<=.03)return null;let{start:e,vel:n}=this.serveTrajectory(t,Xt(t.charge,.15,1)),i=[],{x:r,y:a,z:o}=e,l=n.x,c=n.y,h=n.z,u=.04;for(let d=0;d<70&&(i.push({x:r,y:a,z:o}),c-=Ue.gravity*u,r+=l*u,a+=c*u,o+=h*u,!(a<=Ue.radius));d++);return i}doServe(t,e){let n=Xt(e,.15,1),i=this.ball,{start:r,vel:a}=this.serveTrajectory(t,n);i.pos={...r},i.prev={...r},i.vel=a,i.live=!0,i.dead=!1,i.heldBy=null,i.lastHitTeam=t.team,i.lastHitterId=t.id,this.lastHitterByTeam[t.team]=t.id,this.touches=[0,0],t.charge=0,t.hitCd=.5,t.hitBuffer=0,t.anim="hit",t.animTimer=.26,this.setPhase("rally"),this.events.emit("serve",{playerId:t.id,power:n})}stepBall(t){let e=this.ball;if(e.heldBy!==null){let i=this.players.find(r=>r.id===e.heldBy);if(i){let r=this.handPos(i);e.pos=r,e.prev={...r}}return}let n=this.players.filter(i=>i.blocking).map(i=>({playerId:i.id,x:i.pos.x,halfW:.9,minY:1+i.pos.y*.5,maxY:3+i.pos.y*.5}));e.step(t,n,i=>this.onBallEvent(i))}onBallEvent(t){switch(t.type){case"net":this.events.emit("net",{x:t.x,y:t.y,z:t.z});break;case"block":this.events.emit("block",{playerId:t.playerId,x:t.x,y:t.y,z:t.z});break;case"cross":this.touches=[0,0],this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}];break;case"ground":this.onGround(t.x,t.z);break}}onGround(t,e){var o;let n=Math.abs(t)<=Qt.halfWidth&&Math.abs(e)<=Qt.halfLength,i=e>=0?0:1,r=(o=this.ball.lastHitTeam)!=null?o:this.servingTeam,a;n&&i!==r?a=r:a=1-r,this.events.emit("land",{x:t,z:e,winner:a,inBounds:n}),this.awardPoint(a)}stepPhase(t){switch(this.phase){case"kickoff":{this.phaseTimer-=t;let e=Math.ceil(this.phaseTimer);e!==this.lastCount&&e>0&&e<=3&&(this.lastCount=e,this.events.emit("announce",{text:String(e),ms:620}),this.events.emit("tick",{n:e})),this.phaseTimer<=0&&this.beginServe();break}case"serve":{if(this.serveElapsed+=t,this.serveElapsed>9){let e=this.players.find(n=>n.id===this.serverId);e&&this.doServe(e,.5)}break}case"rally":{this.clock>0&&(this.clock=Math.max(0,this.clock-t),this.clock<=0&&!this.timeUp&&(this.timeUp=!0,this.events.emit("announce",{text:"\u65F6\u95F4\u5230",sub:"\u672C\u56DE\u5408\u7ED3\u675F\u540E\u7ED3\u7B97",ms:1400})));break}case"point":{this.phaseTimer-=t,this.phaseTimer<=0&&this.afterPoint();break}case"setend":{this.phaseTimer-=t,this.phaseTimer<=0&&this.afterSetEnd();break}default:break}}beginServe(){this.setupServe(),this.serveElapsed=0,this.setPhase("serve");let t=this.servingTeam===this.humanTeam;this.events.emit("announce",{text:t?"\u6211\u65B9\u53D1\u7403":"\u5BF9\u65B9\u53D1\u7403",sub:t?"\u6309\u4F4F\u51FB\u7403\u84C4\u529B\uFF0C\u677E\u5F00\u53D1\u7403":"",ms:1300})}setupServe(){this.resetPlayers();let t=this.players.find(n=>n.team===this.servingTeam&&n.slot===this.teamSize-1);if(t){this.serverId=t.id;let n=t.team===0?1:-1;t.pos.x=Xt(t.pos.x*.55,-2,2),t.pos.z=n*(Qt.halfLength+.55),t.prev={...t.pos},t.facing=t.team===0?Math.PI:0,t.charge=0,t.serveAim=t.isHuman?Xt(t.pos.x*.25,-3.2,3.2):this.rng(-2.4,2.4)}this.ball.reset();let e=this.players.find(n=>n.id===this.serverId);e&&(this.ball.heldBy=e.id,this.ball.pos=this.handPos(e),this.ball.prev={...this.ball.pos}),this.touches=[0,0],this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}]}awardPoint(t){this.scores[t]++;let e=this.lastHitterByTeam[t];if(e!==null){let n=this.players.find(i=>i.id===e);n&&n.stats.points++}this.servingTeam=t,this.slowmoTimer=.9,this.touches=[0,0],this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}],this.setPhase("point"),this.phaseTimer=He.pointSeconds,this.events.emit("score",{winner:t,scores:[this.scores[0],this.scores[1]],setsWon:[this.setsWon[0],this.setsWon[1]]}),this.events.emit("announce",{text:t===this.humanTeam?"\u6211\u65B9\u5F97\u5206":"\u5BF9\u65B9\u5F97\u5206",ms:900})}afterPoint(){let[t,e]=this.scores,n=He.pointsToWinSet,i=null;if(this.suddenDeath)i=t>e?0:1;else if(t>=n)i=0;else if(e>=n)i=1;else if(this.timeUp)if(t!==e)i=t>e?0:1;else{this.suddenDeath=!0,this.events.emit("announce",{text:"DEUCE",sub:"\u4E0B\u4E00\u5206\u51B3\u5B9A\u672C\u5C40",ms:1700}),this.beginServe();return}if(i===null){this.beginServe();return}this.endSet(i)}endSet(t){this.setsWon[t]++,this.setPhase("setend"),this.phaseTimer=He.setEndSeconds,this.events.emit("setEnd",{winner:t,setsWon:[this.setsWon[0],this.setsWon[1]]}),this.events.emit("announce",{text:`SET ${this.setIndex+1}`,sub:t===this.humanTeam?"\u4F60\u7684\u961F\u4F0D\u62FF\u4E0B\u672C\u5C40":"\u5BF9\u624B\u62FF\u4E0B\u672C\u5C40",ms:2200})}afterSetEnd(){let t=this.setsWon[0]>=He.setsToWin?0:1;if(this.setsWon[0]>=He.setsToWin||this.setsWon[1]>=He.setsToWin){this.matchWinner=t,this.setPhase("matchend"),this.events.emit("matchEnd",{winner:this.matchWinner,mvp:this.mvpName()});return}let e=this.setsWon[0]>this.setsWon[1]?0:1;this.setIndex++,this.scores=[0,0],this.clock=He.setSeconds,this.timeUp=!1,this.suddenDeath=!1,this.servingTeam=e,this.lastHitterByTeam=[null,null],this.resetPlayers(),this.ball.reset(),this.setPhase("kickoff"),this.phaseTimer=He.kickoffSeconds,this.lastCount=-1,this.events.emit("announce",{text:`SET ${this.setIndex+1}`,sub:this.servingTeam===this.humanTeam?"\u6211\u65B9\u53D1\u7403":"\u5BF9\u65B9\u53D1\u7403",ms:1200})}setPhase(t){this.phase!==t&&(this.phase=t,this.events.emit("phase",{phase:t}))}};var P0='"PingFang SC","Microsoft YaHei",system-ui,sans-serif';function dn(s,t,e=2){let n=document.createElement("canvas");n.width=Math.max(1,Math.round(s*e)),n.height=Math.max(1,Math.round(t*e));let i=n.getContext("2d");return i.scale(e,e),{canvas:n,ctx:i}}function fn(s){let t=new Ae(s);return t.colorSpace=ae,t.minFilter=we,t.magFilter=we,t.generateMipmaps=!1,t}function zn(s,t,e,n,i,r=1){let a=new hn({map:s,transparent:!0,depthTest:!1,depthWrite:!1,side:jt}),o=new Mn(a);return o.scale.set(t,e,1),o.position.set(n,i,0),o.renderOrder=r,o}function hs(s,t){var n;let e=s.material;(n=e.map)==null||n.dispose(),e.map=t,e.needsUpdate=!0}function qe(s,t,e,n,i,r){let a=Math.min(r,n/2,i/2);s.beginPath(),s.moveTo(t+a,e),s.arcTo(t+n,e,t+n,e+i,a),s.arcTo(t+n,e+i,t,e+i,a),s.arcTo(t,e+i,t,e,a),s.arcTo(t,e,t+n,e,a),s.closePath()}function oa(s,t={}){var d,f,g,x,m;let e=(d=t.fontSize)!=null?d:16,n=(f=t.weight)!=null?f:700,i=(g=t.pad)!=null?g:4,r=(x=t.scale)!=null?x:2,a=`${n} ${e}px ${P0}`,o=document.createElement("canvas").getContext("2d");o.font=a;let l=Math.ceil(o.measureText(s).width)+i*2,c=Math.ceil(e*1.35)+i*2,{canvas:h,ctx:u}=dn(l,c,r);return u.font=a,u.textAlign="center",u.textBaseline="middle",u.lineJoin="round",t.stroke&&t.strokeWidth&&(u.lineWidth=t.strokeWidth,u.strokeStyle=t.stroke,u.strokeText(s,l/2,c/2)),u.fillStyle=(m=t.color)!=null?m:"#ffffff",u.fillText(s,l/2,c/2),{tex:fn(h),width:l,height:c}}var I0=15594232,la=class{constructor(t,e,n,i,r){this.ui=t;this.platform=e;this.W=n;this.H=i;this.padH=r;this.root=new Yt;this.btns=[];this.joyVec={x:0,y:0};this.joyId=-1;this.hitEdge=!1;this.jumpEdge=!1;this.blockEdge=!1;this.hitHeld=!1;this.blockHeld=!1;this.sprintHeld=!1;this.enabled=!1;this.y0=i-r;let a=new rt(new Se(n,r),new Jt({color:I0,depthTest:!1,depthWrite:!1,side:jt}));a.position.set(n/2,i-(this.y0+r/2),0),a.renderOrder=0,this.root.add(a);let o=new rt(new Se(n,1),new Jt({color:14213871,depthTest:!1,depthWrite:!1,side:jt}));o.position.set(n/2,i-this.y0,0),o.renderOrder=1,this.root.add(o);let l=Math.min(this.platform.safeBottom,30);this.joyHome={x:72,y:this.y0+(r-l)*.52},this.joyOrigin={...this.joyHome},this.joyBase=this.circle(46,16777215,.95,2),this.joyShadow=this.ring(46,54,13031144,.42,2),this.joyRing=this.ring(43,46.5,13228008,.95,3),this.joyKnob=this.circle(21,16777215,1,4),this.joyKnobRing=this.ring(18.5,21,9085887,1,5),this.root.add(this.joyBase,this.joyShadow,this.joyRing,this.joyKnob,this.joyKnobRing);let c=r-8-l,h=this.y0+c*.3,u=this.y0+c*.74,d=n-64,f=n-134;this.addButton("hit",d,u,30,16739210,"\u51FB\u7403"),this.addButton("jump",d,h,23,4891647,"\u8DF3\u8DC3"),this.addButton("block",f,u,24,8154367,"\u62E6\u7F51"),this.addButton("sprint",f,h,21,16755502,"\u51B2\u523A"),this.ui.scene.add(this.root),this.root.visible=!1,this.updateVisual()}circle(t,e,n,i){let r=new rt(new ni(t,48),new Jt({color:e,transparent:n<1,opacity:n,depthTest:!1,depthWrite:!1,side:jt}));return r.renderOrder=i,r}ring(t,e,n,i,r){let a=new rt(new Fn(t,e,48),new Jt({color:n,transparent:!0,opacity:i,depthTest:!1,depthWrite:!1,side:jt}));return a.renderOrder=r,a}addButton(t,e,n,i,r,a){let o=this.circle(i,r,1,4);o.position.set(e,this.H-n,0);let l=this.ring(i-2.5,i,16777215,.55,5);l.position.set(e,this.H-n,0);let c=oa(a,{fontSize:15,weight:800,color:"#ffffff",pad:2}),h=zn(c.tex,c.width,c.height,e,this.H-n,6);this.root.add(o,l,h),this.btns.push({id:t,x:e,y:n,r:i,color:r,label:a,mesh:o,ring:l,text:h,textW:c.width,textH:c.height,pointer:-1})}setVisible(t){this.root.visible=t}setEnabled(t){t||this.releaseAll(),this.enabled=t}onStart(t){if(!(!this.enabled||!this.root.visible)){for(let e of t){if(e.y<this.y0)continue;if(e.x<this.W*.5&&this.joyId<0){this.joyId=e.id,this.joyOrigin={x:Xt(e.x,56,this.W*.5-16),y:Xt(e.y,this.y0+48,this.H-48)},this.joyVec={x:0,y:0};continue}let n=this.hitButton(e.x,e.y);n&&n.pointer<0&&(n.pointer=e.id,this.press(n,!0),(n.id==="hit"||n.id==="jump")&&this.platform.vibrateShort())}this.updateVisual()}}onMove(t){if(this.joyId>=0){let e=t.find(n=>n.id===this.joyId);if(e){let n=e.x-this.joyOrigin.x,i=e.y-this.joyOrigin.y,r=Math.hypot(n,i),a=40,o=r>a?a/r:1;this.joyVec={x:n*o/a,y:i*o/a}}}this.updateVisual()}onEnd(t,e){for(let n of t){n.id===this.joyId&&(this.joyId=-1,this.joyVec={x:0,y:0},this.joyOrigin={...this.joyHome});for(let i of this.btns)i.pointer===n.id&&(i.pointer=-1,this.press(i,!1))}for(let n of this.btns)n.pointer>=0&&!e.some(i=>i.id===n.pointer)&&(n.pointer=-1,this.press(n,!1));this.updateVisual()}onCancel(){this.releaseAll(),this.updateVisual()}read(){if(!this.enabled)return this.resetEdges(),ri();let t=ri(),e=Math.hypot(this.joyVec.x,this.joyVec.y);if(e>=.12){let n=Math.min(1,e)/e;t.moveX=this.joyVec.x*n,t.moveZ=this.joyVec.y*n}return t.sprint=this.sprintHeld,t.jump=this.jumpEdge,t.hit=this.hitEdge,t.hitHeld=this.hitHeld,t.block=this.blockEdge,t.blockHeld=this.blockHeld,this.jumpEdge=!1,this.hitEdge=!1,this.blockEdge=!1,t}hitButton(t,e){for(let n of this.btns){let i=t-n.x,r=e-n.y;if(i*i+r*r<=n.r*n.r)return n}return null}press(t,e){t.id==="jump"?e&&(this.jumpEdge=!0):t.id==="hit"?(this.hitHeld=e,e&&(this.hitEdge=!0)):t.id==="block"?(this.blockHeld=e,e&&(this.blockEdge=!0)):this.sprintHeld=e}resetEdges(){this.jumpEdge=!1,this.hitEdge=!1,this.blockEdge=!1}releaseAll(){this.joyId=-1,this.joyVec={x:0,y:0},this.joyOrigin={...this.joyHome};for(let t of this.btns)t.pointer=-1,this.press(t,!1);this.resetEdges(),this.updateVisual()}updateVisual(){let t=this.joyId>=0?this.joyOrigin.x:this.joyHome.x,e=this.joyId>=0?this.joyOrigin.y:this.joyHome.y,n=t+this.joyVec.x*40,i=e+this.joyVec.y*40,r=this.H-e,a=this.H-i;this.joyBase.position.set(t,r,0),this.joyShadow.position.set(t,r,0),this.joyRing.position.set(t,r,0),this.joyKnob.position.set(n,a,0),this.joyKnobRing.position.set(n,a,0);for(let o of this.btns){let l=o.pointer>=0;o.mesh.scale.setScalar(l?.92:1),o.ring.scale.setScalar(l?.92:1),o.text.scale.set(o.textW*(l?.92:1),o.textH*(l?.92:1),1),o.mesh.material.color.setHex(l?L0(o.color):o.color)}}};function L0(s){let t=Math.min(255,(s>>16&255)+26),e=Math.min(255,(s>>8&255)+26),n=Math.min(255,(s&255)+26);return t<<16|e<<8|n}var Ti='"PingFang SC","Microsoft YaHei",system-ui,sans-serif',ca=class{constructor(t,e,n,i,r=0){this.root=new Yt;this.scoreKey="";this.touchKey=-1;this.announceT=0;this.announcePop=0;this.W=e,this.y0=n-i;let a=dn(330,96,2),o=Math.min(r,60);this.scoreSprite=zn(fn(a.canvas),330,96,e/2,n-(52+o),12),this.root.add(this.scoreSprite);let l=dn(340,104,2),c=Math.min(r,30);this.announceSprite=zn(fn(l.canvas),340,104,e/2,n-((n-i)*.26+c),14),this.announceSprite.visible=!1,this.root.add(this.announceSprite);let h=dn(118,28,2);this.touchSprite=zn(fn(h.canvas),118,28,78,n-(this.y0-64),12),this.root.add(this.touchSprite),this.serveTrack=new rt(new Se(180,8),new Jt({color:16777215,transparent:!0,opacity:.62,depthTest:!1,depthWrite:!1,side:jt})),this.serveTrack.position.set(e/2,n-(this.y0-24),0),this.serveTrack.renderOrder=11,this.serveTrack.visible=!1,this.root.add(this.serveTrack);let u=new Se(1,8);u.translate(.5,0,0),this.serveFill=new rt(u,new Jt({color:3523706,depthTest:!1,depthWrite:!1,side:jt})),this.serveFill.position.set(e/2-90,n-(this.y0-24),0),this.serveFill.renderOrder=12,this.serveFill.visible=!1,this.root.add(this.serveFill),this.pauseBg=new rt(new ni(16,40),new Jt({color:16777215,transparent:!0,opacity:.86,depthTest:!1,depthWrite:!1,side:jt})),this.pauseBg.position.set(e-30,n-132,0),this.pauseBg.renderOrder=12,this.root.add(this.pauseBg);let d=oa("II",{fontSize:14,weight:900,color:"#2b4a66",pad:1});this.pauseIcon=zn(d.tex,d.width,d.height,e-30,n-132,13),this.root.add(this.pauseIcon),t.scene.add(this.root)}setVisible(t){this.root.visible=t}update(t){let e=Math.ceil(t.clock),n=t.clock<=5&&(t.phase==="rally"||t.phase==="serve"),i=`${e}|${t.scores[0]}|${t.scores[1]}|${t.setIndex}|${t.setsWon[0]}|${t.setsWon[1]}|${n}`;i!==this.scoreKey&&(this.scoreKey=i,this.drawScore(t,e,n));let r=t.touches[t.humanTeam];r!==this.touchKey&&(this.touchKey=r,this.drawTouch(r));let a=t.players.find(l=>l.id===t.localPlayerId),o=t.phase==="serve"&&!!a&&t.serverId===a.id;if(this.serveTrack.visible=o,this.serveFill.visible=o,o&&a){let l=Math.max(.03,Math.min(1,a.charge));this.serveFill.scale.x=180*l}}tick(t){if(this.announceT<=0)return;this.announceT-=t,this.announcePop=Math.max(0,this.announcePop-t);let e=this.announceSprite.material;e.opacity=Math.min(1,this.announceT/.28);let n=1+this.announcePop*.55;this.announceSprite.scale.set(340*n,104*n,1),this.announceT<=0&&(this.announceSprite.visible=!1)}announce(t,e,n=1200){if(!t)return;let{canvas:i,ctx:r}=dn(340,104,2);r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font=`900 40px ${Ti}`,r.lineWidth=10,r.strokeStyle="rgba(9,26,44,0.55)",r.strokeText(t,170,e?44:52),r.fillStyle="#ffffff",r.fillText(t,170,e?44:52),e&&(r.font=`600 14px ${Ti}`,r.lineWidth=6,r.strokeStyle="rgba(9,26,44,0.5)",r.strokeText(e,170,80),r.fillStyle="rgba(255,255,255,0.92)",r.fillText(e,170,80)),hs(this.announceSprite,fn(i)),this.announceSprite.visible=!0,this.announceSprite.scale.set(340,104,1),this.announceSprite.material.opacity=1,this.announceT=n/1e3,this.announcePop=.16}hitPause(t,e){if(!this.root.visible)return!1;let n=t-(this.W-30),i=e-132;return n*n+i*i<=676}drawScore(t,e,n){let{canvas:i,ctx:r}=dn(330,96,2),[a,o]=t.scores;qe(r,113,0,104,30,15),r.fillStyle="rgba(255,255,255,0.96)",r.fill(),r.textAlign="center",r.textBaseline="middle",r.fillStyle=n?"#e14b4b":"#15273b",r.font=`800 20px ${Ti}`,r.fillText(String(e),165,16),qe(r,3,34,324,44,22),r.fillStyle="rgba(255,255,255,0.96)",r.fill(),qe(r,18,46,68,20,10),r.fillStyle="#3ecf7a",r.fill(),r.fillStyle="#ffffff",r.font=`800 11px ${Ti}`,r.fillText("HOME",52,56),qe(r,244,46,68,20,10),r.fillStyle="#ff5f87",r.fill(),r.fillStyle="#ffffff",r.fillText("AWAY",278,56),r.fillStyle="#15273b",r.font=`900 26px ${Ti}`,r.fillText(String(a),132,56),r.fillText("\u2014",165,54),r.fillText(String(o),198,56),r.font=`600 11px ${Ti}`,r.fillStyle="#71829a",r.textAlign="left",r.fillText(`SET ${t.setIndex+1}`,36,87),r.textAlign="right",r.fillText(`to ${He.pointsToWinSet}`,294,87);for(let l=0;l<3;l++)r.beginPath(),r.arc(150+l*15,87,3.2,0,Math.PI*2),r.fillStyle=l<t.setsWon[0]?"#3ecf7a":l>=3-t.setsWon[1]?"#ff5f87":"#dbe5f0",r.fill();hs(this.scoreSprite,fn(i))}drawTouch(t){let{canvas:e,ctx:n}=dn(118,28,2);qe(n,0,0,118,28,14),n.fillStyle=t>=3?"#ffe2e2":t===2?"#fff0e2":"rgba(255,255,255,0.9)",n.fill(),n.textAlign="left",n.textBaseline="middle",n.font=`700 12px ${Ti}`,n.fillStyle=t>=3?"#d94a4a":t===2?"#e08a2e":"#4a5f76",n.fillText(t>=3?"\u89E6\u7403\u5DF2\u6EE1":`\u89E6\u7403 ${t}/3`,12,14);for(let i=0;i<3;i++)n.beginPath(),n.arc(88+i*9,14,3,0,Math.PI*2),n.fillStyle=i<t?t>=3?"#e14b4b":"#35c47a":"#dbe5f0",n.fill();hs(this.touchSprite,fn(e))}};var ha=class{constructor(t,e){this.width=t;this.height=e;this.scene=new is;this.camera=new ns(0,t,e,0,-100,100),this.camera.position.set(0,0,10),this.camera.lookAt(0,0,0)}render(t){t.setViewport(0,0,this.width,this.height),t.setScissorTest(!1),t.render(this.scene,this.camera)}};var Ye='"PingFang SC","Microsoft YaHei",system-ui,sans-serif',ua=class{constructor(t,e,n,i,r){this.ui=t;this.W=e;this.H=n;this.handlers=i;this.padH=r;this.root=new Yt;this.hits=[];this.state="none";this.skill="normal";let a=dn(e,n,1.5);this.sprite=zn(fn(a.canvas),e,n,e/2,n/2,60),this.root.add(this.sprite),this.root.visible=!1,t.scene.add(this.root),this.panelTop=Math.max(24,Math.round(n*.102))}get visible(){return this.state!=="none"}showStart(t){this.skill=t,this.state="start",this.root.visible=!0,this.drawStart()}showResult(t,e,n){this.state="result",this.root.visible=!0,this.drawResult(t,e,n)}showPause(){this.state="pause",this.root.visible=!0,this.drawPause()}hide(){this.state="none",this.root.visible=!1,this.hits=[]}touchStart(t){if(!this.visible||t.length===0)return;let e=t[0];for(let n of this.hits)if(e.x>=n.x&&e.x<=n.x+n.w&&e.y>=n.y&&e.y<=n.y+n.h){this.activate(n.id);return}}activate(t){if(t.startsWith("diff:")){this.skill=t.slice(5),this.drawStart();return}if(this.state==="start"&&t==="start"){this.handlers.onStart(this.skill);return}if(this.state==="result"&&t==="again"){this.handlers.onAgain();return}if(this.state==="pause"&&t==="resume"){this.handlers.onResume();return}t==="home"&&this.handlers.onHome()}drawStart(){let{canvas:t,ctx:e}=this.prepare(),n=this.W/2,i=this.panelTop,r=Math.min(620,this.H-i-24);this.panel(e,24,i,342,r),e.textAlign="center",e.textBaseline="middle",e.fillStyle="#15273b",e.font=`900 40px ${Ye}`,e.fillText("Q\u7248\u6392\u7403",n,i+72),e.fillStyle="#6f8197",e.font=`600 13px ${Ye}`,e.fillText("2v2 \u4EBA\u673A\u8BAD\u7EC3\u8D5B \xB7 7 \u5206\u5236 \xB7 \u4E09\u5C40\u4E24\u80DC",n,i+112),e.textAlign="left",e.fillStyle="#71829a",e.font=`700 13px ${Ye}`,e.fillText("\u96BE\u5EA6",56,i+160),[{id:"easy",label:"\u7B80\u5355"},{id:"normal",label:"\u666E\u901A"},{id:"hard",label:"\u56F0\u96BE"}].forEach((o,l)=>{let c=52+l*99,h=i+176,u=this.skill===o.id;qe(e,c,h,88,38,19),e.fillStyle=u?"#35c47a":"#eef3f9",e.fill(),e.textAlign="center",e.fillStyle=u?"#ffffff":"#51667c",e.font=`700 15px ${Ye}`,e.fillText(o.label,c+44,h+20),this.hits.push({id:`diff:${o.id}`,x:c,y:h,w:88,h:38})}),this.primaryButton(e,"start",64,i+250,262,56,"\u5F00\u59CB\u6BD4\u8D5B"),this.tips(e,i),this.finish(t)}drawResult(t,e,n){let{canvas:i,ctx:r}=this.prepare(),a=this.W/2,o=this.panelTop,l=Math.min(620,this.H-o-24);this.panel(r,24,o,342,l);let c=e===t.humanTeam;r.textAlign="center",r.textBaseline="middle",r.fillStyle=c?"#1fae68":"#e0566f",r.font=`900 42px ${Ye}`,r.fillText(c?"\u80DC\u5229\uFF01":"\u60DC\u8D25",a,o+124),r.fillStyle="#6f8197",r.font=`600 13px ${Ye}`,r.fillText(c?"\u914D\u5408\u9ED8\u5951\uFF0C\u518D\u6765\u4E00\u5C40\uFF1F":"\u5DEE\u4E00\u70B9\uFF0C\u8C03\u6574\u8282\u594F\u518D\u6218",a,o+166),r.fillStyle="#15273b",r.font=`900 56px ${Ye}`,r.fillText(`${t.setsWon[0]} : ${t.setsWon[1]}`,a,o+254),r.fillStyle="#71829a",r.font=`600 15px ${Ye}`,r.fillText(n?`MVP \xB7 ${n}`:"",a,o+306),this.primaryButton(r,"again",64,o+384,262,56,"\u518D\u6765\u4E00\u5C40"),this.secondaryButton(r,"home",64,o+454,262,50,"\u8FD4\u56DE\u5927\u5385"),this.finish(i)}drawPause(){let{canvas:t,ctx:e}=this.prepare(),n=Math.round((this.H-312)/2);this.panel(e,45,n,300,312),e.textAlign="center",e.textBaseline="middle",e.fillStyle="#15273b",e.font=`900 34px ${Ye}`,e.fillText("\u6682\u505C",this.W/2,n+72),this.primaryButton(e,"resume",75,n+144,240,54,"\u7EE7\u7EED\u6BD4\u8D5B"),this.secondaryButton(e,"home",75,n+212,240,48,"\u8FD4\u56DE\u5927\u5385"),this.finish(t)}prepare(){this.hits=[];let{canvas:t,ctx:e}=dn(this.W,this.H,1.5);e.fillStyle="rgba(7,20,34,0.48)",e.fillRect(0,0,this.W,this.H);let n=this.H-this.padH;return e.fillStyle="rgba(9,24,40,0.28)",e.fillRect(0,n,this.W,this.padH),{canvas:t,ctx:e}}panel(t,e,n,i,r){qe(t,e+3,n+8,i,r,30),t.fillStyle="rgba(6,20,34,0.22)",t.fill(),qe(t,e,n,i,r,30),t.fillStyle="rgba(255,255,255,0.97)",t.fill()}primaryButton(t,e,n,i,r,a,o){qe(t,n,i+3,r,a,a/2),t.fillStyle="rgba(26,150,92,0.28)",t.fill(),qe(t,n,i,r,a,a/2),t.fillStyle="#35c47a",t.fill(),t.textAlign="center",t.textBaseline="middle",t.fillStyle="#ffffff",t.font=`800 20px ${Ye}`,t.fillText(o,n+r/2,i+a/2),this.hits.push({id:e,x:n,y:i,w:r,h:a})}secondaryButton(t,e,n,i,r,a,o){qe(t,n,i,r,a,a/2),t.fillStyle="#eef3f9",t.fill(),t.textAlign="center",t.textBaseline="middle",t.fillStyle="#51667c",t.font=`700 16px ${Ye}`,t.fillText(o,n+r/2,i+a/2),this.hits.push({id:e,x:n,y:i,w:r,h:a})}tips(t,e){let n=["\u5DE6\u6447\u6746\u79FB\u52A8\uFF0C\u53F3\u4FA7\u6309\u952E\uFF1A\u8DF3\u8DC3 / \u51FB\u7403 / \u62E6\u7F51 / \u51B2\u523A","\u6309\u4F4F\u51FB\u7403\u84C4\u529B\u53D1\u7403\uFF0C\u677E\u624B\u53D1\u51FA\uFF1B\u53D1\u7403\u65F6\u5DE6\u53F3\u62E8\u6447\u6746\u7784\u51C6","\u4E00\u4F20\u57AB\u7ED9\u961F\u53CB \u2192 \u4E8C\u4F20\u6258\u5230\u7F51\u524D \u2192 \u8D77\u8DF3\u6263\u6740","\u6BCF\u961F\u6700\u591A\u4E09\u6B21\u89E6\u7403\uFF0C\u5148\u5230 7 \u5206\uFF0C\u4E09\u5C40\u4E24\u80DC"];t.textAlign="left",t.textBaseline="middle",t.font=`600 12.5px ${Ye}`,t.fillStyle="#6b7c93",n.forEach((i,r)=>{t.fillText(i,56,e+346+r*26)}),t.textAlign="center",t.fillStyle="#9aabbd",t.font=`600 11px ${Ye}`,t.fillText("\u5FAE\u4FE1\u5C0F\u6E38\u620F \xB7 \u7AD6\u5C4F\u624B\u67C4\u7248",this.W/2,e+574)}finish(t){hs(this.sprite,fn(t)),this.sprite.scale.set(this.W,this.H,1)}};var da=1/60,Bs=class{constructor(t){this.skill="normal";this.state="start";this.acc=0;this.last=0;this.rafId=0;this.disposed=!1;this.loop=t=>{if(this.disposed)return;this.rafId=this.platform.raf(this.loop);let e=Math.min(.1,Math.max(0,(t-this.last)/1e3));if(this.last=t,this.state==="playing"){let n=this.world.slowmoTimer>0;n&&(this.world.slowmoTimer=Math.max(0,this.world.slowmoTimer-e)),this.acc+=e*(n?.42:1);let i=0;for(;this.acc>=da&&i++<6;)this.world.step(da),this.acc-=da;this.scene.sync(this.world,this.acc/da,e),this.audio.update(e)}else this.acc=0,this.scene.sync(this.world,1,e);this.hud.update(this.world),this.hud.tick(e),this.scene.render(),this.ui.render(this.scene.renderer)};this.platform=t,this.padH=Math.max(124,Math.round(t.height/6)),this.scene=new na(t.canvas,t.width,t.height,this.padH,t.dpr),this.ui=new ha(t.width,t.height),this.hud=new ca(this.ui,t.width,t.height,this.padH,t.safeTop),this.pad=new la(this.ui,t,t.width,t.height,this.padH),this.screens=new ua(this.ui,t.width,t.height,{onStart:e=>this.start(e),onAgain:()=>this.start(this.skill),onHome:()=>this.home(),onResume:()=>this.resume()},this.padH),this.audio=new Vs(()=>t.createAudioContext()),this.world=this.createWorld(this.skill),this.hud.setVisible(!1),this.pad.setVisible(!1),this.pad.setEnabled(!1),this.screens.showStart(this.skill),this.bindTouches(),this.last=t.now(),this.rafId=t.raf(this.loop),typeof globalThis!="undefined"&&(globalThis.__paiqiu=this)}dispose(){this.disposed=!0,this.platform.cancelRaf(this.rafId)}start(t){this.skill=t,this.audio.unlock(),this.audio.startBgm(),this.world=this.createWorld(t),this.world.startMatch(),this.state="playing",this.screens.hide(),this.hud.setVisible(!0),this.pad.setVisible(!0),this.pad.setEnabled(!0),this.acc=0,this.last=this.platform.now()}pause(){this.state==="playing"&&(this.state="paused",this.pad.setEnabled(!1),this.pad.setVisible(!1),this.screens.showPause())}resume(){this.state==="paused"&&(this.state="playing",this.screens.hide(),this.pad.setVisible(!0),this.pad.setEnabled(!0),this.acc=0,this.last=this.platform.now())}home(){this.world=this.createWorld(this.skill),this.state="start",this.screens.showStart(this.skill),this.hud.setVisible(!1),this.pad.setEnabled(!1),this.pad.setVisible(!1)}createWorld(t){let e=new aa({teamSize:2,skill:t,humanCount:1,localPlayerId:0,humanName:"\u4F60"});return e.inputProvider=()=>this.pad.read(),this.scene.build(e),this.wire(e),e}wire(t){t.events.on("hit",e=>{this.scene.onHit(e),this.audio.hit(e.power,e.kind==="attack")}),t.events.on("block",e=>{this.scene.onBlock(e),this.audio.block()}),t.events.on("land",e=>{this.scene.onLand(e),this.audio.land()}),t.events.on("score",e=>{this.audio.score();for(let n of t.players)n.team===e.winner&&this.scene.celebratePlayer(n.id)}),t.events.on("announce",e=>this.hud.announce(e.text,e.sub,e.ms)),t.events.on("tick",()=>this.audio.tick()),t.events.on("serve",()=>this.audio.serve()),t.events.on("net",()=>this.audio.net()),t.events.on("jump",()=>this.audio.jump()),t.events.on("dive",()=>this.audio.dive()),t.events.on("swing",()=>this.audio.swing()),t.events.on("setEnd",()=>this.audio.fanfare()),t.events.on("matchEnd",e=>{this.state="result",this.pad.setEnabled(!1),this.pad.setVisible(!1),this.hud.setVisible(!1),this.screens.showResult(t,e.winner,e.mvp),this.audio.fanfare()})}bindTouches(){this.platform.onTouchStart(t=>{if(this.screens.visible){this.screens.touchStart(t);return}let e=t[0];if(this.state==="playing"&&e&&this.hud.hitPause(e.x,e.y)){this.pause();return}this.pad.onStart(t)}),this.platform.onTouchMove(t=>{this.screens.visible||this.pad.onMove(t)}),this.platform.onTouchEnd((t,e)=>{this.screens.visible||this.pad.onEnd(t,e)}),this.platform.onTouchCancel(()=>this.pad.onCancel())}};async function Fh(){if(typeof wx!="undefined"&&typeof wx.createCanvas=="function"){let{createWxPlatform:s}=await Promise.resolve().then(()=>(Uh(),Dh));new Bs(s())}else{let{createWebPlatform:s}=await Promise.resolve().then(()=>(Oh(),Nh));new Bs(s())}}Fh();})();
