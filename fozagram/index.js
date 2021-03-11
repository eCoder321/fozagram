let BASE_URL = "http://localhost:3000/"
let IMAGES = `${BASE_URL}images/`
let COMMENTS = `${BASE_URL}comments/`
let USER = {}
let allImages = []
let feed = document.querySelector('feed')
const CLOUDINARY_URL = 	'https://api.cloudinary.com/v1_1/db2sov2i7/'
const CLOUDINARY_UPLOAD_PRESET = "pbb0q9cd"

//entryway to the app
function init() {
    signIn()
}

//--------USER & SIGN IN---------
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
            uploadImageForm(); fetchInitialImages(); uploadFilterBtns()
        }
        else {
            alert("Your username must be two characters or more");
            form.reset()
        }
    }
}
//-----------END OF USER & SIGN IN-------------

//-----------IMAGES SECTION-----------------
//used to fetch images, reused in the filter section
function fetchImages() {
    document.querySelector('main').hidden = true
    return fetch(BASE_URL+"images").then(res => res.json())
}

//fetches the images the first time and renders them all on the DOM
function fetchInitialImages() {
    likePage = false
    fetchImages()
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
        // likeButton.dataset.likes = image.likes.length
        likeButton.onclick = increaseLikes
    likesDiv.append(likeSpan, likeButton)
    commentsUl = document.createElement('ul')
        commentsUl.className = "commentsUl"
        // commentsUl.id = `comment-${image.id}`
    image.comments.length > 0 ? image.comments.forEach(comment => parseComments(comment, commentsUl)) : noComments()
    let writeCommentBox = writeComment()
    imgCard.append(img, postedBy, likesDiv, commentsUl, writeCommentBox)
    mainCard.appendChild(imgCard)
}

//upload a new image
function uploadImageForm() {
    let imageForm = document.createElement('form')
        imageForm.className = "image-form"
    let imageAlt = document.createElement('input')
        imageAlt.type = 'text'
        imageAlt.name = "alt"
        imageAlt.placeholder = "what are you uploading?"
    let submitImage = document.createElement('button')
        submitImage.type = 'submit'
        submitImage.innerHTML = "Foz an image😜"

let fileInput = document.createElement('input')
    fileInput.id = 'file-upload'
    fileInput.type = 'file'
    // fileInput.style = 'display:none'
    fileInput.innerHTML = "Select an Image"


imageForm.append(fileInput, imageAlt, submitImage)
document.body.prepend(imageForm)

imageForm.addEventListener('submit', function(event) {
        event.preventDefault()
        let file = event.target[0].files[0]
        let formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    
        axios({
            url: CLOUDINARY_URL+"upload",
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(function(res) {
            console.log(res)
            let imageSrc = res.data.secure_url
            altText = event.target.alt.value
            // send the URL, send the user id, and send alt to handleImage
            handleImage(imageSrc, altText)
            document.querySelector('.image-form').reset()
        }).catch(function(err) {
            alert(err)
        })
    })
}

//handles uploading new images on the backend
// function handleImage(e) {
//     e.preventDefault()
//     let form = e.target
//     let image = {
//         user_id: USER.id,
//         src: form.image.value,
//         alt: form.alt.value
//     }

//     let request = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(image)
//     }

//     fetch(IMAGES, request).then(res => res.json())
//     .then(renderImages)
function handleImage(imageSrc, altText) {
    let image = {
        user_id: USER.id,
        src: imageSrc,
        alt: altText //form.alt.value
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
//------------END OF IMAGES SECTION------------

//---------------LIKES SECTION-------------
//changes the likebutton className based on whether the user likes it or not
function likeColorChanger(likes, likeButton) {
    if (likes.map(e => e.user_id).includes(USER.id)) {
        likeButton.className = "likedHeart";
    }
    else {
        likeButton.className = "likeButton"
        if (likePage) {
            document.getElementById(likeButton.dataset.id).style.display = "none"
        }
    }
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
        e.target.dataset.likes = updatedImage.likes
        document.getElementById(`image-${updatedImage.id}`).innerText = `${updatedImage.likes.length} likes`
        likeColorChanger(updatedImage.likes, button)
    })
}

//------------ END OF LIKES SECTION--------------

//------------------COMMENTS SECTION---------------
//parses all comments and appends it to the commentsUl
const parseComments = (comment, commentsUl) => {
        let li = document.createElement('li')
            li.id = `comment-${comment.id}`
            li.className = "commentLi"
            li.innerHTML = `${comment.user.username}: `
        let commentDiv = document.createElement('div')
            commentDiv.innerHTML = `${comment.content}`
            commentDiv.ondblclick = editComment
            li.append(commentDiv)
        if (USER.id === comment.user_id) {
            let delButton = document.createElement('button')
                delButton.className = "delButton"
                delButton.onclick = deleteComment
                li.append(delButton)
        }
            //li.append(commentDiv, delButton)
        commentsUl.appendChild(li)
    }

// informs users that there's no comment yet
const noComments = () => {
    let li = document.createElement('li')
        li.innerText = "This post has no comments, yet"
    commentsUl.appendChild(li)
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
    .then(comment => {
        let commentsUl = document.getElementById(comment.image_id).querySelector('ul')
        if (commentsUl.innerText.trim() == "This post has no comments, yet") {
            commentsUl.innerHTML = ""
        }
        parseComments(comment, commentsUl)
    })

    form.reset()
}

//edits a comment ONLY OWNER ALLOWED
function editComment(e) {
    let li = e.target.parentElement
    commentEvent = e //needed so i can access it in the callTest
    let comment = e.target
    if (li.innerHTML.split(':')[0] === USER.username) {
        comment.contentEditable = true
        // li.addEventListener('keyup', e => { 
        //     if (e.key === "Enter") {
        //         updateComment(e)
        //     }
        //  })
        

        document.addEventListener('click', callTest)          
    }
}
//handles calling test comment with the right parameters so we can remove event listener
function callTest(clickEvent) {
    testComment(clickEvent, commentEvent)
    // testComment(clickEvent)
}

//test the comment
function testComment(clickEvent, commentEvent) {
    let commentDiv = commentEvent.target
    let liList = document.querySelectorAll('li')
    let yeah = false
    liList.forEach(li => {
        if ((clickEvent.target === commentDiv)) {
            yeah = true
        }
    })
    
    if (!yeah) {
        updateComment(commentEvent)
    }
    
}

//updates the comment on the backend
function updateComment(e) {
    let li = e.target.parentElement
    let num = li.id.split("-")[1]
    let newComment = {
        content: commentEvent.target.innerText //li.innerText.replace(/\r?\n|\r/g, "").replace(`${USER.username}:`, "").trim()
    }

    let request = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "appllication/json"
        },
        method: "PATCH",
        body: JSON.stringify(newComment)
    }
    // debugger

    fetch(COMMENTS+num, request).then(res => res.json())
    .then(res => {document.removeEventListener('click', callTest); document.getElementById(`comment-${res.id}`).querySelector('div').contentEditable = false})
    .catch(error => alert(error.message))
}

