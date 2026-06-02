(function(){
  const smallScreen=matchMedia('(max-width:820px)').matches;
  const coarse=matchMedia('(pointer:coarse)').matches; // touch, niente mouse preciso
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  // Mobile = schermo piccolo OPPURE puntatore touch.
  // (i core CPU da soli non bastano: un desktop con 4 core resta desktop)
  const isMobile = smallScreen || coarse;
  document.body.classList.add(isMobile?'is-mobile':'is-desktop');

  const hero=document.getElementById('hero');
  const layers=[...document.querySelectorAll('.layer')]; // 5 strati, data-i 0..4
  const blocks=[...document.querySelectorAll('.hud-block')];
  const hint=document.getElementById('hint');
  const prog=document.getElementById('prog');
  const dc1=document.getElementById('dc1'),dc2=document.getElementById('dc2'),deco=document.getElementById('deco');
  const titleRule=document.getElementById('titleRule');

  let target=0,current=0,mx=0,my=0,cmx=0,cmy=0;
  const lerp=(a,b,t)=>a+(b-a)*t, clamp=(v,a,b)=>Math.min(Math.max(v,a),b);
  const easeInOut=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2, easeOut=t=>1-Math.pow(1-t,3);

  function computeTarget(){const r=hero.getBoundingClientRect();const total=hero.offsetHeight-window.innerHeight;target=clamp(-r.top/total,0,1);}
  addEventListener('scroll',computeTarget,{passive:true}); addEventListener('resize',computeTarget); computeTarget();

  // 5 strati: indice 4 (intro) in cima e' il primo visibile -> svanisce per primo.
  // finestre di crossfade scaglionate sull'intero scroll.
  // l'array e' indicizzato per "ordine dall'alto" (0 = strato piu' in alto).
  const fadeTop=[
    {s:.05,e:.28},  // intro  (i=4) svanisce -> rivela focus
    {s:.26,e:.48},  // focus  (i=3)
    {s:.46,e:.68},  // centrale (i=2)
    {s:.66,e:.88},  // outro  (i=1)
    {hold:true},    // empty  (i=0) resta sotto
  ];
  const phases=[
    {in:.02,full:.10,out:.20,end:.26},
    {in:.18,full:.30,out:.44,end:.50},
    {in:.44,full:.58,out:.74,end:.80},
    {in:.80,full:.92,out:1.1,end:1.2},
  ];

  function applyPhases(p){
    blocks.forEach((b,i)=>{
      const ph=phases[i];let op,ty;
      if(p<ph.in){op=0;ty=30;}
      else if(p<ph.full){const k=easeOut((p-ph.in)/(ph.full-ph.in));op=k;ty=30*(1-k);}
      else if(p<ph.out){op=1;ty=0;}
      else if(p<ph.end){const k=easeInOut((p-ph.out)/(ph.end-ph.out));op=1-k;ty=-26*k;}
      else{op=0;ty=-26;}
      const base=b.classList.contains('motto')?'translateY(-50%) ':b.classList.contains('titleblock')?'translate(-50%,-50%) ':b.classList.contains('closing')?'translateX(-50%) ':'';
      b.style.opacity=op.toFixed(3); b.style.transform=base+'translateY('+ty+'px)';
    });
    titleRule.style.width=(clamp((p-.50)/.10,0,1)*120)+'px';
    prog.style.width=(target*100).toFixed(2)+'%';
    hint.style.opacity=p>.03?0:1;
  }

  function fadeFor(i){ return fadeTop[layers.length-1-i]; } // i=4 -> top[0]

  // DESKTOP completo
  function frameDesktop(){
    current=lerp(current,target,0.055); cmx=lerp(cmx,mx,0.045); cmy=lerp(cmy,my,0.045);
    const p=current,t=performance.now()*0.00004;
    layers.forEach((l,i)=>{
      const depth=i/(layers.length-1), speed=0.08+depth*0.55;
      const y=p*speed*innerHeight*-1.0;
      const scale=(1.05+depth*0.05)+p*speed*0.10+Math.sin(t*6.28+i)*0.004;
      const px=cmx*(6+depth*28),py=cmy*(4+depth*18),rot=cmx*depth*2.0;
      l.style.transform='translate3d('+px+'px,'+(y+py)+'px,0) scale('+scale+') rotateY('+rot+'deg)';
      const f=fadeFor(i);
      l.style.opacity=f.hold?1:(1-easeInOut(clamp((p-f.s)/(f.e-f.s),0,1)));
      const bl=(i<layers.length-1)?(p*depth*1.2):0;
      l.style.filter='blur('+bl.toFixed(2)+'px) saturate('+(1+depth*0.04)+')';
    });
    applyPhases(p);
    const dp=clamp((p-.44)/.30,0,1);
    dc1.style.strokeDashoffset=289*(1-easeOut(dp));
    dc2.style.strokeDashoffset=239*(1-easeOut(clamp(dp*1.1-.05,0,1)));
    deco.style.opacity=(clamp(dp*1.3,0,1)*clamp(1-(p-.78)/.08,0,1)).toFixed(3);
    deco.style.transform='translate(-50%,-50%) rotate('+(p*40)+'deg)';
    requestAnimationFrame(frameDesktop);
  }

  // MOBILE snello (no blur/3D/mouse)
  function frameMobile(){
    current=lerp(current,target,0.10);
    const p=current;
    layers.forEach((l,i)=>{
      const depth=i/(layers.length-1), speed=0.06+depth*0.30;
      const y=p*speed*innerHeight*-1.0;
      const scale=1.04+p*speed*0.05;
      l.style.transform='translate3d(0,'+y+'px,0) scale('+scale.toFixed(4)+')';
      const f=fadeFor(i);
      l.style.opacity=f.hold?1:(1-easeInOut(clamp((p-f.s)/(f.e-f.s),0,1)));
    });
    applyPhases(p);
    requestAnimationFrame(frameMobile);
  }

  if(reduce){
    layers.forEach((l,i)=>{l.style.opacity=i===layers.length-1?1:0;});
    applyPhases(0.55);
  } else if(isMobile){
    requestAnimationFrame(frameMobile);
  } else {
    addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
    requestAnimationFrame(frameDesktop);
  }

  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.18});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%6*0.09)+'s';io.observe(el)});
})();
