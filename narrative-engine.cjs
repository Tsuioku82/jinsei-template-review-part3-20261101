"use strict";
const {esc}=require('./hero-engine.cjs');
const {wareki,context}=require('./data.cjs');
// These are twenty editorial compositions. No shared memory-card/chapter renderer.
function narrative(kind,n,d){
 const p=`jr-${kind.toLowerCase()}-l${String(n).padStart(2,'0')}`,c=x=>p+'-'+x;
 const t=(tag,role,html,attrs='')=>`<${tag} class="${c(role)}" ${attrs}>${html}</${tag}>`;
 const para=(text,role='prose')=>t('p',role,esc(text).replace(/\n/g,'<br>'),'data-body');
 const heading=s=>t('h3','subject',esc(s.title));
 const label=s=>t('span','rubric',esc(s.label));
 const text=s=>para(s.text);
 const mem=(s,tag,role,body)=>s.text&&s.text.trim()?t(tag,role,body,`id="${esc(s.id)}" data-memory`):'';
 const image=(i,role='picture')=>{const x=d.photos[i%d.photos.length];return x&&x.src?t('figure',role,`<button type="button" data-zoom aria-label="${esc(x.caption)}を拡大する"><img src="${esc(x.src)}" alt="${esc(x.alt)}" width="960" height="640" loading="lazy"></button><figcaption>${esc(x.caption)}</figcaption>`,'data-photo'):'';};
 const date=e=>`<time datetime="${e.year}">${e.year}年 · ${esc(wareki(e.year))}</time><span class="${c('year-age')}">（その年に迎える年齢：${e.year-d.birthYear}歳）</span>`;
 const event=e=>t('strong','milestone',esc(e.title))+para(e.text,'event-text')+(context[e.year]&&e.showWorld!==false?`<p data-world-note>その年の世の中：${esc(context[e.year].text)}<br><a href="${esc(context[e.year].url)}" target="_blank" rel="noopener noreferrer">${esc(context[e.year].source)}</a>（ご本人の体験とは別の参考情報）</p>`:'');
 const years=d.timeline||[];
 const chronology=(mode)=>{
 switch(mode){
 case 'marginalia':return t('aside','year-footnotes',years.map(e=>t('p','year-footnote',date(e)+' — '+esc(e.title)+'。'+esc(e.text),'data-event')).join(''),'data-timeline');
 case 'definition':return t('dl','year-spine',years.map(e=>t('div','year-pair',t('dt','year',date(e))+t('dd','year-story',event(e)),'data-event')).join(''),'data-timeline');
 case 'table':return t('table','archive-table','<caption>人生の記録欄</caption><tbody>'+years.map(e=>'<tr data-event><th scope="row">'+date(e)+'</th><td>'+event(e)+'</td></tr>').join('')+'</tbody>','data-timeline');
 case 'route':return t('ol','route-map',years.map((e,i)=>t('li','route-stop',t('b','station-no',String(i+1).padStart(2,'0'))+date(e)+event(e),'data-event')).join(''),'data-timeline');
 case 'rings':return t('div','growth-rings',t('div','ring-symbol','◎','aria-hidden="true"')+t('ol','growth-years',years.map(e=>t('li','growth-year',date(e)+event(e),'data-event')).join('')),'data-timeline');
 case 'register':return t('div','work-register',years.map((e,i)=>t('section','register-row',t('span','folio',String(i+1).padStart(2,'0'))+t('div','register-entry',date(e)+event(e)),'data-event')).join(''),'data-timeline');
 case 'catalogue':return t('ol','catalogue',years.map(e=>t('li','catalogue-entry',date(e)+t('div','catalogue-label',event(e)),'data-event')).join(''),'data-timeline');
 case 'quiet':return t('aside','quiet-years',years.map(e=>t('section','quiet-date',date(e)+event(e),'data-event')).join(''),'data-timeline');
 case 'axis':return t('div','age-axis',years.map(e=>t('article','age-point',t('p','age-value',String(e.year-d.birthYear)+'歳')+date(e)+event(e),'data-event')).join(''),'data-timeline');
 case 'index':return t('details','archival-index','<summary>年の記録をひらく</summary>'+t('dl','archive-index',years.map(e=>t('div','indexed-year','<dt>'+date(e)+'</dt><dd>'+event(e)+'</dd>','data-event')).join('')),'data-timeline open');
 case 'album':return t('div','album-index',years.map(e=>t('p','album-date',date(e)+'<br>'+esc(e.title)+'<br>'+esc(e.text),'data-event')).join(''),'data-timeline');
 case 'objects':return t('dl','keepsake-labels',years.map((e,i)=>t('div','keepsake-label','<dt>記憶の札 '+(i+1)+'<br>'+date(e)+'</dt><dd>'+event(e)+'</dd>','data-event')).join(''),'data-timeline');
 case 'contents':return t('aside','issue-contents','<h3>時代の目次</h3>'+years.map(e=>t('div','issue-line',date(e)+event(e),'data-event')).join(''),'data-timeline');
 case 'postmarks':return t('div','postmarks',years.map(e=>t('section','postmark',date(e)+event(e),'data-event')).join(''),'data-timeline');
 case 'seasons':return t('ol','season-path',years.map((e,i)=>t('li','season-step',t('span','seed-mark',['芽','葉','花','実','種'][i%5],'aria-hidden="true"')+date(e)+event(e),'data-event')).join(''),'data-timeline');
 case 'stitches':return t('dl','stitch-line',years.map(e=>t('div','stitch-note','<dt>'+date(e)+'</dt><dd>'+event(e)+'</dd>','data-event')).join(''),'data-timeline');
 case 'diary':return t('ol','diary-index',years.map((e,i)=>t('li','diary-date',t('b','entry-number','記録 '+(i+1))+date(e)+event(e),'data-event')).join(''),'data-timeline');
 case 'postscript':return t('aside','postscript','<h3>追伸 — 歩んだ年のこと</h3>'+years.map(e=>t('p','dateline',date(e)+'。'+esc(e.title)+'。'+esc(e.text),'data-event')).join(''),'data-timeline');
 case 'heart-index':return t('dl','heart-date-index',years.map(e=>t('div','heart-date-item','<dt>'+date(e)+'</dt><dd>'+event(e)+'</dd>','data-event')).join(''),'data-timeline');
 case 'branches':return t('dl','branch-years',years.map(e=>t('div','year-branch','<dt>'+date(e)+'</dt><dd>'+event(e)+'</dd>','data-event')).join(''),'data-timeline');
 }};
 const modes=kind==='A'?['marginalia','definition','table','route','rings','register','catalogue','quiet','axis','index']:['album','objects','contents','postmarks','seasons','stitches','diary','postscript','heart-index','branches'];
 const letter=t('div','last-words',para(d.letter.to,'recipient')+para(d.letter.text,'personal-message')+para(d.letter.signature,'signature'),'data-letter');
 const chapter=(i,tag,role,body)=>t(tag,role,body,`id="${d.chapters[i].id}" data-section`);
 const ch=d.chapters, title=i=>t('h2','chapter-title',esc(ch[i].title)),lead=i=>para(ch[i].lead,'chapter-lead');
 let chapters=require('./chapter-compositions.cjs').compose(kind+String(n).padStart(2,'0'),{t,para,heading,label,text,mem,image,chronology,letter,chapter,title,lead,ch,d,prefix:p});
 const o=d.optional||{};
 const additions=(o.handwriting?`<div data-optional><h3>手書きの言葉</h3><img src="${esc(o.handwriting)}" alt="ご本人の手書きの言葉" width="960" height="640"></div>`:'')+(o.voiceUrl?`<div data-optional data-audio><h3>声のメッセージ</h3><audio controls preload="none" src="${esc(o.voiceUrl)}"></audio></div>`:'')+(o.familyTree?`<div data-optional><h3>大切な人とのつながり</h3>${para(o.familyTree)}</div>`:'')+(o.wishes?`<div data-optional><h3>これからの願い</h3>${para(o.wishes)}</div>`:'');
 if(additions)chapters=chapters.replace(/<\/section>$/,additions+'</section>');
 const links=ch.map((x,i)=>`<a href="#${x.id}"><span>0${i+1}</span><span data-nav-long>${esc(x.title)}</span><span data-nav-short>${["歩んだ人生","趣味と思い出","今と未来"][i]}</span></a>`);
 const nav=t('nav','chapter-navigation',n%3===0?t('ol','navigation-index',links.map(x=>'<li>'+x+'</li>').join('')):n%3===1?t('div','navigation-rail',links.join('')):t('menu','navigation-menu',links.map(x=>'<li>'+x+'</li>').join('')),'data-nav aria-label="このページの3つの章"');
 const footer=t('footer','colophon-'+n,t(n%2?'p':'blockquote','closing-line',esc(d.name)+'の人生の履歴書')+t(n%3?'div':'aside','end-index',`<a href="#top">先頭へ戻る ↑</a>　<a href="../_一覧.html?template=${kind}">見本の一覧へ</a>`,'data-footer-links'),'data-footer');
 return {chapters,nav,footer,letter:'',prefix:p};
}
module.exports={narrative};
