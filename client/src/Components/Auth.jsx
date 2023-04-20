import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signupuser, signinuser } from "../Reducers/authReducer"
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const Auth = () => {
    const { loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [auth, setAuth] = useState("Sign In")

    const authenticate = (e) => {
        e.preventDefault();
        if (auth === "Sign In") {
            dispatch(signinuser({
                email, password
            }))
        }
        else {
            dispatch(signupuser({
                email,
                password
            }))

        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ height: "100vh" }} >

                    {loading &&
                        <Spinner animation="grow" />

                    }
                    <div className="col-md-6">
                        <Form>
                            <h1>Please {auth}</h1>

                            {
                                error &&
                                <h5>{error}</h5>
                            }
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" />
                            </Form.Group>

                            <Button onClick={authenticate} variant="primary" type="submit">
                                {auth}
                            </Button>
                        </Form>

                        {
                            auth == "Sign In" ?
                                <h6 onClick={() => setAuth("Sign Up")}> dont have an account</h6> :
                                <h6 onClick={() => setAuth("Sign In")}> Already have an account</h6>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth