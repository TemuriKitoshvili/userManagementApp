import { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import '../../style/userGroup/UserGroupManagement.scss';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// store
import { useDispatch, useSelector } from 'react-redux';
import { refreshTable } from '../redux/actions/actionCreators';
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

const UserGroupManagement = ({
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
  saveOrEdit,
}) => {
  const refresh = useSelector((state) => state.refresh);
  const dispatch = useDispatch();
  const [checkedNodes, setCheckedNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [nodes, setNodes] = useState([]);

  // Receives information from about permissions and saves it for the checkbox
  useEffect(() => {
    setCheckedNodes(permissionCodes);
  }, [permissionCodes]);

  // Takes information from rights and groups it into groups
  useEffect(() => {
    const groupNames = [];
    permissions?.map(
      (permission) =>
        !groupNames.includes(permission.groupName) &&
        groupNames.push(permission.groupName)
    );

    setNodes(
      groupNames?.map((groupName) => {
        let node = {
          value: groupName,
          label: groupName,
          children: [],
        };

        let permissionsForChildren = permissions.filter(
          (permission) => groupName === permission.groupName
        );

        permissionsForChildren.map(
          (child) =>
            (node.children = [
              ...node.children,
              {
                value: child.code,
                label: child.name,
              },
            ])
        );

        return node;
      })
    );
  }, [permissions]);

  // Receives information about the action and the user group, makes the corresponding request of the action
  const handleUserGroupSaveOrUpdate = (e) => {
    e.preventDefault();
    const userGroup = {
      name: name,
      active: status,
      userPermissionCodes: checkedNodes,
    };

    if (saveOrEdit === 'edit' && userGroupId) {
      axios
        .put(`userGroups/${userGroupId}`, userGroup)
        .then((res) => {
          dispatch(refreshTable(!refresh));
          setOpenEditModal(false);
          setName('');
          setStatus('');
          setPermissionCodes([]);
          noty('??????????????????????????????????????? ?????????????????? ?????????????????????????????? ?????????????????????????????? ????????????????????????', 'info');
        })
        .catch((err) => {
          err.response?.status === 400
            ? noty(err.response?.data?.message, 'warning')
            : noty('?????????????????????????????? ?????????????????????', 'error');
        });
    }

    if (saveOrEdit === 'save') {
      axios
        .post('userGroups', userGroup)
        .then((res) => {
          dispatch(refreshTable(!refresh));
          setOpenEditModal(false);
          setName('');
          setStatus('');
          setPermissionCodes([]);
          noty('??????????????????????????????????????? ??????????????? ?????????????????????????????? ?????????????????????', 'info');
        })
        .catch((err) =>
          err.response?.status === 400
            ? noty(err.response?.data?.message, 'warning')
            : noty('?????????????????????????????? ?????????????????????', 'error')
        );
    }
  };

  // closes modals and cleaning the states
  const handleModalClose = () => {
    setOpenEditModal(false);
    setName('');
    setStatus('');
    setPermissionCodes([]);
  };

  return (
    <div className='userGroupManagement'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='groupEditModal'
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
            className='groupEditModal__paper'
            onSubmit={(e) => handleUserGroupSaveOrUpdate(e)}
          >
            <div className='groupEditModal__title'>
              <h4>???????????????????????????????????? ?????????????????? ??????????????????</h4>
            </div>

            <div className='groupEditModal__info'>
              <div className='groupEditModal__info__groupName'>
                <h4>??????????????????</h4>
                <TextField
                  label='??????????????????'
                  required={saveOrEdit !== 'edit'}
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='groupEditModal__info__status'>
                <h4>?????????????????????</h4>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    ?????????????????????
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    required={saveOrEdit !== 'edit'}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label='status'
                  >
                    <MenuItem key={'?????????????????????'} value={true}>
                      {'?????????????????????'}
                    </MenuItem>
                    <MenuItem key={'??????????????????????????????'} value={false}>
                      {'??????????????????????????????'}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='groupEditModal__info__checkBox'>
                <h4>????????????????????????</h4>
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
              </div>
            </div>

            <div className='groupEditModal__buttons'>
              <Button type='submit' variant='contained'>
                <BiSave /> ?????????????????????
              </Button>
              <Button variant='contained' onClick={handleModalClose}>
                <CgCloseO /> ?????????????????????
              </Button>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserGroupManagement;
