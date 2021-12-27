const gallery = document.getElementById("gallery")
const card = document.querySelector(".card")
const body = document.querySelector("body")
let galleryInfo = []

fetch("https://randomuser.me/api/?results=12&nat=us")
  .then(response => response.json())
  .then(data => {
    galleryInfo = data
    generateCard(data.results)
  })
  .catch(error => alert(error))

//display cards on page
function generateCard(data) {
    const cards = data.map((card, index) => `
    <div onclick = 'cardClick(event)' class="card" id = '${index}'>
    <div class="card-img-container">
        <img class="card-img" src=${card.picture.large} alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${card.name.first} ${card.name.last}</h3>
        <p class="card-text">${card.email}</p>
        <p class="card-text cap">${card.location.city}, ${card.location.state}</p>
    </div>
    </div>
`).join("");
    gallery.insertAdjacentHTML("beforeend", cards)
}

//append modal dynamically to DOM
function generateModal(index) {
  const galleryIndex = galleryInfo.results[index]
  const dob = galleryIndex.dob.date.slice(5,7)
    + "/" + galleryIndex.dob.date.slice(8,10)
    + "/" + galleryIndex.dob.date.slice(0,4)
  const phoneFormat = galleryIndex.phone.slice(0,5)
    + " " + galleryIndex.phone.slice(6,14)
  const modal =
        `
    <div class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src=${galleryIndex.picture.large} alt="profile picture">
        <h3 id="name" class="modal-name cap">${galleryIndex.name.first} ${galleryIndex.name.last}</h3>
        <p class="modal-text">${galleryIndex.email}</p>
        <p class="modal-text cap">${galleryIndex.location.city}</p>
        <hr>
        <p class="modal-text">${phoneFormat}</p>
        <p class="modal-text">${galleryIndex.location.street.number} ${galleryIndex.location.street.name}, ${galleryIndex.location.city}, ${galleryIndex.location.state} ${galleryIndex.location.postcode}</p>
        <p class="modal-text">Birthday: ${dob}</p>
    </div>
    </div>
    `
  body.insertAdjacentHTML('beforeend', modal);

//add left and right toggle buttons for modal
  if(index > 0) document.querySelector('.modal').innerHTML += `<button onclick = "previous()" class = 'button' id = 'leftButton'>Previous</button>`
  if(index < 11) document.querySelector('.modal').innerHTML += `<button onclick = 'next()' class = 'button' id = 'rightButton'>Next</button>`

//add close modal button functionality
  const closeButton = document.getElementById("modal-close-btn")
  const modalcontainer = document.querySelector('.modal-container')
  closeButton.addEventListener("click", () => {
    globalIndex = 0
    modalcontainer.remove();
  })
}

//functions to toggle previous and next modals on click
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

//dynamically add searchbar to DOM
const searchContainer = document.querySelector(".search-container");
const search = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
  `
searchContainer.insertAdjacentHTML("beforeend", search);

//add searchbar functionality
searchContainer.addEventListener("keyup", (e) => {
  searchInput = document.getElementById('search-input').value.toLowerCase();
  for(let i = 0; i < gallery.children.length; i++) {
    let namesToDisplay = gallery.children[i].children[1].children[0].textContent.toLowerCase();
    if(namesToDisplay.includes(searchInput)) {
      gallery.children[i].setAttribute('style', 'display: flex')
    }else if(!(namesToDisplay.includes(searchInput))) {
        gallery.children[i].setAttribute('style', 'display: none')
    }
  }
});


