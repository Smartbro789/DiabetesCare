import React from "react";
import {useParams} from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const {id} = useParams();
    React.useEffect(() =>{
        axios.get(`/medicalnote/${id}`).then(res =>{
            setData(res.data);
            setLoading(false)
        }).catch((err)=>{
            console.warn(err);
            alert('Помилка при отриманні запису');
        });
    }, []);

    if(isLoading){
        return <Post isLoading={isLoading} isFullPost/>
    }
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        doctor={data.doctor}
        createdAt={data.createdAt}
        isFullPost
      >
        <p>
            {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
