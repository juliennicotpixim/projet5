
// Fonction XHRFetch qui prend comme paramètre l'url, la methode et la spécification du corps de la requête

function XHRFetch (url, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {           // la promise est utilisée pour réaliser un traitement de façon asynchrone
      let request = new XMLHttpRequest()                // permet d'obtenir des données au format XML, JSON, ou HTML.
      request.open(method, url)                         // création d'une nouvelle requête
      request.responseType = 'json'                     // type de données contenues dans la réponse
      
      // SI le corps de la requête n'est pas spécifié
      if(body == null) {                                
        request.send()                                  // envoi de la requête au serveur
      }

      // SINON
      else {                                                              
        request.setRequestHeader("Content-Type", "application/json")      // édition du header HTTP, on choisi ici le format JSON
        request.send(JSON.stringify(body))                                // conversion du body en format JSON et envoi de la requête au serveur
      }

      request.onload = function() {                                       // cette fonction est appelée lorsque la requête se termine avec succès
        resolve(request.response)                                         // renvoie un objet Promise avec la valeur donnée
      }
    })
}


// Fonction de récupération des paramètres de requête / return un tableau associatif contenant les paramètres de requête

function extractUrlParams(){	
  var params = location.search.substring(1).split('&');     // range tous les paramètres de l'url
	var array = [];                                           // création du tableau qui stock les paramètres
	for (var i = 0; i < params.length; i++){                  // pour chaque élement du tableau
    var separation = params[i].split('=');                  // on sépare le nom du paramètre et sa valeur
    array[separation[0]]=separation[1];                     // on créé dans le tableau (array), le nom et la valeur associé
	}
	return array;                                             // on renvoi le tableau avec chaque paramètre (nom et valeur)
}


// Fonction qui permet de supprimer le contenu d'un élément du DOM

function supp_childs(node){
	node.innerHTML=""     // on remplace le contenu de l'élément sélectionné par "(rien)"
}