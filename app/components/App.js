import React, {Component} from 'react';
import {connect} from 'react-redux';

class Form extends Component {
  render() {
    return <div className="panel-default col-xs-6 reg-form">
      <div className="row">
        <div className="form-group col-xs-6">
          <input type="email" className="form-control" id="inputEmail" placeholder="First name"/>
        </div>
        <div className="form-group col-xs-6">
          <input type="email" className="form-control" id="inputEmail" placeholder="Surname"/>
        </div>
      </div>
      <div className="form-group">
        <input type="email" className="form-control" id="email" placeholder="Email"/>
      </div>
      <div className="form-group">
        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
      </div>
      <div className="form-group">
        <input type="password" className="form-control" id="inputPassword" placeholder="Repeat password"/>
      </div>
      <button className="btn btn-success pull-right">Create an account</button>
    </div>
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  componentWillMount() {
    // this.props.getMainListActions();
  }

  setEmail() {
    this.setState({...this.state, email: this.refs.email.value});
  }

  setPassword() {
    this.setState({...this.state, password: this.refs.password.value});
  }

  logIn() {
    console.log('log', this.state);
  }

  render() {
    return <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading row">
          <div className="col-xs-6"><h2 className="m-t-no">Jogging app</h2></div>
          <div className="col-xs-6 auth-form text-right">
            <div className="form-group display-inline m-r-5">
              <input type="text" className="form-control" ref="email" placeholder="Email" onChange={this.setEmail.bind(this)}/>
            </div>
            <div className="form-group display-inline m-r-5">
              <input type="password" className="form-control" ref="password" placeholder="Password" onChange={this.setPassword.bind(this)}/>
            </div>
            <div className="form-group display-inline">
              <a className="btn btn-sm btn-success" onClick={this.logIn.bind(this)}>Log in</a>
            </div>
          </div>
        </div>
      </div>
      <Form/>
    </div>
  }
}

export default connect(
  state => ({
    main_list: state.main,
    content: state.content
  }),
  dispatch => ({
    /*        getMainListActions: () => {
     dispatch(getMainList());
     },
     getContentActions: (menu_id) => {
     dispatch(getContent(menu_id));
     },
     updateCards: (list)=> {
     dispatch(updateCards(list));
     }*/
  })
)(App);
