import '../style/TabDisplay.scss';
// components
import UsersPage from './users/UsersPage';
import UserGroupPage from './userGroupe/UserGroupPage';
// media
import team from '../img/team.svg';

const TabDisplay = ({ activeTab, reload, setReload }) => {
  return (
    <div className='tabDisplay'>
      {!activeTab && (
        <>
          <h3>აირჩიეთ სასურველი გვერდი მენიუდან</h3>
          <img src={team} alt='team' />
        </>
      )}

      {activeTab === 'მომხმარებლები' && (
        <UsersPage reload={reload} setReload={setReload} />
      )}
      {activeTab === 'მომხმარებლის ჯგუფები' && (
        <UserGroupPage reload={reload} setReload={setReload} />
      )}
    </div>
  );
};

export default TabDisplay;
