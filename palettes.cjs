'use strict';
// Separate collections, not one list with different labels. IDs are scoped to A/B.
function collection(kind,rows){return rows.map(([id,name,paper,ink,accent,card,panel,onAccent])=>({kind,id,name,paper,scheme:parseInt(paper.slice(1,3),16)<100?"dark":"light",ink,accent,title:accent,card,panel,line:accent,film:'rgba('+paper.slice(1).match(/../g).map(x=>parseInt(x,16)).join(',')+',0.92)',onAccent}));}
const palettesByKind={
 A:collection('A',[
  ['01','オブシディアン・黒と銀','#101113','#f4f2ed','#d9dbe0','#181b20','#22262c','#101113'],
  ['02','新聞紙・アイボリーと墨','#f3f0e8','#20211f','#343c45','#fffdf7','#e1ddd3','#ffffff'],
  ['03','グラファイトと銅','#1a1b1d','#f2ebe2','#e5b58e','#23262a','#2d3034','#1a1b1d'],
  ['04','深い森とオリーブ','#10261f','#f2f4ea','#c0d6ad','#18352b','#244536','#10261f'],
  ['05','漆黒とシャンパンゴールド','#12100e','#f6f0e3','#dfc69b','#1d1b18','#2d2923','#12100e'],
  ['06','ミッドナイト・濃紺と鋼青','#18222e','#f2f5f8','#a9c8e4','#202d3d','#2b3d51','#18222e'],
  ['07','シルバーグレーとネイビー','#e9edf1','#152330','#294c69','#fafcfe','#dce3e9','#ffffff'],
  ['08','深いワインとブロンズ','#28171b','#fbf0e8','#edc19a','#342127','#422c33','#28171b'],
  ['09','薄いブルーと紺','#eef5fb','#14233a','#214f7c','#ffffff','#dceaf6','#ffffff'],
  ['10','エスプレッソと琥珀','#261f1a','#fbf0de','#e5c296','#332b23','#44372c','#261f1a']
 ]),
 B:collection('B',[
  ['01','パールホワイトとローズ','#fffaf6','#392d32','#8b3c58','#ffffff','#f3e4e8','#ffffff'],
  ['02','ホワイトとハートピンク','#ffffff','#30232b','#8e315c','#fffbfd','#f9e8ef','#ffffff'],
  ['03','ミルクとキャラメル','#fbf4e8','#3e2e22','#7d4a2b','#fffdf8','#eee0ca','#ffffff'],
  ['04','セージと花の緑','#f1f5ec','#263c2d','#3f6848','#fcfdf9','#dce8d5','#ffffff'],
  ['05','プラムとシャンパン','#332431','#fff4e8','#ecc7ae','#42313f','#513d4d','#332431'],
  ['06','藤色とすみれ','#f5f0fa','#352c45','#684483','#fffcff','#e9dff2','#ffffff'],
  ['07','磁器の白とグレージュ','#fffdf8','#3d3430','#735b47','#ffffff','#ece6dc','#ffffff'],
  ['08','桜色とローズブラウン','#fdf4f6','#3a2a2f','#85324d','#fffbfc','#f1dfe5','#ffffff'],
  ['09','ピーチとコーラル','#fff4ef','#402c29','#904438','#fffdfb','#f4e0d7','#ffffff'],
  ['10','穏やかなオレンジ','#fff2e6','#312116','#7d4424','#fffbf7','#f9e1cb','#ffffff']
 ])
};
const defaults={A:['09','07','02','06','04','03','05','10','01','05'],B:['10','08','01','09','04','03','07','06','02','05']};
const readablePalettes=Object.fromEntries(Object.entries(palettesByKind).map(([kind,rows])=>[kind,rows.map(p=>({...p,ink:p.scheme==='dark'?'#faf5ed':'#2b2520'}))]));
module.exports={palettesByKind:readablePalettes,defaults};
