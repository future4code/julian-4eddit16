import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PostContent = styled.div`
    max-height: 250px;
    min-height: 200px;
    display: grid;
    grid-template-areas: 'side user'
                         'side title' 
                         'side container'
                         'side comments';
    grid-template-rows: 20% 20% 40% 20%;
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
    /**border: 1px solid red;*/
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

export const CommentIcon = styled(FontAwesomeIcon)`
    padding-right: 0.75%;
`

export const User = styled.div`
    display: flex;
    grid-area: user;
    /**border: 1px solid yellow;*/
    padding-left: 2%;
    justify-content: right;
    align-items: center;
    background-color: #fcfcfc;
`

export const Title = styled.div`
    grid-area: title;
    /**border: 1px solid green;*/
    padding-left: 8%;
    padding-right: 8%;
`

export const Content = styled.div`
    grid-area: container;
    /**border: 1px solid blue;*/
    padding-left: 4%;
    padding-right: 4%;
    cursor: pointer;

`

export const Comments = styled.div`
    grid-area: comments;
    /**border: 1px solid purple;*/
    text-align: right;
    padding-right: 4%;
    background-color: #fcfcfc;

`

export const UserProfileImage = styled.img`
    max-width: 50px;
    border: 3px gray solid;
    border-radius: 50px;
    border-top-right-radius: 0;
`

export const UserNamePost = styled.h5`
    padding-left: 2%;
    color: gray;
`