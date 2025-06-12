// projects html script
const imageCoverSnpFree = document.getElementById("project-cover-id-snp-free");
const linkSnpFree = document.querySelectorAll(".project-link");



imageCoverSnpFree.src = "https://raw.githubusercontent.com/sahariyarahamad/sahariyarhost/refs/heads/main/my_project_store/assets/simple_note_project/snp_free/ic_snp_free.png";

linkSnpFree.forEach(link => {
    link.addEventListener("click", () => {
        const name = link.getAttribute("data-name");
        const version = link.getAttribute("data-version");
        window.location.href = 'projectview.html?name='+name+'+&version='+version;
    });
});

