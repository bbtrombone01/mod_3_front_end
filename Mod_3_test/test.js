const info = "http://localhost:3000/posts"
const editParagraph = document.querySelector("p")
const newformpost = document.getElementById("new_post")
const commentSection = document.getElementById("comments")
let button = document.querySelector("button")


function StepOne(info){
    fetch(info)
.then(res => res.json())
.then(json => {json.forEach(element => showpost(element))})


function showpost(json){
    order = document.getElementById("list")
        list = document.createElement("li")
        list.className = "clickable"
        list.id = json["id"]
        list.innerText = json["title"]
        order.appendChild(list)
        list.addEventListener("click",function(){
            getPost(json) 
        })

}

function getPost(element){
    newTitle = document.querySelector('h1')
    form = document.createElement("form")
    newTitle.appendChild(form)
    newParagraph = document.querySelector('p')
    newTitle.innerText = element.title
    newParagraph.innerText = element.text
    deleteButton = document.createElement("button")
    editButton = document.createElement("button") 
    newParagraph.appendChild(editButton)
    newParagraph.appendChild(deleteButton)
    editButton.innerText = "edit"
    deleteButton.innerText = "delete"
    // debugger
    editButton.addEventListener("click", function(){
        editPostForm(element)
    })
    deleteButton.addEventListener("click",function(){
        deletePost(element)
    })
    if (commentSection.innerText > "" ){
        commentSection.innerText = ""
    } 
    getComment(element["id"])
    inputbutton = document.createElement("input")
    textbutton= document.createElement("input")
    addComments = document.getElementById("new comments")
    addComments.appendChild(textbutton)
    addComments.appendChild(inputbutton)
    inputbutton.type ="submit"
    addComments.addEventListener("submit",(event) => newComments(event,element))
    // debugger
}

newformpost.addEventListener('submit', function(event){
    event.preventDefault()
    let post ={
        title: event.target[0].value,
        text: event.target[1].value,
    }
    postPost(post)
})

function postPost(post){
    // debugger
    fetch("http://localhost:3000/posts",{
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },

    body: JSON.stringify(post),
    
  })
  .then(res => res.json())
  .then(json => {showpost(json)})
}
function getComment(id){
    fetch(`http://localhost:3000/comments/${id}`)
    .then(res => res.json())
    .then(json => {json.forEach(element => postComment(element))})
}

function postComment(element){
    // debugger
    list = document.createElement("li")
    list.innerText = element["comments"]
    commentSection.appendChild(list)
    list.id = element["id"]
    newForm = document.createElement("form")
    list.appendChild(newForm)
    inputbutton = document.createElement("input")
    textbutton= document.createElement("input")
    newForm.appendChild(textbutton)
    newForm.appendChild(inputbutton)
    textbutton.type = "text"
    inputbutton.type = "submit"
    newForm.addEventListener("submit", (event)=> patchComment(event,element))
    // debugger
}

function patchComment(event,element){
    console.log("this")
    // debugger
    let data = {
        comments: event.target[0].value
    }
    fetch(`http://localhost:3000/comments/${element["id"]}`,{
        method: "PATCH",
        headers: {
           'Content-Type': 'application/json' 
        },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
.then(json => { console.log(json)})
}

function editPostForm (element){
    newForm = document.createElement("form")
    editParagraph.appendChild(newForm)
    inputbutton = document.createElement("input")
    textbutton= document.createElement("input")
    newForm.appendChild(textbutton)
    newForm.appendChild(inputbutton)
    textbutton.type = "text"
    inputbutton.type = "submit"
    // debugger
    newForm.addEventListener("submit", (event)=> patchFunction(event,element))
}

function deletePost(element){
    clearList = document.getElementById("list")
    clearList.innerText = ""
    fetch(`http://localhost:3000/posts/${element["id"]}`,{
        method: `DELETE`
    })
    .then(res => res.json())
    .then(json => StepOne(info))
    // debugger
}
}
StepOne(info)


function patchFunction(event, element){
    // debugger
    let data = {
        title: element["title"],
        text: event.target[0].value
    }
    event.preventDefault()

    fetch(`http://localhost:3000/posts/${element["id"]}`,{
        method: "PATCH",
        headers: {
           'Content-Type': 'application/json' 
        },
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(json => {
    newp = document.getElementById("text")
    newp.innerText = json["text"]
   
})

}

function newComments(event,element){
    // debugger
        event.preventDefault()
        comments = {
            post_id: element["id"],
            comments: event.target[0].value

        }
        postComment(comments)
    
}

function postComment(comments){
    // debugger
    fetch(`http://localhost:3000/comments`,{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
    
        body: JSON.stringify(comments),
        
      })
      .then(res => res.json())
      .then(json => {
        //   debugger
          commentForm = document.getElementById("comments")
          maknewLi = document.createElement("li")
          commentForm.appendChild(maknewLi)
          maknewLi.innerText = json["comments"]
      })
}