import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onInputSubmit = (event) => {
    console.log(this.state.input);

    const PAT = 'c9d4d4095a2d46b28ba9ad15149ae72b';

    const USER_ID = 'clarifai';
    const APP_ID = 'main';

    const MODEL_ID = 'face-detection';

    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch(
      "https://api.clarifai.com/v2/users/"+
        USER_ID +
        "/apps/" +
        APP_ID +
        "/models/" +
        MODEL_ID +
        "/outputs",
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        const regions = result.outputs[0].data.regions;
        regions.forEach(region => {
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);
          region.data.concepts.forEach(concept => {
            const name = concept.name;
            const value = concept.value.toFixed(4);
            console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
          });
        });
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onInputSubmit={this.onInputSubmit} />
      </div>
    );
  }
}

export default App;
