import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useForm from '../Hooks/useForm';
import styled from 'styled-components';

import NavigationBar from '../NavigationBar/NavigationBar'

const Wrapper = styled.section`
    display: grid;
    grid-template-areas: 'navi navi navi' 
                         'a b c';
    grid-template-areas: 8% 92%;
    grid-template-columns: 1fr 2fr 1fr;
    background-color: #d9d9d9;

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
    background-color: whitesmoke;
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
    
    return (
        <Wrapper>
            <NavigationBar />
            <A />
            <B>
                <Post>
                    <h6>4/{post.username}</h6>
                    <h4>{post.title}</h4>
                    <p>{post.text}</p>
                    <p>{post.voteCount} {post.userVoteDirection} | {post.commentsCount}</p>
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
                        <Post key={comment.id}>
                            <p>{comment.userVoteDirection}</p>
                            <p>{comment.id}</p>
                            <p>{comment.username}</p>
                            <p>{comment.text}</p>
                            <p>{comment.createdAt}</p>
                            <p>{comment.votesCount}</p>
                        </Post>
                    ))}
                </div>
            </B>
            <C />

        </Wrapper>
    );
};

export default PostPage;