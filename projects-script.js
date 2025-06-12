// projects html script
const imageCoverSnpFree = document.getElementById("project-cover-id-snp-free");
const linkSnpFree = document.querySelectorAll(".project-link");



imageCoverSnpFree.src = "/projects_assets/simple_notepad/snp_free/ic_cover.png";

linkSnpFree.forEach(link => {
    link.addEventListener("click", () => {
        const name = link.getAttribute("data-name");
        const version = link.getAttribute("data-version");
        window.location.href = 'projectview.html?name='+name+'+&version='+version;
    });
});

