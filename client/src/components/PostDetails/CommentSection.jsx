import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();
  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>

        <div className={classes.commentsInnerContainer} >
          <Typography gutterBottom variant="h6"><strong>Comments</strong></Typography>
          {comments?.length !== 0 ? comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]} : </strong>
              {c.split(':')[1]}
            </Typography>
          )) : <Typography gutterBottom variant='body2' ><strong>{user?.result?.name ? "No Comments" : "Login To Add A Comment"}</strong></Typography>}
          <div ref={commentsRef} />
        </div>
        <div className={classes.commentsInnerContainer2} >
          <Typography gutterBottom variant="h6"><strong>Write a comment</strong></Typography>
          <TextField fullWidth rows={4} variant="outlined" label={user?.result?.name ? "Comment" : "Login To Add A Comment"} multiline value={comment} onChange={(e) => setComment(e.target.value)} disabled={!user?.result?.name} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
