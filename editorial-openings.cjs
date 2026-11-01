'use strict';
const copy={
 A01:['ふるさとの風景から始まる、一冊の自伝。小さな記憶をつなぐと、私の歩んだ道が見えてきます。','頁をめくる手を少し止めて、好きだったことを思い出します。喜びも苦しさも、この物語の大切な一節です。','書き終えるのではなく、これからの頁をひらくために。今の気持ちと、大切な人への思いを残します。'],
 A02:['年をたどりながら、その時の自分に会いに行きます。年表のそばに、数字だけでは語れない思い出を綴りました。','人生の道には、夢中になったことや忘れられない場面が枝分かれしています。私の心が動いた四つの記憶です。','歩みの先に残ったものは、人とのつながりと小さな希望。今日の暮らしから、次の時間へつないでいきます。'],
 A03:['私の人生を、一面の記事にするなら。ふるさと、学び、仕事、家族。その一つひとつが、私だけのニュースです。','今日は少しゆっくり、暮らしの特集を。趣味の楽しみ、旅の記憶、胸に残った出来事をまとめました。','社説の代わりに、私の言葉を。支えてくれた人への感謝と、これからの日々への願いを記します。'],
 A04:['ふるさとの駅を出て、いくつもの出会いを重ねてきました。人生の停車駅を、自分の歩幅でたどります。','寄り道の途中で見つけた楽しみ、窓の向こうに残る景色。旅の記録を開くように、思い出を広げます。','いま立っている場所から、次の行き先を考えます。大切な人への思いも、これからの旅へ持っていきたいものです。'],
 A05:['暮らしの根をたどると、懐かしい土地と人の姿が浮かびます。季節の景色とともに、歩んだ日々を振り返ります。','庭の変化に気づくように、日々の喜びを見つけてきました。心を育ててくれた時間を、風景の中へ置いてみます。','根、葉、花、そして種。これまで受け取った優しさを、次の季節にもつないでいけたらと思います。'],
 A06:['手を動かして覚えたこと、人から教わったこと。仕事の肩書きだけでは伝わらない、私の歩みの記録です。','仕事を離れた時間にも、工夫する楽しさは続いています。道具を並べるように、好きなことを一つずつ記します。','形のあるものと、その奥にある姿勢。私が大切にしてきたことを、これからの誰かへ手渡したいと思います。'],
 A07:['静かな夜に、歩んだ道を振り返ります。出会いと選んだ道、そのひとつひとつに、私の時間が刻まれています。','忘れたくない景色と、心に仕舞った記憶。好きな時間も、乗り越えた日も、今の私へつながっています。','多くを語らなくても、伝えたい想いがあります。大切な人への感謝と、これからの日々への願いを、言葉に残します。'],
 A08:['急がず、ひとつずつ。思い出の間にある余白にも目を向けながら、これまでの暮らしを綴ります。','静かに思い出すと、好きだった時間の手触りが戻ってきます。心に残った景色と出来事を、言葉にしました。','たくさんの言葉でなくても、伝えたいことがあります。今日の暮らし、感謝、そして小さな願いを残します。'],
 A09:['人生の輪郭をつくったのは、特別な日だけではありません。選んだ道と積み重ねた時間を、自分の言葉で記します。','夢中になったこと、心を動かした景色、踏ん張った日々。私らしさをつくる経験を、ひとつずつ確かめます。','過去を語ることは、次の一歩を選ぶことでもあります。いま大切にしているものを、未来への言葉にします。'],
 A10:['一巻目に収めるのは、長い時の中で重ねた歩みです。出来事の奥にある、私にとっての大切な意味を綴ります。','二巻目は、心に仕舞っておきたい記憶。好きなもの、忘れられない時間、喜びと苦難を、丁寧に並べました。','三巻目を、大切なあなたへ。今の私が伝えたい感謝と願いを、この一冊の結びとして残します。'],
 B01:['懐かしい写真を一枚ずつ並べるように。ふるさとから今日までの記憶を、私のアルバムへ収めていきます。','好きなことや旅のひとときには、その時の気持ちも写っています。心のアルバムを、ゆっくりめくってください。','アルバムの最後は、まだ白い頁。今の暮らしと、これから増やしていきたい思い出を綴ります。'],
 B02:['小箱のふたを開けると、懐かしい記憶が顔を出します。大切にしてきたものを、ひとつずつ取り出しました。','好きな時間や忘れられない出来事は、私だけの宝物。小さな札を添えて、その思い出を並べてみます。','これから小箱に加えたいのは、どんな日々でしょう。今の私の気持ちと、大切な人への感謝をここに残します。'],
 B03:['今号の巻頭特集は、私の人生。暮らしの中で出会った人や出来事を、ひとつの物語としてご紹介します。','今号の特集は、好きなことのある暮らし。何気ない毎日を彩った時間と、忘れたくない場面を集めました。','あとがきには、今の気持ちを。お世話になった人への思いも、これからの楽しみも、私の暮らしの続きです。'],
 B04:['遠い日の私から、一枚の便りが届いたように。懐かしい土地と、そこから続く歩みを綴ります。','思い出の便りを広げると、好きだった景色がよみがえります。旅先だけでなく、日々の小さな出来事も大切な記録です。','最後の便りは、今の私から。大切な人へ届けたい言葉と、明日への小さな希望を書き添えます。'],
 B05:['根をおろし、葉を広げ、出会いの花を咲かせて。季節をたどる庭のように、私の人生を見つめ直します。','私の心にも、いくつもの花が咲いています。好きなこと、嬉しかったこと、支えになった時間の記録です。','これまで受け取った優しさを、これからの種に。感謝と希望を、次の季節へそっとつなぎます。'],
 B06:['ひと針ずつ布を縫い合わせるように、日々を重ねてきました。出会いと出来事を、私の覚え書きへ綴ります。','私の好きな時間を、見本帖のように集めました。同じ日はひとつもないからこそ、小さな思い出が愛おしく感じられます。','手から手へ渡せるのは、品物だけではありません。大切にしている気持ちを、言葉にして残したいと思います。'],
 B07:['写真のそばに言葉を添えると、その日の空気まで戻ってくる気がします。私の人生の風景を、ご一緒に。','忘れたくない場面を、光に透かして眺めるように。好きな時間と、心に残った出来事を選んで並べました。','まだ写していない日々が、この先に待っています。今の暮らしと、小さな楽しみへの思いを綴ります。'],
 B08:['懐かしい日々へ手紙を書くつもりで、人生を振り返りました。思い出せることから、ゆっくり言葉にしています。','手紙に添えるなら、どんな思い出を選ぶでしょう。好きだった時間や忘れられない景色を、ここへ挟みました。','明日の私と、大切なあなたへ。この手紙の結びに、感謝と、これからも大切にしたい気持ちを残します。'],
 B09:['好きなものを大切にする気持ちは、いつから私の中にあったのでしょう。日々の記憶から、私らしさを見つけていきます。','心がときめくもの、そばに置きたい思い出。好きという気持ちに囲まれた、私の小さなギャラリーです。','年を重ねても、自分らしい楽しみを持っていたい。今日の感謝と、これからの願いを、やさしい言葉で綴ります。'],
 B10:['たくさんの出会いが枝となり、今日の私へつながっています。根っこの記憶から、人生の木をたどります。','長い時を彩ってくれた、私の宝物。好きなことや忘れられない時間を、記念の一冊に収めました。','今までの日々に、そして支えてくれた人に、ありがとう。その気持ちを、これから歩く力にしていきたいと思います。']
};
function opening(id,i,role,kicker,a){const {t,para,title}=a;const note=para(copy[id][i],'chapter-lead'),mark=para(kicker,'chapter-kicker'),name=title(i),number=t('span','opening-number','0'+(i+1),'aria-hidden="true"');let body;
 switch(id){
 case 'A01':body=t('aside','opening-margin',mark)+t('div','opening-book',name+note);break;
 case 'A02':body=number+t('div','opening-time',mark+name+note);break;
 case 'A03':body=t('div','opening-desk',mark+name)+t('aside','opening-news-lead',note);break;
 case 'A04':body=t('div','opening-destination',number+mark)+t('div','opening-platform',name+note);break;
 case 'A05':body=name+t('div','opening-land',note+mark);break;
 case 'A06':body=t('div','opening-work-index',mark+number)+name+t('div','opening-work-summary',note);break;
 case 'A07':body=t('aside','opening-room-label',mark)+t('div','opening-exhibition',name+note)+number;break;
 case 'A08':body=t('div','opening-quiet-title',name)+t('aside','opening-quiet-note',mark+note);break;
 case 'A09':body=t('div','opening-modern-index',mark+number)+t('div','opening-modern-statement',name+note);break;
 case 'A10':body=t('div','opening-volume',mark)+t('div','opening-literature',name)+t('div','opening-synopsis',note);break;
 case 'B01':body=t('div','opening-album-label',mark)+name+t('div','opening-album-caption',note);break;
 case 'B02':body=t('div','opening-drawer-tab',number+mark)+t('div','opening-keepsake',name+note);break;
 case 'B03':body=t('aside','opening-issue-label',mark+number)+t('div','opening-magazine',name)+note;break;
 case 'B04':body=t('div','opening-postal-mark',mark)+t('div','opening-postal-address',name)+t('div','opening-postal-note',note);break;
 case 'B05':body=(i===0?'<img class="'+a.prefix+'-opening-botanical" data-mascot src="img/witch-flower.png" width="96" height="103" alt="" aria-hidden="true">':'')+t('div','opening-garden',name+mark)+t('div','opening-garden-note',note);break;
 case 'B06':body=t('div','opening-thread-label',mark)+t('div','opening-notebook',name+note);break;
 case 'B07':body=t('div','opening-photo-index',number+mark)+name+t('div','opening-photo-caption',note);break;
 case 'B08':body=t('aside','opening-letter-margin',mark)+t('div','opening-salutation',name)+t('div','opening-letter-note',note);break;
 case 'B09':body=(i===0?'<img class="'+a.prefix+'-opening-heart-ornament" src="img/heart-ornament.png" width="115" height="113" alt="" aria-hidden="true">':'')+t('div','opening-heart-caption',mark)+t('div','opening-heart-title',name)+t('div','opening-heart-essay',note);break;
 case 'B10':body=t('div','opening-anniversary',number)+t('div','opening-celebration',mark+name)+t('div','opening-dedication-note',note);break;
 }
 return t('header',role,body,'data-editorial-opening');
}
module.exports={opening,copy};
