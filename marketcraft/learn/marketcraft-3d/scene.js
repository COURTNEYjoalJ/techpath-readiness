/** MarketCraft Living Mountains: single-file, dependency-free WebGL2 parallax renderer.
 * Uses an artist-directed grayscale depth map (NOT reconstructed 3D geometry).
 * Supply corresponding mountain and depth images; no external libraries or services.
 */
(()=>{'use strict';
const stage=document.getElementById('stage'),canvas=document.getElementById('scene');
const themeButton=document.getElementById('toggleTheme'),motionButton=document.getElementById('toggleMotion');
const params=new URLSearchParams(location.search);
const embedded=params.get('embed')==='1'; if(embedded)stage.classList.add('embedded');
let theme=params.get('theme')==='light'?'light':'dark';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let preferredMotion=params.get('motion')!=='off';let paused=!preferredMotion||reduced.matches;
let target=[0,0],smooth=[0,0],tilt=[0,0],ready=false,gl,program,uniforms,geometry,images={},frame=0,last=0,requestId=0,visible=true;
const mobile=matchMedia('(pointer:coarse)').matches;
const motionGain=mobile?.55:1;
function updateUI(){document.body.dataset.theme=theme;stage.classList.toggle('paused',paused);if(themeButton)themeButton.textContent=theme==='dark'?'Switch to light mode':'Switch to dark mode';if(motionButton)motionButton.textContent=paused?'Resume motion':'Pause motion';let meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='dark'?'#090e12':'#faf6ef'}
updateUI();
function setTheme(next){theme=next==='light'?'light':'dark';updateUI();if(ready)loadTextures(theme);}
function setMotion(next){preferredMotion=!(next==='off'||next===false||next===0);paused=!preferredMotion||reduced.matches;updateUI();if(!paused&&ready)schedule();else cancelAnimationFrame(requestId);}
reduced.addEventListener?.('change',()=>{paused=!preferredMotion||reduced.matches;updateUI();if(!paused&&ready)schedule();else cancelAnimationFrame(requestId)});
themeButton?.addEventListener('click',()=>setTheme(theme==='dark'?'light':'dark'));
motionButton?.addEventListener('click',()=>setMotion(paused?'on':'off'));
window.MarketCraftMountains={setTheme,setMotion};
let scrollDepth=0;window.addEventListener('message',e=>{const d=e.data;if(!d||d.source!=='marketcraft-parent')return;if(d.theme)setTheme(d.theme);if(d.motion!==undefined)setMotion(d.motion);if(Number.isFinite(d.scroll)){scrollDepth=Math.max(0,Math.min(1,d.scroll));if(!paused)target[1]=Math.max(-.7,Math.min(.7,(scrollDepth-.5)*1.4))}if(Array.isArray(d.pointer)&&d.pointer.length===2&&!paused)target=d.pointer.map(v=>Math.max(-1,Math.min(1,v)))});
window.addEventListener('pointermove',e=>{if(paused)return;const r=stage.getBoundingClientRect();target=[Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2)),Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2))];},{passive:true});
window.addEventListener('pointerleave',()=>target=[0,0]);
// Device tilt requires user permission on some mobile browsers. Use the optional enableTilt() from a tap.
function orientation(e){if(paused)return;tilt=[Math.max(-1,Math.min(1,(e.gamma||0)/25)),Math.max(-1,Math.min(1,((e.beta||0)-45)/35))];target=[tilt[0]*.65,tilt[1]*.5]}
window.MarketCraftMountains.enableTilt=async()=>{try{if(typeof DeviceOrientationEvent==='undefined')return false;if(typeof DeviceOrientationEvent.requestPermission==='function'){if(await DeviceOrientationEvent.requestPermission()!=='granted')return false}window.addEventListener('deviceorientation',orientation,{passive:true});return true}catch{return false}};
function shader(type,src){let s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
const vertex=`#version 300 es
in vec2 aPos;out vec2 vUv;void main(){vUv=aPos*.5+.5;gl_Position=vec4(aPos,0.,1.);}`;
const fragment=`#version 300 es
precision highp float;uniform sampler2D uPhoto;uniform sampler2D uDepth;uniform vec2 uPointer;uniform float uTime;uniform vec2 uViewport;uniform float uImageAspect;uniform float uLight;in vec2 vUv;out vec4 fragColor;
void main(){
 vec2 uv=vec2(vUv.x,1.-vUv.y);
 float aspect=uViewport.x/max(1.,uViewport.y);vec2 cover=vec2(1.);
 if(aspect>uImageAspect)cover.y=uImageAspect/aspect;else cover.x=aspect/uImageAspect;
 vec2 tc=(uv-.5)*cover+.5;
 // Allow enough crop margin for parallax by using a slightly enlarged texture.
 tc=(tc-.5)*.965+.5;
 float z=texture(uDepth,clamp(tc,.0,1.)).r;
 float drift=sin(uTime*.22)*.0014;
 vec2 shift=(uPointer*vec2(.014,.010)+vec2(drift,drift*.4))*(.2+z*.8);
 vec2 source=clamp(tc-shift,.002,.998);
 vec3 col=texture(uPhoto,source).rgb;
 // Filmic micro-light, not a new object or replacement for baked-in image lighting.
 float sheen=exp(-pow((tc.x-.78-uPointer.x*.025)*4.8,2.)-pow((tc.y-.29)*4.0,2.));
 col+=vec3(.035,.024,.010)*sheen*(.5+.5*sin(uTime*.31))*uLight;
 fragColor=vec4(col,1.);
}`;
function init(){try{gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power',preserveDrawingBuffer:false});if(!gl)throw Error('WebGL2 unavailable');program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Unable to link shader');gl.useProgram(program);let vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);let attr=gl.getAttribLocation(program,'aPos');gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);uniforms=Object.fromEntries(['uPhoto','uDepth','uPointer','uTime','uViewport','uImageAspect','uLight'].map(x=>[x,gl.getUniformLocation(program,x)]));gl.uniform1i(uniforms.uPhoto,0);gl.uniform1i(uniforms.uDepth,1);gl.uniform1f(uniforms.uImageAspect,16/9);gl.uniform1f(uniforms.uLight,1);resize();ready=true;loadTextures(theme);schedule()}catch(e){console.warn('MarketCraft: static image fallback:',e);fallback()}}
function fallback(){stage.classList.add('fallback');ready=false;cancelAnimationFrame(requestId)}
function textureFromImage(img,unit){let t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);return t}
async function getImage(url){const image=new Image();image.decoding='async';image.src=url;await image.decode();return image}
let loadVersion=0;
async function loadTextures(t){let ver=++loadVersion;try{const isLarge=window.innerWidth>1100&&window.devicePixelRatio>1?true:window.innerWidth>1600;const photo=`assets/${t}-mountains-clean.png`,depth=`assets/${t}-depth.webp`;let [im,dm]=await Promise.all([getImage(photo),getImage(depth)]);if(ver!==loadVersion)return;for(const name of ['photo','depth'])if(images[name])gl.deleteTexture(images[name]);images.photo=textureFromImage(im,0);images.depth=textureFromImage(dm,1);gl.uniform1f(uniforms.uImageAspect,im.width/im.height);stage.classList.remove('fallback');render(performance.now())}catch(e){if(ver!==loadVersion)return;console.warn('Texture load failed',e);fallback()}}
function resize(){const dpr=Math.min(window.devicePixelRatio||1,mobile?1.35:1.65);const width=Math.min(2560,Math.round(canvas.clientWidth*dpr));const height=Math.min(1440,Math.round(canvas.clientHeight*dpr));if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}if(gl)gl.viewport(0,0,width,height)}
function render(now){if(!ready||!images.photo||!images.depth||!visible)return;resize();if(!paused){smooth[0]+=(target[0]*motionGain-smooth[0])*.055;smooth[1]+=(target[1]*motionGain-smooth[1])*.055}else{smooth=[0,0]}
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,images.photo);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,images.depth);gl.uniform2f(uniforms.uPointer,smooth[0],smooth[1]);gl.uniform2f(uniforms.uViewport,canvas.width,canvas.height);gl.uniform1f(uniforms.uTime,paused?0:now*.001);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);last=now}
function schedule(){cancelAnimationFrame(requestId);const loop=(t)=>{if(!ready||!visible)return;if(!paused){render(t);requestId=requestAnimationFrame(loop)}else{render(t)}};requestId=requestAnimationFrame(loop)}
const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;if(visible)schedule();else cancelAnimationFrame(requestId)});observer.observe(stage);
document.addEventListener('visibilitychange',()=>{if(document.hidden){visible=false;cancelAnimationFrame(requestId)}else{visible=true;schedule()}});
window.addEventListener('resize',()=>{resize();schedule()},{passive:true});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fallback()});
init();
})();
