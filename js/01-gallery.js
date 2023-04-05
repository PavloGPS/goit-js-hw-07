import { galleryItems } from "./gallery-items.js";
// Change code below this line
// console.log(galleryItems);

const galleryEl = document.querySelector("ul.gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.addEventListener("click", onGalleryElClick);
galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function onGalleryElClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src="${evt.target.dataset["source"]}" width="800" height="600">
  `,
    {
      onShow: (instance) => {
        galleryEl.addEventListener("keydown", onEscKeydown);
      },
      onClose: (instance) => {
        galleryEl.removeEventListener("keydown", onEscKeydown);
        // console.log("closed and removed event listener from Esc");
      },
    }
  );
  instance.show();
  function onEscKeydown(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}
