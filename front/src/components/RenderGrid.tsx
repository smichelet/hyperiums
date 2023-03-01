import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RenderGrid: React.FC = () => {
  const [planets, setPlanets] = useState([]);
  const [isTagEnabled, setIsTagEnabled] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3030/planets')
      .then(response => setPlanets(response.data))
      .catch(error => console.log(error));
  }, []);

  const getCellStyle = (planet) => {
    let style = { backgroundColor: 'white' };
    if (isTagEnabled && planet.tag === '[PASTA]') {
      style.backgroundColor = 'lightblue';
    } else if (isTagEnabled && planet.tag === '[TAG]') {
      style.backgroundColor = 'lightgreen';
    } else if (isTagEnabled && planet.tag === '[MNKY]') {
      style.backgroundColor = '#EA6A95';
    }
    return style;
  };

  const toggleTag = () => {
    setIsTagEnabled(!isTagEnabled);
  }

  // Fonction pour générer la grille orthonormée
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
        <td key={`${x},${y}`}>
          <tr>({x}, {y})</tr>
          {planets[x][y].map(planet => (
            <div key={planet.name} style={getCellStyle(planet)}>
              <p>{planet.name} {planet.tag}</p>
              {/* Ajoutez ici les autres informations de la planète */}
            </div>
          ))}
        </td>
      );
      row.push(cell);
    } else {
      row.push(<td key={`${x},${y}`}></td>);
    }}

    // Ajouter la ligne à la grille
    grid.push(<tr key={y}>{row}</tr>);
  }

  return (
    <div>
      <button onClick={toggleTag} style={{width: 200, height: 200}}>Display tags</button>
      <table style={{borderCollapse: 'collapse'}}>
        <tbody>
          {grid}
        </tbody>
      </table>
    </div>
  )
}

export default RenderGrid;