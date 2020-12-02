(async function(){

    // Analyse du LocalStorage
    const store = new Store()

    let totalPrice = 0      // variable du prix total (affichage sur la page panier)
    let finalPrice = 0      // variable du prix total (affichage sur la page validation)
    
    // Objet qui sera envoyé à l'aide de la méthode POST à l'API
    let order = {
        contact: {      // informations du formulaire (contact)
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            email: ''
        },
        products: []        // tableau contenant les ID des produits du panier (products)
    }

    if (store.cart.length > 0) {        // si le panier contient des produits (n'est pas vide)

        for (let i = 0; i < store.cart.length; i++) {       // pour chaque élément du panier

            let camera = await XHRFetch('http://localhost:3000/api/cameras/' + store.cart[i])      // fonction XHRFetch qui range toutes les infos du produit (avec l'id actuel) dans la variable camera
            
            totalPrice = totalPrice + camera.price      // ajout du prix de l'élément au prix total (initialement 0)
    
            // création de la ligne
            let element = document.getElementById('liste-panier')
            let tr = document.createElement("tr")
            tr.id = "ligne-" + camera._id
            element.appendChild(tr)
    
            // création de la colonne image
            element = document.getElementById("ligne-" + camera._id)
            let td = document.createElement("td")
            td.id = "colonne-image-" + camera._id
            td.classList.add("align-middle","text-center")
            element.appendChild(td)
    
            // création de la balise img
            element = document.getElementById("colonne-image-" + camera._id)
            let img = document.createElement("img")
            img.src = camera.imageUrl
            img.width = "100"
            element.appendChild(img)
    
            // création de la colonne produit
            element = document.getElementById("ligne-" + camera._id)
            td = document.createElement("td")
            td.classList.add("align-middle","text-center")
            td.textContent = camera.name
            element.appendChild(td)
    
            // création de la colonne prix
            element = document.getElementById("ligne-" + camera._id)
            td = document.createElement("td")
            td.classList.add("align-middle","text-center")
            td.textContent = camera.price + " €"
            element.appendChild(td)
    
            // création de la colonne suppression
            element = document.getElementById("ligne-" + camera._id)
            td = document.createElement("td")
            td.id = "colonne-supp-" + camera._id
            td.classList.add("align-middle","text-center")
            element.appendChild(td)
    
            // création du bouton
            element = document.getElementById("colonne-supp-" + camera._id)
            let button = document.createElement("button")
            button.id = "button-supp-" + camera._id
            button.type = "button"
            button.classList.add("btn")
            element.appendChild(button)
    
            // création de la balise img supp (qui sera l'image du bouton)
            element = document.getElementById("button-supp-" + camera._id)
            img = document.createElement("img")
            img.src = "../img/supp.png"
            img.width = "35"
            element.appendChild(img)
    
            //mise à jour du prix total
            element = document.getElementById("prix-total")
            element.textContent = totalPrice
            
            // Event listener qui permet la suppression d'un élément du panier (Affichage + LocalStorage)
            let RemoveFromBasket = document.querySelector("#button-supp-" + camera._id)
            RemoveFromBasket.addEventListener('click', function() {
                store.removeItemFromCart(camera._id)
                element = document.querySelector("#ligne-" + camera._id)
                element.remove()
                totalPrice = totalPrice - camera.price
                element = document.getElementById("prix-total")
                element.textContent = totalPrice
                
                // Si le panier est vide après la suppression d'un élément
                if (store.cart.length == 0) {    
                    
                    // Suppression du formulaire
                    element = document.querySelector("#formulaire")
                    supp_childs(element)
                
                    // On affiche que le panier est vide
                    element = document.querySelector("#empty-basket")
                    let div = document.createElement("div")
                    div.classList.add("h3","text-center","m-5","ml-5")
                    div.textContent = "Votre pannier est vide !"
                    element.appendChild(div)
                }
            }, {once : true}); 
        }

        // Event listener qui permet d'envoyer la commande au serveur
        let submitOrder = document.querySelector("form")
        submitOrder.addEventListener('submit', async function(event) {      // au click sur le bouton "Commander"
            event.preventDefault()                                          // méthode complémentaire qui peut être utilisée pour empêcher l'action par défaut de l'évènement (submit default event)
            event.stopPropagation()                                         // évite que l'évènement courant ne se propage plus loin (submit default event)
           
            // Rangement des champs du formulaire dans l'objet "order" (contact)
            order.contact.lastName = document.getElementById("nom").value
            order.contact.firstName = document.getElementById("prenom").value
            order.contact.address = document.getElementById("adresse").value
            order.contact.city = document.getElementById("ville").value
            order.contact.email = document.getElementById("email").value

            // Pour tous les éléments du panier
            for (let i = 0; i < store.cart.length; i++) {
                order.products.push(store.cart[i])      // on ajoute chaque ID de chaque élément du panier dans l'objet "order" (products)
            }

            // Envoi de l'objet "order" via méthode POST à l'API et récupération de la réponse dans la constante "reponse"
            const reponse = await XHRFetch("http://localhost:3000/api/cameras/order", "POST", order)

            // Pour tout les produits contenus dans la réponse
            for (let i = 0; i < reponse.products.length; i++) {
                finalPrice = finalPrice + reponse.products[i].price     // on recalcul le prix total
            }

            store.resetCart()       // on reset le panier du LocalStorage (cart)
            
            // redirection vers la page de validation (confirmation de la commande)
            document.location.href="/page/validation.html" + "?price=" + finalPrice + "&orderId=" + reponse.orderId     // on passe en paramètre l'orderId et le prix total de la commande

        }, {once : true});


    // Si le panier est vide
    } else {

        // On affiche que le panier est vide et on enlève la possibilité de remplir le formulaire et d'envoyer la commande
        window.addEventListener("DOMContentLoaded", (event) => {        // attente du chargement du DOM pour faire patienter l'execution du code

            // Suppression du formulaire
            element = document.querySelector("#formulaire")
            supp_childs(element)
        
            // On affiche que le panier est vide
            element = document.querySelector("#empty-basket")
            let div = document.createElement("div")
            div.classList.add("h3","text-center","m-5","ml-5")
            div.textContent = "Votre pannier est vide !"
            element.appendChild(div)
        });
    }
})();