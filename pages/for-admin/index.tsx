/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  Material,
  useDispatchMaterials,
} from '../../components/MaterialsContext';
import { User } from '../../components/Nav';
import { Printer, useDispatchPrinters } from '../../components/PrintersContext';
import { server } from '../../config';
import { isSessionTokenValid } from '../../utils/auth';
import { getSessionByToken } from '../../utils/database';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface AdminProps {
  printersFetched: Printer[];
  materialsFetched: Material[];
  currentUser: User;
}

interface RowItem {
  id: string | number;
  name: string;
  price: number;
}

const tableStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  div {
    height: 70vh;
    width: 80vw;
  }
  .modify {
    &-edit {
      color: blue;
    }
    &-delete {
      color: red;
      background-color: transparent;
      border: none;
      cursor: pointer;
      outline: none;
    }
  }
`;

const Admin = ({
  printersFetched,
  materialsFetched,
  currentUser,
}: AdminProps) => {
  const dispatchMaterials = useDispatchMaterials();
  const dispatchPrinters = useDispatchPrinters();
  const [rows, setRows] = useState<RowItem[]>([]);
  const [printers, setPrinters] = useState<Printer[]>();
  const [materials, setMaterials] = useState<Material[]>();
  const router = useRouter();

  useEffect(() => {
    if (currentUser.admin === false) {
      alert('Permission denied');
      router.push('/');
    }
  }, [currentUser.admin, router]);

  useEffect(() => {
    if (printers && materials) {
      const printersRows: RowItem[] = printers.map((printer) => {
        return { id: printer.id, name: printer.name, price: printer.price };
      });

      const materialsRows: RowItem[] = materials.map((material) => {
        return { id: material.id, name: material.name, price: material.price };
      });
      setRows([...printersRows, ...materialsRows]);
    }
  }, [materials, printers]);

  useEffect(() => {
    dispatchMaterials({ type: 'SET_MATERIALS', payload: materialsFetched });
    dispatchPrinters({ type: 'SET_PRINTERS', payload: printersFetched });
    setMaterials(materialsFetched);
    setPrinters(printersFetched);
  }, [dispatchMaterials, dispatchPrinters, materialsFetched, printersFetched]);

  const classes = useStyles();
  if (currentUser.admin === false) {
    return (
      <Layout>
        <div />
      </Layout>
    );
  }
  if (rows.length > 0) {
    return (
      <>
        <Head>
          <title>Manage Products | 3D BUIG</title>
        </Head>
        <Layout>
          <div css={tableStyles}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width="10%">ID</TableCell>
                    <TableCell width="40%" align="right">
                      Name
                    </TableCell>
                    <TableCell width="20%" align="right">
                      Price (€)
                    </TableCell>
                    <TableCell width="10%" align="right" />
                    <TableCell width="10%" align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">
                        <Link href={'/for-admin/' + row.id}>
                          <a className="modify-edit">Edit</a>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <button
                          className="modify-delete"
                          onClick={() => {
                            axios
                              .delete('/api/products', {
                                data: { id: row.id },
                              })
                              .then((res) => {
                                if (res.status < 300) {
                                  setRows(
                                    rows.filter((currentRow) => {
                                      return currentRow.id !== row.id;
                                    }),
                                  );
                                }
                              })
                              .catch((e) => console.log(e));
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = nextCookies(context).token;
  if (!token) {
    return null;
  }
  const printersWithCompatibleMats = (await axios.get(`${server}/api/printers`))
    .data.printers;

  const materialsFetched = (await axios.get(`${server}/api/materials`)).data
    .materials;

  const validToken = await isSessionTokenValid(token);

  if (!validToken) {
    return {
      redirect: {
        destination: '/login?returnTo=/for-admin',
        permanent: false,
      },
    };
  }

  const session = await getSessionByToken(token);
  const { userId } = session;
  const currentUser = (await axios.get(`${server}/api/users/${userId}`)).data
    .user;

  return {
    props: {
      printersFetched: printersWithCompatibleMats,
      materialsFetched,
      currentUser,
    },
  };
}

export default Admin;
