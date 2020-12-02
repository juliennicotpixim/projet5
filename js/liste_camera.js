(async function(){

  let allCameras = await XHRFetch('http://localhost:3000/api/cameras')      // fonction XHRFetch qui range toutes les caméras dans la variable allCameras

  for (let i = 0; i < allCameras.length; i++) {     // pour chaque caméra

    // création de la div colonne
      let element = document.getElementById('grille')                               // selection de l'élément grille
      let div = document.createElement("div")                                       // création d'une div
      div.id = "colonne-camera-" + allCameras[i]._id                                // création de l'id colonne (correspondant à l'id caméra)
      div.classList.add("col-12", "col-md-6", "col-sm-12", "pl-3", "pr-3")          // ajout des classes à la div
      element.appendChild(div)                                                      // ajout de la div dans le DOM

    // création de la div carte
        element = document.getElementById("colonne-camera-" + allCameras[i]._id)    // selection de l'élément colonne(id caméra)
        div = document.createElement("div")                                         // création d'une div
        div.id = "carte-camera-" + allCameras[i]._id                                // création de l'id carte (correspondant à l'id caméra)
        div.classList.add("card", "mb-4", "w-auto")                                 // ajout des classes à la div
        element.appendChild(div)                                                    // ajout de la div dans le DOM

    // ajout de l'image dans la carte
        element = document.getElementById("carte-camera-" + allCameras[i]._id)      // selection de l'élément carte(id caméra)
        let img = document.createElement("img")                                     // création d'une img
        img.src = allCameras[i].imageUrl                                            // ajout de la source (url) de l'image
        img.classList.add("card-img-top")                                           // ajout des classes à l'image
        element.appendChild(img)                                                    // ajout de la div dans le DOM

    // création de la div card-body
        element = document.getElementById("carte-camera-" + allCameras[i]._id)      // le reste des élements ne sont pas commenté car similaire aux précedents
        div = document.createElement("div")
        div.id = "carte-body-camera-" + allCameras[i]._id
        div.classList.add("card-body")
        element.appendChild(div)

    // ajout du titre dans le body de la carte
        element = document.getElementById("carte-body-camera-" + allCameras[i]._id)
        let title = document.createElement("h5")
        title.textContent = allCameras[i].name
        title.classList.add("card-title")
        element.appendChild(title)

    // ajout de la description dans le body de la carte
        element = document.getElementById("carte-body-camera-" + allCameras[i]._id)
        let description = document.createElement("p")
        description.textContent = allCameras[i].description
        description.classList.add("card-texte")
        element.appendChild(description)

    // ajout du lien dans le body de la carte
        element = document.getElementById("carte-body-camera-" + allCameras[i]._id)
        let link = document.createElement("a")
        link.textContent = "Voir la description"
        link.href = "page/camera.html" + "?_id=" + allCameras[i]._id
        link.classList.add("btn", "btn-primary")
        element.appendChild(link)
  }

})();