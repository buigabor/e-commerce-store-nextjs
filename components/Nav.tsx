/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const navStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  color: #fff;
  height: 10vh;

  .links {
    display: flex;
    align-items: center;
    flex-basis: 30%;

    div {
      a {
        padding: 21px 10px;
        margin: 0 10px;
        transition: all 0.25s ease-in-out;
        border-bottom: 3px solid transparent;
        &:hover {
          border-bottom: 3.2px solid #5252f2;
        }
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    &-img {
      position: relative;
      top: 7px;
    }
    color: #fff;
    margin-left: 10px;
    span {
      font-weight: 600;
    }
  }

  .cart {
    margin-right: 35px;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const Nav = () => {
  return (
    <div css={navStyles}>
      <div className="logo">
        <div className="logo-img">
          <Image width={60} height={60} src="/3Dlogo.svg" />
        </div>
        <span>3D BUIG</span>
      </div>
      <div className="links">
        <div>
          <Link href="/printers">
            <a> 3D Printers</a>
          </Link>
        </div>
        <div>
          <Link href="/materials">
            <a>Materials</a>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
      </div>
      <div className="cart">
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </div>
  );
};
