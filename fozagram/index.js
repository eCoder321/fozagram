let BASE_URL = "http://localhost:3000/"
// let IMAGES = `$`
function init() {
    fetch(BASE_URL+"images").then(res => res.json())
    .then(res => res.forEach(renderImages))
}

function renderImages(image) {
    card = document.querySelector('#image-card')

    imgLi = document.createElement('li')
    img = document.createElement('img')
            img.src = image.src
            img.alt = image.alt
            img.id = image.id
            img.height = 600
            img.width = 400

    imgLi.appendChild(img)
    card.appendChild(imgLi)
}

init()
