const gallery = document.getElementById("gallery")


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
  
  
  
  