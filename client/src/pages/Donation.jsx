import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import API from '../../services/API';
import Layout from '../components/shared/Layout/Layout';
import { useSelector } from 'react-redux';

const Donation = () => {
   const{user}=useSelector
   (state=>state.auth)
     const[data,setData]=useState([])
      const getDonars=async()=>{
        try{
          const {data}=await API.post('/inventory/get-inventory-hospital',{
            filters:{
              inventoryType:'in',
              donar:user?._id,
            }
          })
          // console.log(data)
          if(data?.success){
            setData(data?.inventory)
            console.log(data)
          }
        }
        catch(error){
          console.log(error)
        }
      };
      useEffect(()=>{
        getDonars();
      },[])
      return (
        <Layout>
          <h1>Consumer Page</h1>
  
          <div className="container mt-4">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Email</th>
                <th scope="col">Date</th>
                
              </tr>
            </thead>
            <tbody>
              {data?.map(record=>(
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
              </tr>
              ))}
             
            </tbody>
          </table>
          </div>
        </Layout>
  )
}

export default Donation