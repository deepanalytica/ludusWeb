const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const PACKS={cero:{title:"JUEGA CERO",price:299000,image:"assets/juega-cero.webp",text:"Un rincón de exploración a ras de suelo para sus primeros meses: superficies cómodas, juego visual y táctil y guardado accesible."},nido:{title:"JUEGA NIDO",price:449000,image:"assets/juega-nido.webp",text:"Movimiento de baja altura con rampa y estructura compacta para subir, bajar y explorar dentro de casa."},mini:{title:"MINI 3",price:749000,image:"assets/pack-mini.webp",text:"Una pared que empieza a jugar: escalada compacta, apoyo motriz y una zona amortiguante acotada."},active:{title:"ACTIVO 6",price:1390000,image:"assets/pack-active.webp",text:"Concentra escalada, trepa y suspensión en el perímetro para dejar el centro libre. Es la opción más equilibrada para uso diario."},adventure:{title:"AVENTURA 10",price:2390000,image:"assets/pack-adventure.webp",text:"Un circuito más completo con mayor recorrido, suspensión, red y posibilidad de guardado."}};
let selectedPack="active";
const clp=v=>new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(v);
function updateEstimate(){let total=PACKS[selectedPack].price;$$("[data-addon]:checked").forEach(i=>total+=Number(i.dataset.addon));const el=$("#estimatePrice");if(el)el.textContent=clp(total)}
function selectPack(key,scroll=false){if(!PACKS[key])return;selectedPack=key;$$(".config-option").forEach(b=>b.classList.toggle("active",b.dataset.pack===key));const label=$("#previewPackLabel");if(label)label.textContent=PACKS[key].title;updateEstimate();if(scroll){$("#studio")?.scrollIntoView({behavior:"smooth",block:"start"})}}
$$(".config-option").forEach(b=>b.addEventListener("click",()=>selectPack(b.dataset.pack)));$$("[data-addon]").forEach(i=>i.addEventListener("change",updateEstimate));$$(".quick-pack").forEach(b=>b.addEventListener("click",()=>selectPack(b.dataset.pack,true)));
$$(".segmented button").forEach(b=>b.addEventListener("click",()=>{$$(".segmented button").forEach(x=>x.classList.remove("active"));b.classList.add("active")}));
const input=$("#photoInput"),dropzone=$("#dropzone"),preview=$("#photoPreview"),previewImage=$("#previewImage");
function loadPhoto(file){if(!file)return;if(!["image/jpeg","image/png","image/webp"].includes(file.type)){alert("Usa una imagen JPG, PNG o WEBP.");return}if(file.size>10*1024*1024){alert("La imagen supera 10 MB.");return}const reader=new FileReader();reader.onload=e=>{previewImage.src=e.target.result;dropzone.hidden=true;preview.hidden=false;$("#studio")?.scrollIntoView({behavior:"smooth",block:"start"})};reader.readAsDataURL(file)}
if(dropzone&&input){dropzone.addEventListener("click",()=>input.click());dropzone.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();input.click()}});input.addEventListener("change",e=>loadPhoto(e.target.files[0]));["dragenter","dragover"].forEach(t=>dropzone.addEventListener(t,e=>{e.preventDefault();dropzone.classList.add("dragover")}));["dragleave","drop"].forEach(t=>dropzone.addEventListener(t,e=>{e.preventDefault();dropzone.classList.remove("dragover")}));dropzone.addEventListener("drop",e=>loadPhoto(e.dataTransfer.files[0]))}
["heroUpload","finalUpload","changePhoto"].forEach(id=>$("#"+id)?.addEventListener("click",()=>input?.click()));
$("#renderButton")?.addEventListener("click",()=>{const p=PACKS[selectedPack];$("#renderImage").src=p.image;$("#renderImage").alt="Referencia visual de "+p.title;$("#renderBadge").textContent=p.title;$("#renderTitle").textContent=p.title;$("#renderText").textContent=p.text;$("#renderResult").scrollIntoView({behavior:"smooth",block:"center"})});
const range=$("#baRange"),before=$("#baBefore"),divider=$("#baDivider");function setBA(v){if(before)before.style.width=v+"%";if(divider)divider.style.left=v+"%"}if(range){range.addEventListener("input",e=>setBA(e.target.value));setBA(range.value)}
const menuButton=$(".menu-toggle"),nav=$("#main-nav");if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open))});$$('#main-nav a').forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false")}))}
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.08});$$(".reveal").forEach(el=>observer.observe(el));const year=$("#year");if(year)year.textContent=new Date().getFullYear();updateEstimate();
/* Marketplace interactions */
const marketSearch=$("#marketSearch"), marketCards=$$(".market-card"), marketCount=$("#marketCount");
let activeMarketFilter="all";
function applyMarketFilter(){
  const q=(marketSearch?.value||"").trim().toLowerCase();
  let visible=0;
  marketCards.forEach(card=>{
    const hay=(card.dataset.tags+" "+card.textContent).toLowerCase();
    const byFilter=activeMarketFilter==="all"||hay.includes(activeMarketFilter);
    const bySearch=!q||hay.includes(q);
    card.hidden=!(byFilter&&bySearch);
    if(!card.hidden)visible++;
  });
  if(marketCount)marketCount.textContent=visible;
}
$$("#marketFilters [data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
  $$("#marketFilters [data-filter]").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  activeMarketFilter=btn.dataset.filter;
  applyMarketFilter();
}));
marketSearch?.addEventListener("input",applyMarketFilter);
["exampleUpload","customUpload"].forEach(id=>$("#"+id)?.addEventListener("click",()=>input?.click()));

const quoteItems=new Set();
const quoteBar=document.createElement("div");
quoteBar.className="quote-bar";
quoteBar.innerHTML='<span><strong id="quoteCount">0</strong> módulos en mi proyecto</span><button type="button" id="quoteGo">Continuar →</button>';
document.body.appendChild(quoteBar);
$$("[data-add-item]").forEach(btn=>btn.addEventListener("click",()=>{
  const item=btn.dataset.addItem;
  if(quoteItems.has(item)){quoteItems.delete(item);btn.classList.remove("added");btn.textContent="＋";}
  else{quoteItems.add(item);btn.classList.add("added");btn.textContent="✓";}
  $("#quoteCount").textContent=quoteItems.size;
  quoteBar.classList.toggle("visible",quoteItems.size>0);
}));
$("#quoteGo")?.addEventListener("click",()=>$("#studio")?.scrollIntoView({behavior:"smooth",block:"start"}));
applyMarketFilter();
