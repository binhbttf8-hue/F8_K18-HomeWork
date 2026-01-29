abstract class Employee {
    private id: number;
    private name: string;
    private salary: number = 0;

    constructor(id: number, name: string, salary: number) {
        this.id = id;
        this.name = name;
        this.setSalary(salary);
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getSalary(): number {
        return this.salary;
    }

    setSalary(salary: number): void {
        if (salary <= 0) {
            console.log("Error: Salary must be greater than 0");
            return;
        }
        this.salary = salary;
    }

    abstract calculateSalary(): number;
}

// Tao 2 class ke thua Employee

// Class Developer ke thua Employee
class Developer extends Employee {
    private overtimeHours: number;

    constructor(id: number, name: string, salary: number, overtimeHours: number) {
        super(id, name, salary);
        this.overtimeHours = overtimeHours;
    }

    getOvertimeHours(): number {
        return this.overtimeHours;
    }

    setOvertimeHours(hours: number): void {
        this.overtimeHours = hours;
    }

    calculateSalary(): number {
        return this.getSalary() + this.overtimeHours * 50_000;
    }
}

// Class Manager ke thua Employee
class Manager extends Employee {
    private teamSize: number;

    constructor(id: number, name: string, salary: number, teamSize: number) {
        super(id, name, salary);
        this.teamSize = teamSize;
    }

    getTeamSize(): number {
        return this.teamSize;
    }

    setTeamSize(teamSize: number): void {
        this.teamSize = teamSize;
    }

    // Override calculateSalary: lương = salary + teamSize * 200_000
    calculateSalary(): number {
        return this.getSalary() + this.teamSize * 200_000;
    }
}

console.log("Employee");

// Tạo Developer
const dev1 = new Developer(1, "Bui Thi Thanh Binh", 25_000_000, 20);
console.log("Developer");
console.log(`ID: ${dev1.getId()}`);
console.log(`Name: ${dev1.getName()}`);
console.log(`Base Salary: ${dev1.getSalary()} VND`);
console.log(`Overtime Hours: ${dev1.getOvertimeHours()}`);
console.log(`Total Salary: ${dev1.calculateSalary()} VND\n`);

// Tạo Manager
const manager1 = new Manager(2, "Nguyen Xuan Khanh", 40_000_000, 5);
console.log("Manager:");
console.log(`ID: ${manager1.getId()}`);
console.log(`Name: ${manager1.getName()}`);
console.log(`Base Salary: ${manager1.getSalary()} VND`);
console.log(`Team Size: ${manager1.getTeamSize()}`);
console.log(`Total Salary: ${manager1.calculateSalary()} VND`);

// Test lương phải > 0
console.log("Test Validation");
const invalidEmployee = new Developer(3, "Test Invalid", -1000, 0);
console.log(`Invalid Employee: ${invalidEmployee.getSalary()}`);

// Test thay đổi lương
dev1.setName("Bui Thi Thanh Binh (updated)");
dev1.setOvertimeHours(30);
console.log("After Update:");
console.log(`Developer Name: ${dev1.getName()}`);
console.log(`New Total Salary: ${dev1.calculateSalary()} VND`);