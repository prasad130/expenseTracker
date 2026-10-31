package com.project.expensetracker.service;

import com.project.expensetracker.entity.Expense;
import java.util.List;

public interface ExpenseService {

    Expense saveExpense(Expense expense);

    List<Expense> getAllExpenses();

    void deleteExpense(Long id);

}
