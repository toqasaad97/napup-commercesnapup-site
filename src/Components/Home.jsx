import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      const movies = snapshot.docs.reduce(
        (acc, doc) => {
          const data = { id: doc.id, ...doc.data() };
          switch (data.type) {
            case "recommend":
              acc.recommend.push(data);
              break;
            case "new":
              acc.newDisney.push(data);
              break;
            case "original":
              acc.original.push(data);
              break;
            case "trending":
              acc.trending.push(data);
              break;
            default:
              break;
          }
          return acc;
        },
        { recommend: [], newDisney: [], original: [], trending: [] }
      );

      dispatch(setMovies(movies));
    });
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
