/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TextField from '@material-ui/core/TextField';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import slugify from 'slugify';
import { useCart, useDispatchCart } from '../components/CartContext';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utils/auth';

const checkoutStyles = css`
  display: flex;
  gap: 8rem;
  padding: 4rem 0;
  align-items: center;
  justify-content: center;
  hr {
    height: 1px;
    border-top: 1px solid gray;
  }
  .form-wrapper {
    margin-top: 1.5rem;
    flex-basis: 40%;

    form {
      display: flex;
      flex-direction: column;
      div {
        margin-bottom: 0.5rem;
        flex-basis: 50%;
      }
    }
    &__country {
      display: flex;
      justify-content: stretch;
      gap: 1rem;
    }
    &__city {
      display: flex;
      justify-content: stretch;
      gap: 1rem;
    }
  }

  .form-btn {
    align-self: flex-end;
    color: #fff;
    border-radius: 4px;
    background-color: #5252f2;
    font-weight: 500;
    margin-top: 13px;
    border: none;
    padding: 0.8rem 2.3rem;
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

  .cart-content {
    align-self: flex-start;
    &__header {
      display: flex;
      gap: 9.4rem;
      justify-content: flex-end;
    }
    .cart-item {
      display: grid;
      align-items: center;
      grid-template-columns: auto 1fr auto;
      -moz-column-gap: 1.5rem;
      column-gap: 1.5rem;
      margin: 1.5rem 0;

      img {
        width: 75px;
        height: 75px;
      }

      h4 {
        font-size: 0.85rem;
        text-transform: capitalize;
        letter-spacing: 0.1rem;
      }

      h5 {
        margin: 0.5rem 0;
        letter-spacing: 0.1rem;
      }
    }

    .item-amount {
      text-align: center;
      margin: 3px 0;
    }
  }
`;

const Checkout = () => {
  const cartState = useCart();
  const dispatch = useDispatchCart();
  const router = useRouter();

  function calculateTotal() {
    const sumPrice = cartState.cart.reduce((sum, cartItem) => {
      return sum + cartItem.price * cartItem.quantity;
    }, 0);

    return sumPrice;
  }

  return (
    <>
      <Head>
        <title>Checkout | 3D BUIG </title>
      </Head>
      <Layout>
        <div css={checkoutStyles}>
          <div className="form-wrapper">
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: 'CLEAR_CART', payload: '' });
                router.push('/thankyou');
              }}
            >
              <TextField
                data-cy="checkout-page-first-name-field"
                required
                name="first-name"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
              />
              <TextField
                data-cy="checkout-page-last-name-field"
                required
                name="last-name"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
              />
              <TextField
                data-cy="checkout-page-email-field"
                required
                name="email"
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
              />
              <div className="form-wrapper__country">
                <TextField
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Street"
                  variant="outlined"
                />
              </div>
              <div className="form-wrapper__city">
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Postcode"
                  variant="outlined"
                />
              </div>

              <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
              />
              <button
                data-cy="checkout-page-submit-button"
                className="form-btn"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="cart-content">
            <h2>PRODUCTS</h2>
            <hr />
            <div className="cart-content__header">
              <span>NAME</span>
              <span>QTY</span>
            </div>
            <hr />
            {cartState.cart.map((cartItem) => {
              return (
                <div key={cartItem.id} className="cart-item">
                  <img
                    src={`/productImages/${slugify(
                      cartItem.name.toLowerCase(),
                    )}.jpg`}
                    alt={cartItem.name}
                  />
                  <div>
                    <h4>{cartItem.name}</h4>
                    <h5>{cartItem.price * cartItem.quantity} €</h5>
                  </div>
                  <div>
                    <p className="item-amount">{cartItem.quantity} pcs</p>
                  </div>
                </div>
              );
            })}
            <hr />
            <div className="cart-footer">
              <h3>
                Your Total:{' '}
                <span className="cart-total">{calculateTotal()} €</span>
              </h3>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = nextCookies(context).token;
  const validToken = await isSessionTokenValid(token);

  if (!validToken) {
    return {
      redirect: {
        destination: '/login?returnTo=/checkout',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default Checkout;
