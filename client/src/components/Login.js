import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';


class Login extends React.Component {

    //set default state with empty creds obj
    state = {
            username: '',
            password:''
    };

    // Handlers below

    // when a change is made to our inputs, update our state object to that change
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
          
            ...this.state,
            [e.target.name]: e.target.value
          
        });
      };

    // Login function that will prevent default, run our axiosWithAuth fn, post that auth and promise a redirect ***
    login = e => {
        e.preventDefault();
        console.log('LOGIN STATE CREDS', this.state)
        // axiosWithAuth ==> ?? an axios instance; .post() ==> ?? promise
        axiosWithAuth()
          .post('/api/login', this.state)
          .then(res => {
              // save the returned token to localStorage ***
            localStorage.setItem('token', res.data.payload);
            // navigate your user to your login route *** aka pushing to our protected route
            this.props.history.push('/protected');
          })
          .catch(err => console.log(err));
      };
    
    render() {
    return (
        <div className="Login">
            <form onSubmit={this.login}>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                />
                <button className="login-btn">Log In</button>
                <p>
                  Login Credentials
                  <br/>
                  <span>Username: username</span>
                  <br/>
                  <span>Password: password</span>
                  <br/>
                </p>
            </form>
        </div>
    )}// end render
}

export default Login;