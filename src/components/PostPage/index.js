import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useForm from '../Hooks/useForm';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import NavigationBar from '../NavigationBar/NavigationBar'

const Wrapper = styled.section`
    display: grid;
    grid-template-areas: 'navi navi navi' 
                         'a b c';
    grid-template-areas: 8% 92%;
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



const InputsForm = styled.div`
    text-align: center;
`

const Input = styled.input`
    height: 30px;
    width: 80%;
`

const PrimaryButton = styled.button`
    height: 10%;
    width: 45%;
    font-size: large;
`

const Post = styled.div`
    max-height: 250px;
    display: grid;
    grid-template-areas: 'side user'
                         'side title' 
                         'side container'
                         'side comments';
    grid-template-rows: 20% 20% 40% 20%;
    grid-template-columns: 1fr 9fr;


    border: 1px solid black;
    border-radius: 5px;
    margin: 2.5%;
    background-color: whitesmoke;
`

const VoteBar = styled.div`

    display: flex;
    grid-area: side;
    padding-top: 20%;
    /**
    border: 1px solid red;
    */
    
    align-items: center;
    flex-direction: column;
`

const User = styled.div`
    grid-area: user;
    /**
    border: 1px solid yellow;
    */
    
`

const Title = styled.div`
    grid-area: title;
    /**
    border: 1px solid green;
    */
    
`

const Content = styled.div`
    grid-area: container;
    /**
    border: 1px solid blue;
    */
    
`

const Comments = styled.div`
    grid-area: comments;
    /**
    border: 1px solid purple;
    */
    
`

const Comment = styled.div`
    max-height: 250px;
    display: grid;
    grid-template-areas: 'side user' 
                         'side container';
    grid-template-rows: 30% 70%;
    grid-template-columns: 1fr 9fr;


    border: 1px solid black;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    margin: 2.5%;
    margin-top: 0;
    margin-bottom: .5%;
    background-color: whitesmoke;
`

const PostPage = () => {
    useProtectedPage();

    const pathParams = useParams();

    const history = useHistory();

    const { form, onChange } = useForm({text: '', title: ''});
    const [post, setPost] = useState({});
    const [comment, setComment] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.id}`, {
            headers: {
                Authorization: token,
                postId: pathParams.id 
            }
        }).then(response => {
            setComment(response.data.post.comments);
            setPost(response.data.post);
        }).catch(err => {
            console.log(err)
        });
    }, []);

    const createComment = async () => {
        const token = window.localStorage.getItem('token');
        try {
            const response = await axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.id}/comment`, form, {
                headers: {
                    Authorization: token,
                    postId: pathParams.id 
                }
            });
            console.log(response.data);
        } catch (e) {
            alert('não foi possível comentar');
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
            console.log(response.data);
        } catch (e) {
            alert('não foi possível votar');
        }
    };


    const voteComment = async (id, direction) => {
        const token = window.localStorage.getItem('token');
        try {
            const response = await axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.id}/comment/${id}/vote`, {
                direction: direction
            }, {
                headers: {
                    Authorization: token,
                    postId: pathParams.id,
                    commentId: id
                }
            });
            console.log(response.data);
        } catch (e) {
            alert('não foi possível votar');
        }
    };

    let tela = post.lenght === 0?(
        <img src='https://www.mobility.com.br/b2c/wp-content/themes/basetheme/dist/images/loading.gif' />
    ) : (

            <B>
                <Post key={post.id}>
                                <User>
                                    <h6>4/{post.username}</h6>
                                </User>
                                <Title>
                                    <h4>{post.title}</h4>
                                </Title>
                                <Content>
                                    <p>{post.text}</p>
                                </Content>
                                <Comments>
                                    <p>💬 {post.commentsCount} {post.commentsCount > 1? 'Comments' : 'Comment' }</p>
                                </Comments>
                                <VoteBar>
                                    <FontAwesomeIcon
                                        icon={faArrowAltCircleUp}
                                        size='lg'
                                        color='gray'
                                        onClick={() => vote(post.id, +1)}
                                    />
                                    {/**<p>{post.voteCount}</p>*/}
                                    <p>{post.userVoteDirection}</p>
                                    <FontAwesomeIcon
                                        icon={faArrowAltCircleDown}
                                        size='lg'
                                        color='gray'
                                        onClick={() => vote(post.id, -1)}
                                    />
                                </VoteBar>
                        </Post>
                <div>
                    <input
                        value={form.text}
                        type='text'
                        name='text'
                        placeholder='Comentário'
                        onChange={handleInputChange}
                        required
                    />
                    <button onClick={createComment}>Comentar</button>
                </div>
                <div>
                    {comment.map(comment => (
                        <Comment key={comment.id}>
                            <User>
                                <p>4/{comment.username}</p>
                            </User>
                            
                            <Content>
                                <p>{comment.text}</p>
                            </Content>
                            {/*<p>{comment.createdAt}</p>*/}
                            
                            <VoteBar>
                                <FontAwesomeIcon
                                    icon={faArrowAltCircleUp}
                                    size='lg'
                                    color='gray'
                                    onClick={() => voteComment(comment.id, +1)}
                                />
                                {/**<p>{comment.userVoteDirection}</p>*/}
                                <p>{comment.votesCount}</p>
                                <FontAwesomeIcon
                                    icon={faArrowAltCircleDown}
                                    size='lg'
                                    color='gray'
                                    onClick={() => voteComment(comment.id, -1)}
                                />
                                </VoteBar>
                        </Comment>
                    ))}
                </div>
            </B>
    )
    
    return (
        <Wrapper>
            <NavigationBar />
            <A />
                {tela}
            <C />

        </Wrapper>
    );
};

export default PostPage;