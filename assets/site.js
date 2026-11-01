(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(pointer:fine)').matches,root=document.documentElement,SPA=document.body.hasAttribute('data-spa');
function $(s,c){return (c||document).querySelector(s)}function $$(s,c){return [].slice.call((c||document).querySelectorAll(s))}
/* ---------- smooth scrolling ---------- */
var target=scrollY,cur=scrollY,run=false;function max(){return root.scrollHeight-innerHeight}
function loop(){cur+=(target-cur)*.09;if(Math.abs(target-cur)<.5){cur=target;run=false}scrollTo(0,cur);if(run)requestAnimationFrame(loop)}
function go(y){if(reduce||!fine){scrollTo({top:y,behavior:reduce?'auto':'smooth'});return}target=Math.max(0,Math.min(max(),y));if(!run){cur=scrollY;run=true;requestAnimationFrame(loop)}}
/* wheel hijack removed for this home-page preview: native scrolling */
var hdr=$('.hdr');
function offsetFor(el){var sn=el.closest('.page,body')&&$('.subnav',el.closest('.page')||document);return (sn&&sn.offsetParent!==null?60:20)}
function scrollToEl(el){if(!el)return;var y=el.getBoundingClientRect().top+scrollY-offsetFor(el);go(y)}
/* ---------- mega menu ---------- */
$$('.mi.has>.top').forEach(function(a){a.addEventListener('click',function(e){if(innerWidth<=1100){e.preventDefault();var li=a.parentElement,o=!li.classList.contains('open');$$('.mi.open').forEach(function(x){x.classList.remove('open')});if(o)li.classList.add('open')}})});
$$('.mi.has').forEach(function(li){li.addEventListener('keydown',function(e){if(e.key==='Escape'){li.classList.remove('open');li.querySelector('.top').focus()}})});
var bg=$('.burger');if(bg)bg.addEventListener('click',function(){var o=hdr.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
function closeMenus(){hdr.classList.remove('open');$$('.mi.open').forEach(function(x){x.classList.remove('open')});if(document.activeElement&&hdr.contains(document.activeElement))document.activeElement.blur()}
/* ---------- router (single-file preview) ---------- */
function route(){var h=location.hash||'#/home';if(h.indexOf('#/')!==0)return;var parts=h.slice(2).split('/'),slug=parts[0]||'home',anc=parts[1];
 var pg=$('.page[data-page="'+slug+'"]')||$('.page[data-page="home"]');$$('.page').forEach(function(p){p.hidden=p!==pg});
 $$('.mi .top').forEach(function(a){if(a.getAttribute('href')==='#/'+slug)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.title=pg.getAttribute('data-title');closeMenus();
 if(anc){var t=document.getElementById(anc);if(t){if(pg.dataset.shown!=='1'){scrollTo(0,0);setTimeout(function(){scrollToEl(t)},60)}else scrollToEl(t)}}else{scrollTo(0,0);target=cur=0}
 pg.dataset.shown='1';$$('.page').forEach(function(p){if(p!==pg)p.dataset.shown='0'});observe(pg);sub()}
if(SPA){addEventListener('hashchange',route)}
/* same-page anchors (multi-file mode) */
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var href=a.getAttribute('href');
 if(SPA){if(href.indexOf('#/')===0&&href===location.hash){e.preventDefault();route()}return}
 var i=href.indexOf('#');if(i<0)return;var file=href.slice(0,i),id=href.slice(i+1),here=location.pathname.split('/').pop()||'index.html';
 if((file===''||file===here)&&id){var t=document.getElementById(id);if(t){e.preventDefault();closeMenus();history.replaceState(null,'','#'+id);scrollToEl(t)}}});
/* ---------- scroll effects ---------- */
var last=scrollY;
function frame(){var y=scrollY;if(!hdr.classList.contains('open'))hdr.classList.toggle('hide',y>last&&y>500);last=y;if(reduce)return;
 var vis=$('.page:not([hidden])')||document;var hb=$('.hero .bg',vis),w=$('.word',vis),hs=$('.house',vis);
 if(hb&&y<1000){hb.style.transform='translate3d(0,'+(y*.25).toFixed(1)+'px,0)';if(w)w.style.transform='translate3d(0,'+(y*.4).toFixed(1)+'px,0)';if(hs)hs.style.marginBottom=(-y*.08).toFixed(1)+'px'}
 var pb=$('.phero .pbg',vis);if(pb&&y<900)pb.style.transform='translate3d(0,'+(y*.2).toFixed(1)+'px,0) scale(1.04)';
 $$('[data-par]',vis).forEach(function(el){var r=el.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;el.style.transform='translate3d(0,'+(((r.top+r.height/2-innerHeight/2)/innerHeight)*-parseFloat(el.dataset.par)).toFixed(1)+'px,0)'});sub()}
addEventListener('scroll',function(){requestAnimationFrame(frame)},{passive:true});
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
function observe(c){$$('.rv',c).forEach(function(el){if(!el.classList.contains('in'))io.observe(el)})}
/* sub navigation: highlight the section in view */
function sub(){var vis=$('.page:not([hidden])')||document,sn=$('.subnav',vis);if(!sn)return;var links=$$('a',sn),best=null;
 links.forEach(function(a){var h=a.getAttribute('href'),id=h.slice(h.lastIndexOf(SPA?'/':'#')+1),el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<innerHeight*.4)best=a});
 links.forEach(function(a){a.classList.toggle('on',a===best)})}
/* ---------- flow explorer ---------- */
if($('.dia')&&window.FLOW){var F=window.FLOW;function setFlow(m){var f=F[m];$$('.tabs button').forEach(function(b){b.setAttribute('aria-selected',b.dataset.m===m)});var tx=$('.fswap');tx.classList.add('out');
 setTimeout(function(){$('#fT').textContent=f.t;$('#fD').textContent=f.d;$('#fL').innerHTML=f.b.map(function(x){return '<li>'+window.CK+x+'</li>'}).join('');tx.classList.remove('out')},260);
 ['rS','rH','rB','rG'].forEach(function(id,i){document.getElementById(id).textContent=f.r[i]});var on=f.l.split(' ');
 $$('.dia .ln').forEach(function(l){l.classList.toggle('on',on.indexOf(l.dataset.l)>-1)});
 $$('.dia .node').forEach(function(n){n.classList.toggle('off',n.dataset.need.split(' ').every(function(x){return on.indexOf(x)<0}))})}
 $$('.tabs button').forEach(function(b){b.addEventListener('click',function(){setFlow(b.dataset.m)})});setFlow('panels')}
/* ---------- savings calculator (illustrative) ---------- */
var shown={};function tw(id,v,f){var el=document.getElementById(id);if(!el)return;var fr=shown[id]||0,t0=null;shown[id]=v;function s(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/600),e=1-Math.pow(1-k,3);el.textContent=f(fr+(v-fr)*e);if(k<1)requestAnimationFrame(s)}requestAnimationFrame(s)}
var money=function(v){return (v<0?'-':'')+'$'+Math.abs(Math.round(v)).toLocaleString('en-NZ')};
var b2=$('#b2');if(b2){var S={roof:'medium',orient:'north',batt:'yes'},dt=$('#dt');
 $$('.calc2 .chips').forEach(function(g){g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('button',g).forEach(function(x){x.setAttribute('aria-pressed',x===b)});S[g.dataset.k]=b.dataset.v;calc()})});
 function calc(){var b=+b2.value,d=+dt.value;$('#b2o').innerHTML='$'+b+'<small> / mo</small>';$('#dto').innerHTML=d+'%<small> daytime</small>';
  b2.style.setProperty('--v',((b-80)/720*100)+'%');dt.style.setProperty('--v',((d-20)/60*100)+'%');
  var price=.33,feed=.12,sun=3.9,use=b/price*12,bat=S.batt==='yes',roofMax={small:5,medium:8,large:12}[S.roof],orient={north:1,eastwest:.88,south:.72}[S.orient];
  var kw=Math.max(3,Math.min(roofMax,Math.round(use/365/sun*.95*2)/2)),gen=kw*sun*365*orient,self=Math.min(.92,d/100+(bat?.3:0));
  var used=Math.min(gen*self,use*.95),save=used*price+(gen-used)*feed,mo=save/12,cost=kw*2300+(bat?12500:0),loan=cost/180;
  tw('c2s',mo,money);tw('c2r',Math.min(99,save/(b*12)*100),function(v){return Math.round(v)+'%'});tw('c2k',kw,function(v){return v.toFixed(1)+' kW'});
  tw('c2p',cost/save,function(v){return v.toFixed(1)+' years'});tw('c2l',loan,money);tw('c2n',mo-loan,money)}
 b2.addEventListener('input',calc);dt.addEventListener('input',calc);calc()}
