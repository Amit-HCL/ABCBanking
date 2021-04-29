import React, {useState, useEffect} from "react";
import {Tabs, Tab, Form, Button, Table, thead, tr, th, tbody, td} from "react-bootstrap"
import Common from "./Common"
const Funds = () => {

          let d = new Date();

          const [rName, setRName] = useState(()=>"");
          const [rAC, setRAC] = useState(()=>"");
          const [amt, setAmt] = useState(()=>0);

          const [fDName, setFDName] = useState(()=>"");
          const [eDate, setEdate] = useState(()=>"");
          const [amount, setAmount] = useState(()=>"");

          const [fixed, setFixed] = useState(()=>[]);

          useEffect(()=>{
           let id = localStorage.getItem('id');

           fetch("http://localhost:3000/fixedDeposits?userId="+id,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }
             })
             .then((res)=>res.json())
             .then((result)=>{
                  setFixed(result);
                  console.log(result);
             });

          }, []);

 
          const transferFunds = () => {
                    let d = new Date();
                    let id = d.getDate()+""+d.getMonth()+""+d.getYear()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+d.getMilliseconds();
                    
                    let data = JSON.stringify({
                              id: id,
                              userid: id,
                              name: rName,
                              transactionType: "Transfer",
                              accountNo: rAC,
                              amount: amt
                    });

                    if(parseInt(localStorage.getItem("balance"))<amt){
                      alert("Insufficient Balance");
                    }else{
                              fetch("http://localhost:3000/transactions",{
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                          "Accept": "application/json"
                                        },
                                        body: data
                                       })
                                       .then((res)=>res.json())
                                       .then((result)=>{
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
                                                        let amount = parseInt(result.balance);
                                                        amount -= amt;
                                                        let data = JSON.stringify({
                                                                  id: localStorage.getItem("id"),                                                               
                                                                  accountNo: localStorage.getItem("id"),
                                                                  name: result.name,
                                                                  phone: result.phone,
                                                                  email: result.email,
                                                                 address: result.address,
                                                                 accountType: result.accountType,
                                                                  balance: amount

                                                        })
                                                        
                                                        fetch("http://localhost:3000/customerbank/"+id,{
                                                            method: "PUT",
                                                            headers: {
                                                              "Content-Type": "application/json",
                                                              "Accept": "application/json"
                                                            },
                                                            body: data
                                                           })
                                                           .then((res)=>res.json())
                                                           .then((result)=>{      
                                                                    alert("Amount Transferred")
                                                               })
                                                     })
                                                
                                           })
                    }

                   
                        
                    
          }
          const makeFixedDeposit = () => {
            let d = new Date();
            let id = d.getDate()+""+d.getMonth()+""+d.getYear()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+d.getMilliseconds();
            let cusId = localStorage.getItem('id');

            let data = JSON.stringify({
              id: id,
              userId: cusId,
              name: fDName,
              startDate: d.toLocaleDateString().replaceAll("/", "-"),
              intrestRate: "10",
              endDate: eDate,
              amount: amount
            });

            fetch("http://localhost:3000/fixedDeposits",{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: data
             })
             .then((res)=>res.json())
             .then((result)=>{
                  alert("Fixed Deposit of "+ amount +" was succesful");
             });
              

          }

          return (<>
           
               <Common>
               <Tabs defaultActiveKey="transferFunds" id="uncontrolled-tab-example">
                                   <Tab eventKey="transferFunds" title="Transfer Fund">
                                   <Form className="home-form" style={{width: "30%", marginLeft: "5%"}}>
                                        <Form.Group controlId="formBasicEmail">
                              <Form.Label>Recipient Name</Form.Label>
                              <Form.Control type="text" required={true} value={rName} onChange={(e)=>{setRName(e.target.value)}}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Recipient Account No.</Form.Label>
                              <Form.Control type="text" required={true} value={rAC} onChange={(e)=>{setRAC(e.target.value)}}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Recipient Phone</Form.Label>
                              <Form.Control type="text" required={true}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control type="number" value={amt} onChange={(e)=>{setAmt(e.target.value)}} required={true}/>
                              </Form.Group>

 
                 <div>
                 <div style={{display: "flex", justifyContent: "center"}}>
                      <Button variant="primary" type="submit" onClick={(e)=>{
                                e.preventDefault();
                                transferFunds();
                      }}>
                               Transfer
                      </Button>
               </div>
                 </div>
               </Form>
                                  </Tab>
                                  <Tab eventKey="fixedDeposit" title="Fixed Deposit">
                                  <Table striped bordered hover>
  <thead>
    <tr>
      <th>Beneficiary Name</th>
      <th>Start date</th>
      <th>End date</th>
      <th>Intrest(per Annum)</th>
      <th>Principle Amount</th>
    </tr>
  </thead>
  <tbody>
    {
      fixed.map((e)=>{
        return (
          <tr>
          <td>{e.name}</td>
          <td>{e.startDate}</td>
          <td>{e.endDate}</td>
          <td>10%</td>
          <td>{e.amount}</td>
        </tr>
        )     
      })
    }
  </tbody>
</Table>
                                  </Tab>
                                  <Tab eventKey="makeFixedDeposit" title="Make Fixed Deposit">

                                  <Form className="home-form" style={{width: "30%", marginLeft: "5%"}}>
                                        <Form.Group controlId="formBasicEmail">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" required={true} value={fDName} onChange={(e)=>{setFDName(e.target.value)}}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Start date</Form.Label>
                              <Form.Control disabled={true} type="text" required={true} value={d.toLocaleDateString().replaceAll("/", "-")}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>End Date</Form.Label>
                              <Form.Control type="date" required={true} onChange={(e)=>{setEdate(e.target.value)}}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Intrest rate</Form.Label>
                              <Form.Control disabled={true} type="text" value={'10%'} required={true}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control type="text" value={amount} required={true} onChange={(e)=>{setAmount(e.target.value)}}/>
                              </Form.Group>


 
                 <div>
                 <div style={{display: "flex", justifyContent: "center"}}>
                      <Button variant="primary" type="submit" onClick={(e)=>{
                        e.preventDefault();
                        makeFixedDeposit();
                      }}>
                               Deposit
                      </Button>
               </div>
                 </div>
               </Form>
                                  </Tab>

                                  </Tabs>
            
               </Common>
               
          </>);
}
export default Funds;