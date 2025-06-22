import React, { useState } from 'react';
import InputType from '../Form/inputType';
import { useSelector } from 'react-redux';
import API from '../../../../services/API';
const Modal = () => {
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [email, setEmail] = useState('');

  const{user}=useSelector(state=>state.auth)
  const handleModalSubmit=async()=>{
    try{
      if(!bloodGroup||!quantity){
        return alert('Please Provide All Fields')
      }
      const {data}=await API.post('/inventory/create-inventory',{
        email:email,
        organisation:user?._id,
        inventoryType,
        bloodGroup,
        quantity
      })  

      if(data?.success){
        alert('New Record Created')
        window.location.reload();
      }
    }
    catch(error){
      alert(error.response.data.message);
      console.log(error)
      window.location.reload();

    }
      
  }
  return (
    
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* Modal Body */}
            <div className="modal-body">

              {/* Inventory Type */}
              <div className="d-flex mb-3 align-items-center">
                <label className="me-2">Inventory Type:</label>
                <div className="form-check me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="inRadio"
                    value="in"
                    checked={inventoryType === 'in'}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label ms-1">IN</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="inRadio"
                    value="out"
                    checked={inventoryType === 'out'}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label ms-1">OUT</label>
                </div>
              </div>

              {/* Blood Group */}
              <div className="mb-3">
                <label className="form-label">Blood Group:</label>
                <select
                  className="form-select"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option defaultValue="">Select blood group</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                </select>
              </div>
              <InputType
              labelText={'Donar Email'}
              labelFor={'donarEmail'}
              inputType={'email'}
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}/>
              <InputType
              labelText={'Quantity (ML)'}
              labelFor={'quantity'}
              inputType={'Number'}
              value={quantity}
              onChange={(e)=>{
                setQuantity(e.target.value)
              }}
              />
              
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"
              onClick={handleModalSubmit}>
                Submit
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
