import { useEffect, useState } from 'react';
import '../../style/userGroupe/UserGroupPage.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UserGroupePageFilter from './UserGroupePageFilter';
import UserGroupeTable from './UserGroupeTable';

const UserGroupPage = ({ reload, setReload }) => {
  // filter
  const [permissions, setPermissions] = useState([]);
  const [filterUserGroupData, setFilterUserGroupData] = useState([]);
  const [saveOrEdit, setSaveOrEdit] = useState(null);
  // modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openGroupeDeleteModal, setOpenGroupeDeleteModal] = useState(false);

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
      <UserGroupePageFilter
        permissions={permissions}
        setOpenEditModal={setOpenEditModal}
        setFilterUserGroupData={setFilterUserGroupData}
        setSaveOrEdit={setSaveOrEdit}
      />

      <div className='userGroupPage__info'>
        <UserGroupeTable
          userGroups={filterUserGroupData}
          permissions={permissions}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          openGroupeDeleteModal={openGroupeDeleteModal}
          setOpenGroupeDeleteModal={setOpenGroupeDeleteModal}
          reload={reload}
          setReload={setReload}
          saveOrEdit={saveOrEdit}
          setSaveOrEdit={setSaveOrEdit}
        />
      </div>
    </div>
  );
};

export default UserGroupPage;
