import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AddDataButtonProps {
  onClick: () => void;
}

const AddDataButton: React.FC<AddDataButtonProps> = ({ }) => {
  const navigate = useNavigate()
  const handleAdd = () => {
    navigate('/newtransaction')
  }
  return (
    <button className='btn btn-primary' onClick={handleAdd}>Add New Data</button>
  );
}

export default AddDataButton;
