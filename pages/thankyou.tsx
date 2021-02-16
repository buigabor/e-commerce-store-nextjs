/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

const thankYouStyles = css`
  .thank-you {
    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6rem;
      background-color: #fff;
      position: relative;
      z-index: 2;
      height: 70vh;
      clip-path: polygon(
        100% 0,
        100% 90%,
        53% 90%,
        50% 100%,
        47% 90%,
        0 90%,
        0 0
      );
      &-span {
        color: #3030ec;
      }
      &-text {
        flex-basis: 40%;
        h1 {
          font-size: 3em;
          margin-bottom: 0.3rem;
        }
        h4 {
          margin-top: 0;
          font-weight: 500;
        }
        p {
          color: #757575;
        }
      }
    }
    &__options {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3.5rem;
      top: -30px;
      z-index: 1;
      background-color: #000;
      height: 50vh;
      padding-top: 3rem;
    }
    &__img {
      cursor: pointer;
      box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.54);
      display: flex;
      justify-content: center;
      align-items: center;

      width: 300px;
      height: 200px;
      align-items: center;
      color: #fff;
      transition: all 0.2s ease-in;
      h2 {
        font-weight: 400;
        cursor: pointer;
      }
      &:hover {
        transform: scale(1.05);
      }
      &-printers {
        background: url('/printerImages/thank-you-page-img.jpg');
        background-size: cover;
      }
      &-materials {
        background: url('/printerImages/thank-you-material.jpg');
        background-size: cover;
      }
      &-about {
        background: url('/printerImages/groot.jpg');
        background-size: cover;
      }
    }
  }
`;

const thankyou = () => {
  return (
    <Layout>
      <div css={thankYouStyles}>
        <div className="thank-you__header">
          <div>
            <Image
              width={500}
              height={300}
              src="/printerImages/thank-you-page-img.jpg"
            />
          </div>
          <div className="thank-you__header-text">
            <h1>Thank You!</h1>
            <h4>
              for choosing{' '}
              <span className="thank-you__header-span"> 3D BUIG</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati ea deleniti et quod repudiandae sit, vitae ad, commodi
              debitis nisi reiciendis fuga omnis nam magni qui, nostrum aliquam
              molestiae quasi.
            </p>
          </div>
        </div>
        <div className="thank-you__options">
          <Link href="/printers">
            <div className="thank-you__img thank-you__img-printers">
              <h2>BROWSE PRINTERS</h2>
            </div>
          </Link>
          <Link href="/materials">
            <div className="thank-you__img thank-you__img-materials">
              <h2>BROWSE MATERIALS</h2>
            </div>
          </Link>
          <Link href="/about">
            <div className="thank-you__img thank-you__img-about">
              <h2>ABOUT</h2>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default thankyou;
