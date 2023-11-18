"use strict";


const api_key = "P2bJ7ZNARkw15xZTQx4ThbqF3WPD5RWdSs2ca8ET";
const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;

const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", getPod);
const dateInput = document.querySelector("#date-input");

dateInput.addEventListener("change", handleChange);

const articleContainer = document.querySelector(".content");

function handleChange() {
  console.log(dateInput.value);
}

async function getPod(e) {
  let url = baseUrl;
  if (dateInput.value) {
    url += `&date=${dateInput.value}`;
  }
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(`Error: ${response.url}; ${response.statusText}`);
    }
    const data = await response.json();
    addPod(data);
  } catch (err) {
    console.log(err);
  }
}

function addPod(pod) {
    while (articleContainer.hasChildNodes()) {
        articleContainer.removeChild(articleContainer.firstChild);
    }
  console.log(pod);

  const header = document.createElement("h3");
  header.textContent = pod.title;

  const subHeader = document.createElement("h4");
  subHeader.textContent = pod.date;

  const explanation = document.createElement("p");
  explanation.textContent = pod.explanation;

  articleContainer.appendChild(header);
  articleContainer.appendChild(subHeader);
  articleContainer.appendChild(explanation);

  if (pod.media_type === "video") {
    const video = document.createElement("iframe");
    video.src = pod.url;
    video.alt = pod.title;
    articleContainer.appendChild(video);
  } else if (pod.media_type === "image") {
    const photo = document.createElement("img");
    photo.src = pod.url;
    photo.alt = pod.title;
    articleContainer.appendChild(photo);
  }
}
