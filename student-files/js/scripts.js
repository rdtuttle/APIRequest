const gallery = document.getElementById("gallery")
const card = document.querySelector(".card")





//get user data
fetch("https://randomuser.me/api/?results=12&?nat=us")
  .then(response => response.json())
  .then(data => generateCard(data.results))
  .catch (error => console.log(error))

  //helper function to display data
  function generateCard(data) {
    const cards = data.map(card => `
    <div class="card">
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

function  generateModal(index) {
const modal = 
`
<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src=${index.picture} alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>;
`
//Add the modal HTML inside of body.
body.insertAdjacentHTML('beforeend', modal);
//listener to close modal button
const closeButton = document.getElementById("modal-close-btn")
const modalcontainer = document.querySelector('.modal-container')
closeButton.addEventListener("click", () => {
  modalcontainer.remove();
})

}
  
gallery.addEventListener("click", generateModal)

