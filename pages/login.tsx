/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import { useRouter } from 'next/dist/client/router';
import React, { ChangeEvent, useState } from 'react';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utils/auth';

type LoginProps = { redirectDestination: string };

const loginStyles = css`
  padding-top: 5rem;
  display: flex;
  justify-content: center;

  .form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 45vw;
    padding: 1rem 0 3rem 0;
    border-radius: 14px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    h1 {
      padding-bottom: 3rem;
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
        padding: 0.8rem 2rem;
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

const login = ({ redirectDestination }: LoginProps) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value } as any);
  };

  return (
    <Layout>
      <div css={loginStyles}>
        <div className="form-wrapper">
          <h1>Sign In</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post('/api/login', user)
                .then((res) => {
                  console.log(res);

                  const { success } = res.data;
                  if (!success) {
                    throw new Error();
                  } else {
                    router.push(redirectDestination);
                  }
                })
                .catch((error) => {
                  alert('Login failed!');
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
            />
            <TextField
              name="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={onChange}
              value={user.password}
            />
            <button>
              Login <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = nextCookies(context).token;
  const validToken = await isSessionTokenValid(token);

  const redirectDestination = context?.query?.returnTo ?? '/';

  if (validToken) {
    // alert('Already logged in!');
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { redirectDestination },
  };
}

export default login;
