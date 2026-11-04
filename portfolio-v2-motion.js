const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const sky = document.querySelector('.sky');
const gl = sky.getContext('webgl', {alpha:false, antialias:false, preserveDrawingBuffer:true});
if (gl) {
  const program = gl.createProgram();
  function attach(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  attach(gl.VERTEX_SHADER, `
    attribute vec2 vertex;
    void main(){gl_Position=vec4(vertex,0.,1.);}
  `);
  attach(gl.FRAGMENT_SHADER, `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    uniform vec2 size;
    uniform float phase;
    float ribbon(vec2 point, vec2 origin, vec2 radius) {
      vec2 distance = (point-origin)/radius;
      return exp(-2.4*dot(distance,distance));
    }
    void main(){
      vec2 uv = gl_FragCoord.xy/size;
      float aspect = size.x/size.y;
      vec2 p = vec2(uv.x*aspect,1.-uv.y);
      vec2 across = vec2(.857,.515);
      vec2 along = vec2(-.515,.857);
      vec2 glass = vec2(dot(p,across),dot(p,along));
      float flute = fract(glass.x*8./aspect);
      vec2 light = glass + (flute-.5)*vec2(.095,.46);
      light.x += .022*sin(light.y*15.+phase) + .012*sin(light.y*27.-phase);
      vec2 drift = vec2((.50+.49*sin(phase))*aspect,.50+.37*cos(phase));
      vec2 origin = vec2(dot(drift,across),dot(drift,along));
      float violet = ribbon(light,origin,vec2(max(.25,.16*aspect),.54));
      float pink = ribbon(light,origin+vec2(.065,-.05),vec2(.145,.245));
      float blue = ribbon(light,origin-vec2(.13,.08),vec2(.14,.38));
      vec3 glow = violet*vec3(.28,.12,.60) + pink*vec3(.45,.24,.39)
        + blue*vec3(.11,.18,.66);
      float seam = exp(-pow(abs((flute-.97)*24.),2.));
      float shade = smoothstep(.7,1.,flute);
      vec3 color = vec3(.036)+seam*.051-shade*.020 + glow*(.38+.62*flute)*.78;
      float grain = fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
      gl_FragColor = vec4(color+(grain-.5)*.025,1.);
    }
  `);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    const vertex = gl.getAttribLocation(program, 'vertex');
    gl.enableVertexAttribArray(vertex);
    gl.vertexAttribPointer(vertex,2,gl.FLOAT,false,0,0);
    const size = gl.getUniformLocation(program, 'size');
    const phaseUniform = gl.getUniformLocation(program, 'phase');
    let phase = 0;
    let frame = 0;
    let previousTime = 0;
    let visible = false;
    function renderSlats() {
      gl.uniform1f(phaseUniform, phase);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function resizeSlats() {
      const area = Math.max(1, sky.clientWidth * sky.clientHeight);
      const scale = Math.min(devicePixelRatio, 1.15, Math.sqrt(760000 / area));
      sky.width = Math.max(1, Math.round(sky.clientWidth * scale));
      sky.height = Math.max(1, Math.round(sky.clientHeight * scale));
      gl.viewport(0, 0, sky.width, sky.height);
      gl.uniform2f(size, sky.width, sky.height);
      renderSlats();
    }
    function animateSlats(now) {
      if (previousTime) phase = (phase + Math.min(now-previousTime, 50)*.00036) % (Math.PI*2);
      previousTime = now;
      renderSlats();
      frame = requestAnimationFrame(animateSlats);
    }
    function updateSlatMotion() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (visible && !document.hidden && !reduced.matches) {
        frame = requestAnimationFrame(animateSlats);
      } else {
        renderSlats();
      }
    }
    new ResizeObserver(resizeSlats).observe(sky);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateSlatMotion();
    }).observe(sky);
    document.addEventListener('visibilitychange', updateSlatMotion);
    reduced.addEventListener('change', updateSlatMotion);
    resizeSlats();
  }
}

