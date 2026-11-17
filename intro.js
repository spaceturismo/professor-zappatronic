/* Professor Zappatronic intro: plays over the homepage, then fades out. Runs in a shadow root so its styles stay separate. */
(function(){
  var host=document.createElement('div');host.id='pz-intro';
  var R=host.attachShadow({mode:'open'});
  R.innerHTML='<style>'+"\n.root{--bg:#090304;--fg:#f6f2e6;--dim:#8a86a0;--yel:#ffd21f;--org:#ff7a1a;--cy:#ff5a3c;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){--bg:#090304}}\n:root[data-theme=\"dark\"]{--bg:#090304}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\n.root{position:fixed;inset:0;z-index:1000;margin:0;background:radial-gradient(circle at 50% 42%,#4a0b12 0,#1c060a 52%,#090203 100%);color:var(--fg);font-family:Georgia,\"Times New Roman\",serif;overflow:hidden;user-select:none}\n#wrap{position:fixed;inset:0}\n#fx{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none}\n.scene{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;opacity:0;transform:scale(1.07);transition:opacity .9s ease,transform 2.2s cubic-bezier(.22,1,.36,1);text-align:center;padding:1.5rem;pointer-events:none}\n.scene.on{opacity:1;transform:none}\n.tiny{font:500 .75rem/1.4 system-ui,sans-serif;letter-spacing:.5em;padding-left:.5em;text-transform:uppercase;color:var(--dim)}\n.glowbg::before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 50% 42%,rgba(255,74,58,.2),rgba(255,210,31,.1) 35%,transparent 64%);animation:storm 2.8s ease-in-out infinite}\n@keyframes storm{0%,100%{opacity:.8}8%{opacity:1}12%{opacity:.55}16%{opacity:1}60%{opacity:.85}}\n/* professor */\n.pt{width:clamp(150px,34vw,250px)}\n.emb{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 0 22px rgba(255,90,40,.55))}\n.emb .rays{transform-origin:100px 100px;animation:raysp 1.6s ease-in-out infinite alternate}\n@keyframes raysp{to{transform:scale(1.08);opacity:.75}}\n.emb .coil{animation:coilz .5s steps(2) infinite}\n@keyframes coilz{50%{opacity:.5}}\n.sun{position:absolute;left:-60%;top:-60%;width:220%;height:220%;background:repeating-conic-gradient(from 0deg at 50% 50%,rgba(255,210,31,.11) 0 5deg,transparent 5deg 15deg);-webkit-mask-image:radial-gradient(circle at 50% 50%,#000 0,transparent 36%);mask-image:radial-gradient(circle at 50% 50%,#000 0,transparent 36%);animation:spin 50s linear infinite;pointer-events:none}\n@keyframes spin{to{transform:rotate(360deg)}}\n.tilt{display:flex;flex-direction:column;align-items:center;gap:1rem;transform:rotate(-5deg)}\n.bigbolt{position:absolute;left:50%;top:50%;z-index:-1;width:min(80vw,80vh);height:auto;transform:translate(-50%,-50%) rotate(8deg) scale(.4);opacity:0;filter:drop-shadow(0 0 30px rgba(255,90,30,.6))}\n.on .bigbolt{animation:bslam .5s .2s cubic-bezier(.2,1.4,.4,1) forwards}\n@keyframes bslam{from{opacity:0;transform:translate(-50%,-50%) rotate(8deg) scale(.4)}to{opacity:.9;transform:translate(-50%,-50%) rotate(8deg) scale(1)}}\n.pbody{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 0 18px rgba(255,210,31,.35))}\n.pbody .hair{transform-box:fill-box;transform-origin:50% 100%;animation:hairz .5s steps(2) infinite}\n@keyframes hairz{50%{transform:scale(1.03,1.06) rotate(1deg)}}\n.pbody .sp{opacity:0;animation:spk 1.3s infinite}\n.pbody .sp:nth-of-type(2){animation-delay:.4s}.pbody .sp:nth-of-type(3){animation-delay:.8s}\n@keyframes spk{0%,100%{opacity:0}20%,50%{opacity:1}}\n.pbody .lens{animation:lens 1.6s ease-in-out infinite}\n@keyframes lens{50%{fill:#fff}}\n.lg{display:block;width:100%;height:auto;border-radius:20%;box-shadow:0 0 0 2px rgba(255,210,31,.55),0 0 40px rgba(255,74,58,.55),0 0 90px rgba(255,122,26,.25)}\n.zap .emb{animation:zap .3s linear 4}\n@keyframes zap{25%{transform:translate(-3px,2px) scale(1.04);filter:brightness(1.8) drop-shadow(0 0 14px #ffd21f)}75%{transform:translate(3px,-2px)}}\n.on .pt{animation:pin 1.1s cubic-bezier(.2,1.2,.3,1) both}\n@keyframes pin{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:none}}\n/* names */\n.zn1{font-size:clamp(1rem,4vw,2rem);letter-spacing:.5em;padding-left:.5em;text-transform:uppercase;font-weight:700;color:var(--cy);text-shadow:0 0 16px rgba(255,74,58,.7)}\n.zn2{font-size:clamp(2rem,9.4vw,5.6rem);letter-spacing:.1em;padding-left:.1em;text-transform:uppercase;font-weight:700;margin:0;line-height:1;color:#ffd21f;-webkit-text-stroke:3px #2a0709;paint-order:stroke fill;text-shadow:0 5px 0 #b8200f,0 0 28px rgba(255,120,30,.6)}\n.nm{opacity:0;transform:scale(1.4);transition:opacity .25s 1.1s,transform .6s 1.1s cubic-bezier(.16,1.3,.3,1)}\n.on .nm{opacity:1;transform:none}\n.nm2{transition-delay:1.3s,1.3s}\n.sub{opacity:0;transition:opacity 1.2s 2.4s}\n.on .sub{opacity:1}\n/* title card */\n#s2 .zn2{font-size:clamp(2.2rem,10.4vw,6.6rem)}\n.bolt{width:clamp(48px,11vw,86px);overflow:visible;opacity:0;filter:drop-shadow(0 0 3px #ffd21f) drop-shadow(0 0 10px #ff7a1a) drop-shadow(0 0 22px #ff4a3a);shape-rendering:geometricPrecision}\n.bolt path{fill:none;stroke:#fff6c8;stroke-width:3;stroke-linejoin:round;stroke-linecap:round}\n.bolt .o{stroke:var(--yel);stroke-width:8;opacity:.5}\n.on .bolt{animation:neon 2.4s .35s forwards,hum 2.6s 2.8s ease-in-out infinite}\n@keyframes neon{0%{opacity:0}5%{opacity:1}8%{opacity:.1}11%{opacity:1}15%{opacity:.25}19%{opacity:1}24%{opacity:.5}28%,100%{opacity:1}}\n@keyframes hum{0%,100%{opacity:1}45%{opacity:.8}50%{opacity:.45}55%{opacity:1}}\n.bar{width:0;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--cy),var(--yel),var(--org));transition:width 1.2s 1.1s cubic-bezier(.22,1,.36,1)}\n.on .bar{width:min(50vw,360px);box-shadow:0 0 14px var(--cy),0 0 28px var(--yel)}\n/* title screen */\n#s3 .pt{width:clamp(110px,22vw,170px)}\n#s3 .zn1{font-size:clamp(.8rem,3vw,1.4rem)}\n#s3 .zn2{font-size:clamp(1.6rem,7vw,4rem)}\n.legal{margin-top:1rem;font-size:.6rem;letter-spacing:.25em;opacity:.7}\n.pslot{position:relative;height:4.6rem;width:100%;margin-top:.6rem}\n.pslot>*{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center}\n.pstart{font:700 clamp(1rem,3.4vw,1.6rem) system-ui,sans-serif;letter-spacing:.5em;padding-left:.5em;text-transform:uppercase;color:var(--yel);text-shadow:0 0 14px rgba(255,170,60,.7),0 0 34px rgba(255,74,58,.45);opacity:0;transition:opacity 1s 2.4s}\n#s3.on .pstart{opacity:1}\n.pstart span{display:inline-block;animation:blink 1.5s ease-in-out infinite}\n@keyframes blink{50%{opacity:.2}}\n#s3.loading .pstart{opacity:0;transition:opacity .25s}\n.load{opacity:0;transition:opacity .4s}\n.loadbar{height:4px;width:min(70vw,360px);margin:0 auto .9rem;background:rgba(255,255,255,.12);border-radius:2px;overflow:hidden}\n.loadbar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--cy),var(--yel),var(--org));box-shadow:0 0 12px var(--yel);transition:width 3.2s cubic-bezier(.4,0,.2,1)}\n#s3.loading .load{opacity:1}#s3.loading .loadbar i{width:100%}#s3.loaded .load{opacity:0}\n.done{opacity:0;transition:opacity 1s}#s3.loaded .done{opacity:1}\n.hud{position:absolute;inset:0;--lbh:clamp(26px,10vh,100px);pointer-events:none}\n.hud i{position:absolute;width:26px;height:26px;border:0 solid rgba(255,74,58,.7);opacity:0;transition:opacity 1.2s 1.6s}\n#s3.on .hud i{opacity:1}\n.hud i:nth-child(1){left:18px;top:calc(var(--lbh) + 16px);border-width:2px 0 0 2px}\n.hud i:nth-child(2){right:18px;top:calc(var(--lbh) + 16px);border-width:2px 2px 0 0}\n.hud i:nth-child(3){left:18px;bottom:calc(var(--lbh) + 16px);border-width:0 0 2px 2px}\n.hud i:nth-child(4){right:18px;bottom:calc(var(--lbh) + 16px);border-width:0 2px 2px 0}\n/* start screen */\n#start{position:fixed;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.6rem;background:radial-gradient(circle at 50% 42%,#4a0b12 0,#1c060a 52%,#090203 100%);transition:opacity 1.4s ease}\n#start::before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 50% 42%,rgba(255,74,58,.16),rgba(255,210,31,.08) 38%,transparent 62%);pointer-events:none}\n#start.out{opacity:0;pointer-events:none}\n.press{font:500 .8rem system-ui,sans-serif;letter-spacing:.3em;padding-left:.3em;text-transform:uppercase;color:var(--fg);animation:blink 2.2s ease-in-out infinite}\n/* cinema */\n.vig{position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,.6));z-index:3}\n.lb{position:fixed;left:0;right:0;height:0;background:#000;z-index:6;pointer-events:none;transition:height 1.8s cubic-bezier(.22,1,.36,1)}\n.lb.t{top:0}.lb.b{bottom:0}\n.root.cine .lb{height:clamp(26px,10vh,100px)}\n.grain{position:fixed;left:-50%;top:-50%;width:200%;height:200%;z-index:4;pointer-events:none;opacity:.08;animation:grain .8s steps(5) infinite}\n@keyframes grain{0%{transform:translate(0,0)}20%{transform:translate(-5%,3%)}40%{transform:translate(-3%,-6%)}60%{transform:translate(6%,4%)}80%{transform:translate(-4%,6%)}100%{transform:translate(0,0)}}\n@media (prefers-reduced-motion:reduce){.grain,.pbody .hair,.pbody .sp,.pbody .lens,.glowbg::before{animation:none}.scene,.nm{transition-duration:.4s}}\n\n.root{transition:opacity .8s ease}.root.bye{opacity:0;pointer-events:none}\n.skip{position:fixed;right:16px;bottom:16px;z-index:20;font:600 .7rem system-ui,sans-serif;letter-spacing:.25em;text-transform:uppercase;color:#f6f2e6;background:rgba(0,0,0,.6);border:1px solid rgba(255,210,31,.5);border-radius:8px;padding:.6rem .9rem;cursor:pointer}.skip:focus-visible{outline:3px solid #ffd21f;outline-offset:2px}"+'</style><div class="root">'+"\n<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\"><defs><linearGradient id=\"eg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffb02e\"/><stop offset=\"1\" stop-color=\"#e11d2a\"/></linearGradient></defs></svg>\n<div id=\"start\"><div class=\"sun\"></div><div class=\"pt\"></div><div class=\"press\">Press any key</div></div>\n\n<div id=\"wrap\">\n  <div class=\"sun\"></div>\n  <div class=\"scene glowbg\" id=\"s1\">\n    <div class=\"pt\"></div>\n    <div class=\"zn1 nm\">Professor</div>\n    <h1 class=\"zn2 nm nm2\">Zappatronic</h1>\n    <div class=\"tiny sub\">Presents</div>\n  </div>\n\n  <div class=\"scene\" id=\"s2\">\n    <svg class=\"bigbolt\" viewBox=\"0 0 200 200\"><path d=\"M120 10 L52 108 H94 L68 192 L152 76 H110 L148 10 Z\" fill=\"url(#eg)\" stroke=\"#1a0508\" stroke-width=\"5\" stroke-linejoin=\"round\"/></svg>\n    <div class=\"tilt\"><div class=\"zn1 nm\">Professor</div>\n    <h1 class=\"zn2 nm nm2\">Zappatronic</h1>\n    <div class=\"bar\"></div></div>\n  </div>\n\n  <div class=\"scene glowbg\" id=\"s3\">\n    <div class=\"hud\"><i></i><i></i><i></i><i></i></div>\n    <div class=\"pt\"></div>\n    <div class=\"zn1\">Professor</div>\n    <div class=\"zn2\">Zappatronic</div>\n    <div class=\"pslot\">\n      <div class=\"pstart\"><span>Press Start</span></div>\n      <div class=\"load\"><div class=\"loadbar\"><i></i></div><div class=\"tiny\">Loading</div></div>\n      <div class=\"done tiny\">Entering the lab</div>\n    </div>\n    <div class=\"tiny legal\">\u00a9 2026 Professor Zappatronic</div>\n  </div>\n  <canvas id=\"fx\"></canvas>\n</div>\n<div class=\"vig\"></div>\n<div class=\"grain\" id=\"grain\"></div><div class=\"lb t\"></div><div class=\"lb b\"></div>\n\n"+'<button type="button" class="skip">Skip intro</button></div>';
  var root=R.querySelector('.root'),dead=false,onEnd=null,de=document.documentElement,prev=de.style.overflow;
  de.style.overflow='hidden';
  document.body.appendChild(host);
  function finish(){if(dead)return;dead=true;root.classList.add('bye');de.style.overflow=prev;
    try{onEnd&&onEnd()}catch(e){}
    setTimeout(function(){host.remove()},900)}
  var skip=R.querySelector('.skip');
  skip.addEventListener('pointerdown',function(e){e.stopPropagation()});
  skip.addEventListener('click',finish);

(function(){
  onEnd=function(){try{ac&&ac.close()}catch(e){}};
  var PORTRAIT='<svg class="emb" viewBox="0 0 200 200"><circle cx="100" cy="100" r="97" fill="#5a0c14" stroke="#ffd21f" stroke-width="3"/><g class="rays" stroke="#ffd21f" stroke-width="7" stroke-linecap="round"><line x1="161.8" y1="105.4" x2="183.7" y2="107.3"/><line x1="153.3" y1="131.7" x2="178.2" y2="146.5"/><line x1="134.3" y1="151.7" x2="154.2" y2="181.7"/><line x1="108.5" y1="161.4" x2="111.5" y2="183.2"/><line x1="81.0" y1="159.0" x2="72.1" y2="186.6"/><line x1="57.3" y1="144.9" x2="32.5" y2="171.0"/><line x1="42.0" y1="121.9" x2="21.4" y2="129.7"/><line x1="38.2" y1="94.6" x2="9.3" y2="92.1"/><line x1="46.7" y1="68.3" x2="15.7" y2="49.9"/><line x1="65.7" y1="48.3" x2="53.6" y2="30.0"/><line x1="91.5" y1="38.6" x2="87.6" y2="9.9"/><line x1="119.0" y1="41.0" x2="130.1" y2="6.7"/><line x1="142.7" y1="55.1" x2="157.9" y2="39.1"/><line x1="158.0" y1="78.1" x2="185.1" y2="67.8"/></g><path d="M120 10 L52 108 H94 L68 192 L152 76 H110 L148 10 Z" fill="url(#eg)" stroke="#1a0508" stroke-width="5" stroke-linejoin="round"/><g transform="rotate(-38 100 100)"><rect x="10" y="82" width="180" height="36" rx="12" fill="#3a3a10" stroke="#ffd21f" stroke-width="4"/><g class="coil" stroke="#ffb02e" stroke-width="2.5" opacity=".8"><line x1="28" y1="86" x2="28" y2="114"/><line x1="37" y1="86" x2="37" y2="114"/><line x1="46" y1="86" x2="46" y2="114"/><line x1="55" y1="86" x2="55" y2="114"/><line x1="64" y1="86" x2="64" y2="114"/><line x1="73" y1="86" x2="73" y2="114"/><line x1="82" y1="86" x2="82" y2="114"/><line x1="91" y1="86" x2="91" y2="114"/><line x1="100" y1="86" x2="100" y2="114"/><line x1="109" y1="86" x2="109" y2="114"/><line x1="118" y1="86" x2="118" y2="114"/><line x1="127" y1="86" x2="127" y2="114"/><line x1="136" y1="86" x2="136" y2="114"/><line x1="145" y1="86" x2="145" y2="114"/><line x1="154" y1="86" x2="154" y2="114"/><line x1="163" y1="86" x2="163" y2="114"/><line x1="172" y1="86" x2="172" y2="114"/></g><text x="100" y="108" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="22" fill="#fff0a8" stroke="#2a0709" stroke-width="1" textLength="150" lengthAdjust="spacingAndGlyphs">ZAPPATRONIC</text></g></svg>';
  var $=function(i){return R.getElementById(i)},wrap=$('wrap'),cv=$('fx'),X=cv.getContext('2d');
  [].forEach.call(R.querySelectorAll('.pt'),function(e){e.innerHTML=PORTRAIT});
  var dpr=Math.min(window.devicePixelRatio||1,2),W=0,H=0,RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches);
  var ac=null,bolts=[],parts=[],rings=[],glows=[],rain=[],bursts=[],portal=null,flashA=0,flashC='#fff',shakeA=0,mode=null,cloudA=0,last=0,live=false,pt0=0,stage=null,lockT=0,armed=true;
  var CY='#ff4a3a',YE='#ffd21f',OR='#ff7a1a';
  function rnd(a,b){return a+Math.random()*(b-a)}
  function size(){W=window.innerWidth;H=window.innerHeight;cv.width=W*dpr;cv.height=H*dpr;X.setTransform(dpr,0,0,dpr,0,0)}
  window.addEventListener('resize',size);size();
  function only(id){['s1','s2','s3'].forEach(function(s){var e=$(s);e.classList.toggle('on',s===id)})}
  function cutTo(id){['s1','s2','s3'].forEach(function(s){var e=$(s);if(s!==id&&e.classList.contains('on')){e.style.transition='none';e.classList.remove('on');void e.offsetWidth;e.style.transition=''}});only(id)}

  /* lightning */
  function mid(x1,y1,x2,y2,d,out){var L=Math.hypot(x2-x1,y2-y1);if(d<=0||L<14){out.push([x2,y2]);return}
    var mx=(x1+x2)/2+rnd(-1,1)*L*.22,my=(y1+y2)/2+rnd(-1,1)*L*.22;mid(x1,y1,mx,my,d-1,out);mid(mx,my,x2,y2,d-1,out)}
  function bolt(x1,y1,x2,y2,c,w,life,br){var pts=[[x1,y1]];mid(x1,y1,x2,y2,6,pts);bolts.push({p:pts,c:c,w:w,life:life,t:life});
    for(var i=0;i<br&&pts.length>6;i++){var k=pts[Math.floor(rnd(2,pts.length-2))];bolt(k[0],k[1],k[0]+rnd(-1,1)*W*.18,k[1]+rnd(.1,.3)*H,c,w*.5,life*.8,0)}}
  function strokePts(p){X.beginPath();X.moveTo(p[0][0],p[0][1]);for(var i=1;i<p.length;i++)X.lineTo(p[i][0],p[i][1]);X.stroke()}
  function drawBolts(dt){X.lineJoin='round';X.lineCap='round';
    for(var i=bolts.length-1;i>=0;i--){var b=bolts[i];b.t-=dt;if(b.t<=0){bolts.splice(i,1);continue}
      X.globalAlpha=(b.t/b.life)*(Math.random()>.8?.45:1);X.shadowColor=b.c;X.shadowBlur=26;X.strokeStyle=b.c;X.lineWidth=b.w*2.4;strokePts(b.p);
      X.shadowBlur=8;X.strokeStyle='#fff';X.lineWidth=b.w;strokePts(b.p)}
    X.globalAlpha=1;X.shadowBlur=0}
  function strike(x,tx,ty,c,heavy,fc){bolt(x,-10,tx,ty,c,heavy?4:2.6,heavy?480:320,heavy?4:2);
    flashA=Math.max(flashA,(heavy?.5:.22)*(RM?.3:1));flashC=fc||'#fff0e0';if(!RM)shakeA=Math.max(shakeA,heavy?16:6);
    rings.push({x:tx,y:ty,r:0,c:c,heavy:heavy,a:1});glows.push({x:tx,y:ty,a:1});bursts.push({x:tx,y:ty,a:1})}
  function drawRings(dt){for(var i=rings.length-1;i>=0;i--){var o=rings[i];o.r+=dt*(o.heavy?1.1:.8);o.a-=dt/(o.heavy?900:650);if(o.a<=0){rings.splice(i,1);continue}
    X.globalAlpha=o.a*.8;X.strokeStyle=o.c;X.lineWidth=2+o.a*4;X.shadowColor=o.c;X.shadowBlur=18;X.beginPath();X.arc(o.x,o.y,o.r,0,6.3);X.stroke()}X.globalAlpha=1;X.shadowBlur=0}
  function drawGlows(dt){for(var i=glows.length-1;i>=0;i--){var o=glows[i];o.a-=dt/700;if(o.a<=0){glows.splice(i,1);continue}
    var r=260+(1-o.a)*180,g=X.createRadialGradient(o.x,o.y,0,o.x,o.y,r);g.addColorStop(0,'rgba(255,240,170,'+o.a*.45+')');g.addColorStop(.4,'rgba(255,74,58,'+o.a*.2+')');g.addColorStop(1,'rgba(255,74,58,0)');X.fillStyle=g;X.fillRect(o.x-r,o.y-r,r*2,r*2)}}
  function drawBursts(dt){X.lineCap='round';for(var i=bursts.length-1;i>=0;i--){var o=bursts[i];o.a-=dt/650;if(o.a<=0){bursts.splice(i,1);continue}
    var r=30+(1-o.a)*190;X.globalAlpha=o.a;X.strokeStyle=YE;X.shadowColor=OR;X.shadowBlur=10;X.lineWidth=5+o.a*6;
    for(var k=0;k<12;k++){var an=k*.5236+(k%2?.13:0),l=34+(k%3)*18;X.beginPath();X.moveTo(o.x+Math.cos(an)*r,o.y+Math.sin(an)*r);X.lineTo(o.x+Math.cos(an)*(r+l),o.y+Math.sin(an)*(r+l));X.stroke()}}
    X.globalAlpha=1;X.shadowBlur=0}
  function ambient(){
    if(mode==='spark'&&Math.random()<.05){var cx=W/2,cy=H*.4,a=rnd(0,6.28),r1=Math.min(W,H)*.18,r2=r1*rnd(1.3,2);
      bolt(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1,cx+Math.cos(a)*r2,cy+Math.sin(a)*r2,Math.random()<.5?CY:YE,1.4,160,1)}
    if(mode!=='storm')return;
    if(Math.random()<.02){var x=rnd(0,W);bolt(x,-10,x+rnd(-120,120),rnd(.2,.5)*H,Math.random()<.5?CY:YE,1.3,220,1)}
    if(Math.random()<.014){var y=H*rnd(.35,.6);bolt(W*rnd(.05,.25),y+rnd(-30,30),W*rnd(.75,.95),y+rnd(-30,30),Math.random()<.5?YE:OR,1.6,170,2)}
    if(Math.random()<.012){flashA=Math.max(flashA,.12*(RM?.3:1));flashC='#ffd9c0'}}
  function drawClouds(t){if(cloudA<.02)return;
    for(var i=0;i<7;i++){var cx=((i*.17*W+t*.012*(1+i*.1))%(W*1.3))-W*.15,cy=H*(.02+.05*Math.sin(i*2+t*.0004)),r=W*(.22+.05*(i%3)),lit=Math.min(1,flashA*1.6),g=X.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,'rgba('+(46+lit*209|0)+','+(12+lit*120|0)+','+(16+lit*40|0)+','+(.6*cloudA)+')');g.addColorStop(1,'rgba(20,4,6,0)');X.fillStyle=g;X.fillRect(cx-r,cy-r,r*2,r*2)}}
  function drawRain(){if(mode==='storm'&&rain.length<70&&Math.random()<.8)rain.push({x:rnd(0,W*1.1),y:-20,v:rnd(12,20),l:rnd(14,26)});
    X.lineWidth=1.2;X.lineCap='round';
    for(var i=rain.length-1;i>=0;i--){var d=rain[i];d.y+=d.v;d.x-=d.v*.22;if(d.y>H+30){rain.splice(i,1);continue}
      X.globalAlpha=.28;X.strokeStyle='#ff9a50';X.beginPath();X.moveTo(d.x,d.y);X.lineTo(d.x+d.l*.22,d.y-d.l);X.stroke()}X.globalAlpha=1}

  /* sparks */
  function spawn(){if(!mode||parts.length>120)return;
    parts.push({x:rnd(0,W),y:H+10,vx:rnd(-.3,.3),vy:-rnd(.5,2.2),l:0,m:rnd(160,320),r:rnd(1,3),c:['#fff3b0',YE,CY,OR][Math.floor(rnd(0,4))]})}
  function drawParts(){for(var i=parts.length-1;i>=0;i--){var p=parts[i];p.l++;p.x+=p.vx+Math.sin(p.l/20)*.3;p.y+=p.vy;var a=1-p.l/p.m;if(a<=0){parts.splice(i,1);continue}
    X.globalAlpha=a*.85*Math.min(1,p.l/40);X.fillStyle=p.c;X.shadowColor=p.c;X.shadowBlur=8;X.beginPath();X.arc(p.x,p.y,p.r,0,6.3);X.fill()}X.globalAlpha=1;X.shadowBlur=0}

  /* thunder portal */
  function openPortal(c1,c2,dur,cb){portal={s:performance.now(),d:dur,c1:c1,c2:c2,cb:cb,fired:false,cx:W/2,cy:H/2}}
  function drawPortal(now){var P=portal,p=(now-P.s)/P.d;if(p>=1){portal=null;return}
    var diag=Math.hypot(W,H)/2*1.1,e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,R=diag*1.3*e+1,fa=p<.64?1:Math.max(0,1-(p-.64)/.36);
    if(p>=.64&&!P.fired){P.fired=true;P.cb&&P.cb();flashA=.5;flashC='#fff';if(!RM)shakeA=14}
    X.save();X.globalAlpha=fa;var gr=X.createRadialGradient(P.cx,P.cy,0,P.cx,P.cy,R);
    gr.addColorStop(0,'#000');gr.addColorStop(.5,P.c2);gr.addColorStop(.9,P.c1);gr.addColorStop(1,'rgba(255,255,255,.9)');
    X.fillStyle=gr;X.beginPath();X.arc(P.cx,P.cy,R,0,6.3);X.fill();
    for(var k=0;k<7;k++){var rr=R*(.18+k*.12),a0=now/(220+k*40)*(k%2?1:-1)+k*1.1;X.strokeStyle=k%3?P.c1:YE;X.lineWidth=2+k*.5;X.shadowColor=X.strokeStyle;X.shadowBlur=18;
      X.beginPath();X.arc(P.cx,P.cy,rr,a0,a0+1.4+k*.12);X.stroke()}
    X.strokeStyle='#fff';X.lineWidth=5;X.shadowColor=P.c1;X.shadowBlur=30;X.beginPath();X.arc(P.cx,P.cy,R,0,6.3);X.stroke();X.restore();
    if(p<.7&&Math.random()<.55){var an=rnd(0,6.28);bolt(P.cx+Math.cos(an)*R,P.cy+Math.sin(an)*R,P.cx+Math.cos(an)*R*.3,P.cy+Math.sin(an)*R*.3,Math.random()<.5?P.c1:YE,2,170,0)}}

  /* timeline (seconds after the key press) */
  var ev=[
    {t:.35,f:function(){strike(W*.2,W*.26,H*.45,CY,false)}},
    {t:.8,f:function(){strike(W*.8,W*.72,H*.4,YE,false)}},
    {t:1.7,f:function(){strike(W/2,W/2,H*.42,'#fff',true,'#fff0e0');cutTo('s1');mode='spark'}},
    {t:6.6,f:function(){openPortal(CY,'#6a0f16',1700,function(){cutTo('s2');mode='storm'})}},
    {t:8.2,f:function(){var c=W/2;strike(c-90,c,H*.45,YE,true,'#fff2d0');strike(c+60,c+10,H*.48,CY,true)}},
    {t:8.8,f:function(){strike(W*.15,W*.3,H*.55,CY,false)}},
    {t:9.3,f:function(){strike(W*.85,W*.7,H*.55,OR,false)}},
    {t:11.4,f:function(){openPortal(YE,'#6a0f16',1700,function(){cutTo('s3');mode='spark';stage='c';lockT=performance.now()+3600})}}
  ];

  function loop(now){if(dead)return;
    var dt=Math.min(now-last,50);last=now;
    if(live){var T=(performance.now()-pt0)/1000;for(var e=0;e<ev.length;e++){var E=ev[e];if(!E.d&&T>=E.t){E.d=1;E.f()}}}
    X.clearRect(0,0,W,H);
    if(mode&&Math.random()<.6)spawn();
    cloudA+=((mode==='storm'?1:0)-cloudA)*.04;drawClouds(now);
    drawParts();drawRain();
    if(portal)drawPortal(now);
    ambient();drawBolts(dt);drawRings(dt);drawGlows(dt);drawBursts(dt);
    if(flashA>.01){X.globalAlpha=flashA;X.fillStyle=flashC;X.fillRect(0,0,W,H);X.globalAlpha=1;flashA*=.88}
    if(shakeA>.3){wrap.style.transform='translate('+rnd(-shakeA,shakeA)+'px,'+rnd(-shakeA,shakeA)+'px)';shakeA*=.9}
    else if(wrap.style.transform){wrap.style.transform=''}
    requestAnimationFrame(loop)}
  requestAnimationFrame(loop);

  /* sound (synthesized) */
  function noise(t,dur,vol,freq){var n=Math.floor(ac.sampleRate*dur),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);
    for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);var s=ac.createBufferSource();s.buffer=b;var f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=freq;
    var g=ac.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(f);f.connect(g);g.connect(ac.destination);s.start(t)}
  function boom(t,f0,vol){var o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(f0*2,t);o.frequency.exponentialRampToValueAtTime(f0,t+.5);
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+2);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+2.1);noise(t,1.2,vol*.45,900)}
  function riser(t,dur){var o=ac.createOscillator(),f=ac.createBiquadFilter(),g=ac.createGain();o.type='sawtooth';o.frequency.setValueAtTime(70,t);o.frequency.exponentialRampToValueAtTime(420,t+dur);
    f.type='lowpass';f.frequency.setValueAtTime(200,t);f.frequency.exponentialRampToValueAtTime(5000,t+dur);g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(.14,t+dur);g.gain.linearRampToValueAtTime(0,t+dur+.05);
    o.connect(f);f.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+dur+.1);noise(t,dur,.08,3000)}
  function whoosh(t,dur,vol){var n=Math.floor(ac.sampleRate*dur),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=Math.random()*2-1;
    var s=ac.createBufferSource();s.buffer=b;var f=ac.createBiquadFilter();f.type='bandpass';f.Q.value=1.2;f.frequency.setValueAtTime(200,t);f.frequency.exponentialRampToValueAtTime(3500,t+dur*.6);f.frequency.exponentialRampToValueAtTime(300,t+dur);
    var g=ac.createGain();g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(vol,t+dur*.6);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(f);f.connect(g);g.connect(ac.destination);s.start(t)}
  function hum(t,dur){var f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=320;f.connect(ac.destination);
    [55,110.6,165.2].forEach(function(fr,i){var o=ac.createOscillator(),g=ac.createGain();o.type=i?'sine':'sawtooth';o.frequency.value=fr;
      g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(i?.02:.035,t+1.2);g.gain.linearRampToValueAtTime(i?.02:.035,t+dur-1);g.gain.linearRampToValueAtTime(.001,t+dur);o.connect(g);g.connect(f);o.start(t);o.stop(t+dur+.1)})}
  function chord(t,vol){[110,165,220,277.2,330].forEach(function(fr,i){var o=ac.createOscillator(),g=ac.createGain();o.type=i%2?'triangle':'sine';o.frequency.value=fr;
    g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(vol,t+.15);g.gain.exponentialRampToValueAtTime(.001,t+4);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+4.1)})}
  function synth(){var t=ac.currentTime+.15;
    hum(t,13);noise(t+.35,.3,.3,5000);noise(t+.8,.3,.3,5000);noise(t+.4,2.2,.3,260);riser(t+.5,1.2);
    noise(t+1.7,.4,.8,10000);boom(t+1.72,44,.9);noise(t+1.85,2.4,.5,240);
    riser(t+4.4,2.2);whoosh(t+6.5,1.9,.5);boom(t+7.7,46,.8);
    noise(t+8.2,.4,.8,10000);boom(t+8.22,40,.9);noise(t+8.8,.3,.5,9000);noise(t+9.3,.3,.5,9000);
    whoosh(t+11.3,1.9,.5);boom(t+12.5,46,.7);chord(t+12.6,.06)}

  /* start, continue, press start */
  function startGame(){var c=$('s3');c.classList.add('loading','zap');
    strike(W/2,W/2,H*.45,YE,true,'#fff2d0');
    try{if(ac){var t=ac.currentTime;noise(t,.4,.7,9000);boom(t+.02,44,.7)}}catch(e){}
    setTimeout(function(){c.classList.add('loaded');c.classList.remove('zap');setTimeout(finish,1400)},3800)}
  function adv(){if(stage!=='c'||performance.now()<lockT)return;stage='go';startGame()}
  function go(){if(!armed)return;armed=false;
    $('start').classList.add('out');setTimeout(function(){$('start').style.display='none'},1500);
    try{ac=new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();synth()}catch(e){ac=null}
    root.classList.add('cine');pt0=performance.now()+150;live=true}
  document.addEventListener('keydown',function(e){if(dead)return;if(armed)go();else if(e.key===' '||e.key==='Enter')adv()});
  document.addEventListener('pointerdown',function(){if(dead)return;if(armed)go();else adv()});

  try{var gN=document.createElement('canvas');gN.width=gN.height=128;var gC=gN.getContext('2d'),gI=gC.createImageData(128,128);
    for(var gi=0;gi<gI.data.length;gi+=4){var gv=Math.random()*255;gI.data[gi]=gI.data[gi+1]=gI.data[gi+2]=gv;gI.data[gi+3]=255}
    gC.putImageData(gI,0,0);$('grain').style.backgroundImage='url('+gN.toDataURL()+')'}catch(e){}
})();

})();
