import { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import '../../style/userGroupe/UserGroupeManagement.scss';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// material-ui
import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@material-ui/core';
// icons
import { BiSave } from 'react-icons/bi';
import { CgCloseO } from 'react-icons/cg';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BsCheck, BsCheckAll, BsFileEarmarkPlus } from 'react-icons/bs';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const UserGroupeManagement = ({
  openEditModal,
  setOpenEditModal,
  permissions,
  name,
  setName,
  status,
  setStatus,
  permissionCodes,
  setPermissionCodes,
  userGroupId,
  reload,
  setReload,
  saveOrEdit,
}) => {
  const [checkedNodes, setCheckedNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setCheckedNodes(permissionCodes);
  }, [permissionCodes]);

  useEffect(() => {
    if (permissions) {
      setNodes(
        permissions?.map((permission) => ({
          value: permission.code,
          label: permission.code,
        }))
      );
    }
  }, [permissions]);

  const handleUserGroupUpdate = (e) => {
    e.preventDefault();
    console.log('submit');
    const userGroup = {
      name: name,
      active: status,
      userPermissionCodes: checkedNodes,
    };

    if (saveOrEdit === 'edit' && userGroupId) {
      axios
        .put(`userGroups/${userGroupId}`, userGroup)
        .then((res) => {
          setOpenEditModal(false);
          setName('');
          setStatus('');
          setPermissionCodes([]);
          setReload(!reload);
          noty('მომხმარებელის ჯგუფის ინფორმაცია წარმატებით განახლდა', 'info');
        })
        .catch((err) => noty(err.message, 'error'));
    }

    if (saveOrEdit === 'save') {
      axios
        .post('userGroups', userGroup)
        .then((res) => {
          setOpenEditModal(false);
          setName('');
          setStatus('');
          setPermissionCodes([]);
          setReload(!reload);
          noty('მომხმარებელის ჯგუფი წარმატებით დაემატა', 'info');
        })
        .catch((err) => noty(err.message, 'error'));
    }
  };

  const handleModalClose = () => {
    setOpenEditModal(false);
    setName('');
    setStatus('');
    setPermissionCodes([]);
  };

  return (
    <div className='userGroupeManagement'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='groupeEditModal'
        open={openEditModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditModal}>
          <form
            className='groupeEditModal__paper'
            onSubmit={(e) => handleUserGroupUpdate(e)}
          >
            <div className='groupeEditModal__title'>
              <h4>მომხმარებლის ჯგუფის მართვა</h4>
            </div>

            <div className='groupeEditModal__info'>
              <div className='groupeEditModal__info__groupeName'>
                <h4>სახელი</h4>
                <TextField
                  label='სახელი'
                  required={saveOrEdit !== 'edit'}
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='groupeEditModal__info__status'>
                <h4>სტატუსი</h4>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    სტატუსი
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    required={saveOrEdit !== 'edit'}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label='status'
                  >
                    <MenuItem key={'აქტიური'} value={true}>
                      {'აქტიური'}
                    </MenuItem>
                    <MenuItem key={'არააქტიური'} value={false}>
                      {'არააქტიური'}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='groupeEditModal__info__checkBox'>
                <h4>უფლებები</h4>
                <CheckboxTree
                  nodes={nodes}
                  checked={checkedNodes}
                  expanded={expandedNodes}
                  onCheck={(checked) => setCheckedNodes(checked)}
                  onExpand={(expanded) => setExpandedNodes(expanded)}
                  icons={{
                    check: <BsCheckAll />,
                    uncheck: <MdCheckBoxOutlineBlank />,
                    halfCheck: <BsCheck style={{ display: 'none' }} />,
                    expandClose: (
                      <IoIosArrowForward style={{ display: 'none' }} />
                    ),
                    expandOpen: <IoIosArrowDown style={{ display: 'none' }} />,
                    expandAll: <IoIosArrowDown style={{ display: 'none' }} />,
                    collapseAll: (
                      <IoIosArrowForward style={{ display: 'none' }} />
                    ),
                    parentClose: <FaFolder />,
                    parentOpen: <FaFolderOpen />,
                    leaf: <BsFileEarmarkPlus style={{ display: 'none' }} />,
                  }}
                />
              </div>
            </div>

            <div className='groupeEditModal__buttons'>
              <Button type='submit' variant='contained'>
                <BiSave /> შენახვა
              </Button>
              <Button variant='contained' onClick={handleModalClose}>
                <CgCloseO /> დახურვა
              </Button>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserGroupeManagement;
