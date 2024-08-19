import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createCustomer, updateCustomer } from '../services/customer';

const initialPayload = {   name: '',   phone: '',   email: '',   address: '',   organization: '', }
const CustomerForm = ({actionType, editPayload, setPageLoad, handleClose}) => {
  const [payload, setPayload] = useState(initialPayload);

  const [errors, setErrors] = useState({ name: '',phone: '', email: '', address: '', organization: '',});

  useEffect(() => {
    if (actionType === 'UPDATE') {
      console.log('callled', editPayload)
      const { name, phone,email,address, organization } = editPayload;
      setPayload({ name, phone,email,address, organization });
    } 
    else {
      setPayload(initialPayload);
    }
  }, [editPayload, actionType]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({  ...payload,  [name]: value,});

    setErrors({ ...errors, [name]: '',});
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let newErrors = {};
      if (!payload.name) newErrors.name = 'Name is required';
      if (!payload.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhoneNumber(payload.phone)) {
        newErrors.phone = 'Invalid phone number format';
      }
      if (!payload.email) {
        newErrors.email = 'Email is required';
      } 
      else if (!validateEmail(payload.email)) {
        newErrors.email = 'Invalid email format';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
  
      if (actionType === 'CREATE') {
        await createCustomer(payload);
      } 
      else {
        await updateCustomer(editPayload?._id, payload);
      }
      setPageLoad((prev) => !prev);
      setPayload(initialPayload);
      handleClose();
    }
    catch (e) {
      alert(e?.response?.data?.message)
    }



   
  };

  return (
    <form onSubmit={handleSubmit} className='h-screen pt-3'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Name"
            name="name"
            value={payload.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone Number"
            name="phone"
            value={payload.phone}
            onChange={handleChange}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            name="email"
            value={payload.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Address"
            name="address"
            value={payload.address}
            onChange={handleChange}
            fullWidth
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Current Organization"
            name="organization"
            value={payload.organization}
            onChange={handleChange}
            fullWidth
            error={!!errors.organization}
            helperText={errors.organization}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CustomerForm;
