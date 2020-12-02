(async function(){

  let parameters = extractUrlParams()   // utilisation de la fonction qui range les paramètre d'url dans un tableau

  window.addEventListener("DOMContentLoaded", (event) => {    // attente du chargement du DOM pour faire patienter l'execution du code
    
    // Création des éléments et ajout dans le DOM du prix total et de l'orderId
    let element = document.querySelector("#container")
    let div = document.createElement("div")
    div.classList.add("h3","text-center","mt-5")
    div.textContent = "Nous vous remercions pour votre commande."
    element.appendChild(div)

    element = document.querySelector("#container")
    div = document.createElement("div")
    div.classList.add("h3","text-center","mt-4")
    div.textContent = "Numéro de la commande : " + parameters.orderId
    element.appendChild(div)

    element = document.querySelector("#container")
    div = document.createElement("div")
    div.classList.add("h3","text-center","mt-4","mb-4")
    div.textContent = "Prix total de la commande : " + parameters.price + " €"
    element.appendChild(div)
  });
  
})();