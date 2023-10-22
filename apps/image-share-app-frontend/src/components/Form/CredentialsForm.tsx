import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../helpers/contexts/auth';
import { Input } from './Input';
import { getRandomInt } from '../../helpers/getRandomInt';
import { Button } from './Button';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const mOrF = getRandomInt(2);

export function CredentialsForm() {
  const navigate = useNavigate();
  const auth = useAuth();

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        // tosts are handled where axios call is made
        await auth.handleLogin(values);
        navigate('/image-stream');
        toast.success('User wurde erfolgreich eingeloggt!');
      } catch {
        toast.error('E-Mail und Passwort stimmen nicht überein! Versuchen Sie es nocheinmal!');
      }
    },
  });

  return (
    <div className="sm:max-w-sm max-w-[100vw] p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Login
      </h1>
      <form onSubmit={form.handleSubmit}>
        <Input
          id="email"
          type="email"
          label="E-Mail Adresse"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
          errors={form.touched.email && !!form.errors?.email}
          placeholder={mOrF === 0 ? 'max.mustermann@email.at' : 'erika.musterfrau@email.at'}
          errorMessage={form.errors.email}
        />
        <Input
          id="password"
          type="password"
          label="Passwort"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.password}
          errors={form.touched.password && !!form.errors?.password}
          placeholder="*********"
          errorMessage={form.errors.password}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
}
