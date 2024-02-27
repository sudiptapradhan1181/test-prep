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



