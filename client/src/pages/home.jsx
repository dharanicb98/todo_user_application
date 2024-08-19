import React, { useState , useEffect} from 'react'
import Table from '../components/table'
import Dialog from '../components/dialog'
import CreateUpdateTodo from '../components/createUpdateTodo'
import { useNavigate } from 'react-router-dom';


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
    fieldName: "description",
    headName: "Description",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "status",
    headName: "Status",
    className: "flex-1 min-w-[100px]",
  },
  {
    fieldName: "label",
    headName: "Tag",
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

function Home() {
  const [rows, setRows] = useState([]);
  const [pageLoad, setPageLoad] = useState(false);
  const [editPayload, setEditPayload] = useState({});
  const [actionType, setActionType] = useState('CREATE');
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteObj, setDeleteObj] = useState({});
  const [labelHashMap,setLabelHashMap] =useState({});


  const navigate = useNavigate()

  useEffect(() => {
    getData();
  }, [pageLoad]);

  async function getData() {
    try {
      const response = localStorage.getItem('tasks') 
      const labels = localStorage.getItem('labels')
      if (labels) {
        const labelsData = JSON.parse(labels);
        const labelMap = labelsData.reduce((map, label) => {
          map[label.id] = label.title;
          return map;
        }, {});
        setLabelHashMap(labelMap);
      }
      if (response) {
        const data = JSON.parse(response);
        let result = transformRows(data);
        setRows(result);
      }
       else {
        setRows([]); // If no data, set rows to an empty array
      }
    }
    catch (e) {
      alert(e?.message)
    }
  }

  function transformRows( response ) {
    return response?.map((res) => ({
     ...res, 
     edit: getEditComponent(res),
     delete:getDeleteComponent(res),
     status:getStatusComponent(res.status),
     label: <div>{labelHashMap[res?.label]}</div> 
    }))
  }

  function getStatusComponent(status) {
     if (status === 'completed') {
        return <div className='flex items-center justify-center text-[#20A548] bg-[#e6f8eb] rounded px-2 py-2 w-[100px]'><p>Completed</p></div>
     }
     else {
      return <div className='bg-[#fae6ea] text-[#D3232F] flex items-center justify-center rounded px-2 py-2 w-[100px]'><p>Pending</p> </div>
     }
  }

  function getEditComponent(item) {
    return (
      <div onClick={() => {setEditPayload(item); setOpen(true); setActionType('UPDATE') }}><EditIcon /></div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div
        onClick={() => {setDeleteObj(item); setDeleteId(item?.id);  setDeleteOpen(true)}}
        // onClick={() => console.log(item)}
        >
        <DeleteIcon />
      </div>
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
      localStorage.setItem('tasks', JSON.stringify(updateData));
      setPageLoad((prev) => !prev);
      handleDeletClose();
    }
    catch (e) {  
      alert(e?.message)
    }
  }

  console.log('labelHashMap',labelHashMap)
  console.log('rows',rows)

  return (
    <>
     <div className='h-screen pt-28'>
     <div className='my-3 flex items-center justify-end mx-2 gap-x-2'>
      <button onClick={(e) => setOpen(true)} className='bg-black text-white hover:text-black hover:bg-white border border-black p-2 rounded-md'>Create Todo</button>
      <button onClick={() => navigate('/labels')} className='bg-black text-white hover:text-black hover:bg-white border border-black p-2 rounded-md'>View Labels</button>
     </div>
     
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
        />
      )}

      <Dialog title='Todo' createClick={actionType} isOpen={open} closeModal={() => {setOpen(false); setActionType('CREATE')}}>
          <CreateUpdateTodo
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

export default Home



const EditIcon = () => (
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-6 h-6 text-blue-700 hover:scale-125 cursor-pointer`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  </div>
);

const DeleteIcon = () => (
  <div >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="red"
      className={`w-6 h-6 text-red-700 hover:scale-125 cursor-pointer`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  </div>
);