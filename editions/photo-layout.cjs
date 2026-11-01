'use strict';
// Keep customer photographs and explanatory text in separate, readable regions.
module.exports=id=>{
 const common=`[data-photo] img[data-customer-photo]{clip-path:none;aspect-ratio:auto;object-fit:contain;height:auto;width:100%}[data-customer-photo-frame]{min-width:0}[data-client-photo-slot]{max-width:100%}[data-art-figure]{min-width:0}`;
 const own={
 A03:`§headline-story{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:25px;align-items:start}§news-headline{grid-column:1/-1;margin-bottom:0}§front-news-image{float:none;width:auto;grid-column:2;grid-row:2;margin:0}§headline-story>.jr-a-l03-e-copy{grid-column:1;grid-row:2;margin:0}§headline-story::after{display:none}`,
 A07:`§city-memory{position:static;max-width:800px;margin:30px 0 0 auto;padding:0;background:none;border:0;backdrop-filter:none}§city-panorama img{aspect-ratio:auto;max-height:520px;object-fit:contain}§city-panorama figcaption,§objects-picture figcaption{display:block}§last-dedication{padding:30px 0;min-height:0}§signed-letter{max-width:820px}§portrait-frame [data-client-photo-slot]{min-height:380px}`,
 A09:`§craft-slab{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:48px;align-items:center;padding:0;min-height:0;border:0;overflow:visible}§slab-backdrop{position:static;inset:auto;z-index:auto;margin:0}§slab-backdrop img{width:100%;height:auto;aspect-ratio:auto;max-height:440px;object-fit:contain}§slab-backdrop figcaption{display:block;margin-top:16px}§craft-film{margin:0;padding:0;background:none;backdrop-filter:none}§travel-film{margin:30px 0 0 auto;padding:0;background:none;backdrop-filter:none}`,
 A10:`§collection-label{max-width:850px;margin:30px 0 0 auto;position:static;padding:0;background:none;backdrop-filter:none;border:0}§luxury-scene img{width:100%;height:auto;aspect-ratio:auto;max-height:520px;object-fit:contain}`,
 B02:`§ribbon-drawer{padding:30px}§keepsake-scene{min-width:0}§keepsake-scene img{aspect-ratio:auto;height:auto;max-height:430px;object-fit:contain;clip-path:none}html[data-character=off] §box-cover-scene{display:none}html[data-character=off] §cover{grid-template-columns:1fr}html[data-character=off] §box-cover-copy{max-width:900px;margin-inline:auto}`,
 B03:`§magazine-photo-scene{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:6%}§magazine-cover-lines{margin:0;padding:0;background:none;backdrop-filter:none}`,
 B04:`§travel-writing{position:static;margin:30px 0 0 auto;max-width:760px;padding:30px;background:var(--card);border:1px solid var(--line);box-shadow:none}`,
 B05:`§botanical-heading{padding-right:0;min-height:0}§season-display{position:static;margin:30px 0 0 auto;padding:0;max-width:780px;width:90%;background:none;backdrop-filter:none}html[data-character=off] §botanical-cover-art{display:none}html[data-character=off] §cover{grid-template-columns:1fr}html[data-character=off] §botanical-cover-copy{max-width:900px;margin-inline:auto}`,
 B07:`§photo-cover-scene{padding-bottom:0}§photo-cover-display{position:static;margin:30px 0 0 auto;padding:0;background:none;backdrop-filter:none;max-width:900px}§opening-caption{position:static;width:85%;margin:32px 0 0 auto;padding:0;background:none;backdrop-filter:none}§first-scene{position:static;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:40px;align-items:center;min-height:0;padding:0}§scene-one{width:auto}§scene-caption-one{position:static;inset:auto;width:auto;margin:0;padding:0;background:none;backdrop-filter:none;border:0}`,
 B08:`§enclosed-landscape{float:none;width:min(100%,650px);margin:40px auto;padding:14px;transform:rotate(1deg)}`,
 B09:`§heart-story-heading{padding:25px 0;min-height:0}§heart-home{padding:35px}§tomorrow-opening{padding:0}§last-love{padding:35px}§heart-cover-art{padding-bottom:20px}§favourite-film{max-width:850px;position:static;margin:30px 0 0 auto;padding:0;background:none;backdrop-filter:none;border:0;border-radius:0}§favourite-still-life{max-width:900px;margin:0 auto}§favourite-still-life img{width:100%;height:auto;aspect-ratio:auto;clip-path:none}§flower-window{padding:0;border:0;outline:0;border-radius:0;box-shadow:none;background:none;overflow:visible;transform:none}§travel-pink-frame{overflow:visible}§customer-photo-caption{border:0;box-shadow:none;padding:0;background:none}html[data-character=off] §heart-cover-art{display:none}html[data-character=off] §cover{grid-template-columns:1fr}html[data-character=off] §heart-cover-copy{max-width:900px;margin-inline:auto}`
 };
 const mobile={
 A03:`§headline-story{display:block}§front-news-image{width:auto;margin:25px 0}`,
 A07:`§city-memory{margin:25px 0 0;padding:0}`,
 A09:`§craft-slab{display:block}§craft-film{margin-top:28px}§travel-film{margin:25px 0 0;padding:0}`,
 A10:`§collection-label{margin:25px 0 0;padding:0}`,
 B02:`§ribbon-drawer{padding:24px}`,
 B03:`§magazine-photo-scene{display:block}§magazine-cover-lines{margin:28px 0 0;padding:0}`,
 B04:`§travel-writing{margin:25px 0 0;padding:24px}`,
 B05:`§season-display{margin:25px 0 0;width:100%;padding:0;font-size:34px}`,
 B07:`§opening-caption{width:100%;margin:25px 0 0;padding:0}§first-scene{display:block}§scene-caption-one{position:static;margin:25px 0 0;padding:0;width:100%;inset:auto}§photo-cover-display{margin:25px 0 0;padding:0;font-size:34px}`,
 B08:`§enclosed-landscape{margin:30px 0;transform:none}`,
 B09:`§heart-home,§last-love{padding:24px}§favourite-film{margin:25px 0 0;padding:0}§tomorrow-opening{padding:0}§heart-story-heading{padding:20px 0;min-height:0}`
 };
 return common+(own[id]||'')+`@media(max-width:760px){${mobile[id]||''}}`;
};
