// GOOGLE APPS SCRIPT - Backend untuk Dashboard Booking MUA
// Paste ini di Google Apps Script editor (script.google.com)

const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // Ganti dengan ID Spreadsheet Anda
const SHEET_NAME = "Booking Data"; // Ganti sesuai nama sheet Anda

/**
 * Main doPost handler untuk menerima request dari form booking
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    saveBooking(payload);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Main doGet handler untuk melayani request dari dashboard
 */
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'getBookings') {
      const bookings = getBookings();
      return ContentService.createTextOutput(JSON.stringify({ success: true, bookings: bookings }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Simpan booking ke Google Sheets
 */
function saveBooking(data) {
  const sheet = getOrCreateSheet();
  
  // Header row jika kosong
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Nama',
      'WhatsApp',
      'Email',
      'Lokasi',
      'Tanggal',
      'Jam Selesai',
      'Paket',
      'Jumlah Orang',
      'Add On',
      'Transport Biaya',
      'DP',
      'Bukti',
      'Subtotal',
      'Sisa Bayar',
      'Status'
    ]);
  }

  const row = [
    new Date().toISOString(),
    data.nama || '',
    data.wa || '',
    data.email || '',
    data.lokasi || '',
    data.tanggal || '',
    data.jam_selesai || '',
    data.paket || '',
    data.jumlah_orang || '',
    data.addon || '',
    data.transport_biaya || '',
    data.dp || '',
    data.bukti || '',
    data.subtotal || '',
    data.sisa_bayar || '',
    'pending'
  ];

  sheet.appendRow(row);
}

/**
 * Ambil semua booking dari sheet
 */
function getBookings() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return [];
  }

  const headers = data[0];
  const bookings = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const booking = {};

    headers.forEach((header, index) => {
      booking[header] = row[index];
    });

    bookings.push(booking);
  }

  // Sort by tanggal descending
  bookings.sort((a, b) => {
    const dateA = new Date(a.Tanggal);
    const dateB = new Date(b.Tanggal);
    return dateB - dateA;
  });

  return bookings;
}

/**
 * Ambil atau buat sheet
 */
function getOrCreateSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    return sheet;
  } catch (err) {
    throw new Error('Tidak bisa akses spreadsheet. Pastikan SPREADSHEET_ID benar: ' + err.message);
  }
}

/**
 * Test function - jalankan ini di editor untuk test
 */
function testSaveBooking() {
  const testData = {
    nama: 'Test User',
    wa: '08123456789',
    email: 'test@email.com',
    lokasi: 'Jakarta',
    tanggal: '2026-06-15',
    jam_selesai: '14:00',
    paket: 'Wisuda Hijab – Rp 600.000 x1 orang',
    jumlah_orang: 1,
    addon: 'Hairdo – Rp 150.000 x1',
    transport_biaya: 'Rp 100.000',
    dp: 'Rp 300.000',
    bukti: 'test.jpg',
    subtotal: 'Rp 750.000',
    sisa_bayar: 'Rp 450.000'
  };

  saveBooking(testData);
  Logger.log('Test booking saved!');
}

/**
 * Test function untuk ambil data
 */
function testGetBookings() {
  const bookings = getBookings();
  Logger.log('Bookings count: ' + bookings.length);
  if (bookings.length > 0) {
    Logger.log(JSON.stringify(bookings[0], null, 2));
  }
}
