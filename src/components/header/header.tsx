import React, { useState } from 'react';
import { Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export const Header = () => {
  let history = useHistory();

  const [captionText, setCaptionText] = useState('');
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push('/search/' + captionText);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Journey</Navbar.Brand>
      </LinkContainer>
      <LinkContainer to="/home">
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>

      <NavDropdown
        title="Countries"
        id="collapsible-nav-dropdown"
        className="mr-auto"
      >
        <LinkContainer to="/travel/Greece">
          <NavDropdown.Item>Greece</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/travel/India">
          <NavDropdown.Item>India</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/travel/Thailand">
          <NavDropdown.Item>Thailand</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/travel/random">
          <NavDropdown.Item>Random!</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>

      <Form inline>
        <FormControl
          type="text"
          placeholder="Caption Search"
          className="mr-sm-2"
          onChange={(e) => setCaptionText(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      </Form>
    </Navbar>
  );
};
