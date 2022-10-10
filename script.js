const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



//  Unsplash API
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=ValEBSHfQaXof0SLjgvWXB7OZ0ulWD2D4z1mY00ALdw&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

    }
}

//  Helper Functions to set attributes on DOM Elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Display photos
const displayPhotos = () => {
    totalImages = photosArray.length;
    imagesLoaded = 0;

    // Run functions for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash in new tab/window
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // create <img> 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);

        // img.setAttribute('alt', photo.location.name);
        // img.setAttribute('title', photo.location.name);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.location.name,
            title: photo.location.name
        });
        // Event listener, check when each in finished loading
        img.addEventListener('load', imageLoaded);
        // Put img inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);


    });
}
// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos();
    } catch (err) {
        // Cath error here
    }
}

// if scrolling near bottom of page, LOADmore pohotos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
})

//On load
getPhotos();