import { useRef } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/Form/Button';
import { b64ToBlob } from '../helpers/b64ToBlob';
import { uploadImage } from '../api/images/uploadImage';

export function UploadImage() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  return (
    <Container>
      <Navigation />
      <Main>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Upload Image
        </h1>
        <>
          <div className="w-[360px] h-[360px]">
            <Webcam
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              width={360}
              height={360}
              minScreenshotWidth={360}
              minScreenshotHeight={360}
              mirrored={false}
              ref={webcamRef}
              videoConstraints={{
                facingMode: 'environment',
              }}
            />
          </div>
          <Button
            type="button"
            onClick={async () => {
              const imageSrc: string = webcamRef.current.getScreenshot();

              const formData = new FormData();
              const newImageBlob = b64ToBlob(imageSrc);
              formData.append('images', newImageBlob);

              try {
                await uploadImage(formData);
                navigate('/image-stream');

                toast.success('Ihr Bild wurde erfolgreich hochgeladen!');
              } catch (err) {
                console.error('error');
                console.error(err);
                alert('Ein Fehler ist aufgetreten, bitte versuchen Sie es nocheinmal!');
              }
            }}
          >
            Take a Snapshot
          </Button>
        </>
      </Main>
      <Footer />
    </Container>
  );
}
