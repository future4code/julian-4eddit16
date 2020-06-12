import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CommentContent = styled.div`
    max-height: 250px;
    min-height: 200px;
    display: grid;
    grid-template-areas: 'side user'
                         'side container';
    grid-template-rows: 20% 80%;
    grid-template-columns: 5% 95%;


    border: 1px solid gray;
    border-radius: 5px;
    margin: 2.5%;
    background-color: whitesmoke;
`

export const VoteBar = styled.div`
    display: flex;
    grid-area: side;
    padding-top: 20%;
    align-items: center;
    flex-direction: column;
    background-color: #d9d9d9;
`
export const UpVote = styled(FontAwesomeIcon)`
    cursor: pointer;
` 

export const DownVote = styled(FontAwesomeIcon)`
    cursor: pointer;
` 

export const User = styled.div`
    display: flex;
    grid-area: user;
    padding-left: 2%;
    justify-content: right;
    align-items: center;
    background-color: #fcfcfc;
`

export const Content = styled.div`
    grid-area: container;
    padding-left: 4%;
    padding-right: 4%;
    cursor: pointer;

`

export const UserProfileImage = styled.img`
    max-width: 50px;
    border: 3px gray solid;
    border-radius: 50px;
    border-top-right-radius: 0;
`

export const Username = styled.h5`
    padding-left: 2%;
    color: gray;
`