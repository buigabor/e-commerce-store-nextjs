/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  faCog,
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCart, useUpdateOverlay } from './PrintersContext';

const navStyles = css`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  color: #fff;
  height: 10vh;

  .logo {
    cursor: pointer;
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 30%;

    div {
      a {
        padding: 1.31rem 1rem;
        margin: 0 0.6rem;
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
      font-family: 'Syncopate', sans-serif;
    }
  }

  .cart {
    margin-right: 1rem;
    font-size: 20px;
    cursor: pointer;
    transform: translateX(-1rem);
    display: flex;
    align-items: center;
    svg {
      margin: 0 1.1rem;
    }
    &-items {
      position: absolute;
      top: -8px;
      right: 3.5rem;
      background: #5252f2;
      padding: 0 5px;
      border-radius: 30%;
      color: #fff;
      font-size: 0.85em;
    }
  }
  .nav-dropdown {
    position: absolute;
    z-index: 50;
    width: 12rem;
    top: 2rem;
    right: 1rem;
    background-color: #fff;
    color: rgb(66, 66, 66);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    &__row:not(:first-of-type) {
      border-top: 1px solid gray;
    }
    &__row {
      font-size: 0.8em;
      padding: 0.8rem 0 0.8rem 1rem;
      span {
        width: 100%;
      }
      svg {
        margin: 0;
        margin-right: 8px;
      }
    }
  }
`;

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  admin: boolean;
}

export const Nav = () => {
  const cartState = useCart();
  const toggleOverlay = useUpdateOverlay();
  const [profileClicked, setProfileClicked] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [logoutClicked, setLogoutClicked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    axios
      .get('/api/user')
      .then((res) => {
        const { user } = res.data;
        console.log('fetched');

        if (user) {
          return setCurrentUser(user);
        }
        if (res.status === 404) {
          alert('User or session not found');
        }
      })
      .catch((e) => console.log(e));
  }, [logoutClicked]);

  function calcTotalNumberOfItems() {
    const sumPrice = cartState?.cart?.reduce((quantity, cartItem) => {
      return quantity + cartItem.quantity;
    }, 0);

    return sumPrice;
  }

  return (
    <div css={navStyles}>
      <Link href="/">
        <div className="logo">
          <div className="logo-img">
            <Image width={60} height={60} src="/3Dlogo.svg" />
          </div>
          <span>3D BUIG</span>
        </div>
      </Link>
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
        <div>
          <FontAwesomeIcon
            icon={faShoppingCart}
            onClick={() => {
              toggleOverlay();
            }}
          />
          <div
            onClick={() => {
              toggleOverlay();
            }}
            className="cart-items"
          >
            {calcTotalNumberOfItems()}
          </div>
        </div>
        {hasMounted ? (
          currentUser ? (
            <>
              <div>
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => {
                    setProfileClicked(!profileClicked);
                  }}
                />
                <span>{currentUser.name}</span>
              </div>
              <div
                className="nav-dropdown"
                style={{ display: profileClicked ? 'inline-block' : 'none' }}
              >
                <div
                  className="nav-dropdown__row"
                  style={{
                    display: currentUser?.admin ? 'inline-block' : 'none',
                  }}
                >
                  <Link href="/for-admin">
                    <span>
                      <FontAwesomeIcon icon={faCog} /> Manage Products
                    </span>
                  </Link>
                </div>
                <div
                  className="nav-dropdown__row"
                  onClick={() => {
                    setProfileClicked(false);
                    alert('Logged out!');
                    router.push('/logout');
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faUser}
                onClick={() => {
                  router.push('/login');
                }}
              />
            </>
          )
        ) : null}
      </div>
    </div>
  );
};
