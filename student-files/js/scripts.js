const gallery = document.getElementById("gallery")


//get user data
fetch("https://randomuser.me/api/?results=30")
  .then(response => response.json())
  .then(data => generateCard(data.results))

  //helper function to display data
  function generateCard(data) {
    const cards = data.map(card => `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
</div>)
`);
gallery.innerHTML = cards
  }
  
  
  
  