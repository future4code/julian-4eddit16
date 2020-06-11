import React, { useEffect, useState } from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useForm from '../Hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';


import NavigationBar from '../NavigationBar/NavigationBar'

const Wrapper = styled.section`
    overflow: auto;
    background-color: #d9d9d9;
`

const Blau = styled.div`
    position: absolute;
    top: 90px;
    left: 0px;
    bottom: 10px;
    right: 16px;
    padding: 30px; 
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: orange; 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255,0,0,0.4); 
    }

    display: grid;
    grid-template-areas: 'navi navi navi' 
                         'a b c';
    grid-template-rows: 8% 92%;
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

const VoteBar = styled.div`
    display: flex;
    grid-area: side;
    padding-top: 20%;
    /**border: 1px solid red;*/
    align-items: center;
    flex-direction: column;
    background-color: #d9d9d9;
`
const UpVote = styled(FontAwesomeIcon)`
    cursor: pointer;
` 

const DownVote = styled(FontAwesomeIcon)`
    cursor: pointer;
` 



const User = styled.div`
    display: flex;
    grid-area: user;
    /**border: 1px solid yellow;*/
    padding-left: 2%;
    justify-content: right;
    align-items: center;
    background-color: #fcfcfc;
`

const Title = styled.div`
    grid-area: title;
    /**border: 1px solid green;*/
    padding-left: 8%;
    padding-right: 8%;
`

const Content = styled.div`
    grid-area: container;
    /**border: 1px solid blue;*/
    padding-left: 4%;
    padding-right: 4%;
    cursor: pointer;

`

const Comments = styled.div`
    grid-area: comments;
    /**border: 1px solid purple;*/
    text-align: right;
    padding-right: 4%;
    background-color: #fcfcfc;

`

const InputsForm = styled.div`
    
    display: flex;
    text-align: center;
`

const Input = styled.input`
    height: 30px;
    width: 80%;
`

const PrimaryButton = styled.button`
    
    width: 45%;
    font-size: large;
    color: black;
    background-color: orange;
`

const UserProfileImage = styled.img`
    max-width: 50px;
    border: 3px gray solid;
    border-radius: 50px;
    border-top-right-radius: 0;
`

const UserNamePost = styled.h5`
    padding-left: 2%;
    color: gray;
`

const FeedPage = () => {
    useProtectedPage();

    const history = useHistory();

    const { form, onChange } = useForm({ text: '', title: '' });
    const [ post, setPost ] = useState([]);
    
    const goToPostComments = (id) => {
        history.push(`/post/${id}`);
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const token = window.localStorage.getItem('token');
        try {
            const response = await axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
                headers: {
                    Authorization: token
                }
            });
            setPost(response.data.posts);
        } catch(e) {
                console.error(e);
        };
    };

    const createPost = async () => {
        const token = window.localStorage.getItem('token');
        try {
            const response = await axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', form, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            history.push('/');
        } catch (e) {
            alert('não foi possível postar');
        }
    };

    const vote = async (id, direction) => {
        const token = window.localStorage.getItem('token');
        try {
            const response = await axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/vote`, {
                direction: direction
            }, {
                headers: {
                    Authorization: token,
                    postId: id
                }
            });
            getPosts();
        } catch (e) {
            alert('não foi possível votar');
        }
    };

    let tela = post.lenght === 0?(
        <img src='https://www.mobility.com.br/b2c/wp-content/themes/basetheme/dist/images/loading.gif' />
    ) : (
        <Blau>
            <A />
        <B>
                <InputsForm>
                    <Input
                        value={form.title}
                        type='text'
                        name='title'
                        placeholder='Titulo'
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        value={form.text}
                        type='text'
                        name='text'
                        placeholder='Crie um post . . .'
                        onChange={handleInputChange}
                        required
                    />
                    <PrimaryButton onClick={createPost}>Criar</PrimaryButton>
                </InputsForm>
                {post && post.map(post => {
                    return (
                        <Post key={post.id}>
                                <User>
                                    <UserProfileImage src={`https://picsum.photos/25/25?random=${post.id}`} />
                                    <UserNamePost>4/{post.username}</UserNamePost>
                                </User>
                                <Title>
                                    <h4>{post.title}</h4>
                                </Title>
                                <Content onClick={() => goToPostComments(post.id)}>
                                    <p>{post.text}</p>
                                </Content>
                                <Comments>
                                    <p>💬 {post.commentsCount} {post.commentsCount > 1? 'Comments' : 'Comment' }</p>
                                </Comments>
                                <VoteBar>
                                    <UpVote
                                        icon={faArrowAltCircleUp}
                                        size='lg'
                                        color={post.userVoteDirection === 1? 'orange' : 'gray'}
                                        onClick={() => vote(post.id, +1)}
                                    />
                                    {/**<p>{post.userVoteDirection}</p>*/}
                                    <p>{post.votesCount}</p>
                                    <DownVote
                                        icon={faArrowAltCircleDown}
                                        size='lg'
                                        color={post.userVoteDirection === -1? 'orange' : 'gray'}
                                        onClick={() => vote(post.id, -1)}
                                    />
                                </VoteBar>
                        </Post>
                    )
                })}
            </B>
            <C />
            </Blau>
    );
    return (
        <Wrapper>
            <NavigationBar />
            
                {tela}
            
        </Wrapper>
    );
};

export default FeedPage;