var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Transaction;
}());
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    // Method 1
    Customer.prototype.getName = function () {
        return this.name;
    };
    // Method 2
    Customer.prototype.getId = function () {
        return this.id;
    };
    // Method 3
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    // Method 4
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transaction) { return total + transaction.amount; }, 0);
    };
    // Method 5
    Customer.prototype.addTransactions = function (amount) {
        if (amount < 0 && this.getBalance() < Math.abs(amount)) {
            return false;
        }
        var transaction = new Transaction(amount, new Date());
        this.transactions.push(transaction);
        console.log("transaction completed successfully.");
        return true;
    };
    return Customer;
}());
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    // Method 1
    Branch.prototype.getName = function () {
        return this.name;
    };
    // Method 2
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    // Method 3
    Branch.prototype.addCustomer = function (customer) {
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            console.log("Customer ".concat(customer.name, " with id: ").concat(customer.id, " added now "));
            return true;
        }
        else {
            console.log("Customer ".concat(customer.name, " with id: ").concat(customer.id, " already exists."));
            return false;
        }
    };
    // Method 4
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (customer) { return customer.id === customerId; });
        if (customer) {
            customer.addTransactions(amount);
        }
        else {
            console.log("Customer with Id: ".concat(customerId, " is not existed in this branch"));
            return false;
        }
    };
    return Branch;
}());
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    // Method 1
    Bank.prototype.addBranch = function (branch) {
        if (!this.branches.includes(branch)) {
            this.branches.push(branch);
            console.log("".concat(branch.name, " added now ! ."));
            return true;
        }
        else {
            console.log("".concat(branch.name, " already exists."));
            return false;
        }
    };
    // Method 2
    Bank.prototype.addCustomer = function (branch, customer) {
        var existingCustomer = this.branches.some(function (b) { return b.customers.some(function (c) { return c.id === customer.id; }); });
        if (existingCustomer) {
            console.log("Customer ".concat(customer.name, " with id: ").concat(customer.id, ", already exists in another branch."));
            return false;
        }
        else if (this.branches.includes(branch)) {
            console.log("".concat(branch.name, ":"));
            return branch.addCustomer(customer);
        }
        else {
            console.log("".concat(branch.name, " this branch does not exist."));
            return false;
        }
    };
    // Method 3
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        if (this.branches.includes(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
        }
        else {
            return false;
        }
    };
    // Method 4
    Bank.prototype.findBranchByName = function (branchName) {
        var branch = this.branches.find(function (branch) { return branch.name === branchName; });
        if (branch) {
            console.log("".concat(branchName, " is existed."));
            return branch;
        }
        else {
            console.log("".concat(branchName, " is not existed."));
            return false;
        }
    };
    // Method 5
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    // Method 6
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        var customers = branch.getCustomers();
        if (this.branches.includes(branch)) {
            var output = "Customer details for branch ".concat(branch.name, "\n");
            for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
                var customer = customers_1[_i];
                output += "Customer: ".concat(customer.name, " - ").concat(customer.id, "\n");
                if (includeTransactions) {
                    output += "Transactions\n";
                    var transactions = customer.getTransactions();
                    for (var _a = 0, transactions_1 = transactions; _a < transactions_1.length; _a++) {
                        var transaction = transactions_1[_a];
                        output += "Amount ".concat(transaction.amount, " Date ").concat(transaction.date, "\n");
                    }
                }
            }
            return output;
        }
        else {
            return false;
        }
    };
    return Bank;
}());
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", "1");
var customer2 = new Customer("Anna", "2");
var customer3 = new Customer("John", "3");
("***********************************************************************");
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
console.log("***********************************************************************");
arizonaBank.findBranchByName("bank");
arizonaBank.findBranchByName("sun");
console.log("***********************************************************************");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
console.log("***********************************************************************");
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
console.log("***********************************************************************");
customer1.addTransactions(-1000);
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));