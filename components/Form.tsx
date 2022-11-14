import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MyButton from './MyButton';

export type Inputs = {
  email: string;
  password: string;
};

type propsType = {
  onSubmit: SubmitHandler<Inputs>;
  alertState: boolean;
  setAlertState: Dispatch<SetStateAction<boolean>>;
  errors?: string /* Errors during sign in or sign up */;
  verificationEmailSent?: boolean;
};

const Form = (props: propsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const catchErrorsValidation = (field: FieldError | undefined, type: string) => {
    let errorText = '';

    if (field?.type === 'required') errorText = 'field required!';

    if (type === 'email' && field?.type === 'pattern') errorText = 'email NOT valid!';

    if (type === 'password' && field?.type === 'pattern')
      errorText = `password need to contain at least: 
      one lowercase letter
      one uppercase letter
      one digit
      one special character
      eight characters long
      `;
    return errorText;
  };

  return (
    <Box
      component={'form'}
      autoComplete='on'
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      noValidate={true}
      onSubmit={handleSubmit(props.onSubmit)}
      maxWidth={'220px'}
    >
      <TextField
        sx={{ mb: 2 }}
        label='email'
        type={'email'}
        error={!!errors.email}
        helperText={catchErrorsValidation(errors.email, 'email')}
        {...register('email', {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        })}
      />
      <TextField
        sx={{ mb: 2 }}
        label='password'
        type={'password'}
        error={!!errors.password}
        helperText={catchErrorsValidation(errors.password, 'password')}
        {...register('password', {
          required: true,
          pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        })}
      />
      <MyButton variant='contained' margin='20px 0' type={'submit'}>
        Submit
      </MyButton>
      {props.verificationEmailSent ? (
        <Collapse in={props.alertState} sx={{ position: 'absolute', bottom: '4vh' }}>
          <Alert
            severity='info'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  props.setAlertState(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            <AlertTitle>Verification Email</AlertTitle>
            <strong>Verification link is send to your email!</strong>
          </Alert>
        </Collapse>
      ) : undefined}
      {props.errors ? (
        <Collapse in={props.alertState} sx={{ position: 'absolute', bottom: '4vh' }}>
          <Alert
            severity='error'
            action={
              <IconButton
                aria-label='close'
                size='small'
                onClick={() => {
                  props.setAlertState(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            <AlertTitle>Error</AlertTitle>
            <strong>{props.errors}</strong>
          </Alert>
        </Collapse>
      ) : undefined}
    </Box>
  );
};

export default Form;
