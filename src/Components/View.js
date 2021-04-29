import React, { useEffect, useState } from "react"
import {Form, Button,Spinner,Table, thead, tr, th, tbody, td,Modal, Tab, Tabs} from "react-bootstrap"

const View = () => {

          let cid = localStorage.getItem('viewid');

          const [fixed, setFixed] = useState(()=> []);
          const [transaction,setTransaction] = useState(()=>[]);

          useEffect(()=> {
                
                    fetch("http://localhost:3000/fixedDeposits?userId="+cid,{
                              method: "GET",
                              headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                              }
                             })
                             .then((res)=>res.json())
                             .then((result)=>{
                              setFixed(result);                                       
                             }) 
                             
                             fetch("http://localhost:3000/transactions?userid="+cid,{
                              method: "GET",
                              headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                              }
                             })
                             .then((res)=>res.json())
                             .then((result)=>{
                              setTransaction(result);                                       
                             }) 

                
          },[cid]);

          return (
                    <>
                        <Tabs defaultActiveKey="fixedDeopsits" id="uncontrolled-tab-example">
                                   <Tab eventKey="fixedDeopsits" title="Fixed Deposits">
                                   <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Account No</th>
      <th>Intrest rate</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Principle Amount</th>
    </tr>
     </thead>
      <tbody>
         {fixed.map((e)=>{
                   return (
                    <tr>
                    <td>{e.name}</td>
                    <td>{e.userId}</td>
                    <td>{e.intrestRate}</td>
                    <td>{e.startDate}</td>
                    <td>{e.endDate}</td>
                    <td>{e.amount}</td>
                  </tr>
                   );
         })}
        </tbody>
        </Table>
                                  </Tab>

                                  <Tab eventKey="transactions" title="Transactions">
                                  <Table striped bordered hover>
  <thead>
    <tr>
    <th>Transaction Id</th>
      <th>Name</th>
      <th>Account No</th>
      <th>Transaction Type</th>
      <th>Amount</th>
    </tr>
     </thead>
          <tbody>
        {
                  transaction.map((e)=>{
                            return(
                                      <tr>
                                                <td>{e.id}</td>
                                                <td>{e.name}</td>
                                                <td>{e.accountNo}</td>
                                                <td>{e.transactionType}</td>
                                                <td>{e.amount}</td>
                                      </tr>
                            )
                  })
        }
        </tbody>
        </Table>
                                  </Tab>
                          </Tabs>
                    </>
          );

}

export default View;