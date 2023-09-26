// JavaScript code to handle the scanning and display of registration numbers
const scanButton = document.getElementById('scanButton');
const registrationList = document.getElementById('registrationList');

scanButton.addEventListener('click', () => {
    // Simulate scanning and extracting the registration number
    const scannedNumber = generateRandomRegistrationNumber();
    const listItem = document.createElement('li');
    listItem.textContent = scannedNumber;
    registrationList.appendChild(listItem);
});

// Function to generate a random registration number (for simulation purposes)
function generateRandomRegistrationNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let result = '';
    for (let i = 0; i < 3; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return result;
}
