import { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import '../../style/users/UserManagement.scss';
// store
import { useDispatch, useSelector } from 'react-redux';
import { refreshTable } from '../redux/actions/actionCreators';
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
} from '@material-ui/core';
// icons
import { BiSave } from 'react-icons/bi';
import { CgCloseO } from 'react-icons/cg';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BsCheck, BsCheckAll, BsFileEarmarkPlus } from 'react-icons/bs';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

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
}) => {
  const userGroupsData = useSelector((state) => state.APIData.userGroups);
  const refresh = useSelector((state) => state.refresh);
  const dispatch = useDispatch();
  // tabs state
  const [value, setValue] = useState(0);
  // for checkbox states
  const [checkedNodes, setCheckedNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [userGroupsForUpload, setUserGroupsForUpload] = useState([]);

  // Receives information from user groups and converts it into information needed for the checkbox
  useEffect(() => {
    // generate Nodes
    const nodes = {
      value: 'მომხმარებლის ჯგუფები',
      label: 'მომხმარებლის ჯგუფები',
      children: [],
    };

    userGroupsData?.map(
      (groupData) =>
        (nodes.children = [
          ...nodes?.children,
          {
            value: groupData.name,
            label: groupData.name,
          },
        ])
    );

    setNodes([nodes]);
    // mark checkNodes
    setCheckedNodes(userGroups?.map((group) => group?.name));
  }, [userGroups, userGroupsData]);

  // build groups information from the selected groups from the checkbox
  useEffect(() => {
    let markedGroups = [];
    checkedNodes.map((node) =>
      userGroupsData.map(
        (groupData) => groupData.name === node && markedGroups.push(groupData)
      )
    );
    setUserGroupsForUpload(markedGroups);
  }, [checkedNodes]);

  // Receives information about the action and the user, makes the corresponding request of the action
  const handleUserSaveOrUpdate = (e) => {
    e.preventDefault();
    const user = {
      username: userUsername,
      fullName: userFullName,
      email: userEmail,
      active: true,
      password: userPassword,
      repeatPassword: userConfirmPassword,
      userGroups: userGroupsForUpload,
    };

    if (saveOrEdit === 'edit' && userId) {
      if (
        user.password.length > 0 &&
        user.repeatPassword.length > 0 &&
        user.password !== user.repeatPassword
      ) {
        setUserConfirmPassword('');
        return noty('პაროლები არ ემთხვევა', 'warning');
      }

      axios
        .put(`users/${userId}`, user)
        .then((res) => {
          setOpenEditModal(false);
          setUserUsername('');
          setUserFullName('');
          setUserPassword('');
          setUserConfirmPassword('');
          setUserEmail('');
          setUserGroups([]);
          dispatch(refreshTable(!refresh));
          noty('მომხმარებელის ინფორმაცია წარმატებით განახლდა', 'info');
        })
        .catch((err) =>
          err.response?.status === 400
            ? noty(err.response?.data?.message, 'warning')
            : noty('დაფიქსირდა შეცდომა', 'error')
        );
    }

    if (saveOrEdit === 'save') {
      if (user.password !== user.repeatPassword) {
        setUserConfirmPassword('');
        return noty('პაროლები არ ემთხვევა', 'warning');
      }

      axios
        .post(`users`, user)
        .then((res) => {
          dispatch(refreshTable(!refresh));
          setOpenEditModal(false);
          setUserUsername('');
          setUserFullName('');
          setUserPassword('');
          setUserConfirmPassword('');
          setUserEmail('');
          setUserGroups([]);
          noty('მომხმარებელი წარმატებით დაემატა', 'info');
        })
        .catch((err) =>
          err.response?.status === 400
            ? noty(err.response?.data?.message, 'warning')
            : noty('დაფიქსირდა შეცდომა', 'error')
        );
    }
  };

  // closes modals and cleaning the states
  const handleClose = () => {
    setOpenEditModal(false);
    setUserUsername('');
    setUserFullName('');
    setUserPassword('');
    setUserConfirmPassword('');
    setUserEmail('');
    setUserGroups([]);
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
            onSubmit={(e) => handleUserSaveOrUpdate(e)}
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
                <CheckboxTree
                  nodes={nodes}
                  checked={checkedNodes}
                  expanded={expandedNodes}
                  onCheck={(checked) => setCheckedNodes(checked)}
                  onExpand={(expanded) => setExpandedNodes(expanded)}
                  icons={{
                    check: <BsCheckAll />,
                    uncheck: <MdCheckBoxOutlineBlank />,
                    halfCheck: <BsCheck />,
                    expandClose: <IoIosArrowForward />,
                    expandOpen: <IoIosArrowDown />,
                    expandAll: <IoIosArrowDown />,
                    collapseAll: <IoIosArrowForward />,
                    parentClose: <FaFolder />,
                    parentOpen: <FaFolderOpen />,
                    leaf: <BsFileEarmarkPlus />,
                  }}
                />
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
