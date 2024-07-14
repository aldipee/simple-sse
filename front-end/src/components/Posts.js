import React from 'react';
import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import { useGetFeedList, useLikeOrUnlikeFeed } from '../service/feed.service';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { getInitialsName } from '../utils/string';
import { getRelativeTime } from '../utils/date';

function Posts() {
  const { data, isLoading } = useGetFeedList();
  const { mutate: likeOrUnlikeFeed } = useLikeOrUnlikeFeed();

  const handleOnChangeLike = (isAlreadyLiked, feedId) => {
    likeOrUnlikeFeed({
      feed_id: feedId,
      is_liked: !isAlreadyLiked,
    });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div>
      {' '}
      {data?.data?.results.map((post) => (
        <Card sx={{ margin: 5 }} key={post.id}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'main' }} aria-label='recipe'>
                {getInitialsName(post.user_id.name)}
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVert />
              </IconButton>
            }
            title={post.user_id.name}
            subheader={getRelativeTime(post.created_at)}
          />
          <CardMedia component='img' height='10%' image={post.cover_image} alt='Paella dish' />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              {post.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites' onClick={() => handleOnChangeLike(post.is_liked, post.id)}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
                checked={post.is_liked}
              />
            </IconButton>
            <IconButton aria-label='share'>
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Posts;
