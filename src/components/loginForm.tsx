// react and react dependencies
import * as React from 'react';
// helpers
import History from '../helpers/History';
// axios
import axios from 'axios';
// api
import { api } from '../api';

const icoUsername = require('../svg/ico-username.svg') as string;
const icoLock = require('../svg/ico-lock.svg') as string;

interface ILoginStates {
  username?: string;
  password?: string;
  error?: boolean;
}

interface ILoginProps {}

class LoginForm extends React.Component<ILoginProps, ILoginStates> {

  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    this.setState({
      error: false,
    });
    if (this.state.username !== '' && this.state.password !== '') {
      this.handleLogin();
    }
    e.preventDefault();
  }

  handleLogin() {
    const { username, password } = this.state;

    axios.post(`${api.url}/tokens`, { username, password })
    .then((response) => {
      if (typeof response.data.token !== 'undefined') {
        localStorage.setItem('authToken', response.data.token);
        History.push('/list');
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        this.setState({
          error: true,
        });
      }
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form__row">
          <input type="text" name="username" value={username} placeholder="Username" className="form__input" required onChange={this.handleChange} />
          <img src={icoUsername} className="form__ico form__ico--username" alt=""/>
        </div>
        <div className="form__row">
          <input type="password" name="password" value={password} placeholder="Password" className="form__input" required onChange={this.handleChange} />
          <img src={icoLock} className="form__ico form__ico--lock" alt=""/>
        </div>
        <button type="submit" className="form__submit">Log In</button>
        <div className={`text-center rounded-0 fixed-top alert alert-danger fade ${(this.state.error ? 'show' : 'hide')}`} role="alert">Sorry! wrong credentials</div>
      </form>
    );
  }
}

export default LoginForm;
