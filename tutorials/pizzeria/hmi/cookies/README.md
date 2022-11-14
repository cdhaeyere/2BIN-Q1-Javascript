# Création d’une SPA pour une pizzeria : web storage : Sauvegarde du token et du username dans le localStorage

## Démarrage de la RESTful API
- la Restful API du module 7 doit avoir été démarrée : https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/safe.
- Pour le frontend, on part du code du tutoriel précédent : 
[jwt-fetch](https://github.com/e-vinci/js-demos/tree/main/frontend/frontend-essentials/jwt-fetch))

## How to ? Sauvegarde du token & username dans le localStorage
- Lors d'une opération de login ou d'enregistrement, l'API renvoie le username et un token. Ces données de session sont à sauver côté client dans le `localStorage`.
- La méthode `setAuthenticatedUser` de `/utils/auths.js` permet d'enregistrer les données dans le browser. Ainsi, même si l'utilisateur ferme son browser, celles-ci sont disponibles à sa prochaine ouverture.
- Cette méthode est donc appelée dans LoginPage et RegisterPage.

# Gérer les demandes de logout
- Le composant `Logout` permet déjà de demander un "rerender" de la `Navbar` et rediriger vers la `LoginPage`. 
- Avant d'appeler `Logout`, il faut supprimer les données de session. Ceci est implémenté dans `/Components/Logout/Logout.js` en faisant appel à la méthode `clearAuthenticatedUser` de `/utils/auths.js`

# Conclusion
- Nous avons une SPA qui ressemble à un site que l'on pourrait déployer pour un client 🎉.

# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza