# Création d’un frontend pour une pizzeria : routing-hmi : mise en place d'un routeur

## Mise à jour de la Navbar
Mise à jour de la Navbar `/Components/Navbar/Navbar.js` afin de cacher l'URI des pages au sein de l'HTML : 
- On ajoute dans l'HTML des éléments de la Navbar un « data attribute » nommé **uri**. Le nom de la propriété commence toujours par **`data-`** suivi du nom du "data attribute" : **`data-uri`**
- Pour accéder en JS à ce data attribute, on y accède via l'attribut **dataset** d'un élément 
HTML, par exemple : **e.target.dataset.uri** pour accéder au "data attribute" nommé **uri**.
- Si un "data attribute" contient un "**-**" dans l'HTML, lorsqu'on y accède en JS, il faut convertir le "**-**" en camelCase. Exemple pour un "data attribute" nommé **project-number**, 
on y accédera via **refToHtmlElement.dataset.projectNumber**.

## Création d'un router
- Le rôle du nouveau routeur `/Components/Router/Router.js` sera d'implémenter ces fonctions :
    - Routage lors d’un clic sur un élément de la barre de navigation via `navbarWrapper.addEventListener("click",...)` :
        - Appel du composant associé à l’élément cliqué (et auto-render du composant)
        - Affichage dans le browser de l’URL associée à l’élément cliqué
        - Garder l’URL dans l’historique
    - Routage lors du chargement du frontend (ou lors d'un refresh) via `navbarWrapper.addEventListener("load",...)` :
    appel du composant associé à l’URL en cours
    - Routage lors de l’utilisation de l’historique du browser via `navbarWrapper.addEventListener("popstate",...)` : appel du composant associé à l’URL se trouvant dans la pile gérant le "state" du browser (l'historique)
    - Routage lors de redirection via la méthode `Redirect(uri)` :
        - Appel du composant associé à la redirection (et auto-render du composant)
        - Affichage dans le browser de l’URL associée à l’élément redirigé
        - Garder l’URL dans l’historique
- La configuration des routes est actuellement à faire au sein de `/Components/Router/Router.js`
```js
const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/logout": Logout,
};
```
- NB : Cette configuration pourrait être externalisée dans un fichier de configuration afin de rendre le code plus générique.

## Mise à jour de l'index.js
- `HomePage` n'est plus chargé dans `index.js.` C'est le rôle du Router de charger la bonne page en se focalisant sur l'URL.
- De plus, il faut appeler le `Router` au sein de `index.js`

## Test de la redirection
- On souhaite faire appel à la fonction `Navigate` présente dans `/src/Components/Router/Navigate.js/` pour rediriger vers la `HomePage` quand on passe sur la pizza au fromage qui se trouve dans le footer. `Footer.js` a donc été mis à jour.

# Conclusion
- Nous avons une IHM fonctionnelle. Mais qu'est-ce qui nous manque ?
- Si nous faisons un refresh de la page, nous perdons l'historique. De plus, nous n'avons pas d'URI spécifiques pour chacune des pages.
- De plus, il est impossible d'ajouter des opérations de lecture & écriture sur des ressources externes à notre frontend. Pourtant, nous souhaiterions qu'un admin du site puisse ajouter des pizzas, en effacer... Pour ce faire, il est important d'apprendre à développer une Web API. Puis finalement, d'intégrer les opérations offertes par une Web API au sein du frontend.

# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza