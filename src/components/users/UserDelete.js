import '../../style/users/UserDelete.scss';
// material-ui
import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
// icons
import { FcInfo } from 'react-icons/fc';

const UserDelete = ({ openDeleteModal, setOpenDeleteModal }) => {
  return (
    <div className='userDelete'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='deleteModal'
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeleteModal}>
          <div className='deleteModal__paper'>
            <div className='deleteModal__title'>
              <h4>დადასტურება</h4>
            </div>
            <div className='deleteModal__info'>
              <FcInfo />
              <p>დარწმუნებული ხართ, რომ გსურთ მომხმარებლის წაშლა?</p>
            </div>
            <div className='deleteModal__buttons'>
              <Button variant='contained'>კი</Button>
              <Button variant='contained'>არა</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserDelete;
