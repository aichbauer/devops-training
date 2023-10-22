import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { Navigation } from '../components/Navigation';

export function Home() {
  return (
    <Container>
      <Navigation />
      <Main>Home</Main>
      <Footer />
    </Container>
  );
}
