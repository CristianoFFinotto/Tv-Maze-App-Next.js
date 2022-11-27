import React from 'react';
import Button from '@mui/material/Button';

type PropsType = {
  variant?: 'text' | 'contained' | 'outlined';
  margin?: string;
  type?: any;
  style?: any;
  children: string;
  handleOnClick?: any;
};

const MyButton = (props: PropsType) => {
  return (
    <Button
      style={props.style}
      variant={props.variant}
      onClick={props.handleOnClick}
      sx={{ margin: props.margin }}
      type={props.type}
    >
      {props.children}
    </Button>
  );
};

export default MyButton;
