import React, {useEffect, useState} from "react"
import Common from "./Common"
import {Form, Button,Spinner,Tabs, Tab} from "react-bootstrap"
import "./Components.css"


const Home = () => {

          const [edit, setEdit] = useState(()=>false);

          const [name, setName] = useState(()=> "");
          const [phone, setPhone] = useState(()=>"");
          const [address, setAddress] = useState(()=>""); 
          const [account, setAccount] = useState(()=>"");
          const [accountType, setAccountType] = useState(()=>"");
          const [balance, setBalance] = useState(()=>"");
          const [email,setEmail] = useState(()=>"");

          useEffect(()=>{
           
            let id = localStorage.getItem("id");

            fetch("http://localhost:3000/customerbank/"+id,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
         })
         .then((res)=>res.json())
         .then((result)=>{
             setName(result.name);
             setPhone(result.phone);
             setAddress(result.address);
             setAccountType(result.accountType);
             setAccount(result.id);
             setEmail(result.email);
             setBalance(result.balance);
             localStorage.setItem("balance", result.balance);
         })
    

          },[]);

          const changeEditMode = () => {
                    if(edit == true){
                         setEdit(false);
                    }else{
                        setEdit(true);
                    }
          }
          const updateInfo = () => {
            
            let info = JSON.stringify({
              id: account,
              accountNo: account,
              name: name,
              phone: phone,
              email: email,
              address: address,
              accountType: accountType,
              balance: balance
            });

            fetch("http://localhost:3000/customerbank/"+account,{
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }, 
              body: info
             })
             .then((res)=>res.json())
             .then((result)=>{
                 console.log(result);
                 alert("Updated Succesfully");
             })
        
    
          
          }

          return (
                    <>
                    <Common>
                              <div>
                              <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
                                   <Tab eventKey="general" title="General">
                                             <div style={{float:"right"}}>
                                                     <Button style={{color: "black", background: "none", border: "0px"}} onClick={changeEditMode}>
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                   </svg>
                                                     </Button>
                                                     </div>

                                      <div className="home-form-tab" style={{marginTop: "2%"}}>
                                      <Form className="home-form">
                                        <Form.Group controlId="formBasicEmail">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" required={true} disabled={!edit} onChange={(e)=>{setName(e.target.value)}} value={name}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type="text" required={true} disabled={!edit} onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Address</Form.Label>
                              <Form.Control type="text" required={true} onChange={(e)=>{setAddress(e.target.value)}} disabled={!edit} value={address}/>
                              </Form.Group>

 
                 <div style={{display: edit? "initial": "none"}}>
                 <div style={{display: "flex", justifyContent: "center"}}>
                      <Button variant="primary" type="submit" onClick={(e)=>{
                        e.preventDefault();
                        updateInfo();
                      }}>
                               Update
                      </Button>
               </div>
                 </div>
               </Form>
                                      </div>
                                  </Tab>
                             <Tab eventKey="account" title="Account">
                             <div className="home-form-tab" style={{marginTop: "2%"}}>
                             <Form className="home-form">
                                        <Form.Group controlId="formBasicEmail">
                              <Form.Label>Account Number</Form.Label>
                              <Form.Control type="text" required={true} disabled={true}  value={account}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Account Type</Form.Label>
                              <Form.Control type="text" required={true} disabled={true}  value={accountType}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Balance</Form.Label>
                              <Form.Control type="text" required={true} disabled={true}  value={balance}/>
                              </Form.Group>
               </Form>
                             </div>
                             </Tab>
                          </Tabs>
                              </div>
                    </Common>
                    </>
          );
}

export default Home;