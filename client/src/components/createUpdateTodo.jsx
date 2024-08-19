import React, { useEffect, useState } from 'react';

const initialPayload = { title: '', status: '', label:'', description:'' };

function CreateUpdateTodo({ actionType, editPayload, setPageLoad, handleClose }) {
  const [payload, setPayload] = useState(initialPayload);


  const [labels, setLabels] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedLabels = JSON.parse(localStorage.getItem('labels')) || [];
    setLabels(storedLabels);
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (actionType === 'UPDATE') {
      const { title, status,label,description } = editPayload;
      setPayload({ title, status, label, description });
    } 
    else {
      setPayload(initialPayload);
    }
  }, [editPayload, actionType]); 

  const getNextId = (array) => {
    return array?.length > 0 ? Math?.max(...array.map(item => item.id)) + 1 : 1;
  };

  const handleOnChange = (e, key) => {
    let value = e.target.value;
    setPayload((prev) => ({ ...prev, [key]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (actionType === 'CREATE') {
        console.log('label', payload)
         createTodo(payload);
      } 
      else {
        updateTodo(editPayload?.id, payload);
      }
      setPageLoad((prev) => !prev);
      setPayload(initialPayload);
      handleClose();
    } 
    catch (e) {
      alert(e?.message)
    }
  };

  const createTodo = (task) => {
    const taskExists = tasks.some(t => t.title.toLowerCase() === task.title.toLowerCase());
    if (!taskExists) {
      const newTask = { ...task, id: getNextId(tasks) };
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    } 
    else {
      alert('Task with the same description already exists.');
    }
  };

  const updateTodo = (id, task) => {
    try {
      const updatedTasks = tasks.map((t) => t.id === id ? { ...t, ...task } : t);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    catch (e) {
      alert(e?.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='text-lg text-slate-600'>Title</label>
          <input
       
            value={payload.title}
            type='text'
            onChange={(e) => handleOnChange(e, 'title')}
            className='border rounded-md p-2 focus:border-black focus:outline-none'
          />
        </div>

        <div className='flex flex-col mt-3'>
          <label className='text-lg text-slate-600'>Status</label>
          <select
            onChange={(e) => handleOnChange(e, 'status')}
            value={payload.status}
            className='border rounded-md p-2 focus:border-black focus:outline-none'
          >
            <option value=''>Choose status</option>
            <option value={"pending"}>Pending</option>
            <option value={"completed"}>Completed</option>
          </select>
        </div>

        <div className='flex flex-col mt-3'>
          <label className='text-lg text-slate-600'>Label</label>
          <select
            onChange={(e) => handleOnChange(e, 'label')}
            value={payload?.label} className='border rounded-md p-2 focus:border-black focus:outline-none'>
            <option value=''>Choose Label</option>
            {labels &&labels?.map((label,idx) => (
              <option key={idx} value={label?.id}>{label?.title}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col mt-3'>
          <label className='text-lg text-slate-600'>Description</label>
          <textarea
            value={payload.description}
            onChange={(e) => handleOnChange(e, 'description')}
            className='border rounded-md p-2 focus:border-black focus:outline-none'
          />
        </div>

        <div className='mt-6 flex items-center justify-between'>
          <button className='border border-black hover:bg-black hover:text-white py-2 px-3 rounded-md' type='button' onClick={handleClose}>
            Close
          </button>
          <button className='py-2 px-3 rounded-md bg-black text-white hover:text-black hover:bg-white border border-black' type='submit'>
            {actionType === 'CREATE' ? 'Create' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUpdateTodo;
