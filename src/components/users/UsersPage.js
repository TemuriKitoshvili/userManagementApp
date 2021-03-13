import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/users/UsersPage.scss';
// configs
import axios from '../configs/axios';
import noty from '../configs/noty';
// components
import UsersPageFilter from './UsersPageFilter';
import UsersPageTable from './UsersPageTable';
import UserManagement from './UserManagement';
import UserDelete from './UserDelete';

const UsersPage = () => {
  const users = useSelector((state) => state.APIData.users);
  // filter
  const [userGroups, setUserGroups] = useState([]);
  // filterValues
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('ყველა');
  const [active, setActive] = useState('');
  // modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  console.log(username);
  console.log(fullname);
  console.log(email);
  console.log(group);
  console.log(active);

  useEffect(() => {
    axios
      .get('userGroups/forSelection')
      .then((res) => setUserGroups(res.data))
      .catch((err) =>
        noty(
          'ჯგუფების შესახებ ინფორმაციის ჩატვირთვისას დაფიქსირდა შეცდომა',
          'error'
        )
      );
  }, []);
  // აქ მოვახდენთ გადაცემას თეილისთვის და ფილტრაციასაც, აქვე დავამატებთ უზერს და წავშლით

  return (
    <div className='userPage'>
      <UsersPageFilter
        userGroups={userGroups}
        setOpenEditModal={setOpenEditModal}
        username={username}
        setUsername={setUsername}
        fullname={fullname}
        setFullname={setFullname}
        email={email}
        setEmail={setEmail}
        group={group}
        setGroup={setGroup}
        active={active}
        setActive={setActive}
      />

      <div className='userPage__info'>
        <UsersPageTable
          users={users}
          setOpenEditModal={setOpenEditModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      </div>

      {/* modals */}
      <UserManagement
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
      <UserDelete
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </div>
  );
};

export default UsersPage;
