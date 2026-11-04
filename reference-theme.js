/* Accessible navigation enhancements; assessment and storage logic are unchanged. */
(() => {
  const button = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');
  if (!button || !links) return;
  button.setAttribute('aria-label', 'Toggle navigation');
  button.setAttribute('aria-controls', 'navLinks');
  const sync = () => button.setAttribute('aria-expanded', String(links.classList.contains('show')));
  sync();
  new MutationObserver(sync).observe(links, { attributes: true, attributeFilter: ['class'] });
  links.addEventListener('click', event => {
    if (event.target.closest('a')) links.classList.remove('show');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && links.classList.contains('show')) {
      links.classList.remove('show');
      button.focus();
    }
  });
})();

(() => {
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 const progress = document.createElement('div');
 progress.className = 'reading-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
 const top = document.createElement('button'); top.className = 'back-to-top'; top.type = 'button'; top.textContent = '↑'; top.setAttribute('aria-label','Back to top'); document.body.append(top);
 top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'auto':'smooth'}));
 let pending=false;
 const update=()=>{const height=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.style.setProperty('--reading-progress',height>0?String(window.scrollY/height):'0');top.classList.toggle('is-visible',window.scrollY>650);pending=false;};
 window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true}); window.addEventListener('resize',update);update();
 const art=document.querySelector('.hero-art');
 if(art){art.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const b=art.getBoundingClientRect();art.style.setProperty('--art-x',((e.clientX-b.left)/b.width*6-3)+'deg');art.style.setProperty('--art-y',(3-(e.clientY-b.top)/b.height*6)+'deg');});art.addEventListener('pointerleave',()=>{art.style.setProperty('--art-x','0deg');art.style.setProperty('--art-y','0deg');});}
})();

(() => {
 const backdrop=document.createElement('div');backdrop.className='ambient-backdrop';backdrop.setAttribute('aria-hidden','true');document.body.prepend(backdrop);
 // The homepage's GSAP context owns background motion when available.
 if(document.body.classList.contains('home-page') && window.gsap && window.ScrollTrigger) return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let current=window.scrollY,target=current,frame=0,last=0;
 function paint(time){
  const dt=last?Math.min(time-last,50):16.7;last=time;
  current+=(target-current)*(1-Math.exp(-dt/100));
  if(Math.abs(target-current)<.1)current=target;
  document.documentElement.style.setProperty('--orbit-angle',reduced.matches?'0deg':(current*.035)+'deg');
  document.documentElement.style.setProperty('--ambient-shift',reduced.matches?'0px':(Math.sin(current/1100)*55)+'px');
  frame=0;if(current!==target&&!reduced.matches)frame=requestAnimationFrame(paint);else last=0;
 }
 function update(){target=window.scrollY;if(reduced.matches)current=target;if(!frame)frame=requestAnimationFrame(paint);}
 window.addEventListener('scroll',update,{passive:true});reduced.addEventListener('change',update);update();
})();
