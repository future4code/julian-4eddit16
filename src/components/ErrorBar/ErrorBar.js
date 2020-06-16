import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorBarWrapper = styled.nav`
    height: 40px;
    width: 98%;
    display: flex;
    background-color: red;
    align-items: center;
    justify-content: space-between;
    padding: 0.75%;
    position: absolute;
    top: 0;
`

const CloseMsg = styled.div`
    cursor: pointer;
    margin-right: 2%;
`

const Msg = styled.div`
    display: flex;
    color: white;
    margin-left: 2%;
`

const ErrorBar = (props) => {
    return (
        <ErrorBarWrapper>
            <Msg>
                <h4>{props.msgError}</h4>
            </Msg>
            <CloseMsg>
                <FontAwesomeIcon 
                    icon={faTimesCircle}
                    size='2x'
                    color='white'
                    onClick={props.toClose}
                />
            </CloseMsg>
        </ErrorBarWrapper>
    );
};

export default ErrorBar;