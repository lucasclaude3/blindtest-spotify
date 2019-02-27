/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import AlbumCover from './AlbumCover';

const apiToken = 'BQAirCk-YOujYYJANOInjEKuMjmMOVzTx3XGtkeemafbRwDydMzdvWjVExJufJhGCTzVrxlQW7PqqS2xWNuzSEBqUBEqGDOj_jzN9I2bw10V_wPoYlarkf4oyS9v4GF1iTPbGxJjkNiB2P1mSZw0sGa0dg';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: '',
      songsLoaded: false,
      data: null,
    };
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
      Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        return setTimeout(
          function() {
            this.setState({ songsLoaded: true, text: 'En avant la musique', data: data });
          }
          .bind(this),
          3000
        );
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Blind Test</h1>
        </header>
        <div className="App-images">
        {this.state.songsLoaded ?
          (<div>
            <p>{this.state.text}</p>
            <p>{this.state.data.items.length} morceaux</p>
            <p>Premier morceau : {this.state.data.items[0].track.name}</p>
            <AlbumCover track={this.state.data.items[0].track} />
          </div>) :
          (<div>
            <img src={loading} className="App-logo" alt="logo"/>
          </div>
          )}
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;
