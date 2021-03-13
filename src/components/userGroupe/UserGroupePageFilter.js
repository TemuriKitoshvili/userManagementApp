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
import Autocomplete from '@material-ui/lab/Autocomplete';
// icons
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEraser } from 'react-icons/bi';

const UserGroupePageFilter = ({
  permissions,
  setOpenEditModal,
  name,
  setName,
  permission,
  setPermission,
  active,
  setActive,
}) => {
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
        <InputLabel id='demo-simple-select-outlined-label'>ჯგუფები</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          label='permissions'
        >
          {permissions?.map((permission) => (
            <MenuItem value={permission.name}>{permission.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className='userGroupePageFilter__status' variant='outlined'>
        <InputLabel id='demo-simple-select-outlined-label'>ჯგუფები</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={active}
          onChange={(e) => setActive(e.target.value)}
          label='status'
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

export default UserGroupePageFilter;
