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
import Autocomplete from '@material-ui/lab/Autocomplete';
// icons
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEraser } from 'react-icons/bi';

const UsersPageFilter = ({
  userGroups,
  setOpenEditModal,
  username,
  setUsername,
  fullname,
  setFullname,
  email,
  setEmail,
  group,
  setGroup,
  active,
  setActive,
}) => {
  const handleCleaning = () => {
    setUsername('');
    setFullname('');
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
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
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
          {userGroups?.map((group) => (
            <MenuItem value={group.name}>{group.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className='userPageFilter__status' variant='outlined'>
        <InputLabel id='demo-simple-select-outlined-label'>ჯგუფები</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={active}
          onChange={(e) => setActive(e.target.value)}
          label='Age'
        >
          <MenuItem value={'აქტიური'}>{'აქტიური'}</MenuItem>
          <MenuItem value={'არააქტიური'}>{'არააქტიური'}</MenuItem>
        </Select>
      </FormControl>

      <Button variant='contained' onClick={handleCleaning}>
        <BiEraser /> გასუფთავება
      </Button>

      <Button variant='contained' onClick={() => setOpenEditModal(true)}>
        <AiOutlinePlus /> დამატება
      </Button>
    </div>
  );
};

export default UsersPageFilter;
