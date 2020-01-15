import React from 'react';

class Send extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currMsg: '' }
  }

  render() {
    return (
      <form onSubmit={ (e) => {
        e.preventDefault();
        if (this.state.currMsg.length <= 200 && this.state.currMsg.replace(/\s/g, '').length){
          this.props.sendMsg({username: this.props.userName, content: this.state.currMsg, timestamp: + new Date(), id: + new Date()});
          this.setState({ currMsg: ''});
        }
      } }>
        <input value={ this.state.currMsg } onChange={ (e) => {
          this.setState({ currMsg: e.target.value });
        } }/>
        <input id="send-btn" type="submit" value="Send"/>
      </form>
    )
  }
}

export default Send;
