import React from 'react';
import Emojify from 'react-emojione';

class Receive extends React.Component {
  constructor(props) {
    super(props);

    let urlCheck = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    this.urlReg = new RegExp(urlCheck);

    this.scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    this.msConverter = (ms) => {
      let hours = parseInt((ms/(1000*60*60))%24), minutes = parseInt((ms/(1000*60))%60);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;

      return hours + ':' + minutes;
    }

    this.checkLink = this.checkLink.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  checkLink(string) {
    if (string.match(this.urlReg)){
      let stringSplit = string.split(' ');
      for (let i = 0; i < stringSplit.length; i++){
        if (stringSplit[i].match(this.urlReg)){
          stringSplit[i] =<> <a href={ stringSplit[i].includes('http') ? stringSplit[i]: 'https://' + stringSplit[i] }
          target="_blank" rel="noopener noreferrer">{ stringSplit[i] }</a> </>
        }
      }
      return stringSplit;
    }
    return false;
  }

  render() {
    return (
      <>
        <div id="top-container">
          <h2>Logged in as: { this.props.userName } </h2>
          <button onClick={ () => {
            this.props.logoutChange(null, true);
          } }>Logout</button>
        </div>
        <div id="text-box">
          { this.props.serverMsgs.map((value, index) => {
            return <Emojify style={ { height: 15 } }><li key={ value.id }
             className={ value.username === this.props.userName ? 'green-msg': 'blue-msg'}>
            [{ this.msConverter(value.timestamp) }] <b>{ value.username }: </b>{
              this.checkLink(value.content) ? this.checkLink(value.content).map((value, index) => {
                return value;
              }): value.content }</li></Emojify>
          }) }
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      </>
    )
  }
}
export default Receive;
