'use strict';
const ids=['A07','A10','B01','B02','B05','B06','B09','B10'];
const titles={A07:'cinema-title',A10:'gilded-bookplate',B01:'floral-embroidery',B02:'storybook-title',B05:'garden-calligraphy',B06:'silk-lettering',B09:'candy-lettering',B10:'ceremony-title'};
function heading(id,title,t,role,index){
 const chapter=role==='chapter-name',m=require('../assets/editorial-parts.json')['divider-'+id];
 const art=()=>t('span',chapter?'chapter-material':'topic-material',`<img data-decoration data-design-art="${id}" src="${m.file}" width="${m.width}" height="${m.height}" alt="" aria-hidden="true" loading="lazy">`,'aria-hidden="true"');
 const word=t('span',titles[id],title);
 let body;
 if(!chapter)body=word+(id==='B10'?'':art());
 else switch(id){
  case 'A07':body=t('span','material-kicker','PRIVATE CHRONICLE / '+String(Math.floor(index/10)+1).padStart(2,'0'),'aria-hidden="true"')+t('span','noir-heading-row',word+art());break;
  case 'A10':body=art()+t('span','material-kicker','PRIVATE EDITION','aria-hidden="true"')+word;break;
  case 'B01':body=word+art();break;
  case 'B02':body=t('span','storybook-heading-copy',t('span','material-kicker','MY STORYBOOK','aria-hidden="true"')+word)+art();break;
  case 'B05':body=art()+word;break;
  case 'B06':body=word+art();break;
  case 'B09':body=art()+word;break;
  case 'B10':body=art()+word;break;
 }
 return t(chapter?'h2':'h3',role,body,`data-ornate-heading data-material-heading="${id}" data-ornament="${index}"`);
}
function styles(id){
 const base=`
 h2[data-material-heading],h3[data-material-heading]{position:relative;isolation:isolate;background:none;border:0;border-radius:0;box-shadow:none;outline:0;padding:18px 0 24px;line-height:1.7;color:var(--title)}
 h2[data-material-heading]{font-size:28px;margin:0 0 54px}h3[data-material-heading]{font-size:clamp(24px,2.1vw,28px);margin:0 0 22px}
 §chapter-material,§topic-material{position:static;display:block;pointer-events:none;line-height:0;min-width:0}§chapter-material img,§topic-material img{display:block;width:100%;height:auto;max-height:none;object-fit:contain}
 §chapter-material{width:min(100%,520px);margin:0 0 22px}§topic-material{width:min(75%,235px);margin:15px 0 0}§material-kicker{display:block;font:600 18px/1.7 var(--font-body);letter-spacing:.14em;margin-bottom:12px;color:var(--title)}
 [data-material-heading]>span:not(§chapter-material):not(§topic-material){min-width:0}
 `;
 const own={
 A07:`§noir-heading-row{display:flex;align-items:center;justify-content:space-between;gap:38px}§noir-heading-row>§cinema-title{flex:1}§noir-heading-row>§chapter-material{width:35%;margin:0}§cinema-title{display:block;font-family:var(--font-title);font-weight:800;letter-spacing:.08em;text-shadow:1px 2px 0 var(--paper),2px 3px 0 var(--line)}h3[data-material-heading]{padding:20px 0 26px;border-bottom:1px solid var(--line)}§topic-material{width:min(65%,200px);margin-top:17px}`,
 A10:`h2[data-material-heading]{text-align:center;padding-block:8px 26px}§chapter-material{width:min(100%,460px);margin:0 auto 25px}§material-kicker{letter-spacing:.19em}§gilded-bookplate{display:block;font-family:var(--font-title);font-weight:800;letter-spacing:.085em;text-shadow:1px 1px 0 var(--paper),2px 2px 0 var(--line)}h3[data-material-heading]{border-left:3px double var(--accent);padding:15px 0 20px 24px}§topic-material{width:min(75%,220px);margin-top:20px}`,
 B01:`h2[data-material-heading]{text-align:left}§chapter-material{width:min(100%,470px);margin:22px 0 0}§floral-embroidery{display:block;font-family:var(--font-title);font-weight:800;letter-spacing:.075em;text-shadow:1px 2px 0 var(--panel)}h3[data-material-heading]{border-bottom:2px dotted var(--line);padding-block:16px 22px}§topic-material{width:min(75%,195px);margin:14px 0 0}`,
 B02:`h2[data-material-heading]{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.85fr);gap:35px;align-items:center}h2[data-material-heading]>§chapter-material{width:100%;margin:0}§storybook-title{display:block;font-family:var(--font-title);font-weight:800;letter-spacing:.07em;text-shadow:1px 1px 0 var(--paper),2px 3px 0 var(--line)}h3[data-material-heading]{padding:20px 0 24px;border-bottom:3px double var(--line)}§topic-material{width:min(85%,240px);margin:17px 0 0 auto}`,
 B05:`§chapter-material{width:min(100%,430px);margin:0 0 24px}§garden-calligraphy{display:block;font-family:var(--font-title);font-weight:800;letter-spacing:.08em;text-shadow:1px 1px 0 var(--panel)}h3[data-material-heading]{border-bottom:1px solid var(--line);padding:15px 0 22px}§topic-material{width:min(85%,230px);margin:16px 0 0}`,
 B06:`h2[data-material-heading]{border-top:2px dashed var(--line);padding-top:25px}§chapter-material{width:min(100%,380px);margin:20px 0 0}§silk-lettering{display:block;font-family:var(--font-title);font-weight:800;letter-spacing:.09em;text-shadow:1px 1px 0 var(--paper),2px 2px 0 var(--line)}h3[data-material-heading]{border-bottom:2px dashed var(--line);padding:18px 0 24px}§topic-material{width:min(78%,210px);margin:16px 0 0 auto}`,
 B09:`h2[data-material-heading]{text-align:center;padding-top:4px}§chapter-material{width:min(100%,620px);margin:0 auto 24px}§candy-lettering{display:block;font-family:var(--font-body);font-weight:900;letter-spacing:.035em;text-shadow:1px 1px 0 var(--paper),2px 2px 0 var(--paper),3px 4px 0 var(--line);paint-order:stroke fill;-webkit-text-stroke:.3px var(--title)}h3[data-material-heading]{padding:18px 0 24px;border-bottom:3px dotted var(--accent)}§topic-material{width:min(86%,255px);margin:18px 0 0}`,
 B10:`h2[data-material-heading]{text-align:center}§chapter-material{width:125px;max-width:30%;margin:0 auto 24px}§ceremony-title{display:block;font-family:var(--font-title);font-weight:800;letter-spacing:.09em;text-shadow:1px 1px 0 var(--paper),2px 3px 0 var(--line)}h3[data-material-heading]{border-bottom:4px double var(--accent);padding:24px 0 23px}h3[data-material-heading] §ceremony-title::first-letter{font-size:1.18em}h3[data-material-heading] §ceremony-title{border-left:2px solid var(--line);padding-left:18px}`
 };
 return base+own[id]+`
 @media(max-width:760px){h2[data-material-heading]{font-size:24px;margin-bottom:35px;padding-top:14px}h3[data-material-heading]{font-size:24px}§noir-heading-row{display:block}§noir-heading-row>§chapter-material{width:min(85%,330px);margin:25px 0 0}h2[data-material-heading="B02"]{display:block}h2[data-material-heading="B02"]>§chapter-material{width:90%;margin:22px auto 0}§chapter-material{max-width:100%}§topic-material{max-width:90%}h2[data-material-heading="B10"]>§chapter-material{width:100px;max-width:35%}}
 @media print{§chapter-material,§topic-material{display:none!important}h2[data-material-heading],h3[data-material-heading]{background:none!important;box-shadow:none!important;border:0!important;padding:8pt 0!important;margin:10pt 0!important;text-align:left!important;display:block!important}h2[data-material-heading] span,h3[data-material-heading] span{text-shadow:none!important;-webkit-text-stroke:0!important;color:black!important}}
 `;
}
module.exports={supports:id=>ids.includes(id),heading,styles};
