import inquirer from 'inquirer';

// Define the Student class
class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 100;
    }

    // Method to enroll a student in a course
    enrollCourse(course: string) {
        this.courses.push(course);
    }

    // Method to view a student balance
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }

    // Method to pay student fees
    payFees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }

    // Method to display student status
    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}

// Define a StudentManager class
class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    // Method to add a new student
    addStudent(name: string) {
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`New student added with ID: ${newStudent.id}`);
    }

    // Method to enroll a student in a course
    enrollStudent(studentId: number, course: string) {
        const student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    // Method to view a student's balance
    viewStudentBalance(studentId: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    // Method to pay a student's fees
    payStudentFees(studentId: number, amount: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    // Method to display a student's status
    showStudentStatus(studentId: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    // Method to find a student by student ID
    findStudent(studentId: number): Student | undefined {
        return this.students.find(std => std.id === studentId);
    }
}

// Main function to run the program
async function main() {
    console.log("Welcome to 'Aeyla' - Student Management System");
    console.log("-".repeat(50));

    const studentManager = new StudentManager();

    // While loop to keep program running
    while (true) {
        const choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add a new student",
                    "Enroll Student",
                    "View a student balance",
                    "Pay a student's fees",
                    "Show student status",
                    "Exit"
                ]
            }
        ]);

        // Using switch case to handle user choice
        switch (choice.choice) {
            case "Add a new student":
                const nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter student name",
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;

            case "Enroll Student":
                const courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter course name",
                    }
                ]);
                studentManager.enrollStudent(parseInt(courseInput.studentId), courseInput.course);
                break;

            case "View a student balance":
                const balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter student ID",
                    }
                ]);
                studentManager.viewStudentBalance(parseInt(balanceInput.studentId));
                break;

            case "Pay a student's fees":
                const feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter student ID",
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter fees amount",
                    }
                ]);
                studentManager.payStudentFees(parseInt(feesInput.studentId), parseFloat(feesInput.amount));
                break;

            case "Show student status":
                const statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter student ID",
                    }
                ]);
                studentManager.showStudentStatus(parseInt(statusInput.studentId));
                break;

            case "Exit":
                console.log("Exiting the program...");
                process.exit();
        }
    }
}

// Calling the main function
main();
