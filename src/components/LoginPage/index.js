import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import useForm from '../Hooks/useForm';
import useOnSession from '../Hooks/useOnSession';

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
    useOnSession();

    const history = useHistory();

    const goToSignUpPage = () => {
        history.push('/signup');
    };

    const { form, onChange } = useForm({ email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };

    const login = async () => {
        try {
            const response = await axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login', form);

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
                    value={form.email}
                    type='text'
                    name='email'
                    placeholder='E-mail'
                    onChange={handleInputChange}
                    required
                />
                <input
                    value={form.password}
                    type='password'
                    name='password'
                    placeholder='Senha'
                    onChange={handleInputChange}
                    required
                />
                <button onClick={login}>logar</button>
                <button onClick={goToSignUpPage}>cadastrar</button>
            </LoginContainer>
        </MainLogin>
    );
};

export default LoginPage;