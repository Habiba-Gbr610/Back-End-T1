const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let people = [];
let currentPerson = {};

function getPersonData() {
    if (people.length >= 10) { 
        showMenu();
        return;
    }

    console.log(`\n--- Enter data for person ${people.length + 1} ---`);
    rl.question('Enter ID: ', (id) => {
        currentPerson.id = id;
        rl.question('Enter First Name: ', (firstName) => {
            currentPerson.firstName = firstName;
            rl.question('Enter Last Name: ', (lastName) => {
                currentPerson.lastName = lastName;
                rl.question('Enter Age: ', (age) => {
                    currentPerson.age = age;
                    rl.question('Enter City: ', (city) => {
                        currentPerson.city = city;
                        
                        // حفظ النسخة في المصفوفة
                        people.push({ ...currentPerson });
                        currentPerson = {};
                        
                        getPersonData(); // تكرار لحد ما يكملوا
                    });
                });
            });
        });
    });
}

function showMenu() {
    console.log('\n================ CHOOSE AN OPTION ================');
    console.log('1. View all people data');
    console.log('2. View specific person data (by ID)');
    console.log('3. Delete all people');
    console.log('4. Delete specific person (by ID)');
    console.log('5. View Full Name and City for each person');
    console.log('6. Exit');

    rl.question('Enter your choice (1-6): ', (choice) => {
        switch (choice.trim()) {
            case '1':
                console.log('\n--- All People Data ---');
                console.table(people);
                showMenu();
                break;
            case '2':
                rl.question('Enter ID to search: ', (searchId) => {
                    const person = people.find(p => p.id === searchId);
                    if (person) {
                        console.log('\nPerson Found:', person);
                    } else {
                        console.log('\nPerson not found!');
                    }
                    showMenu();
                });
                break;
            case '3':
                people = [];
                console.log('\nAll data deleted successfully.');
                showMenu();
                break;
            case '4':
                rl.question('Enter ID to delete: ', (deleteId) => {
                    people = people.filter(p => p.id !== deleteId);
                    console.log(`Person with ID ${deleteId} deleted (if existed).`);
                    showMenu();
                });
                break;
            case '5':
                console.log('\n--- Full Name & City ---');
                people.forEach((p, index) => {
                    console.log(`${index + 1}. Full Name: ${p.firstName} ${p.lastName} | City: ${p.city}`);
                });
                showMenu();
                break;
            case '6':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice, try again.');
                showMenu();
                break;
        }
    });
}

getPersonData();