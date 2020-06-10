import React, { useEffect, useState } from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.section`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-areas: 'a b c';
    grid-template-columns: 1fr 2fr 1fr;
`

const A = styled.div`
    grid-area: a;
`

const B = styled.div`
    grid-area: b;
`

const C = styled.div`
    grid-area: c;
`

const Post = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    margin: 2.5%;
`

const FeedPage = () => {
    useProtectedPage();

    const history = useHistory();

    const [ post, setPost ] = useState([]);
    
    const handleTologout = () => {
        window.localStorage.clear();
        history.push('/login');
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
            headers: {
                Authorization: token
            }
        }).then(response => {
                setPost(response.data.posts);
        }).catch(err => {
                console.log(err);
        });
    }, []);

    return (
        <Wrapper>
            <A />
            <B>
                Feed
                <button onClick={handleTologout}>logoff</button>
                {post && post.map(post => {
                    return (
                        <Post key={post.id}>
                            <h6>{post.username}</h6>
                            <h4>{post.title}</h4>
                            <p>{post.text}</p>
                            <p>{post.voteCount} {post.userVoteDirection} | {post.commetsCount}</p>
                        </Post>
                    )
                })}
            </B>
            <C />
        </Wrapper>
    );
};

export default FeedPage;