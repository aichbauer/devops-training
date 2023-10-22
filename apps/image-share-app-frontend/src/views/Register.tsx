import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { RegisterForm } from '../components/Form/RegisterForm';
import { Main } from '../components/Main';
import { Navigation } from '../components/Navigation';

export function Register() {
  return (
    <Container>
      <Navigation />
      <Main>
        <RegisterForm />
      </Main>
      <Footer />
    </Container>
  );
}
