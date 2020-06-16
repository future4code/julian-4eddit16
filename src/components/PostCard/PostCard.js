import React from 'react';

import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

import {
    PostContent,
    VoteBar,
    UpVote,
    DownVote,
    CommentIcon,
    User,
    Title,
    UserProfileImage,
    UserNamePost,
    Comments,
    Content
    } from '../../styles/PostCardStyle'

const PostCard = (props) => {
    return ( 
        <PostContent key={props.keyId}>
        <User>
            <UserProfileImage src={`https://picsum.photos/25/25?random=${props.photoId}`} />
            <UserNamePost>4/{props.username}</UserNamePost>
        </User>
        <Title>
            <h4>{props.title}</h4>
        </Title>
        <Content onClick={props.goTo}>
            <p>{props.text}</p>
        </Content>
        <Comments>
            <CommentIcon
                icon={faCommentDots}
                size='lg'
                color={props.commentsColor === 0? 'gray' : 'orange'}
            />
            {props.commentsCount} {props.commentsCountPlural > 1? 'Comments' : 'Comment' }
        </Comments>
        <VoteBar>
            <UpVote
                icon={faArrowAltCircleUp}
                size='lg'
                color={props.upVoteDirection === 1? 'orange' : 'gray'}
                onClick={props.handleUpVote}
            />
            <p>{props.votesCount}</p>
            <DownVote
                icon={faArrowAltCircleDown}
                size='lg'
                color={props.downVoteDirection === -1? 'orange' : 'gray'}
                onClick={props.handleDownVote}
            />
        </VoteBar>
        </PostContent>
    );
};

export default PostCard;