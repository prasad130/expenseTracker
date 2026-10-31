package com.project.expensetracker.repository;

import com.project.expensetracker.entity.Expense;


import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
