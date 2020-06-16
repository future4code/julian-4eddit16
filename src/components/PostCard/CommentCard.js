import React from 'react';

import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import {
    CommentContent,
    VoteBar,
    UpVote,
    DownVote,
    User,
    UserProfileImage,
    Username,
    Content
    } from '../../styles/CommentCardStyle'

const CommentCard = (props) => {
    return ( 
        <CommentContent key={props.keyId}>
            <User>
                <UserProfileImage src={`https://picsum.photos/25/25?random=${props.photoId}`} />
                <Username>4/{props.username}</Username>
            </User>
            <Content>
                <p>{props.text}</p>
            </Content>
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
        </CommentContent>
    );
};

export default CommentCard;