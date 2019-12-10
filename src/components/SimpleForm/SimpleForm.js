import React, { Component } from 'react'
import './SimpleForm.css'

export default class SimpleForm extends Component {
  constructor (props) {
    super(props)
    this.regexps = {
      email: /^[0-9a-zA-Z.'_-]{4,32}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      username: /^[a-zA-Z0-9-_\.]{3,32}$/,
      password: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      phone: /^((\+380)+([0-9]){9})$/
    }
    this.state = {
      username: false,
      usernameErr: false,
      email: false,
      emailErr: false,
      password: false,
      passwordErr: false,
      confirmPassword: false,
      confirmPasswordErr: false,
      phone: false,
      phoneErr: false,
      isRegistered: false
    }
  }

  onChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value
    })
  }

  pattern = (name, err, regexp, desc) => {
    const match = name ? !name.match(regexp) : true
    console.log('matched?', match, 'name', name, 'err', err, 'regexp', regexp)
    if (name === '' || match) {
      this.setState({
        [err]: desc
      })
    } else {
      this.setState({
        [err]: false
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.pattern(this.state.username, 'usernameErr',this.regexps.username, 'Enter a valid username')
    this.pattern(this.state.email, 'emailErr', this.regexps.email, 'Enter a valid email address')
    this.pattern(this.state.password, 'passwordErr',this.regexps.password, 'Your password should be at least 8 characters long, contain uppercase and lowercase letters, numbers and special characters')
    this.pattern(this.state.phone, 'phoneErr',this.regexps.phone, 'Enter a valid Ukrainian phone number')
    if(this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordErr: 'Passwords should match'
      })
    } else {
      this.setState({
        confirmPasswordErr: false
      })
    }
    const { usernameErr, emailErr, passwordErr, phoneErr, confirmPasswordErr } = this.state
    if(!usernameErr && !emailErr && !passwordErr && !phoneErr && !confirmPasswordErr) {
      this.setState({
        isRegistered: true
      })
    } else {
      this.setState({
        isRegistered: false
      })
    }
  }
  render () {
    const { usernameErr, emailErr, passwordErr, phoneErr, confirmPasswordErr, isRegistered } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Simple Form</h1>
        <label htmlFor='username'>Username</label>
        <input type='text' placeholder='Enter Username' name='username' onChange={this.onChange}/>
        {usernameErr && <span>{usernameErr}</span>}
        <label htmlFor='email'>Email</label>
        <input type='text' placeholder='Enter Email' name='email' onChange={this.onChange}/>
        {emailErr && <span>{emailErr}</span>}
        <label htmlFor='password'>Password</label>
        <input type='password' placeholder='Enter Password' name='password' onChange={this.onChange}/>
        {passwordErr && <span>{passwordErr}</span>}
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={this.onChange}/>
        {confirmPasswordErr && <span>{confirmPasswordErr}</span>}
        <label htmlFor='phone'>Enter Phone</label>
        <input type='text' name='phone' placeholder='Enter Phone' onChange={this.onChange}/>
        {phoneErr && <span>{phoneErr}</span>}
        <button type='submit'>Register</button>
        {isRegistered && <div>You have successfully registered!</div>}
      </form>
    )
  }
}
