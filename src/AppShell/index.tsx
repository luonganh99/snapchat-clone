import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Drawer as DrawerType,
  ShowDrawer,
  HideDrawer,
  FooterType,
  SetFooterType
} from './types';
import { showDrawer, hideDrawer, setFooterType } from './duck';
import { getUser, getUsers } from 'features/User/duck';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Drawer from './Drawer';
import Header from 'common/Header';
import './index.scss';

interface Props {
  drawers: DrawerType[];
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  footerType: FooterType;
  setFooterType: SetFooterType;
  getUser: () => void;
  getUsers: () => void;
  children: JSX.Element;
}

const AppShell: React.FC<Props> = ({
  drawers,
  showDrawer,
  hideDrawer,
  footerType,
  setFooterType,
  getUser,
  getUsers,
  children
}) => {
  // Init the app
  useEffect(() => {
    getUser();
    getUsers();
  }, []);

  return (
    <>
      <Toolbar drawers={drawers} />
      <Header showDrawer={showDrawer} />
      <section className="view">{children}</section>
      {drawers && <Drawer drawers={drawers} />}
      <Footer
        footerType={footerType}
        setFooterType={setFooterType}
        showDrawer={showDrawer}
        hideDrawer={hideDrawer}
      />
    </>
  );
};

const mapStateToProps = ({ app, users, media }) => ({
  users,
  media,
  drawers: app.drawers,
  footerType: app.footerType
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component)),
  hideDrawer: (component?) => dispatch(hideDrawer(component)),
  setFooterType: (footerType) => dispatch(setFooterType(footerType)),
  getUser: () => dispatch(getUser()),
  getUsers: () => dispatch(getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppShell);
