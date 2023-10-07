class Transaction {
    constructor(amount, date){
        this.amount = amount;
        this.date = date;
    }
}

class Customer {
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    // Method 1
    getName(){
        return this.name;
    }

    // Method 2
    getId(){
        return this.id;
    }
    
    // Method 3
    getTransactions(){
        return this.transactions;
    }

    // Method 4
    getBalance(){
        return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
    }

    // Method 5
    addTransactions(amount){
        if (amount < 0 && this.getBalance() < Math.abs(amount)) {
            return false;
        }
        let transaction = new Transaction(amount, new Date());
        this.transactions.push(transaction);
        console.log(`transaction completed successfully.`);
        return true;
    }
    
}

class Branch {
    constructor (name){
        this.name = name;
        this.customers = [];
    }

    // Method 1
    getName(){
        return this.name;
    }

    // Method 2
    getCustomers(){
        return this.customers;
    }

    // Method 3
    addCustomer(customer){
        if(!this.customers.includes(customer)){
            this.customers.push(customer);
            console.log(`Customer ${customer.name} with ID: ${customer.id} added successfully.`);
            return true; 
        }else{
            console.log(`Customer ${customer.name} with ID: ${customer.id} already exists.`);
            return false; 
        }
    }

    // Method 4
    addCustomerTransaction(customerId, amount){
        let customer = this.customers.find(customer => customer.id === customerId);
        if (customer){
            customer.addTransactions(amount);
        }else{
            console.log(`Customer with Id: ${customerId} is not existed in this branch`);
            return false;
        }
    }
}

class Bank {
    constructor (name){
        this.name = name;
        this.branches = [];
    }

    // Method 1
    addBranch(branch){
        if (!this.branches.includes(branch)) {
            this.branches.push(branch);
            console.log(`${branch.name} added successfully.`);
            return true;
          }else{
              console.log(`${branch.name} already exists.`);
              return false;
          } 
    }

    // Method 2
    addCustomer(branch, customer){
        let existingCustomer = this.branches.some(b => b.customers.some(c => c.id === customer.id));
        if (existingCustomer) {
            console.log(`Customer ${customer.name} with ID: ${customer.id}, already exists in another branch.`);
            return false;
        } else if (this.branches.includes(branch)) {
            console.log(`${branch.name}:`);
            return branch.addCustomer(customer);
        } else {
            console.log(`${branch.name} this branch does not exist.`);
            return false;
        } 
    }

    // Method 3
    addCustomerTransaction(branch, customerId, amount){
        if (this.branches.includes(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
          }else{
              return false;
          } 
    }

    // Method 4
    findBranchByName(branchName){
        let branch = this.branches.find(branch => branch.name === branchName);
        if (branch){
            console.log(`${branchName} is existed.`);
            return branch;
        }else{
            console.log(`${branchName} is not existed.`);
            return false;
        }
    }

    // Method 5
    checkBranch(branch1){
        return this.branches.includes(branch);
    }

    // Method 6
    listCustomers(branch, includeTransactions){
        const customers = branch.getCustomers();
        if (this.branches.includes(branch)) {
            let output = `Customer details for branch ${branch.name}\n`;
            for (let customer of customers){
                output += `Customer: ${customer.name} - ${customer.id}\n`;
                if (includeTransactions){
                    output += `Transactions\n`;
                    let transactions = customer.getTransactions();
                    for (let transaction of transactions){
                        output += `Amount ${transaction.amount} Date ${transaction.date}\n`;
                    }
                }
            }
            return output;
        }else{
            return false;
        }
    }
}


const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch) 
console.log("***********************************************************************")

arizonaBank.findBranchByName("bank")
arizonaBank.findBranchByName("sun")
console.log("***********************************************************************")

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)
console.log("***********************************************************************")

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)
console.log("***********************************************************************")

customer1.addTransactions(-1000)
console.log(customer1.getBalance())
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))