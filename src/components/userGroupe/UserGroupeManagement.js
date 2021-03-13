import { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import '../../style/userGroupe/UserGroupeManagement.scss';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// material-ui
import { Backdrop, Button, Fade, Modal, TextField } from '@material-ui/core';
// icons
import { BiSave } from 'react-icons/bi';
import { CgCloseO } from 'react-icons/cg';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BsCheck, BsCheckAll, BsFileEarmarkPlus } from 'react-icons/bs';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const nodes = [
  {
    value: 'mars',
    label: 'Mars',
    children: [
      { value: 'phobos', label: 'Phobos' },
      { value: 'deimos', label: 'Deimos' },
    ],
  },
];

const UserGroupeManagement = ({ openEditModal, setOpenEditModal }) => {
  const [checkedNodes, setCheckedNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);

  return (
    <div className='userGroupeManagement'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='groupeEditModal'
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditModal}>
          <div className='groupeEditModal__paper'>
            <div className='groupeEditModal__title'>
              <h4>მომხმარებლის ჯგუფის მართვა</h4>
            </div>

            <div className='groupeEditModal__info'>
              <div className='groupeEditModal__info__groupeName'>
                <h4>სახელი</h4>
                <TextField label='სახელი' required variant='outlined' />
              </div>
              <div className='groupeEditModal__info__groupeName'>
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

            <div className='groupeEditModal__buttons'>
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

export default UserGroupeManagement;
