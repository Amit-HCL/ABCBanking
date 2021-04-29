import React, { useEffect, useState } from "react"
import {Form, Button,Spinner,Table, thead, tr, th, tbody, td,Modal} from "react-bootstrap"
import View from "./View"

const Admin = () => {

          const [users, setUsers] = useState(()=>[]);
          const [filter, setFilter] = useState(()=> []);

          const [show, setShow] = useState(()=> false);

          useEffect(()=>{
            
                    fetch("http://localhost:3000/customerbank",{
                              method: "GET",
                              headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                              }
                             })
                             .then((res)=>res.json())
                             .then((result)=>{
                                       setUsers(result);                                       
                             })                    

          }, []);

          const view = (id) => {
             localStorage.setItem('viewid', id);
             setShow(true);
          }
          const deleteUser = (id) => {
                    fetch("http://localhost:3000/user/"+id,{
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                              }
                             })
                             .then((res)=>res.json())
                             .then((result)=>{
                              fetch("http://localhost:3000/customerbank/"+id,{
                                        method: "DELETE",
                                        headers: {
                                          "Content-Type": "application/json",
                                          "Accept": "application/json"
                                        }
                                       })
                                       .then((res)=>res.json())
                                       .then((result)=>{
                                                alert("User Deleted");
                                                window.location.reload();                                       
                                       })                                           
                             })     
          }
          const logout = () => {
                    
                    localStorage.setItem('isLoggedIn', 'false');
                    localStorage.setItem('isAdmin', 'false');
                    window.location.reload();
          }

return (<>
        <div>
                  <div style={{display: "flex", paddingTop: "1%", paddingBottom: "1%", border: "1px dotted gray"}}>
                        <div style={{width: "33%", textAlign: "center", fontWeight: "bold" , color: "red"}}>ABC Retail Bank</div>
                        <div style={{width: "33%", textAlign: "center", fontWeight: "bold"}}>Admin Panel</div>
                        <div style={{width: "33%", textAlign: "center", display: "flex", justifyContent: "center"}}><Button style={{border: "0px", background: "none", color: "black"}} onClick = {logout}>Logout</Button></div>    
                  </div>

                  <div>
                       <div style={{marginTop: "20px",marginBottom: "20px", textAlign: "center", fontWeight: "bold"}}>All Users</div>
                       <div>
                       <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Account No</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Address</th>
      <th>Account Type</th>
      <th>Balance</th>
      <th>View</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((e)=>{
        return (
          <tr>
          <td>{e.name}</td>
          <td>{e.accountNo}</td>
          <td>{e.phone}</td>
          <td>{e.email}</td>
          <td>{e.address}</td>
          <td>{e.accountType}</td>
          <td>{e.balance}</td>
          <td><Button style={{border: "0px", background: "none", color: "black"}} onClick={()=>{view(e.id)}}>View</Button></td>
          <td><Button style={{border: "0px", background: "none", color: "black"}} onClick={()=>{deleteUser(e.id)}}>Delete</Button></td>
        </tr>
        )})}
        </tbody>
        </Table>
                       </div>
                  </div>


        </div>

        <Modal size="lg"
         aria-labelledby="example-modal-sizes-title-lg"
        show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>View Detaiils</Modal.Title>
        </Modal.Header>
        <Modal.Body><View /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShow(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
</>);

}

export default Admin;