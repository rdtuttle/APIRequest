const gallery = document.getElementById("gallery")
const card = document.querySelector(".card")
let galleryInfo = []


//get user data
fetch("https://randomuser.me/api/?results=12&nat=us")
    .then(response => response.json())
    .then(data => {
        galleryInfo = data
        generateCard(data.results)
    })
    .catch(error => console.log(error))

//helper function to display data
function generateCard(data) {
    const cards = data.map((card, index) => `
    <div onclick = 'cardClick(event)' class="card" id = '${index}'>
    <div class="card-img-container">
        <img class="card-img" src=${card.picture.thumbnail} alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${card.name.first} ${card.name.last}</h3>
        <p class="card-text">${card.email}</p>
        <p class="card-text cap">${card.location.city}, ${card.location.state}</p>
    </div>
</div>
`)
        .join("");
    gallery.insertAdjacentHTML("beforeend", cards)
}



//display modal
const body = document.querySelector("body")

function generateModal(index) {
    const galleryIndex = galleryInfo.results[index]
    const modal =
        `
<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src=${galleryIndex.picture.medium} alt="profile picture">
        <h3 id="name" class="modal-name cap">${galleryIndex.name.first}${galleryIndex.name.last}</h3>
        <p class="modal-text">${galleryIndex.email}</p>
        <p class="modal-text cap">${galleryIndex.location.city}</p>
        <hr>
        <p class="modal-text">${galleryIndex.phone}</p>
        <p class="modal-text">${galleryIndex.location.street.number} ${galleryIndex.location.street.name}, ${galleryIndex.location.city}, ${galleryIndex.location.state} ${galleryIndex.location.postcode}</p>
        <p class="modal-text">Birthday: ${galleryIndex.dob.date}</p>
    </div>

</div>
    
`
    //Add the modal HTML inside of body.
    body.insertAdjacentHTML('beforeend', modal);


    //add left and right modal buttons
    if(index > 0) document.querySelector('.modal').innerHTML += `<button onclick = "previous()" class = 'button' id = 'leftButton'>Previous</button>`
    if(index < 11) document.querySelector('.modal').innerHTML += `<button onclick = 'next()' class = 'button' id = 'rightButton'>Next</button>`

    //listener to close modal button
    const closeButton = document.getElementById("modal-close-btn")
    const modalcontainer = document.querySelector('.modal-container')
    closeButton.addEventListener("click", () => {
        globalIndex = 0
        modalcontainer.remove();
    })

}
//functions to change modals on click
function next(){
    globalIndex++
    document.querySelector('.modal-container').remove()
    generateModal(globalIndex)
}

function previous(){
    globalIndex--
    document.querySelector('.modal-container').remove()
    generateModal(globalIndex)
}


let globalIndex = 0
function cardClick(event){
    index = parseInt(event.currentTarget.id)
    globalIndex = index
    generateModal(index);
};