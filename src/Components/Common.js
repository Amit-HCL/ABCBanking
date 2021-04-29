import React from "react"
import {Container, Row, Col, Navbar, Nav, NavDropdown, Button} from "react-bootstrap"

const Common = ({children}) => {

  const Logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("isAdmin", "false");
    window.location.reload(false);
  }

          return(
                    <Container fluid>

                        <Row>
                         <Col>
                         <div>
                         <Navbar bg="light" expand="lg">
                           <Navbar.Brand href="/">ABC Retail Bank</Navbar.Brand>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                       <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/transactions">Transactions History</Nav.Link>
                      <Nav.Link href="/funds">Funds</Nav.Link>                       
                          </Nav>
                          <Nav>

                      <Nav.Link eventKey={2} href="#memes">
                       <Button onClick={Logout} style={{color: "black", background: "none", border: "0px"}}>Logout</Button>
                      </Nav.Link>
                  </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                         </div>
                         <div>
                         {children}
                         </div>
                         
                         </Col>
                        </Row>
                     </Container>
          );
}

export default Common;