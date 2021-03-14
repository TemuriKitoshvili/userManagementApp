import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/userGroupe/UserGroupePageFilter.scss';
// material-ui
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
// icons
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEraser } from 'react-icons/bi';

const UserGroupePageFilter = ({
  permissions,
  setOpenEditModal,
  setFilterUserGroupData,
  setSaveOrEdit,
}) => {
  const userGroups = useSelector((state) => state.APIData.userGroups);
  // filterValues
  const [name, setName] = useState('');
  const [permission, setPermission] = useState('');
  const [active, setActive] = useState('');

  useEffect(() => {
    handleFilterUserGroupData();
  }, [name, permission, active, userGroups]);

  const handleFilterUserGroupData = () => {
    if (!name && !permission && !active) {
      return setFilterUserGroupData(userGroups);
    }

    setFilterUserGroupData(
      userGroups?.filter(
        (group) =>
          (name && name === group.name) ||
          (permission && group['userPermissionCodes'].includes(permission)) ||
          (active === 'აქტიური'
            ? group.active === true
            : group.active === false)
      )
    );
  };

  const handleAddUserGroup = () => {
    setOpenEditModal(true);
    setSaveOrEdit('save');
  };

  const handleCleaning = () => {
    setName('');
    setPermission('');
    setActive('');
  };

  return (
    <div className='userGroupePageFilter'>
      <TextField
        className='userGroupePageFilter__name'
        label='სახელი'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FormControl
        className='userGroupePageFilter__permission'
        variant='outlined'
      >
        <InputLabel id='demo-simple-select-outlined-label'>უფლებები</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          label='permissions'
        >
          {permissions?.map((permission) => (
            <MenuItem key={permission.code} value={permission.code}>
              {permission.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className='userGroupePageFilter__status' variant='outlined'>
        <InputLabel id='demo-simple-select-outlined-label'>სტატუსი</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={active}
          onChange={(e) => setActive(e.target.value)}
          label='status'
        >
          <MenuItem key={'აქტიური'} value='აქტიური'>
            {'აქტიური'}
          </MenuItem>
          <MenuItem key={'არააქტიური'} value='არააქტიური'>
            {'არააქტიური'}
          </MenuItem>
        </Select>
      </FormControl>

      <Button variant='contained' onClick={handleCleaning}>
        <BiEraser /> გასუფთავება
      </Button>

      <Button variant='contained' onClick={handleAddUserGroup}>
        <AiOutlinePlus /> დამატება
      </Button>
    </div>
  );
};

export default UserGroupePageFilter;
