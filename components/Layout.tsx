/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Nav } from './Nav';

const layoutStyles = css``;

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  );
}
