import { useState } from 'react';
import '../style/Header.scss';
// store
import { useDispatch } from 'react-redux';
import { addTab } from './redux/actions/actionCreators';
// material-ui
import { Button, Menu, MenuItem } from '@material-ui/core';
// icons
import { BiMenu } from 'react-icons/bi';
import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();

  const handleClose = (menuItem) => {
    dispatch(addTab(menuItem));
    setOpenMenu(false);
  };

  return (
    <header className='header'>
      <div className='menu__nav'>
        <Button
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={(e) => setOpenMenu(e.currentTarget)}
        >
          <BiMenu /> მენიუ
        </Button>

        <Menu
          className='menu__navigation'
          id='customized-menu'
          anchorEl={openMenu}
          keepMounted
          open={Boolean(openMenu)}
          onClose={() => setOpenMenu(false)}
        >
          <MenuItem
            className='menu__navigation__item'
            onClick={() => {
              handleClose('მომხმარებლები');
            }}
          >
            <FaUserAlt /> მომხმარებლები
          </MenuItem>
          <MenuItem
            className='menu__navigation__item'
            onClick={() => handleClose('მომხმარებლის ჯგუფები')}
          >
            <FaUsers /> მომხმარებლის ჯგუფები
          </MenuItem>
        </Menu>
      </div>

      <div className='menu__userAuthorization'>
        <h4>მომხმარებელი</h4>
        <Button variant='contained'>
          <FiLogOut /> გამოსვლა
        </Button>
      </div>
    </header>
  );
};

export default Header;
