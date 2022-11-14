# Création d’une SPA pour une pizzeria : jwt-fetch : Utilisation de JWT au sein d'une IHM

## Démarrage de la RESTful API
- la Restful API du module 5 doit avoir été démarrée : https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/fat-model.
- Pour le frontend, on part du code du tutoriel précédent : 
[async-await](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/async-await))

## How to ? Création d'une page pour l'ajout de pizzas et gestion de JWT
- `AddPizzaPage` (`/Components/Pages/AddPizzaPage.js`) a été créée.  Suite à l'appel de la méthode `getSessionObject` de `/utils/session.js` permettant de désérialiser (ou parser) les données de session se trouvant (ou pas) dans le browser,  le username et le token sont récupérés s'ils existent.
- `AddPizzaPage` ne peut être affichée que pour un utilisateur authentifié. Dès lors, si un utilisateur non authentifié tente d'accéder à cette page via l'URL, `AddPizzaPage` provoquera une redirection vers `LoginPage`. 
- Lors du "submit" du formulaire d'ajout de pizza, le token de l'utilisateur est envoyé dans le `Authorization` header de la méthode `fetch` appelée au sein de `/Components/Pages/AddPizzaPage.js`. Notons qui si le token n'est pas joint à la requête, la RESTful n'autorisera pas l'opération d'ajout d'une pizza et un code d'erreur sera renvoyé au frontend.

## How to ? Authentifier un utilisateur via une IHM & JWT
- Mise à jour de `RegisterPage` et `LoginPage` pour faire des fetchs vers la RESTful API (**POST /auths/register** et **POST /auths/login**).
- Ajout d'un script `/src/utils/auths.js` permettant d'enregistrer en mémoire vive l'utilisateur authentifié, d'obtenir l'utilisateur authentifier, de le réinitialiser, de savoir si un utilisateur est authentifié.
- Mise à jour de la `Navbar` (`/src/Components/Navbar/Navbar.js`) pour afficher un menu différent en fonction que l'utilisateur est authentifié ou pas.
- Ajout d'un script pour le `Logout` d'un utilisateur.
- Ajouter d'une entrée au tableau `routes` dans le `Router` fournissant un lien entre **Logout** et l'URI associée `/logout`.
- Mise à jour du `Router` et de la fonction `onNavBarClick` pour être toujours fonctionnelle même lorsque le menu est entièrement "rerender" au sein du wrapper associé à la Navbar.

## Autoriser l'appel à une opération protégée
- Mise à jour de `/src/Components/Pages/AddPizzaPage.js` pour que lors des fetch, on ajoute le token de l'utilisateur authentifié au sein du header de la requête.

# Conclusion
- Nous avons une SPA qui commence à ressembler à un site que l'on pourrait déployer pour un client.
- Quelles sont les faiblesses actuelles ? 
    - Lorsqu'on quitte le browser, on est plus connecté !
    - **La gestion des droits**. Ici, seul un admin a le droit d'ajouter une pizza. Comme on utilise le username côté API pour déterminer si c'est l'utilisateur "admin" qui a fait la requête, ça n'est pas souple. On ne pourrait pas avoir plusieurs utilisateurs ayant les privilèges d'admin. 
    => L'API pourrait être améliorée en permettant la gesion des privilèges des utilisateurs. Par exemple, Luigi pourrait avoir le privilège d'admin, alors que Mario aurait le privilège de simple utilisateur.
    - On n'affiche **pas de message d'erreur** à l'utilisateur lorsque la réponse d'une API renvoie une erreur.
    - Bien sûr, il **manque des opérations sur les ressources** : on ne peut pas encore mettre à jour les pizza, les supprimer...

# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza