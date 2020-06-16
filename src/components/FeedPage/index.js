import React, { useEffect, useState } from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useForm from '../Hooks/useForm';

import NavigationBar from '../NavigationBar/NavigationBar'
import PostCard from '../PostCard/PostCard'

import {
    PageWrapper,
    PageContainer,
    LeftContent,
    MainContent,
    RightContent
    } from "../../styles/MainPageStyle"

const InputsForm = styled.div`
    display: grid;
    grid-template-areas: 'title postContent button';
    grid-template-columns: 2fr 6fr 2fr;
    background-color: gray;
    padding: 1%;
`

const InputTitle = styled.input`
    grid-area: title;
`

const InputText = styled.textarea`
    grid-area: postContent;
   
`
const PrimaryButton = styled.button`
    grid-area: button;
    border: none;
    background-color: orange;
    font-weight: bold;
    color: white;
`

const FeedPage = () => {
    useProtectedPage();

    const history = useHistory();

    const { form, onChange, clearForm } = useForm({ text: '', title: '' });
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
            clearForm();
        } catch (e) {
            alert('não foi possível postar');
        }
    };
console.log(form)
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
            console.log(response.data)
            getPosts();
        } catch (e) {
            alert('não foi possível votar');
        }
    };

    const postsByKarma = post.sort(function compare(a, b) {
        if(a.votesCount > b.votesCount) return -1;
        if(a.votesCount < b.votesCount) return 1;
        return 0;
    });

    return (
        <PageWrapper>
            <NavigationBar />
            <PageContainer>
                <LeftContent />
                <MainContent>
                    <InputsForm>
                        <InputTitle
                            value={form.title}
                            type='text'
                            name='title'
                            placeholder='title'
                            onChange={handleInputChange}
                            required
                        />
                        <InputText
                            value={form.text}
                            type='text'
                            name='text'
                            placeholder='post content . . .'
                            onChange={handleInputChange}
                            required
                        />
                        <PrimaryButton onClick={createPost}>CREATE</PrimaryButton>
                    </InputsForm>
                    {postsByKarma && postsByKarma.map(post => {
                        return (
                            <PostCard 
                                keyId={post.id}
                                photoId={post.id}
                                username={post.username}
                                title={post.title}
                                text={post.text}
                                goTo={() => goToPostComments(post.id)}
                                commentsColor={post.commentsCount}
                                commentsCount={post.commentsCount}
                                commentsCountPlural={post.commentsCount}
                                upVoteDirection={post.userVoteDirection}
                                handleUpVote={() => vote(post.id, +1)}
                                votesCount={post.votesCount}
                                downVoteDirection={post.userVoteDirection}
                                handleDownVote={() => vote(post.id, -1)}
                            />
                        )
                    })}
                </MainContent>
                <RightContent />
            </PageContainer>
        </PageWrapper>
    );
};

export default FeedPage;