import React from "react";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register,
        handleSubmit,
        formState:{errors, isValid}} = useForm({
        defaultValues:{
            email: '',
            password:'',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) =>{
        const data =await dispatch(fetchAuth(values));
        if(data.payload){
            return alert('Авторизація успішна')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };


    if (isAuth){
        return <Navigate to = "/"/>;
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід до акаунту
      </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                className={styles.field}
                label="E-Mail"
                error={Boolean(errors.email?.message)}
                helperText= {errors.email?.message}
                type="email"
                {...register('email', {required: 'Вкажіть пошту'})}
                fullWidth
            />
            <TextField
                className={styles.field}
                label="Пароль"
                error={Boolean(errors.password?.message)}
                helperText= {errors.password?.message}
                {...register('password', {required: 'Вкажіть пароль'})}
                fullWidth />
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                Увійти
            </Button>
        </form>
    </Paper>
  );
};
