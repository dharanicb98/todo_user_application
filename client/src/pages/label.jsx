import React, { useState , useEffect} from 'react'
import Table from '../components/table'
import Dialog from '../components/dialog'
import { DeleteIcon, EditIcon } from '../icons';
import CreateUpdateLabel from '../components/createUpdateLabel';

const TABLE_COLUMNS = [
  {
    fieldName: "id",
    headName: "ID",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "title",
    headName: "Title",
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

  useEffect(() => {
    getData();
  }, [pageLoad]);

  async function getData() {
    try {
      const response = localStorage.getItem('labels')
      if (response) {
        const data = JSON.parse(response);
        let result = transformRows(data);
        setRows(result);
      } 
      else {
        setRows([]);
      }
    }
    catch (e) {
      console.log(e)
      alert(e?.message)
    }
  }

  function transformRows( response ) {
    return response?.map((res) => ({
     ...res, 
     edit: getEditComponent(res),
     delete:getDeleteComponent(res),
    }))
  }

  function getEditComponent(item) {
    return (
      <div onClick={() => {setEditPayload(item); setOpen(true); setActionType('UPDATE') }}><EditIcon /></div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div onClick={() => {setDeleteObj(item); setDeleteId(item?.id);  setDeleteOpen(true)}}>  <DeleteIcon /></div>
    );
  }

  const handleDeletClose = () => {
     setDeleteId(null)
     setDeleteObj({});
     setDeleteOpen(false);
  }

  const handleDeleteClose = async () => {
    try {
      let updateData = rows.filter((task) => task.id !== deleteId)
      localStorage.setItem('labels', JSON.stringify(updateData));
      setPageLoad((prev) => !prev);
      handleDeletClose();
    }
    catch (e) {  
      alert(e?.message)
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

      <Dialog  title='Label' createClick={actionType} isOpen={open} closeModal={() => {setOpen(false); setActionType('CREATE')}}>
          <CreateUpdateLabel
            setPageLoad={setPageLoad}
            actionType={actionType}
            editPayload={editPayload}
            handleClose={() => {setOpen(false); setActionType('CREATE')}}
          />
      </Dialog>

      <Dialog title='Todo' createClick={'Delete'} isOpen={deleteOpen} closeModal={() => {handleDeletClose()}}>
          <div>
            <h1><span className='font-bold mt-3'>Title:</span> {deleteObj?.title}</h1>
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


