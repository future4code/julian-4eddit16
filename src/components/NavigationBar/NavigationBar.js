import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const NavigationBarWrapper = styled.nav`
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
    border-radius: 30px;
    border-top-right-radius: 0;
`

const NavigationBar = () => {

    const history = useHistory();

    const handleTologout = () => {
        window.localStorage.clear();
        history.push('/login');
    };

    return (
        <NavigationBarWrapper>
            <div>
                <Image src='https://avatars.slack-edge.com/2019-10-08/787705854592_d4dcaa8333ccc0c25ff0_512.png'/>
            </div>
            <button onClick={handleTologout}>❌</button>
        </NavigationBarWrapper>
    );
};

export default NavigationBar;