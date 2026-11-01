'use strict';
module.exports=id=>{
 const scenes={
 A01:['clip-path:inset(0 0 12% 0);transform:translateY(15px)','clip-path:inset(0);transform:none','1s'],
 A02:['transform:translateX(-25px);opacity:.65','transform:none;opacity:1','.8s'],
 A03:['clip-path:inset(0 14% 0 0)','clip-path:inset(0)','.9s'],
 A04:['transform:translateY(25px) rotate(-1deg)','transform:none','.9s'],
 A05:['clip-path:inset(7% 0 0 0);filter:saturate(.65)','clip-path:inset(0);filter:saturate(1)','1.1s'],
 A06:['transform:translateX(20px);opacity:.7','transform:none;opacity:1','.75s'],
 A07:['clip-path:inset(8% 0 8% 0);filter:contrast(1.3)','clip-path:inset(0);filter:contrast(1)','1.2s'],
 A08:['opacity:.6','opacity:1','1.3s'],
 A09:['clip-path:polygon(0 0,92% 0,85% 100%,0 100%)','clip-path:polygon(0 0,100% 0,100% 100%,0 100%)','.9s'],
 A10:['transform:translateY(18px);filter:brightness(.8)','transform:none;filter:brightness(1)','1.2s'],
 B01:['transform:translateY(18px) rotate(-2deg)','transform:none','1s'],
 B02:['transform:translateY(24px);opacity:.7','transform:none;opacity:1','.9s'],
 B03:['clip-path:inset(0 0 10% 0)','clip-path:inset(0)','.9s'],
 B04:['transform:translateX(-20px) rotate(1deg)','transform:none','1s'],
 B05:['transform:translateY(18px);filter:saturate(.6)','transform:none;filter:saturate(1)','1.2s'],
 B06:['clip-path:inset(0 6% 0 0)','clip-path:inset(0)','1s'],
 B07:['filter:blur(1.5px);opacity:.7','filter:blur(0);opacity:1','1.1s'],
 B08:['transform:translateY(12px);opacity:.65','transform:none;opacity:1','1.2s'],
 B09:['transform:translateY(18px) scale(.985)','transform:none','1s'],
 B10:['transform:scale(.985);opacity:.7','transform:none;opacity:1','1.1s']
 },x=scenes[id],name='jr-edition-'+id.toLowerCase();
 return `html[data-motion=on] §scroll-enter{animation:${name} ${x[2]} cubic-bezier(.2,.7,.3,1) both}@keyframes ${name}{from{${x[0]}}to{${x[1]}}}[data-reading-progress]{display:block;position:absolute;left:0;bottom:0;width:100%;height:3px;border:0;appearance:none;background:transparent;color:var(--accent)}[data-reading-progress]::-webkit-progress-bar{background:transparent}[data-reading-progress]::-webkit-progress-value{background:var(--accent)}[data-reading-progress]::-moz-progress-bar{background:var(--accent)}@media print{[data-reading-progress]{display:none!important}}`;
};
