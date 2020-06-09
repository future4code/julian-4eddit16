import React from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';

const PostPage = () => {
    useProtectedPage();
    
    return (
        <div>
            Post
        </div>
    );
};

export default PostPage;