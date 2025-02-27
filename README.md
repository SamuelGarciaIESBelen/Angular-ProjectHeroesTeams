# Angular Project
An Angular project for DWECL

This project is going to be a sort of encyclopedia of superheroes and the different teams they belong to.<br>
There will be data of the most famous ones but it's also a creative way to invent new ones and make them "interact" with your favourites.<br>
Have fun and hope you learn something about them!
<br><br>
This is the project structure:<br>
Have fun and hope you learn something about them!<br>
<br>
This was the project structure in JavaScript:
```bash
WikiSups/
── src/
│ ├── team/
│ │ ├── Team.js # Clase Group
│ │ ├── teamController.js # Controlador para gestionar CRUD de teams
│ │ ├── teamsList.html # Página HTML para listar teams
│ │ ├── createTeam.html # Página HTML para crear un nuevo team
│ │ ├── editTeam.html # Página HTML para editar un team
│ │ └── team.css # CSS específico para las páginas de team
│ │
│ ├── hero/
│ │ ├── Hero.js # Clase Hero
│ │ ├── heroController.js # Controlador para gestionar CRUD de heroes
│ │ ├── heroesList.html # Página HTML para listar heroes
│ │ ├── createHero.html # Página HTML para crear un nuevo hero
│ │ ├── editHero.html # Página HTML para editar un hero
│ │ └── hero.css # CSS específico para las páginas de hero
│
├── index.html # Página de inicio con enlaces a los CRUDs
├── main.js # JavaScript principal para la lógica de la interfaz
├── css/
│ └── main.css # CSS global para todo el proyecto
├── assets/
│ ├── teams.json # Archivo JSON para almacenar datos de teams
│ └── heroes.json # Archivo JSON para almacenar datos de heroes
│
├── images/
├── package.json # Información y dependencias del proyecto
└── README.md # Documentación del proyecto
```

In Angular, there is a structure divided in models, components and services, including the assets, where the information is located as json files.
We have Teams and Heroes, and using the different components we can create, edit, delete and view the details of every element.

## How to start the project
When you download or clone this repository, use the command `npm install` and then `npm run startAll` in order to start both the app and the json server.