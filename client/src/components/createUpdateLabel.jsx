
import React, { useEffect, useState } from 'react';

const initialPayload = { title: ''};

function CreateUpdateLabel({ actionType, editPayload, setPageLoad, handleClose }) {

  const [payload, setPayload] = useState(initialPayload);
  const [labels, setLabels] = useState([]);
 

  useEffect(() => {
    const storedLabels = JSON.parse(localStorage.getItem('labels')) || [];
    setLabels(storedLabels);
  }, []);

  useEffect(() => {
    if (actionType === 'UPDATE') {
      const { title } = editPayload;
      setPayload({ title });
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
         createLabel(payload);
      } 
      else {
        updateLabel(editPayload?.id, payload);
      }
      setPageLoad((prev) => !prev);
      setPayload(initialPayload);
      handleClose();
    } 
    catch (e) {
      alert(e?.message)
    }
  };

  const createLabel = (label) => {
    const labelExists = labels.some(t => t.title.toLowerCase() === label.title.toLowerCase());
    if (!labelExists) {
      const newLabel= { ...label, id: getNextId(labels) };
      localStorage.setItem('labels', JSON.stringify([...labels, newLabel]));
    } 
    else {
      alert('Task with the same description already exists.');
    }
  };

  const updateLabel = (id, label) => {
    try {
      const updatedLabels = labels.map((t) => t.id === id ? { ...t, ...label } : t);
      localStorage.setItem('labels', JSON.stringify(updatedLabels));
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

export default CreateUpdateLabel;
