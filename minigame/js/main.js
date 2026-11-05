"use strict";(()=>{var Hu=Object.defineProperty;var nr=(s,t)=>()=>(s&&(t=s(s=0)),t);var ql=(s,t)=>{for(var e in t)Hu(s,e,{get:t[e],enumerable:!0})};function rr(s){return sr=s,s}function ar(){return sr!=null?sr:Vu}function Ga(){return ar().uiScale}function $l(){return ar().layerScale}function Zl(){return ar().floorBoost}function Jl(){return ar().labelBoost}function Wu(s,t,e,n){if(n>0)return n>=30?"high":n>=15?"mid":"low";let i=s*t*Math.min(e,3)**2;return i>=24e5?"high":i>=12e5?"mid":"low"}function or(s,t,e,n=-1,i,r){let a=i==="low"||i==="mid"||i==="high"?i:null,o=a!=null?a:Wu(s,t,e,n),l=Gu[o],c=Math.min(l.dprCap,ir(e||2,1,4)),h=Math.sqrt(l.budgetPx/Math.max(1,s*t)),u=Yl(Math.min(c,h));r&&r>0&&(u=ir(Yl(r),1,4)),u=ir(u,1,3);let d=ir(u,2,3);return{tier:o,dpr:u,uiScale:d,layerScale:d,floorBoost:l.floorBoost,labelBoost:l.labelBoost}}function Kl(s){return s>2.5?2.5:s>2?2:null}var Gu,Vu,sr,ir,Yl,Yn=nr(()=>{"use strict";Gu={high:{dprCap:3,budgetPx:3e6,floorBoost:1.5,labelBoost:1.25},mid:{dprCap:2.5,budgetPx:22e5,floorBoost:1.25,labelBoost:1.1},low:{dprCap:2,budgetPx:15e5,floorBoost:1,labelBoost:1}},Vu={tier:"mid",dpr:2,uiScale:2,layerScale:2,floorBoost:1,labelBoost:1},sr=null;ir=(s,t,e)=>Math.min(e,Math.max(t,s)),Yl=s=>Math.round(s*4)/4});var Va,Wa,Sn,Ne,Xu,jl,Xa,sn,tc,ec,qa,Ql,Pn,nc,rn,Ya=nr(()=>{"use strict";Yn();Va=typeof globalThis!="undefined"?globalThis:GameGlobal,Wa=s=>{if(!s)return s;let t=()=>{},e=(n,i)=>{try{typeof s[n]=="undefined"&&(s[n]=i)}catch(r){}};return e("addEventListener",t),e("removeEventListener",t),e("dispatchEvent",()=>!1),e("setAttribute",t),e("style",{}),e("clientWidth",s.width||0),e("clientHeight",s.height||0),e("ownerDocument",null),typeof s.getBoundingClientRect!="function"&&e("getBoundingClientRect",()=>({left:0,top:0,right:s.width||0,bottom:s.height||0,width:s.width||0,height:s.height||0})),s},Sn=Wa(wx.createCanvas()),Ne=(wx.getWindowInfo?wx.getWindowInfo():wx.getSystemInfoSync())||{},Xu=(()=>{try{if(typeof wx.getDeviceBenchmarkInfo=="function"){let t=wx.getDeviceBenchmarkInfo();if(t&&t.benchmarkLevel>0)return t.benchmarkLevel}let s=typeof wx.getDeviceInfo=="function"?wx.getDeviceInfo():null;if(s&&s.benchmarkLevel>0)return s.benchmarkLevel}catch(s){}return-1})(),jl=(()=>{try{return wx.getLaunchOptionsSync&&wx.getLaunchOptionsSync().query||{}}catch(s){return{}}})(),Xa=or(Ne.windowWidth||Ne.screenWidth||375,Ne.windowHeight||Ne.screenHeight||667,Ne.pixelRatio||2,Xu,jl.q,Number(jl.dpr)||void 0);rr(Xa);sn={width:Ne.windowWidth||Ne.screenWidth||375,height:Ne.windowHeight||Ne.screenHeight||667,dpr:Xa.dpr,deviceDpr:Math.min(Ne.pixelRatio||2,4),quality:Xa.tier,safeTop:Ne.safeArea?Math.max(0,Ne.safeArea.top||0):0,safeBottom:Ne.safeArea?Math.max(0,(Ne.windowHeight||Ne.screenHeight||0)-Ne.safeArea.bottom):0},tc=s=>typeof Sn.requestAnimationFrame=="function"?Sn.requestAnimationFrame(s):setTimeout(()=>s(Date.now()),16),ec=s=>{typeof Sn.cancelAnimationFrame=="function"?Sn.cancelAnimationFrame(s):clearTimeout(s)},qa=(s=1,t=1)=>{if(typeof wx.createOffscreenCanvas=="function")try{return Wa(wx.createOffscreenCanvas({type:"2d",width:s,height:t}))}catch(n){}let e=Wa(wx.createCanvas());return e.width=s,e.height=t,e},Ql=(s=1,t=1)=>qa(s,t),Pn={devicePixelRatio:sn.dpr,innerWidth:sn.width,innerHeight:sn.height,addEventListener(){},removeEventListener(){},requestAnimationFrame:tc,cancelAnimationFrame:ec,setTimeout,clearTimeout,setInterval,clearInterval,performance:{now:()=>Date.now()},navigator:{userAgent:"wechat-minigame",platform:"wechat"},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}};Pn.AudioContext=function(){return wx.createWebAudioContext?wx.createWebAudioContext():null};Pn.webkitAudioContext=Pn.AudioContext;nc={createElement(s){return s==="canvas"?Ql():{style:{},appendChild(){},remove(){}}},createElementNS(s,t){return t==="canvas"?Ql():{style:{}}},createTextNode(s){return{textContent:s}},documentElement:{style:{}},body:{style:{},appendChild(){}},addEventListener(){},removeEventListener(){}};Pn.document=nc;rn=(s,t)=>{try{Va[s]=t}catch(e){}if(Va[s]!==t)try{Object.defineProperty(Va,s,{value:t,configurable:!0,writable:!0})}catch(e){}};rn("window",Pn);rn("self",Pn);rn("document",nc);rn("navigator",Pn.navigator);rn("performance",Pn.performance);rn("devicePixelRatio",sn.dpr);rn("innerWidth",sn.width);rn("innerHeight",sn.height);rn("requestAnimationFrame",tc);rn("cancelAnimationFrame",ec);rn("AudioContext",Pn.AudioContext);rn("Image",function(){return{}})});var Iu={};ql(Iu,{createWxPlatform:()=>fx});function fx(){return{canvas:Sn,width:sn.width,height:sn.height,dpr:sn.dpr,safeTop:sn.safeTop,safeBottom:sn.safeBottom,createCanvas(s,t){return qa(s,t)},raf(s){return typeof Sn.requestAnimationFrame=="function"?Sn.requestAnimationFrame(s):setTimeout(()=>s(Date.now()),16)},cancelRaf(s){typeof Sn.cancelAnimationFrame=="function"?Sn.cancelAnimationFrame(s):clearTimeout(s)},now:()=>Date.now(),createAudioContext(){try{return wx.createWebAudioContext?wx.createWebAudioContext():null}catch(s){return null}},onTouchStart(s){wx.onTouchStart(t=>s(Qs(t.changedTouches)))},onTouchMove(s){wx.onTouchMove(t=>s(Qs(t.touches)))},onTouchEnd(s){wx.onTouchEnd(t=>s(Qs(t.changedTouches),Qs(t.touches)))},onTouchCancel(s){wx.onTouchCancel(t=>s(Qs(t.touches)))},vibrateShort(){try{wx.vibrateShort({type:"light"})}catch(s){}},getLaunchQuery(){var s;try{let t=(s=wx.getLaunchOptionsSync)==null?void 0:s.call(wx).query;return t&&typeof t=="object"?t:{}}catch(t){return{}}},getNickName(s){let t=this.getLaunchQuery();if(t.nick){s(t.nick);return}if(typeof wx.getUserInfo=="function")try{wx.getUserInfo({success:e=>{var n;return s(((n=e==null?void 0:e.userInfo)==null?void 0:n.nickName)||"\u73A9\u5BB6")},fail:()=>s("\u73A9\u5BB6")});return}catch(e){}s("\u73A9\u5BB6")},shareAppMessage(s,t){try{wx.shareAppMessage({title:s,query:t})}catch(e){}},showModal(s,t){try{wx.showModal({title:s,content:t,showCancel:!1,confirmText:"\u77E5\u9053\u4E86"})}catch(e){}},restartApp(){try{if(typeof wx.restartMiniProgram=="function"){wx.restartMiniProgram({path:""});return}if(typeof wx.exitMiniProgram=="function"){wx.exitMiniProgram({});return}}catch(s){}this.showModal("\u8BF7\u91CD\u65B0\u8FDB\u5165\u5C0F\u6E38\u620F","\u753B\u9762\u6E32\u67D3\u65E0\u6CD5\u6062\u590D\uFF0C\u8BF7\u6740\u6389\u5C0F\u6E38\u620F\u540E\u91CD\u65B0\u6253\u5F00\u3002")}}}var Qs,Lu=nr(()=>{"use strict";Ya();Qs=s=>(s||[]).map(t=>({id:typeof t.identifier=="number"?t.identifier:0,x:t.clientX,y:t.clientY}))});var Du={};ql(Du,{createWebPlatform:()=>px});function px(){var o;hn=document.getElementById("scene");let s=hn.clientWidth||390,t=hn.clientHeight||844,e=new Map;hn.addEventListener("contextmenu",l=>l.preventDefault()),hn.addEventListener("touchstart",l=>{l.preventDefault();let c=Array.from(l.changedTouches).map(h=>Ol(h));c.forEach(h=>e.set(h.id,h)),bn.start.forEach(h=>h(c))}),hn.addEventListener("touchmove",l=>{l.preventDefault();for(let h of Array.from(l.changedTouches)){let u=Ol(h);e.has(u.id)&&e.set(u.id,u)}let c=Array.from(e.values());bn.move.forEach(h=>h(c))}),hn.addEventListener("touchend",l=>{l.preventDefault();let c=Array.from(l.changedTouches).map(u=>Ol(u));c.forEach(u=>e.delete(u.id));let h=Array.from(e.values());bn.end.forEach(u=>u(c,h))}),hn.addEventListener("touchcancel",()=>{e.clear(),bn.cancel.forEach(l=>l([]))});let n=-1;hn.addEventListener("mousedown",l=>{if(n>=0)return;n=100;let c=Fl(l,n);e.set(c.id,c),bn.start.forEach(h=>h([c]))}),window.addEventListener("mousemove",l=>{if(n<0)return;let c=Fl(l,n);e.set(c.id,c),bn.move.forEach(h=>h(Array.from(e.values())))}),window.addEventListener("mouseup",l=>{if(n<0)return;let c=Fl(l,n);e.delete(c.id),bn.end.forEach(h=>h([c],Array.from(e.values()))),n=-1});let i=new URLSearchParams(window.location.search),r=Number(i.get("dpr")),a=or(s,t,window.devicePixelRatio||1,-1,(o=i.get("q"))!=null?o:void 0,r>0?r:void 0);return rr(a),{canvas:hn,width:s,height:t,dpr:a.dpr,safeTop:0,safeBottom:0,createCanvas(l,c){let h=document.createElement("canvas");return h.width=l,h.height=c,h},raf:l=>window.requestAnimationFrame(l),cancelRaf:l=>window.cancelAnimationFrame(l),now:()=>performance.now(),createAudioContext(){var c;let l=(c=window.AudioContext)!=null?c:window.webkitAudioContext;return l?new l:null},onTouchStart(l){bn.start.push(l)},onTouchMove(l){bn.move.push(l)},onTouchEnd(l){bn.end.push(l)},onTouchCancel(l){bn.cancel.push(l)},vibrateShort(){var l;(l=navigator.vibrate)==null||l.call(navigator,10)},getLaunchQuery(){let l={};return new URLSearchParams(window.location.search).forEach((c,h)=>{l[h]=c}),l},getNickName(l){l(this.getLaunchQuery().nick||"\u73A9\u5BB6")},shareAppMessage(l,c){var u;let h=`${window.location.origin}${window.location.pathname}?${c}`;(u=navigator.clipboard)==null||u.writeText(h).catch(()=>{}),console.log("[share-sim]",l,h)},showModal(l,c){window.alert(`${l}
${c}`)},restartApp(){window.location.reload()}}}var Fl,hn,bn,Ol,Uu=nr(()=>{"use strict";Yn();Fl=(s,t)=>{let e=hn.getBoundingClientRect();return{id:t,x:s.clientX-e.left,y:s.clientY-e.top}};bn={start:[],move:[],end:[],cancel:[]},Ol=s=>{let t=hn.getBoundingClientRect();return{id:s.identifier,x:s.clientX-t.left,y:s.clientY-t.top}}});Ya();var lr=class{constructor(t){this.createContext=t;this.ctx=null;this.master=null;this.sfx=null;this.music=null;this.noise=null;this.nextBeat=0;this.beat=0;this.bgmRunning=!1;this.muted=!1}unlock(){try{if(!this.ctx){let t=this.createContext?this.createContext():(()=>{var a;let r=(a=window.AudioContext)!=null?a:window.webkitAudioContext;return r?new r:null})();if(!t||typeof t.createGain!="function")return;this.ctx=t,this.master=t.createGain(),this.master.gain.value=this.muted?0:.85,this.master.connect(t.destination),this.sfx=t.createGain(),this.sfx.gain.value=.9,this.sfx.connect(this.master),this.music=t.createGain(),this.music.gain.value=.5,this.music.connect(this.master);let e=Math.floor(t.sampleRate*.3),n=t.createBuffer(1,e,t.sampleRate),i=n.getChannelData(0);for(let r=0;r<e;r++)i[r]=Math.random()*2-1;this.noise=n}if(this.ctx.state==="suspended"){let t=this.ctx.resume();t&&typeof t.catch=="function"&&t.catch(()=>{})}}catch(t){this.ctx=null,this.master=null,this.sfx=null,this.music=null,this.noise=null,this.bgmRunning=!1}}get isMuted(){return this.muted}toggleMute(){return this.muted=!this.muted,this.ctx&&this.master&&this.master.gain.setTargetAtTime(this.muted?0:.85,this.ctx.currentTime,.04),this.muted}startBgm(){if(this.ctx&&!this.bgmRunning){this.bgmRunning=!0;try{this.nextBeat=this.ctx.currentTime+.2}catch(t){this.bgmRunning=!1}}}stopBgm(){this.bgmRunning=!1}tone(t){var i,r,a;let e=this.ctx,n=this.sfx;if(!(!e||!n))try{let o=e.currentTime+((i=t.delay)!=null?i:0),l=e.createOscillator(),c=e.createGain();l.type=(r=t.type)!=null?r:"sine",l.frequency.setValueAtTime(Math.max(20,t.freq),o),t.to&&l.frequency.exponentialRampToValueAtTime(Math.max(20,t.to),o+t.dur),c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(Math.max(.001,(a=t.gain)!=null?a:.2),o+.012),c.gain.exponentialRampToValueAtTime(1e-4,o+t.dur),l.connect(c).connect(n),l.start(o),l.stop(o+t.dur+.03)}catch(o){}}noiseBurst(t){var i,r,a,o;let e=this.ctx,n=this.sfx;if(!(!e||!n||!this.noise))try{let l=e.currentTime+((i=t.delay)!=null?i:0),c=e.createBufferSource();c.buffer=this.noise;let h=e.createBiquadFilter();h.type=(r=t.type)!=null?r:"bandpass",h.frequency.value=t.freq,h.Q.value=(a=t.q)!=null?a:.9;let u=e.createGain();u.gain.setValueAtTime(Math.max(.001,(o=t.gain)!=null?o:.2),l),u.gain.exponentialRampToValueAtTime(1e-4,l+t.dur),c.connect(h).connect(u).connect(n),c.start(l),c.stop(l+t.dur+.02)}catch(l){}}hit(t,e){let n=Math.min(1,Math.max(0,t/100));this.tone({freq:e?165:220,to:e?62:130,dur:e?.22:.14,type:"sine",gain:e?.4:.3}),this.noiseBurst({freq:800+n*1500,dur:.09,gain:e?.26:.18}),this.tone({freq:480+n*620,dur:.09,type:"triangle",gain:.12+n*.08,delay:.005})}jump(){this.tone({freq:320,to:520,dur:.11,type:"sine",gain:.09})}swing(){this.noiseBurst({freq:1100,q:.7,dur:.12,gain:.1})}dive(){this.noiseBurst({freq:500,dur:.22,gain:.12,type:"lowpass"})}serve(){this.noiseBurst({freq:1400,q:.6,dur:.18,gain:.18}),this.tone({freq:300,to:700,dur:.16,type:"triangle",gain:.12})}block(){this.tone({freq:180,to:90,dur:.16,type:"square",gain:.16}),this.noiseBurst({freq:320,dur:.14,gain:.2,type:"lowpass"})}net(){this.tone({freq:120,to:70,dur:.2,type:"sine",gain:.18}),this.noiseBurst({freq:260,dur:.16,gain:.1,type:"lowpass"})}land(){this.tone({freq:140,to:60,dur:.24,type:"sine",gain:.3}),this.noiseBurst({freq:420,dur:.2,gain:.18,type:"lowpass"})}tick(){this.tone({freq:660,dur:.09,type:"square",gain:.1})}whistle(){this.tone({freq:1750,dur:.12,type:"square",gain:.08}),this.tone({freq:2050,dur:.14,type:"square",gain:.08,delay:.13})}score(){[523.25,659.25,783.99].forEach((e,n)=>this.tone({freq:e,dur:.2,type:"triangle",gain:.16,delay:n*.075}))}fanfare(){[523.25,659.25,783.99,1046.5].forEach((e,n)=>this.tone({freq:e,dur:.32,type:"triangle",gain:.17,delay:n*.12}))}update(t){let e=this.ctx,n=this.music;if(!(!e||!n||!this.bgmRunning))try{let i=e.currentTime;this.nextBeat<i&&(this.nextBeat=i+.05);let r=0;for(;this.nextBeat<i+.35&&r++<8;)this.scheduleBeat(this.nextBeat,this.beat++),this.nextBeat+=.46;this.nextBeat<i+.35&&(this.nextBeat=i+.4)}catch(i){this.bgmRunning=!1}}scheduleBeat(t,e){let n=this.ctx,i=this.music;if(!n||!i)return;let r=[130.81,174.61,146.83,196],a=r[Math.floor(e/8)%r.length];e%8===0&&[1,1.25,1.5].forEach(d=>{let f=n.createOscillator();f.type="sine",f.frequency.value=a*d*2;let g=n.createGain();g.gain.setValueAtTime(1e-4,t),g.gain.linearRampToValueAtTime(.028,t+1.1),g.gain.linearRampToValueAtTime(1e-4,t+4.2),f.connect(g).connect(i),f.start(t),f.stop(t+4.3)});let o=[0,4,7,12,7,4,2,4],l=o[e%o.length],c=a*4*Math.pow(2,l/12),h=n.createOscillator();h.type="triangle",h.frequency.value=c;let u=n.createGain();u.gain.setValueAtTime(1e-4,t),u.gain.exponentialRampToValueAtTime(.018,t+.02),u.gain.exponentialRampToValueAtTime(1e-4,t+.5),h.connect(u).connect(i),h.start(t),h.stop(t+.55)}};var Ni="cloud1-d6gnrnrmt9643a949";function an(){return{moveX:0,moveZ:0,sprint:!1,jump:!1,hit:!1,hitHeld:!1,block:!1,blockHeld:!1,spike:!1,setup:!1}}var he=s=>Math.round(s*1e3)/1e3,ic=["announce","tick","serve","hit","block","net","jump","dive","swing","land","score","setEnd","matchEnd"];function sc(s,t,e){let n=s.ball;return{q:t,ph:s.phase,pt:he(s.phaseTimer),s:[s.scores[0],s.scores[1]],sw:[s.setsWon[0],s.setsWon[1]],si:s.setIndex,sv:s.serverId,stn:s.servingTeam,tc:[s.touches[0],s.touches[1]],ck:he(s.clock),sl:he(s.slowmoTimer),tu:s.timeUp?1:0,sd:s.suddenDeath?1:0,se:he(s.serveElapsed),ti:he(s.time),mw:s.matchWinner,b:{p:[he(n.pos.x),he(n.pos.y),he(n.pos.z)],v:[he(n.vel.x),he(n.vel.y),he(n.vel.z)],l:n.live?1:0,d:n.dead?1:0,h:n.heldBy,ht:n.lastHitTeam,hi:n.lastHitterId},ps:s.players.map(i=>({p:[he(i.pos.x),he(i.pos.y),he(i.pos.z)],v:[he(i.vel.x),he(i.vel.y),he(i.vel.z)],f:he(i.facing),g:i.grounded?1:0,m:i.moving?1:0,b:i.blocking?1:0,spt:he(i.sprintTimer),st:he(i.stun),c:he(i.charge),sa:he(i.serveAim),a:i.anim,at:he(i.animTimer),pt:i.stats.points})),ev:e}}var cr=class{constructor(t){this.world=t;this.alpha=1;this.prev=null;this.curr=null;this.tPrev=0;this.tCurr=0}apply(t,e){var i;this.prev=this.curr,this.tPrev=this.tCurr,this.curr=t,this.tCurr=e,this.prev||(this.prev=t,this.tPrev=e);let n=(i=t.ev)!=null?i:[];for(let[r,a]of n)this.world.events.emit(r,a)}update(t){var o;let e=this.curr;if(!e||!this.prev)return;let n=Math.max(30,this.tCurr-this.tPrev);this.alpha=Math.min(1,Math.max(0,(t-this.tCurr)/n));let i=this.world,r=this.prev;i.phase=e.ph,i.phaseTimer=e.pt,i.scores[0]=e.s[0],i.scores[1]=e.s[1],i.setsWon[0]=e.sw[0],i.setsWon[1]=e.sw[1],i.setIndex=e.si,i.serverId=e.sv,i.servingTeam=e.stn,i.touches[0]=e.tc[0],i.touches[1]=e.tc[1],i.clock=e.ck,i.slowmoTimer=e.sl,i.timeUp=e.tu===1,i.suddenDeath=e.sd===1,i.serveElapsed=e.se,i.time=e.ti,i.matchWinner=e.mw;let a=i.ball;a.pos.x=e.b.p[0],a.pos.y=e.b.p[1],a.pos.z=e.b.p[2],a.prev.x=r.b.p[0],a.prev.y=r.b.p[1],a.prev.z=r.b.p[2],a.vel.x=e.b.v[0],a.vel.y=e.b.v[1],a.vel.z=e.b.v[2],a.live=e.b.l===1,a.dead=e.b.d===1,a.heldBy=e.b.h,a.lastHitTeam=e.b.ht,a.lastHitterId=e.b.hi;for(let l=0;l<e.ps.length&&l<i.players.length;l++){let c=e.ps[l],h=(o=r.ps[l])!=null?o:c,u=i.players[l];u.pos.x=c.p[0],u.pos.y=c.p[1],u.pos.z=c.p[2],u.prev.x=h.p[0],u.prev.y=h.p[1],u.prev.z=h.p[2],u.vel.x=c.v[0],u.vel.y=c.v[1],u.vel.z=c.v[2],u.facing=c.f,u.grounded=c.g===1,u.moving=c.m===1,u.blocking=c.b===1,u.sprintTimer=c.spt,u.stun=c.st,u.charge=c.c,u.serveAim=c.sa,u.anim=c.a,u.animTimer=c.at,u.stats.points=c.pt}}},hr=class{constructor(){this.latest=an();this.lastAt=0}push(t,e){this.latest=t,this.lastAt=e}take(t){if(t-this.lastAt>1500)return this.latest=an(),an();let e={...this.latest};return this.latest.hit=!1,this.latest.jump=!1,this.latest.block=!1,this.latest.spike=!1,this.latest.setup=!1,e}};var ki=()=>globalThis.wx;function ac(){let s=ki();return!!(s&&s.cloud)}var rc=!1;function $a(s){let t=ki();return!t||!t.cloud||!s?!1:(rc||(t.cloud.init({env:s,traceUser:!0}),rc=!0),!0)}var ur=class{constructor(t,e){this.onEvent=t;this.roomId=null;this.pid=0;this.snapHz=8;this.watchers=[];this.inputAgg=null;this.inputTimer=null;this.staleTimer=null;this.lastInputAt=0;this.lastSnapAt=0;this.peerGone=!1;this.matchApplied=!1;this.snapQ=null;if(!$a(e))throw new Error("cloud-unavailable")}createRoom(t){this.callFn("createRoom",{name:t}).then(e=>{let n=e;this.roomId=String(n.roomId),this.pid=n.pid,this.matchApplied=!1,this.emitRoom([{pid:0,name:t}]),this.watchRoomDoc(),this.startTimers()}).catch(e=>this.fail(e))}joinRoom(t,e,n=!1){this.roomId=t,this.matchApplied=!1,this.closeWatchers(),this.callFn("joinRoom",{roomId:t,name:e,resume:n}).then(i=>{var a;let r=i;this.pid=r.pid,this.emitRoom((a=r.players)!=null?a:[]),this.watchRoomDoc(),this.pid===1?this.watchLiveDoc():this.watchInputDoc(),this.startTimers()}).catch(i=>this.fail(i))}sendStart(t){this.callFn("startMatch",{roomId:this.roomId,skill:t,seed:Date.now()%2147483647}).catch(e=>this.fail(e))}sendSnap(t){this.updateDoc("rooms_live",{q:t.q,s:JSON.stringify(t),updatedAt:Date.now()})}sendInput(t){let e=this.inputAgg===null||t.hit||t.jump||t.block||t.spike||t.setup;if(this.inputAgg===null)this.inputAgg={...t};else{let n=this.inputAgg;n.hit=n.hit||t.hit,n.jump=n.jump||t.jump,n.block=n.block||t.block,n.spike=n.spike||t.spike,n.setup=n.setup||t.setup,n.sprint=t.sprint,n.hitHeld=t.hitHeld,n.blockHeld=t.blockHeld,n.moveX=t.moveX,n.moveZ=t.moveZ}e&&this.flushInput()}sendAgain(){this.updateDoc("rooms_inputs",{d:"",at:Date.now(),again:!0})}settle(t){this.callFn("settleMatch",{roomId:this.roomId,...t}).catch(()=>{})}leave(){this.callFn("markDisconnect",{roomId:this.roomId}).catch(()=>{}).then(()=>this.cleanup())}callFn(t,e){try{let n=ki();return Promise.resolve(n.cloud.callFunction({name:t,data:{...e,pid:this.pid}}).then(i=>i.result))}catch(n){return Promise.reject(n)}}updateDoc(t,e){try{ki().cloud.database().collection(t).doc(String(this.roomId)).update({data:{...e,updatedAt:Date.now()}})}catch(n){}}flushInput(){let t=this.inputAgg;if(this.inputAgg=null,!(!t||this.roomId===null))try{ki().cloud.database().collection("rooms_inputs").doc(`${this.roomId}-${this.pid}`).update({data:{d:JSON.stringify(t),at:Date.now()}})}catch(e){}}watch(t,e,n){try{let r=ki().cloud.database().collection(t).doc(e).watch({onChange:a=>{var l;let o=(l=a==null?void 0:a.docs)==null?void 0:l[0];o&&n(o)},onError:()=>{this.onEvent({t:"down"})}});this.watchers.push(r)}catch(i){this.onEvent({t:"down"})}}watchRoomDoc(){this.watch("rooms",String(this.roomId),t=>this.onRoomDoc(t))}watchLiveDoc(){this.watch("rooms_live",String(this.roomId),t=>{var n,i,r;let e=String((n=t.s)!=null?n:"");if(e){this.lastSnapAt=Date.now();try{let a=JSON.parse(e),o=(i=a.q)!=null?i:-1;o>((r=this.snapQ)!=null?r:-1)&&(this.snapQ=o,this.onEvent({t:"snap",d:a}))}catch(a){}}})}watchInputDoc(){this.watch("rooms_inputs",`${this.roomId}-1`,t=>{var i,r;let e=Number((i=t.at)!=null?i:0);if(e&&(this.lastInputAt=e),this.peerGone&&(this.peerGone=!1,this.onEvent({t:"peerBack"})),t.again){this.onEvent({t:"againReq"});return}let n=String((r=t.d)!=null?r:"");if(n)try{this.onEvent({t:"input",d:JSON.parse(n)})}catch(a){}})}onRoomDoc(t){var o,l,c;let e=(o=t.members)!=null?o:[],n=(l=t.names)!=null?l:[],i=[];for(let h=0;h<e.length;h++)e[h]&&i.push({pid:h,name:n[h]||"\u73A9\u5BB6"});this.onEvent({t:"players",players:i});let r=String((c=t.state)!=null?c:""),a=t.matchCfg;r==="playing"&&a&&!this.matchApplied?(this.matchApplied=!0,this.lastSnapAt=Date.now(),this.lastInputAt=Date.now(),this.snapQ=null,this.onEvent({t:"start",cfg:a})):r==="result"&&(this.matchApplied=!1),this.pid===0&&r==="playing"&&t.guestAlive===!1&&!this.peerGone&&(this.peerGone=!0,this.onEvent({t:"peerLeft",reason:"exit"})),this.pid===1&&r==="closed"&&this.onEvent({t:"peerLeft",reason:"exit"})}emitRoom(t){this.onEvent({t:"room",roomId:String(this.roomId),pid:this.pid,players:t})}startTimers(){this.inputTimer===null&&(this.inputTimer=setInterval(()=>this.flushInput(),100)),this.staleTimer===null&&(this.lastSnapAt=Date.now(),this.lastInputAt=Date.now(),this.staleTimer=setInterval(()=>{let t=Date.now();this.pid===1&&t-this.lastSnapAt>8e3&&(this.lastSnapAt=t,this.onEvent({t:"down"})),this.pid===0&&!this.peerGone&&t-this.lastInputAt>6e3&&(this.peerGone=!0,this.onEvent({t:"peerLeft",reason:"disconnect"}))},2e3))}fail(t){let e=t instanceof Error?t.message:"\u4E91\u670D\u52A1\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";this.onEvent({t:"error",code:"cloud",msg:e}),this.onEvent({t:"down"})}cleanup(){this.closeWatchers(),this.inputTimer!==null&&clearInterval(this.inputTimer),this.staleTimer!==null&&clearInterval(this.staleTimer),this.inputTimer=null,this.staleTimer=null,this.roomId=null}closeWatchers(){for(let t of this.watchers)try{t.close()}catch(e){}this.watchers=[]}};var Za=class{constructor(t){this.openCb=()=>{};this.msgCb=()=>{};this.closeCb=()=>{};this.closed=!1;this.ws=new WebSocket(t),this.ws.onopen=()=>this.openCb(),this.ws.onmessage=e=>this.msgCb(String(e.data)),this.ws.onclose=()=>{this.closed||(this.closed=!0,this.closeCb())},this.ws.onerror=()=>{}}send(t){this.ws.readyState===WebSocket.OPEN&&this.ws.send(t)}close(){this.closed=!0;try{this.ws.close()}catch(t){}}onOpen(t){this.openCb=t}onMessage(t){this.msgCb=t}onClose(t){this.closeCb=t}onError(t){let e=this.closeCb;this.ws.onerror=()=>{t(),e()}}},Ja=class{constructor(t){let e=globalThis;this.task=e.wx.connectSocket({url:t})}send(t){try{this.task.send({data:t})}catch(e){}}close(){try{this.task.close({})}catch(t){}}onOpen(t){this.task.onOpen(()=>t())}onMessage(t){this.task.onMessage(e=>t(String(e==null?void 0:e.data)))}onClose(t){let e=!1;this.task.onClose(()=>{e||(e=!0,t())})}onError(t){this.task.onError(()=>t())}};function oc(s){let t=globalThis;return t.wx&&typeof t.wx.connectSocket=="function"?new Ja(s):new Za(s)}var lc="ws://localhost:7788",Ju=15,Ku=2500,ju=12e3,dr=class{constructor(t,e){this.onEvent=t;this.url=e;this.roomId=null;this.pid=0;this.snapHz=Ju;this.tx=null;this.hello=null;this.lastMsgAt=0;this.watchdog=null;this.suppressDown=!1}createRoom(t){this.hello={t:"create",name:t},this.roomId=null,this.connect()}joinRoom(t,e,n=!1){t&&(this.roomId=t,this.hello={t:"join",roomId:t,name:e,resume:n},this.connect())}sendStart(t){this.send({t:"start",skill:t,seed:Date.now()%2147483647})}sendInput(t){this.send({t:"in",d:t})}sendSnap(t){this.send({t:"snap",d:t})}sendAgain(){this.send({t:"again"})}leave(){var t;this.suppressDown=!0,this.send({t:"cancel"}),(t=this.tx)==null||t.close(),this.stopWatchdog(),this.roomId=null,this.hello=null}connect(){var n;this.stopWatchdog(),this.suppressDown=!1,(n=this.tx)==null||n.close();let t=oc(this.url);this.tx=t;let e=!1;t.onOpen(()=>{this.lastMsgAt=Date.now(),this.hello&&t.send(JSON.stringify(this.hello))}),t.onMessage(i=>{this.lastMsgAt=Date.now(),this.handle(i)}),t.onError(()=>{}),t.onClose(()=>{e||(e=!0,this.stopWatchdog(),this.suppressDown||this.onEvent({t:"down"}))}),this.lastMsgAt=Date.now(),this.watchdog=setInterval(()=>{if(Date.now()-this.lastMsgAt>ju){this.suppressDown=!1,t.close();return}this.send({t:"ping"})},Ku)}handle(t){var n,i,r,a;let e;try{e=JSON.parse(t)}catch(o){return}switch(e.t){case"room":this.roomId=String(e.roomId),this.pid=(n=e.pid)!=null?n:0,this.onEvent({t:"room",roomId:this.roomId,pid:this.pid,players:(i=e.players)!=null?i:[]});break;case"players":this.onEvent({t:"players",players:(r=e.players)!=null?r:[]});break;case"start":this.onEvent({t:"start",cfg:e.cfg});break;case"snap":this.onEvent({t:"snap",d:e.d});break;case"input":this.onEvent({t:"input",d:e.d});break;case"peerLeft":this.onEvent({t:"peerLeft",reason:String((a=e.reason)!=null?a:"")});break;case"peerBack":this.onEvent({t:"peerBack"});break;case"againReq":this.onEvent({t:"againReq"});break;case"error":this.onEvent({t:"error",code:String(e.code),msg:String(e.msg)});break;case"pong":case"ping":break;default:break}}send(t){var e;try{(e=this.tx)==null||e.send(JSON.stringify(t))}catch(n){}}stopWatchdog(){this.watchdog!==null&&(clearInterval(this.watchdog),this.watchdog=null)}};var Ka=globalThis;function Qu(){var s;try{if(typeof location!="undefined"&&location.search&&/[?&]debug=1/.test(location.search))return!0}catch(t){}try{let t=globalThis.wx,e=(s=t==null?void 0:t.getLaunchOptionsSync)==null?void 0:s.call(t).query;if(e&&(e.debug==="1"||e.debug==="true"))return!0}catch(t){}return Ka.__PAIQIU_DEBUG__===1||Ka.__PAIQIU_DEBUG__===!0}var Ss=Qu();function cc(s){Ss=s}var fr=()=>{try{if(typeof performance!="undefined"&&typeof performance.now=="function")return performance.now()}catch(s){}return Date.now()},pr=fr(),ja=pr,mi=[],gi=[],hc=200;function ge(s,t){let e=fr(),n={name:s,at:Math.round((e-pr)*10)/10,dt:Math.round((e-ja)*10)/10,extra:t};return ja=e,mi.push(n),mi.length>hc&&mi.shift(),Ss&&console.log(`[paiqiu] ${s} +${n.dt}ms (t=${n.at}ms)${t?" \xB7 "+t:""}`),n.dt}function un(s,t){let e=fr(),n={name:s,at:Math.round((e-pr)*10)/10,dt:Math.round((e-ja)*10)/10,extra:t};mi.push(n),mi.length>hc&&mi.shift(),Ss&&console.log(`[paiqiu] ${s} +${n.dt}ms${t?" \xB7 "+t:""}`)}function td(s){if(s instanceof Error)return s.message||s.name||"Error";if(typeof s=="string")return s;try{return JSON.stringify(s)}catch(t){return String(s)}}function ed(s){let t=s==null?void 0:s.stack;return typeof t=="string"?t.split(`
`).slice(0,4).join(`
`):""}function ke(s,t){let e={stage:s,message:td(t).slice(0,220),stack:ed(t).slice(0,400),at:Math.round((fr()-pr)*10)/10};return gi.push(e),gi.length>40&&gi.shift(),console.error(`[paiqiu][error] ${s}: ${e.message}`,t),e}function nd(){return gi.length?gi[gi.length-1]:null}var uc={};function dc(s){for(let t of Object.keys(s))uc[t]=s[t]}function fc(){return{marks:mi.slice(),errors:gi.slice(),env:{...uc}}}function id(){let s=fc(),t=`[paiqiu] env ${JSON.stringify(s.env)}`,e=s.marks.map(i=>`  ${i.name} +${i.dt}ms @${i.at}ms${i.extra?" "+i.extra:""}`),n=s.errors.map(i=>`  ! ${i.stage}: ${i.message}`);return[t,...e,...n.length?["errors:",...n]:[]].join(`
`)}Ka.__paiqiuDiag={dump:fc,dumpText:id,mark:ge,recordError:ke,lastError:nd};Yn();var sd=0,pc=1,rd=2;var Xh=1,ad=2,kn=3,si=0,$e=1,ue=2,ni=0,rs=1,ri=2,mc=3,gc=4,od=5,Ei=100,ld=101,cd=102,vc=103,xc=104,hd=200,ud=201,dd=202,fd=203,ko=204,Bo=205,pd=206,md=207,gd=208,vd=209,xd=210,yd=211,_d=212,bd=213,Md=214,Sd=0,Ed=1,Td=2,Wr=3,wd=4,Ad=5,Rd=6,Cd=7,qh=0,Pd=1,Id=2,xn=0,Ld=1,Dd=2,Ud=3,Nd=4,kd=5,Bd=6,Fd=7;var Yh=300,ls=301,cs=302,Fo=303,Oo=304,xa=306,Tn=1e3,mn=1001,zo=1002,Xe=1003,yc=1004;var Es=1005;var Ie=1006,Qa=1007;var wi=1008;var ii=1009,Od=1010,zd=1011,wl=1012,$h=1013,ei=1014,Fn=1015,Bs=1016,Zh=1017,Jh=1018,Ri=1020,Hd=1021,gn=1023,Gd=1024,Vd=1025,Ci=1026,hs=1027,Wd=1028,Kh=1029,Xd=1030,jh=1031,Qh=1033,to=33776,eo=33777,no=33778,io=33779,_c=35840,bc=35841,Mc=35842,Sc=35843,tu=36196,Ec=37492,Tc=37496,wc=37808,Ac=37809,Rc=37810,Cc=37811,Pc=37812,Ic=37813,Lc=37814,Dc=37815,Uc=37816,Nc=37817,kc=37818,Bc=37819,Fc=37820,Oc=37821,so=36492,zc=36494,Hc=36495,qd=36283,Gc=36284,Vc=36285,Wc=36286;var Xr=2300,qr=2301,ro=2302,Xc=2400,qc=2401,Yc=2402;var Yd=3200,$d=3201,Zd=0,Jd=1,ti="",Qt="srgb",hi="srgb-linear",Al="display-p3",ya="display-p3-linear",Yr="linear",se="srgb",$r="rec709",Zr="p3";var Bi=7680;var $c=519,Kd=512,jd=513,Qd=514,eu=515,tf=516,ef=517,nf=518,sf=519,Ho=35044;var Zc="300 es",Go=1035,On=2e3,Jr=2001,ai=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jc=1234567,Ls=Math.PI/180,Fs=180/Math.PI;function zn(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[s&255]+Be[s>>8&255]+Be[s>>16&255]+Be[s>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function Re(s,t,e){return Math.max(t,Math.min(e,s))}function Rl(s,t){return(s%t+t)%t}function rf(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function af(s,t,e){return s!==t?(e-s)/(t-s):0}function Ds(s,t,e){return(1-e)*s+e*t}function of(s,t,e,n){return Ds(s,t,1-Math.exp(-e*n))}function lf(s,t=1){return t-Math.abs(Rl(s,t*2)-t)}function cf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function hf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function uf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function df(s,t){return s+Math.random()*(t-s)}function ff(s){return s*(.5-Math.random())}function pf(s){s!==void 0&&(Jc=s);let t=Jc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function mf(s){return s*Ls}function gf(s){return s*Fs}function Vo(s){return(s&s-1)===0&&s!==0}function vf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Kr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function xf(s,t,e,n,i){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function vn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Kt(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var tn={DEG2RAD:Ls,RAD2DEG:Fs,generateUUID:zn,clamp:Re,euclideanModulo:Rl,mapLinear:rf,inverseLerp:af,lerp:Ds,damp:of,pingpong:lf,smoothstep:cf,smootherstep:hf,randInt:uf,randFloat:df,randFloatSpread:ff,seededRandom:pf,degToRad:mf,radToDeg:gf,isPowerOfTwo:Vo,ceilPowerOfTwo:vf,floorPowerOfTwo:Kr,setQuaternionFromProperEuler:xf,normalize:Kt,denormalize:vn},ct=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Bt=class s{constructor(t,e,n,i,r,a,o,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],M=i[1],x=i[4],w=i[7],R=i[2],E=i[5],A=i[8];return r[0]=a*v+o*M+l*R,r[3]=a*m+o*x+l*E,r[6]=a*p+o*w+l*A,r[1]=c*v+h*M+u*R,r[4]=c*m+h*x+u*E,r[7]=c*p+h*w+u*A,r[2]=d*v+f*M+g*R,r[5]=d*m+f*x+g*E,r[8]=d*p+f*w+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ao.makeScale(t,e)),this}rotate(t){return this.premultiply(ao.makeRotation(-t)),this}translate(t,e){return this.premultiply(ao.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ao=new Bt;function nu(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function jr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function yf(){let s=jr("canvas");return s.style.display="block",s}var Kc={};function iu(s){s in Kc||(Kc[s]=!0,console.warn(s))}var jc=new Bt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Qc=new Bt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),mr={[hi]:{transfer:Yr,primaries:$r,toReference:s=>s,fromReference:s=>s},[Qt]:{transfer:se,primaries:$r,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ya]:{transfer:Yr,primaries:Zr,toReference:s=>s.applyMatrix3(Qc),fromReference:s=>s.applyMatrix3(jc)},[Al]:{transfer:se,primaries:Zr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Qc),fromReference:s=>s.applyMatrix3(jc).convertLinearToSRGB()}},_f=new Set([hi,ya]),jt={enabled:!0,_workingColorSpace:hi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!_f.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;let n=mr[t].toReference,i=mr[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return mr[s].primaries},getTransfer:function(s){return s===ti?Yr:mr[s].transfer}};function as(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function oo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Fi,Qr=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Fi===void 0&&(Fi=jr("canvas")),Fi.width=t.width,Fi.height=t.height;let n=Fi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Fi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=jr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=as(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(as(e[n]/255)*255):e[n]=as(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},bf=0,ta=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=zn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(lo(i[a].image)):r.push(lo(i[a]))}else r=lo(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function lo(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?Qr.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Mf=0,Qe=class s extends ai{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=mn,i=mn,r=Ie,a=wi,o=gn,l=ii,c=s.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=zn(),this.name="",this.source=new ta(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Tn:t.x=t.x-Math.floor(t.x);break;case mn:t.x=t.x<0?0:1;break;case zo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Tn:t.y=t.y-Math.floor(t.y);break;case mn:t.y=t.y<0?0:1;break;case zo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}};Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=Yh;Qe.DEFAULT_ANISOTROPY=1;var Le=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,w=(f+1)/2,R=(p+1)/2,E=(h+d)/4,A=(u+v)/4,U=(g+m)/4;return x>w&&x>R?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=E/n,r=A/n):w>R?w<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(w),n=E/i,r=U/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=A/r,i=U/r),this.set(n,i,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wo=class extends ai{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ie,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);let r=new Qe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ta(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Hn=class extends Wo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ea=class extends Qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xo=class extends Qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var oi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-o,p=l*d+c*f+h*g+u*v,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let R=Math.sqrt(x),E=Math.atan2(R,p*M);m=Math.sin(m*E)/R,o=Math.sin(o*E)/R}let w=o*M;if(l=l*m+d*w,c=c*m+f*w,h=h*m+g*w,u=u*m+v*w,m===1-o){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Re(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(th.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return co.copy(this).projectOnVector(t),this.sub(co)}reflect(t){return this.sub(co.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},co=new P,th=new oi,Pi=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ts),vr.subVectors(this.max,Ts),Oi.subVectors(t.a,Ts),zi.subVectors(t.b,Ts),Hi.subVectors(t.c,Ts),$n.subVectors(zi,Oi),Zn.subVectors(Hi,zi),vi.subVectors(Oi,Hi);let e=[0,-$n.z,$n.y,0,-Zn.z,Zn.y,0,-vi.z,vi.y,$n.z,0,-$n.x,Zn.z,0,-Zn.x,vi.z,0,-vi.x,-$n.y,$n.x,0,-Zn.y,Zn.x,0,-vi.y,vi.x,0];return!ho(e,Oi,zi,Hi,vr)||(e=[1,0,0,0,1,0,0,0,1],!ho(e,Oi,zi,Hi,vr))?!1:(xr.crossVectors($n,Zn),e=[xr.x,xr.y,xr.z],ho(e,Oi,zi,Hi,vr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},In=[new P,new P,new P,new P,new P,new P,new P,new P],dn=new P,gr=new Pi,Oi=new P,zi=new P,Hi=new P,$n=new P,Zn=new P,vi=new P,Ts=new P,vr=new P,xr=new P,xi=new P;function ho(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){xi.fromArray(s,r);let o=i.x*Math.abs(xi.x)+i.y*Math.abs(xi.y)+i.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Sf=new Pi,ws=new P,uo=new P,Ii=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Sf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ws.subVectors(t,this.center);let e=ws.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ws,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(uo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ws.copy(t.center).add(uo)),this.expandByPoint(ws.copy(t.center).sub(uo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ln=new P,fo=new P,yr=new P,Jn=new P,po=new P,_r=new P,mo=new P,Os=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){fo.copy(t).add(e).multiplyScalar(.5),yr.copy(e).sub(t).normalize(),Jn.copy(this.origin).sub(fo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(yr),o=Jn.dot(this.direction),l=-Jn.dot(yr),c=Jn.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(fo).addScaledVector(yr,d),f}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);let n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,n,i,r){po.subVectors(e,t),_r.subVectors(n,t),mo.crossVectors(po,_r);let a=this.direction.dot(mo),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Jn.subVectors(this.origin,t);let l=o*this.direction.dot(_r.crossVectors(Jn,_r));if(l<0)return null;let c=o*this.direction.dot(po.cross(Jn));if(c<0||l+c>a)return null;let h=-o*Jn.dot(mo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},de=class s{constructor(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m)}set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Gi.setFromMatrixColumn(t,0).length(),r=1/Gi.setFromMatrixColumn(t,1).length(),a=1/Gi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){let d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ef,t,Tf)}lookAt(t,e,n){let i=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Kn.crossVectors(n,Ke),Kn.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Kn.crossVectors(n,Ke)),Kn.normalize(),br.crossVectors(Ke,Kn),i[0]=Kn.x,i[4]=br.x,i[8]=Ke.x,i[1]=Kn.y,i[5]=br.y,i[9]=Ke.y,i[2]=Kn.z,i[6]=br.z,i[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],M=n[3],x=n[7],w=n[11],R=n[15],E=i[0],A=i[4],U=i[8],L=i[12],y=i[1],S=i[5],V=i[9],W=i[13],C=i[2],X=i[6],z=i[10],Z=i[14],q=i[3],Y=i[7],tt=i[11],it=i[15];return r[0]=a*E+o*y+l*C+c*q,r[4]=a*A+o*S+l*X+c*Y,r[8]=a*U+o*V+l*z+c*tt,r[12]=a*L+o*W+l*Z+c*it,r[1]=h*E+u*y+d*C+f*q,r[5]=h*A+u*S+d*X+f*Y,r[9]=h*U+u*V+d*z+f*tt,r[13]=h*L+u*W+d*Z+f*it,r[2]=g*E+v*y+m*C+p*q,r[6]=g*A+v*S+m*X+p*Y,r[10]=g*U+v*V+m*z+p*tt,r[14]=g*L+v*W+m*Z+p*it,r[3]=M*E+x*y+w*C+R*q,r[7]=M*A+x*S+w*X+R*Y,r[11]=M*U+x*V+w*z+R*tt,r[15]=M*L+x*W+w*Z+R*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+v*(+e*l*f-e*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+m*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],M=u*m*c-v*d*c+v*l*f-o*m*f-u*l*p+o*d*p,x=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,w=h*v*c-g*u*c+g*o*f-a*v*f-h*o*p+a*u*p,R=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,E=e*M+n*x+i*w+r*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return t[0]=M*A,t[1]=(v*d*r-u*m*r-v*i*f+n*m*f+u*i*p-n*d*p)*A,t[2]=(o*m*r-v*l*r+v*i*c-n*m*c-o*i*p+n*l*p)*A,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*A,t[4]=x*A,t[5]=(h*m*r-g*d*r+g*i*f-e*m*f-h*i*p+e*d*p)*A,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*A,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*f+e*l*f)*A,t[8]=w*A,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*A,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*p+e*o*p)*A,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*A,t[12]=R*A,t[13]=(h*v*i-g*u*i+g*n*d-e*v*d-h*n*m+e*u*m)*A,t[14]=(g*o*i-a*v*i-g*n*l+e*v*l+a*n*m-e*o*m)*A,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*A,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,v=a*h,m=a*u,p=o*u,M=l*c,x=l*h,w=l*u,R=n.x,E=n.y,A=n.z;return i[0]=(1-(v+p))*R,i[1]=(f+w)*R,i[2]=(g-x)*R,i[3]=0,i[4]=(f-w)*E,i[5]=(1-(d+p))*E,i[6]=(m+M)*E,i[7]=0,i[8]=(g+x)*A,i[9]=(m-M)*A,i[10]=(1-(d+v))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Gi.set(i[0],i[1],i[2]).length(),a=Gi.set(i[4],i[5],i[6]).length(),o=Gi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],fn.copy(this);let c=1/r,h=1/a,u=1/o;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=u,fn.elements[9]*=u,fn.elements[10]*=u,e.setFromRotationMatrix(fn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=On){let l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),f,g;if(o===On)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Jr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=On){let l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-r),d=(e+t)*c,f=(n+i)*h,g,v;if(o===On)g=(a+r)*u,v=-2*u;else if(o===Jr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Gi=new P,fn=new de,Ef=new P(0,0,0),Tf=new P(1,1,1),Kn=new P,br=new P,Ke=new P,eh=new de,nh=new oi,Gn=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Re(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Re(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return eh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(eh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return nh.setFromEuler(this),this.setFromQuaternion(nh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gn.DEFAULT_ORDER="XYZ";var na=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},wf=0,ih=new P,Vi=new oi,Dn=new de,Mr=new P,As=new P,Af=new P,Rf=new oi,sh=new P(1,0,0),rh=new P(0,1,0),ah=new P(0,0,1),Cf={type:"added"},Pf={type:"removed"},go={type:"childadded",child:null},vo={type:"childremoved",child:null},Ze=class s extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new P,e=new Gn,n=new oi,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new de},normalMatrix:{value:new Bt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vi.setFromAxisAngle(t,e),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(t,e){return Vi.setFromAxisAngle(t,e),this.quaternion.premultiply(Vi),this}rotateX(t){return this.rotateOnAxis(sh,t)}rotateY(t){return this.rotateOnAxis(rh,t)}rotateZ(t){return this.rotateOnAxis(ah,t)}translateOnAxis(t,e){return ih.copy(t).applyQuaternion(this.quaternion),this.position.add(ih.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sh,t)}translateY(t){return this.translateOnAxis(rh,t)}translateZ(t){return this.translateOnAxis(ah,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Mr.copy(t):Mr.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(As,Mr,this.up):Dn.lookAt(Mr,As,this.up),this.quaternion.setFromRotationMatrix(Dn),i&&(Dn.extractRotation(i.matrixWorld),Vi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Vi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Cf),go.child=t,this.dispatchEvent(go),go.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Pf),vo.child=t,this.dispatchEvent(vo),vo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,t,Af),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,Rf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++){let o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Ze.DEFAULT_UP=new P(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=new P,Un=new P,xo=new P,Nn=new P,Wi=new P,Xi=new P,oh=new P,yo=new P,_o=new P,bo=new P,Ai=class s{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),pn.subVectors(t,e),i.cross(pn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){pn.subVectors(i,e),Un.subVectors(n,e),xo.subVectors(t,e);let a=pn.dot(pn),o=pn.dot(Un),l=pn.dot(xo),c=Un.dot(Un),h=Un.dot(xo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Nn.x),l.addScaledVector(a,Nn.y),l.addScaledVector(o,Nn.z),l)}static isFrontFacing(t,e,n,i){return pn.subVectors(n,e),Un.subVectors(t,e),pn.cross(Un).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),pn.cross(Un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;Wi.subVectors(i,n),Xi.subVectors(r,n),yo.subVectors(t,n);let l=Wi.dot(yo),c=Xi.dot(yo);if(l<=0&&c<=0)return e.copy(n);_o.subVectors(t,i);let h=Wi.dot(_o),u=Xi.dot(_o);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Wi,a);bo.subVectors(t,r);let f=Wi.dot(bo),g=Xi.dot(bo);if(g>=0&&f<=g)return e.copy(r);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Xi,o);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return oh.subVectors(r,i),o=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(oh,o);let p=1/(m+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Mo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=Rl(t,1),e=Re(e,0,1),n=Re(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Mo(a,r,t+1/3),this.g=Mo(a,r,t),this.b=Mo(a,r,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qt){let n=su[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}copyLinearToSRGB(t){return this.r=oo(t.r),this.g=oo(t.g),this.b=oo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qt){return jt.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Re(Fe.r*255,0,255))*65536+Math.round(Re(Fe.g*255,0,255))*256+Math.round(Re(Fe.b*255,0,255))}getHexString(t=Qt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Fe.copy(this),e);let n=Fe.r,i=Fe.g,r=Fe.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Qt){jt.fromWorkingColorSpace(Fe.copy(this),t);let e=Fe.r,n=Fe.g,i=Fe.b;return t!==Qt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(Sr);let n=Ds(jn.h,Sr.h,e),i=Ds(jn.s,Sr.s,e),r=Ds(jn.l,Sr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fe=new zt;zt.NAMES=su;var If=0,Vn=class extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=zn(),this.name="",this.type="Material",this.blending=rs,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ko,this.blendDst=Bo,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rs&&(n.blending=this.blending),this.side!==si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ko&&(n.blendSrc=this.blendSrc),this.blendDst!==Bo&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$c&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},It=class extends Vn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=qh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ye=new P,Er=new ct,_e=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return iu("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Er.fromBufferAttribute(this,e),Er.applyMatrix3(t),this.setXY(e,Er.x,Er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array),r=Kt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ho&&(t.usage=this.usage),t}};var ia=class extends _e{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var sa=class extends _e{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var te=class extends _e{constructor(t,e,n){super(new Float32Array(t),e,n)}},Lf=0,on=new de,So=new Ze,qi=new P,je=new Pi,Rs=new Pi,Ae=new P,fe=class s extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nu(t)?sa:ia)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return So.lookAt(t),So.updateMatrix(),this.applyMatrix4(So.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new te(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ii);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Rs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ae.addVectors(je.min,Rs.min),je.expandByPoint(Ae),Ae.addVectors(je.max,Rs.max),je.expandByPoint(Ae)):(je.expandByPoint(Rs.min),je.expandByPoint(Rs.max))}je.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ae.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ae));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ae.fromBufferAttribute(o,c),l&&(qi.fromBufferAttribute(t,c),Ae.add(qi)),i=Math.max(i,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _e(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new P,l[U]=new P;let c=new P,h=new P,u=new P,d=new ct,f=new ct,g=new ct,v=new P,m=new P;function p(U,L,y){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,L),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let S=1/(f.x*g.y-g.x*f.y);isFinite(S)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(S),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(S),o[U].add(v),o[L].add(v),o[y].add(v),l[U].add(m),l[L].add(m),l[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let U=0,L=M.length;U<L;++U){let y=M[U],S=y.start,V=y.count;for(let W=S,C=S+V;W<C;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let x=new P,w=new P,R=new P,E=new P;function A(U){R.fromBufferAttribute(i,U),E.copy(R);let L=o[U];x.copy(L),x.sub(R.multiplyScalar(R.dot(L))).normalize(),w.crossVectors(E,L);let S=w.dot(l[U])<0?-1:1;a.setXYZW(U,x.x,x.y,x.z,S)}for(let U=0,L=M.length;U<L;++U){let y=M[U],S=y.start,V=y.count;for(let W=S,C=S+V;W<C;W+=3)A(t.getX(W+0)),A(t.getX(W+1)),A(t.getX(W+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new _e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new _e(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},lh=new de,yi=new Os,Tr=new Ii,ch=new P,Yi=new P,$i=new P,Zi=new P,Eo=new P,wr=new P,Ar=new ct,Rr=new ct,Cr=new ct,hh=new P,uh=new P,dh=new P,Pr=new P,Ir=new P,rt=class extends Ze{constructor(t=new fe,e=new It){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Eo.fromBufferAttribute(u,t),a?wr.addScaledVector(Eo,h):wr.addScaledVector(Eo.sub(e),h))}e.add(wr)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(r),yi.copy(t.ray).recast(t.near),!(Tr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(Tr,ch)===null||yi.origin.distanceToSquared(ch)>(t.far-t.near)**2))&&(lh.copy(r).invert(),yi.copy(t.ray).applyMatrix4(lh),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,yi)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let w=M,R=x;w<R;w+=3){let E=o.getX(w),A=o.getX(w+1),U=o.getX(w+2);i=Lr(this,p,t,n,c,h,u,E,A,U),i&&(i.faceIndex=Math.floor(w/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let M=o.getX(m),x=o.getX(m+1),w=o.getX(m+2);i=Lr(this,a,t,n,c,h,u,M,x,w),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let w=M,R=x;w<R;w+=3){let E=w,A=w+1,U=w+2;i=Lr(this,p,t,n,c,h,u,E,A,U),i&&(i.faceIndex=Math.floor(w/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let M=m,x=m+1,w=m+2;i=Lr(this,a,t,n,c,h,u,M,x,w),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Df(s,t,e,n,i,r,a,o){let l;if(t.side===$e?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===si,o),l===null)return null;Ir.copy(o),Ir.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Ir);return c<e.near||c>e.far?null:{distance:c,point:Ir.clone(),object:s}}function Lr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Yi),s.getVertexPosition(l,$i),s.getVertexPosition(c,Zi);let h=Df(s,t,e,n,Yi,$i,Zi,Pr);if(h){i&&(Ar.fromBufferAttribute(i,o),Rr.fromBufferAttribute(i,l),Cr.fromBufferAttribute(i,c),h.uv=Ai.getInterpolation(Pr,Yi,$i,Zi,Ar,Rr,Cr,new ct)),r&&(Ar.fromBufferAttribute(r,o),Rr.fromBufferAttribute(r,l),Cr.fromBufferAttribute(r,c),h.uv1=Ai.getInterpolation(Pr,Yi,$i,Zi,Ar,Rr,Cr,new ct)),a&&(hh.fromBufferAttribute(a,o),uh.fromBufferAttribute(a,l),dh.fromBufferAttribute(a,c),h.normal=Ai.getInterpolation(Pr,Yi,$i,Zi,hh,uh,dh,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new P,materialIndex:0};Ai.getNormal(Yi,$i,Zi,u.normal),h.face=u}return h}var Oe=class s extends fe{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new te(c,3)),this.setAttribute("normal",new te(h,3)),this.setAttribute("uv",new te(u,2));function g(v,m,p,M,x,w,R,E,A,U,L){let y=w/A,S=R/U,V=w/2,W=R/2,C=E/2,X=A+1,z=U+1,Z=0,q=0,Y=new P;for(let tt=0;tt<z;tt++){let it=tt*S-W;for(let dt=0;dt<X;dt++){let Lt=dt*y-V;Y[v]=Lt*M,Y[m]=it*x,Y[p]=C,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[m]=0,Y[p]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(dt/A),u.push(1-tt/U),Z+=1}}for(let tt=0;tt<U;tt++)for(let it=0;it<A;it++){let dt=d+it+X*tt,Lt=d+it+X*(tt+1),H=d+(it+1)+X*(tt+1),K=d+(it+1)+X*tt;l.push(dt,Lt,K),l.push(Lt,H,K),q+=6}o.addGroup(f,q,L),f+=q,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function us(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function We(s){let t={};for(let e=0;e<s.length;e++){let n=us(s[e]);for(let i in n)t[i]=n[i]}return t}function Uf(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ru(s){return s.getRenderTarget()===null?s.outputColorSpace:jt.workingColorSpace}var Nf={clone:us,merge:We},kf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wn=class extends Vn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kf,this.fragmentShader=Bf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=Uf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ra=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Qn=new P,fh=new ct,ph=new ct,qe=class extends ra{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,fh,ph),e.subVectors(ph,fh)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ji=-90,Ki=1,qo=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new qe(Ji,Ki,t,e);i.layers=this.layers,this.add(i);let r=new qe(Ji,Ki,t,e);r.layers=this.layers,this.add(r);let a=new qe(Ji,Ki,t,e);a.layers=this.layers,this.add(a);let o=new qe(Ji,Ki,t,e);o.layers=this.layers,this.add(o);let l=new qe(Ji,Ki,t,e);l.layers=this.layers,this.add(l);let c=new qe(Ji,Ki,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},aa=class extends Qe{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ls,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Yo=class extends Hn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new aa(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ie}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Oe(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:ni});r.uniforms.tEquirect.value=e;let a=new rt(i,r),o=e.minFilter;return e.minFilter===wi&&(e.minFilter=Ie),new qo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},To=new P,Ff=new P,Of=new Bt,Bn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=To.subVectors(n,e).cross(Ff.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(To),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Of.getNormalMatrix(t),i=this.coplanarPoint(To).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},_i=new Ii,Dr=new P,oa=class{constructor(t=new Bn,e=new Bn,n=new Bn,i=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On){let n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],M=i[13],x=i[14],w=i[15];if(n[0].setComponents(l-r,d-c,m-f,w-p).normalize(),n[1].setComponents(l+r,d+c,m+f,w+p).normalize(),n[2].setComponents(l+a,d+h,m+g,w+M).normalize(),n[3].setComponents(l-a,d-h,m-g,w-M).normalize(),n[4].setComponents(l-o,d-u,m-v,w-x).normalize(),e===On)n[5].setComponents(l+o,d+u,m+v,w+x).normalize();else if(e===Jr)n[5].setComponents(o,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(t){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(t.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Dr.x=i.normal.x>0?t.max.x:t.min.x,Dr.y=i.normal.y>0?t.max.y:t.min.y,Dr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function au(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function zf(s,t){let e=t.isWebGL2,n=new WeakMap;function i(c,h){let u=c.array,d=c.usage,f=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),c.onUploadCallback();let v;if(u instanceof Float32Array)v=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=s.SHORT;else if(u instanceof Uint32Array)v=s.UNSIGNED_INT;else if(u instanceof Int32Array)v=s.INT;else if(u instanceof Int8Array)v=s.BYTE;else if(u instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,u){let d=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,c),f.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let v=0,m=g.length;v<m;v++){let p=g[v];e?s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}var Ye=class s extends fe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let M=p*d-a;for(let x=0;x<c;x++){let w=x*u-r;g.push(w,-M,0),v.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let x=M+c*p,w=M+c*(p+1),R=M+1+c*(p+1),E=M+1+c*p;f.push(x,w,E),f.push(w,R,E)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(v,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Hf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gf=`#ifdef USE_ALPHAHASH
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
#endif`,Vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yf=`#ifdef USE_AOMAP
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
#endif`,$f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zf=`#ifdef USE_BATCHING
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
#endif`,Jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tp=`#ifdef USE_IRIDESCENCE
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
#endif`,ep=`#ifdef USE_BUMPMAP
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
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,hp=`#define PI 3.141592653589793
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
} // validated`,up=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dp=`vec3 transformedNormal = objectNormal;
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
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vp="gl_FragColor = linearToOutputTexel( gl_FragColor );",xp=`
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
}`,yp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,Mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rp=`#ifdef USE_GRADIENTMAP
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
}`,Cp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Pp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dp=`uniform bool receiveShadow;
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
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Op=`PhysicalMaterial material;
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
#endif`,zp=`struct PhysicalMaterial {
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
}`,Hp=`
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
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Yp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,$p=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kp=`#if defined( USE_POINTS_UV )
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
#endif`,jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nm=`#ifdef USE_MORPHNORMALS
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
#endif`,im=`#ifdef USE_MORPHTARGETS
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
#endif`,sm=`#ifdef USE_MORPHTARGETS
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
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,am=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hm=`#ifdef USE_NORMALMAP
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
#endif`,um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ym=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_m=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wm=`float getShadowMask() {
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
}`,Am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rm=`#ifdef USE_SKINNING
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
#endif`,Cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pm=`#ifdef USE_SKINNING
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
#endif`,Im=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Um=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nm=`#ifdef USE_TRANSMISSION
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
#endif`,km=`#ifdef USE_TRANSMISSION
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
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Hm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gm=`uniform sampler2D t2D;
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
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`#include <common>
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
}`,$m=`#if DEPTH_PACKING == 3200
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
}`,Zm=`#define DISTANCE
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
}`,Jm=`#define DISTANCE
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
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
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
}`,tg=`uniform vec3 diffuse;
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
}`,eg=`#include <common>
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
}`,ng=`uniform vec3 diffuse;
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
}`,ig=`#define LAMBERT
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
}`,sg=`#define LAMBERT
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
}`,rg=`#define MATCAP
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
}`,ag=`#define MATCAP
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
}`,og=`#define NORMAL
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
}`,lg=`#define NORMAL
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
}`,cg=`#define PHONG
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
}`,hg=`#define PHONG
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
}`,ug=`#define STANDARD
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
}`,dg=`#define STANDARD
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
}`,fg=`#define TOON
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
}`,pg=`#define TOON
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
}`,mg=`uniform float size;
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
}`,gg=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,xg=`uniform vec3 color;
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
}`,yg=`uniform float rotation;
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
}`,_g=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:Hf,alphahash_pars_fragment:Gf,alphamap_fragment:Vf,alphamap_pars_fragment:Wf,alphatest_fragment:Xf,alphatest_pars_fragment:qf,aomap_fragment:Yf,aomap_pars_fragment:$f,batching_pars_vertex:Zf,batching_vertex:Jf,begin_vertex:Kf,beginnormal_vertex:jf,bsdfs:Qf,iridescence_fragment:tp,bumpmap_pars_fragment:ep,clipping_planes_fragment:np,clipping_planes_pars_fragment:ip,clipping_planes_pars_vertex:sp,clipping_planes_vertex:rp,color_fragment:ap,color_pars_fragment:op,color_pars_vertex:lp,color_vertex:cp,common:hp,cube_uv_reflection_fragment:up,defaultnormal_vertex:dp,displacementmap_pars_vertex:fp,displacementmap_vertex:pp,emissivemap_fragment:mp,emissivemap_pars_fragment:gp,colorspace_fragment:vp,colorspace_pars_fragment:xp,envmap_fragment:yp,envmap_common_pars_fragment:_p,envmap_pars_fragment:bp,envmap_pars_vertex:Mp,envmap_physical_pars_fragment:Up,envmap_vertex:Sp,fog_vertex:Ep,fog_pars_vertex:Tp,fog_fragment:wp,fog_pars_fragment:Ap,gradientmap_pars_fragment:Rp,lightmap_fragment:Cp,lightmap_pars_fragment:Pp,lights_lambert_fragment:Ip,lights_lambert_pars_fragment:Lp,lights_pars_begin:Dp,lights_toon_fragment:Np,lights_toon_pars_fragment:kp,lights_phong_fragment:Bp,lights_phong_pars_fragment:Fp,lights_physical_fragment:Op,lights_physical_pars_fragment:zp,lights_fragment_begin:Hp,lights_fragment_maps:Gp,lights_fragment_end:Vp,logdepthbuf_fragment:Wp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:qp,logdepthbuf_vertex:Yp,map_fragment:$p,map_pars_fragment:Zp,map_particle_fragment:Jp,map_particle_pars_fragment:Kp,metalnessmap_fragment:jp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:tm,morphcolor_vertex:em,morphnormal_vertex:nm,morphtarget_pars_vertex:im,morphtarget_vertex:sm,normal_fragment_begin:rm,normal_fragment_maps:am,normal_pars_fragment:om,normal_pars_vertex:lm,normal_vertex:cm,normalmap_pars_fragment:hm,clearcoat_normal_fragment_begin:um,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:fm,iridescence_pars_fragment:pm,opaque_fragment:mm,packing:gm,premultiplied_alpha_fragment:vm,project_vertex:xm,dithering_fragment:ym,dithering_pars_fragment:_m,roughnessmap_fragment:bm,roughnessmap_pars_fragment:Mm,shadowmap_pars_fragment:Sm,shadowmap_pars_vertex:Em,shadowmap_vertex:Tm,shadowmask_pars_fragment:wm,skinbase_vertex:Am,skinning_pars_vertex:Rm,skinning_vertex:Cm,skinnormal_vertex:Pm,specularmap_fragment:Im,specularmap_pars_fragment:Lm,tonemapping_fragment:Dm,tonemapping_pars_fragment:Um,transmission_fragment:Nm,transmission_pars_fragment:km,uv_pars_fragment:Bm,uv_pars_vertex:Fm,uv_vertex:Om,worldpos_vertex:zm,background_vert:Hm,background_frag:Gm,backgroundCube_vert:Vm,backgroundCube_frag:Wm,cube_vert:Xm,cube_frag:qm,depth_vert:Ym,depth_frag:$m,distanceRGBA_vert:Zm,distanceRGBA_frag:Jm,equirect_vert:Km,equirect_frag:jm,linedashed_vert:Qm,linedashed_frag:tg,meshbasic_vert:eg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:sg,meshmatcap_vert:rg,meshmatcap_frag:ag,meshnormal_vert:og,meshnormal_frag:lg,meshphong_vert:cg,meshphong_frag:hg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:gg,shadow_vert:vg,shadow_frag:xg,sprite_vert:yg,sprite_frag:_g},nt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},En={basic:{uniforms:We([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:We([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new zt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:We([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:We([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:We([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new zt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:We([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:We([nt.points,nt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:We([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:We([nt.common,nt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:We([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:We([nt.sprite,nt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:We([nt.common,nt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:We([nt.lights,nt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};En.physical={uniforms:We([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var Ur={r:0,b:0,g:0},bi=new Gn,bg=new de;function Mg(s,t,e,n,i,r,a){let o=new zt(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let M=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?e:t).get(x)),x===null?v(o,l):x&&x.isColor&&(v(x,1),M=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===xa)?(h===void 0&&(h=new rt(new Oe(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:us(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),bi.copy(p.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(bg.makeRotationFromEuler(bi)),h.material.toneMapped=jt.getTransfer(x.colorSpace)!==se,(u!==x||d!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new rt(new Ye(2,2),new wn({name:"BackgroundMaterial",uniforms:us(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=jt.getTransfer(x.colorSpace)!==se,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,p){m.getRGB(Ur,ru(s)),n.buffers.color.setClear(Ur.r,Ur.g,Ur.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:g}}function Sg(s,t,e,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null),c=l,h=!1;function u(C,X,z,Z,q){let Y=!1;if(a){let tt=v(Z,z,X);c!==tt&&(c=tt,f(c.object)),Y=p(C,Z,z,q),Y&&M(C,Z,z,q)}else{let tt=X.wireframe===!0;(c.geometry!==Z.id||c.program!==z.id||c.wireframe!==tt)&&(c.geometry=Z.id,c.program=z.id,c.wireframe=tt,Y=!0)}q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,U(C,X,z,Z),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(C){return n.isWebGL2?s.bindVertexArray(C):r.bindVertexArrayOES(C)}function g(C){return n.isWebGL2?s.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function v(C,X,z){let Z=z.wireframe===!0,q=o[C.id];q===void 0&&(q={},o[C.id]=q);let Y=q[X.id];Y===void 0&&(Y={},q[X.id]=Y);let tt=Y[Z];return tt===void 0&&(tt=m(d()),Y[Z]=tt),tt}function m(C){let X=[],z=[],Z=[];for(let q=0;q<i;q++)X[q]=0,z[q]=0,Z[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:z,attributeDivisors:Z,object:C,attributes:{},index:null}}function p(C,X,z,Z){let q=c.attributes,Y=X.attributes,tt=0,it=z.getAttributes();for(let dt in it)if(it[dt].location>=0){let H=q[dt],K=Y[dt];if(K===void 0&&(dt==="instanceMatrix"&&C.instanceMatrix&&(K=C.instanceMatrix),dt==="instanceColor"&&C.instanceColor&&(K=C.instanceColor)),H===void 0||H.attribute!==K||K&&H.data!==K.data)return!0;tt++}return c.attributesNum!==tt||c.index!==Z}function M(C,X,z,Z){let q={},Y=X.attributes,tt=0,it=z.getAttributes();for(let dt in it)if(it[dt].location>=0){let H=Y[dt];H===void 0&&(dt==="instanceMatrix"&&C.instanceMatrix&&(H=C.instanceMatrix),dt==="instanceColor"&&C.instanceColor&&(H=C.instanceColor));let K={};K.attribute=H,H&&H.data&&(K.data=H.data),q[dt]=K,tt++}c.attributes=q,c.attributesNum=tt,c.index=Z}function x(){let C=c.newAttributes;for(let X=0,z=C.length;X<z;X++)C[X]=0}function w(C){R(C,0)}function R(C,X){let z=c.newAttributes,Z=c.enabledAttributes,q=c.attributeDivisors;z[C]=1,Z[C]===0&&(s.enableVertexAttribArray(C),Z[C]=1),q[C]!==X&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,X),q[C]=X)}function E(){let C=c.newAttributes,X=c.enabledAttributes;for(let z=0,Z=X.length;z<Z;z++)X[z]!==C[z]&&(s.disableVertexAttribArray(z),X[z]=0)}function A(C,X,z,Z,q,Y,tt){tt===!0?s.vertexAttribIPointer(C,X,z,q,Y):s.vertexAttribPointer(C,X,z,Z,q,Y)}function U(C,X,z,Z){if(n.isWebGL2===!1&&(C.isInstancedMesh||Z.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let q=Z.attributes,Y=z.getAttributes(),tt=X.defaultAttributeValues;for(let it in Y){let dt=Y[it];if(dt.location>=0){let Lt=q[it];if(Lt===void 0&&(it==="instanceMatrix"&&C.instanceMatrix&&(Lt=C.instanceMatrix),it==="instanceColor"&&C.instanceColor&&(Lt=C.instanceColor)),Lt!==void 0){let H=Lt.normalized,K=Lt.itemSize,ut=e.get(Lt);if(ut===void 0)continue;let Tt=ut.buffer,vt=ut.type,ft=ut.bytesPerElement,Jt=n.isWebGL2===!0&&(vt===s.INT||vt===s.UNSIGNED_INT||Lt.gpuType===$h);if(Lt.isInterleavedBufferAttribute){let wt=Lt.data,N=wt.stride,Ce=Lt.offset;if(wt.isInstancedInterleavedBuffer){for(let yt=0;yt<dt.locationSize;yt++)R(dt.location+yt,wt.meshPerAttribute);C.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let yt=0;yt<dt.locationSize;yt++)w(dt.location+yt);s.bindBuffer(s.ARRAY_BUFFER,Tt);for(let yt=0;yt<dt.locationSize;yt++)A(dt.location+yt,K/dt.locationSize,vt,H,N*ft,(Ce+K/dt.locationSize*yt)*ft,Jt)}else{if(Lt.isInstancedBufferAttribute){for(let wt=0;wt<dt.locationSize;wt++)R(dt.location+wt,Lt.meshPerAttribute);C.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=Lt.meshPerAttribute*Lt.count)}else for(let wt=0;wt<dt.locationSize;wt++)w(dt.location+wt);s.bindBuffer(s.ARRAY_BUFFER,Tt);for(let wt=0;wt<dt.locationSize;wt++)A(dt.location+wt,K/dt.locationSize,vt,H,K*ft,K/dt.locationSize*wt*ft,Jt)}}else if(tt!==void 0){let H=tt[it];if(H!==void 0)switch(H.length){case 2:s.vertexAttrib2fv(dt.location,H);break;case 3:s.vertexAttrib3fv(dt.location,H);break;case 4:s.vertexAttrib4fv(dt.location,H);break;default:s.vertexAttrib1fv(dt.location,H)}}}}E()}function L(){V();for(let C in o){let X=o[C];for(let z in X){let Z=X[z];for(let q in Z)g(Z[q].object),delete Z[q];delete X[z]}delete o[C]}}function y(C){if(o[C.id]===void 0)return;let X=o[C.id];for(let z in X){let Z=X[z];for(let q in Z)g(Z[q].object),delete Z[q];delete X[z]}delete o[C.id]}function S(C){for(let X in o){let z=o[X];if(z[C.id]===void 0)continue;let Z=z[C.id];for(let q in Z)g(Z[q].object),delete Z[q];delete z[C.id]}}function V(){W(),h=!0,c!==l&&(c=l,f(c.object))}function W(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:V,resetDefaultState:W,dispose:L,releaseStatesOfGeometry:y,releaseStatesOfProgram:S,initAttributes:x,enableAttribute:w,disableUnusedAttributes:E}}function Eg(s,t,e,n){let i=n.isWebGL2,r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,d){if(d===0)return;let f,g;if(i)f=s,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),e.update(u,r,d)}function c(h,u,d){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Tg(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,w=a||t.has("OES_texture_float"),R=x&&w,E=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:w,floatVertexTextures:R,maxSamples:E}}function wg(s){let t=this,e=null,n=0,i=!1,r=!1,a=new Bn,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,x=M*4,w=p.clippingState||null;l.value=w,w=h(g,d,x,f);for(let R=0;R!==x;++R)w[R]=e[R];p.clippingState=w,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let p=f+v*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,w=f;x!==v;++x,w+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(m,w),m[w+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Ag(s){let t=new WeakMap;function e(a,o){return o===Fo?a.mapping=ls:o===Oo&&(a.mapping=cs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Fo||o===Oo)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Yo(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var zs=class extends ra{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},is=4,mh=[.125,.215,.35,.446,.526,.582],Ti=20,wo=new zs,gh=new zt,Ao=null,Ro=0,Co=0,Si=(1+Math.sqrt(5))/2,ji=1/Si,vh=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Si,ji),new P(0,Si,-ji),new P(ji,0,Si),new P(-ji,0,Si),new P(Si,ji,0),new P(-Si,ji,0)],la=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_h(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ao,Ro,Co),t.scissorTest=!1,Nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ls||t.mapping===cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ie,minFilter:Ie,generateMipmaps:!1,type:Bs,format:gn,colorSpace:hi,depthBuffer:!1},i=xh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rg(r)),this._blurMaterial=Cg(r,t,e)}return i}_compileMaterial(t){let e=new rt(this._lodPlanes[0],t);this._renderer.compile(e,wo)}_sceneToCubeUV(t,e,n,i){let o=new qe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(gh),h.toneMapping=xn,h.autoClear=!1;let f=new It({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),g=new rt(new Oe,f),v=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(gh),v=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let x=this._cubeSize;Nr(i,M*x,p>2?x:0,x,x),h.setRenderTarget(i),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===ls||t.mapping===cs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=_h()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new rt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Nr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,wo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=vh[(i-1)%vh.length];this._blur(t,i-1,i,r,a)}e.autoClear=n}_blur(t,e,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new rt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ti-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Ti;m>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ti}`);let p=[],M=0;for(let A=0;A<Ti;++A){let U=A/v,L=Math.exp(-U*U/2);p.push(L),A===0?M+=L:A<m&&(M+=2*L)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;let w=this._sizeLods[i],R=3*w*(i>x-is?i-x+is:0),E=4*(this._cubeSize-w);Nr(e,R,E,3*w,2*w),l.setRenderTarget(e),l.render(u,wo)}};function Rg(s){let t=[],e=[],n=[],i=s,r=s-is+1+mh.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let l=1/o;a>s-is?l=mh[a-s+is-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*f),x=new Float32Array(m*g*f),w=new Float32Array(p*g*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,U=E>2?0:-1,L=[A,U,0,A+2/3,U,0,A+2/3,U+1,0,A,U,0,A+2/3,U+1,0,A,U+1,0];M.set(L,v*g*E),x.set(d,m*g*E);let y=[E,E,E,E,E,E];w.set(y,p*g*E)}let R=new fe;R.setAttribute("position",new _e(M,v)),R.setAttribute("uv",new _e(x,m)),R.setAttribute("faceIndex",new _e(w,p)),t.push(R),i>is&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xh(s,t,e){let n=new Hn(s,t,e);return n.texture.mapping=xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Nr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Cg(s,t,e){let n=new Float32Array(Ti),i=new P(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Cl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function yh(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function _h(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Cl(){return`

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
	`}function Pg(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Fo||l===Oo,h=l===ls||l===cs;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new la(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{let u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new la(s));let d=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Ig(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Lg(s,t,e,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],s.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,v=0;if(f!==null){let M=f.array;v=f.version;for(let x=0,w=M.length;x<w;x+=3){let R=M[x+0],E=M[x+1],A=M[x+2];d.push(R,E,E,A,A,R)}}else if(g!==void 0){let M=g.array;v=g.version;for(let x=0,w=M.length/3-1;x<w;x+=3){let R=x+0,E=x+1,A=x+2;d.push(R,E,E,A,A,R)}}else return;let m=new(nu(d)?sa:ia)(d,1);m.version=v;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Dg(s,t,e,n){let i=n.isWebGL2,r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(r,g,o,f*l),e.update(g,r,1)}function u(f,g,v){if(v===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,f*l,v),e.update(g,r,v)}function d(f,g,v){if(v===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,f,0,v);let p=0;for(let M=0;M<v;M++)p+=g[M];e.update(p,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Ug(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Ng(s,t){return s[0]-t[0]}function kg(s,t){return Math.abs(t[1])-Math.abs(s[1])}function Bg(s,t,e){let n={},i=new Float32Array(8),r=new WeakMap,a=new Le,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){let d=c.morphTargetInfluences;if(t.isWebGL2===!0){let f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0,v=r.get(h);if(v===void 0||v.count!==g){let V=function(){y.dispose(),r.delete(h),h.removeEventListener("dispose",V)};v!==void 0&&v.texture.dispose();let m=h.morphAttributes.position!==void 0,p=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,x=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],R=h.morphAttributes.color||[],E=0;m===!0&&(E=1),p===!0&&(E=2),M===!0&&(E=3);let A=h.attributes.position.count*E,U=1;A>t.maxTextureSize&&(U=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);let L=new Float32Array(A*U*4*g),y=new ea(L,A,U,g);y.type=Fn,y.needsUpdate=!0;let S=E*4;for(let W=0;W<g;W++){let C=x[W],X=w[W],z=R[W],Z=A*U*4*W;for(let q=0;q<C.count;q++){let Y=q*S;m===!0&&(a.fromBufferAttribute(C,q),L[Z+Y+0]=a.x,L[Z+Y+1]=a.y,L[Z+Y+2]=a.z,L[Z+Y+3]=0),p===!0&&(a.fromBufferAttribute(X,q),L[Z+Y+4]=a.x,L[Z+Y+5]=a.y,L[Z+Y+6]=a.z,L[Z+Y+7]=0),M===!0&&(a.fromBufferAttribute(z,q),L[Z+Y+8]=a.x,L[Z+Y+9]=a.y,L[Z+Y+10]=a.z,L[Z+Y+11]=z.itemSize===4?a.w:1)}}v={count:g,texture:y,size:new ct(A,U)},r.set(h,v),h.addEventListener("dispose",V)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)u.getUniforms().setValue(s,"morphTexture",c.morphTexture,e);else{let m=0;for(let M=0;M<d.length;M++)m+=d[M];let p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",p),u.getUniforms().setValue(s,"morphTargetInfluences",d)}u.getUniforms().setValue(s,"morphTargetsTexture",v.texture,e),u.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}else{let f=d===void 0?0:d.length,g=n[h.id];if(g===void 0||g.length!==f){g=[];for(let x=0;x<f;x++)g[x]=[x,0];n[h.id]=g}for(let x=0;x<f;x++){let w=g[x];w[0]=x,w[1]=d[x]}g.sort(kg);for(let x=0;x<8;x++)x<f&&g[x][1]?(o[x][0]=g[x][0],o[x][1]=g[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(Ng);let v=h.morphAttributes.position,m=h.morphAttributes.normal,p=0;for(let x=0;x<8;x++){let w=o[x],R=w[0],E=w[1];R!==Number.MAX_SAFE_INTEGER&&E?(v&&h.getAttribute("morphTarget"+x)!==v[R]&&h.setAttribute("morphTarget"+x,v[R]),m&&h.getAttribute("morphNormal"+x)!==m[R]&&h.setAttribute("morphNormal"+x,m[R]),i[x]=E,p+=E):(v&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),m&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),i[x]=0)}let M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",M),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function Fg(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var ca=class extends Qe{constructor(t,e,n,i,r,a,o,l,c,h){if(h=h!==void 0?h:Ci,h!==Ci&&h!==hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ci&&(n=ei),n===void 0&&h===hs&&(n=Ri),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Xe,this.minFilter=l!==void 0?l:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ou=new Qe,lu=new ca(1,1);lu.compareFunction=eu;var cu=new ea,hu=new Xo,uu=new aa,bh=[],Mh=[],Sh=new Float32Array(16),Eh=new Float32Array(9),Th=new Float32Array(4);function xs(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=bh[i];if(r===void 0&&(r=new Float32Array(i),bh[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ee(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Te(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function _a(s,t){let e=Mh[t];e===void 0&&(e=new Int32Array(t),Mh[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Og(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function zg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2fv(this.addr,t),Te(e,t)}}function Hg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;s.uniform3fv(this.addr,t),Te(e,t)}}function Gg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4fv(this.addr,t),Te(e,t)}}function Vg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Th.set(n),s.uniformMatrix2fv(this.addr,!1,Th),Te(e,n)}}function Wg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Eh.set(n),s.uniformMatrix3fv(this.addr,!1,Eh),Te(e,n)}}function Xg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Sh.set(n),s.uniformMatrix4fv(this.addr,!1,Sh),Te(e,n)}}function qg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Yg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2iv(this.addr,t),Te(e,t)}}function $g(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3iv(this.addr,t),Te(e,t)}}function Zg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4iv(this.addr,t),Te(e,t)}}function Jg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Kg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2uiv(this.addr,t),Te(e,t)}}function jg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3uiv(this.addr,t),Te(e,t)}}function Qg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4uiv(this.addr,t),Te(e,t)}}function t0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?lu:ou;e.setTexture2D(t||r,i)}function e0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||hu,i)}function n0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||uu,i)}function i0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||cu,i)}function s0(s){switch(s){case 5126:return Og;case 35664:return zg;case 35665:return Hg;case 35666:return Gg;case 35674:return Vg;case 35675:return Wg;case 35676:return Xg;case 5124:case 35670:return qg;case 35667:case 35671:return Yg;case 35668:case 35672:return $g;case 35669:case 35673:return Zg;case 5125:return Jg;case 36294:return Kg;case 36295:return jg;case 36296:return Qg;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return e0;case 35680:case 36300:case 36308:case 36293:return n0;case 36289:case 36303:case 36311:case 36292:return i0}}function r0(s,t){s.uniform1fv(this.addr,t)}function a0(s,t){let e=xs(t,this.size,2);s.uniform2fv(this.addr,e)}function o0(s,t){let e=xs(t,this.size,3);s.uniform3fv(this.addr,e)}function l0(s,t){let e=xs(t,this.size,4);s.uniform4fv(this.addr,e)}function c0(s,t){let e=xs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function h0(s,t){let e=xs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function u0(s,t){let e=xs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function d0(s,t){s.uniform1iv(this.addr,t)}function f0(s,t){s.uniform2iv(this.addr,t)}function p0(s,t){s.uniform3iv(this.addr,t)}function m0(s,t){s.uniform4iv(this.addr,t)}function g0(s,t){s.uniform1uiv(this.addr,t)}function v0(s,t){s.uniform2uiv(this.addr,t)}function x0(s,t){s.uniform3uiv(this.addr,t)}function y0(s,t){s.uniform4uiv(this.addr,t)}function _0(s,t,e){let n=this.cache,i=t.length,r=_a(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||ou,r[a])}function b0(s,t,e){let n=this.cache,i=t.length,r=_a(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||hu,r[a])}function M0(s,t,e){let n=this.cache,i=t.length,r=_a(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||uu,r[a])}function S0(s,t,e){let n=this.cache,i=t.length,r=_a(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||cu,r[a])}function E0(s){switch(s){case 5126:return r0;case 35664:return a0;case 35665:return o0;case 35666:return l0;case 35674:return c0;case 35675:return h0;case 35676:return u0;case 5124:case 35670:return d0;case 35667:case 35671:return f0;case 35668:case 35672:return p0;case 35669:case 35673:return m0;case 5125:return g0;case 36294:return v0;case 36295:return x0;case 36296:return y0;case 35678:case 36198:case 36298:case 36306:case 35682:return _0;case 35679:case 36299:case 36307:return b0;case 35680:case 36300:case 36308:case 36293:return M0;case 36289:case 36303:case 36311:case 36292:return S0}}var $o=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=s0(e.type)}},Zo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=E0(e.type)}},Jo=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},Po=/(\w+)(\])?(\[|\.)?/g;function wh(s,t){s.seq.push(t),s.map[t.id]=t}function T0(s,t,e){let n=s.name,i=n.length;for(Po.lastIndex=0;;){let r=Po.exec(n),a=Po.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){wh(e,c===void 0?new $o(o,s,t):new Zo(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Jo(o),wh(e,u)),e=u}}}var os=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);T0(r,a,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Ah(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var w0=37297,A0=0;function R0(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function C0(s){let t=jt.getPrimaries(jt.workingColorSpace),e=jt.getPrimaries(s),n;switch(t===e?n="":t===Zr&&e===$r?n="LinearDisplayP3ToLinearSRGB":t===$r&&e===Zr&&(n="LinearSRGBToLinearDisplayP3"),s){case hi:case ya:return[n,"LinearTransferOETF"];case Qt:case Al:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Rh(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+R0(s.getShaderSource(t),a)}else return i}function P0(s,t){let e=C0(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function I0(s,t){let e;switch(t){case Ld:e="Linear";break;case Dd:e="Reinhard";break;case Ud:e="OptimizedCineon";break;case Nd:e="ACESFilmic";break;case Bd:e="AgX";break;case Fd:e="Neutral";break;case kd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function L0(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.alphaToCoverage||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ss).join(`
`)}function D0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ss).join(`
`)}function U0(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function N0(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function ss(s){return s!==""}function Ch(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ph(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var k0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(s){return s.replace(k0,F0)}var B0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function F0(s,t){let e=kt[t];if(e===void 0){let n=B0.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ko(e)}var O0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ih(s){return s.replace(O0,z0)}function z0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Lh(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function H0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Xh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ad?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function G0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ls:case cs:t="ENVMAP_TYPE_CUBE";break;case xa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function V0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case cs:t="ENVMAP_MODE_REFRACTION";break}return t}function W0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case qh:t="ENVMAP_BLENDING_MULTIPLY";break;case Pd:t="ENVMAP_BLENDING_MIX";break;case Id:t="ENVMAP_BLENDING_ADD";break}return t}function X0(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function q0(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=H0(e),c=G0(e),h=V0(e),u=W0(e),d=X0(e),f=e.isWebGL2?"":L0(e),g=D0(e),v=U0(r),m=i.createProgram(),p,M,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ss).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ss).join(`
`),M.length>0&&(M+=`
`)):(p=[Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ss).join(`
`),M=[f,Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xn?"#define TONE_MAPPING":"",e.toneMapping!==xn?kt.tonemapping_pars_fragment:"",e.toneMapping!==xn?I0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,P0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ss).join(`
`)),a=Ko(a),a=Ch(a,e),a=Ph(a,e),o=Ko(o),o=Ch(o,e),o=Ph(o,e),a=Ih(a),o=Ih(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);let w=x+p+a,R=x+M+o,E=Ah(i,i.VERTEX_SHADER,w),A=Ah(i,i.FRAGMENT_SHADER,R);i.attachShader(m,E),i.attachShader(m,A),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function U(V){if(s.debug.checkShaderErrors){let W=i.getProgramInfoLog(m).trim(),C=i.getShaderInfoLog(E).trim(),X=i.getShaderInfoLog(A).trim(),z=!0,Z=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,E,A);else{let q=Rh(i,E,"vertex"),Y=Rh(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+W+`
`+q+`
`+Y)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(C===""||X==="")&&(Z=!1);Z&&(V.diagnostics={runnable:z,programLog:W,vertexShader:{log:C,prefix:p},fragmentShader:{log:X,prefix:M}})}i.deleteShader(E),i.deleteShader(A),L=new os(i,m),y=N0(i,m)}let L;this.getUniforms=function(){return L===void 0&&U(this),L};let y;this.getAttributes=function(){return y===void 0&&U(this),y};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(m,w0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=A0++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=E,this.fragmentShader=A,this}var Y0=0,jo=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Qo(t),e.set(t,n)),n}},Qo=class{constructor(t){this.id=Y0++,this.code=t,this.usedTimes=0}};function $0(s,t,e,n,i,r,a){let o=new na,l=new jo,c=new Set,h=[],u=i.isWebGL2,d=i.logarithmicDepthBuffer,f=i.vertexTextures,g=i.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return c.add(y),y===0?"uv":`uv${y}`}function p(y,S,V,W,C){let X=W.fog,z=C.geometry,Z=y.isMeshStandardMaterial?W.environment:null,q=(y.isMeshStandardMaterial?e:t).get(y.envMap||Z),Y=q&&q.mapping===xa?q.image.height:null,tt=v[y.type];y.precision!==null&&(g=i.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));let it=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,dt=it!==void 0?it.length:0,Lt=0;z.morphAttributes.position!==void 0&&(Lt=1),z.morphAttributes.normal!==void 0&&(Lt=2),z.morphAttributes.color!==void 0&&(Lt=3);let H,K,ut,Tt;if(tt){let ne=En[tt];H=ne.vertexShader,K=ne.fragmentShader}else H=y.vertexShader,K=y.fragmentShader,l.update(y),ut=l.getVertexShaderID(y),Tt=l.getFragmentShaderID(y);let vt=s.getRenderTarget(),ft=C.isInstancedMesh===!0,Jt=C.isBatchedMesh===!0,wt=!!y.map,N=!!y.matcap,Ce=!!q,yt=!!y.aoMap,Ht=!!y.lightMap,bt=!!y.bumpMap,qt=!!y.normalMap,Ft=!!y.displacementMap,Gt=!!y.emissiveMap,pe=!!y.metalnessMap,T=!!y.roughnessMap,_=y.anisotropy>0,G=y.clearcoat>0,$=y.iridescence>0,j=y.sheen>0,J=y.transmission>0,Dt=_&&!!y.anisotropyMap,Mt=G&&!!y.clearcoatMap,st=G&&!!y.clearcoatNormalMap,ot=G&&!!y.clearcoatRoughnessMap,Ut=$&&!!y.iridescenceMap,Q=$&&!!y.iridescenceThicknessMap,xe=j&&!!y.sheenColorMap,Vt=j&&!!y.sheenRoughnessMap,xt=!!y.specularMap,pt=!!y.specularColorMap,mt=!!y.specularIntensityMap,Yt=J&&!!y.transmissionMap,Ct=J&&!!y.thicknessMap,re=!!y.gradientMap,I=!!y.alphaMap,at=y.alphaTest>0,B=!!y.alphaHash,et=!!y.extensions,lt=xn;y.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(lt=s.toneMapping);let Xt={isWebGL2:u,shaderID:tt,shaderType:y.type,shaderName:y.name,vertexShader:H,fragmentShader:K,defines:y.defines,customVertexShaderID:ut,customFragmentShaderID:Tt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:Jt,instancing:ft,instancingColor:ft&&C.instanceColor!==null,instancingMorph:ft&&C.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:vt===null?s.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:hi,alphaToCoverage:!!y.alphaToCoverage,map:wt,matcap:N,envMap:Ce,envMapMode:Ce&&q.mapping,envMapCubeUVHeight:Y,aoMap:yt,lightMap:Ht,bumpMap:bt,normalMap:qt,displacementMap:f&&Ft,emissiveMap:Gt,normalMapObjectSpace:qt&&y.normalMapType===Jd,normalMapTangentSpace:qt&&y.normalMapType===Zd,metalnessMap:pe,roughnessMap:T,anisotropy:_,anisotropyMap:Dt,clearcoat:G,clearcoatMap:Mt,clearcoatNormalMap:st,clearcoatRoughnessMap:ot,iridescence:$,iridescenceMap:Ut,iridescenceThicknessMap:Q,sheen:j,sheenColorMap:xe,sheenRoughnessMap:Vt,specularMap:xt,specularColorMap:pt,specularIntensityMap:mt,transmission:J,transmissionMap:Yt,thicknessMap:Ct,gradientMap:re,opaque:y.transparent===!1&&y.blending===rs&&y.alphaToCoverage===!1,alphaMap:I,alphaTest:at,alphaHash:B,combine:y.combine,mapUv:wt&&m(y.map.channel),aoMapUv:yt&&m(y.aoMap.channel),lightMapUv:Ht&&m(y.lightMap.channel),bumpMapUv:bt&&m(y.bumpMap.channel),normalMapUv:qt&&m(y.normalMap.channel),displacementMapUv:Ft&&m(y.displacementMap.channel),emissiveMapUv:Gt&&m(y.emissiveMap.channel),metalnessMapUv:pe&&m(y.metalnessMap.channel),roughnessMapUv:T&&m(y.roughnessMap.channel),anisotropyMapUv:Dt&&m(y.anisotropyMap.channel),clearcoatMapUv:Mt&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:st&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ut&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&m(y.sheenRoughnessMap.channel),specularMapUv:xt&&m(y.specularMap.channel),specularColorMapUv:pt&&m(y.specularColorMap.channel),specularIntensityMapUv:mt&&m(y.specularIntensityMap.channel),transmissionMapUv:Yt&&m(y.transmissionMap.channel),thicknessMapUv:Ct&&m(y.thicknessMap.channel),alphaMapUv:I&&m(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(qt||_),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!z.attributes.uv&&(wt||I),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:C.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:Lt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:lt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:wt&&y.map.isVideoTexture===!0&&jt.getTransfer(y.map.colorSpace)===se,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ue,flipSided:y.side===$e,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:et&&y.extensions.derivatives===!0,extensionFragDepth:et&&y.extensions.fragDepth===!0,extensionDrawBuffers:et&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:et&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:et&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:et&&y.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Xt.vertexUv1s=c.has(1),Xt.vertexUv2s=c.has(2),Xt.vertexUv3s=c.has(3),c.clear(),Xt}function M(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let V in y.defines)S.push(V),S.push(y.defines[V]);return y.isRawShaderMaterial===!1&&(x(S,y),w(S,y),S.push(s.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function x(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function w(y,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.instancingMorph&&o.enable(4),S.matcap&&o.enable(5),S.envMap&&o.enable(6),S.normalMapObjectSpace&&o.enable(7),S.normalMapTangentSpace&&o.enable(8),S.clearcoat&&o.enable(9),S.iridescence&&o.enable(10),S.alphaTest&&o.enable(11),S.vertexColors&&o.enable(12),S.vertexAlphas&&o.enable(13),S.vertexUv1s&&o.enable(14),S.vertexUv2s&&o.enable(15),S.vertexUv3s&&o.enable(16),S.vertexTangents&&o.enable(17),S.anisotropy&&o.enable(18),S.alphaHash&&o.enable(19),S.batching&&o.enable(20),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.useLegacyLights&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),y.push(o.mask)}function R(y){let S=v[y.type],V;if(S){let W=En[S];V=Nf.clone(W.uniforms)}else V=y.uniforms;return V}function E(y,S){let V;for(let W=0,C=h.length;W<C;W++){let X=h[W];if(X.cacheKey===S){V=X,++V.usedTimes;break}}return V===void 0&&(V=new q0(s,S,y,r),h.push(V)),V}function A(y){if(--y.usedTimes===0){let S=h.indexOf(y);h[S]=h[h.length-1],h.pop(),y.destroy()}}function U(y){l.remove(y)}function L(){l.dispose()}return{getParameters:p,getProgramCacheKey:M,getUniforms:R,acquireProgram:E,releaseProgram:A,releaseShaderCache:U,programs:h,dispose:L}}function Z0(){let s=new WeakMap;function t(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function e(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function J0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Dh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Uh(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,g,v,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,d,f,g,v,m){let p=a(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,g,v,m){let p=a(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||J0),n.length>1&&n.sort(d||Dh),i.length>1&&i.sort(d||Dh)}function h(){for(let u=t,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function K0(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new Uh,s.set(n,[a])):i>=r.length?(a=new Uh,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function j0(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new zt};break;case"SpotLight":e={position:new P,direction:new P,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function Q0(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var tv=0;function ev(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function nv(s,t){let e=new j0,n=Q0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new P);let r=new P,a=new de,o=new de;function l(h,u){let d=0,f=0,g=0;for(let V=0;V<9;V++)i.probe[V].set(0,0,0);let v=0,m=0,p=0,M=0,x=0,w=0,R=0,E=0,A=0,U=0,L=0;h.sort(ev);let y=u===!0?Math.PI:1;for(let V=0,W=h.length;V<W;V++){let C=h[V],X=C.color,z=C.intensity,Z=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=X.r*z*y,f+=X.g*z*y,g+=X.b*z*y;else if(C.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(C.sh.coefficients[Y],z);L++}else if(C.isDirectionalLight){let Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity*y),C.castShadow){let tt=C.shadow,it=n.get(C);it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,i.directionalShadow[v]=it,i.directionalShadowMap[v]=q,i.directionalShadowMatrix[v]=C.shadow.matrix,w++}i.directional[v]=Y,v++}else if(C.isSpotLight){let Y=e.get(C);Y.position.setFromMatrixPosition(C.matrixWorld),Y.color.copy(X).multiplyScalar(z*y),Y.distance=Z,Y.coneCos=Math.cos(C.angle),Y.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Y.decay=C.decay,i.spot[p]=Y;let tt=C.shadow;if(C.map&&(i.spotLightMap[A]=C.map,A++,tt.updateMatrices(C),C.castShadow&&U++),i.spotLightMatrix[p]=tt.matrix,C.castShadow){let it=n.get(C);it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,i.spotShadow[p]=it,i.spotShadowMap[p]=q,E++}p++}else if(C.isRectAreaLight){let Y=e.get(C);Y.color.copy(X).multiplyScalar(z),Y.halfWidth.set(C.width*.5,0,0),Y.halfHeight.set(0,C.height*.5,0),i.rectArea[M]=Y,M++}else if(C.isPointLight){let Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity*y),Y.distance=C.distance,Y.decay=C.decay,C.castShadow){let tt=C.shadow,it=n.get(C);it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,it.shadowCameraNear=tt.camera.near,it.shadowCameraFar=tt.camera.far,i.pointShadow[m]=it,i.pointShadowMap[m]=q,i.pointShadowMatrix[m]=C.shadow.matrix,R++}i.point[m]=Y,m++}else if(C.isHemisphereLight){let Y=e.get(C);Y.skyColor.copy(C.color).multiplyScalar(z*y),Y.groundColor.copy(C.groundColor).multiplyScalar(z*y),i.hemi[x]=Y,x++}}M>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;let S=i.hash;(S.directionalLength!==v||S.pointLength!==m||S.spotLength!==p||S.rectAreaLength!==M||S.hemiLength!==x||S.numDirectionalShadows!==w||S.numPointShadows!==R||S.numSpotShadows!==E||S.numSpotMaps!==A||S.numLightProbes!==L)&&(i.directional.length=v,i.spot.length=p,i.rectArea.length=M,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=E+A-U,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=U,i.numLightProbes=L,S.directionalLength=v,S.pointLength=m,S.spotLength=p,S.rectAreaLength=M,S.hemiLength=x,S.numDirectionalShadows=w,S.numPointShadows=R,S.numSpotShadows=E,S.numSpotMaps=A,S.numLightProbes=L,i.version=tv++)}function c(h,u){let d=0,f=0,g=0,v=0,m=0,p=u.matrixWorldInverse;for(let M=0,x=h.length;M<x;M++){let w=h[M];if(w.isDirectionalLight){let R=i.directional[d];R.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),d++}else if(w.isSpotLight){let R=i.spot[g];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),g++}else if(w.isRectAreaLight){let R=i.rectArea[v];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(p),o.identity(),a.copy(w.matrixWorld),a.premultiply(p),o.extractRotation(a),R.halfWidth.set(w.width*.5,0,0),R.halfHeight.set(0,w.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),v++}else if(w.isPointLight){let R=i.point[f];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(p),f++}else if(w.isHemisphereLight){let R=i.hemi[m];R.direction.setFromMatrixPosition(w.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:i}}function Nh(s,t){let e=new nv(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function iv(s,t){let e=new WeakMap;function n(r,a=0){let o=e.get(r),l;return o===void 0?(l=new Nh(s,t),e.set(r,[l])):a>=o.length?(l=new Nh(s,t),o.push(l)):l=o[a],l}function i(){e=new WeakMap}return{get:n,dispose:i}}var tl=class extends Vn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},el=class extends Vn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rv=`uniform sampler2D shadow_pass;
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
}`;function av(s,t,e){let n=new oa,i=new ct,r=new ct,a=new Le,o=new tl({depthPacking:$d}),l=new el,c={},h=e.maxTextureSize,u={[si]:$e,[$e]:si,[ue]:ue},d=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:sv,fragmentShader:rv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new fe;g.setAttribute("position",new _e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new rt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xh;let p=this.type;this.render=function(E,A,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let L=s.getRenderTarget(),y=s.getActiveCubeFace(),S=s.getActiveMipmapLevel(),V=s.state;V.setBlending(ni),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let W=p!==kn&&this.type===kn,C=p===kn&&this.type!==kn;for(let X=0,z=E.length;X<z;X++){let Z=E[X],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);let Y=q.getFrameExtents();if(i.multiply(Y),r.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,q.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,q.mapSize.y=r.y)),q.map===null||W===!0||C===!0){let it=this.type!==kn?{minFilter:Xe,magFilter:Xe}:{};q.map!==null&&q.map.dispose(),q.map=new Hn(i.x,i.y,it),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}s.setRenderTarget(q.map),s.clear();let tt=q.getViewportCount();for(let it=0;it<tt;it++){let dt=q.getViewport(it);a.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),V.viewport(a),q.updateMatrices(Z,it),n=q.getFrustum(),w(A,U,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===kn&&M(q,U),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(L,y,S)};function M(E,A){let U=t.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Hn(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(A,null,U,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(A,null,U,f,v,null)}function x(E,A,U,L){let y=null,S=U.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(S!==void 0)y=S;else if(y=U.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let V=y.uuid,W=A.uuid,C=c[V];C===void 0&&(C={},c[V]=C);let X=C[W];X===void 0&&(X=y.clone(),C[W]=X,A.addEventListener("dispose",R)),y=X}if(y.visible=A.visible,y.wireframe=A.wireframe,L===kn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:u[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,U.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let V=s.properties.get(y);V.light=U}return y}function w(E,A,U,L,y){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===kn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,E.matrixWorld);let W=t.update(E),C=E.material;if(Array.isArray(C)){let X=W.groups;for(let z=0,Z=X.length;z<Z;z++){let q=X[z],Y=C[q.materialIndex];if(Y&&Y.visible){let tt=x(E,Y,L,y);E.onBeforeShadow(s,E,A,U,W,tt,q),s.renderBufferDirect(U,null,W,tt,E,q),E.onAfterShadow(s,E,A,U,W,tt,q)}}}else if(C.visible){let X=x(E,C,L,y);E.onBeforeShadow(s,E,A,U,W,X,null),s.renderBufferDirect(U,null,W,X,E,null),E.onAfterShadow(s,E,A,U,W,X,null)}}let V=E.children;for(let W=0,C=V.length;W<C;W++)w(V[W],A,U,L,y)}function R(E){E.target.removeEventListener("dispose",R);for(let U in c){let L=c[U],y=E.target.uuid;y in L&&(L[y].dispose(),delete L[y])}}}function ov(s,t,e){let n=e.isWebGL2;function i(){let I=!1,at=new Le,B=null,et=new Le(0,0,0,0);return{setMask:function(lt){B!==lt&&!I&&(s.colorMask(lt,lt,lt,lt),B=lt)},setLocked:function(lt){I=lt},setClear:function(lt,Xt,ne,Pe,en){en===!0&&(lt*=Pe,Xt*=Pe,ne*=Pe),at.set(lt,Xt,ne,Pe),et.equals(at)===!1&&(s.clearColor(lt,Xt,ne,Pe),et.copy(at))},reset:function(){I=!1,B=null,et.set(-1,0,0,0)}}}function r(){let I=!1,at=null,B=null,et=null;return{setTest:function(lt){lt?ft(s.DEPTH_TEST):Jt(s.DEPTH_TEST)},setMask:function(lt){at!==lt&&!I&&(s.depthMask(lt),at=lt)},setFunc:function(lt){if(B!==lt){switch(lt){case Sd:s.depthFunc(s.NEVER);break;case Ed:s.depthFunc(s.ALWAYS);break;case Td:s.depthFunc(s.LESS);break;case Wr:s.depthFunc(s.LEQUAL);break;case wd:s.depthFunc(s.EQUAL);break;case Ad:s.depthFunc(s.GEQUAL);break;case Rd:s.depthFunc(s.GREATER);break;case Cd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}B=lt}},setLocked:function(lt){I=lt},setClear:function(lt){et!==lt&&(s.clearDepth(lt),et=lt)},reset:function(){I=!1,at=null,B=null,et=null}}}function a(){let I=!1,at=null,B=null,et=null,lt=null,Xt=null,ne=null,Pe=null,en=null;return{setTest:function(ie){I||(ie?ft(s.STENCIL_TEST):Jt(s.STENCIL_TEST))},setMask:function(ie){at!==ie&&!I&&(s.stencilMask(ie),at=ie)},setFunc:function(ie,Ge,Mn){(B!==ie||et!==Ge||lt!==Mn)&&(s.stencilFunc(ie,Ge,Mn),B=ie,et=Ge,lt=Mn)},setOp:function(ie,Ge,Mn){(Xt!==ie||ne!==Ge||Pe!==Mn)&&(s.stencilOp(ie,Ge,Mn),Xt=ie,ne=Ge,Pe=Mn)},setLocked:function(ie){I=ie},setClear:function(ie){en!==ie&&(s.clearStencil(ie),en=ie)},reset:function(){I=!1,at=null,B=null,et=null,lt=null,Xt=null,ne=null,Pe=null,en=null}}}let o=new i,l=new r,c=new a,h=new WeakMap,u=new WeakMap,d={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,x=null,w=null,R=null,E=null,A=null,U=null,L=new zt(0,0,0),y=0,S=!1,V=null,W=null,C=null,X=null,z=null,Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,Y=0,tt=s.getParameter(s.VERSION);tt.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(tt)[1]),q=Y>=1):tt.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),q=Y>=2);let it=null,dt={},Lt=s.getParameter(s.SCISSOR_BOX),H=s.getParameter(s.VIEWPORT),K=new Le().fromArray(Lt),ut=new Le().fromArray(H);function Tt(I,at,B,et){let lt=new Uint8Array(4),Xt=s.createTexture();s.bindTexture(I,Xt),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ne=0;ne<B;ne++)n&&(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)?s.texImage3D(at,0,s.RGBA,1,1,et,0,s.RGBA,s.UNSIGNED_BYTE,lt):s.texImage2D(at+ne,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,lt);return Xt}let vt={};vt[s.TEXTURE_2D]=Tt(s.TEXTURE_2D,s.TEXTURE_2D,1),vt[s.TEXTURE_CUBE_MAP]=Tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(vt[s.TEXTURE_2D_ARRAY]=Tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),vt[s.TEXTURE_3D]=Tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ft(s.DEPTH_TEST),l.setFunc(Wr),Ft(!1),Gt(pc),ft(s.CULL_FACE),bt(ni);function ft(I){d[I]!==!0&&(s.enable(I),d[I]=!0)}function Jt(I){d[I]!==!1&&(s.disable(I),d[I]=!1)}function wt(I,at){return f[I]!==at?(s.bindFramebuffer(I,at),f[I]=at,n&&(I===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=at),I===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=at)),!0):!1}function N(I,at){let B=v,et=!1;if(I){B=g.get(at),B===void 0&&(B=[],g.set(at,B));let lt=I.textures;if(B.length!==lt.length||B[0]!==s.COLOR_ATTACHMENT0){for(let Xt=0,ne=lt.length;Xt<ne;Xt++)B[Xt]=s.COLOR_ATTACHMENT0+Xt;B.length=lt.length,et=!0}}else B[0]!==s.BACK&&(B[0]=s.BACK,et=!0);if(et)if(e.isWebGL2)s.drawBuffers(B);else if(t.has("WEBGL_draw_buffers")===!0)t.get("WEBGL_draw_buffers").drawBuffersWEBGL(B);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function Ce(I){return m!==I?(s.useProgram(I),m=I,!0):!1}let yt={[Ei]:s.FUNC_ADD,[ld]:s.FUNC_SUBTRACT,[cd]:s.FUNC_REVERSE_SUBTRACT};if(n)yt[vc]=s.MIN,yt[xc]=s.MAX;else{let I=t.get("EXT_blend_minmax");I!==null&&(yt[vc]=I.MIN_EXT,yt[xc]=I.MAX_EXT)}let Ht={[hd]:s.ZERO,[ud]:s.ONE,[dd]:s.SRC_COLOR,[ko]:s.SRC_ALPHA,[xd]:s.SRC_ALPHA_SATURATE,[gd]:s.DST_COLOR,[pd]:s.DST_ALPHA,[fd]:s.ONE_MINUS_SRC_COLOR,[Bo]:s.ONE_MINUS_SRC_ALPHA,[vd]:s.ONE_MINUS_DST_COLOR,[md]:s.ONE_MINUS_DST_ALPHA,[yd]:s.CONSTANT_COLOR,[_d]:s.ONE_MINUS_CONSTANT_COLOR,[bd]:s.CONSTANT_ALPHA,[Md]:s.ONE_MINUS_CONSTANT_ALPHA};function bt(I,at,B,et,lt,Xt,ne,Pe,en,ie){if(I===ni){p===!0&&(Jt(s.BLEND),p=!1);return}if(p===!1&&(ft(s.BLEND),p=!0),I!==od){if(I!==M||ie!==S){if((x!==Ei||E!==Ei)&&(s.blendEquation(s.FUNC_ADD),x=Ei,E=Ei),ie)switch(I){case rs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ri:s.blendFunc(s.ONE,s.ONE);break;case mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case rs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ri:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}w=null,R=null,A=null,U=null,L.set(0,0,0),y=0,M=I,S=ie}return}lt=lt||at,Xt=Xt||B,ne=ne||et,(at!==x||lt!==E)&&(s.blendEquationSeparate(yt[at],yt[lt]),x=at,E=lt),(B!==w||et!==R||Xt!==A||ne!==U)&&(s.blendFuncSeparate(Ht[B],Ht[et],Ht[Xt],Ht[ne]),w=B,R=et,A=Xt,U=ne),(Pe.equals(L)===!1||en!==y)&&(s.blendColor(Pe.r,Pe.g,Pe.b,en),L.copy(Pe),y=en),M=I,S=!1}function qt(I,at){I.side===ue?Jt(s.CULL_FACE):ft(s.CULL_FACE);let B=I.side===$e;at&&(B=!B),Ft(B),I.blending===rs&&I.transparent===!1?bt(ni):bt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),o.setMask(I.colorWrite);let et=I.stencilWrite;c.setTest(et),et&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),T(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ft(s.SAMPLE_ALPHA_TO_COVERAGE):Jt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(I){V!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),V=I)}function Gt(I){I!==sd?(ft(s.CULL_FACE),I!==W&&(I===pc?s.cullFace(s.BACK):I===rd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Jt(s.CULL_FACE),W=I}function pe(I){I!==C&&(q&&s.lineWidth(I),C=I)}function T(I,at,B){I?(ft(s.POLYGON_OFFSET_FILL),(X!==at||z!==B)&&(s.polygonOffset(at,B),X=at,z=B)):Jt(s.POLYGON_OFFSET_FILL)}function _(I){I?ft(s.SCISSOR_TEST):Jt(s.SCISSOR_TEST)}function G(I){I===void 0&&(I=s.TEXTURE0+Z-1),it!==I&&(s.activeTexture(I),it=I)}function $(I,at,B){B===void 0&&(it===null?B=s.TEXTURE0+Z-1:B=it);let et=dt[B];et===void 0&&(et={type:void 0,texture:void 0},dt[B]=et),(et.type!==I||et.texture!==at)&&(it!==B&&(s.activeTexture(B),it=B),s.bindTexture(I,at||vt[I]),et.type=I,et.texture=at)}function j(){let I=dt[it];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function J(){try{s.compressedTexImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Dt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Mt(){try{s.texSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function st(){try{s.texSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ot(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ut(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{s.texStorage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xe(){try{s.texStorage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Vt(){try{s.texImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{s.texImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(I){K.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),K.copy(I))}function mt(I){ut.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),ut.copy(I))}function Yt(I,at){let B=u.get(at);B===void 0&&(B=new WeakMap,u.set(at,B));let et=B.get(I);et===void 0&&(et=s.getUniformBlockIndex(at,I.name),B.set(I,et))}function Ct(I,at){let et=u.get(at).get(I);h.get(at)!==et&&(s.uniformBlockBinding(at,et,I.__bindingPointIndex),h.set(at,et))}function re(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},it=null,dt={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,x=null,w=null,R=null,E=null,A=null,U=null,L=new zt(0,0,0),y=0,S=!1,V=null,W=null,C=null,X=null,z=null,K.set(0,0,s.canvas.width,s.canvas.height),ut.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:ft,disable:Jt,bindFramebuffer:wt,drawBuffers:N,useProgram:Ce,setBlending:bt,setMaterial:qt,setFlipSided:Ft,setCullFace:Gt,setLineWidth:pe,setPolygonOffset:T,setScissorTest:_,activeTexture:G,bindTexture:$,unbindTexture:j,compressedTexImage2D:J,compressedTexImage3D:Dt,texImage2D:Vt,texImage3D:xt,updateUBOMapping:Yt,uniformBlockBinding:Ct,texStorage2D:Q,texStorage3D:xe,texSubImage2D:Mt,texSubImage3D:st,compressedTexSubImage2D:ot,compressedTexSubImage3D:Ut,scissor:pt,viewport:mt,reset:re}}function lv(s,t,e,n,i,r,a){let o=i.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ct,u=new WeakMap,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(T){}function v(T,_){return g?new OffscreenCanvas(T,_):jr("canvas")}function m(T,_,G,$){let j=1,J=pe(T);if((J.width>$||J.height>$)&&(j=$/Math.max(J.width,J.height)),j<1||_===!0)if(typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&T instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&T instanceof ImageBitmap||typeof VideoFrame!="undefined"&&T instanceof VideoFrame){let Dt=_?Kr:Math.floor,Mt=Dt(j*J.width),st=Dt(j*J.height);d===void 0&&(d=v(Mt,st));let ot=G?v(Mt,st):d;return ot.width=Mt,ot.height=st,ot.getContext("2d").drawImage(T,0,0,Mt,st),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Mt+"x"+st+")."),ot}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function p(T){let _=pe(T);return Vo(_.width)&&Vo(_.height)}function M(T){return o?!1:T.wrapS!==mn||T.wrapT!==mn||T.minFilter!==Xe&&T.minFilter!==Ie}function x(T,_){return T.generateMipmaps&&_&&T.minFilter!==Xe&&T.minFilter!==Ie}function w(T){s.generateMipmap(T)}function R(T,_,G,$,j=!1){if(o===!1)return _;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let J=_;if(_===s.RED&&(G===s.FLOAT&&(J=s.R32F),G===s.HALF_FLOAT&&(J=s.R16F),G===s.UNSIGNED_BYTE&&(J=s.R8)),_===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.R8UI),G===s.UNSIGNED_SHORT&&(J=s.R16UI),G===s.UNSIGNED_INT&&(J=s.R32UI),G===s.BYTE&&(J=s.R8I),G===s.SHORT&&(J=s.R16I),G===s.INT&&(J=s.R32I)),_===s.RG&&(G===s.FLOAT&&(J=s.RG32F),G===s.HALF_FLOAT&&(J=s.RG16F),G===s.UNSIGNED_BYTE&&(J=s.RG8)),_===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.RG8UI),G===s.UNSIGNED_SHORT&&(J=s.RG16UI),G===s.UNSIGNED_INT&&(J=s.RG32UI),G===s.BYTE&&(J=s.RG8I),G===s.SHORT&&(J=s.RG16I),G===s.INT&&(J=s.RG32I)),_===s.RGBA){let Dt=j?Yr:jt.getTransfer($);G===s.FLOAT&&(J=s.RGBA32F),G===s.HALF_FLOAT&&(J=s.RGBA16F),G===s.UNSIGNED_BYTE&&(J=Dt===se?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function E(T,_,G){return x(T,G)===!0||T.isFramebufferTexture&&T.minFilter!==Xe&&T.minFilter!==Ie?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function A(T){return T===Xe||T===yc||T===Es?s.NEAREST:s.LINEAR}function U(T){let _=T.target;_.removeEventListener("dispose",U),y(_),_.isVideoTexture&&u.delete(_)}function L(T){let _=T.target;_.removeEventListener("dispose",L),V(_)}function y(T){let _=n.get(T);if(_.__webglInit===void 0)return;let G=T.source,$=f.get(G);if($){let j=$[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(T),Object.keys($).length===0&&f.delete(G)}n.remove(T)}function S(T){let _=n.get(T);s.deleteTexture(_.__webglTexture);let G=T.source,$=f.get(G);delete $[_.__cacheKey],a.memory.textures--}function V(T){let _=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let j=0;j<_.__webglFramebuffer[$].length;j++)s.deleteFramebuffer(_.__webglFramebuffer[$][j]);else s.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)s.deleteFramebuffer(_.__webglFramebuffer[$]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let G=T.textures;for(let $=0,j=G.length;$<j;$++){let J=n.get(G[$]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(G[$])}n.remove(T)}let W=0;function C(){W=0}function X(){let T=W;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),W+=1,T}function z(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function Z(T,_){let G=n.get(T);if(T.isVideoTexture&&Ft(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){let $=T.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ut(G,T,_);return}}e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+_)}function q(T,_){let G=n.get(T);if(T.version>0&&G.__version!==T.version){ut(G,T,_);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+_)}function Y(T,_){let G=n.get(T);if(T.version>0&&G.__version!==T.version){ut(G,T,_);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+_)}function tt(T,_){let G=n.get(T);if(T.version>0&&G.__version!==T.version){Tt(G,T,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+_)}let it={[Tn]:s.REPEAT,[mn]:s.CLAMP_TO_EDGE,[zo]:s.MIRRORED_REPEAT},dt={[Xe]:s.NEAREST,[yc]:s.NEAREST_MIPMAP_NEAREST,[Es]:s.NEAREST_MIPMAP_LINEAR,[Ie]:s.LINEAR,[Qa]:s.LINEAR_MIPMAP_NEAREST,[wi]:s.LINEAR_MIPMAP_LINEAR},Lt={[Kd]:s.NEVER,[sf]:s.ALWAYS,[jd]:s.LESS,[eu]:s.LEQUAL,[Qd]:s.EQUAL,[nf]:s.GEQUAL,[tf]:s.GREATER,[ef]:s.NOTEQUAL};function H(T,_,G){if(_.type===Fn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ie||_.magFilter===Qa||_.magFilter===Es||_.magFilter===wi||_.minFilter===Ie||_.minFilter===Qa||_.minFilter===Es||_.minFilter===wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),G?(s.texParameteri(T,s.TEXTURE_WRAP_S,it[_.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,it[_.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,it[_.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,dt[_.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,dt[_.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(_.wrapS!==mn||_.wrapT!==mn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,A(_.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,A(_.minFilter)),_.minFilter!==Xe&&_.minFilter!==Ie&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,Lt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Xe||_.minFilter!==Es&&_.minFilter!==wi||_.type===Fn&&t.has("OES_texture_float_linear")===!1||o===!1&&_.type===Bs&&t.has("OES_texture_half_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let $=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function K(T,_){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",U));let $=_.source,j=f.get($);j===void 0&&(j={},f.set($,j));let J=z(_);if(J!==T.__cacheKey){j[J]===void 0&&(j[J]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),j[J].usedTimes++;let Dt=j[T.__cacheKey];Dt!==void 0&&(j[T.__cacheKey].usedTimes--,Dt.usedTimes===0&&S(_)),T.__cacheKey=J,T.__webglTexture=j[J].texture}return G}function ut(T,_,G){let $=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=s.TEXTURE_3D);let j=K(T,_),J=_.source;e.bindTexture($,T.__webglTexture,s.TEXTURE0+G);let Dt=n.get(J);if(J.version!==Dt.__version||j===!0){e.activeTexture(s.TEXTURE0+G);let Mt=jt.getPrimaries(jt.workingColorSpace),st=_.colorSpace===ti?null:jt.getPrimaries(_.colorSpace),ot=_.colorSpace===ti||Mt===st?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);let Ut=M(_)&&p(_.image)===!1,Q=m(_.image,Ut,!1,i.maxTextureSize);Q=Gt(_,Q);let xe=p(Q)||o,Vt=r.convert(_.format,_.colorSpace),xt=r.convert(_.type),pt=R(_.internalFormat,Vt,xt,_.colorSpace,_.isVideoTexture);H($,_,xe);let mt,Yt=_.mipmaps,Ct=o&&_.isVideoTexture!==!0&&pt!==tu,re=Dt.__version===void 0||j===!0,I=J.dataReady,at=E(_,Q,xe);if(_.isDepthTexture)pt=s.DEPTH_COMPONENT,o?_.type===Fn?pt=s.DEPTH_COMPONENT32F:_.type===ei?pt=s.DEPTH_COMPONENT24:_.type===Ri?pt=s.DEPTH24_STENCIL8:pt=s.DEPTH_COMPONENT16:_.type===Fn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===Ci&&pt===s.DEPTH_COMPONENT&&_.type!==wl&&_.type!==ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=ei,xt=r.convert(_.type)),_.format===hs&&pt===s.DEPTH_COMPONENT&&(pt=s.DEPTH_STENCIL,_.type!==Ri&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=Ri,xt=r.convert(_.type))),re&&(Ct?e.texStorage2D(s.TEXTURE_2D,1,pt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,pt,Q.width,Q.height,0,Vt,xt,null));else if(_.isDataTexture)if(Yt.length>0&&xe){Ct&&re&&e.texStorage2D(s.TEXTURE_2D,at,pt,Yt[0].width,Yt[0].height);for(let B=0,et=Yt.length;B<et;B++)mt=Yt[B],Ct?I&&e.texSubImage2D(s.TEXTURE_2D,B,0,0,mt.width,mt.height,Vt,xt,mt.data):e.texImage2D(s.TEXTURE_2D,B,pt,mt.width,mt.height,0,Vt,xt,mt.data);_.generateMipmaps=!1}else Ct?(re&&e.texStorage2D(s.TEXTURE_2D,at,pt,Q.width,Q.height),I&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Q.width,Q.height,Vt,xt,Q.data)):e.texImage2D(s.TEXTURE_2D,0,pt,Q.width,Q.height,0,Vt,xt,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ct&&re&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,pt,Yt[0].width,Yt[0].height,Q.depth);for(let B=0,et=Yt.length;B<et;B++)mt=Yt[B],_.format!==gn?Vt!==null?Ct?I&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,B,0,0,0,mt.width,mt.height,Q.depth,Vt,mt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,B,pt,mt.width,mt.height,Q.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?I&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,B,0,0,0,mt.width,mt.height,Q.depth,Vt,xt,mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,B,pt,mt.width,mt.height,Q.depth,0,Vt,xt,mt.data)}else{Ct&&re&&e.texStorage2D(s.TEXTURE_2D,at,pt,Yt[0].width,Yt[0].height);for(let B=0,et=Yt.length;B<et;B++)mt=Yt[B],_.format!==gn?Vt!==null?Ct?I&&e.compressedTexSubImage2D(s.TEXTURE_2D,B,0,0,mt.width,mt.height,Vt,mt.data):e.compressedTexImage2D(s.TEXTURE_2D,B,pt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?I&&e.texSubImage2D(s.TEXTURE_2D,B,0,0,mt.width,mt.height,Vt,xt,mt.data):e.texImage2D(s.TEXTURE_2D,B,pt,mt.width,mt.height,0,Vt,xt,mt.data)}else if(_.isDataArrayTexture)Ct?(re&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,pt,Q.width,Q.height,Q.depth),I&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Vt,xt,Q.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,pt,Q.width,Q.height,Q.depth,0,Vt,xt,Q.data);else if(_.isData3DTexture)Ct?(re&&e.texStorage3D(s.TEXTURE_3D,at,pt,Q.width,Q.height,Q.depth),I&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Vt,xt,Q.data)):e.texImage3D(s.TEXTURE_3D,0,pt,Q.width,Q.height,Q.depth,0,Vt,xt,Q.data);else if(_.isFramebufferTexture){if(re)if(Ct)e.texStorage2D(s.TEXTURE_2D,at,pt,Q.width,Q.height);else{let B=Q.width,et=Q.height;for(let lt=0;lt<at;lt++)e.texImage2D(s.TEXTURE_2D,lt,pt,B,et,0,Vt,xt,null),B>>=1,et>>=1}}else if(Yt.length>0&&xe){if(Ct&&re){let B=pe(Yt[0]);e.texStorage2D(s.TEXTURE_2D,at,pt,B.width,B.height)}for(let B=0,et=Yt.length;B<et;B++)mt=Yt[B],Ct?I&&e.texSubImage2D(s.TEXTURE_2D,B,0,0,Vt,xt,mt):e.texImage2D(s.TEXTURE_2D,B,pt,Vt,xt,mt);_.generateMipmaps=!1}else if(Ct){if(re){let B=pe(Q);e.texStorage2D(s.TEXTURE_2D,at,pt,B.width,B.height)}I&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Vt,xt,Q)}else e.texImage2D(s.TEXTURE_2D,0,pt,Vt,xt,Q);x(_,xe)&&w($),Dt.__version=J.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Tt(T,_,G){if(_.image.length!==6)return;let $=K(T,_),j=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+G);let J=n.get(j);if(j.version!==J.__version||$===!0){e.activeTexture(s.TEXTURE0+G);let Dt=jt.getPrimaries(jt.workingColorSpace),Mt=_.colorSpace===ti?null:jt.getPrimaries(_.colorSpace),st=_.colorSpace===ti||Dt===Mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);let ot=_.isCompressedTexture||_.image[0].isCompressedTexture,Ut=_.image[0]&&_.image[0].isDataTexture,Q=[];for(let B=0;B<6;B++)!ot&&!Ut?Q[B]=m(_.image[B],!1,!0,i.maxCubemapSize):Q[B]=Ut?_.image[B].image:_.image[B],Q[B]=Gt(_,Q[B]);let xe=Q[0],Vt=p(xe)||o,xt=r.convert(_.format,_.colorSpace),pt=r.convert(_.type),mt=R(_.internalFormat,xt,pt,_.colorSpace),Yt=o&&_.isVideoTexture!==!0,Ct=J.__version===void 0||$===!0,re=j.dataReady,I=E(_,xe,Vt);H(s.TEXTURE_CUBE_MAP,_,Vt);let at;if(ot){Yt&&Ct&&e.texStorage2D(s.TEXTURE_CUBE_MAP,I,mt,xe.width,xe.height);for(let B=0;B<6;B++){at=Q[B].mipmaps;for(let et=0;et<at.length;et++){let lt=at[et];_.format!==gn?xt!==null?Yt?re&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et,0,0,lt.width,lt.height,xt,lt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et,mt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?re&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et,0,0,lt.width,lt.height,xt,pt,lt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et,mt,lt.width,lt.height,0,xt,pt,lt.data)}}}else{if(at=_.mipmaps,Yt&&Ct){at.length>0&&I++;let B=pe(Q[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,I,mt,B.width,B.height)}for(let B=0;B<6;B++)if(Ut){Yt?re&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,0,0,Q[B].width,Q[B].height,xt,pt,Q[B].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,mt,Q[B].width,Q[B].height,0,xt,pt,Q[B].data);for(let et=0;et<at.length;et++){let Xt=at[et].image[B].image;Yt?re&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et+1,0,0,Xt.width,Xt.height,xt,pt,Xt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et+1,mt,Xt.width,Xt.height,0,xt,pt,Xt.data)}}else{Yt?re&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,0,0,xt,pt,Q[B]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,mt,xt,pt,Q[B]);for(let et=0;et<at.length;et++){let lt=at[et];Yt?re&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et+1,0,0,xt,pt,lt.image[B]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+B,et+1,mt,xt,pt,lt.image[B])}}}x(_,Vt)&&w(s.TEXTURE_CUBE_MAP),J.__version=j.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function vt(T,_,G,$,j,J){let Dt=r.convert(G.format,G.colorSpace),Mt=r.convert(G.type),st=R(G.internalFormat,Dt,Mt,G.colorSpace);if(!n.get(_).__hasExternalTextures){let Ut=Math.max(1,_.width>>J),Q=Math.max(1,_.height>>J);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,J,st,Ut,Q,_.depth,0,Dt,Mt,null):e.texImage2D(j,J,st,Ut,Q,0,Dt,Mt,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),qt(_)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,j,n.get(G).__webglTexture,0,bt(_)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,j,n.get(G).__webglTexture,J),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ft(T,_,G){if(s.bindRenderbuffer(s.RENDERBUFFER,T),_.depthBuffer&&!_.stencilBuffer){let $=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(G||qt(_)){let j=_.depthTexture;j&&j.isDepthTexture&&(j.type===Fn?$=s.DEPTH_COMPONENT32F:j.type===ei&&($=s.DEPTH_COMPONENT24));let J=bt(_);qt(_)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,J,$,_.width,_.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,J,$,_.width,_.height)}else s.renderbufferStorage(s.RENDERBUFFER,$,_.width,_.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(_.depthBuffer&&_.stencilBuffer){let $=bt(_);G&&qt(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,_.width,_.height):qt(_)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{let $=_.textures;for(let j=0;j<$.length;j++){let J=$[j],Dt=r.convert(J.format,J.colorSpace),Mt=r.convert(J.type),st=R(J.internalFormat,Dt,Mt,J.colorSpace),ot=bt(_);G&&qt(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,st,_.width,_.height):qt(_)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot,st,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,st,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Jt(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z(_.depthTexture,0);let $=n.get(_.depthTexture).__webglTexture,j=bt(_);if(_.depthTexture.format===Ci)qt(_)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0);else if(_.depthTexture.format===hs)qt(_)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function wt(T){let _=n.get(T),G=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Jt(_.__webglFramebuffer,T)}else if(G){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]=s.createRenderbuffer(),ft(_.__webglDepthbuffer[$],T,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=s.createRenderbuffer(),ft(_.__webglDepthbuffer,T,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function N(T,_,G){let $=n.get(T);_!==void 0&&vt($.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&wt(T)}function Ce(T){let _=T.texture,G=n.get(T),$=n.get(_);T.addEventListener("dispose",L);let j=T.textures,J=T.isWebGLCubeRenderTarget===!0,Dt=j.length>1,Mt=p(T)||o;if(Dt||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=_.version,a.memory.textures++),J){G.__webglFramebuffer=[];for(let st=0;st<6;st++)if(o&&_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer[st]=[];for(let ot=0;ot<_.mipmaps.length;ot++)G.__webglFramebuffer[st][ot]=s.createFramebuffer()}else G.__webglFramebuffer[st]=s.createFramebuffer()}else{if(o&&_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer=[];for(let st=0;st<_.mipmaps.length;st++)G.__webglFramebuffer[st]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(Dt)if(i.drawBuffers)for(let st=0,ot=j.length;st<ot;st++){let Ut=n.get(j[st]);Ut.__webglTexture===void 0&&(Ut.__webglTexture=s.createTexture(),a.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&qt(T)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let st=0;st<j.length;st++){let ot=j[st];G.__webglColorRenderbuffer[st]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[st]);let Ut=r.convert(ot.format,ot.colorSpace),Q=r.convert(ot.type),xe=R(ot.internalFormat,Ut,Q,ot.colorSpace,T.isXRRenderTarget===!0),Vt=bt(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Vt,xe,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.RENDERBUFFER,G.__webglColorRenderbuffer[st])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),ft(G.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),H(s.TEXTURE_CUBE_MAP,_,Mt);for(let st=0;st<6;st++)if(o&&_.mipmaps&&_.mipmaps.length>0)for(let ot=0;ot<_.mipmaps.length;ot++)vt(G.__webglFramebuffer[st][ot],T,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+st,ot);else vt(G.__webglFramebuffer[st],T,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);x(_,Mt)&&w(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let st=0,ot=j.length;st<ot;st++){let Ut=j[st],Q=n.get(Ut);e.bindTexture(s.TEXTURE_2D,Q.__webglTexture),H(s.TEXTURE_2D,Ut,Mt),vt(G.__webglFramebuffer,T,Ut,s.COLOR_ATTACHMENT0+st,s.TEXTURE_2D,0),x(Ut,Mt)&&w(s.TEXTURE_2D)}e.unbindTexture()}else{let st=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?st=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(st,$.__webglTexture),H(st,_,Mt),o&&_.mipmaps&&_.mipmaps.length>0)for(let ot=0;ot<_.mipmaps.length;ot++)vt(G.__webglFramebuffer[ot],T,_,s.COLOR_ATTACHMENT0,st,ot);else vt(G.__webglFramebuffer,T,_,s.COLOR_ATTACHMENT0,st,0);x(_,Mt)&&w(st),e.unbindTexture()}T.depthBuffer&&wt(T)}function yt(T){let _=p(T)||o,G=T.textures;for(let $=0,j=G.length;$<j;$++){let J=G[$];if(x(J,_)){let Dt=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Mt=n.get(J).__webglTexture;e.bindTexture(Dt,Mt),w(Dt),e.unbindTexture()}}}function Ht(T){if(o&&T.samples>0&&qt(T)===!1){let _=T.textures,G=T.width,$=T.height,j=s.COLOR_BUFFER_BIT,J=[],Dt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Mt=n.get(T),st=_.length>1;if(st)for(let ot=0;ot<_.length;ot++)e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let ot=0;ot<_.length;ot++){J.push(s.COLOR_ATTACHMENT0+ot),T.depthBuffer&&J.push(Dt);let Ut=Mt.__ignoreDepthValues!==void 0?Mt.__ignoreDepthValues:!1;if(Ut===!1&&(T.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),st&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[ot]),Ut===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Dt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Dt])),st){let Q=n.get(_[ot]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Q,0)}s.blitFramebuffer(0,0,G,$,0,0,G,$,j,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,J)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),st)for(let ot=0;ot<_.length;ot++){e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[ot]);let Ut=n.get(_[ot]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,Ut,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}}function bt(T){return Math.min(i.maxSamples,T.samples)}function qt(T){let _=n.get(T);return o&&T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ft(T){let _=a.render.frame;u.get(T)!==_&&(u.set(T,_),T.update())}function Gt(T,_){let G=T.colorSpace,$=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===Go||G!==hi&&G!==ti&&(jt.getTransfer(G)===se?o===!1?t.has("EXT_sRGB")===!0&&$===gn?(T.format=Go,T.minFilter=Ie,T.generateMipmaps=!1):_=Qr.sRGBToLinear(_):($!==gn||j!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),_}function pe(T){return typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement?(h.width=T.naturalWidth||T.width,h.height=T.naturalHeight||T.height):typeof VideoFrame!="undefined"&&T instanceof VideoFrame?(h.width=T.displayWidth,h.height=T.displayHeight):(h.width=T.width,h.height=T.height),h}this.allocateTextureUnit=X,this.resetTextureUnits=C,this.setTexture2D=Z,this.setTexture2DArray=q,this.setTexture3D=Y,this.setTextureCube=tt,this.rebindTextures=N,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=qt}function cv(s,t,e){let n=e.isWebGL2;function i(r,a=ti){let o,l=jt.getTransfer(a);if(r===ii)return s.UNSIGNED_BYTE;if(r===Zh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Jh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Od)return s.BYTE;if(r===zd)return s.SHORT;if(r===wl)return s.UNSIGNED_SHORT;if(r===$h)return s.INT;if(r===ei)return s.UNSIGNED_INT;if(r===Fn)return s.FLOAT;if(r===Bs)return n?s.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Hd)return s.ALPHA;if(r===gn)return s.RGBA;if(r===Gd)return s.LUMINANCE;if(r===Vd)return s.LUMINANCE_ALPHA;if(r===Ci)return s.DEPTH_COMPONENT;if(r===hs)return s.DEPTH_STENCIL;if(r===Go)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Wd)return s.RED;if(r===Kh)return s.RED_INTEGER;if(r===Xd)return s.RG;if(r===jh)return s.RG_INTEGER;if(r===Qh)return s.RGBA_INTEGER;if(r===to||r===eo||r===no||r===io)if(l===se)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===to)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===eo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===no)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===io)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===to)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===eo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===no)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===io)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===_c||r===bc||r===Mc||r===Sc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===_c)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===bc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Mc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Sc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===tu)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ec||r===Tc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Ec)return l===se?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Tc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===wc||r===Ac||r===Rc||r===Cc||r===Pc||r===Ic||r===Lc||r===Dc||r===Uc||r===Nc||r===kc||r===Bc||r===Fc||r===Oc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===wc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ac)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Rc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Cc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Pc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ic)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Lc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Dc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Nc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===kc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Bc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Fc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Oc)return l===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===so||r===zc||r===Hc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===so)return l===se?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===zc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Hc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===qd||r===Gc||r===Vc||r===Wc)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===so)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Gc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Vc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Wc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ri?n?s.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var nl=class extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Zt=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},hv={type:"move"},Us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},uv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dv=`
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

}`,il=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new Qe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}render(t,e){if(this.texture!==null){if(this.mesh===null){let n=e.cameras[0].viewport,i=new wn({extensions:{fragDepth:!0},vertexShader:uv,fragmentShader:dv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new rt(new Ye(20,20),i)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}},sl=class extends ai{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,v=new il,m=e.getContextAttributes(),p=null,M=null,x=[],w=[],R=new ct,E=null,A=new qe;A.layers.enable(1),A.viewport=new Le;let U=new qe;U.layers.enable(2),U.viewport=new Le;let L=[A,U],y=new nl;y.layers.enable(1),y.layers.enable(2);let S=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let K=x[H];return K===void 0&&(K=new Us,x[H]=K),K.getTargetRaySpace()},this.getControllerGrip=function(H){let K=x[H];return K===void 0&&(K=new Us,x[H]=K),K.getGripSpace()},this.getHand=function(H){let K=x[H];return K===void 0&&(K=new Us,x[H]=K),K.getHandSpace()};function W(H){let K=w.indexOf(H.inputSource);if(K===-1)return;let ut=x[K];ut!==void 0&&(ut.update(H.inputSource,H.frame,c||a),ut.dispatchEvent({type:H.type,data:H.inputSource}))}function C(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",C),i.removeEventListener("inputsourceschange",X);for(let H=0;H<x.length;H++){let K=w[H];K!==null&&(w[H]=null,x[H].disconnect(K))}S=null,V=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,M=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",C),i.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(R),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let K={antialias:i.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,K),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Hn(f.framebufferWidth,f.framebufferHeight,{format:gn,type:ii,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let K=null,ut=null,Tt=null;m.depth&&(Tt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,K=m.stencil?hs:Ci,ut=m.stencil?Ri:ei);let vt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(vt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Hn(d.textureWidth,d.textureHeight,{format:gn,type:ii,depthTexture:new ca(d.textureWidth,d.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0});let ft=t.properties.get(M);ft.__ignoreDepthValues=d.ignoreDepthValues}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Lt.setContext(i),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function X(H){for(let K=0;K<H.removed.length;K++){let ut=H.removed[K],Tt=w.indexOf(ut);Tt>=0&&(w[Tt]=null,x[Tt].disconnect(ut))}for(let K=0;K<H.added.length;K++){let ut=H.added[K],Tt=w.indexOf(ut);if(Tt===-1){for(let ft=0;ft<x.length;ft++)if(ft>=w.length){w.push(ut),Tt=ft;break}else if(w[ft]===null){w[ft]=ut,Tt=ft;break}if(Tt===-1)break}let vt=x[Tt];vt&&vt.connect(ut)}}let z=new P,Z=new P;function q(H,K,ut){z.setFromMatrixPosition(K.matrixWorld),Z.setFromMatrixPosition(ut.matrixWorld);let Tt=z.distanceTo(Z),vt=K.projectionMatrix.elements,ft=ut.projectionMatrix.elements,Jt=vt[14]/(vt[10]-1),wt=vt[14]/(vt[10]+1),N=(vt[9]+1)/vt[5],Ce=(vt[9]-1)/vt[5],yt=(vt[8]-1)/vt[0],Ht=(ft[8]+1)/ft[0],bt=Jt*yt,qt=Jt*Ht,Ft=Tt/(-yt+Ht),Gt=Ft*-yt;K.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Gt),H.translateZ(Ft),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let pe=Jt+Ft,T=wt+Ft,_=bt-Gt,G=qt+(Tt-Gt),$=N*wt/T*pe,j=Ce*wt/T*pe;H.projectionMatrix.makePerspective(_,G,$,j,pe,T),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function Y(H,K){K===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(K.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;v.texture!==null&&(H.near=v.depthNear,H.far=v.depthFar),y.near=U.near=A.near=H.near,y.far=U.far=A.far=H.far,(S!==y.near||V!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),S=y.near,V=y.far,A.near=S,A.far=V,U.near=S,U.far=V,A.updateProjectionMatrix(),U.updateProjectionMatrix(),H.updateProjectionMatrix());let K=H.parent,ut=y.cameras;Y(y,K);for(let Tt=0;Tt<ut.length;Tt++)Y(ut[Tt],K);ut.length===2?q(y,A,U):y.projectionMatrix.copy(A.projectionMatrix),tt(H,y,K)};function tt(H,K,ut){ut===null?H.matrix.copy(K.matrixWorld):(H.matrix.copy(ut.matrixWorld),H.matrix.invert(),H.matrix.multiply(K.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(K.projectionMatrix),H.projectionMatrixInverse.copy(K.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Fs*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(H){l=H,d!==null&&(d.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return v.texture!==null};let it=null;function dt(H,K){if(h=K.getViewerPose(c||a),g=K,h!==null){let ut=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Tt=!1;ut.length!==y.cameras.length&&(y.cameras.length=0,Tt=!0);for(let ft=0;ft<ut.length;ft++){let Jt=ut[ft],wt=null;if(f!==null)wt=f.getViewport(Jt);else{let Ce=u.getViewSubImage(d,Jt);wt=Ce.viewport,ft===0&&(t.setRenderTargetTextures(M,Ce.colorTexture,d.ignoreDepthValues?void 0:Ce.depthStencilTexture),t.setRenderTarget(M))}let N=L[ft];N===void 0&&(N=new qe,N.layers.enable(ft),N.viewport=new Le,L[ft]=N),N.matrix.fromArray(Jt.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(Jt.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(wt.x,wt.y,wt.width,wt.height),ft===0&&(y.matrix.copy(N.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Tt===!0&&y.cameras.push(N)}let vt=i.enabledFeatures;if(vt&&vt.includes("depth-sensing")){let ft=u.getDepthInformation(ut[0]);ft&&ft.isValid&&ft.texture&&v.init(t,ft,i.renderState)}}for(let ut=0;ut<x.length;ut++){let Tt=w[ut],vt=x[ut];Tt!==null&&vt!==void 0&&vt.update(Tt,K,c||a)}v.render(t,y),it&&it(H,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}let Lt=new au;Lt.setAnimationLoop(dt),this.setAnimationLoop=function(H){it=H},this.dispose=function(){}}},Mi=new Gn,fv=new de;function pv(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ru(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,x,w){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,w)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$e&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$e&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),x=M.envMap,w=M.envMapRotation;if(x&&(m.envMap.value=x,Mi.copy(w),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),m.envMapRotation.value.setFromMatrix4(fv.makeRotationFromEuler(Mi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let R=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*R,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$e&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function mv(s,t,e,n){let i={},r={},a=[],o=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){let w=x.program;n.uniformBlockBinding(M,w)}function c(M,x){let w=i[M.id];w===void 0&&(g(M),w=h(M),i[M.id]=w,M.addEventListener("dispose",m));let R=x.program;n.updateUBOMapping(M,R);let E=t.render.frame;r[M.id]!==E&&(d(M),r[M.id]=E)}function h(M){let x=u();M.__bindingPointIndex=x;let w=s.createBuffer(),R=M.__size,E=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,R,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,w),w}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let x=i[M.id],w=M.uniforms,R=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let E=0,A=w.length;E<A;E++){let U=Array.isArray(w[E])?w[E]:[w[E]];for(let L=0,y=U.length;L<y;L++){let S=U[L];if(f(S,E,L,R)===!0){let V=S.__offset,W=Array.isArray(S.value)?S.value:[S.value],C=0;for(let X=0;X<W.length;X++){let z=W[X],Z=v(z);typeof z=="number"||typeof z=="boolean"?(S.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,V+C,S.__data)):z.isMatrix3?(S.__data[0]=z.elements[0],S.__data[1]=z.elements[1],S.__data[2]=z.elements[2],S.__data[3]=0,S.__data[4]=z.elements[3],S.__data[5]=z.elements[4],S.__data[6]=z.elements[5],S.__data[7]=0,S.__data[8]=z.elements[6],S.__data[9]=z.elements[7],S.__data[10]=z.elements[8],S.__data[11]=0):(z.toArray(S.__data,C),C+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,V,S.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,x,w,R){let E=M.value,A=x+"_"+w;if(R[A]===void 0)return typeof E=="number"||typeof E=="boolean"?R[A]=E:R[A]=E.clone(),!0;{let U=R[A];if(typeof E=="number"||typeof E=="boolean"){if(U!==E)return R[A]=E,!0}else if(U.equals(E)===!1)return U.copy(E),!0}return!1}function g(M){let x=M.uniforms,w=0,R=16;for(let A=0,U=x.length;A<U;A++){let L=Array.isArray(x[A])?x[A]:[x[A]];for(let y=0,S=L.length;y<S;y++){let V=L[y],W=Array.isArray(V.value)?V.value:[V.value];for(let C=0,X=W.length;C<X;C++){let z=W[C],Z=v(z),q=w%R;q!==0&&R-q<Z.boundary&&(w+=R-q),V.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=w,w+=Z.storage}}}let E=w%R;return E>0&&(w+=R-E),M.__size=w,M.__cache={},this}function v(M){let x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){let x=M.target;x.removeEventListener("dispose",m);let w=a.indexOf(x.__bindingPointIndex);a.splice(w,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(let M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}var ds=class{constructor(t={}){let{canvas:e=yf(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;let f=new Uint32Array(4),g=new Int32Array(4),v=null,m=null,p=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qt,this._useLegacyLights=!1,this.toneMapping=xn,this.toneMappingExposure=1;let x=this,w=!1,R=0,E=0,A=null,U=-1,L=null,y=new Le,S=new Le,V=null,W=new zt(0),C=0,X=e.width,z=e.height,Z=1,q=null,Y=null,tt=new Le(0,0,X,z),it=new Le(0,0,X,z),dt=!1,Lt=new oa,H=!1,K=!1,ut=null,Tt=new de,vt=new ct,ft=new P,Jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function wt(){return A===null?Z:1}let N=n;function Ce(b,D){for(let F=0;F<b.length;F++){let O=b[F],k=e.getContext(O,D);if(k!==null)return k}return null}try{let b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r162"),e.addEventListener("webglcontextlost",re,!1),e.addEventListener("webglcontextrestored",I,!1),e.addEventListener("webglcontextcreationerror",at,!1),N===null){let D=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&D.shift(),N=Ce(D,b),N===null)throw Ce(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&N instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let yt,Ht,bt,qt,Ft,Gt,pe,T,_,G,$,j,J,Dt,Mt,st,ot,Ut,Q,xe,Vt,xt,pt,mt;function Yt(){yt=new Ig(N),Ht=new Tg(N,yt,t),yt.init(Ht),xt=new cv(N,yt,Ht),bt=new ov(N,yt,Ht),qt=new Ug(N),Ft=new Z0,Gt=new lv(N,yt,bt,Ft,Ht,xt,qt),pe=new Ag(x),T=new Pg(x),_=new zf(N,Ht),pt=new Sg(N,yt,_,Ht),G=new Lg(N,_,qt,pt),$=new Fg(N,G,_,qt),Q=new Bg(N,Ht,Gt),st=new wg(Ft),j=new $0(x,pe,T,yt,Ht,pt,st),J=new pv(x,Ft),Dt=new K0,Mt=new iv(yt,Ht),Ut=new Mg(x,pe,T,bt,$,d,l),ot=new av(x,$,Ht),mt=new mv(N,qt,Ht,bt),xe=new Eg(N,yt,qt,Ht),Vt=new Dg(N,yt,qt,Ht),qt.programs=j.programs,x.capabilities=Ht,x.extensions=yt,x.properties=Ft,x.renderLists=Dt,x.shadowMap=ot,x.state=bt,x.info=qt}Yt();let Ct=new sl(x,N);this.xr=Ct,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let b=yt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=yt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(b){b!==void 0&&(Z=b,this.setSize(X,z,!1))},this.getSize=function(b){return b.set(X,z)},this.setSize=function(b,D,F=!0){if(Ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=b,z=D,e.width=Math.floor(b*Z),e.height=Math.floor(D*Z),F===!0&&(e.style.width=b+"px",e.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(X*Z,z*Z).floor()},this.setDrawingBufferSize=function(b,D,F){X=b,z=D,Z=F,e.width=Math.floor(b*F),e.height=Math.floor(D*F),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(y)},this.getViewport=function(b){return b.copy(tt)},this.setViewport=function(b,D,F,O){b.isVector4?tt.set(b.x,b.y,b.z,b.w):tt.set(b,D,F,O),bt.viewport(y.copy(tt).multiplyScalar(Z).round())},this.getScissor=function(b){return b.copy(it)},this.setScissor=function(b,D,F,O){b.isVector4?it.set(b.x,b.y,b.z,b.w):it.set(b,D,F,O),bt.scissor(S.copy(it).multiplyScalar(Z).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(b){bt.setScissorTest(dt=b)},this.setOpaqueSort=function(b){q=b},this.setTransparentSort=function(b){Y=b},this.getClearColor=function(b){return b.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(b=!0,D=!0,F=!0){let O=0;if(b){let k=!1;if(A!==null){let ht=A.texture.format;k=ht===Qh||ht===jh||ht===Kh}if(k){let ht=A.texture.type,gt=ht===ii||ht===ei||ht===wl||ht===Ri||ht===Zh||ht===Jh,_t=Ut.getClearColor(),St=Ut.getClearAlpha(),Ot=_t.r,At=_t.g,Pt=_t.b;gt?(f[0]=Ot,f[1]=At,f[2]=Pt,f[3]=St,N.clearBufferuiv(N.COLOR,0,f)):(g[0]=Ot,g[1]=At,g[2]=Pt,g[3]=St,N.clearBufferiv(N.COLOR,0,g))}else O|=N.COLOR_BUFFER_BIT}D&&(O|=N.DEPTH_BUFFER_BIT),F&&(O|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",re,!1),e.removeEventListener("webglcontextrestored",I,!1),e.removeEventListener("webglcontextcreationerror",at,!1),Dt.dispose(),Mt.dispose(),Ft.dispose(),pe.dispose(),T.dispose(),$.dispose(),pt.dispose(),mt.dispose(),j.dispose(),Ct.dispose(),Ct.removeEventListener("sessionstart",en),Ct.removeEventListener("sessionend",ie),ut&&(ut.dispose(),ut=null),Ge.stop()};function re(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let b=qt.autoReset,D=ot.enabled,F=ot.autoUpdate,O=ot.needsUpdate,k=ot.type;Yt(),qt.autoReset=b,ot.enabled=D,ot.autoUpdate=F,ot.needsUpdate=O,ot.type=k}function at(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function B(b){let D=b.target;D.removeEventListener("dispose",B),et(D)}function et(b){lt(b),Ft.remove(b)}function lt(b){let D=Ft.get(b).programs;D!==void 0&&(D.forEach(function(F){j.releaseProgram(F)}),b.isShaderMaterial&&j.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,F,O,k,ht){D===null&&(D=Jt);let gt=k.isMesh&&k.matrixWorld.determinant()<0,_t=Bu(b,D,F,O,k);bt.setMaterial(O,gt);let St=F.index,Ot=1;if(O.wireframe===!0){if(St=G.getWireframeAttribute(F),St===void 0)return;Ot=2}let At=F.drawRange,Pt=F.attributes.position,me=At.start*Ot,Je=(At.start+At.count)*Ot;ht!==null&&(me=Math.max(me,ht.start*Ot),Je=Math.min(Je,(ht.start+ht.count)*Ot)),St!==null?(me=Math.max(me,0),Je=Math.min(Je,St.count)):Pt!=null&&(me=Math.max(me,0),Je=Math.min(Je,Pt.count));let we=Je-me;if(we<0||we===1/0)return;pt.setup(k,O,_t,F,St);let Cn,ce=xe;if(St!==null&&(Cn=_.get(St),ce=Vt,ce.setIndex(Cn)),k.isMesh)O.wireframe===!0?(bt.setLineWidth(O.wireframeLinewidth*wt()),ce.setMode(N.LINES)):ce.setMode(N.TRIANGLES);else if(k.isLine){let Nt=O.linewidth;Nt===void 0&&(Nt=1),bt.setLineWidth(Nt*wt()),k.isLineSegments?ce.setMode(N.LINES):k.isLineLoop?ce.setMode(N.LINE_LOOP):ce.setMode(N.LINE_STRIP)}else k.isPoints?ce.setMode(N.POINTS):k.isSprite&&ce.setMode(N.TRIANGLES);if(k.isBatchedMesh)ce.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)ce.renderInstances(me,we,k.count);else if(F.isInstancedBufferGeometry){let Nt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Fa=Math.min(F.instanceCount,Nt);ce.renderInstances(me,we,Fa)}else ce.render(me,we)};function Xt(b,D,F){b.transparent===!0&&b.side===ue&&b.forceSinglePass===!1?(b.side=$e,b.needsUpdate=!0,er(b,D,F),b.side=si,b.needsUpdate=!0,er(b,D,F),b.side=ue):er(b,D,F)}this.compile=function(b,D,F=null){F===null&&(F=b),m=Mt.get(F),m.init(),M.push(m),F.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),b!==F&&b.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights(x._useLegacyLights);let O=new Set;return b.traverse(function(k){let ht=k.material;if(ht)if(Array.isArray(ht))for(let gt=0;gt<ht.length;gt++){let _t=ht[gt];Xt(_t,F,k),O.add(_t)}else Xt(ht,F,k),O.add(ht)}),M.pop(),m=null,O},this.compileAsync=function(b,D,F=null){let O=this.compile(b,D,F);return new Promise(k=>{function ht(){if(O.forEach(function(gt){Ft.get(gt).currentProgram.isReady()&&O.delete(gt)}),O.size===0){k(b);return}setTimeout(ht,10)}yt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let ne=null;function Pe(b){ne&&ne(b)}function en(){Ge.stop()}function ie(){Ge.start()}let Ge=new au;Ge.setAnimationLoop(Pe),typeof self!="undefined"&&Ge.setContext(self),this.setAnimationLoop=function(b){ne=b,Ct.setAnimationLoop(b),b===null?Ge.stop():Ge.start()},Ct.addEventListener("sessionstart",en),Ct.addEventListener("sessionend",ie),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Ct.enabled===!0&&Ct.isPresenting===!0&&(Ct.cameraAutoUpdate===!0&&Ct.updateCamera(D),D=Ct.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,D,A),m=Mt.get(b,M.length),m.init(),M.push(m),Tt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Lt.setFromProjectionMatrix(Tt),K=this.localClippingEnabled,H=st.init(this.clippingPlanes,K),v=Dt.get(b,p.length),v.init(),p.push(v),Mn(b,D,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(q,Y),this.info.render.frame++,H===!0&&st.beginShadows();let F=m.state.shadowsArray;if(ot.render(F,b,D),H===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Ct.enabled===!1||Ct.isPresenting===!1||Ct.hasDepthSensing()===!1)&&Ut.render(v,b),m.setupLights(x._useLegacyLights),D.isArrayCamera){let O=D.cameras;for(let k=0,ht=O.length;k<ht;k++){let gt=O[k];zl(v,b,gt,gt.viewport)}}else zl(v,b,D);A!==null&&(Gt.updateMultisampleRenderTarget(A),Gt.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,D),pt.resetDefaultState(),U=-1,L=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function Mn(b,D,F,O){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)F=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Lt.intersectsSprite(b)){O&&ft.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Tt);let gt=$.update(b),_t=b.material;_t.visible&&v.push(b,gt,_t,F,ft.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Lt.intersectsObject(b))){let gt=$.update(b),_t=b.material;if(O&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ft.copy(b.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),ft.copy(gt.boundingSphere.center)),ft.applyMatrix4(b.matrixWorld).applyMatrix4(Tt)),Array.isArray(_t)){let St=gt.groups;for(let Ot=0,At=St.length;Ot<At;Ot++){let Pt=St[Ot],me=_t[Pt.materialIndex];me&&me.visible&&v.push(b,gt,me,F,ft.z,Pt)}}else _t.visible&&v.push(b,gt,_t,F,ft.z,null)}}let ht=b.children;for(let gt=0,_t=ht.length;gt<_t;gt++)Mn(ht[gt],D,F,O)}function zl(b,D,F,O){let k=b.opaque,ht=b.transmissive,gt=b.transparent;m.setupLightsView(F),H===!0&&st.setGlobalState(x.clippingPlanes,F),ht.length>0&&ku(k,ht,D,F),O&&bt.viewport(y.copy(O)),k.length>0&&tr(k,D,F),ht.length>0&&tr(ht,D,F),gt.length>0&&tr(gt,D,F),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function ku(b,D,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;let ht=Ht.isWebGL2;ut===null&&(ut=new Hn(1,1,{generateMipmaps:!0,type:yt.has("EXT_color_buffer_half_float")?Bs:ii,minFilter:wi,samples:ht?4:0})),x.getDrawingBufferSize(vt),ht?ut.setSize(vt.x,vt.y):ut.setSize(Kr(vt.x),Kr(vt.y));let gt=x.getRenderTarget();x.setRenderTarget(ut),x.getClearColor(W),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();let _t=x.toneMapping;x.toneMapping=xn,tr(b,F,O),Gt.updateMultisampleRenderTarget(ut),Gt.updateRenderTargetMipmap(ut);let St=!1;for(let Ot=0,At=D.length;Ot<At;Ot++){let Pt=D[Ot],me=Pt.object,Je=Pt.geometry,we=Pt.material,Cn=Pt.group;if(we.side===ue&&me.layers.test(O.layers)){let ce=we.side;we.side=$e,we.needsUpdate=!0,Hl(me,F,O,Je,we,Cn),we.side=ce,we.needsUpdate=!0,St=!0}}St===!0&&(Gt.updateMultisampleRenderTarget(ut),Gt.updateRenderTargetMipmap(ut)),x.setRenderTarget(gt),x.setClearColor(W,C),x.toneMapping=_t}function tr(b,D,F){let O=D.isScene===!0?D.overrideMaterial:null;for(let k=0,ht=b.length;k<ht;k++){let gt=b[k],_t=gt.object,St=gt.geometry,Ot=O===null?gt.material:O,At=gt.group;_t.layers.test(F.layers)&&Hl(_t,D,F,St,Ot,At)}}function Hl(b,D,F,O,k,ht){b.onBeforeRender(x,D,F,O,k,ht),b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(x,D,F,O,b,ht),k.transparent===!0&&k.side===ue&&k.forceSinglePass===!1?(k.side=$e,k.needsUpdate=!0,x.renderBufferDirect(F,D,O,k,b,ht),k.side=si,k.needsUpdate=!0,x.renderBufferDirect(F,D,O,k,b,ht),k.side=ue):x.renderBufferDirect(F,D,O,k,b,ht),b.onAfterRender(x,D,F,O,k,ht)}function er(b,D,F){D.isScene!==!0&&(D=Jt);let O=Ft.get(b),k=m.state.lights,ht=m.state.shadowsArray,gt=k.state.version,_t=j.getParameters(b,k.state,ht,D,F),St=j.getProgramCacheKey(_t),Ot=O.programs;O.environment=b.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(b.isMeshStandardMaterial?T:pe).get(b.envMap||O.environment),O.envMapRotation=O.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Ot===void 0&&(b.addEventListener("dispose",B),Ot=new Map,O.programs=Ot);let At=Ot.get(St);if(At!==void 0){if(O.currentProgram===At&&O.lightsStateVersion===gt)return Vl(b,_t),At}else _t.uniforms=j.getUniforms(b),b.onBuild(F,_t,x),b.onBeforeCompile(_t,x),At=j.acquireProgram(_t,St),Ot.set(St,At),O.uniforms=_t.uniforms;let Pt=O.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pt.clippingPlanes=st.uniform),Vl(b,_t),O.needsLights=Ou(b),O.lightsStateVersion=gt,O.needsLights&&(Pt.ambientLightColor.value=k.state.ambient,Pt.lightProbe.value=k.state.probe,Pt.directionalLights.value=k.state.directional,Pt.directionalLightShadows.value=k.state.directionalShadow,Pt.spotLights.value=k.state.spot,Pt.spotLightShadows.value=k.state.spotShadow,Pt.rectAreaLights.value=k.state.rectArea,Pt.ltc_1.value=k.state.rectAreaLTC1,Pt.ltc_2.value=k.state.rectAreaLTC2,Pt.pointLights.value=k.state.point,Pt.pointLightShadows.value=k.state.pointShadow,Pt.hemisphereLights.value=k.state.hemi,Pt.directionalShadowMap.value=k.state.directionalShadowMap,Pt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Pt.spotShadowMap.value=k.state.spotShadowMap,Pt.spotLightMatrix.value=k.state.spotLightMatrix,Pt.spotLightMap.value=k.state.spotLightMap,Pt.pointShadowMap.value=k.state.pointShadowMap,Pt.pointShadowMatrix.value=k.state.pointShadowMatrix),O.currentProgram=At,O.uniformsList=null,At}function Gl(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=os.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function Vl(b,D){let F=Ft.get(b);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function Bu(b,D,F,O,k){D.isScene!==!0&&(D=Jt),Gt.resetTextureUnits();let ht=D.fog,gt=O.isMeshStandardMaterial?D.environment:null,_t=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:hi,St=(O.isMeshStandardMaterial?T:pe).get(O.envMap||gt),Ot=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,At=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Pt=!!F.morphAttributes.position,me=!!F.morphAttributes.normal,Je=!!F.morphAttributes.color,we=xn;O.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(we=x.toneMapping);let Cn=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ce=Cn!==void 0?Cn.length:0,Nt=Ft.get(O),Fa=m.state.lights;if(H===!0&&(K===!0||b!==L)){let nn=b===L&&O.id===U;st.setState(O,b,nn)}let ae=!1;O.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==Fa.state.version||Nt.outputColorSpace!==_t||k.isBatchedMesh&&Nt.batching===!1||!k.isBatchedMesh&&Nt.batching===!0||k.isInstancedMesh&&Nt.instancing===!1||!k.isInstancedMesh&&Nt.instancing===!0||k.isSkinnedMesh&&Nt.skinning===!1||!k.isSkinnedMesh&&Nt.skinning===!0||k.isInstancedMesh&&Nt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Nt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Nt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Nt.instancingMorph===!1&&k.morphTexture!==null||Nt.envMap!==St||O.fog===!0&&Nt.fog!==ht||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==st.numPlanes||Nt.numIntersection!==st.numIntersection)||Nt.vertexAlphas!==Ot||Nt.vertexTangents!==At||Nt.morphTargets!==Pt||Nt.morphNormals!==me||Nt.morphColors!==Je||Nt.toneMapping!==we||Ht.isWebGL2===!0&&Nt.morphTargetsCount!==ce)&&(ae=!0):(ae=!0,Nt.__version=O.version);let fi=Nt.currentProgram;ae===!0&&(fi=er(O,D,k));let Wl=!1,Ms=!1,Oa=!1,Ue=fi.getUniforms(),pi=Nt.uniforms;if(bt.useProgram(fi.program)&&(Wl=!0,Ms=!0,Oa=!0),O.id!==U&&(U=O.id,Ms=!0),Wl||L!==b){Ue.setValue(N,"projectionMatrix",b.projectionMatrix),Ue.setValue(N,"viewMatrix",b.matrixWorldInverse);let nn=Ue.map.cameraPosition;nn!==void 0&&nn.setValue(N,ft.setFromMatrixPosition(b.matrixWorld)),Ht.logarithmicDepthBuffer&&Ue.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Ue.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),L!==b&&(L=b,Ms=!0,Oa=!0)}if(k.isSkinnedMesh){Ue.setOptional(N,k,"bindMatrix"),Ue.setOptional(N,k,"bindMatrixInverse");let nn=k.skeleton;nn&&(Ht.floatVertexTextures?(nn.boneTexture===null&&nn.computeBoneTexture(),Ue.setValue(N,"boneTexture",nn.boneTexture,Gt)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}k.isBatchedMesh&&(Ue.setOptional(N,k,"batchingTexture"),Ue.setValue(N,"batchingTexture",k._matricesTexture,Gt));let za=F.morphAttributes;if((za.position!==void 0||za.normal!==void 0||za.color!==void 0&&Ht.isWebGL2===!0)&&Q.update(k,F,fi),(Ms||Nt.receiveShadow!==k.receiveShadow)&&(Nt.receiveShadow=k.receiveShadow,Ue.setValue(N,"receiveShadow",k.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(pi.envMap.value=St,pi.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),Ms&&(Ue.setValue(N,"toneMappingExposure",x.toneMappingExposure),Nt.needsLights&&Fu(pi,Oa),ht&&O.fog===!0&&J.refreshFogUniforms(pi,ht),J.refreshMaterialUniforms(pi,O,Z,z,ut),os.upload(N,Gl(Nt),pi,Gt)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(os.upload(N,Gl(Nt),pi,Gt),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Ue.setValue(N,"center",k.center),Ue.setValue(N,"modelViewMatrix",k.modelViewMatrix),Ue.setValue(N,"normalMatrix",k.normalMatrix),Ue.setValue(N,"modelMatrix",k.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){let nn=O.uniformsGroups;for(let Ha=0,zu=nn.length;Ha<zu;Ha++)if(Ht.isWebGL2){let Xl=nn[Ha];mt.update(Xl,fi),mt.bind(Xl,fi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return fi}function Fu(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function Ou(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,D,F){Ft.get(b.texture).__webglTexture=D,Ft.get(b.depthTexture).__webglTexture=F;let O=Ft.get(b);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||yt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,D){let F=Ft.get(b);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,F=0){A=b,R=D,E=F;let O=!0,k=null,ht=!1,gt=!1;if(b){let St=Ft.get(b);St.__useDefaultFramebuffer!==void 0?(bt.bindFramebuffer(N.FRAMEBUFFER,null),O=!1):St.__webglFramebuffer===void 0?Gt.setupRenderTarget(b):St.__hasExternalTextures&&Gt.rebindTextures(b,Ft.get(b.texture).__webglTexture,Ft.get(b.depthTexture).__webglTexture);let Ot=b.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(gt=!0);let At=Ft.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(At[D])?k=At[D][F]:k=At[D],ht=!0):Ht.isWebGL2&&b.samples>0&&Gt.useMultisampledRTT(b)===!1?k=Ft.get(b).__webglMultisampledFramebuffer:Array.isArray(At)?k=At[F]:k=At,y.copy(b.viewport),S.copy(b.scissor),V=b.scissorTest}else y.copy(tt).multiplyScalar(Z).floor(),S.copy(it).multiplyScalar(Z).floor(),V=dt;if(bt.bindFramebuffer(N.FRAMEBUFFER,k)&&Ht.drawBuffers&&O&&bt.drawBuffers(b,k),bt.viewport(y),bt.scissor(S),bt.setScissorTest(V),ht){let St=Ft.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,St.__webglTexture,F)}else if(gt){let St=Ft.get(b.texture),Ot=D||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,St.__webglTexture,F||0,Ot)}U=-1},this.readRenderTargetPixels=function(b,D,F,O,k,ht,gt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(_t=_t[gt]),_t){bt.bindFramebuffer(N.FRAMEBUFFER,_t);try{let St=b.texture,Ot=St.format,At=St.type;if(Ot!==gn&&xt.convert(Ot)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Pt=At===Bs&&(yt.has("EXT_color_buffer_half_float")||Ht.isWebGL2&&yt.has("EXT_color_buffer_float"));if(At!==ii&&xt.convert(At)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(At===Fn&&(Ht.isWebGL2||yt.has("OES_texture_float")||yt.has("WEBGL_color_buffer_float")))&&!Pt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-O&&F>=0&&F<=b.height-k&&N.readPixels(D,F,O,k,xt.convert(Ot),xt.convert(At),ht)}finally{let St=A!==null?Ft.get(A).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,St)}}},this.copyFramebufferToTexture=function(b,D,F=0){let O=Math.pow(2,-F),k=Math.floor(D.image.width*O),ht=Math.floor(D.image.height*O);Gt.setTexture2D(D,0),N.copyTexSubImage2D(N.TEXTURE_2D,F,0,0,b.x,b.y,k,ht),bt.unbindTexture()},this.copyTextureToTexture=function(b,D,F,O=0){let k=D.image.width,ht=D.image.height,gt=xt.convert(F.format),_t=xt.convert(F.type);Gt.setTexture2D(F,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment),D.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,O,b.x,b.y,k,ht,gt,_t,D.image.data):D.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,O,b.x,b.y,D.mipmaps[0].width,D.mipmaps[0].height,gt,D.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,O,b.x,b.y,gt,_t,D.image),O===0&&F.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),bt.unbindTexture()},this.copyTextureToTexture3D=function(b,D,F,O,k=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let ht=Math.round(b.max.x-b.min.x),gt=Math.round(b.max.y-b.min.y),_t=b.max.z-b.min.z+1,St=xt.convert(O.format),Ot=xt.convert(O.type),At;if(O.isData3DTexture)Gt.setTexture3D(O,0),At=N.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)Gt.setTexture2DArray(O,0),At=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,O.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,O.unpackAlignment);let Pt=N.getParameter(N.UNPACK_ROW_LENGTH),me=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Je=N.getParameter(N.UNPACK_SKIP_PIXELS),we=N.getParameter(N.UNPACK_SKIP_ROWS),Cn=N.getParameter(N.UNPACK_SKIP_IMAGES),ce=F.isCompressedTexture?F.mipmaps[k]:F.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,ce.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ce.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,b.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,b.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,b.min.z),F.isDataTexture||F.isData3DTexture?N.texSubImage3D(At,k,D.x,D.y,D.z,ht,gt,_t,St,Ot,ce.data):O.isCompressedArrayTexture?N.compressedTexSubImage3D(At,k,D.x,D.y,D.z,ht,gt,_t,St,ce.data):N.texSubImage3D(At,k,D.x,D.y,D.z,ht,gt,_t,St,Ot,ce),N.pixelStorei(N.UNPACK_ROW_LENGTH,Pt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,me),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Je),N.pixelStorei(N.UNPACK_SKIP_ROWS,we),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Cn),k===0&&O.generateMipmaps&&N.generateMipmap(At),bt.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?Gt.setTextureCube(b,0):b.isData3DTexture?Gt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Gt.setTexture2DArray(b,0):Gt.setTexture2D(b,0),bt.unbindTexture()},this.resetState=function(){R=0,E=0,A=null,bt.reset(),pt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Al?"display-p3":"srgb",e.unpackColorSpace=jt.workingColorSpace===ya?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},rl=class extends ds{};rl.prototype.isWebGL1Renderer=!0;var ha=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},fs=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentRotation=this.environmentRotation.toArray(),e}},al=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return iu("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ve=new P,ua=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Kt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=vn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array),r=Kt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new _e(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yn=class extends Vn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Qi,Cs=new P,ts=new P,es=new P,ns=new ct,Ps=new ct,du=new de,kr=new P,Is=new P,Br=new P,kh=new ct,Io=new ct,Bh=new ct,An=class extends Ze{constructor(t=new yn){if(super(),this.isSprite=!0,this.type="Sprite",Qi===void 0){Qi=new fe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new al(e,5);Qi.setIndex([0,1,2,0,2,3]),Qi.setAttribute("position",new ua(n,3,0,!1)),Qi.setAttribute("uv",new ua(n,2,3,!1))}this.geometry=Qi,this.material=t,this.center=new ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ts.setFromMatrixScale(this.matrixWorld),du.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),es.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ts.multiplyScalar(-es.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Fr(kr.set(-.5,-.5,0),es,a,ts,i,r),Fr(Is.set(.5,-.5,0),es,a,ts,i,r),Fr(Br.set(.5,.5,0),es,a,ts,i,r),kh.set(0,0),Io.set(1,0),Bh.set(1,1);let o=t.ray.intersectTriangle(kr,Is,Br,!1,Cs);if(o===null&&(Fr(Is.set(-.5,.5,0),es,a,ts,i,r),Io.set(0,1),o=t.ray.intersectTriangle(kr,Br,Is,!1,Cs),o===null))return;let l=t.ray.origin.distanceTo(Cs);l<t.near||l>t.far||e.push({distance:l,point:Cs.clone(),uv:Ai.getInterpolation(Cs,kr,Is,Br,kh,Io,Bh,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Fr(s,t,e,n,i,r){ns.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Ps.x=r*ns.x-i*ns.y,Ps.y=i*ns.x+r*ns.y):Ps.copy(ns),s.copy(t),s.x+=Ps.x,s.y+=Ps.y,s.applyMatrix4(du)}var ps=class extends Vn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Fh=new P,Oh=new P,zh=new de,Lo=new Os,Or=new Ii,ms=class extends Ze{constructor(t=new fe,e=new ps){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Fh.fromBufferAttribute(e,i-1),Oh.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Fh.distanceTo(Oh);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(i),Or.radius+=r,t.ray.intersectsSphere(Or)===!1)return;zh.copy(i).invert(),Lo.copy(t.ray).applyMatrix4(zh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new P,h=new P,u=new P,d=new P,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let x=p,w=M-1;x<w;x+=f){let R=g.getX(x),E=g.getX(x+1);if(c.fromBufferAttribute(m,R),h.fromBufferAttribute(m,E),Lo.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);let U=t.ray.origin.distanceTo(d);U<t.near||U>t.far||e.push({distance:U,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let x=p,w=M-1;x<w;x+=f){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),Lo.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);let E=t.ray.origin.distanceTo(d);E<t.near||E>t.far||e.push({distance:E,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};var Hs=class extends Vn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Hh=new de,ol=new Os,zr=new Ii,Hr=new P,da=class extends Ze{constructor(t=new fe,e=new Hs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(i),zr.radius+=r,t.ray.intersectsSphere(zr)===!1)return;Hh.copy(i).invert(),ol.copy(t.ray).applyMatrix4(Hh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,v=f;g<v;g++){let m=c.getX(g);Hr.fromBufferAttribute(u,m),Gh(Hr,m,l,i,t,e,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,v=f;g<v;g++)Hr.fromBufferAttribute(u,g),Gh(Hr,g,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gh(s,t,e,n,i,r,a){let o=ol.distanceSqToPoint(s);if(o<e){let l=new P;ol.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}var be=class extends Qe{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ln=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new ct:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,i=[],r=[],a=[],o=new P,l=new de;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Re(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Re(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Gs=class extends ln{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ct){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ll=class extends Gs{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Pl(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Gr=new P,Do=new Pl,Uo=new Pl,No=new Pl,cl=class extends ln{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Gr.subVectors(i[0],i[1]).add(i[0]),c=Gr);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Gr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Gr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Do.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),Uo.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),No.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Do.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Uo.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),No.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Do.calc(l),Uo.calc(l),No.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Vh(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function gv(s,t){let e=1-s;return e*e*t}function vv(s,t){return 2*(1-s)*s*t}function xv(s,t){return s*s*t}function Ns(s,t,e,n){return gv(s,t)+vv(s,e)+xv(s,n)}function yv(s,t){let e=1-s;return e*e*e*t}function _v(s,t){let e=1-s;return 3*e*e*s*t}function bv(s,t){return 3*(1-s)*s*s*t}function Mv(s,t){return s*s*s*t}function ks(s,t,e,n,i){return yv(s,t)+_v(s,e)+bv(s,n)+Mv(s,i)}var fa=class extends ln{constructor(t=new ct,e=new ct,n=new ct,i=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ct){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ks(t,i.x,r.x,a.x,o.x),ks(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},hl=class extends ln{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ks(t,i.x,r.x,a.x,o.x),ks(t,i.y,r.y,a.y,o.y),ks(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pa=class extends ln{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ul=class extends ln{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ma=class extends ln{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ns(t,i.x,r.x,a.x),Ns(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},dl=class extends ln{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ns(t,i.x,r.x,a.x),Ns(t,i.y,r.y,a.y),Ns(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ga=class extends ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Vh(o,l.x,c.x,h.x,u.x),Vh(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ct().fromArray(i))}return this}},Wh=Object.freeze({__proto__:null,ArcCurve:ll,CatmullRomCurve3:cl,CubicBezierCurve:fa,CubicBezierCurve3:hl,EllipseCurve:Gs,LineCurve:pa,LineCurve3:ul,QuadraticBezierCurve:ma,QuadraticBezierCurve3:dl,SplineCurve:ga}),fl=class extends ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Wh[i.type]().fromJSON(i))}return this}},pl=class extends fl{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new pa(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new ma(this.currentPoint.clone(),new ct(t,e),new ct(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new fa(this.currentPoint.clone(),new ct(t,e),new ct(n,i),new ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ga(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new Gs(t,e,n,i,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ml=class s extends fe{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Re(i,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,u=new P,d=new ct,f=new P,g=new P,v=new P,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let M=0;M<=e;M++){let x=n+M*h*i,w=Math.sin(x),R=Math.cos(x);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*w,u.y=t[E].y,u.z=t[E].x*R,a.push(u.x,u.y,u.z),d.x=M/e,d.y=E/(t.length-1),o.push(d.x,d.y);let A=l[3*E+0]*w,U=l[3*E+1],L=l[3*E+0]*R;c.push(A,U,L)}}for(let M=0;M<e;M++)for(let x=0;x<t.length-1;x++){let w=x+M*t.length,R=w,E=w+t.length,A=w+t.length+1,U=w+1;r.push(R,E,U),r.push(A,U,E)}this.setIndex(r),this.setAttribute("position",new te(a,3)),this.setAttribute("uv",new te(o,2)),this.setAttribute("normal",new te(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},li=class s extends ml{constructor(t=1,e=1,n=4,i=8){let r=new pl;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new s(t.radius,t.length,t.capSegments,t.radialSegments)}},gs=class s extends fe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new P,h=new ct;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new te(a,3)),this.setAttribute("normal",new te(o,3)),this.setAttribute("uv",new te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Wn=class s extends fe{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,v=[],m=n/2,p=0;M(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new te(u,3)),this.setAttribute("normal",new te(d,3)),this.setAttribute("uv",new te(f,2));function M(){let w=new P,R=new P,E=0,A=(e-t)/n;for(let U=0;U<=r;U++){let L=[],y=U/r,S=y*(e-t)+t;for(let V=0;V<=i;V++){let W=V/i,C=W*l+o,X=Math.sin(C),z=Math.cos(C);R.x=S*X,R.y=-y*n+m,R.z=S*z,u.push(R.x,R.y,R.z),w.set(X,A,z).normalize(),d.push(w.x,w.y,w.z),f.push(W,1-y),L.push(g++)}v.push(L)}for(let U=0;U<i;U++)for(let L=0;L<r;L++){let y=v[L][U],S=v[L+1][U],V=v[L+1][U+1],W=v[L][U+1];h.push(y,S,W),h.push(S,V,W),E+=6}c.addGroup(p,E,0),p+=E}function x(w){let R=g,E=new ct,A=new P,U=0,L=w===!0?t:e,y=w===!0?1:-1;for(let V=1;V<=i;V++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;let S=g;for(let V=0;V<=i;V++){let C=V/i*l+o,X=Math.cos(C),z=Math.sin(C);A.x=L*z,A.y=m*y,A.z=L*X,u.push(A.x,A.y,A.z),d.push(0,y,0),E.x=X*.5+.5,E.y=z*.5*y+.5,f.push(E.x,E.y),g++}for(let V=0;V<i;V++){let W=R+V,C=S+V;w===!0?h.push(C,C+1,W):h.push(C+1,C,W),U+=3}c.addGroup(p,U,w===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ci=class s extends Wn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Li=class s extends fe{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=t,d=(e-t)/i,f=new P,g=new ct;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){let p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<i;v++){let m=v*(n+1);for(let p=0;p<n;p++){let M=p+m,x=M,w=M+n+1,R=M+n+2,E=M+1;o.push(x,w,E),o.push(w,R,E)}}this.setIndex(o),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(c,3)),this.setAttribute("uv",new te(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ze=class s extends fe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new P,d=new P,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){let M=[],x=p/n,w=0;p===0&&a===0?w=.5/e:p===n&&l===Math.PI&&(w=-.5/e);for(let R=0;R<=e;R++){let E=R/e;u.x=-t*Math.cos(i+E*r)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(i+E*r)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(E+w,1-x),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let x=h[p][M+1],w=h[p][M],R=h[p+1][M],E=h[p+1][M+1];(p!==0||a>0)&&f.push(x,w,E),(p!==n-1||l<Math.PI)&&f.push(w,R,E)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(v,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Xn=class s extends fe{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new P,u=new P,d=new P;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let v=g/i*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,M=(i+1)*f+g;a.push(v,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(l,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var va=class extends ps{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function Vr(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Sv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var vs=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},gl=class extends vs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xc,endingEnd:Xc}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case qc:r=t,o=2*e-n;break;case Yc:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case qc:a=t,l=2*n-e;break;case Yc:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,M=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*v+.5*g,w=f*m-f*v;for(let R=0;R!==o;++R)r[R]=p*a[h+R]+M*a[c+R]+x*a[l+R]+w*a[u+R];return r}},vl=class extends vs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},xl=class extends vs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},_n=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Vr(e,this.TimeBufferType),this.values=Vr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Vr(t.times,Array),values:Vr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new xl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new vl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new gl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Xr:e=this.InterpolantFactoryMethodDiscrete;break;case qr:e=this.InterpolantFactoryMethodLinear;break;case ro:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xr;case this.InterpolantFactoryMethodLinear:return qr;case this.InterpolantFactoryMethodSmooth:return ro}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&Sv(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ro,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let v=e[u+g];if(v!==e[d+g]||v!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=qr;var Di=class extends _n{};Di.prototype.ValueTypeName="bool";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=Xr;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var yl=class extends _n{};yl.prototype.ValueTypeName="color";var _l=class extends _n{};_l.prototype.ValueTypeName="number";var bl=class extends vs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)oi.slerpFlat(r,0,a,c-o,a,c,l);return r}},Vs=class extends _n{InterpolantFactoryMethodLinear(t){return new bl(this.times,this.values,this.getValueSize(),t)}};Vs.prototype.ValueTypeName="quaternion";Vs.prototype.DefaultInterpolation=qr;Vs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends _n{};Ui.prototype.ValueTypeName="string";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=Xr;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Ml=class extends _n{};Ml.prototype.ValueTypeName="vector";var Sl=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},Ev=new Sl,El=class{constructor(t){this.manager=t!==void 0?t:Ev,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};El.DEFAULT_MATERIAL_NAME="__DEFAULT";var Il="\\[\\]\\.:\\/",Tv=new RegExp("["+Il+"]","g"),Ll="[^"+Il+"]",wv="[^"+Il.replace("\\.","")+"]",Av=/((?:WC+[\/:])*)/.source.replace("WC",Ll),Rv=/(WCOD+)?/.source.replace("WCOD",wv),Cv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ll),Pv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ll),Iv=new RegExp("^"+Av+Rv+Cv+Pv+"$"),Lv=["material","materials","bones","map"],Tl=class{constructor(t,e,n){let i=n||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},oe=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Tv,"")}static parseTrackName(t){let e=Iv.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Lv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=Tl;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ix=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"162"}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="162");function Et(s,t,e){return s<t?t:s>e?e:s}function Dv(s,t,e){return s+(t-s)*e}function Ws(s,t,e,n){return Dv(s,t,1-Math.exp(-e*n))}function fu(s){let t=s>>>0||2654435769;return(e,n)=>{t=t+1831565813>>>0;let i=t;i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61);let r=((i^i>>>14)>>>0)/4294967296;return e+r*(n-e)}}function cn(s,t,e,n){return Math.hypot(s-e,t-n)}var Dl=Math.PI*2;function Uv(s,t,e){let n=(t-s)%Dl;return n>Math.PI&&(n-=Dl),n<-Math.PI&&(n+=Dl),s+n*e}function ba(s,t,e,n){return Uv(s,t,1-Math.exp(-e*n))}var ve={halfWidth:4,halfLength:8,netHeight:2,netHalfWidth:3.95,antennaX:4.12},le={radius:.2,gravity:18,drag:.05},ee={radius:.42,moveSpeed:6,sprintSpeed:11,sprintDuration:.4,sprintCooldown:3,jumpVelocity:8,gravity:22,reach:1.75,chestHeight:1,spikeReachXZ:1.65,spikeMinY:2.25,spikeMaxY:4.3,hitCooldown:.28,hitGap:.1,diveStun:.8,serveMaxCharge:.9},He={pointsToWinSet:7,setsToWin:2,setSeconds:120,kickoffSeconds:3,pointSeconds:2,setEndSeconds:2.4};var pu=globalThis,qn=pu.__SAFEFX__===1||pu.__SAFEFX__===!0;Yn();function ui(s,t){let e=document.createElement("canvas");return e.width=s,e.height=t,[e,e.getContext("2d")]}function Ul(s,t,e,n,i=4){let r=12345,a=()=>(r=r*1103515245+12345&2147483647,r/2147483647);for(let o=0;o<e;o+=i)for(let l=0;l<t;l+=i){let c=a();s.fillStyle=c>.5?`rgba(255,255,255,${n*(c-.5)})`:`rgba(0,0,0,${n*(.5-c)})`,s.fillRect(l,o,i,i)}}function mu(){let[s,t]=ui(4,256),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#070d18"),e.addColorStop(.45,"#101c30"),e.addColorStop(.8,"#1d2c44"),e.addColorStop(1,"#27374f"),t.fillStyle=e,t.fillRect(0,0,4,256);let n=new be(s);return n.colorSpace=Qt,n}function gu(){let[s,t]=ui(128,128),e=t.createRadialGradient(64,64,4,64,64,62);return e.addColorStop(0,"rgba(8,14,24,0.6)"),e.addColorStop(.6,"rgba(8,14,24,0.26)"),e.addColorStop(1,"rgba(8,14,24,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),new be(s)}function vu(){let[s,t]=ui(512,256);t.fillStyle="#f6c445",t.fillRect(0,0,512,256),t.lineCap="round",t.strokeStyle="#2f57c8",t.lineWidth=14;for(let n=0;n<3;n++){let i=n*176+30;t.beginPath(),t.moveTo(i,16),t.bezierCurveTo(i+96,74,i-34,176,i+62,244),t.stroke()}t.strokeStyle="rgba(255,255,255,0.9)",t.lineWidth=7,t.beginPath(),t.moveTo(0,128),t.bezierCurveTo(128,92,384,168,512,128),t.stroke();let e=new be(s);return e.colorSpace=Qt,e}function Nv(){let s=Zl(),t=704,e=1104,n=t/14,i=e/22,[r,a]=ui(Math.round(t*s),Math.round(e*s));s!==1&&a.scale(s,s),a.fillStyle="#46587a",a.fillRect(0,0,t,e),Ul(a,t,e,.1);let o=3*n,l=3*i,c=8*n,h=16*i;a.fillStyle="#3a76d8",a.fillRect(o,l,c,h);let u=8*i;a.fillStyle="rgba(23,58,118,0.28)",a.fillRect(o,u,c,6*i);for(let g=0;g<5;g++){let v=(g+.5)*(e/5),m=a.createLinearGradient(0,v-40,0,v+40);m.addColorStop(0,"rgba(255,255,255,0)"),m.addColorStop(.5,"rgba(255,255,255,0.05)"),m.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=m,a.fillRect(0,v-40,t,80)}a.save(),a.beginPath(),a.rect(o,l,c,h),a.clip(),Ul(a,t,e,.08),a.restore(),a.strokeStyle="#f5f8ff",a.lineWidth=3,a.strokeRect(o,l,c,h),a.beginPath(),a.moveTo(o,e/2),a.lineTo(o+c,e/2),a.stroke();for(let g of[8,14])a.beginPath(),a.moveTo(o,g*i),a.lineTo(o+c,g*i),a.stroke();let d=a.createRadialGradient(t/2,e/2,e*.28,t/2,e/2,e*.62);d.addColorStop(0,"rgba(0,0,0,0)"),d.addColorStop(1,"rgba(6,10,18,0.35)"),a.fillStyle=d,a.fillRect(0,0,t,e);let f=new be(r);return f.colorSpace=Qt,f.anisotropy=8,f}function kv(){let[s,t]=ui(256,256);t.fillStyle="#2b3140",t.fillRect(0,0,256,256);for(let n=0;n<8;n++)t.fillStyle=n%2?"#2e3546":"#282e3c",t.fillRect(0,n*32,256,32),t.strokeStyle="rgba(12,16,24,0.5)",t.lineWidth=1,t.strokeRect(-1,n*32,258,32);Ul(t,256,256,.12);let e=new be(s);return e.wrapS=Tn,e.wrapT=Tn,e.repeat.set(10,10),e.colorSpace=Qt,e}function Bv(){let[s,t]=ui(256,128);t.clearRect(0,0,256,128),t.strokeStyle="rgba(16,22,32,0.72)",t.lineWidth=2;let e=16;for(let i=0;i<=256;i+=e)t.beginPath(),t.moveTo(i,0),t.lineTo(i,128),t.stroke();for(let i=0;i<=128;i+=e)t.beginPath(),t.moveTo(0,i),t.lineTo(256,i),t.stroke();let n=new be(s);return n.wrapS=Tn,n.wrapT=Tn,n.repeat.set(7,1),n.colorSpace=Qt,n}function Fv(){let[s,t]=ui(1024,64),e=t.createLinearGradient(0,0,1024,0);e.addColorStop(0,"#12308f"),e.addColorStop(.5,"#1555d8"),e.addColorStop(1,"#12308f"),t.fillStyle=e,t.fillRect(0,0,1024,64),t.fillStyle="rgba(255,255,255,0.92)",t.font='900 30px "PingFang SC","Microsoft YaHei",system-ui,sans-serif',t.textAlign="center",t.textBaseline="middle",["DANDAN","SUPER LEAGUE","SPIKE!","DANDAN"].forEach((r,a)=>{t.fillText(r,(a+.5)*256,26),t.fillStyle="rgba(255,255,255,0.5)",t.beginPath(),t.arc(a*256+250,32,3,0,Math.PI*2),t.fill(),t.fillStyle="rgba(255,255,255,0.92)"});let i=new be(s);return i.wrapS=Tn,i.colorSpace=Qt,i}function Ov(){let[s,t]=ui(512,128),e=t.createLinearGradient(0,0,0,128);e.addColorStop(0,"#141c2c"),e.addColorStop(1,"#0a0f1a"),t.fillStyle=e,t.fillRect(0,0,512,128);let n=777,i=()=>(n=n*1103515245+12345&2147483647,n/2147483647),r=["#3d4a63","#54627f","#2c3850","#6b7a99","#455273","#7a6a8c","#4a5f7a"];for(let o=0;o<7;o++)for(let l=0;l<64;l++)i()<.28||(t.fillStyle=r[Math.floor(i()*r.length)],t.fillRect(l*8+1,o*17+6,5,9));let a=new be(s);return a.wrapS=Tn,a.colorSpace=Qt,a}var Ma=class{constructor(){this.group=new Zt;this.floorMesh=null;this.beams=[];this.safe=!1;this.group.add(this.buildFloor()),this.group.add(this.buildNet()),this.group.add(this.buildBoards()),this.group.add(this.buildStands()),this.group.add(this.buildLights())}applySafeFallback(){if(!this.safe){if(this.safe=!0,this.floorMesh){let t=this.floorMesh.material;t.map&&(t.map.dispose(),t.map=null),t.color.setHex(3831512),t.needsUpdate=!0}for(let t of this.beams)t.visible=!1}}buildFloor(){let t=new Zt,e=new rt(new Ye(120,120),new It({map:kv()}));e.rotation.x=-Math.PI/2,e.position.y=-.04,t.add(e);let n=new rt(new Ye(14,22),qn?new It({color:3831512}):new It({map:Nv()}));return n.rotation.x=-Math.PI/2,n.position.y=.002,this.floorMesh=n,t.add(n),t}buildNet(){let t=new Zt,e=ve.netHalfWidth*2+.2,n=1.15,i=ve.netHeight,r=new rt(new Ye(e,i-n),new It({map:Bv(),transparent:!0,alphaTest:.12,side:ue,depthWrite:!1}));r.position.set(0,(i+n)/2,0),t.add(r);let a=new It({color:16054267}),o=new rt(new Oe(e+.1,.12,.07),a);o.position.set(0,i+.03,0),t.add(o);let l=new rt(new Oe(e,.05,.05),a);l.position.set(0,n,0),t.add(l);let c=new It({color:1916815}),h=new It({color:3752527});for(let f of[-ve.halfWidth-.3,ve.halfWidth+.3]){let g=new rt(new Oe(.24,2.5,.24),c);g.position.set(f,1.25,0),t.add(g);let v=new rt(new Wn(.3,.36,.12,14),h);v.position.set(f,.06,0),t.add(v)}let u=new It({color:16731486}),d=new It({color:16777215});for(let f of[-ve.antennaX,ve.antennaX])for(let g=0;g<4;g++){let v=new rt(new Wn(.026,.026,.25,8),g%2?u:d);v.position.set(f,i+.125+g*.25,0),t.add(v)}return t}buildBoards(){let t=new Zt,e=Fv(),n=e.clone();n.needsUpdate=!0,n.repeat.set(2,1);let i=new It({map:e}),r=new It({map:n}),a=.55,o=a/2+.02,l=(c,h,u,d,f)=>{let g=new rt(new Oe(c,a,h),f);g.position.set(u,o,d),t.add(g)};return l(16,.12,0,-12.6,i),l(16,.12,0,12.6,i),l(.12,24,-8.2,0,r),l(.12,24,8.2,0,r),t}buildStands(){let t=new Zt,e=Ov(),n=(i,r,a,o,l)=>{let c=e.clone();c.needsUpdate=!0,c.repeat.set(i/10,1);let h=new rt(new Ye(i,5),new It({map:c}));h.position.set(r,2.2,a),h.rotation.y=o,h.rotation.x=l,t.add(h)};return n(44,0,-16.5,0,-.32),n(30,-13.5,0,Math.PI/2,-.32),n(30,13.5,0,-Math.PI/2,-.32),n(44,0,17.5,Math.PI,.32),t}buildLights(){let t=new Zt,e=new It({color:16054783}),n=new It({color:12573951,transparent:!0,opacity:.05,blending:ri,depthWrite:!1,side:ue}),i=[[-5.5,-6],[5.5,-6],[-5.5,6],[5.5,6]];for(let[r,a]of i){let o=new rt(new Oe(2.4,.12,1.4),e);if(o.position.set(r,10.5,a),t.add(o),!qn){let l=new rt(new ci(2.6,10.4,20,1,!0),n);l.position.set(r,5.2,a),t.add(l),this.beams.push(l)}}return t}};function zv(){let s=document.createElement("canvas");s.width=128,s.height=128;let t=s.getContext("2d");t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=7,t.beginPath(),t.arc(64,64,48,0,Math.PI*2),t.stroke();let e=new be(s),n=new yn({map:e,transparent:!0,opacity:.9,depthWrite:!1,blending:ri}),i=new An(n);return i.scale.setScalar(1.1),i}var Sa=class{constructor(){this.group=new Zt;this.trailPts=new Float32Array(48);this.pulse=zv();this.t=0;this.visible=!0;let t=new ze(.2,24,16),e=new It({map:vu()});this.mesh=new rt(t,e),this.group.add(this.mesh);for(let r=0;r<16;r++)this.trailPts[r*3]=0,this.trailPts[r*3+1]=-50,this.trailPts[r*3+2]=0;let n=new fe;n.setAttribute("position",new _e(this.trailPts,3));let i=new ps({color:11990271,transparent:!0,opacity:.45,depthWrite:!1});this.trail=new ms(n,i),this.trail.frustumCulled=!1,this.group.add(this.trail),this.pulse.visible=!1,this.group.add(this.pulse)}setVisible(t){this.visible=t,this.group.visible=t}resetTrail(){for(let e=0;e<16;e++)this.trailPts[e*3]=0,this.trailPts[e*3+1]=-50,this.trailPts[e*3+2]=0;let t=this.trail.geometry;t.getAttribute("position").needsUpdate=!0}update(t,e,n,i,r){if(!this.visible)return;this.mesh.position.set(e,n,i);let a=this.trailPts;for(let l=15;l>0;l--)a[l*3]=a[(l-1)*3],a[l*3+1]=a[(l-1)*3+1],a[l*3+2]=a[(l-1)*3+2];a[0]=e,a[1]=n,a[2]=i;let o=this.trail.geometry;if(o.getAttribute("position").needsUpdate=!0,this.t+=t,this.pulse.visible=r,r){this.pulse.position.set(e,n,i);let l=.95+Math.sin(this.t*9)*.13;this.pulse.scale.setScalar(l),this.pulse.material.opacity=.55+Math.sin(this.t*9)*.25}}};Yn();var xu=["#f8cba6","#eab792","#d49a72","#b07a52"],yu=["#2e2622","#4a2f22","#1a2440","#c9932f","#e2643f","#3f3a63"],_u=["#22c55e","#16a34a","#4ade80","#0d9488"],bu=["#ff5d73","#fb7185","#f97362","#e1437a"],Hv=["#4dffa0","#ff8a7a"],Rt={head:new ze(.4,24,18),body:new li(.32,.16,8,20),arm:new li(.075,.22,4,10),leg:new li(.098,.22,4,10),sleeve:new li(.105,.06,4,12),cuff:new Xn(.104,.02,6,14),wrist:new Xn(.082,.022,6,14),hand:new ze(.088,10,8),shoe:new ze(.118,12,10),sole:new Oe(.22,.05,.33),sock:new Wn(.1,.107,.12,12),knee:new Xn(.1,.026,6,14),shorts:new Wn(.28,.26,.23,16),waist:new Xn(.268,.022,6,18),stripe:new Oe(.032,.3,.14),chestStripe:new Oe(.5,.07,.02),number:new Ye(.4,.4),badge:new Ye(.22,.22),sclera:new ze(.098,12,12),pupil:new ze(.048,10,10),glint:new ze(.026,8,8),brow:new Oe(.13,.032,.03),mouth:new Xn(.06,.016,6,12,Math.PI),cheek:new gs(.055,14),ear:new ze(.07,10,8),hairCap:new ze(.43,24,16,0,Math.PI*2,0,Math.PI*.42),hairBack:new ze(.4,20,14),hairBlob:new ze(.13,12,10),hairBun:new ze(.118,12,10),hairTail:new li(.078,.2,4,10),spike:new ci(.092,.21,8),headband:new Xn(.42,.03,8,22),ring:new Li(.46,.62,44),shadow:new Ye(1.45,1.45)},Gv=gu();function Xs(s,t){return new It({color:s})}function Vv(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}function Wv(s,t,e){let n=Jl(),i=document.createElement("canvas");i.width=Math.round(256*n),i.height=Math.round(112*n);let r=i.getContext("2d");n!==1&&r.scale(n,n),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font='700 36px "PingFang SC","Microsoft YaHei",system-ui,sans-serif',r.lineWidth=9,r.strokeStyle="rgba(9,26,44,0.82)",r.strokeText(s,128,34),r.fillStyle="#ffffff",r.fillText(s,128,34);let a=60,o=32;r.fillStyle=t,Vv(r,128-a/2,62,a,o,16),r.fill(),r.fillStyle="#08202f",r.font="900 24px system-ui,sans-serif",r.fillText(String(e).padStart(2,"0"),128,79);let l=new be(i);l.colorSpace=Qt;let c=new yn({map:l,transparent:!0,depthWrite:!1}),h=new An(c);return h.scale.set(2.35,1.03,1),h}function Xv(s,t){let e=document.createElement("canvas");e.width=128,e.height=128;let n=e.getContext("2d");n.textAlign="center",n.textBaseline="middle",n.lineJoin="round",n.beginPath(),n.arc(64,64,56,0,Math.PI*2),n.fillStyle="rgba(255,255,255,0.95)",n.fill(),n.lineWidth=8,n.strokeStyle=t,n.stroke(),n.font='900 64px "PingFang SC","Microsoft YaHei",system-ui,sans-serif',n.fillStyle="#1c2b3a",n.fillText(String(s),64,68);let i=new be(e);return i.colorSpace=Qt,i}var Ea=class{constructor(t,e){this.root=new Zt;this.rig=new Zt;this.head=new Zt;this.eyes=[];this.lArm=new Zt;this.rArm=new Zt;this.lLeg=new Zt;this.rLeg=new Zt;this.phase=Math.random()*Math.PI*2;this.cheerTimer=0;this.headBaseY=1.46;this.ownTextures=[];this.numberMeshes=[];let n=xu[e%xu.length],i=yu[(e*3+1)%yu.length],r=t.team===0?_u[e%_u.length]:bu[e%bu.length],a=Hv[t.team];this.blinkTimer=e*.7,this.blinkPeriod=3.1+e%3*.55;let o=Xs(r,.6),l=Xs(new zt(r).multiplyScalar(.6),.68),c=Xs(16777215,.5),h=Xs(n,.66),u=Xs(i,.74),d=new It({color:16777215}),f=new It({color:2498604}),g=new It({color:16777215}),v=new It({color:3813160}),m=new It({color:9056320}),p=new It({color:16748448,transparent:!0,opacity:.5,depthWrite:!1});this.shadowMat=new It({map:Gv,transparent:!0,opacity:.55,depthWrite:!1}),this.shadow=new rt(Rt.shadow,this.shadowMat),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.012,this.root.add(this.shadow),this.ringMat=new It({color:a,transparent:!0,opacity:.55,side:ue,depthWrite:!1}),this.ring=new rt(Rt.ring,this.ringMat),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=.02,this.root.add(this.ring),this.root.add(this.rig);let M=new rt(Rt.body,o);M.position.y=.8,this.rig.add(M);let x=new rt(Rt.waist,c);x.rotation.x=Math.PI/2,x.scale.setScalar(1.05),x.position.y=1.02,this.rig.add(x);let w=new rt(Rt.chestStripe,c);w.position.set(0,.82,.32),this.rig.add(w);for(let L of[-1,1]){let y=new rt(Rt.stripe,c);y.position.set(L*.302,.82,0),this.rig.add(y)}if(!qn){let L=Xv(t.id+1,r);this.ownTextures.push(L);let y=new It({map:L,transparent:!0,depthWrite:!1,toneMapped:!1}),S=new rt(Rt.number,y);S.position.set(0,.84,-.328),S.rotation.y=Math.PI,this.rig.add(S),this.numberMeshes.push(S);let V=new It({map:L,transparent:!0,depthWrite:!1,toneMapped:!1}),W=new rt(Rt.badge,V);W.position.set(.14,.68,.295),this.rig.add(W),this.numberMeshes.push(W)}let R=new rt(Rt.shorts,l);R.position.y=.545,this.rig.add(R);let E=new rt(Rt.waist,c);E.rotation.x=Math.PI/2,E.position.y=.655,this.rig.add(E);for(let L of[-1,1]){let y=new rt(Rt.stripe,c);y.scale.set(.7,.55,.55),y.position.set(L*.258,.55,0),this.rig.add(y)}this.head.position.y=this.headBaseY,this.rig.add(this.head);let A=new rt(Rt.head,h);this.head.add(A);for(let L of[-1,1]){let y=new rt(Rt.ear,h);y.position.set(L*.395,-.02,0),y.scale.set(.5,.75,.6),this.head.add(y)}this.buildHair(e,u,c);for(let L of[-1,1]){let y=new Zt;y.position.set(L*.145,.03,.36);let S=new rt(Rt.sclera,d);S.scale.set(1,1.25,.55),y.add(S);let V=new rt(Rt.pupil,f);V.position.set(0,-.005,.055),V.scale.set(1,1.3,.5),y.add(V);let W=new rt(Rt.glint,g);W.position.set(L*-.024,.05,.075),y.add(W),this.head.add(y),this.eyes.push(y)}for(let L of[-1,1]){let y=new rt(Rt.brow,v);y.position.set(L*.15,.175,.36),y.rotation.z=L*-.18,y.rotation.y=L*.28,this.head.add(y)}this.mouth=new rt(Rt.mouth,m),this.mouth.position.set(0,-.1,.385),this.mouth.rotation.z=Math.PI,this.head.add(this.mouth);for(let L of[-1,1]){let y=new rt(Rt.cheek,p);y.position.set(L*.24,-.06,.315),y.rotation.y=L*.62,this.head.add(y)}this.lArm.position.set(-.32,1.08,0),this.rArm.position.set(.32,1.08,0);for(let[L,y]of[[this.lArm,-1],[this.rArm,1]]){let S=new rt(Rt.arm,h);S.position.y=-.21,L.add(S);let V=new rt(Rt.sleeve,o);V.position.y=-.05,L.add(V);let W=new rt(Rt.cuff,c);W.rotation.x=Math.PI/2,W.position.y=-.16,L.add(W);let C=new rt(Rt.wrist,c);C.rotation.x=Math.PI/2,C.position.y=-.35,L.add(C);let X=new rt(Rt.hand,h);X.position.set(y*.004,-.415,0),L.add(X),this.rig.add(L)}this.lLeg.position.set(-.14,.56,0),this.rLeg.position.set(.14,.56,0);for(let L of[this.lLeg,this.rLeg]){let y=new rt(Rt.leg,h);y.position.y=-.19,L.add(y);let S=new rt(Rt.knee,c);S.rotation.x=Math.PI/2,S.position.y=-.225,L.add(S);let V=new rt(Rt.sock,c);V.position.y=-.33,L.add(V);let W=new rt(Rt.shoe,l);W.position.set(0,-.415,.05),W.scale.set(1.05,.72,1.5),L.add(W);let C=new rt(Rt.sole,c);C.position.set(0,-.478,.06),L.add(C),this.rig.add(L)}this.label=Wv(t.name,a,t.id+1),this.label.position.y=2.55,this.label.visible=!qn,this.root.add(this.label);let U=this.label.material.map;U&&this.ownTextures.push(U)}buildHair(t,e,n){let i=new Zt;this.head.add(i);let r=new rt(Rt.hairCap,e);r.rotation.y=t*.9,i.add(r);let a=new rt(Rt.hairBack,e);a.position.set(0,-.05,-.12),a.scale.set(1.07,1.06,.76),i.add(a);let o=t%4;if(o===0){for(let l of[-.17,0,.17]){let c=new rt(Rt.hairBlob,e);c.position.set(l,.22,.32),c.scale.set(1,.65,.85),i.add(c)}for(let l of[-1,1]){let c=new rt(Rt.hairBlob,e);c.position.set(l*.36,-.1,.03),c.scale.set(.55,1.2,.75),i.add(c)}}else if(o===1){let l=new rt(Rt.hairBlob,e);l.position.set(.02,.23,.31),l.scale.set(1.7,.65,.82),l.rotation.z=-.16,i.add(l);let c=new rt(Rt.hairBlob,e);c.position.set(-.35,-.08,.02),c.scale.set(.6,1.1,.7),i.add(c);let h=new rt(Rt.headband,n);h.rotation.x=Math.PI/2,h.position.y=.1,i.add(h)}else if(o===2){let l=new rt(Rt.hairBun,e);l.position.set(0,.13,-.39),l.scale.set(1.05,1.05,.9),i.add(l);let c=new rt(Rt.hairTail,e);c.position.set(0,-.17,-.46),c.rotation.x=-.22,c.scale.set(.9,1.2,.9),i.add(c);let h=new rt(Rt.hairBlob,e);h.position.set(0,.23,.31),h.scale.set(1.35,.65,.85),i.add(h)}else{for(let c of[-1,1]){let h=new rt(Rt.hairBun,e);h.position.set(c*.29,.27,-.04),h.scale.setScalar(.95),i.add(h)}for(let c=0;c<3;c++){let h=new rt(Rt.spike,e);h.position.set((c-1)*.15,.38,.09),h.rotation.z=(c-1)*-.5,h.rotation.x=-.2,i.add(h)}let l=new rt(Rt.hairBlob,e);l.position.set(0,.23,.31),l.scale.set(1.3,.65,.85),i.add(l)}}celebrate(){this.cheerTimer=1.6}applySafeFallback(){this.label.visible=!1;for(let t of this.numberMeshes)t.visible=!1}dispose(){this.root.traverse(t=>{let e=t;if(!e.isMesh&&!t.isSprite)return;let n=e.material,i=Array.isArray(n)?n:[n];for(let r of i)r.dispose()});for(let t of this.ownTextures)t.dispose();this.ownTextures.length=0,this.shadowMat.dispose(),this.ringMat.dispose()}update(t,e,n,i){this.root.position.x=e,this.root.position.z=n,this.root.rotation.y=i.facing,this.cheerTimer=Math.max(0,this.cheerTimer-t),this.phase+=t*(i.moving&&i.grounded?13:2.4);let r=0,a=0,o=0,l=0,c=0,h=i.pos.y,u=0,d=0,f=1,g=1;if(this.cheerTimer>0)o=-2.6,l=-2.6,u=Math.abs(Math.sin(this.phase*5))*.16,d=-.12,f=.34,g=1.9;else if(i.blocking)o=-2.95,l=-2.95,r=-.18,a=.18,c=.08,d=.06,f=.75;else switch(i.anim){case"run":{let x=Math.sin(this.phase);r=x*.85,a=-x*.85,o=-x*.75,l=x*.75,u=Math.abs(Math.sin(this.phase))*.05,d=.05;break}case"jump":{r=-.45,a=.3,o=-2.1,l=-2.1,d=-.08,f=.8;break}case"hit":{let x=1-Math.min(1,i.animTimer/.26),w=Math.sin(x*Math.PI);o=-2.2*w,l=-2.7*w,c=.16*w,d=.1*w,f=.62;break}case"dive":{c=1.25,h=.3,o=-2.4,l=-2.4,d=.15,f=.55;break}case"stun":{c=1.5,h=.22,o=-1.2,l=-1.2,d=.2,f=.45,g=-.9;break}default:{let x=Math.sin(this.phase);o=.06+x*.06,l=-.06-x*.06,u=Math.sin(this.phase*2)*.015,d=Math.sin(this.phase*.9)*.03;break}}this.rig.position.y=tn.damp(this.rig.position.y,h+u,26,t),this.rig.rotation.x=tn.damp(this.rig.rotation.x,c,16,t),this.lLeg.rotation.x=tn.damp(this.lLeg.rotation.x,r,20,t),this.rLeg.rotation.x=tn.damp(this.rLeg.rotation.x,a,20,t),this.lArm.rotation.x=tn.damp(this.lArm.rotation.x,o,20,t),this.rArm.rotation.x=tn.damp(this.rArm.rotation.x,l,20,t),this.lArm.rotation.z=tn.damp(this.lArm.rotation.z,-.08,12,t),this.rArm.rotation.z=tn.damp(this.rArm.rotation.z,.08,12,t),this.head.position.y=tn.damp(this.head.position.y,this.headBaseY+(i.moving?Math.abs(Math.sin(this.phase))*.02:Math.sin(this.phase)*.01),18,t),this.head.rotation.x=tn.damp(this.head.rotation.x,d,14,t),this.blinkTimer+=t;let p=this.blinkTimer%this.blinkPeriod>this.blinkPeriod-.12?.12:f;for(let x of this.eyes)x.scale.y=tn.damp(x.scale.y,p,36,t);this.mouth.scale.y=tn.damp(this.mouth.scale.y,g,14,t),this.label.position.y=2.55+i.pos.y;let M=Math.min(1,i.pos.y/1.5);this.shadow.scale.setScalar(1-M*.35),this.shadowMat.opacity=.55*(1-M*.65),this.ringMat.opacity=.5*(1-M*.5)}};var qv={pass:"\u4E00\u4F20",set:"\u4E8C\u4F20",send:"\u8FC7\u7F51",attack:"\u6263\u7403"},Ta=class{constructor(t,e){this.floaters=[];this.count=300;this.cursor=0;this.ripples=[];this.t=0;this.scene=t,this.camera=e,this.pPos=new Float32Array(this.count*3),this.pCol=new Float32Array(this.count*3),this.pVel=new Float32Array(this.count*3),this.pLife=new Float32Array(this.count),this.pMax=new Float32Array(this.count);for(let a=0;a<this.count;a++)this.pPos[a*3+1]=-100;let n=new fe;n.setAttribute("position",new _e(this.pPos,3)),n.setAttribute("color",new _e(this.pCol,3));let i=new Hs({size:.12,vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,blending:ri,sizeAttenuation:!0});this.points=new da(n,i),this.points.frustumCulled=!1,t.add(this.points);let r=new Li(.42,.56,40);this.landingMat=new It({color:16756768,transparent:!0,opacity:.75,side:ue,depthWrite:!1}),this.landing=new rt(r,this.landingMat),this.landing.rotation.x=-Math.PI/2,this.landing.position.y=.03,this.landing.visible=!1,t.add(this.landing);for(let a=0;a<10;a++){let o=new rt(new Li(.82,1,48),new It({color:16777215,transparent:!0,opacity:0,side:ue,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.visible=!1,t.add(o),this.ripples.push({mesh:o,mat:o.material,t:0,dur:0,max:1})}}update(t){this.t+=t;for(let n=0;n<this.count;n++)if(!(this.pLife[n]<=0)){if(this.pLife[n]-=t,this.pLife[n]<=0){this.pPos[n*3+1]=-100;continue}this.pVel[n*3+1]-=7*t,this.pPos[n*3]+=this.pVel[n*3]*t,this.pPos[n*3+1]+=this.pVel[n*3+1]*t,this.pPos[n*3+2]+=this.pVel[n*3+2]*t,this.pPos[n*3+1]<.05&&(this.pPos[n*3+1]=.05,this.pVel[n*3+1]*=-.3,this.pVel[n*3]*=.7,this.pVel[n*3+2]*=.7)}let e=this.points.geometry;e.getAttribute("position").needsUpdate=!0,e.getAttribute("color").needsUpdate=!0;for(let n of this.ripples){if(n.t<=0)continue;n.t-=t;let i=1-n.t/n.dur,r=.3+i*n.max;n.mesh.scale.setScalar(r),n.mat.opacity=Math.max(0,.85*(1-i)),n.t<=0&&(n.mesh.visible=!1)}if(this.landing.visible){let n=1+Math.sin(this.t*5)*.08;this.landing.scale.setScalar(n),this.landingMat.opacity=.55+Math.sin(this.t*5)*.2}for(let n=this.floaters.length-1;n>=0;n--){let i=this.floaters[n];i.t-=t;let r=1-i.t/i.dur;i.sprite.position.y=i.y0+r*1.05;let a=i.sprite.material;a.opacity=Math.max(0,Math.min(1,i.t/i.dur*2)),i.t<=0&&(this.scene.remove(i.sprite),a.dispose(),i.tex.dispose(),this.floaters.splice(n,1))}}setLanding(t,e,n){this.landing.visible=n,n&&this.landing.position.set(t,.03,e)}burst(t,e,n,i,r=18,a=5){let o=new zt(i);for(let l=0;l<r;l++){let c=this.cursor;this.cursor=(this.cursor+1)%this.count;let h=Math.random()*Math.PI*2,u=Math.random()*.9+.2,d=a*(.35+Math.random()*.9);this.pPos[c*3]=t,this.pPos[c*3+1]=e,this.pPos[c*3+2]=n,this.pVel[c*3]=Math.cos(h)*d,this.pVel[c*3+1]=u*d,this.pVel[c*3+2]=Math.sin(h)*d;let f=.35+Math.random()*.45;this.pLife[c]=f,this.pMax[c]=f,this.pCol[c*3]=o.r,this.pCol[c*3+1]=o.g,this.pCol[c*3+2]=o.b}}puff(t,e,n){let i=new zt(n);for(let r=0;r<2;r++){let a=this.cursor;this.cursor=(this.cursor+1)%this.count,this.pPos[a*3]=t+(Math.random()-.5)*.45,this.pPos[a*3+1]=.08,this.pPos[a*3+2]=e+(Math.random()-.5)*.45,this.pVel[a*3]=(Math.random()-.5)*.9,this.pVel[a*3+1]=.9+Math.random()*.8,this.pVel[a*3+2]=(Math.random()-.5)*.9;let o=.28+Math.random()*.3;this.pLife[a]=o,this.pMax[a]=o,this.pCol[a*3]=i.r,this.pCol[a*3+1]=i.g,this.pCol[a*3+2]=i.b}}ripple(t,e,n,i=4,r=.6){var o;let a=(o=this.ripples.find(l=>l.t<=0))!=null?o:this.ripples[0];a.mesh.visible=!0,a.mesh.position.set(t,.04,e),a.mesh.scale.setScalar(.3),a.mat.color.set(n),a.mat.opacity=.85,a.t=r,a.dur=r,a.max=i}popNumber(t,e,n,i,r,a,o){var M;let u=document.createElement("canvas");u.width=420,u.height=192;let d=u.getContext("2d");d.scale(2,2),d.textAlign="center",d.textBaseline="middle",d.lineJoin="round";let f=(M=qv[o])!=null?M:"";d.font='700 15px "PingFang SC","Microsoft YaHei",sans-serif',d.lineWidth=5,d.strokeStyle="rgba(8,24,40,0.75)",d.fillStyle=a?"#ffd75e":"#ffffff",d.strokeText(f,210/2,22),d.fillText(f,210/2,22),d.font='900 34px "PingFang SC","Microsoft YaHei",sans-serif';let g=r>1?`${i}  x${r}`:`${i}`;d.lineWidth=7,d.strokeText(g,210/2,58),d.fillText(g,210/2,58);let v=new be(u);v.colorSpace=Qt;let m=new yn({map:v,transparent:!0,depthWrite:!1,depthTest:!1}),p=new An(m);p.scale.set(1.55,.71,1),p.position.set(t,e+.4,n),p.renderOrder=20,this.scene.add(p),this.floaters.push({sprite:p,tex:v,t:.9,dur:.9,y0:e+.4})}};var qs={pos:new P(0,12.6,20.8),look:new P(0,.85,.2),fov:55},wa=class{constructor(t,e,n,i,r,a){this.scene=new fs;this.arena=new Ma;this.ballView=new Sa;this.views=new Map;this.camPos=qs.pos.clone();this.camLook=qs.look.clone();this.shake=0;this.dustTimer=0;this.elapsed=0;this.previewPts=new Float32Array(210);this.rosterKey="";this.safeFallback=!1;this.lostNotified=!1;this.onContextLostCb=null;this.width=e,this.height=n,this.padHeight=i,this.onContextLostCb=a!=null?a:null,this.renderer=new ds({canvas:t,antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.setPixelRatio(r),this.renderer.outputColorSpace=Qt,this.renderer.toneMapping=xn,this.renderer.shadowMap.enabled=!1,this.renderer.autoClear=!1,this.bindContextEvents(),this.camera=new qe(qs.fov,e/(n-i),.5,160),this.camera.position.copy(this.camPos),this.camera.lookAt(this.camLook),this.scene.background=mu(),this.scene.fog=new ha(1318707,34,95),this.scene.add(this.arena.group),this.scene.add(this.ballView.group),this.effects=new Ta(this.scene,this.camera);let o=new fe;o.setAttribute("position",new _e(this.previewPts,3)),o.setDrawRange(0,0),this.previewLine=new ms(o,new va({color:16743080,dashSize:.26,gapSize:.18,transparent:!0,opacity:.95,depthWrite:!1})),this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.receiverMark=new rt(new ci(.2,.32,4),new It({color:16756768,transparent:!0,opacity:.95})),this.receiverMark.rotation.x=Math.PI,this.receiverMark.visible=!1,this.scene.add(this.receiverMark),this.resize(e,n,i)}bindContextEvents(){let t=this.renderer.domElement,e=()=>{var i;this.lostNotified=!0,(i=this.onContextLostCb)==null||i.call(this,"webglcontextlost")},n=()=>{var i;this.lostNotified=!1,(i=this.onContextLostCb)==null||i.call(this,"webglcontextrestored")};try{typeof t.addEventListener=="function"&&(t.addEventListener("webglcontextlost",e),t.addEventListener("webglcontextrestored",n))}catch(i){}}isContextLost(){try{let t=this.renderer.getContext();return typeof(t==null?void 0:t.isContextLost)=="function"?t.isContextLost():!1}catch(t){return!1}}glInfo(){let t={dpr:this.renderer.getPixelRatio(),canvas:`${this.width}x${this.height}`};try{let e=this.renderer.domElement;t.buffer=`${e.width}x${e.height}`}catch(e){}try{let e=this.renderer.getContext(),n=globalThis.WebGL2RenderingContext,i=typeof n=="function"&&e instanceof n;t.gl=i?"webgl2":"webgl1",t.maxTex=e.getParameter(e.MAX_TEXTURE_SIZE);let r=e.getExtension("WEBGL_debug_renderer_info");r&&(t.gpu=String(e.getParameter(r.UNMASKED_RENDERER_WEBGL)||"").slice(0,40)),t.lost=this.isContextLost()}catch(e){t.gl="unknown"}return t}debugLoseContext(){var t;try{(t=this.renderer.getContext().getExtension("WEBGL_lose_context"))==null||t.loseContext()}catch(e){}}rebuildRenderer(){try{let t=this.renderer.domElement,e=this.renderer.getPixelRatio();return this.renderer.dispose(),this.renderer=new ds({canvas:t,antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.setPixelRatio(e),this.renderer.outputColorSpace=Qt,this.renderer.toneMapping=xn,this.renderer.shadowMap.enabled=!1,this.renderer.autoClear=!1,this.renderer.setSize(this.width,this.height,!1),this.bindContextEvents(),this.lostNotified=!1,!this.isContextLost()}catch(t){return!1}}applySafeFallback(){if(!this.safeFallback){this.safeFallback=!0,this.arena.applySafeFallback();for(let t of this.views.values())t.applySafeFallback()}}resize(t,e,n){this.width=t,this.height=e,this.padHeight=n,this.renderer.setSize(t,e,!1),this.camera.aspect=t/Math.max(1,e-n),this.camera.updateProjectionMatrix()}setPixelRatio(t){let e=this.renderer.getPixelRatio();return Math.abs(e-t)<.01?!1:(this.renderer.setPixelRatio(t),this.renderer.setSize(this.width,this.height,!1),!0)}build(t){let e=t.players.map(n=>`${n.id}:${n.name}:${n.team}`).join("|");if(!(e===this.rosterKey&&this.views.size===t.players.length)){for(let n of this.views.values())this.scene.remove(n.root),n.dispose();this.views.clear();for(let n of t.players){let i=new Ea(n,n.id);this.views.set(n.id,i),this.scene.add(i.root)}if(this.rosterKey=e,this.safeFallback)for(let n of this.views.values())n.applySafeFallback()}}sync(t,e,n){this.elapsed+=n;for(let v of t.players){let m=this.views.get(v.id);if(!m)continue;let p=v.prev.x+(v.pos.x-v.prev.x)*e,M=v.prev.z+(v.pos.z-v.prev.z)*e;m.update(n,p,M,v)}let i=t.ball,r=i.prev.x+(i.pos.x-i.prev.x)*e,a=i.prev.y+(i.pos.y-i.prev.y)*e,o=i.prev.z+(i.pos.z-i.prev.z)*e,l=t.players.find(v=>v.id===t.localPlayerId),c=t.phase==="rally"&&l!==void 0&&t.ballInReach(l);this.ballView.setVisible(i.live||i.heldBy!==null),i.heldBy!==null&&this.ballView.resetTrail(),this.ballView.update(n,r,a,o,c);let h=t.servePreview();if(h&&h.length>1){let v=Math.min(h.length,70);for(let M=0;M<v;M++)this.previewPts[M*3]=h[M].x,this.previewPts[M*3+1]=h[M].y,this.previewPts[M*3+2]=h[M].z;let m=this.previewLine.geometry;m.getAttribute("position").needsUpdate=!0,m.setDrawRange(0,v),this.previewLine.computeLineDistances(),this.previewLine.visible=!0;let p=h[v-1];this.effects.setLanding(p.x,p.z,!0)}else{this.previewLine.visible=!1;let v=t.phase==="rally"?t.predictLanding():null;v?this.effects.setLanding(v.x,v.z,!0):this.effects.setLanding(0,0,!1)}if(this.dustTimer-=n,this.dustTimer<=0){this.dustTimer=.045;for(let v of t.players)v.sprintTimer>0&&v.grounded&&this.effects.puff(v.pos.x,v.pos.z,v.team===0?"#8bffc4":"#ffc0b0")}let u=t.phase==="rally"?t.receiverOf(t.humanTeam):null,d=u!==null?t.players.find(v=>v.id===u):null;if(d){this.receiverMark.visible=!0,this.receiverMark.position.set(d.pos.x,3.1+d.pos.y,d.pos.z);let v=1+Math.sin(this.elapsed*9)*.12;this.receiverMark.scale.setScalar(v)}else this.receiverMark.visible=!1;let f=Et(r*.3,-2,2),g=qs.pos.z+Et(o*.12,-1.2,1.2);this.camPos.x=Ws(this.camPos.x,f,2.4,n),this.camPos.z=Ws(this.camPos.z,g,2.4,n),this.camLook.x=Ws(this.camLook.x,r*.14,2.4,n),this.camLook.z=Ws(this.camLook.z,qs.look.z+o*.1,2.4,n),this.shake=Math.max(0,this.shake-n*2.2),this.camera.position.copy(this.camPos),this.shake>.001&&(this.camera.position.x+=(Math.random()-.5)*this.shake,this.camera.position.y+=(Math.random()-.5)*this.shake),this.camera.lookAt(this.camLook),this.effects.update(n)}render(){let t=this.renderer,e=this.height-this.padHeight;t.setScissorTest(!0),t.setScissor(0,this.padHeight,this.width,e),t.setViewport(0,this.padHeight,this.width,e),t.clear(),t.render(this.scene,this.camera),t.setScissorTest(!1)}onHit(t){let e=t.team===0?"#8dffc0":"#ffa6b8";this.shake=Math.min(.5,this.shake+t.power/220),this.effects.burst(t.x,t.y,t.z,e,t.kind==="attack"?16:8,t.kind==="attack"?6:3.4),this.effects.popNumber(t.x,t.y+.25,t.z,t.power,t.combo,t.perfect,t.kind)}onBlock(t){this.shake=Math.min(.4,this.shake+.16),this.effects.burst(t.x,t.y,t.z,"#ffffff",14,5)}onLand(t){let e=t.winner===0?"#5dffae":"#ff7a9a";this.effects.ripple(t.x,t.z,e,4.2,.75),this.effects.burst(t.x,.3,t.z,e,26,6.5),this.shake=Math.min(.4,this.shake+.12)}celebratePlayer(t){var e;(e=this.views.get(t))==null||e.celebrate()}};var Aa=class{constructor(){this.map=new Map}on(t,e){let n=this.map.get(t);return n||(n=new Set,this.map.set(t,n)),n.add(e),()=>this.off(t,e)}off(t,e){var n;(n=this.map.get(t))==null||n.delete(e)}emit(t,e){let n=this.map.get(t);if(n)for(let i of n)i(e)}clear(){this.map.clear()}};function Mu(s,t,e,n=le.gravity){let i=Math.max(.08,e);return{x:(t.x-s.x)/i,y:(t.y-s.y)/i+.5*n*i,z:(t.z-s.z)/i}}function ys(s,t,e){let n=le.gravity,i=Math.max(e,s.y+.4,t.y+.4),r=Math.sqrt(2*n*(i-s.y)),a=r/n,o=Math.sqrt(Math.max(1e-4,2*(i-t.y)/n)),l=a+o;return{x:(t.x-s.x)/l,y:r,z:(t.z-s.z)/l}}var Ra=class{constructor(){this.pos={x:0,y:1,z:0};this.prev={x:0,y:1,z:0};this.vel={x:0,y:0,z:0};this.live=!1;this.dead=!1;this.heldBy=null;this.lastHitTeam=null;this.lastKind=null;this.lastHitterId=null;this.landX=0;this.landZ=0}reset(){this.pos={x:0,y:1.4,z:0},this.prev={...this.pos},this.vel={x:0,y:0,z:0},this.live=!1,this.dead=!1,this.heldBy=null,this.lastHitTeam=null,this.lastKind=null,this.lastHitterId=null,this.landX=0,this.landZ=0}step(t,e,n){if(!this.live||this.dead||this.heldBy!==null)return;this.prev={...this.pos},this.vel.y-=le.gravity*t;let i=Math.max(0,1-le.drag*t);this.vel.x*=i,this.vel.z*=i,this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t,this.pos.z+=this.vel.z*t;let r=this.prev.z,a=this.pos.z;if(r>0&&a<=0||r<0&&a>=0){let l=r/(r-a),c=this.prev.x+(this.pos.x-this.prev.x)*l,h=this.prev.y+(this.pos.y-this.prev.y)*l;if(Math.abs(c)<=ve.netHalfWidth){let u=e.find(d=>d.team!==this.lastHitTeam&&Math.abs(c-d.x)<=d.halfW&&h>=d.minY&&h<=d.maxY);if(u){this.pos.z=r;let d=Math.abs(c-u.x)/Math.max(.01,u.halfW);if(this.vel.z=-this.vel.z*.55,this.vel.x*=.55,d>.8){let f=Math.sign(c-u.x)||1;this.vel.x=f*Math.max(2.6,Math.abs(this.vel.x)*1.8),this.vel.z*=.9,this.vel.y=Math.min(this.vel.y,-.5)}else this.vel.y=Math.min(this.vel.y,-1.4);this.lastHitTeam=u.team,this.lastHitterId=u.playerId,n({type:"block",playerId:u.playerId,x:c,y:h,z:0})}else h<=ve.netHeight+.05?(this.pos.z=r,this.vel.z*=-.45,this.vel.y*=.5,n({type:"net",x:c,y:h,z:0})):n({type:"cross",x:c,y:h,z:0})}else n({type:"cross",x:c,y:h,z:0})}this.pos.y<=le.radius&&(this.pos.y=le.radius,this.landX=this.pos.x,this.landZ=this.pos.z,this.dead=!0,this.live=!1,n({type:"ground",x:this.pos.x,y:le.radius,z:this.pos.z}))}};var Su={1:[{x:0,d:4.5}],2:[{x:-1.9,d:3.1},{x:1.9,d:5.8}],3:[{x:-2.4,d:2.4},{x:0,d:4.7},{x:2.4,d:6.4}],4:[{x:-2.6,d:2.2},{x:-.9,d:4},{x:.9,d:5.6},{x:2.6,d:7}]};function Yv(s){var t;return(t=Su[s])!=null?t:Su[2]}function Ys(s,t,e){let n=Yv(t),i=n[Math.min(e,n.length-1)];return{x:i.x,z:s===0?i.d:-i.d}}var Ca={easy:{ally:{label:"\u7B80\u5355\xB7\u961F\u53CB",moveScale:.95,reaction:.2,aimError:.3,servePower:[.5,.8],canSpike:!0,spikeChance:.85,jumpLead:.34,jumpErr:.03,attackAimError:.5,attackScale:.95,digDelay:.12,digReach:1.15,blockChance:.32,wipeChance:0,blockError:.5,teamplay:1},foe:{label:"\u7B80\u5355\xB7\u5BF9\u624B",moveScale:.75,reaction:.45,aimError:.9,servePower:[.45,.7],canSpike:!0,spikeChance:.5,jumpLead:.34,jumpErr:.1,attackAimError:.8,attackScale:1,digDelay:.4,digReach:1,blockChance:0,wipeChance:.05,blockError:.9,teamplay:0}},normal:{ally:{label:"\u666E\u901A\xB7\u961F\u53CB",moveScale:.98,reaction:.15,aimError:.25,servePower:[.55,.85],canSpike:!0,spikeChance:.9,jumpLead:.34,jumpErr:.02,attackAimError:.35,attackScale:1,digDelay:.1,digReach:1.3,blockChance:.16,wipeChance:0,blockError:.5,teamplay:.95},foe:{label:"\u666E\u901A\xB7\u5BF9\u624B",moveScale:.93,reaction:.24,aimError:.5,servePower:[.55,.85],canSpike:!0,spikeChance:.8,jumpLead:.34,jumpErr:.04,attackAimError:.52,attackScale:1.05,digDelay:.24,digReach:1.28,blockChance:.05,wipeChance:.3,blockError:1.5,teamplay:0}},hard:{ally:{label:"\u56F0\u96BE\xB7\u961F\u53CB",moveScale:1,reaction:.1,aimError:.2,servePower:[.6,.95],canSpike:!0,spikeChance:.95,jumpLead:.34,jumpErr:.015,attackAimError:.25,attackScale:1.02,digDelay:.08,digReach:1.4,blockChance:.24,wipeChance:0,blockError:.4,teamplay:.9},foe:{label:"\u56F0\u96BE\xB7\u5BF9\u624B",moveScale:1,reaction:.18,aimError:.3,servePower:[.6,.95],canSpike:!0,spikeChance:.92,jumpLead:.34,jumpErr:.025,attackAimError:.38,attackScale:1.19,digDelay:.17,digReach:1.36,blockChance:.1,wipeChance:.55,blockError:1.2,teamplay:0}}},ay={easy:{...Nl(Ca.easy.foe),label:"\u7B80\u5355"},normal:{...Nl(Ca.normal.foe),label:"\u666E\u901A"},hard:{...Nl(Ca.hard.foe),label:"\u56F0\u96BE"}};function Nl(s){return{moveScale:s.moveScale,reaction:s.reaction,aimError:s.aimError,canSpike:s.canSpike}}function Zs(s,t){return Ca[s][t]}var $s=class{constructor(t,e,n="foe",i=!0){this.dump=!1;this.phase="idle";this.thinkTimer=0;this.target=null;this.servePower=.6;this.lastTouchSeen=-1;this.lastOppTouchSeen=-1;this.spikeWanted=!1;this.blockWanted=!1;this.blockOffset=0;this.role=n,this.profile=Zs(t,n),this.rng=e,this.frontBack=i,this.thinkTimer=e(0,.1)}get moveScale(){return this.profile.moveScale}get canSpike(){return this.profile.canSpike}think(t,e,n){let i=an();this.dump=!1;let r=t.phase;if(r!==this.phase&&(r==="serve"&&(this.servePower=this.rng(this.profile.servePower[0],this.profile.servePower[1]),this.thinkTimer=0,this.target=null,this.lastTouchSeen=-1,this.spikeWanted=!1),this.phase=r),r==="idle"||r==="point"||r==="setend"||r==="matchend")return i;if(r==="serve"){if(e.id===t.serverId)i.hitHeld=e.charge<this.servePower;else{let L=Ys(e.team,t.teamSize,e.slot);this.moveTo(e,i,L.x,L.z)}return i}let a=t.ball,o=t.predictLanding(),l=e.team===0?1:-1,c=e.team===0?1:0,h=a.live&&a.lastKind==="attack"&&a.lastHitTeam===c,u=h&&t.time-t.lastAttackTime[c]<this.profile.digDelay;this.thinkTimer-=n,this.thinkTimer<=0&&(this.thinkTimer=this.profile.reaction,u||this.updateTarget(t,e,o)),this.target&&this.moveTo(e,i,this.target.x,this.target.z);let d=t.ballInReach(e),f=t.touches[e.team],g=t.attackPlan[e.team],v=g.setterId===e.id,m=g.attackerId===null||g.attackerId===e.id,p=cn(a.pos.x,a.pos.z,e.pos.x,e.pos.z),M=this.isClosest(t,e,o);f!==this.lastTouchSeen&&(f===2&&(this.spikeWanted=this.profile.canSpike&&this.rng(0,1)<this.profile.spikeChance),this.lastTouchSeen=f),t.touches[c]!==this.lastOppTouchSeen&&(t.touches[c]===1&&(this.blockWanted=this.rng(0,1)<this.profile.blockChance,this.blockOffset=this.rng(-1,1)*this.profile.blockError),this.lastOppTouchSeen=t.touches[c]);let x=!h||p<=this.profile.digReach,w=t.touches[c];if(f>=2)m?(this.spikeWanted&&e.grounded&&this.shouldJump(t,e,p)&&(i.jump=!0),t.attackWindow(e)&&x?(i.hit=!0,i.aimX=this.attackAim(t,e,this.profile.attackAimError)):d&&p<1&&a.pos.y<1.35&&(i.hit=!0)):d&&x&&a.pos.y<1.5&&p<1&&(i.hit=!0);else if(f===1){if(v){if(d&&x){let L=this.findAttacker(t,e),y=t.attackZone(e.team),S=L?cn(L.pos.x,L.pos.z,y.x,y.z):99;if(this.dump=this.role==="ally"&&!!L&&L.isHuman&&S>7,i.hit=!0,!this.dump){let V=L?L.pos.x:y.x;i.aimX=Et(V+this.rng(-.3,.3),-3,3)}}}else if(m){if(e.grounded&&t.quickAttack[e.team]===e.id){let L=t.ballTimeToHeight(ee.spikeMaxY);L!==null&&L<=.35&&(i.jump=!0)}t.attackWindow(e)&&x?(i.hit=!0,i.aimX=this.attackAim(t,e,this.profile.attackAimError)):d&&x&&a.pos.y<1.1&&p<.9&&(i.hit=!0)}}else d&&x&&(M||p<.8)&&(i.hit=!0);let R=t.players.find(L=>L.team===c&&!L.grounded&&L.pos.y>.05&&Math.abs(L.pos.z)<2.8),E=a.live&&a.lastKind==="attack"&&a.lastHitTeam===c,A=t.players.find(L=>L.team===e.team&&L.id!==e.id),U=!!A&&Math.abs(A.pos.z)<=3;return this.blockWanted&&(R||E)&&a.live&&Math.abs(e.pos.z)<1.8&&e.grounded&&!(this.frontBack&&this.role==="ally"&&U)&&(i.block=!0),i}findAttacker(t,e){var i;let n=t.attackPlan[e.team];return n.attackerId===null?null:(i=t.players.find(r=>r.id===n.attackerId&&r.team===e.team))!=null?i:null}shouldJump(t,e,n){if(n>2.3||t.touches[e.team]!==2)return!1;let i=t.attackPlan[e.team];if(i.attackerId!==null&&i.attackerId!==e.id)return!1;let r=t.ballTimeToHeight(ee.spikeMinY+.6);if(r===null)return!1;let a=this.profile.jumpLead+this.rng(-this.profile.jumpErr,this.profile.jumpErr);return r<=a&&r>=0}attackAim(t,e,n){let i=e.team===0?-1:1,r=t.players.filter(c=>c.team!==e.team),a=i*4.8,o=0,l=-1;for(let c of[-3.2,-2.2,-1.2,0,1.2,2.2,3.2]){let h=1/0;for(let u of r)h=Math.min(h,cn(u.pos.x,u.pos.z,c,a));h>l&&(l=h,o=c)}return Et(o+this.rng(-n,n),-3.6,3.6)}updateTarget(t,e,n){let i=e.team===0?1:-1,r=Ys(e.team,t.teamSize,e.slot),a=t.ball,o=t.touches[e.team],l=t.attackPlan[e.team],c=this.profile.aimError,h=e.team===0?1:0,u=n!==null&&Math.sign(n.z)===i&&a.live,d=t.players.find(R=>R.team===e.team&&R.id!==e.id),f=!!d&&Math.abs(d.pos.z)<=3,g=o===1&&l.setterId===e.id&&a.live&&Math.sign(a.pos.z)===i,v=a.live&&a.lastHitTeam===e.team,m=l.attackerId===e.id&&(o>=2||v||t.quickAttack[e.team]===e.id),p=this.frontBack&&this.role==="ally"&&!g&&!m&&f;if(m&&v&&Math.sign(a.pos.z)===i){if(n&&Math.sign(n.z)===i)this.target={x:n.x,z:n.z};else{let R=t.attackZone(e.team);this.target={x:R.x,z:R.z}}return}if(this.blockWanted&&!p&&t.touches[h]>=2&&a.live&&Math.sign(a.pos.z)!==i&&Math.abs(a.pos.z)<3.4&&a.pos.y>1.6){this.target={x:Et(a.pos.x+this.blockOffset,-3.2,3.2),z:i*1.25};return}let M=a.live&&a.lastKind==="attack"&&a.lastHitTeam===h,x=t.touches[e.team]===0&&a.lastHitTeam===h;if(u&&n.t<2.6&&(M||x)){let R=d?cn(d.pos.x,d.pos.z,n.x,n.z):99,E=cn(e.pos.x,e.pos.z,n.x,n.z),A=E/Math.max(1,ee.moveSpeed*e.speedScale),U=n.t+.42>=A;if(this.role==="ally"){let L=Math.abs(n.z)<=2.9,y=!!d&&Math.abs(d.pos.z)<=3,S=!!d&&(d.setupBuffer>0||d.spikeBuffer>0||d.blockCd>.3),V=L&&y&&(R<=1.8||S);if((U||M&&E<3.2)&&!V){this.target={x:n.x,z:n.z};return}}if(R>1.5){this.target={x:n.x,z:n.z};return}}if(p){this.target=this.backCourtTarget(t,e,d,n);return}if(!u){let R=r.x,E=r.z,A=t.touches[h];a.live&&Math.sign(a.pos.z)!==i&&A>=2&&(R=Et(a.pos.x*.45+r.x*.3,-3,3),E=i*4.1),this.target={x:R,z:E};return}let w={x:Et(n.x+this.rng(-c,c),-4+.3,4-.3),z:Et(n.z+this.rng(-c,c),i>0?.6:-8.4,i>0?8.4:-.6)};if(o===0){this.isClosest(t,e,n)?this.target=w:this.target={x:Et(r.x*.75+n.x*.2,-3,3),z:i*2.4};return}if(o===1){if(l.setterId===null||l.setterId===e.id)this.target=w;else if(l.attackerId===e.id){let R=t.attackZone(e.team);this.target={x:R.x,z:R.z}}else this.target={x:r.x,z:r.z};return}l.attackerId===null||l.attackerId===e.id?this.target=w:this.target={x:r.x,z:i*Math.max(4,Math.abs(r.z))}}isClosest(t,e,n){if(!n)return!1;let i=cn(e.pos.x,e.pos.z,n.x,n.z);for(let r of t.players){if(r.team!==e.team||r.id===e.id)continue;if(cn(r.pos.x,r.pos.z,n.x,n.z)<i-.35)return!1}return!0}backCourtTarget(t,e,n,i){let r=e.team===0?1:-1,a=t.ball.live&&t.ball.lastHitTeam===1-e.team,o=0,l=4.35;return a&&i&&Math.sign(i.z)===r&&i.t<2.4?(o=i.x,l=Et(Math.abs(i.z),3.6,5.8)):t.ball.live&&Math.sign(t.ball.pos.z)!==r&&(o=Et(-t.ball.pos.x*.5,-2.4,2.4)),n&&Math.abs(o-n.pos.x)<1.5&&(o=n.pos.x>=0?Et(n.pos.x-2.2,-3.2,3.2):Et(n.pos.x+2.2,-3.2,3.2)),{x:o,z:r*l}}moveTo(t,e,n,i){let r=n-t.pos.x,a=i-t.pos.z,o=Math.hypot(r,a);o<.24||(e.moveX=r/o,e.moveZ=a/o,o>2.6&&t.sprintCd<=0&&t.grounded&&(e.sprint=!0))}};var Eu=["\u963F\u6D1B","\u5C0F\u5317","\u8C46\u8C46","\u7403\u7403"],Tu=["\u7C73\u5A05","\u5361\u5C14","\u6CE2\u6CE2","\u5A1C\u5A1C"],Js=class{constructor(t){this.events=new Aa;this.players=[];this.ball=new Ra;this.phase="idle";this.phaseTimer=0;this.scores=[0,0];this.setsWon=[0,0];this.setIndex=0;this.clock=He.setSeconds;this.timeUp=!1;this.suddenDeath=!1;this.touches=[0,0];this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}];this.servingTeam=0;this.serverId=0;this.serveIndex=[0,0];this.quickAttack=[null,null];this.blockHalfW=.92;this.blockAlignMax=.45;this.blockFastRise=!1;this.autoDigs=0;this.setFallbacks={noMate:0,touchesExhausted:0,noReach:0};this.matchWinner=null;this.lastAttackTime=[-10,-10];this.slowmoTimer=0;this.time=0;this.serveElapsed=0;this.brains=new Map;this.lastHitterByTeam=[null,null];this.lastHitAt=-10;this.lastCount=-1;this.inputProvider=null;var e,n,i,r,a,o;this.teamSize=Et(Math.round(t.teamSize),1,4),this.humanTeam=(e=t.humanTeam)!=null?e:0,this.humanCount=Et(Math.round((n=t.humanCount)!=null?n:1),1,this.teamSize),this.localPlayerId=Et(Math.round((i=t.localPlayerId)!=null?i:0),0,this.teamSize-1),this.roster=(r=t.names)!=null?r:[],this.skill=t.skill,this.rng=fu((a=t.seed)!=null?a:Date.now()%2147483647),this.autoDigOn=t.autoDig!==!1,this.frontBackOn=t.frontBack!==!1,this.createPlayers(t.skill,(o=t.humanName)!=null?o:"\u4F60"),this.resetPlayers()}setHumanControl(t,e){let n=this.players.find(r=>r.id===t);if(!n||n.isHuman===e)return;n.isHuman=e;let i=Zs(this.skill,this.roleFor(n.team));n.speedScale=e?1:i.moveScale,n.attackScale=e?1:i.attackScale,e?(this.brains.delete(t),n.charge=0,n.hitBuffer=0):this.brains.has(t)||this.brains.set(t,new $s(this.skill,this.rng,this.roleFor(n.team),this.frontBackOn))}startMatch(){this.scores=[0,0],this.setsWon=[0,0],this.setIndex=0,this.clock=He.setSeconds,this.timeUp=!1,this.suddenDeath=!1,this.matchWinner=null,this.servingTeam=this.humanTeam,this.serveIndex=[0,0],this.lastHitterByTeam=[null,null],this.lastAttackTime=[-10,-10],this.slowmoTimer=0;for(let t of this.players)t.stats.points=0,t.stats.hits=0;this.resetPlayers(),this.ball.reset(),this.setPhase("kickoff"),this.phaseTimer=He.kickoffSeconds,this.lastCount=-1,this.events.emit("announce",{text:"\u51C6\u5907",sub:`${He.pointsToWinSet} \u5206\u5236 \xB7 \u4E09\u5C40\u4E24\u80DC`,ms:900})}step(t){this.time+=t;let e=new Map;for(let n of this.players)if(n.isHuman)e.set(n.id,this.inputProvider?this.inputProvider(n.id):an());else{let i=this.brains.get(n.id);e.set(n.id,i?i.think(this,n,t):an())}for(let n of this.players)this.stepPlayer(n,e.get(n.id),t);this.stepBall(t),this.stepPhase(t)}predictLanding(){let t=this.ball;if(!t.live||t.dead||t.heldBy!==null)return null;let e=t.pos.x,n=t.pos.y,i=t.pos.z,r=t.vel.x,a=t.vel.y,o=t.vel.z,l=1/30;for(let c=0;c<3.6;c+=l)if(a-=le.gravity*l,e+=r*l,n+=a*l,i+=o*l,n<=le.radius)return{x:e,z:i,t:c};return null}predictNetCrossing(){let t=this.ball;if(!t.live||t.dead||t.heldBy!==null||Math.abs(t.vel.z)<.3||Math.sign(t.vel.z)===Math.sign(t.pos.z)&&Math.abs(t.pos.z)>.05)return null;let e=t.pos.x,n=t.pos.y,i=t.pos.z,r=t.vel.x,a=t.vel.y,o=t.vel.z,l=1/60;for(let c=l;c<1.6;c+=l){let h=e+r*l,u=n+a*l,d=i+o*l;if(i>0&&d<=0||i<0&&d>=0){let f=i/(i-d);return{x:e+(h-e)*f,y:n+(u-n)*f,t:c}}e=h,n=u,i=d,a-=le.gravity*l,r*=Math.max(0,1-le.drag*l),o*=Math.max(0,1-le.drag*l)}return null}ballTimeToHeight(t){let e=this.ball;if(!e.live||e.dead||e.heldBy!==null)return null;if(e.pos.y<=t&&e.vel.y<=0)return 0;let n=e.pos.y,i=e.vel.y,r=1/120;for(let a=r;a<2.4;a+=r)if(i-=le.gravity*r,n+=i*r,i<0&&n<=t)return a;return null}attackWindow(t){let e=this.ball;return!e.live||e.dead||e.heldBy!==null||this.phase!=="rally"||!(this.quickAttack[t.team]===t.id)&&(this.touches[t.team]<2||t.grounded)||this.touches[t.team]>=3||this.lastHitterByTeam[t.team]===t.id||!(t.team===0?e.pos.z>-.4:e.pos.z<.4)||Math.hypot(e.pos.x-t.pos.x,e.pos.z-t.pos.z)>ee.spikeReachXZ?!1:e.pos.y>=ee.spikeMinY&&e.pos.y<=ee.spikeMaxY}attackZone(t){let e=this.attackPlan[t],n=e.attackerId!==null?this.players.find(o=>o.id===e.attackerId):void 0,i=e.setterId!==null?this.players.find(o=>o.id===e.setterId):void 0,r=n!=null?n:i,a=t===0?1:-1;return{x:Et((r?r.pos.x:0)*.8,-2.6,2.6),z:a*1.75}}setAim(t,e,n){let i=t.team===0?1:-1,r=this.attackZone(t.team);if(!e)return{x:Et(n!=null?n:r.x,-3.2,3.2),z:r.z,apex:4.9};let a=Math.abs(e.pos.z),o=a>3.6?5.4:4.9,l=this.ball.pos.y,c=Math.sqrt(2*Math.max(.1,o-l)/le.gravity),h=Math.sqrt(2*Math.max(.01,o-le.radius)/le.gravity),d=6.2*(c+h)*.95,f=Et(n!=null?n:e.pos.x*.92,-3.2,3.2),g=1.9,v=Math.hypot(f-e.pos.x,g-a),m=v<=.001?1:Math.min(1,d/v);return{x:Et(e.pos.x+(f-e.pos.x)*m,-3.2,3.2),z:i*(a+(g-a)*m),apex:o}}receiverOf(t){let e=this.predictLanding();if(!e||!this.ball.live)return null;let n=t===0?1:-1;if(Math.sign(e.z)!==n)return null;let i=null,r=1/0;for(let a of this.players){if(a.team!==t)continue;let o=cn(a.pos.x,a.pos.z,e.x,e.z);a.isHuman&&!a.moving&&(o+=2.2),o<r&&(r=o,i=a.id)}return i}ballInReach(t){let e=this.ball;if(!e.live||e.dead||e.heldBy!==null||this.touches[t.team]>=3||!(t.team===0?e.pos.z>-.4:e.pos.z<.4))return!1;let i=t.pos.y+ee.chestHeight;return Math.hypot(e.pos.x-t.pos.x,e.pos.y-i,e.pos.z-t.pos.z)<=ee.reach+le.radius}mvpName(){let t=this.matchWinner,e=t===null?this.players:this.players.filter(i=>i.team===t),n=e[0];for(let i of e)i.stats.points>n.stats.points&&(n=i);return n?n.name:""}roleFor(t){return t===this.humanTeam?"ally":"foe"}createPlayers(t,e){let n=this.teamSize;for(let i=0;i<n;i++){let r=i<this.humanCount&&this.humanTeam===0;this.players.push(this.makePlayer({id:i,team:0,slot:i===0?n-1:i-1,human:r,name:this.roster[i]||(i===0?e:Eu[(i-1)%Eu.length]),skill:t}))}for(let i=0;i<n;i++)this.players.push(this.makePlayer({id:n+i,team:1,slot:i,human:!1,name:Tu[i%Tu.length],skill:t}))}makePlayer(t){let e=this.roleFor(t.team),n=Zs(t.skill,e);return t.human||this.brains.set(t.id,new $s(t.skill,this.rng,e,this.frontBackOn)),{id:t.id,name:t.name,team:t.team,isHuman:t.human,slot:t.slot,speedScale:t.human?1:n.moveScale,attackScale:t.human?1:n.attackScale,pos:{x:0,y:0,z:0},prev:{x:0,y:0,z:0},vel:{x:0,y:0,z:0},facing:t.team===0?Math.PI:0,grounded:!0,moving:!1,blocking:!1,sprintTimer:0,sprintCd:0,sprintDir:{x:0,z:0},hitCd:0,blockCd:0,hitBuffer:0,spikeBuffer:0,setupBuffer:0,alignVx:0,alignTimer:0,stun:0,charge:0,serveAim:0,anim:"idle",animTimer:0,stats:{points:0,hits:0}}}resetPlayers(){for(let t of this.players){let e=Ys(t.team,this.teamSize,t.slot);t.pos={x:e.x,y:0,z:e.z},t.prev={...t.pos},t.vel={x:0,y:0,z:0},t.grounded=!0,t.moving=!1,t.blocking=!1,t.sprintTimer=0,t.sprintCd=0,t.stun=0,t.hitBuffer=0,t.spikeBuffer=0,t.setupBuffer=0,t.alignVx=0,t.alignTimer=0,t.charge=0,t.anim="idle",t.animTimer=0,t.facing=t.team===0?Math.PI:0}}stepPlayer(t,e,n){if(t.prev.x=t.pos.x,t.prev.y=t.pos.y,t.prev.z=t.pos.z,t.sprintCd=Math.max(0,t.sprintCd-n),t.hitCd=Math.max(0,t.hitCd-n),t.blockCd=Math.max(0,t.blockCd-n),t.animTimer=Math.max(0,t.animTimer-n),t.stun>0){t.stun=Math.max(0,t.stun-n),t.anim!=="dive"&&(t.anim="stun"),t.vel.x*=.9,t.vel.z*=.9,t.pos.x+=t.vel.x*n,t.pos.z+=t.vel.z*n,this.clampToCourt(t),this.stepVertical(t,n),t.blocking=!1,t.moving=!1;return}let i=this.phase==="serve"||this.phase==="rally",r=this.phase==="serve"&&t.id===this.serverId;if(i&&!r){if(e.sprint&&t.grounded&&t.sprintCd<=0){let l=Math.hypot(e.moveX,e.moveZ);l>.05&&(t.sprintTimer=ee.sprintDuration,t.sprintCd=ee.sprintCooldown,t.sprintDir={x:e.moveX/l,z:e.moveZ/l})}let a=0,o=0;if(t.sprintTimer>0)t.sprintTimer=Math.max(0,t.sprintTimer-n),a=t.sprintDir.x*ee.sprintSpeed,o=t.sprintDir.z*ee.sprintSpeed;else{let l=Math.hypot(e.moveX,e.moveZ);if(l>.05){let c=ee.moveSpeed*t.speedScale*(t.grounded?1:.55);a=e.moveX/l*c,o=e.moveZ/l*c}}a!==0||o!==0?(t.pos.x+=a*n,t.pos.z+=o*n,t.vel.x=a,t.vel.z=o,t.moving=!0,t.facing=ba(t.facing,Math.atan2(a,o),16,n)):(t.moving=!1,t.vel.x=0,t.vel.z=0),e.jump&&t.grounded&&(t.vel.y=ee.jumpVelocity,t.grounded=!1,this.events.emit("jump",{playerId:t.id,block:!1}))}else t.moving=!1,t.vel.x=0,t.vel.z=0;if(r){let a=t.team===0?Math.PI:0;t.facing=ba(t.facing,a,10,n)}if(this.clampToCourt(t),this.stepVertical(t,n),t.alignTimer>0&&(t.alignTimer=Math.max(0,t.alignTimer-n),t.pos.x+=t.alignVx*n,this.clampToCourt(t)),this.phase==="rally"&&e.block&&t.grounded&&t.stun<=0&&Math.abs(t.pos.z)<1.8){let a=this.predictNetCrossing(),o=this.blockFastRise&&!!a&&a.t<=.25;if(t.vel.y=ee.jumpVelocity*(o?1.22:1),t.grounded=!1,t.blockCd=.7,a&&t.isHuman&&this.blockAlignMax>0&&Math.abs(a.x-t.pos.x)<=1.3){let l=Et(a.x-t.pos.x,-this.blockAlignMax,this.blockAlignMax);t.alignVx=l/.2,t.alignTimer=.2}this.events.emit("jump",{playerId:t.id,block:!0})}e.block&&Math.abs(t.pos.z)<1.8&&(t.blockCd=Math.max(t.blockCd,.7)),t.blocking=this.phase==="rally"&&(e.blockHeld||t.blockCd>0)&&!t.grounded&&Math.abs(t.pos.z)<1.8,this.phase==="rally"&&(e.hit&&(t.hitBuffer=.35),t.hitBuffer=Math.max(0,t.hitBuffer-n),(t.hitBuffer>0||e.hitHeld)&&(this.tryHit(t,e)?t.hitBuffer=0:e.hit&&(t.anim="hit",t.animTimer=.22,this.events.emit("swing",{playerId:t.id})))),this.autoDigOn&&this.phase==="rally"&&!e.hit&&!e.hitHeld&&!e.block&&!e.blockHeld&&!e.setup&&!e.spike&&!t.blocking&&t.hitBuffer<=0&&t.setupBuffer<=0&&t.spikeBuffer<=0&&this.tryAutoDig(t,e),this.phase==="rally"&&this.stepNetControls(t,e,n),this.phase==="serve"&&t.id===this.serverId&&(e.hit&&t.charge<=0&&(t.charge=.06),e.hitHeld?(t.charge=Math.min(1,t.charge+n/ee.serveMaxCharge),t.isHuman&&(t.serveAim=Et(t.pos.x*.25+e.moveX*1.8,-3.2,3.2))):t.charge>0&&this.doServe(t,t.charge),t.facing=ba(t.facing,t.team===0?Math.PI:0,10,n)),!(t.animTimer>0&&(t.anim==="hit"||t.anim==="dive"||t.anim==="cheer"))&&(t.grounded?t.moving?t.anim="run":t.anim="idle":t.anim="jump")}stepVertical(t,e){t.pos.y+=t.vel.y*e,t.vel.y-=ee.gravity*e,t.pos.y<=0?(t.pos.y=0,t.vel.y<0&&(t.vel.y=0),t.grounded=!0):t.grounded=!1}clampToCourt(t){t.pos.x=Et(t.pos.x,-ve.halfWidth-.45,ve.halfWidth+.45),t.team===0?t.pos.z=Et(t.pos.z,.5,ve.halfLength+.6):t.pos.z=Et(t.pos.z,-ve.halfLength-.6,-.5)}handPos(t){let e=t.team===0?-1:1;return{x:t.pos.x+.32,y:t.pos.y+1.35,z:t.pos.z+e*.25}}preferredAttacker(t){let e=this.players.find(a=>a.team===t.team&&a.id!==t.id);if(!e||!e.isHuman||t.isHuman)return t.id;let n=e,i=n.team===0?1:-1,r={x:Et(n.pos.x*.8,-2.6,2.6),z:i*1.75};return cn(n.pos.x,n.pos.z,r.x,r.z)<=6.2?n.id:t.id}tryHit(t,e,n){var p,M,x,w;let i=n==="setup"?!1:this.attackWindow(t);if(!i&&!this.ballInReach(t)&&!(n==="auto"&&this.autoDigReach(t))||t.hitCd>0||this.time-this.lastHitAt<ee.hitGap)return!1;let r=this.ball,a=t.team===0?-1:1,o=t.pos.y+ee.chestHeight,l=Math.hypot(r.pos.x-t.pos.x,r.pos.y-o,r.pos.z-t.pos.z),c=this.touches[t.team],h=this.players.find(R=>R.team===t.team&&R.id!==t.id),u={x:r.pos.x,y:r.pos.y,z:r.pos.z},d=le.radius,f;if(n==="setup"?f="set":n==="send"?f="send":i?f="attack":c===2?f="send":c===1?f=((M=(p=this.brains.get(t.id))==null?void 0:p.dump)!=null?M:!1)?"send":"set":f="pass",c===0){let R=this.preferredAttacker(t),E=t.id;if(n==="setup"&&h)R=h.id;else if(R===t.id&&h){let A=null;for(let U of this.players)U.team!==t.team||U.id===t.id||(!A||Math.abs(U.pos.z)<Math.abs(A.pos.z))&&(A=U);E=A?A.id:h.id}this.attackPlan[t.team]={setterId:E,attackerId:R},n==="setup"&&h&&(this.quickAttack[t.team]=h.id)}else c===1&&f==="set"&&(this.attackPlan[t.team]={setterId:t.id,attackerId:h?h.id:null});if(f==="attack"){let R=this.players.filter(C=>C.team!==t.team),E=0;for(let C of R)E+=C.pos.x;E=R.length?E/R.length:0;let A=-Math.sign(E||this.rng(-.5,.5))*this.rng(2.3,3.6),U=(x=e.aimX)!=null?x:e.moveX!==0?Et(t.pos.x+e.moveX*3,-3.6,3.6):A,L={x:Et(U,-3.7,3.7),y:d,z:a*(3.6+this.rng(0,2.8))},y=Math.hypot(L.x-u.x,L.z-u.z),S=Et(y/18,.38,.65)/Math.max(.6,t.attackScale);r.vel=Mu(u,L,Math.max(.3,S));let V=t.isHuman?null:Zs(this.skill,this.roleFor(t.team)),W=this.players.find(C=>C.team!==t.team&&C.blocking&&Math.abs(C.pos.z)<1.8);if(W&&V&&V.wipeChance>0&&this.rng(0,1)<V.wipeChance){let C=u.x>=W.pos.x?1:-1,X=W.pos.x+C*1,z=Math.abs(u.z)/Math.max(1,Math.abs(r.vel.z));z>.01&&(r.vel.x+=Et((X-(u.x+r.vel.x*z))/z,-9,9))}}else if(f==="set"){let R=this.attackPlan[t.team].attackerId!==null?this.players.find(A=>A.id===this.attackPlan[t.team].attackerId):void 0,E=this.setAim(t,R,e.aimX);r.vel=ys(u,{x:E.x,y:d,z:E.z},E.apex)}else if(f==="send"){let R=(w=e.aimX)!=null?w:Et(t.pos.x+e.moveX*2.6,-3.5,3.5);r.vel=ys(u,{x:R,y:d,z:a*(4.4+this.rng(0,2.4))},5.2)}else{let R=this.attackPlan[t.team].setterId!==null?this.players.find(A=>A.id===this.attackPlan[t.team].setterId):void 0,E=R!=null?R:h;if(E){let A=-a*Et(Math.abs(E.pos.z)*.9,1.2,4.2);r.vel=ys(u,{x:Et(E.pos.x*.85,-3,3),y:d,z:A},5.4)}else r.vel=ys(u,{x:t.pos.x*.5,y:d,z:t.pos.z*.7},5.4)}let g=Et(1-Math.abs(l-.55)/1.05,.1,1),v=Math.round(10+40*g);return f==="attack"&&(v*=2),c>0&&this.lastHitterByTeam[t.team]===t.id&&(v=Math.round(v*.5)),this.ball.lastKind=f,f==="attack"&&(this.lastAttackTime[t.team]=this.time),this.touches[t.team]=c+1,f==="attack"&&(this.quickAttack[t.team]=null),this.lastHitAt=this.time,this.lastHitterByTeam[t.team]=t.id,r.lastHitTeam=t.team,r.lastHitterId=t.id,t.hitCd=ee.hitCooldown,t.stats.hits++,t.anim="hit",t.animTimer=.26,t.sprintTimer>.06&&t.grounded&&(t.stun=ee.diveStun,t.anim="dive",t.animTimer=ee.diveStun,t.vel.x=t.sprintDir.x*6,t.vel.z=t.sprintDir.z*6,t.sprintTimer=0,this.events.emit("dive",{playerId:t.id})),this.events.emit("hit",{playerId:t.id,team:t.team,power:v,combo:this.touches[t.team],kind:f,perfect:g>.78,auto:n==="auto",x:r.pos.x,y:r.pos.y,z:r.pos.z}),!0}tryAutoDig(t,e){let n=this.ball;if(!n.live||n.dead||n.heldBy!==null||n.lastKind!=="attack"||n.lastHitTeam===t.team||this.touches[t.team]>=3||this.lastHitterByTeam[t.team]===t.id||!(t.team===0?n.pos.z>.05:n.pos.z<-.05))return;let r=this.predictLanding();if(!r||!this.landingInBounds(r,t.team)||!this.autoDigReach(t))return;let a=this.autoDigRange(t),o=Math.hypot(r.x-t.pos.x,r.z-t.pos.z);if(o>a+1)return;let l=this.players.find(h=>h.team===t.team&&h.id!==t.id);if(l&&Math.abs(t.pos.z)<=3&&Math.abs(r.z)>3.4){let h=Math.abs(l.pos.z)>3,u=Math.hypot(r.x-l.pos.x,r.z-l.pos.z),d=this.autoDigRange(l)+1;if(h&&u<=d)return}if(l){let h=Math.hypot(r.x-l.pos.x,r.z-l.pos.z);if((this.ballInReach(l)||this.autoDigReach(l))&&h+.8<o)return}let c=Et(-t.pos.x*.3+this.rng(-.7,.7),-3.2,3.2);this.tryHit(t,{...e,hit:!1,hitHeld:!1,aimX:c},"auto")&&(this.autoDigs++,t.hitBuffer=0)}noteSetFallback(t,e){this.setFallbacks[e]++,this.events.emit("setFallback",{playerId:t.id,reason:e})}autoDigRange(t){let e=this.skill==="easy"?2.15:this.skill==="normal"?1.95:1.75;return t&&Math.abs(t.pos.z)<=3?e*.55:e}autoDigReach(t){let e=this.ball,n=Math.hypot(e.pos.x-t.pos.x,e.pos.z-t.pos.z),i=this.autoDigRange(t),r=this.skill==="easy"?2.3:this.skill==="normal"?2.15:2;return n<=i&&e.pos.y>=.35&&e.pos.y<=r&&e.vel.y<0}landingInBounds(t,e){return Math.abs(t.x)>ve.halfWidth-le.radius*.5?!1:e===0?t.z>0&&t.z<ve.halfLength:t.z<0&&t.z>-ve.halfLength}stepNetControls(t,e,n){e.spike&&(t.spikeBuffer=.9),e.setup&&(t.setupBuffer=.6);let i=t.setupBuffer>0;if(t.spikeBuffer=Math.max(0,t.spikeBuffer-n),t.setupBuffer=Math.max(0,t.setupBuffer-n),i&&t.setupBuffer===0&&this.noteSetFallback(t,"noReach"),t.setupBuffer>0&&this.ballInReach(t)){let r=this.players.find(o=>o.team===t.team&&o.id!==t.id),a=this.touches[t.team];r?a>=2?(t.setupBuffer=0,this.noteSetFallback(t,"touchesExhausted"),this.tryHit(t,e,"send")):this.tryHit(t,e,"setup")&&(t.setupBuffer=0,t.spikeBuffer=0):(t.setupBuffer=0,this.noteSetFallback(t,"noMate"),this.tryHit(t,e,"send"))}if(t.spikeBuffer>0){if(!this.canAutoSpike(t)){t.spikeBuffer=0,this.ballInReach(t)&&this.tryHit(t,e);return}if(t.grounded&&t.stun<=0){let r=this.ballTimeToHeight(ee.spikeMinY+.6);r!==null&&r<=.62&&(t.vel.y=ee.jumpVelocity,t.grounded=!1,this.events.emit("jump",{playerId:t.id,block:!1}))}this.attackWindow(t)&&this.tryHit(t,e)&&(t.spikeBuffer=0)}}canAutoSpike(t){if(this.touches[t.team]<2||this.touches[t.team]>=3)return!1;let e=this.ball;return!(!e.live||e.dead||e.heldBy!==null||!(t.team===0?e.pos.z>-.4:e.pos.z<.4)||e.pos.y<ee.spikeMinY-.4||cn(e.pos.x,e.pos.z,t.pos.x,t.pos.z)>2.6)}serveTrajectory(t,e){let n=t.team===0?-1:1,i=this.handPos(t),r=6.4-2.3*e,a=ys(i,{x:t.serveAim,y:le.radius,z:n*(4.6+3*e)},r);return{start:i,vel:a}}servePreview(){if(this.phase!=="serve")return null;let t=this.players.find(d=>d.id===this.serverId);if(!t||t.charge<=.03)return null;let{start:e,vel:n}=this.serveTrajectory(t,Et(t.charge,.15,1)),i=[],{x:r,y:a,z:o}=e,l=n.x,c=n.y,h=n.z,u=.04;for(let d=0;d<70&&(i.push({x:r,y:a,z:o}),c-=le.gravity*u,r+=l*u,a+=c*u,o+=h*u,!(a<=le.radius));d++);return i}doServe(t,e){let n=Et(e,.15,1),i=this.ball,{start:r,vel:a}=this.serveTrajectory(t,n);i.pos={...r},i.prev={...r},i.vel=a,i.live=!0,i.dead=!1,i.heldBy=null,i.lastHitTeam=t.team,i.lastHitterId=t.id,this.lastHitterByTeam[t.team]=t.id,this.touches=[0,0],this.lastAttackTime=[-10,-10],t.charge=0,t.hitCd=.5,t.hitBuffer=0,t.anim="hit",t.animTimer=.26,this.setPhase("rally"),this.events.emit("serve",{playerId:t.id,power:n})}stepBall(t){let e=this.ball;if(e.heldBy!==null){let i=this.players.find(r=>r.id===e.heldBy);if(i){let r=this.handPos(i);e.pos=r,e.prev={...r}}return}let n=this.players.filter(i=>i.blocking).map(i=>({playerId:i.id,team:i.team,x:i.pos.x,halfW:this.blockHalfW,minY:i.pos.y+.65,maxY:i.pos.y+2.45}));e.step(t,n,i=>this.onBallEvent(i))}onBallEvent(t){switch(t.type){case"net":this.events.emit("net",{x:t.x,y:t.y,z:t.z});break;case"block":this.events.emit("block",{playerId:t.playerId,x:t.x,y:t.y,z:t.z});break;case"cross":this.touches=[0,0],this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}];break;case"ground":this.onGround(t.x,t.z);break}}onGround(t,e){var o;let n=Math.abs(t)<=ve.halfWidth&&Math.abs(e)<=ve.halfLength,i=e>=0?0:1,r=(o=this.ball.lastHitTeam)!=null?o:this.servingTeam,a;n&&i!==r?a=r:a=1-r,this.events.emit("land",{x:t,z:e,winner:a,inBounds:n}),this.awardPoint(a)}stepPhase(t){switch(this.phase){case"kickoff":{this.phaseTimer-=t;let e=Math.ceil(this.phaseTimer);e!==this.lastCount&&e>0&&e<=3&&(this.lastCount=e,this.events.emit("announce",{text:String(e),ms:620}),this.events.emit("tick",{n:e})),this.phaseTimer<=0&&this.beginServe();break}case"serve":{if(this.serveElapsed+=t,this.serveElapsed>9){let e=this.players.find(n=>n.id===this.serverId);e&&this.doServe(e,.5)}break}case"rally":{this.clock>0&&(this.clock=Math.max(0,this.clock-t),this.clock<=0&&!this.timeUp&&(this.timeUp=!0,this.events.emit("announce",{text:"\u65F6\u95F4\u5230",sub:"\u672C\u56DE\u5408\u7ED3\u675F\u540E\u7ED3\u7B97",ms:1400})));break}case"point":{this.phaseTimer-=t,this.phaseTimer<=0&&this.afterPoint();break}case"setend":{this.phaseTimer-=t,this.phaseTimer<=0&&this.afterSetEnd();break}default:break}}beginServe(){this.setupServe(),this.serveElapsed=0,this.setPhase("serve");let t=this.servingTeam===this.humanTeam;this.events.emit("announce",{text:t?"\u6211\u65B9\u53D1\u7403":"\u5BF9\u65B9\u53D1\u7403",sub:t?"\u6309\u4F4F\u51FB\u7403\u84C4\u529B\uFF0C\u677E\u5F00\u53D1\u7403":"",ms:1300})}setupServe(){this.resetPlayers();let t=this.players.filter(r=>r.team===this.servingTeam).sort((r,a)=>r.id-a.id),e=t.length>0?this.serveIndex[this.servingTeam]%t.length:0,n=t[e];if(t.length>0&&(this.serveIndex[this.servingTeam]=(e+1)%t.length),n){this.serverId=n.id;let r=n.team===0?1:-1;n.pos.x=Et(n.pos.x*.55,-2,2),n.pos.z=r*(ve.halfLength+.55),n.prev={...n.pos},n.facing=n.team===0?Math.PI:0,n.charge=0,n.serveAim=n.isHuman?Et(n.pos.x*.25,-3.2,3.2):this.rng(-2.4,2.4)}this.ball.reset();let i=this.players.find(r=>r.id===this.serverId);i&&(this.ball.heldBy=i.id,this.ball.pos=this.handPos(i),this.ball.prev={...this.ball.pos}),this.touches=[0,0],this.lastAttackTime=[-10,-10],this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}],this.quickAttack=[null,null]}awardPoint(t){this.scores[t]++;let e=this.lastHitterByTeam[t];if(e!==null){let n=this.players.find(i=>i.id===e);n&&n.stats.points++}this.servingTeam=t,this.slowmoTimer=.9,this.touches=[0,0],this.lastAttackTime=[-10,-10],this.attackPlan=[{setterId:null,attackerId:null},{setterId:null,attackerId:null}],this.quickAttack=[null,null],this.setPhase("point"),this.phaseTimer=He.pointSeconds,this.events.emit("score",{winner:t,scores:[this.scores[0],this.scores[1]],setsWon:[this.setsWon[0],this.setsWon[1]]}),this.events.emit("announce",{text:t===this.humanTeam?"\u6211\u65B9\u5F97\u5206":"\u5BF9\u65B9\u5F97\u5206",ms:900})}afterPoint(){let[t,e]=this.scores,n=He.pointsToWinSet,i=null;if(this.suddenDeath)i=t>e?0:1;else if(t>=n)i=0;else if(e>=n)i=1;else if(this.timeUp)if(t!==e)i=t>e?0:1;else{this.suddenDeath=!0,this.events.emit("announce",{text:"DEUCE",sub:"\u4E0B\u4E00\u5206\u51B3\u5B9A\u672C\u5C40",ms:1700}),this.beginServe();return}if(i===null){this.beginServe();return}this.endSet(i)}endSet(t){this.setsWon[t]++,this.setPhase("setend"),this.phaseTimer=He.setEndSeconds,this.events.emit("setEnd",{winner:t,setsWon:[this.setsWon[0],this.setsWon[1]]}),this.events.emit("announce",{text:`SET ${this.setIndex+1}`,sub:t===this.humanTeam?"\u4F60\u7684\u961F\u4F0D\u62FF\u4E0B\u672C\u5C40":"\u5BF9\u624B\u62FF\u4E0B\u672C\u5C40",ms:2200})}afterSetEnd(){let t=this.setsWon[0]>=He.setsToWin?0:1;if(this.setsWon[0]>=He.setsToWin||this.setsWon[1]>=He.setsToWin){this.matchWinner=t,this.setPhase("matchend"),this.events.emit("matchEnd",{winner:this.matchWinner,mvp:this.mvpName()});return}let e=this.setsWon[0]>this.setsWon[1]?0:1;this.setIndex++,this.scores=[0,0],this.clock=He.setSeconds,this.timeUp=!1,this.suddenDeath=!1,this.servingTeam=e,this.lastHitterByTeam=[null,null],this.resetPlayers(),this.ball.reset(),this.setPhase("kickoff"),this.phaseTimer=He.kickoffSeconds,this.lastCount=-1,this.events.emit("announce",{text:`SET ${this.setIndex+1}`,sub:this.servingTeam===this.humanTeam?"\u6211\u65B9\u53D1\u7403":"\u5BF9\u65B9\u53D1\u7403",ms:1200})}setPhase(t){this.phase!==t&&(this.phase=t,this.events.emit("phase",{phase:t}))}};Yn();var $v='"PingFang SC","Microsoft YaHei",system-ui,sans-serif';function Me(s,t,e=Ga()){let n=document.createElement("canvas");n.width=Math.max(1,Math.round(s*e)),n.height=Math.max(1,Math.round(t*e));let i=n.getContext("2d");return i.scale(e,e),{canvas:n,ctx:i,scale:e}}function Se(s){let t=new be(s);return t.colorSpace=Qt,t.minFilter=Ie,t.magFilter=Ie,t.generateMipmaps=!1,t}function De(s,t,e,n,i,r=1){let a=new yn({map:s,transparent:!0,depthTest:!1,depthWrite:!1,side:ue}),o=new An(a);return o.scale.set(t,e,1),o.position.set(n,i,0),o.renderOrder=r,o}function wu(s,t){var n;let e=s.material;(n=e.map)==null||n.dispose(),e.map=t,e.needsUpdate=!0}function $t(s,t,e,n,i,r){let a=Math.min(r,n/2,i/2);s.beginPath(),s.moveTo(t+a,e),s.arcTo(t+n,e,t+n,e+i,a),s.arcTo(t+n,e+i,t,e+i,a),s.arcTo(t,e+i,t,e,a),s.arcTo(t,e,t+n,e,a),s.closePath()}function Au(s,t={}){var d,f,g,v,m;let e=(d=t.fontSize)!=null?d:16,n=(f=t.weight)!=null?f:700,i=(g=t.pad)!=null?g:4,r=(v=t.scale)!=null?v:Ga(),a=`${n} ${e}px ${$v}`,o=document.createElement("canvas").getContext("2d");o.font=a;let l=Math.ceil(o.measureText(s).width)+i*2,c=Math.ceil(e*1.35)+i*2,{canvas:h,ctx:u}=Me(l,c,r);return u.font=a,u.textAlign="center",u.textBaseline="middle",u.lineJoin="round",t.stroke&&t.strokeWidth&&(u.lineWidth=t.strokeWidth,u.strokeStyle=t.stroke,u.strokeText(s,l/2,c/2)),u.fillStyle=(m=t.color)!=null?m:"#ffffff",u.fillText(s,l/2,c/2),{tex:Se(h),width:l,height:c}}var Zv='"PingFang SC","Microsoft YaHei",system-ui,sans-serif',Pa=class{constructor(t,e){this.screenH=e;this.lines=[];this.t=0;this.W=356;this.H=142;this.topY=14;this.canvasUi=Me(this.W,this.H);this.tex=Se(this.canvasUi.canvas),this.sprite=De(this.tex,this.W,this.H,10+this.W/2,e-(this.topY+this.H/2),90),this.sprite.visible=!1,t.scene.add(this.sprite)}setVisible(t){this.sprite.visible=t}setLines(t){this.lines=t,this.redraw()}update(t){this.sprite.visible&&(this.t+=t,!(this.t<.5)&&(this.t=0,this.redraw()))}redraw(){let{ctx:t,scale:e}=this.canvasUi;t.setTransform(e,0,0,e,0,0),t.clearRect(0,0,this.W,this.H),t.fillStyle="rgba(5,12,22,0.82)",t.fillRect(0,0,this.W,this.H),t.strokeStyle="rgba(110,200,255,0.45)",t.lineWidth=1,t.strokeRect(.5,.5,this.W-1,this.H-1),t.textAlign="left",t.textBaseline="top",t.font=`600 11px ${Zv}`;let n=8;for(let i of this.lines.slice(0,8)){let r=i.length>46?i.slice(0,45)+"\u2026":i;t.fillStyle=r.startsWith("!")?"#ff9aa8":"#cfe6ff",t.fillText(r,9,n),n+=16}this.tex.needsUpdate=!0}};var Jv='"PingFang SC","Microsoft YaHei",system-ui,sans-serif',Kv={hit:{color:"#ff5d73",label:"\u51FB\u7403"},jump:{color:"#38bdf8",label:"\u8DF3\u8DC3"},block:{color:"#8b7cf6",label:"\u62E6\u7F51"},sprint:{color:"#fbbf24",label:"\u51B2\u523A"},spike:{color:"#ff5d73",label:"\u6263\u6740"},set:{color:"#38bdf8",label:"\u4E8C\u4F20"}},jv="#5ee8a8",Qv="#14b8a6";function Ia(s,t){let e=parseInt(s.slice(1),16),n=o=>Math.max(0,Math.min(255,Math.round(o*t))),i=n(e>>16&255),r=n(e>>8&255),a=n(e&255);return`rgb(${i},${r},${a})`}function tx(s,t){let{canvas:e,ctx:n}=Me(Math.max(2,Math.round(s)),Math.max(2,Math.round(t)),2),i=n.createLinearGradient(0,0,0,t);i.addColorStop(0,"rgba(18,30,46,0.52)"),i.addColorStop(.25,"rgba(15,25,40,0.72)"),i.addColorStop(1,"rgba(10,17,28,0.88)"),n.fillStyle=i,n.fillRect(0,0,s,t);let r=n.createLinearGradient(0,0,0,10);return r.addColorStop(0,"rgba(255,255,255,0.35)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,s,10),Se(e)}function ex(){let{canvas:e,ctx:n}=Me(124,124,2);n.beginPath(),n.ellipse(62,66,50,46,0,0,Math.PI*2),n.fillStyle="rgba(6,12,20,0.3)",n.fill();let i=n.createLinearGradient(0,12,0,112);i.addColorStop(0,"rgba(255,255,255,0.2)"),i.addColorStop(1,"rgba(255,255,255,0.08)"),n.beginPath(),n.arc(62,62,50,0,Math.PI*2),n.fillStyle=i,n.fill(),n.lineWidth=2.5,n.strokeStyle="rgba(255,255,255,0.6)",n.stroke(),n.beginPath(),n.arc(62,62,36,0,Math.PI*2),n.lineWidth=1.5,n.strokeStyle="rgba(255,255,255,0.22)",n.stroke(),n.fillStyle="rgba(255,255,255,0.5)";for(let[r,a]of[[0,-42],[0,42],[-42,0],[42,0]])n.beginPath(),n.arc(62+r,62+a,2.6,0,Math.PI*2),n.fill();return{tex:Se(e),size:124}}function nx(){let{canvas:e,ctx:n}=Me(64,64,2);n.beginPath(),n.ellipse(32,35,22,20,0,0,Math.PI*2),n.fillStyle="rgba(6,12,20,0.32)",n.fill();let i=n.createLinearGradient(0,10,0,54);return i.addColorStop(0,jv),i.addColorStop(1,Qv),n.beginPath(),n.arc(32,32,22,0,Math.PI*2),n.fillStyle=i,n.fill(),n.lineWidth=3,n.strokeStyle="rgba(255,255,255,0.9)",n.stroke(),n.beginPath(),n.ellipse(26,24,7,5,-.5,0,Math.PI*2),n.fillStyle="rgba(255,255,255,0.55)",n.fill(),{tex:Se(e),size:64}}function ix(s,t){s.beginPath(),s.arc(0,0,10,0,Math.PI*2),s.fillStyle="#ffffff",s.fill(),s.lineWidth=2,s.strokeStyle=t,s.lineCap="round",s.beginPath(),s.moveTo(-9,-3),s.quadraticCurveTo(0,2,9,-3),s.stroke(),s.beginPath(),s.moveTo(-6,7),s.quadraticCurveTo(0,1,6,7),s.stroke(),s.beginPath(),s.moveTo(-3,-9),s.quadraticCurveTo(2,0,-2,9),s.stroke()}function sx(s){s.lineWidth=3.4,s.strokeStyle="#ffffff",s.lineCap="round",s.lineJoin="round";for(let t of[3,-5])s.beginPath(),s.moveTo(-8,t+4),s.lineTo(0,t-4),s.lineTo(8,t+4),s.stroke()}function rx(s){s.lineWidth=2.6,s.strokeStyle="#ffffff",s.lineCap="round",$t(s,-10,-7,20,14,3),s.stroke(),s.lineWidth=1.8;for(let t of[-3.4,3.4])s.beginPath(),s.moveTo(t,-7),s.lineTo(t,7),s.stroke();s.beginPath(),s.moveTo(-10,0),s.lineTo(10,0),s.stroke()}function ax(s){s.lineWidth=3,s.strokeStyle="#ffffff",s.lineCap="round";for(let[t,e,n]of[[-5,-11,0],[1,-11,3],[7,-11,-1]])s.beginPath(),s.moveTo(e,t),s.lineTo(n,t),s.stroke();s.lineJoin="round",s.lineWidth=3.2,s.beginPath(),s.moveTo(2,-6),s.lineTo(11,1),s.lineTo(2,8),s.stroke()}function ox(s,t){s.beginPath(),s.arc(6,-6,4.2,0,Math.PI*2),s.fillStyle="#ffffff",s.fill(),s.lineWidth=1.6,s.strokeStyle=t,s.beginPath(),s.moveTo(2.4,-4.6),s.quadraticCurveTo(6,-6,9.4,-4.2),s.stroke(),s.lineWidth=3.4,s.strokeStyle="#ffffff",s.lineCap="round",s.lineJoin="round",s.beginPath(),s.moveTo(-2,-10),s.lineTo(-2,5),s.stroke(),s.beginPath(),s.moveTo(-8,0),s.lineTo(-2,8),s.lineTo(4,0),s.stroke(),s.lineWidth=2;for(let[e,n,i]of[[-8,-11,-7],[0,-11,-8],[8,-11,-9]])s.beginPath(),s.moveTo(n,e),s.lineTo(i,e),s.stroke()}function lx(s){s.beginPath(),s.arc(0,-7,4.2,0,Math.PI*2),s.fillStyle="#ffffff",s.fill(),s.lineWidth=3,s.strokeStyle="#ffffff",s.lineCap="round",s.lineJoin="round",s.beginPath(),s.moveTo(-10,2),s.quadraticCurveTo(-6,8,-1,3),s.stroke(),s.beginPath(),s.moveTo(10,2),s.quadraticCurveTo(6,8,1,3),s.stroke(),s.lineWidth=2.2,s.beginPath(),s.moveTo(-9,-2),s.lineTo(-9,-9),s.lineTo(-12,-6),s.stroke(),s.beginPath(),s.moveTo(9,-2),s.lineTo(9,-9),s.lineTo(12,-6),s.stroke()}var cx={hit:33,jump:26,block:26,sprint:23},hx={hit:"spike",jump:"set"};function La(s,t,e,n){let{color:i,label:r}=Kv[s],a=Math.ceil(e*2+24),o=a/2,{canvas:l,ctx:c}=Me(a,a),h=e/cx[t];c.beginPath(),c.ellipse(o,o+e*.55,e*.9,e*.34,0,0,Math.PI*2),c.fillStyle=n?"rgba(6,12,20,0.22)":"rgba(6,12,20,0.34)",c.fill();let u=n?Ia(i,.86):Ia(i,1.14),d=n?Ia(i,.7):Ia(i,.92),f=c.createLinearGradient(0,o-e,0,o+e);return f.addColorStop(0,u),f.addColorStop(1,d),c.beginPath(),c.arc(o,o,e,0,Math.PI*2),c.fillStyle=f,c.fill(),c.lineWidth=3,c.strokeStyle=n?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.7)",c.stroke(),n||(c.beginPath(),c.ellipse(o,o-e*.48,e*.6,e*.3,0,0,Math.PI*2),c.fillStyle="rgba(255,255,255,0.28)",c.fill()),c.save(),c.translate(o,o-e*.14),c.scale(h,h),s==="hit"?ix(c,i):s==="spike"?ox(c,i):s==="jump"?sx(c):s==="set"?lx(c):s==="block"?rx(c):ax(c),c.restore(),c.font=`800 ${(11*h).toFixed(1)}px ${Jv}`,c.textAlign="center",c.textBaseline="middle",c.lineJoin="round",c.lineWidth=3*h,c.strokeStyle="rgba(10,20,32,0.35)",c.strokeText(r,o,o+e*.52),c.fillStyle="#ffffff",c.fillText(r,o,o+e*.52),{tex:Se(l),size:a}}var Da=class{constructor(t,e,n,i,r){this.ui=t;this.platform=e;this.W=n;this.H=i;this.padH=r;this.root=new Zt;this.btns=[];this.joyVec={x:0,y:0};this.joyId=-1;this.hitEdge=!1;this.jumpEdge=!1;this.blockEdge=!1;this.hitHeld=!1;this.blockHeld=!1;this.sprintHeld=!1;this.spikeEdge=!1;this.setupEdge=!1;this.netMode=!1;this.enabled=!1;this.y0=i-r;let a=tx(n,r),o=De(a,n,r,n/2,i-(this.y0+r/2),0);this.root.add(o);let l=Math.min(this.platform.safeBottom,34),c=Math.max(124,i/6);this.joyHome={x:76,y:i-c+(c-l)*.52},this.joyOrigin={...this.joyHome};let h=ex();this.joyBaseSize=h.size,this.joyBase=De(h.tex,h.size,h.size,this.joyHome.x,i-this.joyHome.y,2);let u=nx();this.joyKnobSize=u.size,this.joyKnob=De(u.tex,u.size,u.size,this.joyHome.x,i-this.joyHome.y,4),this.root.add(this.joyBase,this.joyKnob);let f=i-l-6-37,g=f-66;this.addButton("hit",n-52,f,37,6),this.addButton("jump",n-94,g,29,4),this.addButton("block",n-140,f+2,29,4),this.addButton("sprint",n-160,g+2,26,4),this.ui.scene.add(this.root),this.root.visible=!1,this.updateVisual()}addButton(t,e,n,i,r){let a=La(t,t,i,!1),o=La(t,t,i,!0),l=hx[t],c=l?La(l,t,i,!1):void 0,h=l?La(l,t,i,!0):void 0,u=De(a.tex,a.size,a.size,e,this.H-n,4);this.root.add(u),this.btns.push({id:t,x:e,y:n,r:i,hitR:i+r,sprite:u,size:a.size,texNormal:a.tex,texPressed:o.tex,texNormalAlt:c==null?void 0:c.tex,texPressedAlt:h==null?void 0:h.tex,pointer:-1})}setVisible(t){this.root.visible=t}setEnabled(t){t||this.releaseAll(),this.enabled=t}onStart(t){if(!(!this.enabled||!this.root.visible)){for(let e of t){if(e.y<this.y0)continue;if(e.x<this.W*.5&&this.joyId<0){this.joyId=e.id,this.joyOrigin={x:Et(e.x,56,this.W*.5-16),y:Et(e.y,this.y0+48,this.H-48)},this.joyVec={x:0,y:0};continue}let n=this.hitButton(e.x,e.y);n&&n.pointer<0&&(n.pointer=e.id,this.press(n,!0),(n.id==="hit"||n.id==="jump")&&this.platform.vibrateShort())}this.updateVisual()}}onMove(t){if(this.joyId>=0){let e=t.find(n=>n.id===this.joyId);if(e){let n=e.x-this.joyOrigin.x,i=e.y-this.joyOrigin.y,r=Math.hypot(n,i),a=40,o=r>a?a/r:1;this.joyVec={x:n*o/a,y:i*o/a}}}this.updateVisual()}onEnd(t,e){for(let n of t){n.id===this.joyId&&(this.joyId=-1,this.joyVec={x:0,y:0},this.joyOrigin={...this.joyHome});for(let i of this.btns)i.pointer===n.id&&(i.pointer=-1,this.press(i,!1))}for(let n of this.btns)n.pointer>=0&&!e.some(i=>i.id===n.pointer)&&(n.pointer=-1,this.press(n,!1));this.updateVisual()}onCancel(){this.releaseAll(),this.updateVisual()}read(t){if(this.refreshNetMode(t),!this.enabled)return this.resetEdges(),an();let e=an(),n=Math.hypot(this.joyVec.x,this.joyVec.y);if(n>=.12){let i=Math.min(1,n)/n;e.moveX=this.joyVec.x*i,e.moveZ=this.joyVec.y*i}return e.sprint=this.sprintHeld,e.block=this.blockEdge,e.blockHeld=this.blockHeld,this.netMode?(e.spike=this.spikeEdge,e.setup=this.setupEdge):(e.jump=this.jumpEdge,e.hit=this.hitEdge,e.hitHeld=this.hitHeld),this.jumpEdge=!1,this.hitEdge=!1,this.blockEdge=!1,this.spikeEdge=!1,this.setupEdge=!1,e}refreshNetMode(t){if(!t)return;let e=t.players.find(a=>a.id===t.localPlayerId);if(!e)return;let n=e.team===0?e.pos.z>-.4:e.pos.z<.4,i=Math.abs(e.pos.z),r=t.phase==="rally"&&n&&(this.netMode?i<=3.25:i<=2.75);r!==this.netMode&&(this.netMode=r,this.jumpEdge=!1,this.hitEdge=!1,this.hitHeld=!1,this.spikeEdge=!1,this.setupEdge=!1,this.updateVisual())}hitButton(t,e){for(let n of this.btns){let i=t-n.x,r=e-n.y;if(i*i+r*r<=n.hitR*n.hitR)return n}return null}press(t,e){t.id==="jump"?e&&(this.netMode?this.setupEdge=!0:this.jumpEdge=!0):t.id==="hit"?this.netMode?e&&(this.spikeEdge=!0):(this.hitHeld=e,e&&(this.hitEdge=!0)):t.id==="block"?(this.blockHeld=e,e&&(this.blockEdge=!0)):this.sprintHeld=e}resetEdges(){this.jumpEdge=!1,this.hitEdge=!1,this.blockEdge=!1,this.spikeEdge=!1,this.setupEdge=!1}releaseAll(){this.joyId=-1,this.joyVec={x:0,y:0},this.joyOrigin={...this.joyHome};for(let t of this.btns)t.pointer=-1,this.press(t,!1);this.resetEdges(),this.updateVisual()}updateVisual(){let t=this.joyId>=0?this.joyOrigin.x:this.joyHome.x,e=this.joyId>=0?this.joyOrigin.y:this.joyHome.y,n=t+this.joyVec.x*40,i=e+this.joyVec.y*40;this.joyBase.position.set(t,this.H-e,0),this.joyKnob.position.set(n,this.H-i,0);let r=this.joyId>=0;this.joyKnob.scale.setScalar(this.joyKnobSize*(r?1.08:1)),this.joyBase.scale.setScalar(this.joyBaseSize*(r?1.04:1));for(let a of this.btns){let o=a.pointer>=0,l=this.netMode&&a.texNormalAlt!==void 0,c=a.sprite.material;c.map=o?l?a.texPressedAlt:a.texPressed:l?a.texNormalAlt:a.texNormal,c.needsUpdate=!0,a.sprite.scale.setScalar(a.size*(o?.86:1)),a.sprite.position.y=this.H-a.y-(o?2:0)}}};var di='"PingFang SC","Microsoft YaHei",system-ui,sans-serif',Ua=class{constructor(t,e,n,i,r=0){this.root=new Zt;this.scoreKey="";this.touchKey=-1;this.announceT=0;this.announcePop=0;this.W=e,this.y0=n-i,this.score=this.surface(330,96);let a=Math.min(r,60);this.scoreSprite=De(this.score.tex,330,96,e/2,n-(52+a),12),this.root.add(this.scoreSprite),this.announceUi=this.surface(340,104);let o=Math.min(r,30);this.announceSprite=De(this.announceUi.tex,340,104,e/2,n-((n-i)*.26+o),14),this.announceSprite.visible=!1,this.root.add(this.announceSprite),this.touch=this.surface(118,28),this.touchSprite=De(this.touch.tex,118,28,78,n-(this.y0-64),12),this.root.add(this.touchSprite);let l=Me(190,14);$t(l.ctx,1,1,188,12,6),l.ctx.fillStyle="rgba(10,17,28,0.55)",l.ctx.fill(),l.ctx.lineWidth=1.5,l.ctx.strokeStyle="rgba(255,255,255,0.4)",l.ctx.stroke(),this.serveTrack=De(Se(l.canvas),190,14,e/2,n-(this.y0-24),11),this.serveTrack.visible=!1,this.root.add(this.serveTrack);let c=Me(178,8),h=c.ctx.createLinearGradient(0,0,178,0);h.addColorStop(0,"#34d399"),h.addColorStop(.55,"#fbbf24"),h.addColorStop(1,"#ff5d73"),$t(c.ctx,0,0,178,8,4),c.ctx.fillStyle=h,c.ctx.fill();let u=new Ye(1,8);u.translate(.5,0,0),this.serveFill=new rt(u,new It({map:Se(c.canvas),transparent:!0,depthTest:!1,depthWrite:!1,side:ue})),this.serveFill.position.set(e/2-89,n-(this.y0-24),0),this.serveFill.renderOrder=12,this.serveFill.visible=!1,this.root.add(this.serveFill),this.pauseBg=new rt(new gs(16,40),new It({color:16777215,transparent:!0,opacity:.86,depthTest:!1,depthWrite:!1,side:ue})),this.pauseBg.position.set(e-30,n-132,0),this.pauseBg.renderOrder=12,this.root.add(this.pauseBg);let d=Au("II",{fontSize:14,weight:900,color:"#2b4a66",pad:1});this.pauseIcon=De(d.tex,d.width,d.height,e-30,n-132,13),this.root.add(this.pauseIcon),t.scene.add(this.root)}surface(t,e){let n=Me(t,e);return{...n,w:t,h:e,tex:Se(n.canvas)}}paint(t,e){t.ctx.setTransform(t.scale,0,0,t.scale,0,0),t.ctx.clearRect(0,0,t.w,t.h),e(t.ctx),t.tex.needsUpdate=!0}setVisible(t){this.root.visible=t}update(t){let e=Math.ceil(t.clock),n=t.clock<=5&&(t.phase==="rally"||t.phase==="serve"),i=`${e}|${t.scores[0]}|${t.scores[1]}|${t.setIndex}|${t.setsWon[0]}|${t.setsWon[1]}|${n}|${t.serverId}`;i!==this.scoreKey&&(this.scoreKey=i,this.drawScore(t,e,n));let r=t.touches[t.humanTeam];r!==this.touchKey&&(this.touchKey=r,this.drawTouch(r));let a=t.players.find(l=>l.id===t.localPlayerId),o=t.phase==="serve"&&!!a&&t.serverId===a.id;if(this.serveTrack.visible=o,this.serveFill.visible=o,o&&a){let l=Math.max(.03,Math.min(1,a.charge));this.serveFill.scale.x=178*l}}tick(t){if(this.announceT<=0)return;this.announceT-=t,this.announcePop=Math.max(0,this.announcePop-t);let e=this.announceSprite.material;e.opacity=Math.min(1,this.announceT/.28);let n=1+this.announcePop*.55;this.announceSprite.scale.set(340*n,104*n,1),this.announceT<=0&&(this.announceSprite.visible=!1)}announce(t,e,n=1200){t&&(this.paint(this.announceUi,i=>{i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font=`900 40px ${di}`,i.lineWidth=10,i.strokeStyle="rgba(9,26,44,0.55)",i.strokeText(t,170,e?44:52),i.fillStyle="#ffffff",i.fillText(t,170,e?44:52),e&&(i.font=`600 14px ${di}`,i.lineWidth=6,i.strokeStyle="rgba(9,26,44,0.5)",i.strokeText(e,170,80),i.fillStyle="rgba(255,255,255,0.92)",i.fillText(e,170,80))}),this.announceSprite.visible=!0,this.announceSprite.scale.set(340,104,1),this.announceSprite.material.opacity=1,this.announceT=n/1e3,this.announcePop=.16)}hitPause(t,e){if(!this.root.visible)return!1;let n=t-(this.W-30),i=e-132;return n*n+i*i<=676}drawScore(t,e,n){let[i,r]=t.scores,a=t.players.find(l=>l.id===t.serverId),o=a?a.team:-1;this.paint(this.score,l=>{$t(l,1,1,328,94,14),l.fillStyle="rgba(10,17,30,0.94)",l.fill(),l.lineWidth=1.5,l.strokeStyle="rgba(120,160,220,0.4)",l.stroke(),l.strokeStyle="rgba(255,255,255,0.12)",l.beginPath(),l.moveTo(16,3),l.lineTo(314,3),l.stroke(),l.textBaseline="middle",l.font=`700 11px ${di}`,l.fillStyle="#8ea3c2",l.textAlign="left",l.fillText(`SET ${t.setIndex+1}`,18,16),l.textAlign="right",l.fillText(`to ${He.pointsToWinSet}`,312,16),l.textAlign="center",l.font=`800 17px ${di}`,l.fillStyle=n?"#ff6b6b":"#e8f0ff",l.fillText(`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`,165,16);let c=(h,u,d,f)=>{$t(l,h,34,76,26,13),l.fillStyle=d,l.fill(),l.fillStyle="#ffffff",l.font=`900 12px ${di}`,l.fillText(u,h+38,47),f&&(l.beginPath(),l.arc(h+38,28,3.4,0,Math.PI*2),l.fillStyle="#ffd75e",l.fill())};c(14,"HOME","#16a34a",o===0),c(240,"AWAY","#e1437a",o===1),l.font=`900 38px ${di}`,l.lineWidth=5,l.strokeStyle="rgba(120,190,255,0.35)",l.lineJoin="round",l.strokeText(`${i} : ${r}`,165,49),l.fillStyle="#ffffff",l.fillText(`${i} : ${r}`,165,49);for(let h=0;h<3;h++)l.beginPath(),l.arc(150+h*15,80,3.4,0,Math.PI*2),l.fillStyle=h<t.setsWon[0]?"#22c55e":h>=3-t.setsWon[1]?"#e1437a":"#33415c",l.fill();l.font=`600 10px ${di}`,l.fillStyle="#66788f",l.textAlign="left",l.fillText("SETS",18,80),l.textAlign="right",l.fillText(`BO${He.setsToWin*2-1}`,312,80)})}drawTouch(t){this.paint(this.touch,e=>{$t(e,0,0,118,28,14),e.fillStyle=t>=3?"#ffe2e2":t===2?"#fff0e2":"rgba(255,255,255,0.9)",e.fill(),e.textAlign="left",e.textBaseline="middle",e.font=`700 12px ${di}`,e.fillStyle=t>=3?"#d94a4a":t===2?"#e08a2e":"#4a5f76",e.fillText(t>=3?"\u89E6\u7403\u5DF2\u6EE1":`\u89E6\u7403 ${t}/3`,12,14);for(let n=0;n<3;n++)e.beginPath(),e.arc(88+n*9,14,3,0,Math.PI*2),e.fillStyle=n<t?t>=3?"#e14b4b":"#35c47a":"#dbe5f0",e.fill()})}};var Na=class{constructor(t,e){this.width=t;this.height=e;this.scene=new fs;this.camera=new zs(0,t,e,0,-100,100),this.camera.position.set(0,0,10),this.camera.lookAt(0,0,0)}render(t){t.setViewport(0,0,this.width,this.height),t.setScissorTest(!1),t.render(this.scene,this.camera)}};Yn();var Wt='"PingFang SC","Microsoft YaHei",system-ui,sans-serif',kl="#22c55e",Ru="#e1437a",Ks=[{id:"easy",label:"\u7B80\u5355",sub:"\u8F7B\u677E\u4E0A\u624B",desc:"AI \u53CD\u5E94\u8F83\u6162\uFF0C\u9002\u5408\u7B2C\u4E00\u6B21\u73A9"},{id:"normal",label:"\u666E\u901A",sub:"\u6807\u51C6\u5BF9\u6218",desc:"\u9002\u4E2D\u7684 AI \u5F3A\u5EA6\uFF0C\u9002\u5408\u70ED\u8EAB"},{id:"hard",label:"\u56F0\u96BE",sub:"\u9AD8\u5F3A\u5EA6",desc:"AI \u5168\u901F\u53CD\u5E94\uFF0C\u8D62\u7403\u8981\u51ED\u771F\u672C\u4E8B"}];function Bl(s,t,e){let n=e+66;return{titleY:n,chibiY:n+132,cardY:n+232,cardH:92,descY:n+350,ctaY:n+410,pillY:n+490,tipsY:n+530,ruleY:t-66,verY:t-28,cx:s/2}}function _s(s,t,e,n,i,r,a,o){return De(t,e,n,i,a-r,o)}function ux(){let{canvas:e,ctx:n}=Me(360,168),i=360/2;n.save(),n.translate(i,62),n.rotate(-2.4*Math.PI/180),n.font=`900 62px ${Wt}`,n.textAlign="center",n.textBaseline="middle",n.lineJoin="round",n.fillStyle="rgba(8,18,32,0.55)",n.fillText("\u5F39\u5F39\u6392\u7403",4,7),n.lineWidth=9,n.strokeStyle="#16324a",n.strokeText("\u5F39\u5F39\u6392\u7403",0,0);let r=n.createLinearGradient(0,-34,0,34);return r.addColorStop(0,"#ffffff"),r.addColorStop(1,"#bfe8ff"),n.fillStyle=r,n.fillText("\u5F39\u5F39\u6392\u7403",0,0),n.restore(),$t(n,i-108,116,220,32,16),n.fillStyle="rgba(10,19,32,0.62)",n.fill(),n.fillStyle="#cfe0f4",n.font=`600 14px ${Wt}`,n.textAlign="center",n.textBaseline="middle",n.fillText("2v2 \xB7 7 \u5206\u5236 \xB7 \u4E09\u5C40\u4E24\u80DC",i+10,132),{tex:Se(e),w:360,h:168}}function Cu(s,t,e){let{canvas:r,ctx:a}=Me(96,124),o=96/2;return e&&(a.translate(96,0),a.scale(-1,1)),a.beginPath(),a.ellipse(o,116,26,7,0,0,Math.PI*2),a.fillStyle="rgba(6,14,24,0.4)",a.fill(),a.fillStyle="#2c3a4e",$t(a,o-14,88,10,22,5),a.fill(),$t(a,o+4,88,10,22,5),a.fill(),a.fillStyle="#ffffff",$t(a,o-17,104,15,8,4),a.fill(),$t(a,o+2,104,15,8,4),a.fill(),$t(a,o-22,52,44,42,12),a.fillStyle=s,a.fill(),a.fillStyle=s,$t(a,o-32,56,12,26,6),a.fill(),$t(a,o+20,56,12,26,6),a.fill(),a.beginPath(),a.arc(o,34,24,0,Math.PI*2),a.fillStyle="#f8cba6",a.fill(),a.beginPath(),a.arc(o,28,24,Math.PI*1.05,Math.PI*1.95),a.lineTo(o+24,30),a.arc(o,30,24,.15,Math.PI-.15,!0),a.closePath(),a.fillStyle=t,a.fill(),a.fillStyle="#23303f",a.beginPath(),a.arc(o-8,38,2.6,0,Math.PI*2),a.arc(o+8,38,2.6,0,Math.PI*2),a.fill(),a.fillStyle="rgba(255,120,140,0.4)",a.beginPath(),a.arc(o-13,44,4,0,Math.PI*2),a.arc(o+13,44,4,0,Math.PI*2),a.fill(),a.strokeStyle="#23303f",a.lineWidth=2,a.lineCap="round",a.beginPath(),a.arc(o,42,6,.25,Math.PI-.25),a.stroke(),{tex:Se(r),w:96,h:124}}function bs(s,t){let{canvas:i,ctx:r}=Me(280,92),a=10,o=10,l=260,c=64;r.beginPath(),r.ellipse(280/2,o+c+12,l*.42,10,0,0,Math.PI*2),r.fillStyle=t?"rgba(4,12,20,0.25)":"rgba(4,12,20,0.42)",r.fill();let h=r.createLinearGradient(0,o,0,o+c);t?(h.addColorStop(0,"#17a05a"),h.addColorStop(1,"#0f8a4c")):(h.addColorStop(0,"#34e187"),h.addColorStop(1,"#15b163")),$t(r,a,o+(t?3:0),l,c,c/2),r.fillStyle=h,r.fill(),r.lineWidth=3,r.strokeStyle="rgba(255,255,255,0.55)",r.stroke(),t||($t(r,a+8,o+6,l-16,c*.4,c*.2),r.fillStyle="rgba(255,255,255,0.22)",r.fill()),r.fillStyle="#ffffff",r.font=`900 25px ${Wt}`,r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.lineWidth=4,r.strokeStyle="rgba(10,60,35,0.35)";let u=o+c/2+(t?3:0);return r.strokeText(s,280/2,u),r.fillText(s,280/2,u),{tex:Se(i),w:280,h:92}}function Pu(s,t){let{canvas:i,ctx:r}=Me(112,104),a=112/2;if(t&&($t(r,0,0,112,104,20),r.fillStyle="rgba(52,225,135,0.35)",r.fill()),$t(r,4,4,104,96,17),t){let c=r.createLinearGradient(0,0,0,104);c.addColorStop(0,"#34e187"),c.addColorStop(1,"#15b163"),r.fillStyle=c}else r.fillStyle="rgba(12,22,36,0.72)";r.fill(),r.lineWidth=2,r.strokeStyle=t?"rgba(255,255,255,0.65)":"rgba(150,180,215,0.28)",r.stroke();let o=t?"#ffffff":"rgba(214,228,244,0.82)",l=t?"#0e7a44":"rgba(120,220,170,0.9)";if(r.save(),r.translate(a,34),s.id==="hard")r.fillStyle=t?"#ffd75e":"#ff9d4d",r.beginPath(),r.moveTo(0,-14),r.quadraticCurveTo(10,-4,8,6),r.quadraticCurveTo(6,14,0,14),r.quadraticCurveTo(-10,14,-9,4),r.quadraticCurveTo(-8,-4,-2,-8),r.quadraticCurveTo(-3,-2,1,1),r.quadraticCurveTo(4,-4,0,-14),r.fill();else if(r.beginPath(),r.arc(0,0,12,0,Math.PI*2),r.fillStyle=t?"#ffffff":"#e8f2ff",r.fill(),r.strokeStyle=l,r.lineWidth=2,r.beginPath(),r.moveTo(-10,-4),r.quadraticCurveTo(0,2,10,-4),r.stroke(),r.beginPath(),r.moveTo(-7,8),r.quadraticCurveTo(0,3,7,8),r.stroke(),s.id==="easy"){r.fillStyle=l;for(let[c,h,u]of[[-19,-5,2.2],[-24,-8,1.6],[-28,-11,1.1]])r.beginPath(),r.arc(c,h,u,0,Math.PI*2),r.fill()}return r.restore(),r.textAlign="center",r.textBaseline="middle",r.fillStyle=o,r.font=`800 16px ${Wt}`,r.fillText(s.label,a,66),r.font=`600 10px ${Wt}`,r.fillStyle=t?"rgba(255,255,255,0.85)":"rgba(150,170,195,0.7)",r.fillText(s.sub,a,84),{tex:Se(i),w:112,h:104}}var ka=class{constructor(t,e,n,i,r){this.ui=t;this.W=e;this.H=n;this.handlers=i;this.padH=r;this.root=new Zt;this.hits=[];this.state="none";this.skill="normal";this.layer=null;this.layerTex=null;this.titleSpr=null;this.chibiSpr=[];this.ctaSpr=null;this.ctaTexNormal=null;this.ctaTexPressed=null;this.ctaPressed=!1;this.diffSpr=[];this.diffTex=[];this.diffDescSpr=null;this.t=0;this.toastSpr=null;this.toastT=0;this.resultMode="local";this.roomPid=0;this.roomId="";this.roomPlayers=[];this.netDownMsg="";this.netCanReconnect=!0;this.fatalTitle="";this.fatalMsg="";let a=Me(2,2,1);this.bg=De(Se(a.canvas),2,2,e/2,n/2,60),this.root.add(this.bg),this.root.visible=!1,t.scene.add(this.root),this.panelTop=Math.max(24,Math.round(n*.122))}get visible(){return this.state!=="none"}showStart(t){this.skill=t,this.state="start",this.root.visible=!0,this.drawStart()}showResult(t,e,n){this.state="result",this.root.visible=!0,this.clearFx(),this.drawResult(t,e,n)}showPause(){this.state="pause",this.root.visible=!0,this.clearFx(),this.drawPause()}hide(){this.state="none",this.root.visible=!1,this.hits=[],this.ctaPressed=!1}update(t){if(this.t+=t,this.toastT>0&&this.toastSpr){this.toastT-=t;let n=this.toastSpr.material;n.opacity=Math.min(1,Math.max(0,this.toastT/.45)),this.toastT<=0&&(this.toastSpr.visible=!1)}if(this.state!=="start"||qn)return;let e=this.t;if(this.titleSpr){let n=1+Math.sin(e*2)*.014;this.titleSpr.scale.set(360*n,168*n,1)}if(this.ctaSpr&&!this.ctaPressed){let n=1.015+Math.sin(e*3.2)*.018;this.ctaSpr.scale.set(280*n,92*n,1)}this.chibiSpr.forEach((n,i)=>{let r=Bl(this.W,this.H,this.panelTop);n.position.y=this.H-r.chibiY+Math.sin(e*2.2+i*Math.PI)*4}),this.diffSpr.forEach((n,i)=>{let a=Ks[i].id===this.skill?1.1+Math.sin(e*2.6)*.02:1;n.scale.set(112*a,104*a,1)})}touchStart(t){if(!this.visible||t.length===0)return;let e=t[0];for(let n of this.hits)if(e.x>=n.x&&e.x<=n.x+n.w&&e.y>=n.y&&e.y<=n.y+n.h){this.activate(n.id,!0);return}}touchEnd(t){if(this.visible&&this.ctaPressed){let e=t[0],n=e?this.hits.find(r=>(r.id==="start"||r.id==="again"||r.id==="resume")&&e.x>=r.x&&e.x<=r.x+r.w&&e.y>=r.y&&e.y<=r.y+r.h):void 0,i=n==null?void 0:n.id;this.ctaPressed=!1,this.refreshCta(),i&&this.firePrimary(i)}}activate(t,e){if(t.startsWith("diff:")){this.skill=t.slice(5),this.refreshDiff(),this.drawStatic();return}if(t==="invite"){this.handlers.onInvite();return}if(t==="share"){this.handlers.onShare();return}if(t==="hostStart"){this.handlers.onHostStart();return}if(t==="roomCancel"||t==="netHome"){this.handlers.onRoomExit();return}if(t==="reconn"){this.handlers.onReconnect();return}if(t==="fatalRetry"){this.handlers.onFatalRetry();return}if(t==="fatalHome"){this.handlers.onRoomExit();return}let n=t==="start"||t==="again"||t==="resume";if(n&&e){this.ctaPressed=!0,this.refreshCta();return}n||t==="home"&&this.handlers.onHome()}firePrimary(t){this.state==="start"&&t==="start"?this.handlers.onStart(this.skill):this.state==="result"&&t==="again"?this.handlers.onAgain():this.state==="pause"&&t==="resume"&&this.handlers.onResume()}clearFx(){for(let t of[this.titleSpr,this.ctaSpr,this.diffDescSpr,...this.chibiSpr,...this.diffSpr])t&&this.root.remove(t);this.titleSpr=null,this.ctaSpr=null,this.diffDescSpr=null,this.chibiSpr=[],this.diffSpr=[],this.diffTex=[],this.ctaTexNormal=null,this.ctaTexPressed=null}drawStart(){this.clearFx(),this.hits=[],this.t=0;let t=Bl(this.W,this.H,this.panelTop),e=ux();this.titleSpr=_s(this.root,e.tex,e.w,e.h,t.cx,t.titleY,this.H,62),this.root.add(this.titleSpr);let n=Cu(kl,"#2e2622",!1),i=Cu(Ru,"#c9932f",!0);for(let[o,l]of[[n,t.cx-108],[i,t.cx+108]]){let c=_s(this.root,o.tex,o.w,o.h,l,t.chibiY,this.H,62);this.chibiSpr.push(c),this.root.add(c)}Ks.forEach((o,l)=>{let c=Pu(o,!1),h=Pu(o,!0);this.diffTex.push([c.tex,h.tex]);let u=t.cx+(l-1)*122,d=_s(this.root,c.tex,c.w,c.h,u,t.cardY+t.cardH/2,this.H,62),f=d.material;f.opacity=l===1?1:.85,this.diffSpr.push(d),this.root.add(d),this.hits.push({id:`diff:${o.id}`,x:u-56,y:t.cardY,w:112,h:t.cardH})}),this.refreshDiff();let r=bs(this.state==="start"?"\u5F00\u59CB\u6BD4\u8D5B":"\u518D\u6765\u4E00\u5C40",!1),a=bs(this.state==="start"?"\u5F00\u59CB\u6BD4\u8D5B":"\u518D\u6765\u4E00\u5C40",!0);this.ctaTexNormal=r.tex,this.ctaTexPressed=a.tex,this.ctaSpr=_s(this.root,r.tex,r.w,r.h,t.cx,t.ctaY,this.H,62),this.root.add(this.ctaSpr),this.hits.push({id:"start",x:t.cx-140,y:t.ctaY-46,w:280,h:92}),this.hits.push({id:"invite",x:t.cx-113,y:t.pillY-23,w:226,h:46}),this.drawStatic()}layerCanvas(){var e;if(!this.layer){this.layer=Me(this.W,this.H,$l());let n=this.bg.material;(e=n.map)==null||e.dispose(),this.layerTex=Se(this.layer.canvas),n.map=this.layerTex,n.needsUpdate=!0,this.bg.scale.set(this.W,this.H,1)}let t=this.layer.ctx;return t.setTransform(this.layer.scale,0,0,this.layer.scale,0,0),t.clearRect(0,0,this.W,this.H),t}commitLayer(){!this.layer||!this.layerTex||(this.layerTex.needsUpdate=!0,this.bg.scale.set(this.W,this.H,1))}drawStatic(){var h;let t=Bl(this.W,this.H,this.panelTop),e=this.layerCanvas();e.fillStyle="rgba(6,14,26,0.38)",e.fillRect(0,0,this.W,this.H);let n=e.createLinearGradient(0,0,0,this.H);n.addColorStop(0,"rgba(5,12,22,0.5)"),n.addColorStop(.28,"rgba(5,12,22,0)"),n.addColorStop(.8,"rgba(5,12,22,0)"),n.addColorStop(1,"rgba(5,12,22,0.55)"),e.fillStyle=n,e.fillRect(0,0,this.W,this.H),e.textAlign="center",e.textBaseline="middle",e.font=`900 26px ${Wt}`,e.lineJoin="round",e.lineWidth=6,e.strokeStyle="#16324a",e.strokeText("VS",t.cx,t.chibiY-6),e.fillStyle="#ffd75e",e.fillText("VS",t.cx,t.chibiY-6),e.textAlign="left",e.fillStyle="#9db2c9",e.font=`700 13px ${Wt}`,e.fillText("\u9009\u62E9\u96BE\u5EA6",t.cx-168,t.cardY-16),e.textAlign="center",e.font=`600 12.5px ${Wt}`,e.lineWidth=3,e.strokeStyle="rgba(5,12,22,0.8)";let i=(h=Ks.find(u=>u.id===this.skill))!=null?h:Ks[1];e.strokeText(i.desc,t.cx,t.descY),e.fillStyle="#b9cbdf",e.fillText(i.desc,t.cx,t.descY);let r=226,a=46,o=t.cx-r/2,l=t.pillY-a/2;$t(e,o,l,r,a,a/2),e.fillStyle="rgba(255,93,115,0.20)",e.fill(),e.lineWidth=2,e.strokeStyle="rgba(255,130,150,0.8)",e.stroke();for(let[u,d]of[[-7,1],[8,.55]]){let f=o+38+u;e.globalAlpha=d,e.fillStyle="#ffd6de",e.beginPath(),e.arc(f,l+17,5.4,0,Math.PI*2),e.fill(),$t(e,f-7.5,l+24,15,11,5.5),e.fill(),e.globalAlpha=1}e.font=`800 15.5px ${Wt}`,e.lineJoin="round",e.lineWidth=3,e.strokeStyle="rgba(5,12,22,0.75)",e.strokeText("\u9080\u8BF7\u597D\u53CB \xB7 2\u4EBA\u7EC4\u961F",o+r/2+14,t.pillY),e.fillStyle="#ffe6ec",e.fillText("\u9080\u8BF7\u597D\u53CB \xB7 2\u4EBA\u7EC4\u961F",o+r/2+14,t.pillY),[{label:"\u79FB\u52A8",draw:(u,d,f)=>this.iconStick(u,d,f)},{label:"\u51FB\u7403\xB7\u53D1\u7403",draw:(u,d,f)=>this.iconBall(u,d,f)},{label:"\u8DF3\u8DC3",draw:(u,d,f)=>this.iconJump(u,d,f)},{label:"\u62E6\u7F51",draw:(u,d,f)=>this.iconBlock(u,d,f)},{label:"\u51B2\u523A",draw:(u,d,f)=>this.iconSprint(u,d,f)}].forEach((u,d)=>{let f=t.cx+(d-2)*75;e.beginPath(),e.arc(f,t.tipsY,17,0,Math.PI*2),e.fillStyle="rgba(12,22,36,0.66)",e.fill(),e.lineWidth=1.5,e.strokeStyle="rgba(150,180,215,0.35)",e.stroke(),u.draw(e,f,t.tipsY),e.font=`600 10.5px ${Wt}`,e.lineWidth=3,e.strokeStyle="rgba(5,12,22,0.8)",e.strokeText(u.label,f,t.tipsY+30),e.fillStyle="#a9bdd2",e.fillText(u.label,f,t.tipsY+30)}),e.fillStyle="#8ca1b8",e.font=`600 11.5px ${Wt}`,e.fillText("\u6BCF\u961F\u6700\u591A\u4E09\u6B21\u89E6\u7403 \xB7 \u5148\u5F97 7 \u5206 \xB7 \u4E09\u5C40\u4E24\u80DC",t.cx,t.ruleY),e.fillStyle="rgba(140,161,184,0.55)",e.font=`600 10.5px ${Wt}`,e.fillText("\u5FAE\u4FE1\u5C0F\u6E38\u620F \xB7 \u7AD6\u5C4F\u624B\u67C4\u7248",t.cx,t.verY),this.commitLayer()}refreshDiff(){this.diffSpr.forEach((t,e)=>{let n=Ks[e].id===this.skill,i=t.material;if(i.map=this.diffTex[e][n?1:0],i.needsUpdate=!0,i.opacity=n?1:.85,qn){let r=n?1.1:1;t.scale.set(112*r,104*r,1)}})}refreshCta(){if(!this.ctaSpr||!this.ctaTexNormal||!this.ctaTexPressed)return;let t=this.ctaSpr.material;t.map=this.ctaPressed?this.ctaTexPressed:this.ctaTexNormal,t.needsUpdate=!0;let e=this.ctaPressed?.93:1;this.ctaSpr.scale.set(280*e,92*e,1)}setResultMode(t){this.resultMode=t}toast(t){let{canvas:e,ctx:n}=Me(360,52,2);n.textAlign="center",n.textBaseline="middle",n.lineJoin="round";let i=14.5;n.font=`700 ${i}px ${Wt}`,n.measureText(t).width>300&&(i=12,n.font=`700 ${i}px ${Wt}`);let r=Math.min(344,n.measureText(t).width+44);$t(n,180-r/2,8,r,36,18),n.fillStyle="rgba(9,16,28,0.92)",n.fill(),n.lineWidth=1.5,n.strokeStyle="rgba(140,175,220,0.4)",n.stroke(),n.lineWidth=3,n.strokeStyle="rgba(5,12,22,0.8)",n.strokeText(t,180,27),n.fillStyle="#e6eefb",n.fillText(t,180,27);let a=Se(e);this.toastSpr?wu(this.toastSpr,a):(this.toastSpr=De(a,360,52,this.W/2,this.H-262,70),this.root.add(this.toastSpr)),this.toastSpr.material.opacity=1,this.toastSpr.visible=!0,this.toastT=2.4}showRoom(t,e,n){this.state="room",this.root.visible=!0,this.roomPid=t,this.roomId=e,this.roomPlayers=n,this.clearFx(),this.drawRoom()}updateRoom(t){this.state==="room"&&(this.roomPlayers=t,this.drawRoom())}showNetDown(t,e){this.state="netdown",this.root.visible=!0,this.netDownMsg=t,this.netCanReconnect=e,this.clearFx(),this.drawNetDown()}showFatal(t,e){this.state="fatal",this.root.visible=!0,this.fatalTitle=t,this.fatalMsg=e,this.clearFx(),this.drawFatal()}drawFatal(){let{ctx:t}=this.overlay();t.fillStyle="rgba(4,9,16,0.34)",t.fillRect(0,0,this.W,this.H);let e=this.W/2,n=310,i=300,r=(this.W-n)/2,a=Math.round((this.H-i)/2);this.glassPanel(t,r,a,n,i),t.textAlign="center",t.textBaseline="middle",t.font=`900 22px ${Wt}`,t.fillStyle="#ff8a9a",t.fillText(this.fatalTitle.slice(0,16),e,a+46);let o=this.wrapFatal(this.fatalMsg);t.font=`600 12.5px ${Wt}`,t.fillStyle="#b9cbdf",o.slice(0,6).forEach((l,c)=>t.fillText(l,e,a+82+c*20)),this.candyButton(t,"fatalRetry",e,a+210,200,46,"\u91CD\u8BD5","rgba(52,225,135,0.75)","rgba(52,225,135,0.14)","#d5ffe8",16),this.candyButton(t,"fatalHome",e,a+262,180,34,"\u8FD4\u56DE\u9996\u9875","rgba(150,175,210,0.35)","rgba(0,0,0,0)","#c6d6ea",13),this.commitLayer()}wrapFatal(t){let e=[];for(let n of(t||"\u672A\u77E5\u9519\u8BEF").split(`
`)){let i="";for(let r of n)i+=r,i.length>=24&&(e.push(i),i="");i&&e.push(i)}return e}candyButton(t,e,n,i,r,a,o,l,c,h,u=15){$t(t,n-r/2,i-a/2,r,a,a/2),t.fillStyle=c,t.fill(),t.lineWidth=2,t.strokeStyle=l,t.stroke(),t.font=`800 ${u}px ${Wt}`,t.textAlign="center",t.textBaseline="middle",t.fillStyle=h,t.fillText(o,n,i+.5),this.hits.push({id:e,x:n-r/2,y:i-a/2,w:r,h:a})}drawRoom(){let{ctx:t}=this.overlay(),e=this.W/2,n=322,i=420,r=(this.W-n)/2,a=Math.round((this.H-i)/2-16);this.glassPanel(t,r,a,n,i),t.textAlign="center",t.textBaseline="middle",t.font=`900 24px ${Wt}`,t.fillStyle="#e8f0ff",t.fillText("\u597D\u53CB\u7EC4\u961F\u623F",e,a+46),t.font=`700 11.5px ${Wt}`,t.fillStyle="#8ca1b8",t.fillText("\u623F\u95F4\u53F7 \xB7 \u53D1\u7ED9\u597D\u53CB\u5373\u53EF\u8FDB\u623F",e,a+78),t.font=`900 30px ${Wt}`,t.lineJoin="round",t.lineWidth=6,t.strokeStyle="rgba(9,26,44,0.7)",t.strokeText(this.roomId,e,a+110),t.fillStyle="#ffd75e",t.fillText(this.roomId,e,a+110);for(let l=0;l<2;l++){let c=a+148+l*58,h=r+24,u=n-48,d=this.roomPlayers.find(f=>f.pid===l);d?($t(t,h,c,u,46,14),t.fillStyle=l===0?"rgba(34,197,94,0.14)":"rgba(255,93,115,0.12)",t.fill(),t.lineWidth=1.5,t.strokeStyle=l===0?"rgba(110,231,160,0.55)":"rgba(255,150,170,0.45)",t.stroke(),t.beginPath(),t.arc(h+30,c+23,14,0,Math.PI*2),t.fillStyle="rgba(255,255,255,0.16)",t.fill(),t.lineWidth=1.5,t.strokeStyle=l===0?kl:"#ff5d73",t.stroke(),t.font=`800 13px ${Wt}`,t.fillStyle="#ffffff",t.fillText(d.name.slice(0,1),h+30,c+24),t.textAlign="left",t.font=`800 15px ${Wt}`,t.fillStyle="#e6eefb",t.fillText(d.name.slice(0,8),h+52,c+19),t.font=`600 10.5px ${Wt}`,t.fillStyle=l===0?"#7ce8a8":"#ffb3c2",t.fillText(l===0?"\u623F\u4E3B":"\u5DF2\u5C31\u7EEA",h+52,c+35),t.textAlign="center"):($t(t,h,c,u,46,14),t.fillStyle="rgba(12,22,36,0.4)",t.fill(),t.setLineDash([6,5]),t.lineWidth=1.5,t.strokeStyle="rgba(130,150,180,0.4)",t.stroke(),t.setLineDash([]),t.font=`600 13px ${Wt}`,t.fillStyle="#75879d",t.fillText("\u7B49\u5F85\u597D\u53CB\u52A0\u5165\u2026",e,c+23))}this.roomPid===0?(this.candyButton(t,"share",e,a+300,216,46,"\u9080\u8BF7\u5FAE\u4FE1\u597D\u53CB","rgba(52,225,135,0.75)","rgba(52,225,135,0.14)","#d5ffe8",16),this.roomPlayers.length<2?this.candyButton(t,"hostStart",e,a+352,190,40,"\u7ACB\u5373\u5F00\u59CB \xB7 AI \u8865\u4F4D","rgba(160,190,230,0.45)","rgba(150,180,215,0.08)","#c6d6ea",13):(t.font=`600 12.5px ${Wt}`,t.fillStyle="#9db2c9",t.fillText("\u5DF2\u6EE1\u5458 \xB7 \u5373\u5C06\u5F00\u5C40",e,a+352))):(t.font=`700 14px ${Wt}`,t.fillStyle="#cfe0f4",t.fillText("\u7B49\u5F85\u623F\u4E3B\u5F00\u59CB\u2026",e,a+300)),this.candyButton(t,"roomCancel",e,a+392,120,32,"\u9000\u51FA\u623F\u95F4","rgba(150,175,210,0.35)","rgba(0,0,0,0)","#93a7bd",12.5),this.commitLayer()}drawNetDown(){let{ctx:t}=this.overlay();t.fillStyle="rgba(4,9,16,0.28)",t.fillRect(0,0,this.W,this.H);let e=this.W/2,n=300,i=250,r=(this.W-n)/2,a=Math.round((this.H-i)/2);this.glassPanel(t,r,a,n,i),t.textAlign="center",t.textBaseline="middle",t.font=`900 24px ${Wt}`,t.fillStyle="#ff8a9a",t.fillText("\u7F51\u7EDC\u65AD\u5F00",e,a+54),t.font=`600 13.5px ${Wt}`,t.fillStyle="#b9cbdf",this.netDownMsg.split(`
`).forEach((o,l)=>t.fillText(o,e,a+94+l*22)),this.netCanReconnect?(this.candyButton(t,"reconn",e,a+158,200,46,"\u91CD\u65B0\u8FDE\u63A5","rgba(52,225,135,0.75)","rgba(52,225,135,0.14)","#d5ffe8",16),this.candyButton(t,"netHome",e,a+212,180,36,"\u8FD4\u56DE\u5927\u5385","rgba(150,175,210,0.35)","rgba(0,0,0,0)","#c6d6ea",13)):this.candyButton(t,"netHome",e,a+176,200,46,"\u8FD4\u56DE\u5927\u5385","rgba(150,175,210,0.45)","rgba(0,0,0,0)","#c6d6ea",15),this.commitLayer()}overlay(){this.hits=[];let t=this.layerCanvas();return t.fillStyle="rgba(6,14,26,0.55)",t.fillRect(0,0,this.W,this.H),{ctx:t}}glassPanel(t,e,n,i,r){$t(t,e+3,n+8,i,r,24),t.fillStyle="rgba(4,10,18,0.35)",t.fill(),$t(t,e,n,i,r,24),t.fillStyle="rgba(11,20,34,0.88)",t.fill(),t.lineWidth=1.5,t.strokeStyle="rgba(140,175,220,0.3)",t.stroke()}drawResult(t,e,n){let{ctx:i}=this.overlay(),r=this.W/2,a=Math.round((this.H-470)/2);this.glassPanel(i,34,a,322,470);let o=e===t.humanTeam;i.textAlign="center",i.textBaseline="middle",i.fillStyle=o?"#3ce78c":"#ff6b8a",i.font=`900 38px ${Wt}`,i.fillText(o?"\u80DC\u5229\uFF01":"\u60DC\u8D25",r,a+66),i.fillStyle="#9db2c9",i.font=`600 13px ${Wt}`,i.fillText(o?"\u914D\u5408\u9ED8\u5951\uFF0C\u518D\u6765\u4E00\u5C40\uFF1F":"\u5DEE\u4E00\u70B9\uFF0C\u8C03\u6574\u8282\u594F\u518D\u6218",r,a+106),i.fillStyle="#ffffff",i.font=`900 52px ${Wt}`,i.fillText(`${t.setsWon[0]} : ${t.setsWon[1]}`,r,a+176),i.fillStyle="#8ca1b8",i.font=`600 13.5px ${Wt}`,i.fillText(n?`MVP \xB7 ${n}`:"",r,a+222);let l=[[0,"\u7EFF\u961F",kl],[1,"\u7EA2\u961F",Ru]];for(let[d,f,g]of l){let v=a+254+(d===0?0:34);$t(i,58,v,52,22,11),i.fillStyle=g,i.fill(),i.font=`900 11px ${Wt}`,i.fillStyle="#ffffff",i.fillText(f,84,v+12);let m=124;for(let p of t.players.filter(M=>M.team===d)){i.beginPath(),i.arc(m,v+11,11,0,Math.PI*2),i.fillStyle="rgba(255,255,255,0.14)",i.fill(),i.lineWidth=1.5,i.strokeStyle=g,i.stroke(),i.font=`800 11px ${Wt}`,i.fillStyle="#ffffff",i.fillText(p.name.slice(0,1),m,v+12),i.textAlign="left",i.font=`700 13px ${Wt}`,i.fillStyle="#dfe9f5";let M=p.name.length>6?`${p.name.slice(0,6)}\u2026`:p.name;i.fillText(M,m+17,v+12),m+=17+i.measureText(M).width+16,i.textAlign="center"}}let c=this.resultMode==="guest"?"\u7533\u8BF7\u518D\u6218":"\u518D\u6765\u4E00\u5C40",h=bs(c,!1),u=_s(this.root,h.tex,h.w,h.h,r,a+352,this.H,62);this.root.add(u),this.ctaSpr=u,this.ctaTexNormal=h.tex,this.ctaTexPressed=bs(c,!0).tex,this.hits.push({id:"again",x:r-140,y:a+306,w:280,h:92}),this.ghostButton(i,"home",r-110,a+414,220,44,"\u8FD4\u56DE\u5927\u5385"),this.commitLayer()}drawPause(){let{ctx:t}=this.overlay(),e=Math.round((this.H-300)/2);this.glassPanel(t,45,e,300,300),t.textAlign="center",t.textBaseline="middle",t.fillStyle="#e8f0ff",t.font=`900 32px ${Wt}`,t.fillText("\u6682\u505C",this.W/2,e+64);let n=bs("\u7EE7\u7EED\u6BD4\u8D5B",!1),i=_s(this.root,n.tex,n.w,n.h,this.W/2,e+146,this.H,62);this.root.add(i),this.ctaSpr=i,this.ctaTexNormal=n.tex,this.ctaTexPressed=bs("\u7EE7\u7EED\u6BD4\u8D5B",!0).tex,this.hits.push({id:"resume",x:this.W/2-140,y:e+100,w:280,h:92}),this.ghostButton(t,"home",this.W/2-110,e+208,220,46,"\u8FD4\u56DE\u5927\u5385"),this.commitLayer()}ghostButton(t,e,n,i,r,a,o){$t(t,n,i,r,a,a/2),t.fillStyle="rgba(120,150,190,0.16)",t.fill(),t.lineWidth=1.5,t.strokeStyle="rgba(140,175,220,0.35)",t.stroke(),t.textAlign="center",t.textBaseline="middle",t.fillStyle="#b9cbdf",t.font=`700 15px ${Wt}`,t.fillText(o,n+r/2,i+a/2),this.hits.push({id:e,x:n,y:i,w:r,h:a})}iconStick(t,e,n){t.strokeStyle="#9fd8ff",t.lineWidth=1.6,t.beginPath(),t.arc(e,n,9,0,Math.PI*2),t.stroke(),t.beginPath(),t.arc(e,n,3.4,0,Math.PI*2),t.fillStyle="#34e187",t.fill()}iconBall(t,e,n){t.beginPath(),t.arc(e,n,8,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.strokeStyle="#ff5d73",t.lineWidth=1.6,t.beginPath(),t.moveTo(e-7,n-2),t.quadraticCurveTo(e,n+2,e+7,n-2),t.stroke()}iconJump(t,e,n){t.strokeStyle="#7cc9ff",t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round";for(let i of[2,-4])t.beginPath(),t.moveTo(e-5,n+i+3),t.lineTo(e,n+i-3),t.lineTo(e+5,n+i+3),t.stroke()}iconBlock(t,e,n){t.strokeStyle="#b9a7ff",t.lineWidth=1.8,$t(t,e-7,n-5,14,10,2),t.stroke(),t.beginPath(),t.moveTo(e,n-5),t.lineTo(e,n+5),t.moveTo(e-7,n),t.lineTo(e+7,n),t.stroke()}iconSprint(t,e,n){t.strokeStyle="#ffd75e",t.lineWidth=2,t.lineCap="round";for(let[i,r]of[[-4,9],[1,12],[6,8]])t.beginPath(),t.moveTo(e-8,n+i),t.lineTo(e-8+r,n+i),t.stroke()}};var Ba=1/60,dx=15,js=class{constructor(t){this.skill="normal";this.state="start";this.mode="local";this.acc=0;this.last=0;this.rafId=0;this.disposed=!1;this.frameNo=0;this.lastFrameWall=0;this.lastGoodRender=0;this.fpsAcc=0;this.fpsFrames=0;this.fps=0;this.lowFpsStreak=0;this.dprCooldownUntil=0;this.framePending=!1;this.seq=0;this.rafBroken=!1;this.timerId=null;this.watchdogId=null;this.lastGlCheck=0;this.glLostAt=0;this.glLost=!1;this.degradeTried=!1;this.fatal=!1;this.modalShown=!1;this.pendingStart=null;this.startTapAt=0;this.playStartedAt=0;this.framesAtPlayStart=0;this.debugPanel=null;this.debugOn=Ss;this.lastErrText="";this.errStreak=0;this.dbgTaps=0;this.dbgTapAt=0;this.net=null;this.nick="\u73A9\u5BB6";this.remoteBuf=new hr;this.mirror=null;this.pendingEvents=[];this.snapTimer=0;this.snapSeq=0;this.downTries=0;this.reconnectTimer=null;this.platform=t,this.padH=Math.max(146,Math.round(t.height/6)+5)+Math.min(t.safeBottom,34),this.renderDpr=t.dpr,ge("boot"),this.scene=new wa(t.canvas,t.width,t.height,this.padH,t.dpr,n=>this.onGlEvent(n)),ge("scene-ctor",`dpr=${t.dpr} canvas=${t.width}x${t.height}`),this.ui=new Na(t.width,t.height),this.hud=new Ua(this.ui,t.width,t.height,this.padH,t.safeTop),this.pad=new Da(this.ui,t,t.width,t.height,this.padH),this.screens=new ka(this.ui,t.width,t.height,{onStart:n=>this.start(n),onAgain:()=>this.again(),onHome:()=>this.home(),onResume:()=>this.resume(),onInvite:()=>this.inviteCreate(),onShare:()=>this.shareInvite(),onHostStart:()=>this.hostStartFillAi(),onRoomExit:()=>this.home(),onReconnect:()=>this.reconnectNet(),onFatalRetry:()=>this.retryAfterFatal()},this.padH),this.audio=new lr(()=>t.createAudioContext()),this.world=this.createWorld(this.skill),ge("world-ready"),this.hud.setVisible(!1),this.pad.setVisible(!1),this.pad.setEnabled(!1),this.screens.showStart(this.skill),ge("screens-ready"),this.debugOn&&this.enableDebug(!0),this.bindTouches(),this.installErrorHooks();let e=t.getLaunchQuery();e.nick&&(this.nick=e.nick),t.getNickName(n=>{n&&(this.nick=n)}),e.room&&this.joinOnline(e.room),this.last=t.now(),this.lastFrameWall=this.last,this.startDriver(),this.armWatchdog();try{dc(this.scene.glInfo())}catch(n){ke("gl-info",n)}ge("schedule",`driver=${this.rafBroken?"timer":"raf"}`),typeof globalThis!="undefined"&&(globalThis.__paiqiu=this,globalThis.__paiqiuLoseCtx=()=>this.scene.debugLoseContext(),globalThis.__paiqiuDebug=n=>this.enableDebug(n))}dispose(){this.disposed=!0,this.releaseNet(),this.platform.cancelRaf(this.rafId),this.timerId!==null&&clearTimeout(this.timerId),this.watchdogId!==null&&clearInterval(this.watchdogId)}start(t){if(!this.pendingStart){ge("tap-start",t),this.skill=t,this.mode="local",this.state="start",this.fatal=!1;try{this.audio.unlock(),this.audio.startBgm(),ge("audio-ok")}catch(e){ke("audio",e)}this.pendingStart={skill:t,step:1},this.startTapAt=this.platform.now()}}pumpStart(){let t=this.pendingStart;if(t)try{if(t.step===1){this.world=this.createWorld(t.skill),ge("start:world"),t.step=2;return}if(t.step===2){this.world.startMatch(),ge("start:match"),t.step=3;return}this.pendingStart=null,this.state="playing",this.screens.hide(),this.screens.setResultMode("local"),this.hud.setVisible(!0),this.pad.setVisible(!0),this.pad.setEnabled(!0),this.acc=0,this.last=this.platform.now(),this.playStartedAt=this.last,this.framesAtPlayStart=this.frameNo,this.degradeTried=!1,ge("start:play",`frames=${this.frameNo}`)}catch(e){this.pendingStart=null,this.onFatal("\u5F00\u59CB\u6BD4\u8D5B\u5931\u8D25",e)}}again(){var t,e;this.mode==="host"?(t=this.net)==null||t.sendStart(this.skill):this.mode==="guest"?(e=this.net)==null||e.sendAgain():this.start(this.skill)}pause(){this.state!=="playing"||this.mode!=="local"||(this.state="paused",this.pad.setEnabled(!1),this.pad.setVisible(!1),this.screens.showPause())}resume(){this.state!=="paused"||this.mode!=="local"||(this.state="playing",this.screens.hide(),this.pad.setVisible(!0),this.pad.setEnabled(!0),this.acc=0,this.last=this.platform.now())}home(){this.releaseNet(),this.pendingStart=null,this.fatal=!1,this.modalShown=!1,this.errStreak=0,this.mode="local";try{this.world=this.createWorld(this.skill),this.state="start",this.screens.showStart(this.skill)}catch(t){this.onFatal("\u8FD4\u56DE\u9996\u9875\u5931\u8D25",t);return}this.hud.setVisible(!1),this.pad.setEnabled(!1),this.pad.setVisible(!1)}ensureNet(){if(this.net)return!0;let t=this.platform.getLaunchQuery();if(Ni&&ac())try{return this.net=new ur(e=>this.onNetEvent(e),Ni),!0}catch(e){return this.screens.toast("\u4E91\u8054\u673A\u521D\u59CB\u5316\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u73AF\u5883\u914D\u7F6E"),!1}return typeof WebSocket!="undefined"?(this.net=new dr(e=>this.onNetEvent(e),t.server||lc),!0):(this.screens.toast("\u4E91\u73AF\u5883\u672A\u914D\u7F6E \xB7 \u8054\u673A\u6682\u4E0D\u53EF\u7528"),!1)}inviteCreate(){var t;this.ensureNet()&&(this.mode="host",(t=this.net)==null||t.createRoom(this.nick))}joinOnline(t){var e;this.ensureNet()&&(this.mode="guest",(e=this.net)==null||e.joinRoom(t,this.nick))}shareInvite(){var e;let t=(e=this.net)==null?void 0:e.roomId;t&&(this.platform.shareAppMessage("\u5F39\u5F39\u6392\u7403\uFF5C\u6765\u548C\u6211\u7EC4\u961F\u6253\u6392\u7403\uFF012v2 \u8D70\u8D77",`room=${t}`),this.screens.toast("\u5DF2\u53D1\u8D77\u5206\u4EAB\uFF08\u6D4F\u89C8\u5668\u73AF\u5883\u5DF2\u590D\u5236\u9080\u8BF7\u94FE\u63A5\uFF09"))}hostStartFillAi(){var t;(t=this.net)==null||t.sendStart(this.skill)}reconnectNet(){var e,n;let t=(e=this.net)==null?void 0:e.roomId;if(!t){this.home();return}this.downTries=0,(n=this.net)==null||n.joinRoom(t,this.nick,!0)}releaseNet(){this.reconnectTimer!==null&&(clearTimeout(this.reconnectTimer),this.reconnectTimer=null),this.net&&(this.net.leave(),this.net=null),this.mirror=null,this.downTries=0}beginOnlineMatch(t){try{this.beginOnlineMatchInner(t),ge("online:play")}catch(e){this.onFatal("\u8054\u673A\u5F00\u5C40\u5931\u8D25",e)}}beginOnlineMatchInner(t){this.mode=this.net&&this.net.pid===1?"guest":"host",this.audio.unlock(),this.audio.startBgm();let e=new Js({teamSize:2,skill:t.skill,humanCount:t.fillAi?1:2,humanTeam:0,names:[t.names[0],t.names[1]],localPlayerId:this.net?this.net.pid:0,seed:t.seed});if(this.mode==="host"&&(e.inputProvider=n=>n===0?this.pad.read(this.world):this.remoteBuf.take(this.platform.now())),this.world=e,this.scene.build(e),this.mode==="guest")e.startMatch(),this.wire(e),this.mirror=new cr(e);else{let n=e.events;for(let i of ic)n.on(i,r=>this.pendingEvents.push([i,r]));this.wire(e),e.startMatch(),this.mirror=null}this.pendingEvents=[],this.snapTimer=0,this.snapSeq=0,this.screens.setResultMode(this.mode),this.state="playing",this.screens.hide(),this.hud.setVisible(!0),this.pad.setVisible(!0),this.pad.setEnabled(!0),this.acc=0,this.last=this.platform.now(),this.playStartedAt=this.last,this.framesAtPlayStart=this.frameNo,this.degradeTried=!1,this.pendingStart=null}sendSnapshot(){this.mode!=="host"||!this.net||(this.net.sendSnap(sc(this.world,this.snapSeq++,this.pendingEvents)),this.pendingEvents=[])}onNetEvent(t){var e,n,i;switch(t.t){case"room":this.downTries=0,this.screens.showRoom(t.pid,t.roomId,t.players);break;case"players":this.screens.updateRoom(t.players),this.mode==="host"&&this.state==="start"&&t.players.length>=2&&((e=this.net)==null||e.sendStart(this.skill));break;case"start":this.downTries=0,this.beginOnlineMatch(t.cfg);break;case"snap":(n=this.mirror)==null||n.apply(t.d,this.platform.now());break;case"input":this.remoteBuf.push(t.d,this.platform.now());break;case"peerBack":this.mode==="host"&&this.state==="playing"&&(this.world.setHumanControl(1,!0),this.screens.toast("\u597D\u53CB\u5DF2\u56DE\u5F52"));break;case"againReq":this.mode==="host"&&this.state==="result"&&((i=this.net)==null||i.sendStart(this.skill));break;case"peerLeft":this.onPeerLeft(t.reason);break;case"error":this.onNetError(t.code,t.msg);break;case"down":this.onTransportDown();break}}onPeerLeft(t){let e=t==="exit";if(this.state==="playing"){this.mode==="host"?(this.world.setHumanControl(1,!1),this.hud.announce(e?"\u597D\u53CB\u5DF2\u79BB\u5F00":"\u597D\u53CB\u65AD\u7EBF","AI \u961F\u53CB\u63A5\u7BA1",1400)):this.screens.showNetDown(`\u623F\u4E3B\u5DF2\u65AD\u5F00
\u672C\u5C40\u65E0\u6CD5\u7EE7\u7EED`,!1);return}if(this.state==="result"){this.screens.toast(e?"\u5BF9\u65B9\u5DF2\u8FD4\u56DE\u5927\u5385":"\u5BF9\u65B9\u5DF2\u65AD\u5F00");return}this.mode!=="local"&&(this.releaseNet(),this.mode="local",this.world=this.createWorld(this.skill),this.state="start",this.screens.showStart(this.skill),this.screens.toast(e?"\u5BF9\u65B9\u5DF2\u79BB\u5F00\uFF0C\u623F\u95F4\u89E3\u6563":"\u5BF9\u65B9\u65AD\u7EBF\uFF0C\u623F\u95F4\u89E3\u6563"))}onNetError(t,e){this.screens.toast(e||"\u64CD\u4F5C\u5931\u8D25"),this.state!=="playing"&&(this.screens.state==="room"||this.screens.state==="netdown")&&(this.releaseNet(),this.mode="local",this.world=this.createWorld(this.skill),this.state="start",this.screens.showStart(this.skill))}onTransportDown(){var t;if(this.state==="playing"){if(this.mode==="host"){this.world.setHumanControl(1,!1),this.hud.announce("\u7F51\u7EDC\u65AD\u5F00","AI \u961F\u53CB\u63A5\u7BA1",1400);return}if(this.downTries<3){this.downTries++;let e=(t=this.net)==null?void 0:t.roomId;e&&(this.reconnectTimer=setTimeout(()=>{var n;this.reconnectTimer=null,(n=this.net)==null||n.joinRoom(e,this.nick,!0)},800*this.downTries));try{this.hud.announce("\u6B63\u5728\u91CD\u8FDE",`\u7B2C ${this.downTries} \u6B21`,800)}catch(n){}return}this.downTries=0,this.screens.showNetDown(`\u91CD\u8FDE\u5931\u8D25
\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5`,!0);return}this.mode!=="local"&&this.screens.showNetDown("\u7F51\u7EDC\u8FDE\u63A5\u65AD\u5F00",!0)}createWorld(t){let e=new Js({teamSize:2,skill:t,humanCount:1,humanName:"\u4F60"});return e.inputProvider=()=>this.pad.read(e),this.scene.build(e),this.wire(e),e}wire(t){t.events.on("hit",e=>{this.scene.onHit(e),this.audio.hit(e.power,e.kind==="attack")}),t.events.on("block",e=>{this.scene.onBlock(e),this.audio.block()}),t.events.on("land",e=>{this.scene.onLand(e),this.audio.land()}),t.events.on("score",e=>{this.audio.score();for(let n of t.players)n.team===e.winner&&this.scene.celebratePlayer(n.id)}),t.events.on("announce",e=>{let n=e.sub;this.mode==="guest"&&e.text==="\u6211\u65B9\u53D1\u7403"&&t.serverId!==t.localPlayerId&&(n="\u961F\u53CB\u53D1\u7403 \xB7 \u505A\u597D\u63A5\u7403\u51C6\u5907"),this.hud.announce(e.text,n,e.ms)}),t.events.on("tick",()=>this.audio.tick()),t.events.on("serve",()=>this.audio.serve()),t.events.on("net",()=>this.audio.net()),t.events.on("jump",()=>this.audio.jump()),t.events.on("dive",()=>this.audio.dive()),t.events.on("swing",()=>this.audio.swing()),t.events.on("setEnd",()=>this.audio.fanfare()),t.events.on("matchEnd",e=>{var n,i;this.state="result",this.pad.setEnabled(!1),this.pad.setVisible(!1),this.hud.setVisible(!1),this.screens.showResult(t,e.winner,e.mvp),this.audio.fanfare(),(i=(n=this.net)==null?void 0:n.settle)==null||i.call(n,{winner:e.winner,setsWon:[t.setsWon[0],t.setsWon[1]],mvp:e.mvp}),this.mode==="host"&&this.sendSnapshot()})}guard(t,e){try{e()}catch(n){ke(t,n),this.enableDebug(!0),this.updateDebugPanel()}}tapDebug(t){if(this.platform.height-t.y>48||this.state!=="start")return;let e=this.platform.now();e-this.dbgTapAt>2e3&&(this.dbgTaps=0),this.dbgTapAt=e,this.dbgTaps++,this.dbgTaps>=5&&(this.dbgTaps=0,this.enableDebug(!this.debugOn),this.screens.toast(this.debugOn?"\u8C03\u8BD5\u9762\u677F\u5DF2\u5F00\u542F":"\u8C03\u8BD5\u9762\u677F\u5DF2\u5173\u95ED"),ge("debug-toggle",this.debugOn?"on":"off"))}bindTouches(){this.platform.onTouchStart(t=>{this.guard("touch-start",()=>{if(this.screens.visible){this.screens.touchStart(t);return}let e=t[0];if(this.state==="playing"&&this.mode==="local"&&e&&this.hud.hitPause(e.x,e.y)){this.pause();return}this.pad.onStart(t)})}),this.platform.onTouchMove(t=>{this.guard("touch-move",()=>{this.screens.visible||this.pad.onMove(t)})}),this.platform.onTouchEnd((t,e)=>{this.guard("touch-end",()=>{let n=t[0];if(n&&this.tapDebug(n),this.screens.visible){this.screens.touchEnd(t);return}this.pad.onEnd(t,e)})}),this.platform.onTouchCancel(()=>this.guard("touch-cancel",()=>this.pad.onCancel()))}startDriver(){this.framePending=!1,this.schedule()}schedule(){if(this.disposed||this.framePending)return;this.framePending=!0;let t=++this.seq,e=()=>{this.disposed||t!==this.seq||(this.framePending=!1,this.frame(),this.schedule())};if(this.rafBroken){this.timerId=setTimeout(e,16);return}try{let n=globalThis.requestAnimationFrame;typeof n=="function"?this.rafId=n.call(globalThis,e):this.rafId=this.platform.raf(()=>{e()})}catch(n){ke("raf",n),un("raf-fail",String(n)),this.rafBroken=!0,this.framePending=!1,this.schedule()}}armWatchdog(){this.watchdogId=setInterval(()=>{if(this.disposed)return;let t=this.platform.now(),e=t-this.lastFrameWall;if(e>320&&(un("watchdog:no-frame",`gap=${Math.round(e)}ms rafBroken=${this.rafBroken}`),this.rafBroken=!0,this.seq++,this.framePending=!1,this.frame(),this.schedule()),this.frameNo>0&&t-this.lastGoodRender>1200)if(this.degradeTried)t-this.lastGoodRender>3e3&&!this.fatal&&this.onFatal("\u753B\u9762\u505C\u6B62\u66F4\u65B0","\u6E32\u67D3\u65E0\u54CD\u5E94\uFF0C\u5B89\u5168\u6E32\u67D3\u4E5F\u6CA1\u80FD\u6062\u590D");else{this.degradeTried=!0,un("watchdog:degrade",`stall=${Math.round(t-this.lastGoodRender)}ms`);try{this.scene.applySafeFallback(),this.hud.announce("\u5DF2\u5207\u6362\u5B89\u5168\u6E32\u67D3","\u753B\u9762\u6062\u590D\u540E\u8BF7\u7EE7\u7EED\u6BD4\u8D5B",1500)}catch(n){ke("degrade",n)}}this.checkGl(t),this.updateDebugPanel(),this.pendingStart&&t-this.startTapAt>4e3&&this.onFatal("\u8FDB\u573A\u8D85\u65F6","\u70B9\u51FB\u5F00\u59CB\u540E 4 \u79D2\u4ECD\u672A\u8FDB\u5165\u5BF9\u5C40")},250)}checkGl(t){if(t-this.lastGlCheck<800)return;this.lastGlCheck=t;let e=this.scene.isContextLost();e&&!this.glLost?(this.glLost=!0,this.glLostAt=t,un("gl-lost"),this.screens.toast("\u6E32\u67D3\u4E0A\u4E0B\u6587\u4E22\u5931 \xB7 \u6B63\u5728\u6062\u590D")):!e&&this.glLost&&(this.glLost=!1,un("gl-restored"),this.screens.toast("\u6E32\u67D3\u5DF2\u6062\u590D"),this.degradeTried=!1),this.glLost&&t-this.glLostAt>3e3&&!this.fatal&&this.onFatal("\u663E\u5361\u4E0A\u4E0B\u6587\u4E22\u5931","\u753B\u9762\u6E32\u67D3\u5DF2\u4E2D\u65AD\uFF0C\u53EF\u70B9\u91CD\u8BD5\u6216\u91CD\u542F\u5C0F\u6E38\u620F")}onGlEvent(t){if(t==="webglcontextrestored"){this.glLost=!1,this.degradeTried=!1,un("gl-restored(event)");return}this.glLost=!0,this.glLostAt=this.platform.now(),un("gl-lost(event)")}frame(){var n,i,r,a,o,l,c;if(this.disposed)return;let t=this.platform.now(),e=(t-this.last)/1e3;(!Number.isFinite(e)||e<0)&&(e=0),e=Math.min(.1,e),this.last=t,this.fpsAcc+=e,this.fpsFrames++,this.fpsAcc>=1&&(this.fps=Math.round(this.fpsFrames/this.fpsAcc),this.fpsAcc=0,this.fpsFrames=0,this.maybeDegradeDpr());try{if(this.pumpStart(),this.state==="playing")if(this.mode==="guest")(n=this.mirror)==null||n.update(t),(i=this.net)==null||i.sendInput(this.pad.read(this.world)),this.scene.sync(this.world,(a=(r=this.mirror)==null?void 0:r.alpha)!=null?a:1,e),this.audio.update(e);else{let h=this.world.slowmoTimer>0;h&&(this.world.slowmoTimer=Math.max(0,this.world.slowmoTimer-e)),this.acc+=e*(h?.42:1);let u=0;for(;this.acc>=Ba&&u++<6;)this.world.step(Ba),this.acc-=Ba;this.scene.sync(this.world,this.acc/Ba,e),this.audio.update(e),this.mode==="host"&&(this.snapTimer+=e,this.snapTimer>=1/((l=(o=this.net)==null?void 0:o.snapHz)!=null?l:dx)&&(this.sendSnapshot(),this.snapTimer=0))}else this.acc=0,this.scene.sync(this.world,1,e);this.hud.update(this.world),this.hud.tick(e),this.screens.update(e),this.scene.render(),this.ui.render(this.scene.renderer),this.lastGoodRender=t,this.errStreak>0&&(this.errStreak=0,this.lastErrText="")}catch(h){this.onFrameError(h)}this.frameNo++,this.lastFrameWall=t,this.frameNo===1&&ge("first-frame",`dt=${Math.round(e*1e3)}ms`),(c=this.debugPanel)==null||c.update(e)}onFrameError(t){this.errStreak++;let e=ke("frame",t),n=`${e.stage}: ${e.message}`;n!==this.lastErrText&&(this.lastErrText=n,ge("frame-error",n)),this.enableDebug(!0),this.updateDebugPanel(),this.errStreak===3&&!this.modalShown&&(this.modalShown=!0,this.platform.showModal("\u6E38\u620F\u753B\u9762\u51FA\u9519",e.message.slice(0,200)))}enableDebug(t){var e;try{t&&!this.debugPanel&&(this.debugPanel=new Pa(this.ui,this.platform.height)),this.debugOn=t,cc(t),(e=this.debugPanel)==null||e.setVisible(t||!!this.lastErrText),t&&un("debug-on")}catch(n){ke("debug-panel",n)}}maybeDegradeDpr(){if(this.state!=="playing"){this.lowFpsStreak=0;return}if(this.platform.now()-this.playStartedAt<4e3||this.platform.now()<this.dprCooldownUntil||(this.fps<45?this.lowFpsStreak++:this.lowFpsStreak=0,this.lowFpsStreak<3))return;let t=Kl(this.renderDpr);if(this.lowFpsStreak=0,!!t)try{this.scene.setPixelRatio(t)&&(this.renderDpr=t,this.dprCooldownUntil=this.platform.now()+8e3,un("dpr:degrade",`fps=${this.fps} dpr=${t}`),ge("dpr:degrade"))}catch(e){ke("dpr",e)}}updateDebugPanel(){var n,i,r,a,o;if(!this.debugPanel||!this.debugOn&&!this.lastErrText)return;let t={};try{t=this.scene.glInfo()}catch(l){}let e=Math.round(this.platform.now()-this.playStartedAt);this.debugPanel.setLines([`st=${this.screens.state} play=${this.state} ${this.fps}fps f=${this.frameNo}`,`mode=${this.mode} ph=${this.world.phase} enter=${this.playStartedAt?e+"ms":"-"}`,`dpr=${(n=t.dpr)!=null?n:"?"} buf=${(i=t.buffer)!=null?i:"?"} gl=${(r=t.gl)!=null?r:"?"} maxTex=${(a=t.maxTex)!=null?a:"?"}`,`driver=${this.rafBroken?"timer":"raf"} lost=${(o=t.lost)!=null?o:!1} err=${this.errStreak}`,this.lastErrText?`!${this.lastErrText}`:"!none"]),this.debugPanel.setVisible(!0)}onFatal(t,e){if(this.fatal)return;this.fatal=!0,this.pendingStart=null,this.state="start",this.pad.setEnabled(!1),this.pad.setVisible(!1);let n=ke(t,e!=null?e:new Error(t));ge("fatal",t),this.lastErrText=`${t}: ${n.message}`,this.enableDebug(!0),this.updateDebugPanel();try{this.screens.showFatal(t,`${n.message}
\u53EF\u70B9\u300C\u91CD\u8BD5\u300D\u91CD\u65B0\u8FDB\u573A\uFF0C\u6216\u8FD4\u56DE\u9996\u9875\u3002`)}catch(i){}(this.glLost||this.errStreak>0)&&!this.modalShown&&(this.modalShown=!0,this.platform.showModal("\u5C0F\u6E38\u620F\u9047\u5230\u95EE\u9898",`${t}
${n.message}`.slice(0,220)))}retryAfterFatal(){if(un("retry"),this.fatal=!1,this.modalShown=!1,this.errStreak=0,this.lastErrText="",this.degradeTried=!1,this.glLost=!1,this.scene.isContextLost()){let t=this.scene.rebuildRenderer();if(ge("renderer-rebuild",t?"ok":"fail"),!t){this.fatal=!0,this.platform.showModal("\u6E32\u67D3\u65E0\u6CD5\u6062\u590D","\u8BF7\u6740\u6389\u5C0F\u6E38\u620F\u540E\u91CD\u65B0\u6253\u5F00\u3002");return}}try{this.world=this.createWorld(this.skill),this.screens.showStart(this.skill),this.start(this.skill)}catch(t){this.onFatal("\u91CD\u8BD5\u5931\u8D25",t)}}installErrorHooks(){var e,n,i;let t=globalThis;try{(n=(e=t.wx)==null?void 0:e.onError)==null||n.call(e,r=>{ke("wx.onError",r.message||r)})}catch(r){}try{(i=t.addEventListener)==null||i.call(t,"error",r=>{var o,l;let a=r;ke("window.error",(l=(o=a.error)!=null?o:a.message)!=null?l:"unknown"),this.enableDebug(!0),this.updateDebugPanel()})}catch(r){}}};async function Nu(){var s;try{if(typeof wx!="undefined"&&typeof wx.createCanvas=="function"){if(Ni)try{$a(Ni),ge("cloud-init")}catch(e){ke("cloud-init",e)}let{createWxPlatform:t}=await Promise.resolve().then(()=>(Lu(),Iu));new js(t())}else{let{createWebPlatform:t}=await Promise.resolve().then(()=>(Uu(),Du));new js(t())}}catch(t){ke("boot",t);let e=String((s=t==null?void 0:t.message)!=null?s:t).slice(0,200);try{typeof wx!="undefined"&&typeof wx.showModal=="function"&&wx.showModal({title:"\u5C0F\u6E38\u620F\u542F\u52A8\u5931\u8D25",content:e,showCancel:!1,confirmText:"\u77E5\u9053\u4E86"})}catch(n){}}}Nu();})();