const slides = [...document.querySelectorAll('.carousel article')];
const stage = document.createElement('div');
stage.className = 'prism-stage';
slides[0].before(stage);
const faces = [-2, -1, 0, 1, 2].map(offset => {
  const face = document.createElement(offset ? 'button' : 'div');
  face.className = 'prism-face' + (offset ? ' prism-side' : '');
  if (offset) face.onclick = () => showSlide(slide + offset, offset);
  stage.append(face);
  return {face, offset};
});
slides.forEach(card => card.remove());
const centre = faces.find(({offset}) => offset === 0).face;
const disclosures = slides.map(card => [...card.querySelectorAll('details')].find(
  detail => detail.querySelector('summary')?.textContent.trim() === 'Explore my experience'
));
const belowCard = document.createElement('div');
belowCard.className = 'prism-disclosure';
stage.after(belowCard);
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const lastSlide = slides.length - 1;
let slide = -1;
function showSlide(index, direction = 1) {
  const next = Math.max(0, Math.min(lastSlide, index));
  if (next === slide) return;
  const animate = slide >= 0 && !reduced.matches;
  const previous = new Map();
  if (animate) {
    for (const {face, offset} of faces) {
      const item = slide + offset;
      if (face.classList.contains('prism-empty')) continue;
      previous.set(item, {box: face.getBoundingClientRect(), filter: getComputedStyle(face).filter});
      face.getAnimations().forEach(animation => animation.cancel());
    }
  }
  slide = next;
  faces.forEach(({face, offset}) => {
    const item = slide + offset;
    const empty = item < 0 || item > lastSlide;
    face.classList.toggle('prism-empty', empty);
    if (offset) face.disabled = empty;
    if (empty) {
      face.replaceChildren();
      face.removeAttribute('aria-label');
      return;
    }
    const art = document.createElement('span');
    art.className = 'prism-art art-' + (item % 5);
    art.setAttribute('aria-hidden', 'true');
    if (offset) {
      face.replaceChildren(art);
      face.setAttribute('aria-label', 'View ' + slides[item].querySelector('h3').textContent);
      return;
    }
    const panel = document.createElement('div');
    panel.className = 'prism-panel';
    belowCard.replaceChildren();
    if (disclosures[item]) belowCard.append(disclosures[item]);
    panel.append(art, slides[item]);
    face.replaceChildren(panel);
  });
  slides.forEach((card, i) => { card.hidden = i !== slide; });
  if (animate) {
    const options = {duration: 560, easing: 'cubic-bezier(.22,.8,.25,1)'};
    for (const {face, offset} of faces) {
      const item = slide + offset;
      if (face.classList.contains('prism-empty')) continue;
      const old = previous.get(item);
      const box = face.getBoundingClientRect();
      if (!old) {
        face.animate([{opacity: 0, translate: Math.sign(direction) * 25 + 'px 0'},
          {opacity: 1, translate: '0 0'}], options);
        continue;
      }
      const dx = old.box.left + old.box.width/2 - box.left - box.width/2;
      const dy = old.box.top + old.box.height/2 - box.top - box.height/2;
      face.animate([
        {transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' +
          old.box.width/box.width + ',' + old.box.height/box.height + ')', filter: old.filter},
        {transform: 'none', filter: getComputedStyle(face).filter}
      ], options);
    }
    centre.querySelector('article').animate([{opacity: 0}, {opacity: 1}], {duration: 350, delay: 120, fill: 'backwards'});
  }
  previousButton.disabled = slide === 0;
  nextButton.disabled = slide === lastSlide;
  document.querySelector('#project-count').textContent = `${slide + 1} / ${slides.length}`;
}
previousButton.onclick = () => showSlide(slide - 1, -1);
nextButton.onclick = () => showSlide(slide + 1);
document.querySelector('.carousel').addEventListener('keydown', event => {
  if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const direction = event.key === 'ArrowLeft' ? -1 : 1;
  showSlide(slide + direction, direction);
});
let wheelLock = 0;
stage.addEventListener('wheel', event => {
  const bounds = stage.getBoundingClientRect();
  // Use the fixed centre slot so moving artwork cannot release wheel capture.
  if (event.ctrlKey || Math.abs(event.clientX - (bounds.left + bounds.width / 2)) > centre.offsetWidth / 2) return;
  event.preventDefault();
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (Math.abs(delta) < 3) return;
  const now = performance.now();
  if (now < wheelLock) return;
  const direction = Math.sign(delta);
  if (slide + direction < 0 || slide + direction > lastSlide) return;
  wheelLock = now + 560;
  showSlide(slide+direction,direction);
}, {passive:false});
showSlide(0);

