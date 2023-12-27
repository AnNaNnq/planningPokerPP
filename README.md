# PlanningPokerPP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Raport

## Design Pattern

### Decorator

Afin de faire fonctioner notre projet nous avons utiliser le Design Pattern du decorateur
pour géré les différents mods de jeux. Ainsi nous avons une classe abstraite
qui contient toutes les fonctions utils au bon déroulement du jeu, classe
qui est dérivé en Jeu concret qui contient les variables utils au jeu
et en Mode qui contient les fonctions pour le déroulement du jeu
ce Mode est la classe mère de tous les Modes que nous avons implèmentés.

Pour simplifier l'implèmentation de balise HTML via le TypeScript nous avons
utiliser le Design Pattern de la Facade.

### Facade

Ce Design Pattern nous permet d'implémenter facilement des balise HTML directement
depuis le TypeScript. Ainsi en une ligne nous pouvons implémenter une balise Input
avec des classes un identifiant ou d'autre variable intégrer et pour les insérer
facilement dans le code nous avons utiliser le Design Patterne Singleton

### Singleton

Ce Design Pattern n'ayant qu'une seule implémentation dans tous le code nous
permet de récupérer facilement divers emplacement HTML de la page afin d'y
placer du code facilement.

## Unit Test
Pour les tests unitaires nous avons utiliser la bibliotèque Karma modifier
par Jasmine, qui nous permet de faire des tests sur Angular.
Chaque Page est correctement tester afin de verifier que l'on peut l'importer
et nous testons les diférentes fonction de notre jeu prinipalement les Setters
et Getters afin de verifier leurs bons fonctionnements.
Vous pouves lancer les tests en lancant la commande `ng test` assurez
vous d'avoir Chrome d'installer avant de lancer la commande

## Documentation
Pour la doc nous utilisons Compodoc, que nous pouvons utiliser en lancant
la commande `npm run compodoc` qui vous généreras la documentation et
vou ouvrera un serveur sur lequel est présent toutes la doc.


