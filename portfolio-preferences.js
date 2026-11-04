(() => {
 const root=document.body;
 const controls = document.querySelector('.portfolio-preferences');
 const mode=document.createElement('button');mode.type='button';
 const label=document.createElement('label');label.textContent='Accent ';
 const colour=document.createElement('select');colour.setAttribute('aria-label','Accent colour');
 ['Orange','Purple','Green'].forEach(name=>{const option=document.createElement('option');option.value=name.toLowerCase();option.textContent=name;colour.append(option);});label.append(colour);
 const neon=document.createElement('button');neon.type='button';
 let state={mode:'dark',colour:'orange',neon:false};
 try{const saved=JSON.parse(localStorage.getItem('courtney-appearance'));if(saved&&['dark','light'].includes(saved.mode)&&['orange','purple','green'].includes(saved.colour))state={...state,...saved};}catch{}
 function apply(){state.colour='orange';state.neon=true;root.dataset.mode=state.mode;root.dataset.accent=state.colour;root.dataset.neon=String(state.neon);mode.textContent=state.mode==='dark'?'Light mode':'Dark mode';mode.setAttribute('aria-label','Switch to '+(state.mode==='dark'?'light':'dark')+' mode');neon.textContent='Neon '+(state.neon?'on':'off');neon.setAttribute('aria-pressed',String(state.neon));colour.value=state.colour;try{localStorage.setItem('courtney-appearance',JSON.stringify(state));}catch{}}
 mode.addEventListener('click',()=>{state.mode=state.mode==='dark'?'light':'dark';apply();});colour.addEventListener('change',()=>{state.colour=colour.value;apply();});neon.addEventListener('click',()=>{state.neon=!state.neon;apply();});
 controls.prepend(mode);
 apply();
})();
