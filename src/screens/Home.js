import NavbarComponent from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import hero from '../assets/illus2.jpg';


const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <Container>
        <img src={hero}></img>
      </Container>
    </div>
  )
}

export default Home