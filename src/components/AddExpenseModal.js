import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' classId='name'>
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptRef} type='text' required></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' classId='max'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type='number'
              min={0}
              step={0.01}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' classId='max'>
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>
                {UNCATEGORIZED_BUDGET_ID}
              </option>
              {budgets.map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
            </Form.Select>
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

export default AddExpenseModal;
