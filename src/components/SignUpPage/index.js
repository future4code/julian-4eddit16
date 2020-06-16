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
    PrimaryButton} from '../../styles/LoginSignUp'

const SignUpPage = () => {
    useOnSession();

    const api = useApi();

    const history = useHistory();

    const { form, onChange } = useForm({ email: '', password: '', username: '' });
    const [errorMsg, setErrorMsg] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };

    const signUp = async () => {
        try {
            let data
            const response = await api.post('signup', form, data)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username);
            history.push('/');
        } catch (e) {
            console.error(e);
            setErrorMsg(!errorMsg);
        };
    };
/*
    const signUp = async () => {
        try {
            const response = await axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup', form);
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username);
            history.push('/');
        } catch (e) {
            console.error(e);
            setErrorMsg(!errorMsg);
        };
    };
*/
    const toCloseErrorMsg = () => {
        setErrorMsg(!errorMsg);
    };

    return (
        <MainPage>
            { errorMsg ? (
                <ErrorBar 
                    msgError={'Não foi possível cadastrar'}
                    toClose={toCloseErrorMsg}
                /> 
            ): '' }
            <MainContainer>
                <InputsForm>
                    <Image src='https://avatars.slack-edge.com/2019-10-08/787705854592_d4dcaa8333ccc0c25ff0_512.png'/>
                    <h3>Sign up</h3>
                    <Input
                        value={form.username}
                        type='text'
                        name='username'
                        placeholder='Nome de usuário'
                        onChange={handleInputChange}
                        required
                    />
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
                    <PrimaryButton onClick={signUp}>Sign Up</PrimaryButton>
                </InputsForm>
            </MainContainer>
        </MainPage>
    );
};

export default SignUpPage;