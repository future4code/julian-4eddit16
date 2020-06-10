import React, { useEffect, useState } from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useForm from '../Hooks/useForm';

const Wrapper = styled.section`

    display: grid;
    grid-template-areas: 'a b c';
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

    return (
        <Wrapper>
            <A />
            <B>
                Feed
                <button onClick={handleTologout}>logoff</button>
                <div>
                    <input
                        value={form.title}
                        type='text'
                        name='title'
                        placeholder='Titulo'
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        value={form.text}
                        type='text'
                        name='text'
                        placeholder='Crie um post . . .'
                        onChange={handleInputChange}
                        required
                    />
                    <button onClick={createPost}>Ciar</button>
                </div>
                {post && post.map(post => {
                    return (
                        <Post key={post.id}>
                            <div onClick={() => goToPostComments(post.id)}>
                                <h6>4/{post.username}</h6>
                                <h4>{post.title}</h4>
                                <p>{post.text}</p>
                                <p>{post.voteCount} {post.userVoteDirection} | {post.commentsCount}</p>
                            </div>
                            <button>^</button>
                            <button>v</button>
                        </Post>
                    )
                })}
            </B>
            <C />
        </Wrapper>
    );
};

export default FeedPage;