import styled from 'styled-components';

export const MainPage = styled.section`
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: #d9d9d9;
    justify-content: center;
    align-items: center;
`

export const MainContainer = styled.div`
    height:90%;
    width: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 5px 10px 10px #888888;
    background-color: whitesmoke;
    background-image: url('https://cdn4.vectorstock.com/i/1000x1000/18/38/tile-background-orange-black-and-grey-triangle-vector-8321838.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center center;
`

export const InputsForm = styled.div`
    height: 70%;
    width: 50%;
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.90);
    padding: 5%;
    align-items: center;
    border-radius: 5px;
`

export const Image = styled.img`
    max-width: 50px;
    border: 3px orange solid;
    border-radius: 30px;
    border-top-right-radius: 0;
    
`

export const Input = styled.input`
    height: 10%;
    width: 90%;
    margin-bottom: 5%;
`

export const PrimaryButton = styled.button`
    height: 10%;
    width: 45%;
    font-size: large;
`