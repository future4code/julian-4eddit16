import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useForm from '../Hooks/useForm'
import useOnSession from '../Hooks/useOnSession';

const MainSignUp = styled.section`
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: #d9d9d9;
    justify-content: center;
    align-items: center;
`

const SignUpContainer = styled.div`
    height:90%;
    width: 65%;
    border-radius: 5px;
    box-shadow: 5px 10px 10px #888888;
    background-color: whitesmoke;
`

const SignUpPage = () => {
    useOnSession();

    const history = useHistory();

    const { form, onChange } = useForm({ email: '', password: '', username: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };

    const signUp = async () => {
        try {
            const response = await axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup', form);
            
            localStorage.setItem('token', response.data.token);
            history.push('/');
        } catch (e) {
            alert('Não foi possivel cadastrar');
        };
    };

    return (
        <MainSignUp>
            <SignUpContainer>
                SignUp
                <input
                    value={form.username}
                    type='text'
                    name='username'
                    placeholder='Nome de usuário'
                    onChange={handleInputChange}
                    required
                />
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
                <button onClick={signUp}>Sign Up</button>
            </SignUpContainer>
        </MainSignUp>
    );
};

export default SignUpPage;