const skills = ['Python','SQL','Rust','JavaScript','HTML','CSS','React','TypeScript','Tauri','SQLite','Pandas','NumPy','Matplotlib','Scikit-learn','Git','Jupyter Notebook','VS Code','Neural networks','Backpropagation','Quantization','Pruning','Knowledge distillation','Regression','Database design','ER modelling','Normalisation','Google Cloud','Compute Engine','Cloud Storage','IAM','Cloud SQL','VPC','Monitoring','Deployment'];
const globe = document.querySelector('.globe');
const skillList = document.createElement('ul');
skillList.className = 'all-skills';
skillList.setAttribute('aria-label', 'All technical skills');
for (const skill of skills) {
  const item = document.createElement('li');
  item.textContent = skill;
  skillList.append(item);
}
globe.after(skillList);
let angle = 0, selected = '', pointer;
let seed = 173;
function randomStar() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
const points = skills.map((skill, i) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', skill);
  button.dataset.skill = skill;
  button.onclick = () => select(skill);
  globe.append(button);
  const y = .94 - 1.88 * (i + randomStar()) / skills.length;
  return {skill, button, y, radius: Math.sqrt(1 - y*y), phase: i * 2.39996 + (randomStar()-.5)*1.35};
});
const network = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
network.setAttribute('viewBox', '0 0 100 100');
network.setAttribute('aria-hidden', 'true');
globe.prepend(network);
// Mix sparse stars with irregular clusters, then connect nearby stars in 3D.
const hubs = [[.61,.2],[-.42,1.46],[.13,2.9],[-.65,4.4],[.39,5.3]];
const mesh = Array.from({length:620}, (_, i) => {
  const hub = hubs[i % hubs.length];
  const spread = randomStar() * randomStar();
  const clustered = i >= 230;
  const y = clustered ? Math.max(-.99,Math.min(.99,hub[0]+(randomStar()-.5)*spread)) : randomStar()*2-1;
  const phase = clustered ? hub[1]+(randomStar()-.5)*spread*2 : randomStar()*Math.PI*2;
  const radius = Math.sqrt(1-y*y);
  return {y,radius,phase,x:Math.sin(phase)*radius,z:Math.cos(phase)*radius};
});
const edges = [];
const connected = new Set();
mesh.forEach((star,i) => {
  mesh.map((neighbor,j) => ({
    j, distance:(star.x-neighbor.x)**2+(star.y-neighbor.y)**2+(star.z-neighbor.z)**2
  })).filter(({j,distance}) => j !== i && distance < .085)
    .sort((a,b) => a.distance-b.distance).slice(0,3).forEach(({j}) => {
      const key = Math.min(i,j)*mesh.length+Math.max(i,j);
      if (!connected.has(key)) {
        connected.add(key);
        edges.push([i,j]);
      }
    });
});
function position() {
  const projected = mesh.map(({y,radius,phase}) => [
    50 + Math.sin(phase + angle) * radius * 46,
    50 + y * 46,
    Math.cos(phase + angle) * radius
  ]);
  const lines = edges.map(([a,b]) => {
    const [x1,y1,z1] = projected[a], [x2,y2,z2] = projected[b];
    if (Math.hypot(x1-x2,y1-y2) > 15) return '';
    return '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" />';
  });
  network.innerHTML = '<g fill="none" stroke="#a194ff" stroke-opacity=".22" stroke-width=".16">'+lines.join('')+'</g>'
    + projected.map(([x,y,z]) => '<circle cx="'+x+'" cy="'+y+'" r=".24" fill="#dfd2ff" opacity="'+(.2 + .48*Math.max(0,z))+'"/>').join('');

  for (const point of points) {
    const phase = point.phase + angle;
    const depth = Math.cos(phase) * point.radius;
    point.button.style.left = `${50 + Math.sin(phase) * point.radius * 43}%`;
    point.button.style.top = `${50 + point.y * 43}%`;
    point.button.style.opacity = depth < 0 ? '.22' : '1';
    point.button.dataset.front = String(depth > 0);
    point.button.style.zIndex = depth < 0 ? '0' : '1';
    point.button.setAttribute('aria-pressed', String(selected === point.skill));
  }
}
function select(skill) {
  selected = skill;
  angle = -points.find(point => point.skill === skill).phase;
  position();
}
globe.addEventListener('pointerdown', event => { if (event.target === globe) {pointer = event.clientX; globe.setPointerCapture(event.pointerId);} });
globe.addEventListener('pointermove', event => {
  if (pointer === undefined) return;
  angle += (event.clientX - pointer) / 85;
  pointer = event.clientX;
  position();
});
globe.addEventListener('lostpointercapture', () => {pointer = undefined;});
position();
let globeVisible = false;
new IntersectionObserver(([entry]) => { globeVisible = entry.isIntersecting; }).observe(globe);
let lastTurn = 0;
function spin(now) {
  if (globeVisible && !document.hidden && !reduced.matches && pointer === undefined &&
      !globe.matches(':hover, :focus-within') && now-lastTurn >= 55) {
    angle += .013;
    lastTurn = now;
    position();
  }
  requestAnimationFrame(spin);
}
requestAnimationFrame(spin);
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll('.hero-line').forEach(line => {
      line.replaceChildren(...Array.from(line.textContent, character => {
        const glyph = document.createElement('span');
        glyph.textContent = character === ' ' ? '\u00a0' : character;
        return glyph;
      }));
    });
    const heading = document.querySelector('.hero h1');
    const glyphs = heading.querySelectorAll('.hero-line span');
    glyphs.forEach(glyph => {glyph.dataset.smoke = glyph.textContent;});
    const reveal = () => {
      gsap.killTweensOf(glyphs);
      gsap.fromTo(glyphs, {filter:'blur(13px)', opacity:.08, y:42, x:26, skewY:22, color:'#a994ed'},
        {filter:'blur(0px)',opacity:1,y:0,x:0,skewY:0,color:'#f8f7ff',duration:1.12,stagger:.082,ease:'power3.out'});
      heading.classList.remove('smoking');
      void heading.offsetWidth;
      heading.classList.add('smoking');
    };
    glyphs.forEach((glyph,index) => glyph.style.setProperty('--smoke-delay', index*.082+'s'));
    reveal();
    return () => heading.classList.remove('smoking');
  });
}
const portfolioNav = document.querySelector('nav');
new ResizeObserver(([entry]) => {
  document.documentElement.style.setProperty('--portfolio-nav-height', entry.target.offsetHeight + 'px');
}).observe(portfolioNav);

