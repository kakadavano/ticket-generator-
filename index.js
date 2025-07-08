
const form = document.querySelector(".form");
const avatarIn = document.querySelector("#avatar-input");
const fileError = document.querySelector("#file-error");
const dropArea = document.querySelector("#drop-area");
const emailIn = document.querySelector("#email-input");
const emailError = document.querySelector("#email-error");
const info2 = document.querySelector(".info2");

const page = document.querySelector("#page");
const outName = document.querySelector("#out-name");
const outName2 = document.querySelector("#out-name-2");
const outEmail = document.querySelector("#out-email");
const outGh = document.querySelector("#out-gh");
const outAvatar = document.querySelector("#out-avatar");
const ticketNum = document.querySelector("#ticket-number");
const formContainer = document.querySelector(".form-container");
const successContainer =document.querySelector(".success-container");
const imgPreview = document.querySelector("#image-preview");

const media = window.matchMedia("(max-width: 600px)");
const header = document.querySelector("h1");
const sub = document.querySelector("p");
const sub2 = document.querySelector(".sub2-text");

imgPreview.addEventListener("click", () => {
  avatarIn.click();
});

avatarIn.addEventListener("change", () => {
  const file = avatarIn.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.src = e.target.result;
      outAvatar.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});


avatarIn.addEventListener("change", () => {
  const file = avatarIn.files[0];
  if (file && file.size > 500 * 1024) {
    fileError.classList.add("active");
    dropArea.classList.add("invalid");
    info2.classList.add("invalid");
  } else {
    fileError.classList.remove("active");
    dropArea.classList.remove("invalid");
  }
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;


  if (!emailIn.checkValidity()) {
    emailError.classList.add("active");
    emailIn.classList.add("invalid");
    isValid = false;
  } else {
    emailError.classList.remove("active");
    emailIn.classList.remove("invalid");
  }


  const file = avatarIn.files[0];
  if (file && file.size > 500 * 1024) {
    fileError.classList.add("active");
    dropArea.classList.add("invalid");
    info2.classList.add("invalid");
    isValid = false;
  }

  if (isValid) {
    e.preventDefault();
    formContainer.classList.add("invalid");
    successContainer.classList.add("valid");
 
    outName.innerHTML = document.querySelector("#name-input").value;
    outEmail.innerHTML = document.querySelector("#email-input").value;
    outGh.innerHTML = ("@" + document.querySelector("#github-input").value);
    outName2.innerHTML = document.querySelector("#name-input").value;
  }
});


["dragenter","dragover","dragleave","drop"].forEach(evt => {
  dropArea.addEventListener(evt, e => {
    e.preventDefault();
    e.stopPropagation();
  });
});
dropArea.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;
  avatarIn.files = files;
  avatarIn.dispatchEvent(new Event("change"));
});

function handleResize(e) {

  if (e.matches) {
    header.innerHTML = "Your Journey to Coding<br/>Conf 2025 Starts Here!";
  } else {
    header.innerHTML = "Your Journey to Coding Conf<br/>2025 Starts Here!";
  }

  if (e.matches) {
    sub.innerHTML = "Secure your spot at next year’s</br>biggest coding conference.";
  } else {
    sub.innerHTML = "Secure your spot at next year’s biggest coding conference.";
  }

  if (e.matches) {
    sub2.innerHTML = "We’ve emailed your ticket to</br> <span id='out-email'></span> and will send</br>updates inthe run up to the event.";
  } else {
    sub2.innerHTML = "We’ve emailed your ticket to</br> <span id='out-email'></span> and will send updates in</br>the run up to the event.";
  }
}

media.addEventListener('change', handleResize);
handleResize(media);