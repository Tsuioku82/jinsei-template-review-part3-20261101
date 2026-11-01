'use strict';
const descriptions={
A01:'紺の装丁、銀の栞、ひらいた人生の一頁',A02:'時を結ぶ、青鋼と真鍮の時計仕掛け',A03:'人生新聞のための、活字とタイプライター',A04:'旅の記憶を運ぶ、列車と羅針盤',A05:'日々を支える根と、次の季節の枝',A06:'手の仕事を物語る、鉋と木の削り華',A07:'夜の回想録を飾る、帽子と時計と車のミニチュア',A08:'静かな言葉を迎える、和紙と硯と筆',A09:'自分の輪郭を表す、黒いガラスと青い光',A10:'私的な一冊を収める、革箱と金のペン',
B01:'花とレースと真珠で飾る、アルバムの額',B02:'小箱の物語に寄り添う、この案だけの読書の魔女',B03:'暮らしを彩る、クチュールリボンと花の飾り',B04:'便りを包む、藤色の花と封蝋の装飾',B05:'季節を楽しむ、この案だけの花の魔女',B06:'想いを縫いつなぐ、刺繍のハートと絹糸',B07:'思い出の光を集める、花とクリスタル',B08:'大切な人へ届ける、封筒とペンと絹のリボン',B09:'ときめく日々に寄り添う、この案だけの小悪魔魔女',B10:'出会いを祝う、花と真珠の記念メダリオン'};
function ornamentImage(id,role,ctx,key,caption){
 const x=require('../assets/editorial-parts.json')[key],{tag}=ctx;
 return tag('figure',role,`<img data-decoration data-design-art="${id}" src="${x.file}" width="${x.width}" height="${x.height}" alt="${caption}" loading="lazy"><figcaption>${caption}（生成イメージ）</figcaption>`,'data-art-figure');
}
function decoration(id,role,ctx){
 const {tag}=ctx,desc=descriptions[id],character=['B02','B05','B09'].includes(id),meta=require('../assets/design-art-manifest.json')[id];
 const special={A07:{'city-panorama':['A07-city','夜の街の雰囲気を描いた装飾'],'objects-picture':['A07-objects','時計や手紙を描いた静物の装飾']},A09:{'slab-backdrop':['A09-slab','黒い石と金属の装飾']},A10:{'luxury-scene':['A10-scene','本と箱を配した装飾']},B02:{'keepsake-scene':['B02-keepsake','手紙と本をしまう、小さな思い出の箱']},B09:{'favourite-still-life':['B09-still-life','本と花と、刺繍のハートを配した装飾']}}[id]?.[role];
 if(special)return ornamentImage(id,role,ctx,special[0],special[1]);
 if(character&&!role.includes('cover')){const x=require('../assets/editorial-parts.json')['divider-'+id];return tag('figure',role,`<img data-decoration data-frame-art data-design-art="${id}" src="${x.file}" width="${x.width}" height="${x.height}" alt="" aria-hidden="true" loading="lazy">`,'data-art-figure aria-hidden="true"');}
 return tag('figure',role,`<img data-decoration data-design-art="${id}" ${character?'data-mascot':''} src="img/design-${id}.png" width="${meta.width}" height="${meta.height}" alt="${desc}を描いた、このデザイン専用の生成イラスト" loading="lazy"><figcaption>${desc}（生成イラスト）</figcaption>`,'data-art-figure'+(character?' data-character-art':''));
}
function photo(n,role,ctx){
 const {d,tag,line}=ctx,p=d.customerPhotos?.[n];
 if(p?.src&&p.source==='customer')return tag('figure',role,`<button type="button" data-zoom aria-label="お預かりした写真を拡大する"><img data-customer-photo src="${require('../hero-engine.cjs').esc(p.src)}" alt="${require('../hero-engine.cjs').esc(p.alt||'ご本人からお預かりした写真')}" width="${p.width||1200}" height="${p.height||900}" loading="lazy"></button><figcaption>${require('../hero-engine.cjs').esc(p.caption||'ご本人からお預かりした写真')}</figcaption>`,'data-photo');
 const labels=['ご本人・ふるさとなどの写真','趣味・大切な品などの写真','旅・思い出などの写真','現在の暮らしなどの写真'];
 return tag('figure',role,tag('div','customer-photo-space',tag('span','photo-slot-number','写真 '+String(n+1).padStart(2,'0'))+line(labels[n%4],'photo-slot-title')+line('ご提供後に差し込みます','photo-slot-state'),'data-client-photo-slot'),'data-customer-photo-frame');
}
module.exports={decoration,photo,descriptions};
