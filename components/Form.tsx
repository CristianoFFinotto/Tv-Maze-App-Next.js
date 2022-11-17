import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MyButton from './MyButton';
import { InputAdornment, List, ListItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type Inputs = {
  email: string;
  password: string;
};

type propsType = {
  onSubmit: SubmitHandler<Inputs>;
  hasPasswordInput: boolean;
  alertState: boolean;
  setAlertState: Dispatch<SetStateAction<boolean>>;
  errors?: string /* Errors during sign in or sign up */;
  verificationEmailSent?: boolean;
};

const Form = (props: propsType) => {
  const [toggleShowPassword, setToggleShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const catchErrorsValidation = (field: FieldError | undefined, type: string) => {
    let errorText = '';

    if (field?.type === 'required') errorText = 'field required!';
    else if (type === 'email' && field?.type === 'pattern') errorText = 'email NOT valid!';

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
        sx={{ mb: 2, width: 220 }}
        label='email'
        type={'email'}
        error={!!errors.email}
        helperText={catchErrorsValidation(errors.email, 'email')}
        {...register('email', {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        })}
      />
      {props.hasPasswordInput ? (
        <TextField
          sx={{ mb: 2, width: 220 }}
          label='password'
          type={toggleShowPassword ? 'text' : 'password'}
          error={!!errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setToggleShowPassword(!toggleShowPassword)}
                  edge='end'
                >
                  {toggleShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={catchErrorsValidation(errors.password, 'password')}
          {...register('password', {
            required: true,
          })}
        />
      ) : undefined}

      <MyButton variant='contained' margin='20px 0' type={'submit'}>
        Submit
      </MyButton>
      <List sx={{ position: 'absolute', bottom: '0' }}>
        <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
          {props.verificationEmailSent ? (
            <Collapse in={props.alertState}>
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
                <AlertTitle>Info</AlertTitle>
                <strong>Verification link is send to your email!</strong>
              </Alert>
            </Collapse>
          ) : undefined}
        </ListItem>

        <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
          {props.errors ? (
            <Collapse in={props.alertState}>
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
        </ListItem>
      </List>
    </Box>
  );
};

export default Form;
