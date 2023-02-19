import './App.css';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';

import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpenseModal';

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  // const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  function openViewExpenseModal(budgetId) {
    console.log(budgetId);
    // setShowViewExpenseModal(true);
    setViewExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap={2} className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowBudgetModal(true)}>
            {' '}
            Add Budget
          </Button>
          <Button
            variant='outline-primary'
            onClick={() => openAddExpenseModal()}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, mixmax(300px,1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {budgets.map((budget) => {
            console.log(budget.id, getBudgetExpenses(budget.id));
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                id={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                gray={true}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => openViewExpenseModal(budget.id)}
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              openViewExpenseModal(UNCATEGORIZED_BUDGET_ID)
            }
          ></UncategorizedBudgetCard>
          <TotalBudgetCard></TotalBudgetCard>
        </div>
      </Container>
      <AddBudgetModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      ></AddBudgetModal>
      <AddExpenseModal
        show={showExpenseModal}
        handleClose={() => setShowExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      ></AddExpenseModal>
      <ViewExpensesModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => openViewExpenseModal()}
      ></ViewExpensesModal>
    </>
  );
}

export default App;
