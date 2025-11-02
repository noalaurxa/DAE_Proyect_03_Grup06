import { Container } from 'react-bootstrap'; 
import HeroSection from '../components/home/HeroSection';
import PopularSection from '../components/home/PopularSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />

      <Container className="mt-5">
        <PopularSection />
      </Container>
    </>
  );
};

export default HomePage;