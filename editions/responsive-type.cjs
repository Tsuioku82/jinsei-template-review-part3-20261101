'use strict';
// Preserve each edition's lettering while avoiding lone glyphs on narrow screens.
const size={A01:32,A02:32,A03:33,A04:32,A05:33,A06:32,A07:31,A08:32,A09:32,A10:31,B01:32,B02:32,B03:32,B04:31,B05:32,B06:32,B07:32,B08:31,B09:31,B10:32};
const finish={A05:'§root-ornament{opacity:1}',A09:'§chrome-shadow{opacity:.18;transform:translate(2px,2px)}',B03:'§editorial-ghost{opacity:.18;transform:translate(2px,2px)}'};
module.exports=id=>(finish[id]||'')+`@media screen{[data-edition] p§copy[data-body]{font-size:var(--body)}}@media screen and (max-width:760px){[data-display-type]{font-size:${size[id]}px!important;line-height:1.65}[data-display-type] §type-line{text-wrap:balance;word-break:normal;letter-spacing:.015em}h2,h3{text-wrap:balance}${id==='A09'?'§outline-word{font-size:clamp(38px,14vw,53px);white-space:nowrap;letter-spacing:-.045em}':''}}`;
