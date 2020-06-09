import React from 'react';
import useProtectedPage from '../Hooks/useProtectedPage';

const FeedPage = () => {
    useProtectedPage();
    
    return (
        <div>
            Feed
        </div>
    );
};

export default FeedPage;