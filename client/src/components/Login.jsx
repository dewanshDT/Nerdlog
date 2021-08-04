import React from 'react'
import googleLogo from '../assets/google.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { useHistory } from 'react-router-dom'

const Login = ({login}) => {
    const history = useHistory();

    const onClick = async (string) => {
        await login(string);
        history.push("/");
    }

    return (
        <div className="card login-page">
            <button type="button" className="btn login-btn google-login" onClick={() => onClick("google")}> 
                <img src={googleLogo} />
                <span>Sign in with Google</span>
            </button>
            <button type="button" className="btn login-btn github-login" onClick={() => onClick("github")}> 
                <FontAwesomeIcon icon={faGithub} />
                <span>Sign in with GitHub</span>
            </button>
        </div>
    )
}

export default Login
