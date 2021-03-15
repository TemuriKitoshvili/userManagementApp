import { useEffect, useState } from 'react';
import '../../style/userGroup/UserGroupPage.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UserGroupPageFilter from './UserGroupPageFilter';
import UserGroupTable from './UserGroupTable';

const UserGroupPage = () => {
  // filter
  const [permissions, setPermissions] = useState([]);
  const [filterUserGroupData, setFilterUserGroupData] = useState([]);
  const [saveOrEdit, setSaveOrEdit] = useState(null);
  // modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openGroupDeleteModal, setOpenGroupDeleteModal] = useState(false);

  // Receives information about group rights
  useEffect(() => {
    axios
      .get('permissions')
      .then((res) => setPermissions(res.data))
      .catch((err) =>
        noty(
          'ჯგუფების შესახებ ინფორმაციის ჩატვირთვისას დაფიქსირდა შეცდომა',
          'error'
        )
      );
  }, []);

  return (
    <div className='userGroupPage'>
      <UserGroupPageFilter
        permissions={permissions}
        setOpenEditModal={setOpenEditModal}
        setFilterUserGroupData={setFilterUserGroupData}
        setSaveOrEdit={setSaveOrEdit}
      />

      <div className='userGroupPage__info'>
        <UserGroupTable
          userGroups={filterUserGroupData}
          permissions={permissions}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          openGroupDeleteModal={openGroupDeleteModal}
          setOpenGroupDeleteModal={setOpenGroupDeleteModal}
          saveOrEdit={saveOrEdit}
          setSaveOrEdit={setSaveOrEdit}
        />
      </div>
    </div>
  );
};

export default UserGroupPage;
