import { useState } from 'react';
import '../../style/users/UserManagement.scss';
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

const UserManagement = ({ openEditModal, setOpenEditModal }) => {
  const [value, setValue] = useState(0);

  return (
    <div className='userManagement'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='editModal'
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditModal}>
          <div className='editModal__paper'>
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
                    required
                    variant='outlined'
                  />
                </div>
                <div>
                  <h4>სახელი</h4>
                  <TextField label='სახელი' required variant='outlined' />
                </div>
                <div>
                  <h4>ელ.ფოსტა</h4>
                  <TextField label='ელ.ფოსტა' required variant='outlined' />
                </div>
                <div>
                  <h4>პაროლი</h4>
                  <TextField label='პაროლი' required variant='outlined' />
                </div>
                <div>
                  <h4>პაროლის დადასტურება</h4>
                  <TextField
                    label='პაროლის დადასტურება'
                    required
                    variant='outlined'
                  />
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // onChange={handleChange}
                        name='checkedB'
                        color='primary'
                      />
                    }
                    label='მომხმარებლის ჯგუფები'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // onChange={handleChange}
                        name='checkedB'
                        color='primary'
                      />
                    }
                    label='ძირითადი ჯგუფი'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // onChange={handleChange}
                        name='checkedB'
                        color='primary'
                      />
                    }
                    label='ნახვის ჯგუფი'
                  />
                </FormGroup>
              </TabPanel>
            </div>

            <div className='editModal__buttons'>
              <Button variant='contained'>
                <BiSave /> შენახვა
              </Button>
              <Button variant='contained'>
                <CgCloseO /> დახურვა
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserManagement;
