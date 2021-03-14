import { useState } from 'react';
import '../../style/userGroupe/UserGroupeTable.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UserGroupeManagement from './UserGroupeManagement';
import UserGroupeDelete from './UserGroupeDelete';
// material-ui
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
// icons
import { GrStatusGoodSmall } from 'react-icons/gr';
import { FaUserEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';

const columns = [
  { id: 'id', label: 'იდენტიფიკატორი' },
  { id: 'name', label: 'ჯგუფის სახელი' },
  {
    id: 'userPermissionCodes',
    label: 'უფლებები',
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

const UserGroupeTable = ({
  userGroups,
  permissions,
  openEditModal,
  setOpenEditModal,
  openGroupeDeleteModal,
  setOpenGroupeDeleteModal,
  reload,
  setReload,
  saveOrEdit,
  setSaveOrEdit,
}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [permissionCodes, setPermissionCodes] = useState([]);
  const [userGroupId, setUserGroupId] = useState(null);
  const [userGroupIdForDelete, setUserGroupIdForDelete] = useState(null);

  const handleUserGroupEdit = (id) => {
    setOpenEditModal(true);
    setSaveOrEdit('edit');

    if (id) {
      setUserGroupId(id);
      axios
        .get(`userGroups/${id}`)
        .then((res) => {
          setName(res.data.name);
          setStatus(res.data.active);
          setPermissionCodes(res.data.userPermissionCodes);
        })
        .catch((err) =>
          noty(
            'მომხმარებლის ჯგუფის მონაცემების ჩატვირთვისას დაფიქსირდა შეცდომა',
            'error'
          )
        );
    }
  };

  const handleUserGroupDelete = (id) => {
    setOpenGroupeDeleteModal(true);
    if (id) {
      setUserGroupIdForDelete(id);
    }
  };

  return (
    <div className='UserGroupeTable'>
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
              {userGroups?.map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row?.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column?.id === 'id' && value}
                          {column?.id === 'name' && value}

                          {column.id === 'userPermissionCodes' &&
                            value?.map((permission, id) =>
                              value?.length - 1 === id
                                ? `${permission}. `
                                : `${permission}, `
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

                          {column.id === 'edit' && (
                            <FaUserEdit
                              onClick={() => handleUserGroupEdit(row.id)}
                            />
                          )}

                          {column.id === 'delete' && (
                            <MdDeleteSweep
                              onClick={() => handleUserGroupDelete(row.id)}
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
      </Paper>

      {/* modals */}
      <UserGroupeManagement
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        permissions={permissions}
        name={name}
        setName={setName}
        status={status}
        setStatus={setStatus}
        permissionCodes={permissionCodes}
        setPermissionCodes={setPermissionCodes}
        userGroupId={userGroupId}
        reload={reload}
        setReload={setReload}
        saveOrEdit={saveOrEdit}
      />

      <UserGroupeDelete
        openGroupeDeleteModal={openGroupeDeleteModal}
        setOpenGroupeDeleteModal={setOpenGroupeDeleteModal}
        userGroupIdForDelete={userGroupIdForDelete}
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

export default UserGroupeTable;
