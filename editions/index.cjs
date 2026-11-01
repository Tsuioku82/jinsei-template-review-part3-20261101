'use strict';
const {esc}=require('../hero-engine.cjs');
const {wareki,context}=require('../data.cjs');
function render(id,d){
 const prefix='jr-'+id[0].toLowerCase()+'-l'+id.slice(1), cl=r=>prefix+'-e-'+r;
 const tag=(tag,role,body,attrs='')=>`<${tag} class="${cl(role)}" ${attrs}${String(body).includes('data-client-photo-slot')?' data-photo-pending':''}${String(body).includes('data-client-photo-slot')||String(body).includes('data-customer-photo')?' data-customer-visual':''}>${body}</${tag}>`;
 const line=(value,role='copy')=>tag('p',role,esc(value),'data-body');
 const s=(i,j)=>d.chapters[i].sections[j];
 const digest=require('node:crypto').createHash('sha256').update(JSON.stringify(d.chapters)).digest('hex');
 const editorial=d.fictional===true&&d.editorialEditions?.sourceDigest===digest?d.editorialEditions.layouts[id]:null;
 const h=(i,j,title)=>require('./ornamented-type.cjs').heading(id,esc(title||s(i,j).title),tag,'topic',i*10+j);
 const label=(i,j)=>tag('span','label',esc(s(i,j).label));
 const text=(i,j,phrase)=>{const offset=d.chapters.slice(0,i).reduce((n,c)=>n+c.sections.length,0);let value=esc(editorial?.[offset+j]||s(i,j).text).replace(/《([^》]+)》/g,'<strong>$1</strong>');if(phrase)value=value.replace(esc(phrase),'<strong>'+esc(phrase)+'</strong>');return tag('p','copy',value,'data-body');};
 const memory=(i,j,role,body,element='article')=>s(i,j).text?.trim()?tag(element,role,body,`id="${esc(s(i,j).id)}" data-memory`):'';
 const chapter=(i,role,body)=>tag('section',role,require('./ornamented-type.cjs').heading(id,esc(d.chapters[i].title),tag,'chapter-name',i*10)+body,`id="${esc(d.chapters[i].id)}" data-section data-edition="${id}"`);
 const display=(value,role='display')=>tag('p',role,String(value).split('\n').map((line,i)=>tag('span','type-line',esc(line),'data-type-line="'+i+'"')).join(''),'data-display-type');
 const quote=(value,source,role='quote')=>tag('blockquote',role,tag('p','quote-text',esc(value))+(source?tag('cite','quote-source',esc(source)):''));
 const image=(n,role,caption)=>typeof n==='number'?require('./design-art.cjs').photo(n,role,ctx):require('./design-art.cjs').decoration(id,role,ctx);
 const prop=(file,role)=>{if(['B02','B09','A07'].includes(id)||(id==='B05'&&role!=='cover-botanical-part'))return '';const key={A06:'A06-tool',B01:'B01-flower',B06:'divider-B06'}[id],meta=key?require('../assets/editorial-parts.json')[key]:require('../assets/design-art-manifest.json')[id];const src=key?meta.file:'img/design-'+id+'.png';return `<img class="${cl(role)}" data-decoration data-design-art="${id}" ${id==='B05'?'data-mascot':''} src="${src}" width="${meta.width}" height="${meta.height}" alt="" aria-hidden="true" loading="lazy">`;};
 const years=(role)=>tag('ol',role,(d.timeline||[]).map(e=>tag('li','date-record',`<time datetime="${e.year}"><b>${e.year}</b><span>${esc(wareki(e.year))}・${e.year-d.birthYear}歳</span></time><div><strong>${esc(e.title)}</strong>${line(e.text,'date-copy')}${context[e.year]&&e.showWorld!==false?`<p data-world-note>その年の世の中：${esc(context[e.year].text)} <a href="${esc(context[e.year].url)}" target="_blank" rel="noopener noreferrer">${esc(context[e.year].source)}</a></p>`:''}</div>`,'data-event')).join(''),'data-timeline');
 const letter=(role)=>tag('aside',role,line(d.letter.to,'recipient')+line(d.letter.text,'letter-copy')+line(d.letter.signature,'signature'),'data-letter');
 const ctx={d,cl,tag,line,s,h,label,text,memory,chapter,display,quote,image,prop,years,letter};
 const result=require('./'+id+'.cjs')(ctx),cover=require('./covers.cjs')(id,ctx);
 const foundation=`
 [data-edition]{position:relative;margin-block:110px;isolation:isolate;min-width:0}
 [data-edition] h3{font-size:clamp(24px,2.1vw,28px);line-height:1.65;color:var(--title);margin-bottom:20px}
 §chapter-name{font:700 24px/1.7 var(--font-body);letter-spacing:.025em;margin:0 0 36px;color:var(--title)}
 §copy{font-size:var(--body);line-height:2.05;margin:0 0 1.4em;max-width:42em}
 §copy strong{font-weight:800;color:var(--title);text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:2px;text-underline-offset:7px}
 §label{display:block;font-size:18px;letter-spacing:.07em;margin-bottom:15px;color:var(--title);font-weight:700}
 §display{font:700 clamp(38px,5.8vw,78px)/1.4 var(--font-title);letter-spacing:.03em;color:var(--title);margin:0 0 45px}
 §quote{margin:50px 0;border:0;padding:0}§quote-text{font:700 clamp(26px,3.4vw,44px)/1.7 var(--font-title);color:var(--title);margin-bottom:14px}§quote-source{font:500 18px/1.8 var(--font-body)}
 [data-edition] [data-frame-art]{width:100%;max-width:100%;height:auto!important;aspect-ratio:auto!important;clip-path:none!important;object-fit:contain}[data-edition] figure{min-width:0}[data-edition] figure button{overflow:hidden}[data-edition] figure img{transition:transform .7s cubic-bezier(.2,.65,.3,1),filter .7s}
 @media(hover:hover){[data-edition] figure button:hover img{transform:scale(1.035);filter:contrast(1.06)}[data-edition] a:hover{text-decoration-thickness:3px}}
 §date-record{list-style:none;padding:24px 0;min-width:0}§date-record time{display:block;color:var(--title);font-variant-numeric:tabular-nums}§date-record time b{font-size:32px;line-height:1.4}§date-record time span{display:block;font-size:18px}§date-copy{font-size:var(--body);line-height:1.9;margin:8px 0}§recipient{font-size:24px;font-family:var(--font-title);color:var(--title)}§letter-copy{font-size:var(--body);line-height:2}§signature{text-align:right;margin-top:30px;font-family:var(--font-title);font-size:24px}
 [data-edition] [data-decoration]{object-fit:contain;pointer-events:none;user-select:none}
 html[data-motion=on] §arrive{animation:jr-edition-enter .75s cubic-bezier(.2,.7,.3,1) both}
 @keyframes jr-edition-enter{from{opacity:.65;transform:translateY(25px)}to{opacity:1;transform:none}}
 @media(max-width:760px){[data-edition]{margin-block:75px}§chapter-name{font-size:24px;margin-bottom:25px}§display{font-size:38px;margin-bottom:32px}§copy{max-width:none}§date-record time b{font-size:28px}}
 @media(prefers-reduced-motion:reduce){[data-edition] *,[data-edition] *::before{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
 @media print{[data-edition]{margin:20pt 0!important;break-before:page}§display{font-size:28pt!important}[data-edition] [data-decoration]{display:none!important}[data-edition] [data-memory]{border:0!important;padding:0!important}}
 `;
 const o=d.optional||{};
 const optional=(o.handwriting?tag('aside','handwriting','<h3>手書きの言葉</h3><img src="'+esc(o.handwriting)+'" alt="ご本人の手書きの言葉" width="960" height="640">','data-optional'):'')+(o.voiceUrl?tag('aside','voice','<h3>声のメッセージ</h3><audio controls preload="none" src="'+esc(o.voiceUrl)+'"></audio>','data-optional data-audio'):'')+(o.familyTree?tag('aside','family-tree','<h3>大切な人とのつながり</h3>'+line(o.familyTree),'data-optional'):'')+(o.wishes?tag('aside','wishes','<h3>これからの願い</h3>'+line(o.wishes),'data-optional'):'');
 return {hero:cover.hero,chapters:optional?result.html.replace(/<\/section>$/,optional+'</section>'):result.html,css:(foundation+result.css+cover.css+require('./typography.cjs')(id)+require('./ornamented-type.cjs').styles(id)+require('./display-lettering.cjs')(id)+require('./secondary-lettering.cjs')(id)+require('./motion.cjs')(id)+require('./choreography.cjs').styles(id)+require('./transitions.cjs')(id)+(result.refinement||'')+require('./photo-layout.cjs')(id)+require('./responsive-type.cjs')(id)).replace(/§([a-z][a-z0-9-]*)/g,(_,r)=>'.'+cl(r))};
}
module.exports={render};
