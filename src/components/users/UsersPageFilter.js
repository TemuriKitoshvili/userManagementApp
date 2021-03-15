import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/users/UsersPageFilter.scss';
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

const UsersPageFilter = ({
  userGroupsForSelection,
  setOpenEditModal,
  setFilterUsersData,
  setSaveOrEdit,
}) => {
  const users = useSelector((state) => state.APIData.users);
  // filter states
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [active, setActive] = useState('');

  useEffect(() => {
    handleFilterUsersData();
  }, [username, fullName, email, group, active, users]);

  // Filters information with "or" condition
  const handleFilterUsersData = () => {
    if (!username && !fullName && !email && !group && !active) {
      return setFilterUsersData(users);
    }

    setFilterUsersData(
      users?.filter(
        (user) =>
          (username && username === user.username) ||
          (fullName && fullName === user.fullName) ||
          (email && email === user.email) ||
          (group &&
            user['userGroups']?.filter(
              (userGroup) => group === userGroup?.name
            )) ||
          (active === 'აქტიური' ? user.active === true : user.active === false)
      )
    );
  };

  // saves specific user's id and creates action "save"
  const handleAddUser = () => {
    setSaveOrEdit('save');
    setOpenEditModal(true);
  };

  // cleans the states
  const handleCleaning = () => {
    setUsername('');
    setFullName('');
    setEmail('');
    setGroup('');
    setActive('');
  };

  return (
    <div className='userPageFilter'>
      <TextField
        className='userPageFilter__username'
        label='მომხმარებელი'
        variant='outlined'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className='userPageFilter__fullname'
        label='მომხმარებელის სახელი'
        variant='outlined'
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        className='userPageFilter__email'
        label='ელ. ფოსტა'
        variant='outlined'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormControl className='userPageFilter__userGroup' variant='outlined'>
        <InputLabel id='demo-simple-select-outlined-label'>ჯგუფები</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          label='Age'
        >
          {userGroupsForSelection?.map((group) => (
            <MenuItem key={group.name} value={group.name}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className='userPageFilter__status' variant='outlined'>
        <InputLabel id='demo-simple-select-outlined-label'>სტატუსი</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={active}
          onChange={(e) => setActive(e.target.value)}
          label='Age'
        >
          <MenuItem key={'აქტიური'} value='აქტიური'>
            აქტიური
          </MenuItem>
          <MenuItem key={'არააქტიური'} value='არააქტიური'>
            არააქტიური
          </MenuItem>
        </Select>
      </FormControl>

      <Button variant='contained' onClick={handleCleaning}>
        <BiEraser /> გასუფთავება
      </Button>

      <Button variant='contained' onClick={handleAddUser}>
        <AiOutlinePlus /> დამატება
      </Button>
    </div>
  );
};

export default UsersPageFilter;