/* ---------- reviews ---------- */
var card=$('.rv-card');if(card&&window.QUOTES){var Q=window.QUOTES,qi=0,bt=$$('.pk button'),qtm;
 function q(i){if(i===qi)return;qi=i;card.classList.add('swap');bt.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-pressed',k===i)});
  setTimeout(function(){var r=Q[i];$('#qI').src=r.img;$('#qT').textContent=r.q;$('#qN').textContent=r.n;$('#qP').textContent=r.p+', Auckland';$('#qS').textContent=r.s;card.classList.remove('swap')},350)}
 bt.forEach(function(b,k){b.addEventListener('click',function(){q(k);clearInterval(qtm);qtm=setInterval(nx,7000)})});function nx(){q((qi+1)%Q.length)}if(!reduce)qtm=setInterval(nx,7000)}
/* ---------- FAQ ---------- */
$$('.q button').forEach(function(b){b.addEventListener('click',function(){var it=b.parentElement,o=!it.classList.contains('open');$$('.q.open',it.parentElement).forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});if(o){it.classList.add('open');b.setAttribute('aria-expanded','true')}})});
/* ---------- quote & booking wizard ---------- */
var wz=$('.wiz');if(wz){var st=$$('.wstep',wz),bars=$$('.prog2 i',wz),k=0,D={type:'',want:[],bill:'',use:'',day:'',time:'',how:''};
 var days=$('.days',wz),dn=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],mn=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],d=new Date(),c=0,html='';
 while(c<10){d.setDate(d.getDate()+1);if(d.getDay()===0||d.getDay()===6)continue;html+='<button type="button" class="day" aria-pressed="false" data-v="'+dn[d.getDay()]+' '+d.getDate()+' '+mn[d.getMonth()]+'">'+dn[d.getDay()]+'<b>'+d.getDate()+'</b>'+mn[d.getMonth()]+'</button>';c++}
 days.innerHTML=html;
 wz.addEventListener('click',function(e){var b=e.target.closest('button[data-k]');if(!b)return;var key=b.dataset.k,multi=b.hasAttribute('data-multi');
  if(multi){var p=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',!p);D[key]=$$('button[data-k="'+key+'"][aria-pressed="true"]',wz).map(function(x){return x.dataset.v})}
  else{$$('button[data-k="'+key+'"]',wz).forEach(function(x){x.setAttribute('aria-pressed',x===b)});D[key]=b.dataset.v}$('.wmsg',st[k]).textContent=''});
 $$('.day',wz).forEach(function(b){b.dataset.k='day'});
 function show(i){st.forEach(function(s,j){s.classList.toggle('on',j===i)});bars.forEach(function(b,j){b.classList.toggle('on',j<=i)});k=i;
  if(i===st.length-1){$('.wsum',wz).innerHTML='<b>Your consultation:</b> '+(D.how||'')+' on '+(D.day||'')+' at '+(D.time||'')+'<br><b>Property:</b> '+D.type+' · <b>Interested in:</b> '+(D.want.join(', ')||'Not sure yet')+' · <b>Bill:</b> '+(D.bill||'-')}}
 function need(){var s=st[k],m='';if(s.dataset.req==='type'&&!D.type)m='Please choose a property type.';if(s.dataset.req==='want'&&!D.want.length)m='Please choose at least one option.';
  if(s.dataset.req==='bill'&&(!D.bill||!D.use))m='Please choose your bill and usage pattern.';if(s.dataset.req==='book'&&(!D.day||!D.time||!D.how))m='Please pick a day, a time and how you would like to meet.';
  $('.wmsg',s).textContent=m;return !m}
 $$('.wnext',wz).forEach(function(b){b.addEventListener('click',function(){if(need())show(k+1)})});$$('.wback',wz).forEach(function(b){b.addEventListener('click',function(){show(Math.max(0,k-1))})});
 var wf=$('#wform'),ts=$('#wts',wf);if(ts)ts.value=Date.now();
 function fin(){wz.classList.add('sent');$('.wdone b',wz).textContent=wf.name.value.split(' ')[0];$('.wdone span',wz).textContent=D.how+' on '+D.day+' at '+D.time}
 wf.addEventListener('submit',function(e){e.preventDefault();var ok=true;$$('[required]',wf).forEach(function(inp){var fl=inp.closest('.fl'),m='';
  if(!inp.value.trim())m='Please fill this in.';else if(inp.type==='email'&&!/^\S+@\S+\.\S+$/.test(inp.value))m='Please enter a valid email.';fl.classList.toggle('err',!!m);$('.em',fl).textContent=m;if(m&&ok){ok=false;inp.focus()}});
  if(!ok)return;var btn=wf.querySelector('[type=submit]'),msg=$('.wmsg',wf);msg.textContent='';
  if(SPA){fin();return}
  btn.disabled=true;btn.classList.add('busy');var lbl=btn.firstChild.nodeValue;btn.firstChild.nodeValue='Sending… ';
  var fd=new FormData(wf);fd.append('property',D.type);fd.append('interests',D.want.join(', '));fd.append('bill',D.bill);fd.append('usage',D.use);fd.append('meeting',D.how);fd.append('day',D.day);fd.append('time',D.time);fd.append('page',location.href);
  function fail(t){btn.disabled=false;btn.classList.remove('busy');btn.firstChild.nodeValue=lbl;msg.innerHTML=(t||'Sorry, your request could not be sent.')+' Please call <a href="tel:0800874532">0800 874 532</a> (free).'}
  fetch(wf.getAttribute('action')||'send.php',{method:'POST',body:fd,headers:{'Accept':'application/json'}}).then(function(r){return r.json()}).then(function(j){if(j&&j.ok)fin();else fail(j&&j.error)}).catch(function(){fail()})});show(0)}
