import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import React from 'react';
import { deleteSessionByToken } from '../utils/database';

const logout = () => {
  return (
    <>
      <Head>
        <title>Logout | 3D BUIG </title>
      </Head>
      <div />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  await deleteSessionByToken(token);

  // Remove the cookie
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export default logout;
