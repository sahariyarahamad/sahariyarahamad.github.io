async function loadJSON(path){const r=await fetch(path);if(!r.ok)throw new Error("Could not load "+path);return r.json();}
function projectCard(p){
 return `<article class="project-card">
   <a class="card-image" href="projects/${p.slug}/"><img src="${p.screenshots?.[0]||'assets/img/project-placeholder.svg'}" alt="${p.name}" loading="lazy"></a>
   <div class="card-body"><div class="meta"><span>${p.category}</span><time>${formatDate(p.date)}</time></div>
   <h3><a href="projects/${p.slug}/">${p.name}</a></h3><p>${p.short}</p>
   <div class="tag-row">${(p.tech||[]).slice(0,4).map(x=>`<span>${x}</span>`).join("")}</div>
   <a class="text-link" href="projects/${p.slug}/">View project →</a></div>
 </article>`;
}
function blogCard(b){
 return `<article class="blog-card"><div class="blog-number">#</div><div class="card-body"><div class="meta"><span>${b.category}</span><time>${formatDate(b.date)}</time></div><h3><a href="blogs/${b.slug}/">${b.name}</a></h3><p>${b.short}</p><a class="text-link" href="blogs/${b.slug}/">Read article →</a></div></article>`;
}
function formatDate(d){return new Intl.DateTimeFormat(undefined,{year:"numeric",month:"short",day:"numeric"}).format(new Date(d+"T00:00:00"));}
window.addEventListener("DOMContentLoaded",async()=>{
 try{
   const [ps,bs]=await Promise.all([loadJSON("data/projects.json"),loadJSON("data/blogs.json")]);
   document.getElementById("projectCount").textContent=ps.length;
   document.getElementById("blogCount").textContent=bs.length;
   document.getElementById("docCount").textContent="3";
   document.getElementById("homeProjects").innerHTML=ps.filter(x=>x.featured).slice(0,3).map(projectCard).join("");
   document.getElementById("homeBlogs").innerHTML=bs.filter(x=>x.featured).slice(0,3).map(blogCard).join("");
 }catch(e){console.error(e);}
});