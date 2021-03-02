/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';

const aboutStyles = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2.4rem;

  a {
    color: blue;
  }
`;

const about = () => {
  return (
    <>
      <Head>
        <title>About | 3D BUIG </title>
      </Head>
      <Layout>
        <div css={aboutStyles}>
          <h1>About</h1>
          <p>
            This project was made by Gabriel Bui for the purpose of practising
            various web development technologies such as Next.js, React,
            Node.js, SQL database relations and queries and much more. <br />
            If you like what you see, please visit my github:
          </p>
          <a href="https://github.com/buigabor">https://github.com/buigabor</a>
          <p> See ya!</p>
        </div>
      </Layout>
    </>
  );
};

export default about;
