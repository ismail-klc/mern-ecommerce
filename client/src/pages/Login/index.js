import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { login } from '../../actions/auth.actions'
import Layout from '../../components/Layout'

function Login() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
  
    const handleLogin = (e) => {
      e.preventDefault()
      const user = {
        email:loginEmail, password:loginPassword
      }
  
      dispatch(login(user));
    }
  
    if (auth.authenticate) {
      console.log(history);
      return <Redirect to={`/`} />
    }

    return (
        <Layout>
            <section id="form" >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-1">
                            <div className="login-form">
                                <h2>Login to your account</h2>
                                <form onSubmit={handleLogin}>
                                    <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Email" />
                                    <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Password" />
                                    
                                    <button type="submit" className="btn btn-default">Login</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <h2 className="or">OR</h2>
                        </div>
                        <div className="col-sm-4">
                            <div className="signup-form">
                                <h2>New User Signup!</h2>
                                <form action="#">
                                    <input type="text" placeholder="Name" />
                                    <input type="email" placeholder="Email Address" />
                                    <input type="password" placeholder="Password" />
                                    <button type="submit" className="btn btn-default">Signup</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Login
