import React, {useState} from "react"
import {Form, Button,Spinner} from "react-bootstrap"
import "./Components.css"

const CreateAccount = () => {

          const [loading, setLoading] = useState(()=>false);
          const [msg, setMsg] = useState(()=>"");

          const [name, setName] = useState(()=>"");
          const [phone, setPhone] = useState(()=>"");
          const [accountType, setAccountType] = useState(()=>"Savings Account");
          const [uname, setUname] = useState(()=>"");
          const [pass, setPass] = useState(()=>"");
          const [address, setAddress] = useState(()=>"");
          

          const onSubmit =  () => {
            setLoading(true);
            let d = new Date();
            let id = d.getDate()+""+d.getMonth()+""+d.getYear()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+d.getMilliseconds();
            
            let user = JSON.stringify({id: id,accountNo: id, username: uname, password: pass, isAdmin: false});
            let userBank = JSON.stringify({id: id,accountNo: id, name: name, phone: phone, address: address,accountType: accountType,balance: "1000" })

            fetch("http://localhost:3000/user",{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }
             })
             .then((res)=>res.json())
             .then((result)=>{
              let match = false;
              for(let i=0; i<result.length; ++i){
                if(result[i].username == uname){
                  match = true;
                  setMsg("Username Already in use");
                }
              }
              if(match == false){
                fetch("http://localhost:3000/user",{
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: user
                 })
                 .then((res)=>res.json()).then((response)=>{
                  fetch("http://localhost:3000/customerbank",{
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: userBank
                   })
                   .then((res)=>res.json()).then((response)=>{
                     alert("Account Created Succesfully, Please login");
                  })
                 })
        
                 
              }

             })       
          }

          return (<>    
          <div className="login-form">
                    <div className="create-form-body">
                   
                    <Form>
                    <div style={{textAlign: "center", color: "red",marginBottom: "5%", fontWeight: "bold"}}>
                                      Create Account With ABC Bank
                              </div>
                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" required={true} onChange={(e)=>{setName(e.target.value);}}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type="text" required={true} onChange={(e)=>{setPhone(e.target.value);}}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Address</Form.Label>
                              <Form.Control type="text" required={true}  onChange={(e)=>{setAddress(e.target.value);}}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Account Type</Form.Label>
                              <Form.Control as="select" size="lg" onChange={(e)=>{setAccountType(e.target.value)}}>
                                  <option value="Savings Account">Savings Account</option>
                                  <option value="Current Account">Current Account</option>
                                  <option value="Checking Account">Checking Account</option>
                             </Form.Control>  
                             </Form.Group>

                   <Form.Group controlId="formBasicEmail">
                              <Form.Label>Username</Form.Label>
                              <Form.Control type="text" required={true} onChange={(e)=>{setUname(e.target.value);}}/>
                   </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required={true} onChange={(e)=>{ setPass(e.target.value)}}/>
                  </Form.Group>
 
                  <div style={{display: "flex", justifyContent: "center"}}>
                     <div>
                     <Button variant="primary" type="submit" onClick={(e)=>{
                        e.preventDefault();
                        onSubmit();
                      }}>
                               Create Account
                      </Button>
                      <br/>
                      <span><a href="/">Have An Account? Login</a></span>
                     </div>
               </div>
               <span style={{color: "red"}}>{msg}</span>
               </Form>
        
                    </div>
                   
          </div>  
          </>);
}

export default CreateAccount;