import { useState, useEffect, useContext } from 'react';

import classNames from "classnames";
import { AuthContext } from 'contexts/app/AuthContext';
import { useHistory } from 'react-router-dom';
import { APP_LOGIN_STATUS, axiosInstance } from 'contexts/app/Generalvariables';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';


import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
} from "reactstrap";

interface PasswordChangeAttr {
  id : string
  password : string
  newPassword : string
}

interface Response {
  accepted : boolean,
  msg : string
}

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [color, setcolor] = useState("navbar-transparent");
  const {setState, authContextState} = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false)
  const navigator = useHistory()
  const {register, handleSubmit} = useForm<PasswordChangeAttr>();
  const {openNotification} = useContext(NotificationContextProvider)

  useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };

  const logOut = () => {
      setState({
        isLoged : false,
        token : undefined,
        userId : undefined
      })

      window.localStorage.setItem(APP_LOGIN_STATUS, null);

      navigator.push('/Login')
  }

  const changepassword = async (formData : PasswordChangeAttr) => {
    console.log(formData);

    try{
      const {data} = await axiosInstance.post<Response>("/updatePassword", {
        ...formData,
        id : authContextState.userId
      }, 
      {
        headers : {
          "auth-token" : authContextState.token
        } 
      })

      if(data.accepted){
        openNotification(data.msg, "success")
        setModalOpen(false)
      }
      else {
        openNotification(data.msg, "warning")
      }


    }catch(e){
      openNotification("Server error", "danger")
    }


   
  }

  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img
                      alt="..."
                      src={require("assets/img/anime3.png").default}
                    />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Usuario</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={() => setModalOpen(true)}>Change Password</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={() => logOut()}>Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Modal 
        isOpen ={modalOpen}
      >
        <ModalHeader>
          Change password
        </ModalHeader>
        <ModalBody>
          <input type="password" className="form-control text-black-50" placeholder="Current Password" {...register("password")}/>
          <input type="password" className="form-control text-black-50 mt-3" placeholder="New Password" {...register("newPassword")}/>
          
        </ModalBody>
        <ModalFooter className = "p-3">
          <Button
            color="primary"
            onClick={handleSubmit(changepassword)}
          >
            Accept
          </Button>
          {' '}
          <Button onClick={() => {setModalOpen(false)}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

    </>
  );
}

export default AdminNavbar;
