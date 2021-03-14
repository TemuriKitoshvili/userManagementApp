import '../../style/userGroupe/UserGroupeDelete.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// material-ui
import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
// icons
import { FcInfo } from 'react-icons/fc';

const UserGroupeDelete = ({
  openGroupeDeleteModal,
  setOpenGroupeDeleteModal,
  userGroupIdForDelete,
  reload,
  setReload,
}) => {
  const handleUserGroupDelete = () => {
    if (userGroupIdForDelete) {
      setOpenGroupeDeleteModal(false);

      axios
        .delete(`userGroups/${userGroupIdForDelete}`)
        .then((res) => {
          setReload(!reload);
          noty('მომხმარებელის ჯგუფი წარმატებით წაიშალა', 'info');
        })
        .catch((err) =>
          noty('მომხმარებლის ჯგუფის წაშლისას დაფიქსირდა შეცდომა', 'error')
        );
    }
  };

  const handleUserGroupDeleteClose = () => {
    setOpenGroupeDeleteModal(false);
  };

  return (
    <div className='userGroupeDelete'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='userGroupeDelete'
        open={openGroupeDeleteModal}
        onClose={handleUserGroupDeleteClose}
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

export default UserGroupeDelete;
