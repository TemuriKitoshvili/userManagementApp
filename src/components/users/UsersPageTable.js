import { useState } from 'react';
import '../../style/users/UsersPageTable.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UserManagement from './UserManagement';
import UserDelete from './UserDelete';
// material-ui
import {
  makeStyles,
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

const UsersPageTable = ({
  users,
  openEditModal,
  setOpenEditModal,
  openDeleteModal,
  setOpenDeleteModal,
  saveOrEdit,
  setSaveOrEdit,
  reload,
  setReload,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // userManagement states
  const [userUsername, setUserUsername] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [userGroups, setUserGroups] = useState([]);
  const [userId, setUserId] = useState('');
  const [userIdForDelete, setUserIdForDelete] = useState('');

  // console.log('userUsername', userUsername);
  // console.log('userFullName', userFullName);
  // console.log('userEmail', userEmail);
  // console.log('userPassword', userPassword);
  // console.log('userConfirmPassword', userConfirmPassword);
  // console.log('userGroups', userGroups);

  const handleUserEdit = (id) => {
    setOpenEditModal(true);
    setSaveOrEdit('edit');
    if (id) {
      setUserId(id);

      axios
        .get(`users/${id}`)
        .then((res) => {
          setUserUsername(res.data.username);
          setUserFullName(res.data.fullName);
          setUserEmail(res.data.email);
          setUserGroups(res.data.userGroups);
        })
        .catch((err) =>
          noty(
            'მომხმარებლის შესახებ ინფორმაციის ჩატვირთვისას დაფიქსირდა შეცდომა',
            'error'
          )
        );
    }
  };

  const handleUserDelete = (id) => {
    setOpenDeleteModal(true);
    if (id) {
      setUserIdForDelete(id);
    }
  };

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
                                onClick={() => handleUserEdit(row.id)}
                              />
                            )}

                            {column?.id === 'delete' && (
                              <MdDeleteSweep
                                onClick={() => handleUserDelete(row.id)}
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

      {/* modals */}
      <UserManagement
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        // stateControls
        userUsername={userUsername}
        setUserUsername={setUserUsername}
        userFullName={userFullName}
        setUserFullName={setUserFullName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userPassword={userPassword}
        setUserPassword={setUserPassword}
        userConfirmPassword={userConfirmPassword}
        setUserConfirmPassword={setUserConfirmPassword}
        userGroups={userGroups}
        setUserGroups={setUserGroups}
        userId={userId}
        saveOrEdit={saveOrEdit}
        reload={reload}
        setReload={setReload}
      />

      <UserDelete
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        userIdForDelete={userIdForDelete}
        reload={reload}
        setReload={setReload}
      />
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
