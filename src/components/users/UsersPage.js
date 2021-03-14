import { useEffect, useState } from 'react';
import '../../style/users/UsersPage.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UsersPageFilter from './UsersPageFilter';
import UsersPageTable from './UsersPageTable';

const UsersPage = ({ reload, setReload }) => {
  // filter
  const [userGroupsForSelection, setUserGroupsForSelection] = useState([]);
  const [filterUsersData, setFilterUsersData] = useState(null);
  // modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [saveOrEdit, setSaveOrEdit] = useState(null);

  useEffect(() => {
    axios
      .get('userGroups/forSelection')
      .then((res) => setUserGroupsForSelection(res.data))
      .catch((err) =>
        noty(
          'ჯგუფების შესახებ ინფორმაციის ჩატვირთვისას დაფიქსირდა შეცდომა',
          'error'
        )
      );
  }, []);

  return (
    <div className='userPage'>
      <UsersPageFilter
        userGroupsForSelection={userGroupsForSelection}
        setOpenEditModal={setOpenEditModal}
        setFilterUsersData={setFilterUsersData}
        setSaveOrEdit={setSaveOrEdit}
      />

      <div className='userPage__info'>
        <UsersPageTable
          users={filterUsersData}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          saveOrEdit={saveOrEdit}
          setSaveOrEdit={setSaveOrEdit}
          reload={reload}
          setReload={setReload}
        />
      </div>
    </div>
  );
};

export default UsersPage;
