"use strict";
const {wareki,context}=require('./data.cjs');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(kind,index,d,plan){
 const key=kind.toLowerCase(),id=String(index).padStart(2,'0'),prefix='jr-'+key+'-l'+id,cl=x=>prefix+'-'+x;
 const tag=(name,role,body,attrs='')=>'<'+name+' class="'+cl(role)+'" '+attrs+'>'+body+'</'+name+'>';
 const para=(role,text)=>tag('p',role,esc(text).replace(/\n/g,'<br>'));
 function photo(i,role='photo',caption){const x=d.photos[i%d.photos.length];if(!x||!x.src)return '';return tag('figure',role,'<button type="button" data-zoom aria-label="'+esc(x.caption||x.alt)+'を拡大する"><img src="'+esc(x.src)+'" width="960" height="640" alt="'+esc(x.alt)+'" loading="'+(role==='cover-photo'?'eager':'lazy')+'"></button><figcaption>'+esc(caption||x.caption)+'<small>見本用の生成画像</small></figcaption>','data-photo');}
 const mascot=kind==='B'&&[2,5,9].includes(index)?'<img data-mascot src="img/'+({2:'witch-book',5:'witch-flower',9:'witch-devil'}[index])+'.png" alt="'+({2:'本を持つ人型の読書の魔女',5:'花籠を持つ人型の花の魔女',9:'花のリボンを持つ人型の小悪魔魔女'}[index])+'" width="240" height="240">':'';
 const name=para('kicker','人生の履歴書')+tag('h1','name',esc(d.name))+para('kana',d.furigana)+para('years','〜 私が歩んだ'+d.years+'の物語 〜');
 const intro=para('intro',d.intro),motto=tag('blockquote','motto',esc(d.motto));
 const title=tag('div','title',name+intro),lead=para('lead',d.lead),read='<a class="'+cl('read')+'" href="#chapter-1">物語を読む <span aria-hidden="true">↓</span></a>';
 const wrap=(body)=>tag('section','hero',body,'data-hero');
 let hero;
 if(kind==='A')switch(index){
 case 1:hero=wrap(tag('div','hero-copy',title+lead+read)+tag('div','hero-art',photo(0,'cover-photo')));break;
 case 2:hero=wrap(title+tag('ol','triptych',[0,1,3].map((n,j)=>tag('li','triptych-item',para('era',['はじまり','夢中になった日々','いま'][j])+photo(n,'cover-photo'))).join(''))+lead+read);break;
 case 3:hero=wrap(tag('div','masthead',para('edition','私の人生新聞・架空の完成見本')+name)+tag('div','frontpage',tag('div','headline',motto+intro+read)+photo(1,'cover-photo')));break;
 case 4:hero=wrap(photo(2,'cover-photo')+tag('div','hero-copy',para('journey','旅と出会いの記録')+title+lead+read));break;
 case 5:hero=wrap(tag('div','landscape',photo(3,'cover-photo'))+tag('div','hero-panel',title+motto+read));break;
 case 6:hero=wrap(para('display','手を動かし、\n暮らしをつくる。')+tag('div','work-profile',photo(1,'cover-photo')+tag('div','hero-copy',title+lead+read)));break;
 case 7:hero=wrap(tag('div','exhibition-title',title+motto)+tag('div','exhibition-strip',[0,1,2].map(n=>photo(n,'cover-photo')).join(''))+read);break;
 case 8:hero=wrap(tag('div','vertical',esc(d.motto))+tag('div','hero-copy',title+read)+photo(0,'cover-photo'));break;
 case 9:hero=wrap(tag('div','typeface',para('display','私の\n物語。')+title)+tag('div','type-photo',photo(1,'cover-photo')+lead+read));break;
 case 10:hero=wrap(tag('div','edition-frame',para('edition','一人ひとりに、一冊の物語。')+title+tag('div','small-picture',photo(2,'cover-photo'))+motto+read));break;
 }
 else switch(index){
 case 1:hero=wrap(title+tag('div','album-frame',photo(3,'cover-photo'))+motto+read);break;
 case 2:hero=wrap(tag('div','little-window',mascot+para('greeting','好きなものと、一緒に。'))+title+tag('div','treasure-boxes',photo(0,'cover-photo')+photo(1,'cover-photo')+tag('div','treasure-note',motto+read)));break;
 case 3:hero=wrap(tag('div','magazine-cover',para('issue','日々を楽しむ、私の特集。')+photo(0,'cover-photo')+tag('div','cover-title',title))+tag('div','cover-contents',para('contents-label','この一冊に綴ること')+lead+motto+read));break;
 case 4:hero=wrap(tag('div','postcard-front',photo(2,'cover-photo'))+tag('div','postcard-back',para('stamp','思い出便り')+title+lead+read));break;
 case 5:hero=wrap(title+tag('div','seasons',photo(3,'cover-photo')+photo(1,'cover-photo')+tag('div','season-friend',mascot+para('greeting','今日の、小さな喜びを。')))+motto+read);break;
 case 6:hero=wrap(tag('div','sewing-paper',title+intro+read)+tag('div','tabletop',photo(1,'cover-photo')+photo(3,'cover-photo')));break;
 case 7:hero=wrap(tag('div','oval-portrait',photo(1,'cover-photo'))+title+lead+read);break;
 case 8:hero=wrap(tag('div','envelope',tag('div','letter-front',title+motto+read))+tag('div','letter-photo',photo(0,'cover-photo')));break;
 case 9:hero=wrap(tag('div','ribbon',para('ribbon-text','好きなことを、ずっと。'))+tag('div','cute-profile',mascot+title)+tag('div','arch-pair',photo(1,'cover-photo')+photo(2,'cover-photo'))+lead+read);break;
 case 10:hero=wrap(tag('div','celebration-fold',para('dedication','大切なあなたへ贈る、一冊。')+title+tag('div','gift-picture',photo(3,'cover-photo'))+motto+read));break;
 }

 return {hero,prefix,mascot:!!mascot};
}
module.exports={render,esc};
