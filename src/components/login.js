import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: '', loginPopup: false }

    let nameCheck = /^[a-zA-Z0-9_\- ]{1,12}$/;
    this.nameReg = new RegExp(nameCheck);
  }

  render() {
    return (
      <div id="login-page">
        <div id="login-box">
          <h1>Login in with Username</h1>
          <form onSubmit={ (e) => {
            e.preventDefault();

            if(this.state.value.match(this.nameReg) && this.state.value.replace(/\s/g, '').length){
              this.props.onChange(this.state.value, false);
              this.setState({ loginPopup: false });
            }else{
              this.setState({ loginPopup: true });
            }
          } }>
            <input type="text" value={ this.state.value } onChange={ (e) => {
              this.setState({ value: e.target.value, loginPopup: false })
            }}/>
            <input id="send-btn" type="submit" value="Login"/>
          </form>
          { this.state.loginPopup ? <p id="login-error">Please enter a valid username.</p>: null }
        </div>
      </div>
    );
  }
}

export default Login;
