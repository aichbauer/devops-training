import { useEffect, useState } from 'react';
import { readAllImages } from '../api/images/readAllImages';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { Navigation } from '../components/Navigation';

export function ImageStream() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await readAllImages();
      setImages(response.data.data);
    })();
  }, []);

  return (
    <Container>
      <Navigation />
      <Main>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Image Stream
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          {images?.length === 0 && <>Es gibt noch keine Bilder!</>}
          {images?.map((image) => {
            return (
              <img
                className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-[360px] h-[360px] object-cover rounded "
                src={`${process.env.BASE_API_URL!}${image.path}`}
                alt=""
              />
            );
          })}
        </div>
      </Main>
      <Footer />
    </Container>
  );
}
