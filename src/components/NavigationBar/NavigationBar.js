import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const NavigationBarWrapper = styled.nav`
    width: 100;
    display: flex;
    grid-area: navi;
    min-height: 64px;
    background-color: #202020;
    align-items: center;
    justify-content: space-between;
    padding: 0.75%;
`

export const Image = styled.img`
    max-width: 50px;
    border: 3px orange solid;
    border-radius: 50px;
    border-top-right-radius: 0;
    cursor: pointer;
`

const Logout = styled.div`
    cursor: pointer;
`

const Div = styled.div`
    display: flex;
`

const Username = styled.h1`
    color: orange;
    margin-left: 10%;
`

const NavigationBar = () => {

    const history = useHistory();

    const goToFeed = () => {
        history.push('/');
    };

    const handleTologout = () => {
        window.localStorage.clear();
        history.push('/login');
    };

    const username = window.localStorage.getItem('username');

    return (
        <NavigationBarWrapper>
            <Div >
                <Image 
                    src='https://avatars.slack-edge.com/2019-10-08/787705854592_d4dcaa8333ccc0c25ff0_512.png'
                    onClick={goToFeed}
                />
                <Username>4/{username}</Username>
            </Div>
            <Logout>
                <FontAwesomeIcon 
                    icon={faPowerOff}
                    size='2x'
                    color='orange'
                    onClick={handleTologout}
                />
            </Logout>
        </NavigationBarWrapper>
    );
};

export default NavigationBar;