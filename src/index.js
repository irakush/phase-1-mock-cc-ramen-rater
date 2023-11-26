// write your code here

//Ramen Menu
const ramenMenu = document.querySelector('div#ramen-menu')

// Ramen Details
const ramenImage = document.querySelector('div#ramen-detail img.detail-image')
const ramenName = document.querySelector('div#ramen-detail h2.name')
const ramenRestaurant = document.querySelector('div#ramen-detail h3.restaurant')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')

// New Ramen Form
const ramenForm = document.getElementById('new-ramen')

const newRamenName = document.querySelector('#new-name')
const newRamenRestaurant = document.querySelector('#new-restaurant')
const newRamenImage = document.querySelector('#new-image')
const newRamenRating = document.querySelector('#new-rating')
const newRamenComment = document.querySelector('#new-comment')

// Initialize single Ramen Object
let singlRamenObject
let allRamenObjects

// Update Ramen Form
const updateRamenForm = document.querySelector('#edit-ramen')
const updateRamenRating = document.querySelector('#new-rating')
const updateRamenComment = document.querySelector('#new-comment')

// url
const url = "http://localhost:3000/ramens"
//fetch GET
fetch(url)
  .then(res => res.json())
  .then(ramenData => {
  console.log(ramenData)

  allRamenObjects = ramenData
  
  ramenData.map(eachRamen => {
    displayImageMenu(eachRamen)
  })
  renderRamenDetail(ramenData[0])
  addNewRamen()
  updateRamenRatingAndComment()
})

//rendering functions
function displayImageMenu(ramen){
  const divElement = document.createElement('div')

  const image = document.createElement("img")
  image.src = ramen.image
  image.addEventListener("click", () => {
    renderRamenDetail(ramen)
  })

  const delButton = document.createElement('button')
  delButton.textContent = 'Delete Ramen'
  delButton.addEventListener('click', () => {
    deleteRamenFromMenu(ramen)
  })

  divElement.appendChild(image)
  divElement.appendChild(delButton)
  ramenMenu.appendChild(divElement)
}

//show details
const renderRamenDetail = (ramen) => {
  singlRamenObject = ramen

  ramenImage.src = ramen.image
  ramenName.textContent = ramen.name
  ramenRestaurant.textContent = ramen.restaurant

  ramenRating.textContent = ramen.rating
  ramenComment.textContent = ramen.comment
}

const addNewRamen = () => {
  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(e)

    // From event
      // 'name': e.target["new-name"].value,
      // 'restaurant': e.target["new-restaurant"].value,
      // 'image': e.target["new-image"].value,
      // 'rating': Number(e.target["new-rating"].value),
      // 'comment': e.target["new-comment"].value

    // From HTML INPUT elements
      // 'name': newRamenName.value,
      // 'restaurant': newRamenRestaurant.value,
      // 'image': newRamenImage.value,
      // 'rating': Number(newRamenRating.value),
      // 'comment': newRamenComment.value
    
    const newRamenData = {
      'name': e.target["new-name"].value,
      'restaurant': e.target["new-restaurant"].value,
      'image': e.target["new-image"].value,
      'rating': isNaN(Number(e.target["new-rating"].value)) ? 0 : Number(e.target["new-rating"].value),
      'comment': e.target["new-comment"].value
    }

    fetch('http://localhost:3000/ramens', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newRamenData)
    })
    .then(res => {
      if (res.ok) {
        res.json().then(newRamen => {
          allRamenObjects.push(newRamen)
          updateRamenMenu()
          // displayImageMenu(newRamenData)
        })
      } else {
        alert('Ramen was not saved!')
      }
    })

    ramenForm.reset()
  })
}

const updateRamenRatingAndComment = () => {
  updateRamenForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target["new-rating"].value)
    // console.log(e.target["new-comment"].value)

    ramenRating.textContent = e.target["new-rating"].value
    ramenComment.textContent = e.target["new-comment"].value

    singlRamenObject.rating = Number(e.target["new-rating"].value)
    singlRamenObject.comment = e.target["new-comment"].value

    allRamenObjects = allRamenObjects.map(ramen => {

      if(ramen.id === singlRamenObject.id) {
        console.log("singlRamenObject: ", singlRamenObject)
        return singlRamenObject
      } else {
        return ramen
      }
    })

    console.log('after update: ', allRamenObjects)

    updateRamenMenu()

  })
}

const updateRamenMenu = () => {
  console.log('updated')
  // console.log(allRamenObjects)
  ramenMenu.innerHTML = ""
  allRamenObjects.forEach(ramen => {
    displayImageMenu(ramen)
  })
}


const deleteRamenFromMenu = (ramen) => {
  allRamenObjects = allRamenObjects.filter(r => {

    console.log('r.id ', r.id)
    console.log('ramen.id ', ramen.id)

    return r.id != ramen.id
  })
  updateRamenMenu()
}