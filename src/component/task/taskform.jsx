import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import DynamicModal from '../share/dynamicModel';

export default function AddTaskFormModal({ open, onClose, onSubmitTask }) {
  const [form, setForm] = useState({ name: '' });

  const handleChange = (e) => {
    setForm({ name: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name.trim()) {
      onSubmitTask(form); // send form data to parent
      setForm({ name: '' }); // clear form
      onClose();
    } else {
      alert('Task name is required');
    }
  };

  return (
    <DynamicModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add New Task"
      submitLabel="Add Task"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Task Name"
          variant="standard"
          fullWidth
          value={form.name}
          onChange={handleChange}
          required
        />
      </Box>
    </DynamicModal>
  );
}
