import { useState } from 'react';
import '../../style/userGroup/UserGroupTable.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UserGroupManagement from './UserGroupManagement';
import UserGroupDelete from './UserGroupDelete';
// table header
import { columns } from './UserGroupTableHeader';
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

const UserGroupTable = ({
  userGroups,
  permissions,
  openEditModal,
  setOpenEditModal,
  openGroupDeleteModal,
  setOpenGroupDeleteModal,
  saveOrEdit,
  setSaveOrEdit,
}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  // userGroupManagement states
  const [status, setStatus] = useState('');
  const [permissionCodes, setPermissionCodes] = useState([]);
  // id for save or edit
  const [userGroupId, setUserGroupId] = useState(null);
  // id for delete
  const [userGroupIdForDelete, setUserGroupIdForDelete] = useState(null);

  // user group edit handler: gets user group information from server and saves specific user groups's id, creates action "edit"
  const handleUserGroupEditInfo = (id) => {
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

  // user group delete handler: saves specific user groups's id
  const handleUserGroupDeleteInfo = (id) => {
    setOpenGroupDeleteModal(true);
    if (id) {
      setUserGroupIdForDelete(id);
    }
  };

  return (
    <div className='UserGroupTable'>
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
                              onClick={() => handleUserGroupEditInfo(row.id)}
                            />
                          )}

                          {column.id === 'delete' && (
                            <MdDeleteSweep
                              onClick={() => handleUserGroupDeleteInfo(row.id)}
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
      <UserGroupManagement
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
        saveOrEdit={saveOrEdit}
      />

      <UserGroupDelete
        openGroupDeleteModal={openGroupDeleteModal}
        setOpenGroupDeleteModal={setOpenGroupDeleteModal}
        userGroupIdForDelete={userGroupIdForDelete}
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

export default UserGroupTable;
