(async function(){

  let parameters = extractUrlParams()   // utilisation de la fonction qui range les paramètre d'url dans un tableau

  let camera = await XHRFetch('http://localhost:3000/api/cameras/' + parameters._id)    // appel de la fonction XHRFetch qui range la camera avec l'id dans la variable camera

  // Mise à jour de l'image de la caméra
  let element = document.querySelector('#camera-image')
  element.src = camera.imageUrl

  // Mise à jour du nom de la caméra
  element = document.querySelector('#camera-name')
  element.textContent = camera.name

  // Mise à jour de la description de la caméra
  element = document.querySelector('#camera-description')
  element.textContent = camera.description

  // Création des options de la caméra
  for (let i = 0; i < camera.lenses.length; i++) {    // pour chaque option on créé et on ajoute l'option dans la liste

    let lenses = document.getElementById("camera-lenses")
    let lense = document.createElement("option")
    lense.value = i
    lense.textContent = camera.lenses[i]
    lenses.appendChild(lense)
  }

  // Mise à jour du prix de la caméra
  element = document.querySelector('#camera-price')
  element.textContent = camera.price

  // Analyse du LocalStorage (voir store.js)
  const store = new Store()

  // SI l'id de la caméra n'est pas déjà dans le localStorage
  if (store.cart.indexOf(parameters._id) == -1) {
    const ButtonAddToBasket = document.querySelector('#ButtonAddToBasket')      // selection du bouton "Ajouter au panier"
    ButtonAddToBasket.addEventListener('click', function() {                    // ajout d'un event listener au click sur le bouton
      store.addItemToCart(parameters._id)                                       // ajout de l'id de la caméra au localStorage
      element = document.querySelector('#ButtonAddToBasket')                    // selection du bouton "Ajouter au panier"
      element.classList.remove('btn-primary')                                   // selection du bouton "Ajouter au panier"
      element.classList.add('btn-success')                                      // changement de la couleur du bouton
      supp_childs(element)                                                      // suppression du contenu du bouton
      let success = document.createElement("img")                               // création d'une image dans le bouton
      success.src = "../img/success.png"                                        // ajout de la source de l'image
      success.width = "35"                                                      // ajout d'une largeur fixe de 35px
      element.appendChild(success)                                              // ajout dans le DOM
    }, {once : true});
  }

  // SINON si l'id de la caméra est déjà dans le localStorage (modification du bouton)
  else {      
    element = document.querySelector('#ButtonAddToBasket')                    // selection du bouton "Ajouter au panier"
    element.classList.remove('btn-primary')                                   // selection du bouton "Ajouter au panier"
    element.classList.add('btn-success')                                      // changement de la couleur du bouton
    supp_childs(element)                                                      // suppression du contenu du bouton
    let success = document.createElement("img")                               // création d'une image dans le bouton
    success.src = "../img/success.png"                                        // ajout de la source de l'image
    success.width = "35"                                                      // ajout d'une largeur fixe de 35px
    element.appendChild(success)                                              // ajout dans le DOM
  }
})();