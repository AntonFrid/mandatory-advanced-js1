import React from 'react';
import './App.css';
import Receive from './components/receive';
import Send from './components/send';
import Login from './components/login';
import io from 'socket.io-client';
import Uifx from 'uifx';
import notification from './components/sounds/notis.ogg';
import cntSound from './components/sounds/connectSound.wav';
import dcntSound from './components/sounds/disconnectSound.wav';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { userName: '', loginScreen: true, userMsgs: [], msgArray: [] };

    this.loginOnChange = this.loginOnChange.bind(this);
    this.userMsgInput = this.userMsgInput.bind(this);

    this.notification = new Uifx(notification, {
      volume: 1.0,
      throttleMs: 100
    })
    this.connectSound = new Uifx(cntSound, {
      volume: 1.0,
      throttleMs: 100
    })
    this.disconnectSound = new Uifx(dcntSound, {
      volume: 1.0,
      throttleMs: 100
    })
  }

  componentDidMount() {
    this.socket = io('http://3.120.96.16:3000');

    this.socket.on('connect', () => {
      console.log('Connected to server');
    })
    this.socket.on('messages', (data) => {
      this.setState({ msgArray: this.state.msgArray.concat(data)});
    })
    this.socket.on('new_message', (msg) => {
      if(!this.state.loginScreen){
        this.notification.play();
      }
      this.setState({ msgArray: this.state.msgArray.concat(msg)});
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  loginOnChange(value, bool) {
    this.setState({ userName: value, loginScreen: bool });

    if(bool){
      this.disconnectSound.play();
    }else{
      this.connectSound.play();
    }
  }

  userMsgInput(msg){
    this.setState({msgArray: this.state.msgArray.concat(msg)})
    this.socket.emit('message', { username: msg.username, content: msg.content })
  }

  render() {
    console.log(this.state.msgArray);
    return (
      <div className="App">
        { this.state.loginScreen ? <Login onChange={ this.loginOnChange }
        userName={ this.state.userName } /> : null }
        <div id="chat-container">
          { !this.state.loginScreen ? <><Receive logoutChange={ this.loginOnChange }
          serverMsgs={ this.state.msgArray } userMsgs={ this.state.userMsgs }
          userName={ this.state.userName }/>
          <Send sendMsg={ this.userMsgInput } userName={ this.state.userName }/></>: null }
        </div>
      </div>
    );
  }
}

export default App;