if(SPA)route();else{observe(document);if(location.hash){var t0=document.getElementById(location.hash.slice(1));if(t0){if('scrollRestoration' in history)history.scrollRestoration='manual';var fix=function(){var y=Math.round(t0.getBoundingClientRect().top+scrollY-offsetFor(t0));if(Math.abs(scrollY-y)>2)scrollTo(0,y);target=cur=y};setTimeout(fix,60);addEventListener('load',function(){fix();setTimeout(fix,500)})}}}frame();
})();

/* 28 Oct: cursor v3: dot + ring stay centred, colour adapts to what is under it (also while scrolling) */
(function(){
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches, calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!fine||calm) return;
  var B=document.body,d=document.createElement('div'),r=document.createElement('div');d.className='cur-dot';r.className='cur-ring';
  d.setAttribute('aria-hidden','true');r.setAttribute('aria-hidden','true');
  B.appendChild(d);B.appendChild(r);B.classList.add('cur-js');
  var x=-100,y=-100,rx=-100,ry=-100,last=null,moving=false;
  var DARK='.nat,.steps,.diff.dark,.afeat>div:first-child,.btn,.hq-btn,.ftab.on,.sysk .link,.elink span,.stp .sn,.ctabox,.hero,.phero,.sp-ph,.prodc-img,.gal,.jobstrip,.aph,.wideph,.impact figure,.pgimg,.pano,.sfc figure,.plans,.pt,.shedrow,.cowph,.recog>img,.serv figure,.xpi,.pfilter .on,.film-in';
  var LIGHT='.hq-pw,.custs,.member,.brands,.logo,.bar,.specc,.pt figcaption,.glass,.pcard,.mega-in,.usetbl,.film-ctl';
  var HOV='a,button,input,select,textarea,label,.opt,.q button,[role=button]';
  function state(t){
    if(!t||t===last) return; last=t;
    var light=t.closest(LIGHT), dark=t.closest(DARK);
    B.classList.toggle('cur-dark',!!dark&&!(light&&dark.contains(light)));
    var lab=t.closest('[data-cursor]');
    if(lab){B.classList.add('cur-label');r.textContent=lab.getAttribute('data-cursor')}else{B.classList.remove('cur-label');r.textContent=''}
    B.classList.toggle('cur-hover',!lab&&!!t.closest(HOV));
  }
  function tick(){
    rx+=(x-rx)*.38;ry+=(y-ry)*.38;
    if(Math.abs(x-rx)<.1&&Math.abs(y-ry)<.1){rx=x;ry=y;moving=false}
    r.style.transform='translate3d('+rx+'px,'+ry+'px,0)';
    if(moving) requestAnimationFrame(tick);
  }
  function kick(){if(!moving){moving=true;requestAnimationFrame(tick)}}
  addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;B.classList.add('cur-on');d.style.transform='translate3d('+x+'px,'+y+'px,0)';state(e.target);kick()},{passive:true});
  addEventListener('scroll',function(){if(B.classList.contains('cur-on')){last=null;state(document.elementFromPoint(x,y))}},{passive:true});
  document.addEventListener('mouseleave',function(){B.classList.remove('cur-on')});
  addEventListener('blur',function(){B.classList.remove('cur-on')});
  addEventListener('mousedown',function(){B.classList.add('cur-down')});
  addEventListener('mouseup',function(){B.classList.remove('cur-down')});
  document.querySelectorAll('.prodc,.solc').forEach(function(c){
    c.addEventListener('mousemove',function(e){var q=c.getBoundingClientRect(),px=(e.clientX-q.left)/q.width-.5,py=(e.clientY-q.top)/q.height-.5;
      c.style.transform='perspective(900px) rotateY('+(px*4)+'deg) rotateX('+(-py*4)+'deg) translateY(-5px)'});
    c.addEventListener('mouseleave',function(){c.style.transform=''});
  });
})();
