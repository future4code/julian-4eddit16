import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useOnSession from '../Hooks/useOnSession';
import useForm from '../Hooks/useForm';
import useApi from '../Hooks/useApi';

import ErrorBar from '../ErrorBar/ErrorBar'

import { 
    MainPage, 
    MainContainer, 
    InputsForm, 
    Image, 
    Input, 
    PrimaryButton} from '../../styles/LoginSignUp';


const LoginPage = () => {
    useOnSession();
    
    const api = useApi();
    
    const history = useHistory();

    const goToSignUpPage = () => {
        history.push('/signup');
    };

    const { form, onChange } = useForm({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };
/*
    const login = async () => {
        try {
            const response = await axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login', form);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username)
            history.push('/');
        } catch (e) {
            console.error(e);
            setErrorMsg(!errorMsg);
        };
    };
*/
    const login = async () => {
        try {
            let data
            const response = await api.post('login', form, data)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username);
            history.push('/');
        } catch (e) {
            console.error(e);
            setErrorMsg(!errorMsg);
        }
    };

    const toCloseErrorMsg = () => {
        setErrorMsg(!errorMsg);
    };

    return (
        <MainPage>
            { errorMsg ? (
                <ErrorBar 
                    msgError={'E-mail e/ou Senha incorretos'}
                    toClose={toCloseErrorMsg}
                /> 
            ): '' }
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
                        placeholder='Password'
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