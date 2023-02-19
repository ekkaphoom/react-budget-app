import { createContext, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetContext = createContext();
export function useBudgets() {
  return useContext(BudgetContext);
}

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudget] = useLocalStorage('budgets', []);
  const [expenses, setExpense] = useLocalStorage('expenses', []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addBudget({ name, max }) {
    setBudget((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [
        ...prevBudgets,
        {
          id: uuidV4(),
          name,
          max,
        },
      ];
    });
  }
  function addExpense({ description, amount, budgetId }) {
    setExpense((prevExpense) => {
      return [
        ...prevExpense,
        {
          id: uuidV4(),
          description,
          amount,
          budgetId,
        },
      ];
    });
  }
  function deleteBudget({ id }) {
    setExpense((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudget((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpense((prevExpense) => {
      return prevExpense.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
