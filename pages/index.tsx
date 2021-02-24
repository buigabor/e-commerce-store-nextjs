/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

const homeStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'printer page-text'
    'choose choose';
  .front {
    &-image {
      grid-area: printer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-wrapper {
      grid-area: page-text;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 24%,
        rgba(82, 82, 242, 0.85) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 6rem 3rem 3rem 3rem;
      &__sign-up {
        margin-right: 10px;
        background-color: #3535f5;
        box-shadow: none;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 0.8rem 2rem;
        font-size: 16px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        &:hover {
          background-color: #5151f1;
        }
      }
      &__btn-wrapper {
        position: relative;
        bottom: 4.5rem;
        display: flex;
        justify-content: flex-end;
      }
      &__login {
        background-color: rgba(255, 255, 255, 0.75);
        box-shadow: none;
        color: #3535f5;
        border: none;
        border-radius: 5px;
        padding: 0.8rem 2rem;
        font-size: 16px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        &:hover {
          background-color: rgba(255, 255, 255, 0.952);
        }
      }
      &__icon {
        color: #000;
        font-size: 60px;
        display: flex;
        align-items: center;
        span {
          transform: translateY(-12px);
          font-family: 'Syncopate', sans-serif;
        }
      }

      &__text {
        max-width: 420px;
        h2 {
          color: #000;
          font-size: 42px;
          margin: 0 0 40px 0;
          font-family: 'Syncopate', sans-serif;
        }

        p {
          color: gray;
          font-size: 18px;
          margin-bottom: 30px;
        }

        button {
          background-color: #5252f2;
          box-shadow: none;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 0.8rem 2rem;
          font-size: 16px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

          &:hover {
            background-color: #3535f5;
          }
        }
      }
      &__list {
        margin: 0;
        padding: 0;
        color: #000;
        list-style: none;
        li {
          svg {
            margin-right: 10px;
          }
        }
      }
    }
    &-choose-us {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 62%,
        rgba(82, 82, 242, 0.85) 100%
      );
      grid-area: choose;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__text {
        font-size: 2.8em;
        margin-bottom: 5rem;
      }
      &__row {
        display: flex;
        align-items: center;
        gap: 20rem;
        &-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 15rem;
          margin-bottom: 3rem;

          h5 {
            margin: 5px 0;
            font-size: 1.8em;
          }
          p {
            margin: 5px 0;
            font-size: 1em;
          }
        }
      }
    }
  }
`;

export default function Home() {
  return (
    <Layout>
      <div css={homeStyles}>
        <div className="front-image">
          <Image width={500} height={500} src="/3D-front-page.jpg" />
        </div>
        <div className="front-wrapper">
          <div className="front-wrapper__btn-wrapper">
            <Link href="/register">
              <button className="front-wrapper__sign-up">Sign Up</button>
            </Link>
            <Link href="/login">
              <button className="front-wrapper__login"> Login</button>
            </Link>
          </div>
          <div className="front-wrapper__icon">
            <Image src="/3Dlogo.svg" width={120} height={120} />
            <span>3D BUIG</span>
          </div>
          <div className="front-wrapper__text">
            <h2>Order custom parts online</h2>
            <p>
              On-demand manufacturing and rapid prototyping. Get your quote in
              seconds, parts delivered in days.
            </p>
            <Link href="/printers">
              <button>Go To Products</button>
            </Link>
          </div>
        </div>
        <div className="front-choose-us">
          <span className="front-choose-us__text">
            Our experience in numbers
          </span>
          <div className="front-choose-us__row">
            <div className="front-choose-us__row-box">
              <Image width={60} height={60} src="/icons/engineers.svg" />
              <h5>145,000</h5>
              <p>engineers served</p>
            </div>
            <div className="front-choose-us__row-box">
              <Image width={60} height={60} src="/icons/businesses.svg" />
              <h5>30,000</h5>
              <p>business</p>
            </div>
          </div>
          <div className="front-choose-us__row">
            <div className="front-choose-us__row-box">
              <Image width={60} height={60} src="/icons/mps.svg" />
              <h5>200</h5>
              <p>manufacturing partners</p>
            </div>
            <div className="front-choose-us__row-box">
              <Image width={60} height={60} src="/icons/parts.svg" />
              <h5>5M+</h5>
              <p>parts &amp; prototypes produced</p>
            </div>
          </div>
          <div className="front-choose-us__row">
            <div className="front-choose-us__row-box">
              <Image width={60} height={60} src="/icons/fortune500.svg" />
              <h5>27%</h5>
              <p>of Fortune 500 companies</p>
            </div>
            <div className="front-choose-us__row-box">
              <Image width={60} height={60} src="/icons/machines.svg" />
              <h5>4200+</h5>
              <p>machines</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