//handles deleting a comment
function deleteComment(e) {
    let li = e.target.parentElement
    let num = li.id.split('-')[1]
    let request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    // debugger
    fetch(COMMENTS+num, request).then(res => res.json())
    .then(res => {li.remove()})
}
//-------------- END OF COMMENTS-----------------

//------------FILTERS-------------
//uploads the filter buttons
function uploadFilterBtns() {
    let filterLikeButton = document.createElement('button')
        filterLikeButton.innerHTML = "Liked images"
        filterLikeButton.onclick = filterLikedImages

    let filterAllButton = document.createElement('button')
        filterAllButton.innerHTML = "All Images"
        filterAllButton.onclick = filterAllImages

    let filterMyImagesButton = document.createElement('button')
        filterMyImagesButton.innerHTML = "My Images"
        filterMyImagesButton.onclick = filterMyImages 

    document.body.prepend(filterLikeButton, filterAllButton, filterMyImagesButton)
}

//puts only USER-liked images on the DOM
function filterLikedImages() {
    likePage = true // used to determine when unliking an image sohuld remove it from the screen 
    fetchImages().then(res => {
        let likedImageArray = res.filter(image => {
            let imageLikesId = image.likes.map(like => like.user_id)
            return imageLikesId.includes(USER.id)
        })
        feed.innerHTML = ""
        likedImageArray.forEach(renderImages)
    })  
    //was running the last .then() without the .then() and had a little bug that's now fixed
}

//puts all images back on screen
function filterAllImages(e) {
    likePage = false
    feed.innerHTML = ""
    fetchInitialImages()
}

//puts images posted by user on screen
function filterMyImages(e) {
    likePage = false
    fetchImages().then(res => {
        let myImages = res.filter(image => {
            return image.user_id == USER.id
        })
        feed.innerHTML = ""
        myImages.forEach(renderImages)
    })
}
//-----------END OF FILTERS--------------

//------------SORTING----------

//---------END OF SORTING--------

init()
