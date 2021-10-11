import { useState, FC } from 'react';
import Cookies from 'universal-cookie';

interface LoginProps {
  redirectPath: string;
}

const Login: FC<LoginProps> = ({ redirectPath }) => {
  const [password, setPassword] = useState('');
  const accessCookie = process.env.SITE_ACCESS_COOKIE;

  return (
    <form className="page-form">
      <div className="page-form__field">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <br />
        <br />
        <div className="page-form__control">
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="page-form__controls">
        <button
          type="submit"
          className="btn is-primary"
          onClick={(e) => {
            e.preventDefault();
            const cookies = new Cookies();
            cookies.set('src', password, {
              path: '/',
            });
            window.location.href = redirectPath ?? '/';
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
