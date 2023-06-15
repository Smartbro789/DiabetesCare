import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const imageUrl = '';
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const handleChangeFile = () => {};
  const onClickRemoveImage = () => {};
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () =>{
      try{
          setLoading(true);
          const fields = {
              title,
              text
          }
          const {data} = await axios.post('/medicalnote', fields)

          const id = data._id;
          navigate(`/medicalnote/${id}`);
      }catch (err){
        console.warn(err);
        alert('Помилка при створенні запису')
      }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введіть текст',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(window.localStorage.getItem('token') && !isAuth){
      return <Navigate to="/"/>;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Назва нотатки"
        value={title}
        onChange={e =>setTitle(e.target.value)}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Надіслати
        </Button>
        <a href="/">
          <Button size="large">Скасувати</Button>
        </a>
      </div>
    </Paper>
  );
};
