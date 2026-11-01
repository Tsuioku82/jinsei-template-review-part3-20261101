(function(){'use strict';
 var root=document.documentElement,kind=root.dataset.template,current=root.dataset.layout,key='jinsei-design-v4-'+kind,params=new URLSearchParams(location.search),saved={};
 var companionCatalog={"02":{"bird":{"name":"このデザイン専用・読書の魔女","src":"img/design-B02.png","alt":"読書の小箱だけのために生成した、人型のオリジナルの読書の魔女"}},"05":{"flower":{"name":"このデザイン専用・花の魔女","src":"img/design-B05.png","alt":"庭の四季だけのために生成した、人型のオリジナルの花の魔女"}},"09":{"imp":{"name":"このデザイン専用・小悪魔魔女","src":"img/design-B09.png","alt":"ホワイトハートだけのために生成した、人型のオリジナルの小悪魔魔女"}}},companions=companionCatalog[current]||{};
 try{saved=JSON.parse(localStorage.getItem(key)||'{}');}catch(e){}
 function valid(v,values,fallback){return values.indexOf(v)!==-1?v:fallback;}
 var ids=['01','02','03','04','05','06','07','08','09','10'],sizes=['normal','large','xlarge'],companionIds=['none'].concat(Object.keys(companions));
 var requested=valid(params.get('layout'),ids,current);
 if(requested!==current){var jump=new URL('layout-'+requested+'.html',location.href);jump.search=params.toString();jump.hash=location.hash;location.replace(jump.href);return;}
 var state={layout:current,color:valid(params.get('color')||saved.color,ids,root.dataset.color),size:valid(params.get('size')||saved.size,sizes,'normal'),motion:valid(params.get('motion')||saved.motion,['on','off'],'on'),world:valid(params.get('world')||saved.world,['on','off'],'on'),companion:kind==='B'?valid(params.get('companion')||saved.companion,companionIds,saved.character==='off'&&!saved.companion?'none':root.dataset.companion||'none'):'none'};
 if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)state.motion='off';
 var layout=document.querySelector('[data-layout-choice]'),color=document.querySelector('[data-color-choice]'),size=document.querySelector('[data-size-choice]'),motion=document.querySelector('[data-stop-motion]'),world=document.querySelector('[data-show-world]'),companion=document.querySelector('[data-companion-choice]');
 function apply(message){
  state.character=state.companion==='none'?'off':'on';
  Object.keys(state).forEach(function(k){root.dataset[k]=state[k];});
  layout.value=state.layout;color.value=state.color;size.value=state.size;motion.checked=state.motion==='off';world.checked=state.world==='on';
  if(companion){companion.value=state.companion;var chosen=companions[state.companion];document.querySelectorAll('[data-character-label]').forEach(function(x){x.textContent=chosen?chosen.name+' / オリジナルキャラクター':'キャラクターなし';});if(chosen){document.querySelectorAll('img[data-mascot]').forEach(function(img){img.src=chosen.src;img.alt=chosen.alt;});document.querySelectorAll('[data-character-label]').forEach(function(x){x.textContent=chosen.name+' / オリジナルキャラクター';});}}
  try{localStorage.setItem(key,JSON.stringify(state));}catch(e){}
  try{var u=new URL(location.href);Object.keys(state).forEach(function(k){u.searchParams.set(k,state[k]);});history.replaceState(null,'',u.href);}catch(e){}
  if(message)document.querySelector('[data-live]').textContent=message;
 }
 layout.addEventListener('change',function(){state.layout=layout.value;try{localStorage.setItem(key,JSON.stringify(state));}catch(e){}var u=new URL('layout-'+state.layout+'.html',location.href);Object.keys(state).forEach(function(k){u.searchParams.set(k,state[k]);});u.hash=location.hash;location.assign(u.href);});
 color.addEventListener('change',function(){state.color=color.value;apply('配色を変更しました。');});
 size.addEventListener('change',function(){state.size=size.value;apply('文字の大きさを変更しました。');});
 motion.addEventListener('change',function(){state.motion=motion.checked?'off':'on';apply('動きの設定を変更しました。');});
 world.addEventListener('change',function(){state.world=world.checked?'on':'off';apply('時代の出来事の表示を変更しました。');});
 if(companion)companion.addEventListener('change',function(){state.companion=companion.value;apply('キャラクターを変更しました。');});
 var dialog=document.querySelector('[data-zoom-dialog]'),returnTo;
 document.querySelectorAll('[data-zoom]').forEach(function(b){b.addEventListener('click',function(){if(!dialog||!dialog.showModal)return;var img=b.querySelector('img'),caption=b.closest('figure').querySelector('figcaption');dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.querySelector('[data-expanded-caption]').textContent=caption?caption.textContent:img.alt;returnTo=b;dialog.showModal();});});
 if(dialog){dialog.querySelector('[data-close-photo]').addEventListener('click',function(){dialog.close();});dialog.addEventListener('close',function(){if(returnTo)returnTo.focus();});}
 document.querySelector('[data-print]').addEventListener('click',function(){window.print();});
 if(window.IntersectionObserver){var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){document.querySelectorAll('[data-nav] a').forEach(function(a){if(a.getAttribute('href')==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('[data-section]').forEach(function(s){obs.observe(s);});}
 apply();
 // Reading progress and one-time, layout-specific entrances. Content stays visible without JS.
 var editionPrefix='jr-'+kind.toLowerCase()+'-l'+current+'-e-',nav=document.querySelector('[data-nav]');
 if(nav){var progress=document.createElement('progress');progress.setAttribute('data-reading-progress','');progress.setAttribute('aria-label','物語を読んだ位置');progress.max=100;progress.value=0;nav.appendChild(progress);var pending=false;function trackReading(){var main=document.querySelector('main'),r=main.getBoundingClientRect(),span=Math.max(1,r.height-window.innerHeight);progress.value=Math.max(0,Math.min(100,-r.top/span*100));pending=false;}window.addEventListener('scroll',function(){if(!pending){pending=true;requestAnimationFrame(trackReading);}},{passive:true});window.addEventListener('resize',trackReading);trackReading();}

})();
