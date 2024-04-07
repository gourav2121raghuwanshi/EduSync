import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard( {img, alt , title, desc, link}) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        alt={alt}
        height="340"
        image = {img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={link}><Button size="small">Continue</Button></a>
      </CardActions>
    </Card>
  );
}