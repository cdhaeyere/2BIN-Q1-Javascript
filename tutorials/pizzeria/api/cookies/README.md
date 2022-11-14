# Création d’une RESTful API pour une pizzeria : safe – Sécurisation de RESTful API : hachage des passwords et protection contre attaques XSS

## Introduction
- Afin de sécuriser la RESTful API, nous allons hacher les passwords des utilisateurs et nous allons aussi échapper les caractères dangereux lors d'opérations d'écriture sur les ressources.

## Initialisation de l'application
- à l'aide du tutoriel précédent
[auths](https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/auths), 
cette application **safe** a été initialisée.

## How to ? hachage des passwords
- Installation du package `bcrypt` : `npm i bcrypt`
- Hachage du password lors de l'enregistrement d'un utilisateur via l'appel de la méthode `hash()` de `bcrypt` au sein de `/model/users.js `. Notons que `hash` renvoie une promesse.
- Comparaison d'un password reçu en clair, lors du login, avec le password haché : utilisation de la méthode compare de `bcrypt` au sein de `/model/users.js `. Là aussi il faut gérer une promesse.

## Echapper les caractères dangereux
- Afin de se protéger contre les attaques XSS, les caractères dangereux sont échappés lors des opérations d'écritures.
- Installation du package `escape-html` : `npm i escape-html`
- Utilisation de la fonction `escape` pour échapper les caractères dangereux dans `/model/pizzas.js`

## Exécution de l'API et tests
- Pour rappel, n'hésitez pas à explorer les requêtes pour voir comment l'API réagit => clic sur `Send Request` au sein de `/tests/auths.http` ou `/tests/pizzas.http`.
- Auparavant, n'oubliez pas d'avoir démarré l'API : `npm run debug`.

# Conclusion
- Cette RESTful API est à présent robuste. Elle est prête à être utilisée par d'autres applications.
- NB : un des points forts de cette technologie, c'est que tout client de cette API peut être développé selon n'importe quelle technologie.





