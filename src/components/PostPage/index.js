import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useForm from '../Hooks/useForm';

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
    
    const handleTologout = () => {
        window.localStorage.clear();
        history.push('/login');
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
        <div>
            <button onClick={handleTologout}>logoff</button>
            <div>
                <h6>4/{post.username}</h6>
                <h4>{post.title}</h4>
                <p>{post.text}</p>
                <p>{post.voteCount} {post.userVoteDirection} | {post.commentsCount}</p>
            </div>
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
                    <div key={comment.id}>
                        <p>
                            {comment.userVoteDirection}
                        </p>
                        <p>
                            {comment.id}
                        </p>
                        <p>
                            {comment.username}
                        </p>
                        <p>
                            {comment.text}
                        </p>
                        <p>
                            {comment.createdAt}
                        </p>
                        <p>
                            {comment.votesCount}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PostPage;