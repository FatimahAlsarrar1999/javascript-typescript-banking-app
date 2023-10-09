class Transaction {
    amount: number;
    date: Date;
    constructor(amount: number, date: Date){
        this.amount = amount;
        this.date = date;
    }
}

class Customer {
    name: string;
    id: number;
    transactions: Transaction[];
    constructor(name: string, id: number){
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    // Method 1
    getName(): string {
        return this.name;
      }
    

    // Method 2
    getId() : number {
        return this.id;
    }
    
    // Method 3
    getTransactions(): Transaction[] {
        return this.transactions;
      }

    // Method 4
    getBalance(): number {
        return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
    }

    // Method 5
    addTransactions(amount: number) : boolean{
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
    name: string;
    customers: Customer[];
    constructor (name: string){
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
    addCustomer(customer: Customer){
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
    addCustomerTransaction(customerId: number, amount: number){
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
    name: string;
    branches: Branch[];
    constructor (name: string){
        this.name = name;
        this.branches = [];
    }

    // Method 1
    addBranch(branch: Branch) {
        if (!this.branches.includes(branch)) {
            this.branches.push(branch);
            console.log(`${branch.name} added successfully.`);
            return true;

          }
     
          else {
              console.log(`${branch.name} already exists.`);
              return false;
          } 
    }

    // Method 2
    
    addCustomer(branch: Branch, customer: Customer): boolean {
        if (this.branches.includes(branch)) {
          return branch.addCustomer(customer);
        }
        return false;
      }

    // Method 3
    addCustomerTransaction(branch: Branch, customerId: number, amount: number){
        if (this.branches.includes(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
          }else{
              return false;
          } 
    }

    // Method 4
    findBranchByName(branchName: string){
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
    checkBranch(branch: Branch){
        return this.branches.includes(branch);
    }

    // Method 6
    listCustomers(branch: Branch, includeTransactions: boolean){
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