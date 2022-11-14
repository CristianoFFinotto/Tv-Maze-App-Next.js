import Button, { ButtonClasses } from '@mui/material/Button';

type PropsType = {
  variant?: 'text' | 'contained' | 'outlined';
  margin?: string;
  type?: any;
  children: string;
  handleOnClick?: () => void;
};

const MyButton = (props: PropsType) => {
  return (
    <Button
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
