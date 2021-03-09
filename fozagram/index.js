// import { func } from "prop-types"

let BASE_URL = "http://localhost:3000/"
let IMAGES = `${BASE_URL}images/`
let USER = {}

// import {logHi } from './cloudinary.js'

//entryway to the app
function init() {
    signIn()
}

//for getting the userName
function signIn() {
    let main = document.createElement('main')
    let h2 = document.createElement('h2')
        h2.innerHTML = "Welcome to Fozagram!"
    let h3 = document.createElement('h3')
        h3.innerHTML = "The best place on the interwebs for sharing your pics 📸"
    let signInForm = document.createElement('form')
    let usernameBox = document.createElement('input')
        usernameBox.placeholder = "Set your username"
        usernameBox.name = "username"
    let submit = document.createElement('button')
        submit.innerHTML = "Submit"
        submit.type = "submit"
    signInForm.append(usernameBox, submit)
    main.append(h2, h3, signInForm)
    document.body.appendChild(main)
    signInForm.onsubmit = function(event) { getUser(event)}
}

//gets the user from the backend
function getUser(e) {
    e.preventDefault()
    let form = e.target
    let username = e.target.username.value
    let user = {
        username: username
    }
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }
    
    fetch(BASE_URL+ "users/get_user", request).then(res => res.json())
    .then(res => {USER = {id: res.id, username: res.username}; ifElse()})
    function ifElse() {
        if (USER.id != null) {
            uploadImageForm(); fetchImages()
        }
        else {
            window.alert("Your username must be two characters or more");
            form.reset()
        }
    }
}

//fetches the images 
function fetchImages() {
    document.querySelector('main').hidden = true
    fetch(BASE_URL+"images").then(res => res.json())
    .then(res => res.forEach(renderImages))
    .catch(error => console.log(error.message))
}

//puts the image on the DOM
function renderImages(image) {
    let mainCard = document.querySelector('#images')
    let imgCard = document.createElement('div')
        imgCard.className = "imageDiv"
        imgCard.id = image.id
    let img = document.createElement('img')
            img.src = image.src
            img.alt = image.alt
            img.title = image.alt
            img.className = 'img'
            // img.id = image.id
            // checkPhoto(img)
    let postedBy = document.createElement('p')
        postedBy.className = 'postedBy'
        postedBy.innerHTML = `Posted by: ${image.user.username}`
    let likesDiv = document.createElement('div')
        likesDiv.className = 'likesDiv'
    let likeSpan = document.createElement('span')
        likeSpan.id = `image-${image.id}`
        likeSpan.innerHTML = `${image.likes.length} likes`
    let likeButton = document.createElement('button')
        likeButton.className = "likeButton"
        likeColorChanger(image.likes, likeButton)
        likeButton.innerText = "♥︎"
        likeButton.dataset.id = image.id
        likeButton.dataset.likes = image.likes.length
        likeButton.onclick = increaseLikes
    likesDiv.append(likeSpan, likeButton)
    commentsUl = document.createElement('ul')
        commentsUl.className = "commentsUl"
        // commentsUl.id = `comment-${image.id}`
    image.comments.length > 0 ? image.comments.forEach(parseComments) : noComments()
    let writeCommentBox = writeComment()
    imgCard.append(img, postedBy, likesDiv, commentsUl, writeCommentBox)
    mainCard.appendChild(imgCard)
}

//changes the likebutton className
function likeColorChanger(likes, likeButton) {
    if (likes.map(e => e.user_id).includes(USER.id)) {
        likeButton.className = "likedHeart";
    }
    else {
        likeButton.className = "likeButton"
    }
}

//dynamically sets the orientation of photo
// function checkPhoto(img) {
//     img.onload = function() {
//         if (this.width > this.height) {
//             img.width = 600;
//             img.height = 400;
//             img.className = 'landscape'
//         }
//         else {
//             img.width = 400;
//             img.height = 600;
//         } 
//     }
// }

//parses all comments and appends it to the commentsUl
const parseComments = comment => {
        let li = document.createElement('li')
        li.innerHTML = `${comment.user.username}: ${comment.content}`
        commentsUl.appendChild(li)
    }

// informs users that there's no comment yet
const noComments = () => {
    let li = document.createElement('li')
        li.innerHTML = "This post has no comments, yet"
    commentsUl.appendChild(li)
}

//increases the likeCount
function increaseLikes(e) {
    let button = e.target
    const newLikes = {
        user_id: USER.id,
        image_id: button.dataset.id
    }

    const reqObj = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(newLikes)
      }
    
    fetch(BASE_URL+`likes`, reqObj)
    .then(r => r.json())
    .then(updatedImage => {
        // debugger
        e.target.dataset.likes = updatedImage.likes
        document.getElementById(`image-${updatedImage.id}`).innerText = `${updatedImage.likes.length} likes`
        likeColorChanger(updatedImage.likes, button)
    })
}

//add a new comment
function writeComment() {
    let commentForm = document.createElement('form')
        commentForm.className = 'commentForm'
    let commentArea = document.createElement('input')
        commentArea.type = 'text'
        commentArea.name = "comment"
        commentArea.placeholder = "Enter your comment..."
    let submitComment = document.createElement('button')
        submitComment.type = 'submit'
        submitComment.innerHTML = "Foz a Comment"
    commentForm.append(commentArea, submitComment)
    commentForm.onsubmit = handleComment
    return commentForm
}

// handles comment submission
function handleComment(e) {
    e.preventDefault()
    let form = e.target
    let comment = {
        content: form.comment.value,
        user_id: USER.id,
        image_id: form.parentElement.id
    }
    let request ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(comment)
    }

    fetch(BASE_URL+"comments", request).then(res => res.json())
    .then(res => {
        let commentsUl = document.getElementById(res.image_id).querySelector('ul')
        let li = document.createElement('li')
            li.innerHTML = `${res.user.username}: ${res.content}`
        if (commentsUl.innerText == "This post has no comments, yet") {
            commentsUl.innerHTML = ""
        }
        commentsUl.appendChild(li)
    })    

    form.reset()
}

//upload a new image
function uploadImageForm() {
    let imageForm = document.createElement('form')
    let imageSrc = document.createElement('input')
        imageSrc.type = 'text'
        imageSrc.name = "image"
        imageSrc.placeholder = "url to image"
    let imageAlt = document.createElement('input')
        imageAlt.type = 'text'
        imageAlt.name = "alt"
        imageAlt.placeholder = "what are you uploading?"
    let submitImage = document.createElement('button')
        submitImage.type = 'submit'
        submitImage.innerHTML = "Foz an image😜"
    imageForm.append(imageSrc, imageAlt, submitImage)
        imageForm.className = "image-form"
        imageForm.onsubmit = handleImage
    // bottomImageForm.innerHTML = imageForm.innerHTML
    // document.body.append(bottomImageForm)
    document.body.append(imageForm)
}

function handleImage(e) {
    e.preventDefault()
    let form = e.target
    let image = {
        user_id: USER.id,
        src: form.image.value,
        alt: form.alt.value
    }

    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(image)
    }

    fetch(IMAGES, request).then(res => res.json())
    .then(renderImages)
}

init()
