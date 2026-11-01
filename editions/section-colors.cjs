'use strict';
// Each row is an authored tonal progression for that life concept, not a shared sequence.
const tones={
A01:['#edf5fc','#152d42','#ece6d9'],A02:['#dce7ec','#111c29','#f4eee4'],A03:['#eee9d9','#272721','#faf6e9'],A04:['#152937','#f3ecd7','#d9e9ed'],A05:['#edf0df','#122e23','#e1e9da'],A06:['#191b1e','#ebe4d4','#102331'],A07:['#090c10','#14232a','#241416'],A08:['#f1ebdf','#e3e7df','#192321'],A09:['#111419','#dce5ed','#101e2c'],A10:['#101817','#eee8d6','#1b1721'],
B01:['#fff1e5','#f3e8ed','#fffaf1'],B02:['#f1e9fa','#35233f','#fff0e8'],B03:['#fff9f4','#2c2030','#f7dfe8'],B04:['#f6f0e7','#e8e4f3','#362c43'],B05:['#f4f5e8','#e9efd9','#fff0e6'],B06:['#fff1e7','#eddfde','#392735'],B07:['#eff4fa','#e5e9f2','#fff1ed'],B08:['#fff8eb','#eee3ed','#f6ebe3'],B09:['#fff4fb','#f6dce9','#342439'],B10:['#fdf3de','#34283c','#fff3eb']};
const inflections={A01:[2,1,3,5,2,4,1,4,2,5,2,1,4,3],A02:[1,4,2,5,3,1,5,2,4,1,3,5,1,4],A03:[4,1,2,5,1,3,2,5,1,4,5,2,4,1],A04:[2,5,1,4,2,3,5,1,3,2,1,4,2,5],A05:[1,3,5,2,4,1,3,5,2,4,5,2,1,3],A06:[5,1,4,2,3,5,2,4,1,5,2,3,5,1],A07:[1,2,4,5,3,1,4,1,5,2,5,3,1,4],A08:[1,3,2,4,1,2,3,1,2,5,1,2,3,4],A09:[5,2,1,4,3,5,1,5,2,4,3,1,5,2],A10:[2,1,4,3,5,2,4,1,3,5,4,2,1,3],B01:[1,4,2,5,3,1,4,2,5,3,2,4,1,5],B02:[3,1,5,2,4,3,1,5,4,2,4,1,3,5],B03:[5,2,4,1,3,5,2,4,1,3,5,1,4,2],B04:[2,4,1,3,5,2,5,3,1,4,3,1,5,2],B05:[1,3,2,5,4,1,2,4,5,3,1,5,2,4],B06:[4,1,3,5,2,4,5,2,4,1,3,5,1,4],B07:[2,5,3,1,4,2,5,1,3,4,2,5,4,1],B08:[1,2,4,3,1,5,2,3,5,1,4,2,1,3],B09:[3,5,1,4,2,3,5,2,4,1,5,3,1,4],B10:[4,2,1,5,3,4,2,5,1,3,4,1,5,2]};
const rgb=h=>h.replace('#','').match(/../g).map(x=>parseInt(x,16));
const hex=a=>'#'+a.map(x=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,'0')).join('');
const mix=(a,b,t)=>hex(rgb(a).map((x,i)=>x*(1-t)+rgb(b)[i]*t));
const lum=h=>rgb(h).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
function chapterColors(kind,p){let css='';const evidence=[];
 for(let n=1;n<=10;n++){const id=kind+String(n).padStart(2,'0');for(let j=0;j<3;j++){
  let paper=mix(tones[id][j],p.paper,.16),ink=ratio(p.ink,paper)>8.5?p.ink:(ratio('#2b2520',paper)>ratio('#faf5ed',paper)?'#2b2520':'#faf5ed');
  for(let k=0;k<12&&ratio(ink,paper)<8.5;k++)paper=mix(paper,lum(paper)>.3?'#ffffff':'#08090b',.08);
  let card=mix(paper,ink,.025),panel=mix(paper,ink,.055),accent=ratio(p.accent,paper)>=4.5?p.accent:ink,line=mix(paper,ink,.57);
  if(ratio(line,paper)<3)line=ink;
  const title=ratio(p.title,paper)>=4.5?p.title:accent,film='rgba('+rgb(paper).join(',')+',.95)';
  const vars={paper,ink,card,panel,accent,title,line,film,'on-accent':paper};
  const min=Math.min(...[paper,card,panel].map(bg=>ratio(ink,bg)));
  if(min<7)throw Error('Chapter contrast below 7:1 '+id+'-'+j+' '+min);
  css+=`html[data-template="${kind}"][data-layout="${id.slice(1)}"][data-color="${p.id}"] #chapter-${j+1}{${Object.entries(vars).map(([k,v])=>'--'+k+':'+v).join(';')};background:var(--paper);color:var(--ink);padding:50px 32px;margin-inline:-32px;box-shadow:0 1px 0 var(--line)}\n`;
  evidence.push({edition:id,chapter:j+1,palette:p.id,paper,ink,bodyMin:Number(min.toFixed(2)),titleRatio:Number(ratio(title,paper).toFixed(2))});
  const count=j===0?6:4,offset=j===0?0:j===1?6:10;
  for(let m=0;m<count;m++){
   const level=inflections[id][offset+m],subPaper=mix(paper,ink,.015+level*.010+m*.004),subCard=mix(subPaper,ink,.02),subPanel=mix(subPaper,ink,.045);
   let subInk=mix(ink,p.accent,.015+level*.006+m*.001);if(Math.min(...[subPaper,subCard,subPanel].map(x=>ratio(subInk,x)))<7)subInk=ink;
   let corrected=subPaper,attempt=0;while(Math.min(...[corrected,mix(corrected,subInk,.02),mix(corrected,subInk,.045)].map(x=>ratio(subInk,x)))<7&&attempt++<10)corrected=mix(corrected,lum(subInk)>.5?'#08090b':'#ffffff',.06);
   const subTitle=ratio(p.title,corrected)>=4.5?p.title:subInk,subAccent=ratio(p.accent,corrected)>=4.5?p.accent:subInk;
   const fields={paper:corrected,ink:subInk,card:mix(corrected,subInk,.02),panel:mix(corrected,subInk,.045),title:subTitle,accent:subAccent,line:mix(corrected,subInk,.60),film:'rgba('+rgb(corrected).join(',')+',.95)'};
   const minSub=Math.min(...[fields.paper,fields.card,fields.panel].map(bg=>ratio(subInk,bg)));if(minSub<7)throw Error('Passage contrast below 7:1 '+id+' '+m);
   css+=`html[data-template="${kind}"][data-layout="${id.slice(1)}"][data-color="${p.id}"] #memory-${j+1}-${m+1}{${Object.entries(fields).map(([k,v])=>'--'+k+':'+v).join(';')};background-color:var(--paper);color:var(--ink)}\n`;
   evidence.push({edition:id,chapter:j+1,memory:m+1,palette:p.id,paper:corrected,ink:subInk,bodyMin:Number(minSub.toFixed(2))});
  }
 }}
 return {css:css+`@media(max-width:760px){html[data-template="${kind}"][data-layout][data-color="${p.id}"] #chapter-1,html[data-template="${kind}"][data-layout][data-color="${p.id}"] #chapter-2,html[data-template="${kind}"][data-layout][data-color="${p.id}"] #chapter-3{padding:35px 16px;margin-inline:-16px}}\n`,evidence};
}
module.exports={chapterColors,tones};