if (window.gsap && window.ScrollTrigger) {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    for (const heading of document.querySelectorAll('main > section:not(.hero) h2')) {
      gsap.from(heading, {
        y: 18, opacity: .4, duration: .6, ease: 'power2.out',
        scrollTrigger: {trigger: heading, start: 'top 88%', once: true}
      });
    }
  });
}

const chapters = [...document.querySelectorAll('main > section')];
let settleTimer;
let settleFrame = 0;

function cancelChapterSettle() {
  clearTimeout(settleTimer);
  cancelAnimationFrame(settleFrame);
  settleFrame = 0;
}

function settleChapter() {
  if (reduced.matches || settleFrame) return;
  const start = scrollY;
  const menuHeight = portfolioNav.offsetHeight;
  const viewport = innerHeight - menuHeight;
  for (let index = 0; index < chapters.length - 1; index++) {
    const top = chapters[index].getBoundingClientRect().top + start - menuHeight;
    const next = chapters[index + 1].getBoundingClientRect().top + start - menuHeight;
    // A tall chapter can be read normally up to its last full screen.
    const end = Math.max(top, next - viewport);
    if (start <= end + 2 || start >= next - 2) continue;
    const target = start - end < (next - end) / 2 ? end : next;
    const began = performance.now();
    function animate(now) {
      const progress = Math.min(1, (now - began) / 680);
      const ease = progress * progress * (3 - 2 * progress);
      window.scrollTo({top: start + (target - start) * ease, behavior: 'instant'});
      settleFrame = progress < 1 ? requestAnimationFrame(animate) : 0;
    }
    settleFrame = requestAnimationFrame(animate);
    return;
  }
}

window.addEventListener('scroll', () => {
  if (settleFrame || reduced.matches) return;
  clearTimeout(settleTimer);
  settleTimer = setTimeout(settleChapter, 170);
}, {passive: true});
window.addEventListener('wheel', cancelChapterSettle, {passive: true});
window.addEventListener('pointerdown', cancelChapterSettle, {passive: true});
window.addEventListener('keydown', cancelChapterSettle);
reduced.addEventListener('change', cancelChapterSettle);
