'use strict';
const companions={
 bird:{name:'このデザイン専用・読書の魔女',src:'img/design-B02.png',alt:'読書の小箱だけのために生成した、人型のオリジナルの読書の魔女'},
 flower:{name:'このデザイン専用・花の魔女',src:'img/design-B05.png',alt:'庭の四季だけのために生成した、人型のオリジナルの花の魔女'},
 imp:{name:'このデザイン専用・小悪魔魔女',src:'img/design-B09.png',alt:'ホワイトハートだけのために生成した、人型のオリジナルの小悪魔魔女'}
};
const byLayout={'02':{bird:companions.bird},'05':{flower:companions.flower},'09':{imp:companions.imp}};
const defaultCompanion=id=>({'02':'bird','05':'flower','09':'imp'}[id]||'none');
module.exports={companions,byLayout,defaultCompanion};
