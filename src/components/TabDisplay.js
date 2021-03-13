import '../style/TabDisplay.scss';
// components
import UsersPage from './users/UsersPage';
import UserGroupPage from './userGroupe/UserGroupPage';
// media
import team from '../img/team.svg';

const TabDisplay = ({ activeTab }) => {
  return (
    <div className='tabDisplay'>
      {!activeTab && (
        <>
          <h3>აირჩიეთ სასურველი გვერდი მენიუდან</h3>
          <img src={team} alt='team' />
        </>
      )}

      {activeTab === 'მომხმარებლები' && <UsersPage />}
      {activeTab === 'მომხმარებლის ჯგუფები' && <UserGroupPage />}
    </div>
  );
};

export default TabDisplay;
