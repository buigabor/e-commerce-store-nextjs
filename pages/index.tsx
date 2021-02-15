/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Layout from '../components/Layout';

const homeStyles = css`
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'printer page-text';
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
      padding: 50px;
      &__icon {
        color: #000;
        font-size: 60px;
      }
      &__text {
        max-width: 420px;
        h2 {
          color: #000;
          font-size: 42px;
          margin: 0 0 40px 0;
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
          <div className="front-wrapper__icon">
            <Image src="/3Dlogo.svg" width={120} height={120} />
          </div>
          <div className="front-wrapper__text">
            <h2>Order custom parts online</h2>
            <ul className="front-wrapper__list">
              <li>
                <FontAwesomeIcon icon={faArrowRight} /> FDM
              </li>
              <li>
                <FontAwesomeIcon icon={faArrowRight} /> SLA
              </li>
              <li>
                <FontAwesomeIcon icon={faArrowRight} /> SLS
              </li>
              <li>
                <FontAwesomeIcon icon={faArrowRight} /> DMLS
              </li>
            </ul>
            <p>
              On-demand manufacturing and rapid prototyping. Get your quote in
              seconds, parts delivered in days.
            </p>
            <button>Go To Products</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
