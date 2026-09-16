async function getData(){
 const isBlog=location.pathname.includes("/blogs");
 const file=isBlog?"../data/blogs.json":"../data/projects.json";
 return {items:await (await fetch(file)).json(),isBlog};
}
function fmt(d){return new Intl.DateTimeFormat(undefined,{year:"numeric",month:"short",day:"numeric"}).format(new Date(d+"T00:00:00"));}
function card(x,isBlog){
 if(isBlog)return `<article class="blog-card"><div class="blog-number">#</div><div class="card-body"><div class="meta"><span>${x.category}</span><time>${fmt(x.date)}</time></div><h3><a href="${x.slug}/">${x.name}</a></h3><p>${x.short}</p><a class="text-link" href="${x.slug}/">Read article →</a></div></article>`;
 return `<article class="project-card"><a class="card-image" href="${x.slug}/"><img src="${x.screenshots?.[0]||'../assets/img/project-placeholder.svg'}" alt="${x.name}" loading="lazy"></a><div class="card-body"><div class="meta"><span>${x.category}</span><time>${fmt(x.date)}</time></div><h3><a href="${x.slug}/">${x.name}</a></h3><p>${x.short}</p><div class="tag-row">${(x.tech||[]).slice(0,5).map(t=>`<span>${t}</span>`).join("")}</div><a class="text-link" href="${x.slug}/">View project →</a></div></article>`;
}
window.addEventListener("DOMContentLoaded",async()=>{
 try{
   const {items,isBlog}=await getData();
   const grid=document.getElementById(isBlog?"blogGrid":"projectGrid"), search=document.getElementById("searchInput"), filter=document.getElementById("categoryFilter"), empty=document.getElementById("emptyState");
   [...new Set(items.map(x=>x.category))].sort().forEach(c=>filter.insertAdjacentHTML("beforeend",`<option>${c}</option>`));
   function render(){
     const q=search.value.trim().toLowerCase(), cat=filter.value;
     const out=items.filter(x=>(cat==="all"||x.category===cat)&&[x.name,x.short,x.category].join(" ").toLowerCase().includes(q));
     grid.innerHTML=out.map(x=>card(x,isBlog)).join(""); empty.classList.toggle("hidden",out.length>0);
   }
   search.addEventListener("input",render); filter.addEventListener("change",render); render();
 }catch(e){console.error(e);}
});