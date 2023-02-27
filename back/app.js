// Import des modules JS
import express from 'express';
import csv from 'csv-parser';
import * as fs from 'fs';

// Sélection du fichier CSV dans une variable
const csvfile = "fullplanetlist.csv";

// Déclare l'API dans une variable
const app = express();

// Configure les CORS policies pour autoriser ReactJS à requêter l'API
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Créé un endpoint pour récupérer la grille de planètes triées
app.get('/planets', (req, res) => {
  const planets = [];

  // Lecture du fichier CSV et création du tableau de planètes
  fs.createReadStream(csvfile)
    .pipe(csv())
    .on('data', (row) => {
      planets.push({
        id: parseInt(row.id),
        name: row.name,
        x: parseInt(row.x),
        y: parseInt(row.y),
        govsystem: parseInt(row.govsystem),
        race: parseInt(row.race),
        prod: parseInt(row.prod),
        activity: parseInt(row.activity),
        tag: row.tag,
        civlevel: parseInt(row.civlevel)
      });
    })
    .on('end', () => {
      // Trier les planètes par coordonnées x et y
      planets.sort((a, b) => {
        if (a.x === b.x) {
          return a.y - b.y;
        }
        return a.x - b.x;
      });

      // Transformation du tableau de planètes en une grille de planètes triées
      const grid = {};
      planets.forEach((planet) => {
        if (!grid[planet.x]) {
          grid[planet.x] = {};
        }
        if (!grid[planet.x][planet.y]) {
          grid[planet.x][planet.y] = [];
        }
        grid[planet.x][planet.y].push(planet);
      });

      // Envoi de la grille de planètes triées sous forme de JSON
      console.log(grid);
      res.json(grid);
    });
});

// Démarrage de l'API express
app.listen(3030, () => {
  console.log('Serveur démarré sur le port 3030');
});