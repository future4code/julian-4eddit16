import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useForm from '../Hooks/useForm';
import useOnSession from '../Hooks/useOnSession';

import { MainPage, MainContainer, InputsForm, Image, Input, PrimaryButton} from '../../styles/LoginSignUp'

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
        <MainPage>
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