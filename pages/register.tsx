/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { ChangeEvent, useState } from 'react';
import Layout from '../components/Layout';

interface User {
  username: string;
  password: string;
  email: string;
}

const registerStyles = css`
  padding-top: 5rem;
  display: flex;
  justify-content: center;

  .form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50vw;
    padding: 1rem 0 3rem 0;
    border-radius: 14px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    h1 {
      padding-bottom: 1.5rem;
      font-size: 2.5em;
    }

    form {
      display: flex;
      flex-direction: column;
      div {
        min-width: 25rem;
        margin-bottom: 8px;
      }
      button {
        align-self: flex-end;
        color: #fff;
        border-radius: 4px;
        background-color: #5252f2;
        font-weight: 500;
        margin-top: 13px;
        border: none;
        padding: 0.8rem 1.7rem;
        font-size: 1.1em;
        max-width: 250px;
        cursor: pointer;
        text-transform: uppercase;
        outline: none;
        pointer-events: all;
        transition: all 0.2s linear;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        &:hover {
          background-color: #3535f5;
        }
      }
    }
  }
`;

type RegisterProps = { token: string };

const register = ({ token }: RegisterProps) => {
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
    email: '',
  });
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value } as any);
  };

  return (
    <Layout>
      <div css={registerStyles}>
        <div className="form-wrapper">
          <h1>Create Your Account</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (user.password.length < 8) {
                return setPasswordError(true);
              }
              axios
                .post('/api/register', { ...user, token })
                .then((res) => {
                  alert('Registration successful');
                  router.push('/');
                })
                .catch((error) => {
                  if (error.response) {
                    if (error.response.status === 409) {
                      return alert('Username is already taken!');
                    }
                  }
                  return alert('Registration failed!');
                });
            }}
          >
            <TextField
              name="username"
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={onChange}
              value={user.username}
              required
            />
            <TextField
              name="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={onChange}
              value={user.email}
              required
            />
            <TextField
              error={passwordError ? true : false}
              name="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={onChange}
              value={user.password}
              type="password"
              required
              helperText="At least 8 characters."
            />

            <button>
              Sign Up <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  // Import and instantiate a CSRF tokens helper
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Create a CSRF token based on the secret
  const token = tokens.create(secret);
  return { props: { token } };
}

export default register;
