(function(){'use strict';
 var root=document.documentElement,plan=[{"selector":".jr-a-l09-e-outline-word","effect":"chrome-slice","delay":0},{"selector":".jr-a-l09-e-landscape-node","effect":"from-left","delay":0},{"selector":".jr-a-l09-e-learning-stack","effect":"from-right","delay":170},{"selector":".jr-a-l09-e-craft-film","effect":"chrome-slice","delay":0},{"selector":".jr-a-l09-e-travel-film","effect":"from-right","delay":200},{"selector":".jr-a-l09-e-future-banner","effect":"rail-follow","delay":0}],animations=[],observer;
 var effects={
 'from-left':[{opacity:.75,transform:'translateX(-55px)'},{opacity:1,transform:'translateX(0)'}],
 'from-right':[{opacity:.75,transform:'translateX(55px)'},{opacity:1,transform:'translateX(0)'}],
 'from-top':[{opacity:.8,transform:'translateY(-28px)'},{opacity:1,transform:'translateY(0)'}],
 'page-open':[{opacity:.8,transform:'perspective(1000px) rotateY(-12deg) translateX(-20px)',transformOrigin:'left center'},{opacity:1,transform:'perspective(1000px) rotateY(0deg) translateX(0)',transformOrigin:'left center'}],
 'clock-turn':[{opacity:.7,transform:'translateX(-20px) rotate(-4deg)'},{opacity:1,transform:'translateX(0) rotate(0deg)'}],
 'ink-wipe':[{clipPath:'inset(0 70% 0 0)'},{clipPath:'inset(0 0 0 0)'}],
 'news-stamp':[{transform:'translateY(-12px) scale(1.04)',filter:'contrast(1.3)'},{transform:'translateY(0) scale(1)',filter:'contrast(1)'}],
 'rail-follow':[{clipPath:'inset(0 100% 0 0)',transform:'translateX(-15px)'},{clipPath:'inset(0)',transform:'translateX(0)'}],
 'leaf-unfurl':[{clipPath:'ellipse(30% 40% at 15% 60%)',transform:'translateY(20px)'},{clipPath:'ellipse(100% 100% at 50% 50%)',transform:'translateY(0)'}],
 'tool-glide':[{transform:'translateX(65px) rotate(5deg)',opacity:.7},{transform:'translateX(0) rotate(0)',opacity:1}],
 'film-shutter':[{clipPath:'inset(45% 0 45% 0)',filter:'contrast(1.4)'},{clipPath:'inset(0)',filter:'contrast(1)'}],
 'slow-breath':[{opacity:.7,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],
 'chrome-slice':[{clipPath:'polygon(0 0,5% 0,0 100%,0 100%)',transform:'translateX(20px)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)',transform:'translateX(0)'}],
 'velvet-reveal':[{clipPath:'inset(0 50% 0 50%)',opacity:.8},{clipPath:'inset(0)',opacity:1}],
 'album-peel':[{opacity:.75,transform:'perspective(850px) rotateX(8deg) rotate(-3deg) translateY(30px)'},{opacity:1,transform:'perspective(850px) rotateX(0) rotate(0) translateY(0)'}],
 'drawer-open':[{opacity:.8,transform:'perspective(800px) translateZ(-70px) translateY(-10px)'},{opacity:1,transform:'perspective(800px) translateZ(0) translateY(0)'}],
 'storybook-open':[{clipPath:'inset(0 30% 0 30% round 45%)',transform:'scale(.97)'},{clipPath:'inset(0 round 0)',transform:'scale(1)'}],
 'editorial-lift':[{transform:'translateY(40px) rotate(1.5deg)',opacity:.75},{transform:'translateY(0) rotate(0)',opacity:1}],
 'postcard-turn':[{transform:'perspective(900px) rotateY(9deg) rotate(3deg)',opacity:.7},{transform:'perspective(900px) rotateY(0) rotate(0)',opacity:1}],
 'petal-rise':[{transform:'translateY(35px) rotate(-3deg)',opacity:.8},{transform:'translateY(0) rotate(0)',opacity:1}],
 'stitch-unroll':[{clipPath:'inset(0 0 100% 0)',transform:'translateY(-10px)'},{clipPath:'inset(0)',transform:'translateY(0)'}],
 'prism-focus':[{filter:'blur(3px) saturate(.6)',transform:'scale(.98)'},{filter:'blur(0) saturate(1)',transform:'scale(1)'}],
 'letter-unfold':[{transform:'perspective(900px) rotateX(-7deg) translateY(15px)',opacity:.8},{transform:'perspective(900px) rotateX(0) translateY(0)',opacity:1}],
 'candy-spring':[{transform:'translateY(22px) scale(.96)'},{transform:'translateY(-5px) scale(1.015)',offset:.7},{transform:'translateY(0) scale(1)'}],
 'cameo-arrive':[{transform:'translateY(-18px) scale(.97)',filter:'brightness(1.15)'},{transform:'translateY(0) scale(1)',filter:'brightness(1)'}]
 };
 function enabled(){return root.dataset.motion==='on'&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);}
 function gifs(){document.querySelectorAll('img[data-living]').forEach(function(img){img.hidden=!enabled();img.src=enabled()?img.dataset.gif:img.dataset.still;});}
 function perform(el,item,i){if(!enabled()||!el.animate)return;el.setAttribute('data-performance-effect',item.effect);var frames=effects[item.effect]||effects['slow-breath'];try{var a=el.animate(frames,{duration:item.effect==='slow-breath'?1450:1050,delay:Math.min(450,(item.delay||0)+(i%4)*70),easing:item.effect==='candy-spring'?'cubic-bezier(.2,.8,.25,1)':'cubic-bezier(.2,.65,.25,1)',fill:'none'});animations.push(a);}catch(e){/* Keep readable content in browsers without this effect. */}}
 function start(){if(observer)observer.disconnect();animations.forEach(function(a){try{a.cancel();}catch(e){}});animations=[];gifs();if(!enabled())return;if(!window.IntersectionObserver){return;}observer=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){perform(e.target,e.target._lifeMotion,e.target._lifeMotionIndex);observer.unobserve(e.target);}});},{threshold:.12});plan.forEach(function(item){document.querySelectorAll(item.selector).forEach(function(el,i){el._lifeMotion=item;el._lifeMotionIndex=i;observer.observe(el);});});}
 // Only decorative GIFs move continuously. The user's writing remains still and selectable.
 var id=root.dataset.template+root.dataset.layout;if(['A02','A07','B02','B05','B09'].indexOf(id)!==-1){var figure=document.querySelector('[data-hero] [data-art-figure]');if(figure){var caption=figure.querySelector('figcaption'),art=document.createElement('img');art.className='jr-'+id[0].toLowerCase()+'-l'+id.slice(1)+'-e-gif-part';art.dataset.living='';art.dataset.decoration='';art.dataset.still='img/design-'+id+'.png';art.dataset.gif='img/design-'+id+'-motion.gif';art.width=120;art.height=132;art.alt='';art.setAttribute('aria-hidden','true');caption.appendChild(art);}}
 var stop=document.querySelector('[data-stop-motion]');if(stop)stop.addEventListener('change',start);var companion=document.querySelector('[data-companion-choice]');if(companion)companion.addEventListener('change',start);
 var media=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):null;if(media&&media.addEventListener)media.addEventListener('change',function(e){if(e.matches&&stop){stop.checked=true;stop.dispatchEvent(new Event('change',{bubbles:true}));}else start();});
 start();
})();
