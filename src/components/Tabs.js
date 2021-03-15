import { useEffect, useState } from 'react';
import '../style/Tabs.scss';
// configs
import axios from './configs/axios';
import noty from './configs/noty';
// store
import { useDispatch, useSelector } from 'react-redux';
import {
  addUsers,
  removeTab,
  addUserGroups,
} from './redux/actions/actionCreators';
// components
import TabDisplay from './TabDisplay';
// icons
import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

const Tabs = () => {
  const tabs = useSelector((state) => state.tabs);
  const refresh = useSelector((state) => state.refresh);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('');

  // Determines which tab is open and receives its corresponding data from the server
  useEffect(() => {
    axios
      .get(tabs[tabs.length - 1] === 'მომხმარებლები' ? '/users' : '/userGroups')
      .then((res) =>
        tabs[tabs.length - 1] === 'მომხმარებლები'
          ? dispatch(addUsers(res.data.users))
          : dispatch(addUserGroups(res.data.groups))
      )
      .catch((err) =>
        noty('ინფორმაციის ჩატვირთვისას დაფიქსირდა შეცდომა', 'error')
      );
  }, [tabs, refresh]);

  // Determines which tab is active
  useEffect(() => {
    setActiveTab(tabs[tabs.length - 1]);
  }, [tabs]);

  // Closes the tab
  const handleTabClose = (tab) => {
    setActiveTab(tabs[tabs.length - 1]);
    dispatch(removeTab(tab));
  };

  return (
    <div className='tabs'>
      <div className='tabs__list'>
        {tabs?.map((tab) => (
          <div
            key={tab}
            className={activeTab === tab ? 'active tab' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            <div className='tab__info'>
              {tab === 'მომხმარებლები' ? <FaUserAlt /> : <FaUsers />}
              <h2>{tab}</h2>
            </div>
            <IoCloseSharp onClick={() => handleTabClose(tab)} />
          </div>
        ))}
      </div>

      <div className='tabs__display'>
        <TabDisplay activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Tabs;
