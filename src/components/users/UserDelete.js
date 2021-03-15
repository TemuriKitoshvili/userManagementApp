import '../../style/users/UserDelete.scss';
// store
import { useDispatch, useSelector } from 'react-redux';
import { refreshTable } from '../redux/actions/actionCreators';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// material-ui
import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
// icons
import { FcInfo } from 'react-icons/fc';

const UserDelete = ({
  openDeleteModal,
  setOpenDeleteModal,
  userIdForDelete,
}) => {
  const refresh = useSelector((state) => state.refresh);
  const dispatch = useDispatch();

  // Takes a specific user's id and removes it
  const handleUserDelete = () => {
    if (userIdForDelete) {
      axios
        .delete(`users/${userIdForDelete}`)
        .then((res) => {
          noty('მომხმარებელი წარმატებით წაიშალა', 'info');
          dispatch(refreshTable(!refresh));
        })
        .catch((err) => {
          noty('მომხმარებლის წაშლისას დაფიქსირდა შეცდომა', 'error');
        });

      setOpenDeleteModal(false);
    }
  };

  const handleUserDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  return (
    <div className='userDelete'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='deleteModal'
        open={openDeleteModal}
        onClose={handleUserDeleteClose}
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
              <Button variant='contained' onClick={handleUserDelete}>
                კი
              </Button>
              <Button variant='contained' onClick={handleUserDeleteClose}>
                არა
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserDelete;
