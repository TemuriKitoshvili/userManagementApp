import '../style/TabDisplay.scss';
// components
import UsersPage from './users/UsersPage';
import UserGroupPage from './userGroup/UserGroupPage';
// img
import team from '../img/team.svg';

const TabDisplay = ({ activeTab }) => {
  return (
    <div className='tabDisplay'>
      {!activeTab && (
        <>
          <h3>მოგესალმებით, აირჩიეთ სასურველი გვერდი მენიუდან</h3>
          <img src={team} alt='team' />
        </>
      )}

      {activeTab === 'მომხმარებლები' && <UsersPage />}
      {activeTab === 'მომხმარებლის ჯგუფები' && <UserGroupPage />}
    </div>
  );
};

export default TabDisplay;
