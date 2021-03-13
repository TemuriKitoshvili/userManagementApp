import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/userGroupe/UserGroupPage.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UserGroupePageFilter from './UserGroupePageFilter';
import UserGroupeTable from './UserGroupeTable';
import UserGroupeManagement from './UserGroupeManagement';
import UserGroupeDelete from './UserGroupeDelete';

const UserGroupPage = () => {
  const userGroups = useSelector((state) => state.APIData.userGroups);
  // filter
  const [permissions, setPermissions] = useState([]);
  // filterValues
  const [name, setName] = useState('');
  const [permission, setPermission] = useState('');
  const [active, setActive] = useState('');
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
        name={name}
        setName={setName}
        permission={permission}
        setPermission={setPermission}
        active={active}
        setActive={setActive}
      />

      <div className='userGroupPage__info'>
        <UserGroupeTable
          userGroups={userGroups}
          setOpenEditModal={setOpenEditModal}
          setOpenGroupeDeleteModal={setOpenGroupeDeleteModal}
        />
      </div>

      {/* modals */}
      <UserGroupeManagement
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
      <UserGroupeDelete
        openGroupeDeleteModal={openGroupeDeleteModal}
        setOpenGroupeDeleteModal={setOpenGroupeDeleteModal}
      />
    </div>
  );
};

export default UserGroupPage;
