import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/users/UserManagement.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// material-ui
import TabPanel from '../material-ui/TabPanel';
import {
  Modal,
  Backdrop,
  Fade,
  AppBar,
  Tabs,
  Tab,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
// icons
import { BiSave } from 'react-icons/bi';
import { CgCloseO } from 'react-icons/cg';

const UserManagement = ({
  openEditModal,
  setOpenEditModal,
  userUsername,
  setUserUsername,
  userFullName,
  setUserFullName,
  userEmail,
  setUserEmail,
  userPassword,
  setUserPassword,
  userConfirmPassword,
  setUserConfirmPassword,
  userGroups,
  setUserGroups,
  userId,
  saveOrEdit,
  reload,
  setReload,
}) => {
  const userGroupsData = useSelector((state) => state.APIData.userGroups);
  const [value, setValue] = useState(0);
  const [disabledCheckbox, setDisabledCheckbox] = useState(false);

  const handleUserUpdate = (e) => {
    e.preventDefault();
    const user = {
      username: userUsername,
      fullName: userFullName,
      email: userEmail,
      active: true,
      password: userPassword,
      repeatPassword: userConfirmPassword,
      userGroups: userGroups,
    };

    if (saveOrEdit === 'edit' && userId) {
      axios
        .put(`users/${userId}`, user)
        .then((res) => {
          setOpenEditModal(false);
          setUserUsername('');
          setUserFullName('');
          setUserPassword('');
          setUserConfirmPassword('');
          setUserEmail('');
          setUserGroups('');
          setReload(!reload);
          noty('მომხმარებელის ინფორმაცია წარმატებით განახლდა', 'info');
        })
        .catch((err) => noty(err.message, 'error'));
    }

    if (saveOrEdit === 'save') {
      axios
        .post(`users`, user)
        .then((res) => {
          setOpenEditModal(false);
          setUserUsername('');
          setUserFullName('');
          setUserPassword('');
          setUserConfirmPassword('');
          setUserEmail('');
          setUserGroups('');
          setReload(!reload);
          noty('მომხმარებელი წარმატებით დაემატა', 'info');
        })
        .catch((err) => noty(err.message, 'error'));
    }
  };

  const handleClose = () => {
    setOpenEditModal(false);
    setUserUsername('');
    setUserFullName('');
    setUserPassword('');
    setUserConfirmPassword('');
    setUserEmail('');
    setUserGroups('');
  };

  return (
    <div className='userManagement'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='editModal'
        open={openEditModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditModal}>
          <form
            className='editModal__paper'
            onSubmit={(e) => handleUserUpdate(e)}
          >
            <div className='editModal__title'>
              <h2>მომხმარებლის მართვა</h2>
            </div>
            <div className='editModal__tabs'>
              <AppBar position='static'>
                <Tabs
                  value={value}
                  onChange={(e, newValue) => setValue(newValue)}
                  aria-label='simple tabs example'
                >
                  <Tab label='მომხმარებელი' />
                  <Tab label='მომხმარებლის ჯგუფები' />
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <div>
                  <h4>მომხმარებლის სახელი</h4>
                  <TextField
                    label='მომხმარებლის სახელი'
                    required={saveOrEdit !== 'edit'}
                    variant='outlined'
                    value={userUsername}
                    onChange={(e) => setUserUsername(e.target.value)}
                  />
                </div>
                <div>
                  <h4>სახელი</h4>
                  <TextField
                    label='სახელი'
                    required={saveOrEdit !== 'edit'}
                    variant='outlined'
                    value={userFullName}
                    onChange={(e) => setUserFullName(e.target.value)}
                  />
                </div>
                <div>
                  <h4>ელ.ფოსტა</h4>
                  <TextField
                    label='ელ.ფოსტა'
                    required={saveOrEdit !== 'edit'}
                    variant='outlined'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div>
                  <h4>პაროლი</h4>
                  <TextField
                    label='პაროლი'
                    type='password'
                    required={saveOrEdit !== 'edit'}
                    variant='outlined'
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
                <div>
                  <h4>პაროლის დადასტურება</h4>
                  <TextField
                    label='პაროლის დადასტურება'
                    type='password'
                    required={saveOrEdit !== 'edit'}
                    variant='outlined'
                    value={userConfirmPassword}
                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                  />
                </div>
              </TabPanel>
              {/* second tab */}
              <TabPanel value={value} index={1}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name='checkedB'
                        color='primary'
                        checked={userGroups?.length === userGroupsData?.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserGroups(userGroupsData);
                            setDisabledCheckbox(true);
                          } else {
                            setUserGroups([]);
                            setDisabledCheckbox(false);
                          }
                        }}
                      />
                    }
                    label='მომხმარებლის ჯგუფები'
                  />
                  {userGroupsData?.map((groupeData) => (
                    <FormControlLabel
                      key={groupeData?.name}
                      control={
                        <Checkbox
                          name='checkedB'
                          color='primary'
                          value={groupeData.id}
                          disabled={disabledCheckbox}
                          onChange={(e) =>
                            e.target.checked
                              ? setUserGroups([...userGroups, groupeData])
                              : setUserGroups(
                                  userGroups.filter(
                                    (group) => group?.id === e.target.value
                                  )
                                )
                          }
                        />
                      }
                      label={groupeData?.name}
                    />
                  ))}
                </FormGroup>
              </TabPanel>
            </div>

            <div className='editModal__buttons'>
              <Button type='submit' variant='contained'>
                <BiSave /> შენახვა
              </Button>
              <Button variant='contained' onClick={handleClose}>
                <CgCloseO /> დახურვა
              </Button>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserManagement;
