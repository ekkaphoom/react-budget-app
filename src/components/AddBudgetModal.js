import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetContext';

const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' classId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type='text' required></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' classId='max'>
            <Form.Label>Max amount</Form.Label>
            <Form.Control
              ref={maxRef}
              type='number'
              min={0}
              step={0.01}
              required
            ></Form.Control>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
