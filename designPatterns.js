//Factory Pattern
function Developer (name) {
    this.name = name
    this.type = "Developer"
}

function Tester (name) {
    this.name = name
    this.type = "Tester"
}

function EmployeePattern() {
    this.create = (name, type) => {
        switch(type) {
            case 1: {
                return new Developer(name)
                break;
            }
            case 2: {
                return new Tester(name)
                break;
            }
                
        }
    }
}

function logger () {
    console.log(`Hi I am ${this.name} and I am ${this.type}`)
}

const employeePattern = new EmployeePattern()
const employees = []

employees.push(employeePattern.create("Jake", 1))
employees.push(employeePattern.create("Terry", 1))
employees.push(employeePattern.create("Amy", 2))
employees.push(employeePattern.create("Rosa", 2))
employees.push(employeePattern.create("Gina", 1))


// employees.forEach((val) => logger.call(val)) -> to print


//Singleton Pattern
function Process (state) {
    this.state = state
}

const Singleton = (function(){
    function ProcessManager () {
        this.numProcess = 0
    }

    let pManager

    function createProcessManager() {
        pManager = new ProcessManager()
        return pManager
    }
    
    return {
        getProcessManager: () => {
            if(!pManager)
                pManager = createProcessManager()
            return pManager
        }
    }
})()

const processManager1 = Singleton.getProcessManager()
const processManager2 = Singleton.getProcessManager()
// console.log(processManager1 === processManager2)


// 1. Creating the `Counter` class, which contains a `constructor`, `getInstance`, `getCount`, `increment` and `decrement` method.
// Within the constructor, we check to make sure the class hasn't already been instantiated.
class Counter {
    constructor() {
      if (instance) {
        throw new Error("You can only create one instance!");
      }
      this.counter = counter;
      instance = this;
    }
  
    getCount() {
      return this.counter;
    }
  
    increment() {
      return ++this.counter;
    }
  
    decrement() {
      return --this.counter;
    }
  }
  
  // 2. Setting a variable equal to the the frozen newly instantiated object, by using the built-in `Object.freeze` method.
  // This ensures that the newly created instance is not modifiable.
  const singletonCounter = Object.freeze(new Counter());
  
//   // 3. Exporting the variable as the `default` value within the file to make it globally accessible.
//   export default singletonCounter;



//Strategy Pattern
function Fedex () {
    this.calculate = package => {
        //fedex calculations
        return 2.45
    }
}

function UPS () {
    this.calculate = package => {
        //ups calculations
        return 1.56
    }
}

function USPS () {
    this.calculate = package => {
        //usps calculations
        return 1.3
    }
}

function Shipping () {
    this.company = ""
    this.setStrategy = company => {
        this.company = company
    }
    this.calculate = package => {
        return this.company.calculate(package)
    }
}

const fedex = new Fedex()
const ups =  new UPS()
const usps = new USPS()
const package = { from: "Alabama", to: "Georgia", weight: "23lb"}

const shipping = new Shipping()
// shipping.setStrategy(fedex)
// console.log(shipping.calculate(package))

// shipping.setStrategy(ups)
// console.log(shipping.calculate(package))

// shipping.setStrategy(usps)
// console.log(shipping.calculate(package))



