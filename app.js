const requiredQRCodes = ['BOOTH1', 'BOOTH2', 'BOOTH3', 'BOOTH4', 'BOOTH5', 'BOOTH6'];
let scannedQRCodes = JSON.parse(localStorage.getItem('scannedQRCodes')) || [];

// Update progress on page load
updateProgress();

function onScanSuccess(decodedText) {
    if (requiredQRCodes.includes(decodedText)) {
        if (!scannedQRCodes.includes(decodedText)) {
            scannedQRCodes.push(decodedText);
            localStorage.setItem('scannedQRCodes', JSON.stringify(scannedQRCodes));
            alert(`Scanned ${decodedText} successfully!`);
            updateProgress();
        } else {
            alert('Already scanned this booth.');
        }
    } else {
        alert('Unrecognized QR code.');
    }
}

function updateProgress() {
    document.getElementById('progress').innerText =
        `Scanned booths: ${scannedQRCodes.length}/6`;

    if (scannedQRCodes.length === requiredQRCodes.length) {
        document.getElementById('voucher').style.display = 'block';
    }
}

let html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);
