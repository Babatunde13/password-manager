import NavbarComponent from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import hero1 from '../assets/illus8.jpg';
// import hero from '../assets/illus7.png';
import hero from '../assets/illus4.png';
// import hero from '../assets/illus3.png';


const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <Container style={{height : '70vh', display : 'flex', alignItems : 'center', justifyContent : 'center', overflow : 'hidden'}}>
        <img src={hero1} alt="" className='h-25 shadow-lg mx-2 ' style={{border : 'none', borderRadius : '15px'}}></img>
        <img src={hero} alt="" className='shadow-lg' style={{border : 'none', borderRadius : '15px', maxWidth : '90%', maxHeight : '75%'}}></img>
        <img src={hero1} alt="" className='h-25 shadow-lg mx-2 ' style={{border : 'none', borderRadius : '15px'}}></img>
      </Container>
      <p class="navbar fixed-bottom d-block w-100 m-0 text-center" style={{backgroundColor : "#d1e1f0e7"}} >Built with <FontAwesomeIcon icon={faHeart} className="text-danger" /> by <Link target="_blank" to={{ pathname: "https://twitter.com/bkoiki950"}}>Babatunde Koiki</Link> and <Link target="_blank" to={{ pathname: "https://twitter.com/AdewolzJ"}}>wolz-CODElife</Link></p>
    </div>
  )
}

export default Home