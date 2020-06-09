import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const MainLogin = styled.section`
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: #d9d9d9;
    justify-content: center;
    align-items: center;
`

const LoginContainer = styled.div`
    height:90%;
    width: 65%;
    border-radius: 5px;
    box-shadow: 5px 10px 10px #888888;
    background-color: whitesmoke;
`

const LoginPage = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const body = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login', body);
            
            localStorage.setItem('token', response.data.token);
            history.push('/');
        } catch (e) {
            alert('login e/ou senha, inválidos');
        };
    };
 
    return (
        <MainLogin>
            <LoginContainer>
                Login
                <input
                    value={email}
                    type='text'
                    placeholder='E-mail'
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                <input
                    value={password}
                    type='password'
                    placeholder='Senha'
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <button onClick={login}>logar</button>
            </LoginContainer>
        </MainLogin>
    );
};

export default LoginPage;