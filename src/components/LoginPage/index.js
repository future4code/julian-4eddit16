import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import useForm from '../Hooks/useForm';
import useOnSession from '../Hooks/useOnSession';
import { MainPage, MainContainer, InputsForm, Image, Input, PrimaryButton} from '../../styles/LoginSignUp'

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
        <MainPage>
            <MainContainer>
                <InputsForm>
                    <Image src='https://avatars.slack-edge.com/2019-10-08/787705854592_d4dcaa8333ccc0c25ff0_512.png'/>
                    <h3>Sign in</h3>
                    <Input
                        value={form.email}
                        type='text'
                        name='email'
                        placeholder='E-mail'
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        value={form.password}
                        type='password'
                        name='password'
                        placeholder='Senha'
                        onChange={handleInputChange}
                        required
                    />
                    <PrimaryButton onClick={login}>SIGN IN</PrimaryButton>
                    <p>New to 4eddit?</p> <button onClick={goToSignUpPage}>SIGN UP</button>
                </InputsForm>
            </MainContainer>
        </MainPage>
    );
};

export default LoginPage;