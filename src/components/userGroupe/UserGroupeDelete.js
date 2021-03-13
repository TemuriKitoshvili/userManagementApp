import '../../style/userGroupe/UserGroupeDelete.scss';
// material-ui
import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
// icons
import { FcInfo } from 'react-icons/fc';

const UserGroupeDelete = ({
  openGroupeDeleteModal,
  setOpenGroupeDeleteModal,
}) => {
  return (
    <div className='userGroupeDelete'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='userGroupeDelete'
        open={openGroupeDeleteModal}
        onClose={() => setOpenGroupeDeleteModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openGroupeDeleteModal}>
          <div className='userGroupeDelete__paper'>
            <div className='userGroupeDelete__title'>
              <h4>დადასტურება</h4>
            </div>
            <div className='userGroupeDelete__info'>
              <FcInfo />
              <p>დარწმუნებული ხართ, რომ გსურთ მომხმარებლის ჯგუფის წაშლა?</p>
            </div>
            <div className='userGroupeDelete__buttons'>
              <Button variant='contained'>კი</Button>
              <Button variant='contained'>არა</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserGroupeDelete;
