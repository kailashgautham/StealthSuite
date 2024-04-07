import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    email: '',
    id: '',
    name: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    fetch('https://gentle-retreat-34902-b66b71d472a6.herokuapp.com/')
    .then(response => response.json())
    .then(console.log);
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  setUserData = (data) => {
    this.setState({
      user: {
        email: data.email,
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
      }
    })
  };

  calculateFaceLocation = (result) => {
    let boxes = [];
    console.log("result: ", result)
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
      .then(response => {
        if (response) {
          fetch('https://gentle-retreat-34902-b66b71d472a6.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState({ user: { ...this.state.user, entries: count } })
          });
        }
        return response.json()
      })
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
            <Signin onRouteChange={this.onRouteChange} setUserData={this.setUserData}/>
            :
            route === 'register' ?
              <Register onRouteChange={this.onRouteChange} setUserData={this.setUserData}/>
              :
              (
                <div>
                  <Logo />
                  <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
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
