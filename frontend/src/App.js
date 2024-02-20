import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

class App extends Component {
  //state so that app can remember user value and update when it changes
  constructor(props) {
    super(props);
    this.state = {
      route: 'signin',
      input: '',
      imageUrl: '',
      boxes: []
    };
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  calculateFaceLocation = (result) => {
    let boxes = [];
    result.outputs[0].data.regions.forEach((region) => {
      const clarifaiFace = region.region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = image.width;
      const height = image.height;
      boxes.push({
        leftCol: clarifaiFace.left_col * width,
        rightCol: width - (clarifaiFace.right_col * width),
        topRow: clarifaiFace.top_row * height,
        bottomRow: height - (clarifaiFace.bottom_row * height),
      });
    });
    return boxes;
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onInputSubmit = (event) => {

    this.setState({ imageUrl: this.state.input });
    this.setState({ boxes: [] });

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
      "https://api.clarifai.com/v2/users/" +
      USER_ID +
      "/apps/" +
      APP_ID +
      "/models/" +
      MODEL_ID +
      "/outputs",
      requestOptions
    )
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  }
  render() {
    const { route, imageUrl, boxes } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} currentRoute={route}/>
        {
          route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange} />
            :
            route === 'register' ?
              <Register onRouteChange={this.onRouteChange} />
              :
              (
                <div>
                  <Logo />
                  <Rank />
                  <ImageLinkForm onInputChange={this.onInputChange} onInputSubmit={this.onInputSubmit} />
                  <FaceRecognition boxes={boxes} image={imageUrl} />
                </div>
              )
        }
      </div>
    );
  }
}

export default App;
