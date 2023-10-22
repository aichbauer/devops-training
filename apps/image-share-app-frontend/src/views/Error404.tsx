import { useNavigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Button } from '../components/Form/Button';
import { Main } from '../components/Main';
import { Navigation } from '../components/Navigation';
import { useAuth } from '../helpers/contexts/auth';

export function Error404() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <Navigation />
      <Main>
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div className="relative">
              <div className="absolute">
                <div className="">
                  <h1 className="my-2 text-gray-800 font-bold text-2xl">
                    Scheint als hätten Sie die Türe zum großen Nichts gefunden!
                  </h1>
                  <p className="my-2 text-gray-800">
                    Entschuldigen Sie das! Bitte besuchen Sie doch{' '}
                    {auth.token ? 'ihre Einkaufslisten' : 'unsere Homepage'} um dorthin zu kommen wo
                    Sie hin möchten.
                  </p>
                  <Button
                    color="green"
                    type="button"
                    onClick={() => navigate(auth.token ? '/shopping-lists' : '/')}
                  >
                    Bringen Sie mich da hin!
                  </Button>
                </div>
              </div>
              <div>
                <img alt="Error 404" src="https://i.ibb.co/G9DC8S0/404-2.png" />
              </div>
            </div>
          </div>
          <div>
            <img alt="Herausgezogener Stecker" src="https://i.ibb.co/ck1SGFJ/Group.png" />
          </div>
        </div>
      </Main>
      <Footer />
    </Container>
  );
}
