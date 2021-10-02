import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container} from 'react-bootstrap';

const Header = (props) => {
    const {} = props;
    return (
        <React.Fragment>
              <div id="mainHeader">
                <Navbar expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="/" className="w-25 py-3" style={{fontWeight:"bolder"}}>JobAssignment</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <NavLink className="nav-link navv" activeClassName="active" to="/" exact> Category </NavLink>
                                <NavLink className="nav-link navv" activeClassName="active" to="/company"> Company </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </React.Fragment>
    )
}

export default Header
