const apiUrl = "http://localhost:8080/api/expenses";

// Load expenses
function loadExpenses() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("expenseTable");
            table.innerHTML = "";
            let total = 0;

            data.forEach((exp, index) => {
                total += exp.amount;

                table.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${exp.title}</td>
                        <td>${exp.amount}</td>
                        <td>${exp.category}</td>
                        <td>${exp.date}</td>
                        <td>
                            <button onclick="editExpense(${exp.id}, '${exp.title}', ${exp.amount}, '${exp.category}', '${exp.date}')">Edit</button>
                            <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
                        </td>
                    </tr>`;
            });

            document.getElementById("totalExpense").innerText = "Total: " + total;
        });
}

// Add or Update
function saveExpense() {
    const id = document.getElementById("expenseId").value;
    const expense = {
        title: document.getElementById("title").value,
        amount: document.getElementById("amount").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value
    };
    const method = id ? "PUT" : "POST";
    const url = id ? apiUrl + "/" + id : apiUrl;
    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    }).then(() => {
        clearInputs();
        loadExpenses();
    });
}
// Edit
function editExpense(id, title, amount, category, date) {
    document.getElementById("expenseId").value = id;
    document.getElementById("title").value = title;
    document.getElementById("amount").value = amount;
    document.getElementById("category").value = category;
    document.getElementById("date").value = date;
}
// Delete
function deleteExpense(id) {
    fetch(apiUrl + "/" + id, { method: "DELETE" })
        .then(() => loadExpenses());
}
// Clear form
function clearInputs() {
    document.getElementById("expenseId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
}
loadExpenses();
