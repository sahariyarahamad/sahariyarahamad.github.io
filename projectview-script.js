// project-view.js

// Get query parameters
const urlParams = new URLSearchParams(window.location.search);
const projectName = urlParams.get('name');
const version = urlParams.get('version');
const imgUrl = urlParams.get('img');
const customerFirstMsg = "Hello i'm from your project store and i want to buy ";
const customerLastMsg = " version. Please reply me as soon as possible";
const gmail = "sahariyarahamed0@gmail.com";
const whatsApp = "+8801618852884";

// Dummy multiple project data with versions and DM links
const projectData = {
  caption: {
    lite: {
      title: "Caption App (Lite Version)",
      description: "Basic features to add and manage captions for social media.",
      dmMsg: ""+customerFirstMsg+projectName+" app "+version+customerLastMsg,
      projectTotalPrice: "<del>$4</del>",
      projectDiscountPrice: "Free" ,
      feature: "<br><br>Simple UI<br>Easy to use<br>Save option",
      projectSS: "LINK",
      whatYouGet: "You get .apk & .abb file"
    },
    pro: {
      title: "Caption App (Pro Version)",
      description: "Includes AI-generated captions, favorites, and sharing options.",
      dmMsg: ""+customerFirstMsg+projectName+" app "+version+customerLastMsg,
      feature: "<br><br>Simple UI<br>Easy to use",
      projectTotalPrice: "<del>$6</del>",
      projectDiscountPrice: "$4" ,
      projectSS: "LINK",
      whatYouGet: "You get .apk & .abb file"
    },
    gold: {
      title: "Caption App (Gold Version)",
      description: "Premium caption packs, offline access, and commercial license.",
      dmMsg: ""+customerFirstMsg+projectName+" app "+version+customerLastMsg,
      feature: "<br><br>Simple UI<br>Easy to use",
      projectTotalPrice: "<del>$7</del>",
      projectDiscountPrice: "$6" ,
      projectSS: "LINK",
      whatYouGet: "You get .apk & .abb file"
    }
  }
};

// Render project info
const titleElement = document.getElementById("project-title");
const descElement = document.getElementById("project-description");
const dmButtonTelegram = document.getElementById("dm-button-telegram");
const dmButtonGmail = document.getElementById("dm-button-gmail");
const dmButtonWhatsapp = document.getElementById("dm-button-whatsapp");
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

  // for gmail 
  const linkGmail = 'mailto:'+gmail+'?subject=Want to buy '+projectName+` app&body=${encodeMsg} `;

  // for wa
  const linkWhatsApp = `https://wa.me/${whatsApp}?text=${encodeMsg}`;

  titleElement.textContent = data.title;
  descElement.textContent = data.description;

  const imgUrlEncode = encodeURIComponent(imgUrl);
  //set cover 
  //if (projectCoverImgId && imgUrl) {
    projectCoverImgId.src = imgUrl;
    //console.log("[DEBUG] imgUrl", imgUrl);
  //}

  //for tg
  dmButtonTelegram.href = linkTg;
  dmButtonTelegram.style.display = "inline-block";
  // for gmail
  dmButtonGmail.href = linkGmail;
  dmButtonGmail.style.display = "inline-block";

  //for wa
  dmButtonWhatsapp.href = linkWhatsApp;
  dmButtonWhatsapp.style.display = "inline-block";
  showProjectFeature.innerHTML = data.feature;
  projectTotalPrice.innerHTML = data.projectTotalPrice;
  projectDiscountPrice.innerHTML = data.projectDiscountPrice;
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
  dmButtonGmail.style.display = "none";
   dmButtonWhatsapp.style.display = "none";
  document.getElementById("project-ss-tag").style.display = "none";
  whatYouGet.style.display = "none";
}
