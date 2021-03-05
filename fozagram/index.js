let BASE_URL = "http://localhost:3000/"
let IMAGES = `${BASE_URL}images/`

//entryway to the app
function init() {
    signIn()
    .then(fetchCall())
    //CLEAR THE DOM
    
}

//fetches the data 
function fetchCall() {
    document.body.main.innerHTML = ""
    fetch(BASE_URL+"images").then(res => res.json())
    .then(res => res.forEach(renderImages))
}

//for signing in
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
    signInForm.onsubmit = getUser
}

//gets the user from the backend
function getUser(e) {
    e.preventDefault()
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
    .then(user => {user = {id, username}})
    return user
    // console.log(e.target.username.value)
}

//puts the image on the DOM
function renderImages(image) {
    let mainCard = document.querySelector('#images')
    let imgCard = document.createElement('div')
        imgCard.className = "imageDiv"
    let img = document.createElement('img')
            img.src = image.src
            img.alt = image.alt
            img.id = image.id
            checkPhoto(img)
    let postedBy = document.createElement('p')
        postedBy.innerHTML = `Posted by: ${image.user.username}`
    let likesDiv = document.createElement('div')
    let likeSpan = document.createElement('span')
        likeSpan.innerHTML = `${image.likes.length} likes`
    let likeButton = document.createElement('button')
        likeButton.innerText = "❤️"
    likesDiv.append(likeSpan, likeButton)
    commentsUl = document.createElement('ul')
    image.comments.length > 0 ? parseComments(image.comments) : noComments()
    imgCard.append(img, postedBy, likesDiv, commentsUl)
    mainCard.appendChild(imgCard)
}

//dynamically sets the orientation of photo
function checkPhoto(img) {
    img.onload = function() {
        if (this.width > this.height) {
            img.width = 600;
            img.height = 400;
        }
        else {
            img.width = 400;
            img.height = 600;
        } 
    }
}

//parses all comments and appends it to the commentsUl
const parseComments = comments => {
    comments.forEach(comment => {
        let li = document.createElement('li')
        li.innerHTML = comment.content
        commentsUl.appendChild(li)
    })
}

// informs users that there's no comment yet
const noComments = () => {
    let li = document.createElement('li')
        li.innerHTML = "This post has no comments, yet"
    commentsUl.appendChild(li)
}

init()
