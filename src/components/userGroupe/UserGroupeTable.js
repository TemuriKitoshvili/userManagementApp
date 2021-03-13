import '../../style/userGroupe/UserGroupeTable.scss';
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

const rows = [
  {
    id: 1,
    name: 'ჯგუფი 1',
    userPermissionCodes: ['pirveli jgufi', 'meore jgufi'],
    createTime: '01/12/2021',
    lastUpdateTime: '02/03/2021',
    active: true,
  },
];

const UserGroupeTable = ({
  userGroups,
  setOpenEditModal,
  setOpenGroupeDeleteModal,
}) => {
  const classes = useStyles();

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
                              onClick={() => setOpenEditModal(true)}
                            />
                          )}

                          {column.id === 'delete' && (
                            <MdDeleteSweep
                              onClick={() => setOpenGroupeDeleteModal(true)}
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
