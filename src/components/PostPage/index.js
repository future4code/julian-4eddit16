import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

import useProtectedPage from '../Hooks/useProtectedPage';
import useForm from '../Hooks/useForm';

import NavigationBar from '../NavigationBar/NavigationBar'
import CommentCard from '../PostCard/CommentCard'
import PostCard from '../PostCard/PostCard';

import {
    PageWrapper,
    PageContainer,
    LeftContent,
    MainContent,
    RightContent
    } from "../../styles/MainPageStyle";

const InputsForm = styled.div`
    display: grid;
    grid-template-areas: 'commentContent button';
    grid-template-columns: 8fr 2fr;
    background-color: gray;
    padding: 1%;
`

const InputText = styled.textarea`
    grid-area: commentContent;
   
`
const PrimaryButton = styled.button`
    grid-area: button;
    border: none;
    background-color: orange;
    font-weight: bold;
    color: white;
`

const PostPage = () => {
    useProtectedPage();

    const pathParams = useParams();

    const { form, onChange, clearForm } = useForm({text: ''});
    const [post, setPost] = useState({});
    const [comment, setComment] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };

    useEffect(() => {
        getPostDetail();
    }, []);

    const getPostDetail = async () =>{
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
    };

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
            clearForm();
            getPostDetail();
        } catch (e) {
            console.error(e);
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
            getPostDetail();
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
            getPostDetail();
        } catch (e) {
            alert('não foi possível votar');
        }
    };

    const commentsByKarma = comment.sort(function compare(a, b) {
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
                <PostCard 
                    keyId={post.id}
                    photoId={post.id}
                    username={post.username}
                    title={post.title}
                    text={post.text}
                    commentsColor={post.commentsCount}
                    commentsCount={post.commentsCount}
                    commentsCountPlural={post.commentsCount}
                    upVoteDirection={post.userVoteDirection}
                    handleUpVote={() => vote(post.id, +1)}
                    votesCount={post.votesCount}
                    downVoteDirection={post.userVoteDirection}
                    handleDownVote={() => vote(post.id, -1)}
                />
                <InputsForm>
                    <InputText
                        value={form.text}
                        type='text'
                        name='text'
                        placeholder='Comment'
                        onChange={handleInputChange}
                        required
                    />
                    <PrimaryButton onClick={createComment}>Comentar</PrimaryButton>
                </InputsForm>
                    {commentsByKarma.map(comment => (
                        <CommentCard
                            keyId={comment.id}
                            photoId={comment.id}
                            username={comment.username}
                            text={comment.text}
                            upVoteDirection={comment.userVoteDirection}
                            handleUpVote={() => voteComment(comment.id, +1)}
                            votesCount={comment.votesCount}
                            downVoteDirection={comment.userVoteDirection}
                            handleDownVote={() => voteComment(comment.id, -1)}
                        />
                    ))}
            </MainContent>
            <RightContent />
            </PageContainer>
        </PageWrapper>
    );
};

export default PostPage;