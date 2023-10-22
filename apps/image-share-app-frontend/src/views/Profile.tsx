import { useEffect, useState } from 'react';
import { User } from '../api/auth/register';
import { readMe } from '../api/users/readMe';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { UpdateUserForm } from '../components/Form/UpdateUserForm';
import { Loading } from '../components/Loading';
import { Main } from '../components/Main';
import { Navigation } from '../components/Navigation';

export function Profile() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    (async () => {
      if (!user) {
        const response = await readMe();

        setUser(response?.data?.data?.[0] as User);
      }
    })();
  }, [user]);

  return (
    <Container>
      <Navigation />
      <Main>
        {!user && <Loading />}
        {user && (
          <div className="flex flex-col sm:flex-row">
            <UpdateUserForm user={user} />
          </div>
        )}
      </Main>
      <Footer />
    </Container>
  );
}
