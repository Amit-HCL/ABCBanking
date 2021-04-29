import React, { useEffect, useState } from "react"
import Common from "./Common"
import {Table, thead, tr, th, tbody, td} from "react-bootstrap"

const Transactions = () => {

  const [result, setResult] = useState(()=>[]); 

  useEffect(()=>{

  let id = localStorage.getItem("id");

  fetch("http://localhost:3000/transactions?userid="+id,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
         })
         .then((res)=>res.json())
         .then((result)=>{
           setResult(result);
         })
    

  }, []);

          return(<>
             <Common>
             <Table striped bordered hover>
  <thead>
    <tr>
      <th>Beneficiary Name</th>
      <th>A/C No.</th>
      <th>Type</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
   {result.map((e)=>{
         return (
          <tr>
          <td>{e.name}</td>
          <td>{e.userid}</td>
          <td>{e.transactionType}</td>
          <td>{e.amount}</td>
        </tr>
         );
   })}
  </tbody>
</Table>
             </Common>
          </>);
}

export default Transactions;