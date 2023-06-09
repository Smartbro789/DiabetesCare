import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from "../axios";
import {useDispatch, useSelector} from "react-redux";
import { Post } from '../components/Post';
import {fetchMedicalNotes} from "../redux/slices/medicalNotes";

export const Home = () => {
    const dispatch = useDispatch();
    const {medicalnotes, tags}= useSelector(state => state.medicalnotes);
    const isMedicalNotesLoading = medicalnotes.status === 'loading';
    React.useEffect(() =>{
        dispatch(fetchMedicalNotes());
    }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isMedicalNotesLoading ?[...Array(5)]: medicalnotes.items).map((obj, index) => isMedicalNotesLoading ?
              <Post key ={index} isLoading={true}/>:(
                  <Post
                      id={obj._id}
                      title= {obj.title}
                      imageUrl= "https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blta401f2e7dad39503/620d844d9d54947c7f131b0a/illustration-industry-health.png"
                      user={obj.doctor}
                      createdAt={obj.createdAt}
                      tags={['react', 'fun', 'typescript']}
                      isEditable
                  />
              ),
          )}
        </Grid>
      </Grid>
    </>
  )
};
