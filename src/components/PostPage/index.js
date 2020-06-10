/**import React, { useEffect } from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
    useProtectedPage();

    const history = useHistory();
    
    const handleTologout = () => {
        window.localStorage.clear();
        history.push('/login');
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/:postId`, {
            headers: {
                Authorization: token,
                postId: bleu 
            }
        })
    }, []);
    
    return (
        <div>
            Post
            <button onClick={handleTologout}>logoff</button>
        </div>
    );
};

export default PostPage;
*/