import styled from "styled-components";
import palette from "../../styles/palette";
import SearchRoomBar from "./searchRoomBar/SearchRoomBar";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;

  .home-search-bar-label {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 14px;
  }

  h2 {
    width: 800px;
    margin: 80px 0 60px;
    font-size: 50px;
    color: ${palette.cardinal};
  }
`

const Home: React.FC = () => {
  return (
    <Container>
      <p className='home-search-bar-label'>Accommodation</p>
      <SearchRoomBar />
      <h2>Let's explore with AirBnB.</h2>
    </Container>
  )
}

export default Home
