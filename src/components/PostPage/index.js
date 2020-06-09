import React from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';
import { useHistory } from 'react-router-dom';

const PostPage = () => {
    useProtectedPage();

    const history = useHistory();
    
    const handleTologout = () => {
        window.localStorage.clear();
        history.push('/login');
    };
    
    return (
        <div>
            Post
            <button onClick={handleTologout}>logoff</button>
        </div>
    );
};

export default PostPage;