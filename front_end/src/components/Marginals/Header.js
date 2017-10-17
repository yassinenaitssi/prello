import React from 'react'
import { Button,FormGroup,FormControl, Nav, Navbar, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Header extends React.Component{
  render(){
    const navbarInstance = (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"> Prello </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem>
                Login
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/register">
              <NavItem>
                Register
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
    return(
      <div>{navbarInstance}</div>
    )}
  }

export default Header
