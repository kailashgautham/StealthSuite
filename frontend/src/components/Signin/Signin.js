import React from 'react';
import './Signin.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          signInError: false
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitSignIn = () => {
        console.log("submit sign in")
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Data: ", data)
            if (data.id) {
                this.props.setUserData(data)
                this.props.onRouteChange('home');
            }
        })
    }

    errorSignIn = () => {
        this.setState({email: '', password: '', signInError: true})
    }

    resetSignIn = () => {
        this.setState({email: '', password: '', signInError: false})
    }

    render() {
        const { onRouteChange } = this.props; 
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                onChange={this.onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"
                                id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                onChange={this.onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" value="Sign in"/> 
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer"
                            onClick={() => onRouteChange("register")}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default Signin;