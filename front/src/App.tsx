import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/planets')
      .then(response => setPlanets(response.data))
      .catch(error => console.log(error));
  }, []);

  // Fonction pour générer la grille orthonormée
  function renderGrid() {
    const grid = [];
    const maxCoord = 31; // maximum des coordonnées x et y

    // Générer chaque ligne de la grille
    for (let y = maxCoord; y >= -maxCoord; y--) {
      const row = [];

      // Générer chaque cellule de la ligne
      for (let x = -maxCoord; x <= maxCoord; x++) {
        // Vérifier si la cellule contient des planètes
        if (planets[x] && planets[x][y]) {
          const cell = (
            <td key={`${x},${y}`} className="cell">
              <tr className="cell-coord">({x}, {y})</tr>
              {planets[x][y].map(planet => (
                <div key={planet.name} id={planet.name}>
                  <p>{planet.name}</p>
                  {/* Ajoutez ici les autres informations de la planète */}
                </div>
              ))}
            </td>
          );
          row.push(cell);
        } else {
          row.push(<td key={`${x},${y}`}></td>);
        }
      }

      // Ajouter la ligne à la grille
      grid.push(<tr key={y}>{row}</tr>);
    }

    return grid;
  }

  return (
      <table className="grid">
        <TransformWrapper
          centerOnInit={true}
          initialScale={0.5}
          limitToBounds={false}
          minScale={0.05}
          maxScale={3}
        >
          <TransformComponent>
            <tbody className="tbody">
                {renderGrid()}
            </tbody>
          </TransformComponent>
        </TransformWrapper>
      </table>
  );
}

export default App;