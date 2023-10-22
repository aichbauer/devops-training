import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { CredentialsForm } from '../components/Form/CredentialsForm';

export function Login() {
  return (
    <Container>
      <Navigation />
      <Main>
        <CredentialsForm />
      </Main>
      <Footer />
    </Container>
  );
}
