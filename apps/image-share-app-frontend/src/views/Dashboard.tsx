import { resetDatabaseTables } from '../api/databaseTables/reset';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Button } from '../components/Form/Button';
import { Main } from '../components/Main';
import { Navigation } from '../components/Navigation';
import { useAuth } from '../helpers/contexts/auth';

export function Dashboard() {
  const auth = useAuth();
  const tokenPayload = auth.getTokenPayload();

  return (
    <Container>
      <Navigation />
      <Main>
        {tokenPayload.role === 'admin' && (
          <Button
            type="button"
            color="red"
            onClick={async () => {
              await resetDatabaseTables();
            }}
          >
            Reset Database Tables
          </Button>
        )}
      </Main>
      <Footer />
    </Container>
  );
}
