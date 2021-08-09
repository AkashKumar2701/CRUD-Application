import React from 'react';
import { Grid, CircularProgress, Typography,Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading){
    return (
      <div className={classes.noPosts}>
        <Paper elevation={4} fullWidth style={{padding:"5rem"}}>
            <Typography color='textPrimary' variant='contained' style={{fontSize:'4em'}}>No Posts Found</Typography>
        </Paper>
      </div>
    )
  }

  return (
    isLoading ?
    (
      <div className={classes.loading}>
           <CircularProgress size="7rem" style={{top:"50%",left:"50%"}} /> 
      </div>
    )
    : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
