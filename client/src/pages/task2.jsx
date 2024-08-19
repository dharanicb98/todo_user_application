import React, { useState , useEffect} from 'react'
import Table from '../components/table'
import Dialog from '../components/dialog'
import { DeleteIcon, EditIcon } from '../icons';
import moment from 'moment'
import { deleteCustomer, getAllCustomers } from '../services/customer';
import CustomerForm from '../components/createUpdateCustomer';

const TABLE_COLUMNS = [
  {
    fieldName: "_id",
    headName: "ID",
    className: "flex-1 min-w-[200px]",
  },
  {
    fieldName: "name",
    headName: "Name",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "email",
    headName: "Email",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "phone",
    headName: "Phone",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "address",
    headName: "Address",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "organization",
    headName: "Organization",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "createdAt",
    headName: "Created At",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "updatedAt",
    headName: "Updated At",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "edit",
    headName: "Edit",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "delete",
    headName: "Delete",
    className: "flex-1 min-w-[100px]",
  },
];

function Labels() {
  const [rows, setRows] = useState([]);
  const [pageLoad, setPageLoad] = useState(false);
  const [editPayload, setEditPayload] = useState({});
  const [actionType, setActionType] = useState('CREATE');
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteObj, setDeleteObj] = useState({})



  const formatDate = (date) => moment(new Date(date)).format("ddd MMM D, YYYY");


  useEffect(() => {
    getData();
  }, [pageLoad]);

  async function getData() {
    try {
      const response = await getAllCustomers();
      let result = transformRows(response);
      setRows(result);
    }
    catch (e) {
      console.log(e)
      alert(e?.response?.data?.message)
    }
  }

  function transformRows( response ) {
    return response?.map((res) => ({
     ...res, 
     edit: getEditComponent(res),
     delete:getDeleteComponent(res),
     createdAt: formatDate(res.createdAt),
     updatedAt: formatDate(res.updatedAt),
    }))
  }

  function getEditComponent(item) {
    return (
      <div onClick={() => {setEditPayload(item); setOpen(true); setActionType('UPDATE') }}><EditIcon /></div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div onClick={() => {setDeleteObj(item); setDeleteId(item?._id);  setDeleteOpen(true)}}>  <DeleteIcon /></div>
    );
  }

  const handleDeletClose = () => {
     setDeleteId(null)
     setDeleteObj({});
     setDeleteOpen(false);
  }

  const handleDeleteClose = async () => {
    try {
      await deleteCustomer(deleteId)
      setPageLoad((prev) => !prev);
      handleDeletClose();
    }
    catch (e) {  
      alert(e?.response?.data?.message)
    }
  }

  return (
    <>
     <div className='h-screen pt-28'>
     <div className='my-3 flex items-center justify-end mx-2'><button onClick={(e) => setOpen(true)} className='bg-black text-white hover:text-black hover:bg-white border border-black p-2 rounded-md'>Create</button></div>
     
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
        />
      )}

      <Dialog width='w-[600px]' height='h-[400px] p-3' title='Label' createClick={actionType} isOpen={open} closeModal={() => {setOpen(false); setActionType('CREATE')}}>
          <CustomerForm
            setPageLoad={setPageLoad}
            actionType={actionType}
            editPayload={editPayload}
            handleClose={() => {setOpen(false); setActionType('CREATE')}}
          />
      </Dialog>

      <Dialog title='Todo' createClick={'Delete'} isOpen={deleteOpen} closeModal={() => {handleDeletClose()}}>
          <div>
            <h1><span className='font-bold mt-3'>Name:</span> {deleteObj?.name}</h1>
            <h1><span className='font-bold mt-3'>Phone:</span> {deleteObj?.phone}</h1>
            <h1><span className='font-bold mt-3'>Email:</span> {deleteObj?.email}</h1>
            <div className='mt-6 flex items-center justify-between'>
              <button className='border border-black hover:bg-black hover:text-white py-2 px-3 rounded-md' onClick={handleDeletClose}>Close</button>
              <button className='py-2 px-3 rounded-md bg-black text-white hover:text-black hover:bg-white border border-black' onClick={handleDeleteClose}>Delete</button>
            </div>
          </div>
      </Dialog>

     </div>
    </>
  )
}

export default Labels


