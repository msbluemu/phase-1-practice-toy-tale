let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById('toy-collection');
  const addToyForm = document.querySelector('.add-toy-form');

  toyCollection.addEventListener("click", (event) => {
    if(event.target.className === 'like-btn'){
      let noOfLikes = event.target.parentNode.querySelector(".likes");

      fetch('http://localhost:3000/toys/'+event.target.id, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: parseInt(noOfLikes.dataset.likes)+1})
      })
      .then(response => response.json())
      .then(json => {
        noOfLikes.innerHTML = `${json.likes} likes`;;
        noOfLikes.dataset.likes = json.likes;
      })
    }
  })

  addToyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let toyData = {
       name: addToyForm.name.value,
       image: addToyForm.image.value,
       likes: 0
    }

    let config = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    }
     fetch('http://localhost:3000/toys', config)
      .then((response) => response.json())
      .then((json) => {
        renderToyCard(json)
      })
  })

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((json) =>{
    json.map((toy)=> {
      renderToyCard(toy)
    })
  });

  function renderToyCard(toy){
    let toyCard = document.createElement('div');
      toyCard.classList.add('card');
  
      toyCard.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p><span class="likes" data-likes="${toy.likes}">${toy.likes} likes</span></p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
      `
        toyCollection.appendChild(toyCard);
  }
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

