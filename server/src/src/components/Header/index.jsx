import React from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Ви впевнені, що хочете вийти?')){
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to ="/">
            <div>Diabetes Care</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to ="/add-medicalnote">
                  <Button variant="contained">Написати нотатку</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/Login">
                  <Button variant="outlined">Увійти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити акаунт лікаря</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
