import { useState } from 'react';
import '../../style/users/UsersPageTable.scss';
// components
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
// icons
import { GrStatusGoodSmall } from 'react-icons/gr';
import { FaUserEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';

const columns = [
  { id: 'id', label: 'იდენტიფიკატორი' },
  { id: 'username', label: 'მომხმარებლის სახელი' },
  {
    id: 'fullName',
    label: 'სახელი',
    align: 'right',
  },
  {
    id: 'email',
    label: 'ელ. ფოსტა',
    align: 'right',
  },
  {
    id: 'userGroups',
    label: 'ჯგუფები',
    align: 'right',
  },
  {
    id: 'createTime',
    label: 'შექმნის თარიღი',
    align: 'right',
  },
  {
    id: 'lastUpdateTime',
    label: 'განახლების დრო',
    align: 'right',
  },
  {
    id: 'active',
    label: '',
    align: 'right',
  },
  {
    id: 'edit',
    label: '',
    align: 'right',
  },
  {
    id: 'delete',
    label: '',
    minWidth: 70,
    align: 'right',
  },
];

const rows = [
  {
    id: 1,
    username: 'temuri',
    fullName: 'temuri kitoshvili',
    email: 'temuri.kitoshvili@gmail.com',
    userGroups: ['pirveli jgufi', 'meore jgufi'],
    createTime: '01/12/2021',
    lastUpdateTime: '02/03/2021',
    active: true,
  },
];

const UsersPageTable = ({ users, setOpenEditModal, setOpenDeleteModal }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (e, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (e) => {
  //   setRowsPerPage(+e.target.value);
  //   setPage(0);
  // };

  return (
    <div className='userPageTable'>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {users
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row?.id}>
                      {columns.map((column) => {
                        const value = row[column?.id];
                        return (
                          <TableCell key={column?.id} align={column?.align}>
                            {column?.id === 'id' && value}
                            {column?.id === 'username' && value}
                            {column?.id === 'fullName' && value}
                            {column?.id === 'email' && value}

                            {column?.id === 'userGroups' &&
                              value?.map((groupe, id) =>
                                value?.length - 1 === id
                                  ? `${groupe?.name}. `
                                  : `${groupe?.name}, `
                              )}

                            {column?.id === 'createTime' &&
                              new Date(value).toLocaleString()}

                            {column?.id === 'lastUpdateTime' &&
                              new Date(value).toLocaleString()}

                            {column?.id === 'active' &&
                              (value ? (
                                <GrStatusGoodSmall style={{ color: 'green' }} />
                              ) : (
                                <GrStatusGoodSmall style={{ color: 'gray' }} />
                              ))}

                            {column?.id === 'edit' && (
                              <FaUserEdit
                                onClick={() => setOpenEditModal(true)}
                              />
                            )}

                            {column?.id === 'delete' && (
                              <MdDeleteSweep
                                onClick={() => setOpenDeleteModal(true)}
                              />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={users ? users?.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(e, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </Paper>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default UsersPageTable;
