# Création d’une RESTful API pour une pizzeria : fat-model – Refactoring du code et utilisation d'outils de développement

## Utilisation des outils de développement offerts par un boilerplate
- à l'aide du boilerplate du cours 
[basic-api-boilerplate](https://github.com/e-vinci/basic-api-boilerplate), 
cette application **fat-model** a été initialisée.

## How to ? Refactoring du code
- On souhaite pouvoir facilement remplacer la couche d’accès aux données (accès à un fichier .json actuellement) sans changer
  - La (re)présentation des ressources
  - Le router / controller
- Comme on a peu de contraintes pour la structure de la partie "logique" (ou business), on va donc créer un "Fat Model". En résumé, les RESTful APIs que l'on développera seront structurées de cette façon :
- Un router / controller s'occupant de l'aspect présentation des ressources (en fonction des requêtes)
- Un "Fat Model" qui s'occupera de la partie "logique" et de la partie "données" (ou aussi nommé "services").

L'application de ces principes amènent à ces changements du code du tutoriel précédent (api-persistence) :
- Création du modèle `/model/pizzas.js` fournissant les opérations `readAllPizzas`, `readOnePizza`, `createOnePizza`, `deleteOnePizza`, `updateOnePizza` et gérant la persistance des données au sein du fichier `/data/pizzas.json`
- Mise à jour du router `/routes/pizza.js` pour appeler les opérations du modèle.





