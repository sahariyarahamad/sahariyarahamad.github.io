// project-view.js

// Get query parameters
const urlParams = new URLSearchParams(window.location.search);
const projectName = urlParams.get('name');
const version = urlParams.get('version');
const imgUrl = urlParams.get('img');
const customerFirstMsg = "Hello i'm from your project store and i want to buy ";
const customerLastMsg = " version. Please reply me as soon as possible";
const whatsApp = "+8801618852884";
const messenger = "https://m.me/softahama"

// Dummy multiple project data with versions and DM links
const projectData = {
  simple_note_pad: {
    lite: {
      title: "Simple NotePad App (Lite Version)",
      description: "Create and save note, easy to use",
      dmMsg: ""+customerFirstMsg+projectName+" app "+version+customerLastMsg,
      projectTotalPrice: "<del>$2</del>",
      projectDiscountPrice: "free" ,
      projectFreeDownloadLink: "/",
      feature: "<br><br>Simple UI<br>Easy to use<br>Save option<br>App icon<br>Save notes in device memory",
      projectSS: "https://raw.githubusercontent.com/sahariyarahamad/sahariyarhost/refs/heads/main/my_project_store/assets/simple_note_project/snp_free/snp_free_mockup.png",
      whatYouGet: "You get source code for Android Studio"
    }
  }



};

// Render project info
const titleElement = document.getElementById("project-title");
const descElement = document.getElementById("project-description");
const dmButtonTelegram = document.getElementById("dm-button-telegram");
const dmButtonWhatsapp = document.getElementById("dm-button-whatsapp");
const dmButtonMessenger = document.getElementById("dm-button-messenger");
// for project info div
const projectInfoDiv = document.getElementById("div-project-feature-id");
// for show project feature p
const showProjectFeature = document.getElementById("show-project-feature-p");
const projectCoverImgId = document.getElementById("project-cover-img-id");

// for price
const projectTotalPrice = document.getElementById("project-total-price");
const projectDiscountPrice = document.getElementById("project-discount-price");

// for what you get 
const whatYouGet = document.getElementById("what-you-get-id");



if (
  projectName &&
  version &&
  projectData[projectName] &&
  projectData[projectName][version]
) {
  const data = projectData[projectName][version];

  // encode the tg msg
  const encodeMsg = encodeURIComponent(data.dmMsg);
  const linkTg = `https://t.me/sahariyarahamad?text=${encodeMsg}`;

  // for wa
  const linkWhatsApp = `https://wa.me/${whatsApp}?text=${encodeMsg}`;

  // for messenger
  document.getElementById("messenger-msg-note").innerHTML = "⚠️ NOTE: <br><br>IF DM BY MESSENGER THEN PLEASE COPY BELOW TEXT AND PAST MESSENGER TEXT BOX<br><code><pre>"+ data.dmMsg +"</pre></code><br>";
  const linkMessenger = ""+messenger;

  titleElement.textContent = data.title;
  descElement.textContent = data.description;

  const imgUrlEncode = encodeURIComponent(imgUrl);
  //set cover 
  projectCoverImgId.src = imgUrl;

  //for tg
  dmButtonTelegram.href = linkTg;
  dmButtonTelegram.style.display = "inline-block";
  // for mess
  dmButtonMessenger.href = linkMessenger;
  dmButtonMessenger.style.display = "inline-block";

  //for wa
  dmButtonWhatsapp.href = linkWhatsApp;
  dmButtonWhatsapp.style.display = "inline-block";
  showProjectFeature.innerHTML = data.feature;
  projectTotalPrice.innerHTML = data.projectTotalPrice;
  projectDiscountPrice.innerHTML = data.projectDiscountPrice;

  // set for project discount price 
  if(data.projectDiscountPrice.toLowerCase() === "free") {
    dmButtonTelegram.textContent = "Download Source Code";
    // set link
    dmButtonTelegram.href = ""+data.projectFreeDownloadLink;
    // gone other btns
   dmButtonWhatsapp.style.display = "none";
   dmButtonMessenger.style.display = "none";
   document.getElementById("messenger-msg-note").style.display = "none";
   projectDiscountPrice.innerHTML = "Free";
  }

  // set ss
  document.getElementById("project-ss-img").src = data.projectSS;
  whatYouGet.innerHTML = data.whatYouGet;

} else {
  titleElement.textContent = "Project Not Found";
  descElement.textContent = "The project you are looking for does not exist or is unavailable.";
  dmButtonTelegram.href = "/projects.html";
  dmButtonTelegram.target = "_self";
  dmButtonTelegram.textContent = "Back to project page";
  projectInfoDiv.style.display = "none";
  // set not found image
  document.getElementById("project-ss-img").style.display = "none"
  document.getElementById("project-not-found-cover-txt").innerHTML = "404";
  projectCoverImgId.style.display = "none";
  dmButtonWhatsapp.style.display = "none";
  document.getElementById("project-ss-tag").style.display = "none";
  whatYouGet.style.display = "none";
}
