import '../../style/userGroup/UserGroupDelete.scss';
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

const UserGroupDelete = ({
  openGroupDeleteModal,
  setOpenGroupDeleteModal,
  userGroupIdForDelete,
}) => {
  const refresh = useSelector((state) => state.refresh);
  const dispatch = useDispatch();

  // Takes a specific user's id and removes it
  const handleUserGroupDelete = () => {
    if (userGroupIdForDelete) {
      setOpenGroupDeleteModal(false);

      axios
        .delete(`userGroups/${userGroupIdForDelete}`)
        .then((res) => {
          dispatch(refreshTable(!refresh));
          noty('მომხმარებელის ჯგუფი წარმატებით წაიშალა', 'info');
        })
        .catch((err) =>
          noty('მომხმარებლის ჯგუფის წაშლისას დაფიქსირდა შეცდომა', 'error')
        );
    }
  };

  const handleUserGroupDeleteClose = () => {
    setOpenGroupDeleteModal(false);
  };

  return (
    <div className='userGroupDelete'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='userGroupDelete'
        open={openGroupDeleteModal}
        onClose={handleUserGroupDeleteClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openGroupDeleteModal}>
          <div className='userGroupDelete__paper'>
            <div className='userGroupDelete__title'>
              <h4>დადასტურება</h4>
            </div>
            <div className='userGroupDelete__info'>
              <FcInfo />
              <p>დარწმუნებული ხართ, რომ გსურთ მომხმარებლის ჯგუფის წაშლა?</p>
            </div>
            <div className='userGroupDelete__buttons'>
              <Button variant='contained' onClick={handleUserGroupDelete}>
                კი
              </Button>
              <Button variant='contained' onClick={handleUserGroupDeleteClose}>
                არა
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserGroupDelete;
