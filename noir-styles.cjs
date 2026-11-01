'use strict';
function styles(kind,n,p){
 if(kind==='A'&&n===7)return `
.${p}-hero.${p}-noir-cover{position:relative;isolation:isolate;display:flex;align-items:center;min-height:760px;padding:55px 4%;margin:40px -32px 100px}
.${p}-noir-backdrop{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:70% center;z-index:0}
.${p}-noir-cover-copy{position:relative;z-index:1;background:var(--film);max-width:670px;padding:40px}
.${p}-noir-edition{font-size:18px;color:var(--title);letter-spacing:.16em;font-weight:700}
.${p}-noir-display{font:700 clamp(36px,4.5vw,64px)/1.45 var(--font-title);letter-spacing:.06em;color:var(--title);margin:35px 0}
.${p}-noir-cover .${p}-name{font-size:32px;margin:30px 0 15px}
.${p}-hat-part{position:absolute!important;z-index:2;right:2%;bottom:-45px;width:240px!important;max-width:27%!important;height:auto!important;object-fit:contain!important;aspect-ratio:auto!important;pointer-events:none}
.${p}-noir-record-heading,.${p}-noir-scene-heading,.${p}-noir-gratitude-heading{position:relative;padding-left:24%;padding-right:10%}
.${p}-opening-room-label{position:absolute;left:0;top:0;width:20%}
.${p}-noir-record-heading>.${p}-opening-number,.${p}-noir-scene-heading>.${p}-opening-number,.${p}-noir-gratitude-heading>.${p}-opening-number{position:absolute;right:0;bottom:0;font-size:42px}
.${p}-noir-record-grid{display:grid;grid-template-columns:29% 1fr;gap:8%;margin-top:60px}
.${p}-noir-record{border-top:1px solid var(--line);padding:30px 0;margin-bottom:15px}
.${p}-noir-city-stage{padding:90px 5%;margin:55px -32px 75px;min-height:650px}
.${p}-noir-city-stage [data-backdrop]{clip-path:polygon(0 0,100% 8%,100% 100%,0 90%)}
.${p}-noir-city-film{max-width:660px;margin-left:auto}
.${p}-noir-private-collection{display:grid;grid-template-columns:1.1fr 1fr;gap:9%;position:relative;margin-top:80px}
.${p}-noir-objects-picture{margin-bottom:35px}
.${p}-noir-small-memories>article{padding:25px 0;border-bottom:1px solid var(--line);margin-bottom:30px}
.${p}-noir-last-reading{display:grid;grid-template-columns:1fr 1fr;gap:7%;margin-top:65px}
.${p}-noir-last-reading article{margin-bottom:45px}
.${p}-noir-dedication{position:relative;max-width:1000px;margin:70px auto 0;padding:45px 25% 45px 0;border-top:1px solid var(--line)}
.${p}-watch-part{position:absolute!important;right:0;top:45px;width:180px!important;max-width:23%!important;height:auto!important;object-fit:contain!important;aspect-ratio:auto!important;pointer-events:none}
@media(max-width:760px){.${p}-hero.${p}-noir-cover{margin:30px 0 75px;padding:30px 16px 110px;min-height:0}.${p}-noir-cover-copy{padding:25px;max-width:100%}.${p}-noir-display{font-size:34px}.${p}-hat-part{width:145px!important;max-width:46%!important;right:12px;bottom:-15px}.${p}-noir-record-heading,.${p}-noir-scene-heading,.${p}-noir-gratitude-heading{padding:0}.${p}-opening-room-label{position:static;width:auto;margin-bottom:20px}.${p}-noir-record-heading>.${p}-opening-number,.${p}-noir-scene-heading>.${p}-opening-number,.${p}-noir-gratitude-heading>.${p}-opening-number{position:static;margin-top:25px}.${p}-noir-record-grid,.${p}-noir-private-collection,.${p}-noir-last-reading{display:block}.${p}-noir-city-stage{margin:40px 0;padding:60px 16px;min-height:0}.${p}-noir-dedication{padding:25px 0}.${p}-watch-part{position:relative!important;width:130px!important;max-width:50%!important;top:auto;display:block;margin:25px 0 0 auto}}
@media print{.${p}-noir-backdrop,.${p}-hat-part,.${p}-watch-part{display:none!important}.${p}-hero.${p}-noir-cover{margin:0!important;min-height:0!important;padding:0!important}.${p}-noir-cover-copy{padding:0!important;background:white!important}}
`;
 if(kind==='B'&&[1,9].includes(n))return `
.${p}-ribbon-part{position:absolute!important;z-index:2;right:-18px;top:-28px;width:150px!important;max-width:30%!important;height:auto!important;aspect-ratio:auto!important;object-fit:contain!important;pointer-events:none}
.${p}-heart-art,.${p}-album-frame{position:relative}
@media(max-width:760px){.${p}-ribbon-part{right:0;top:-12px;width:105px!important;max-width:32%!important}}
@media print{.${p}-ribbon-part{display:none!important}}
`;
 return '';
}
module.exports={styles};
