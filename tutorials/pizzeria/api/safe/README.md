# Création d’une RESTful API pour une pizzeria : auths – Authentification et autorisation d'utilisateurs

## Initialisation de l'application
- à l'aide du tutoriel précédent
[fat-model](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/fat-model), 
cette application **auths** a été initialisée.


## How to ? création de token signé à l'aide d'un secret
- Dans notre API permettant de lire des pizzas, ou d'en ajouter, il n'est pas normal que n'importe qui puisse ajouter, effacer ou mettre à jour des pizzas. On souhaiterait que seul le compte `admin` puisse réaliser des opérations d'écriture sur des pizzas. On va créer un token sécurisé, un JWT, contenant une signature protégée par un secret, et on ajoutera le username de l'utilisateur authentifié dans le payload du token afin de sauvegarder les données de session côté client. Ainsi, seul `admin`, ayant fourni un token valide, aura accès aux opérations sur les ressources sécurisées.
- Nous allons créer un JWT via : 
    - un secret "ilovemypizza!" pour la signature
    - le username comme donnée de session que l'on mettra dans le payload du token,
    - une durée de vie du token de 24h (`lifetimeJwt` dans le code).
- Installation du package `jsonwebtoken` permettant de créer un JWT ou vérifier un JWT : `npm i jsonwebtoken`
- Afin de structurer le code, toute la logique de gestion des utilisateurs et de leurs token a été mise dans le "Fat Model" `/model/users.js`. Les méthodes `login` et `register` permettent de vérifier les données d'authentification d'un utilisateur, ses "credentials", et de générer un token si tout est OK. 
- Utilisation de `jsonwebtoken` pour créer le token : voir l'appel de la méthode `jwt.sign()` dans `/model/users.js`.

## How to ? sécurisation des opérations d'écriture sur des pizzas
- Afin de sécuriser les opérations d'écriture sur des ressources de types "pizzas" (création, suppression et modification de ressources) par `admin` seulement, dans `/routes/pizzas.js`, les fonctions middleware `authorize` et `isAdmin` de `/utils/authorize.js` sont utilisées ; `authorize` appelle la méthode `jwt.verify()` pour vérifier la signature et parser les infos qui sont dans le payload (`token.username`) du token.

## Exécution de l'API et tests
- N'oubliez pas de démarrer l'API : `npm run dev` ou utilisez votre debugger.
- N'hésitez pas à explorer les requêtes pour voir comment l'API réagit => clic sur `Send Request` au sein de `/tests/auths.http` ou `/tests/pizzas.http`.
- Si vous avez besoin de plus d'information sur comment récupérer des données suite à une requête faite via REST Client, n'hésitez pas à lire la documentation : https://github.com/Huachao/vscode-restclient

# Conclusion
- Nous avons une RESTFul API entièrement testée et développée indépendemment du frontend.
- Nous avons actuellement choisi de sécuriser toutes les opérations d'écriture sur des ressources de type "pizzas". Cela pourra être changé dans une prochaine étape pour permettre, par exemple, de lire les données des comptes utilisateurs pour tout utilisateur authentifié.
- Le mécanisme de JWT est robuste pour gérer l'authentification et l'autorisation d'opération sur des ressources.





