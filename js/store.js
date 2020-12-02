
// Création du design paterne Store
class Store {       

    // cart est l'objet qui sera stocké dans le localStorage sous forme de tableau
    cart = []                                
    
    // fonction qui créé l'objet cart (vide)
    setCart (cart) {                           
        this.cart = cart
    }

    // fonction ajoute un élément dans cart
    addItem (item) {             
        this.cart.push(item)           
    }

    // fonction qui enlève un élément dans cart
    removeItem (item) {         
        const index = this.cart.indexOf(item)           // recherche dans tous cart
        if (index !== -1) {                             // si il existe
            this.cart.splice(index, 1)                  // on le supprime
        }
    }

    // fonction qui permet d'éditer un élément de cart
    editCart (cart) {           
        this.setCart(cart)
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    // fonction qui permet d'ajouter un element dans cart et de push cart sur le localStorage
    addItemToCart (item) {          
        this.addItem(item)
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    // fonction qui permet de supprimer un element dans cart et de push cart sur le localStorage
    removeItemFromCart (item) {         
        this.removeItem(item)
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    // permet de supprimer l'objet cart du localstorage
    resetCart () {
        localStorage.removeItem('cart')         
    }

    // La méthode constructor est une méthode qui est utilisée pour créer et initialiser un objet lorsqu'on utilise le mot clé class
    constructor() {         
        const rawCart = localStorage.getItem('cart')        // on récupère l'objet cart et son contenu
        let cart = []                                       // on créé la variable cart (vide)
        if(rawCart) {                                       // si cart est déjà rempli
            cart = JSON.parse(rawCart)                      // on écrit le contenu cart du localStorage dans la variable cart
        }
        this.setCart(cart)
    }
}