(() => {
 const grid=document.querySelector('#work .portfolio-projects');
 if(!grid)return;
 const cards=[...grid.children];
 document.querySelectorAll('#current .portfolio-project,#future .portfolio-project').forEach(card=>{
  const copy=card.cloneNode(true);const status=document.createElement('p');status.className='portfolio-status';status.textContent=card.closest('#future')?'Future idea':'Ongoing learning';copy.prepend(status);cards.push(copy);
 });
 const categories=cards.map(card=>{const text=card.querySelector('.portfolio-status').textContent.toLowerCase();return text.includes('future')?'future':text.includes('ongoing')?'ongoing':'completed';});
 const filters=document.createElement('div');filters.className='project-filters';filters.id='project-workspace';filters.setAttribute('role','group');filters.setAttribute('aria-label','Filter projects by status');const slider=document.createElement('span');slider.className='filter-slider';slider.setAttribute('aria-hidden','true');filters.append(slider);
 const empty=document.createElement('p');empty.className='project-empty';empty.textContent='No projects have a confirmed completed status yet.';
 const filterButtons=[];let activeStatus=0,activeSkill=null;const skillButtons=[];
 const projectSkills=cards.map(card=>{const title=card.querySelector('h3').textContent;const text=card.textContent.toLowerCase();const tags=[];const add=(...values)=>tags.push(...values);if(/ODIN/.test(title))add('Rust','SQL');if(/TechPathReady/.test(title))add('HTML','CSS','JavaScript');if(/deep learning/i.test(title))add('Python','Neural networks','Model compression','Quantization','Pruning','Knowledge distillation');if(/Database/.test(title))add('SQL','ER modelling','Normalisation','Database design');if(/Neural networks/.test(title))add('Python','Neural networks','Backpropagation');if(/Rust tower/.test(title))add('Rust');if(/forecasting/i.test(title))add('Python','Regression');if(/VEID/.test(title))add('Python');if(/Google Cloud/.test(title))add('Google Cloud Platform','Compute Engine','Cloud Storage','IAM','Cloud SQL','VPC','Monitoring','Deployment');if(/Data science workflows/.test(title))add('Python','SQL','Pandas','NumPy','Matplotlib','Scikit-learn','Git','Jupyter Notebook','VS Code');return tags;});
 ['Completed','Ongoing','Future'].forEach((label,i)=>{const b=document.createElement('button');b.type='button';b.className='glass-filter';b.textContent=label;b.setAttribute('aria-pressed',String(i===0));b.addEventListener('click',()=>filter(i));filters.append(b);filterButtons.push(b);});
 grid.before(filters);

 const browser=document.createElement('div');browser.className='project-browser';
 const list=document.createElement('div');list.className='project-list';list.tabIndex=0;list.setAttribute('role','group');list.setAttribute('aria-label','Select a project');
 const detail=document.createElement('div');detail.className='project-detail';detail.id='project-detail';detail.tabIndex=0;detail.setAttribute('role','region');detail.setAttribute('aria-label','Selected project details');
 const buttons=cards.map((card,index)=>{
  const button=document.createElement('button');button.type='button';button.className='project-select';button.setAttribute('aria-controls','project-detail');button.setAttribute('aria-pressed',String(index===0));
  const title=document.createElement('strong');title.textContent=card.querySelector('h3').textContent;
  const status=document.createElement('span');status.textContent=card.querySelector('.portfolio-status').textContent;
  button.append(title,status);button.addEventListener('click',()=>select(index));list.append(button);return button;
 });
 function select(index){buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));detail.replaceChildren(cards[index]);detail.scrollTop=0;const disclosure=cards[index].querySelector('details');if(disclosure)disclosure.open=false;}
 function filter(index){
 activeStatus=index;
  filterButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));filters.style.setProperty('--filter-index',index);
  const category=['completed','ongoing','future'][index];
  const visible=buttons.map((b,i)=>{b.hidden=categories[i]!==category||(activeSkill&&!projectSkills[i].includes(activeSkill));return !b.hidden?i:-1;}).filter(i=>i>=0);
  if(visible.length)select(visible[0]);else {empty.textContent=activeSkill?'No '+category+' projects are currently linked to '+activeSkill+'. Choose another skill or clear the filter.':'No projects in this category.';detail.replaceChildren(empty);}
 }
 const skills=document.createElement('aside');skills.className='portfolio-skills';skills.id='skills';skills.setAttribute('aria-label','Technical skills');
 const heading=document.createElement('h3');heading.textContent='Skills';skills.append(heading);
 const groups={'Programming':['Python','SQL','Rust','HTML','CSS','JavaScript'],'Data science':['Pandas','NumPy','Matplotlib','Scikit-learn','Classification','Regression','Model evaluation'],'AI & deep learning':['Neural networks','Backpropagation','Model compression','Quantization','Pruning','Knowledge distillation'],'Databases':['ER modelling','Normalisation','Database design'],'Cloud · learning & practice':['Google Cloud Platform','Compute Engine','Cloud Storage','IAM','Cloud SQL','VPC','Monitoring','Deployment'],'Tools':['Git','GitHub','Jupyter Notebook','VS Code']};
 Object.entries(groups).forEach(([name,items])=>{const title=document.createElement('h4');title.textContent=name;const ul=document.createElement('ul');items.forEach(item=>{const li=document.createElement('li');const b=document.createElement('button');b.type='button';b.className='skill-filter';b.textContent=item;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{activeSkill=activeSkill===item?null:item;skillButtons.forEach(x=>x.setAttribute('aria-pressed',String(x.textContent===activeSkill)));filter(activeStatus);});skillButtons.push(b);li.append(b);ul.append(li);});skills.append(title,ul);});
 const clear=document.createElement('button');clear.type='button';clear.className='skill-filter';clear.textContent='Clear skill filter';clear.addEventListener('click',()=>{activeSkill=null;skillButtons.forEach(b=>b.setAttribute('aria-pressed','false'));filter(activeStatus);});skills.append(clear);browser.append(list,detail,skills);grid.replaceWith(browser);filter(0);
})();
