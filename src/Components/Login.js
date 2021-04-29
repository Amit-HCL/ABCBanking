import React, {useState} from "react"
import {Form, Button,Spinner} from "react-bootstrap"
import "./Components.css";
import {axios} from "axios"

const Login = () => {

          const [uname, setUname] = useState(()=>"");
          const [pass, setPass] = useState(()=>"");
          const [loading, setLoading] = useState(()=>false);
          const [msg, setMsg] = useState(()=>"");

          const onSubmit = async () => {
               
            setLoading(true);
           
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
                for(let i = 0; i<result.length; ++i){
                     if(result[i].username == uname){
                       match = true;
                       if(result[i].password == pass){                       
                         localStorage.setItem("isLoggedIn", 'true');
                         localStorage.setItem('isAdmin', result[i].isAdmin);
                         localStorage.setItem("id",result[i].accountNo);
                         setLoading(false);
                         window.location.reload();
                       }else{
                         setLoading(false);
                         setMsg("Wrong Passowrd");
                       }
                     }   
                }
               if(match == false){
                setLoading(false);
                 setMsg("Please create an account");
               }
         })
    
            
          }

          return (<>    
          <div>
                <div style={{display: loading? "initial": "none"}}>
                          <div style={{display:"flex", justifyContent:"center", marginTop: "25%"}}>
                              <Spinner animation="border" role="status">
                                 <span className="sr-only">Loading...</span>
                              </Spinner>
                          </div>
                </div>
                <div style={{display: loading? "none": "initial"}}>
                <div className="login-form">
                    <div className="form-body">
                              <span style={{color: "red"}}>{msg}</span>
                    <Form>
                    <div style={{textAlign: "center", color: "red",marginBottom: "5%", fontWeight: "bold"}}>
                                      ABC Bank Login
                              </div>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" required={true} placeholder="Enter Username" onChange={(e)=>{setUname(e.target.value);}}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" required={true} placeholder="Password" onChange={(e)=>{ setPass(e.target.value)}}/>
          </Form.Group>
 
        <div style={{display: "flex", justifyContent: "center"}}>
        <Button variant="primary" type="submit" onClick={(e)=>{
          e.preventDefault();
          onSubmit();
        }}>
               Submit
          </Button>
        </div>
        <a href="./createAccount">Create a account</a>
         </Form>
        
                    </div>
                   
          </div>  
                </div>    
          </div> 
          </>);
}

export default Login;