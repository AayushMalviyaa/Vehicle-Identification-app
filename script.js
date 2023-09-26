// JavaScript code to handle camera integration and real-time scanning of registration numbers
const scanButton = document.getElementById('scanButton');
const registrationList = document.getElementById('registrationList');
const cameraFeed = document.getElementById('camera-feed'); // HTML video element for camera feed
let isScanning = false; // A flag to track if scanning is in progress
let mediaStream = null; // Variable to store the camera stream

// Event listener for the "Scan" button
scanButton.addEventListener('click', () => {
    if (!isScanning) {
        startScanning(); // Start scanning if not already scanning
        scanButton.textContent = 'Stop Scanning'; // Change button text to stop scanning
    } else {
        stopScanning(); // Stop scanning if already scanning
        scanButton.textContent = 'Start Scanning'; // Change button text to start scanning
    }
});

// Function to start camera feed and scanning
function startScanning() {
    isScanning = true;

    // Access the camera feed using WebRTC (getUserMedia)
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
            mediaStream = stream;
            cameraFeed.srcObject = stream;

            // Continuous frame capture and processing
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            function captureFrame() {
                if (!isScanning) {
                    stopScanning();
                    return;
                }

                canvas.width = cameraFeed.videoWidth;
                canvas.height = cameraFeed.videoHeight;
                context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

                // Process the captured frame for number plate recognition (replace this with OCR logic)
                processFrame(canvas.toDataURL('image/jpeg'));

                requestAnimationFrame(captureFrame);
            }

            // Start capturing frames
            captureFrame();
        })
        .catch(function (error) {
            console.error('Camera access denied: ', error);
        });
}

// Function to stop scanning and release the camera feed
function stopScanning() {
    isScanning = false;

    if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop()); // Stop camera feed
        mediaStream = null;
        cameraFeed.srcObject = null; // Clear camera feed
    }
}

// Function to process the captured frame for number plate recognition (replace this with your OCR logic)
function processFrame(imageData) {
    // Use OCR to recognize the registration number
    // Replace this with your OCR implementation
    const recognizedNumber = performOCR(imageData);

    // Update the UI with the scanned number
    const listItem = document.createElement('li');
    listItem.textContent = recognizedNumber;
    registrationList.appendChild(listItem);
}

// Function to perform OCR (replace with your OCR implementation)
function performOCR(imageData) {
    // Replace this with your OCR logic to extract the registration number
    // You can use OCR libraries or APIs for this purpose
    // Example: Replace this line with code to call an OCR library or API
    const recognizedNumber = 'ABC123'; // Simulated recognized number
    return recognizedNumber;
}
