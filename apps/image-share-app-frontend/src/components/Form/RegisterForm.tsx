import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Input } from './Input';
import { useAuth } from '../../helpers/contexts/auth';
import { CreateUser } from '../../api/auth/register';
import { getRandomInt } from '../../helpers/getRandomInt';
import { Button } from './Button';

const registerUser = {
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords need to match')
    .required(),
  userName: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
};

const registerSchema = yup.object().shape(registerUser);

const registerInitialValues: CreateUser = {
  email: '',
  password: '',
  confirmPassword: '',
  userName: '',
  firstName: '',
  lastName: '',
};

const mOrF = getRandomInt(2);

export function RegisterForm() {
  const navigate = useNavigate();
  const auth = useAuth();

  const form = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await auth.handleRegister(values as CreateUser);
        toast.success('User wurde erfolgreich registriert!');
        navigate('/register-user-photos');
      } catch {
        toast.error('User wurde nicht registriert! Versuchen Sie es nocheinmal!');
      }
    },
  });

  return (
    <div className="sm:max-w-sm max-w-[100vw] p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Registrieren
      </h1>
      <form className="max-w-[100vw] sm:max-w-md" onSubmit={form.handleSubmit}>
        <Input
          id="email"
          type="email"
          label="E-Mail Adresse"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
          errors={form.touched.email && !!form.errors?.email}
          placeholder={mOrF === 0 ? 'max.mustermann@email.com' : 'erika.musterfrau@email.com'}
          errorMessage={form.errors.email}
        />
        <Input
          id="userName"
          type="text"
          label="Username"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.userName}
          placeholder={mOrF === 0 ? 'Max86' : 'Erika007'}
          errors={form.touched.userName && !!form.errors?.userName}
          errorMessage={form.errors.userName}
        />
        <Input
          id="firstName"
          type="text"
          label="Vorname"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.firstName}
          placeholder={mOrF === 0 ? 'Max' : 'Erika'}
          errors={form.touched.firstName && !!form.errors?.firstName}
          errorMessage={form.errors.firstName}
        />
        <Input
          id="lastName"
          type="text"
          label="Familienname"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.lastName}
          placeholder={mOrF === 0 ? 'Mustermann' : 'Musterfrau'}
          errors={form.touched.lastName && !!form.errors?.lastName}
          errorMessage={form.errors.lastName}
        />
        <Input
          id="password"
          type="password"
          label="Passwort"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.password}
          placeholder="*********"
          errors={
            'password' in form.touched &&
            form.touched.password &&
            'password' in form.errors &&
            !!form.errors.password
          }
          errorMessage={'password' in form.errors && form.errors.password}
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Passwort bestätigen"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.confirmPassword}
          placeholder="*********"
          errors={
            'confirmPassword' in form.touched &&
            form.touched.confirmPassword &&
            'confirmPassword' in form.errors &&
            !!form.errors.confirmPassword
          }
          errorMessage={'confirmPassword' in form.errors && form.errors.confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}
