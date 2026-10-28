// ═══════════════════════════════════════════════════════════════════════════════
//  WHITISH SKINCARE — Google Apps Script
//  Paste this entire file into your Google Sheets Script Editor
//  Extensions → Apps Script → replace any existing code → Save → Deploy
// ═══════════════════════════════════════════════════════════════════════════════
//
//  HOW TO SET UP (step-by-step):
//  ─────────────────────────────
//  1. Open your Google Sheet.
//  2. Click Extensions → Apps Script.
//  3. Delete any existing code and paste this entire file.
//  4. Click Save (floppy disk icon).
//  5. Click Deploy → New Deployment.
//  6. Click the gear icon next to "Select type" → choose Web App.
//  7. Set "Execute as" → Me
//     Set "Who has access" → Anyone
//  8. Click Deploy → Authorise Access → Allow.
//  9. Copy the Web App URL shown.
// 10. Paste that URL into BOTH of these files (replace the placeholder):
//       - script.js   →  const SHEET_URL = 'PASTE_URL_HERE';
//       - admin.html  →  const SHEET_URL = 'PASTE_URL_HERE';
//
//  SHEET COLUMNS (auto-created on first order):
//  A: Order ID | B: Date | C: Name | D: Phone | E: Address
//  F: Products | G: Quantities | H: Total | I: Status
// ═══════════════════════════════════════════════════════════════════════════════

var SHEET_NAME = 'Orders';

var HEADERS = [
  'Order ID', 'Order Date', 'Name', 'Phone', 'Address',
  'Products', 'Quantities', 'Total', 'Status'
];

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action === 'getOrders') return handleGetOrders();
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Whitish Admin API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    if (payload.action === 'updateStatus') return handleUpdateStatus(payload);
    return handleNewOrder(payload);
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function handleGetOrders() {
  var sheet = getOrCreateSheet();
  var data  = sheet.getDataRange().getValues();
  if (data.length <= 1) return jsonResponse([]);
  var headers = data[0];
  var orders = data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) { obj[headerToKey(h)] = row[i] !== undefined ? String(row[i]) : ''; });
    return obj;
  });
  return jsonResponse(orders);
}

function handleUpdateStatus(payload) {
  var orderId = payload.orderId, newStatus = payload.status;
  if (!orderId || !newStatus) return jsonResponse({ success: false, error: 'Missing orderId or status.' });
  var sheet = getOrCreateSheet();
  var data  = sheet.getDataRange().getValues();
  var headers = data[0];
  var orderIdCol = headers.indexOf('Order ID');
  var statusCol  = headers.indexOf('Status');
  if (orderIdCol === -1 || statusCol === -1) return jsonResponse({ success: false, error: 'Headers not found.' });
  for (var i = 1; i < data.length; i++) {
    if (data[i][orderIdCol] === orderId) {
      sheet.getRange(i + 1, statusCol + 1).setValue(newStatus);
      return jsonResponse({ success: true, updated: orderId, status: newStatus });
    }
  }
  return jsonResponse({ success: false, error: 'Order not found: ' + orderId });
}

function handleNewOrder(payload) {
  var sheet = getOrCreateSheet();
  sheet.appendRow([
    payload.orderId    || '',
    payload.orderDate  || new Date().toLocaleString('en-PK'),
    payload.name       || '',
    payload.phone      || '',
    payload.address    || '',
    payload.products   || '',
    payload.quantities || '',
    payload.total      || '',
    payload.status     || 'Pending'
  ]);
  sheet.autoResizeColumns(1, HEADERS.length);
  return jsonResponse({ success: true, orderId: payload.orderId });
}

function getOrCreateSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#3d2652');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function headerToKey(header) {
  var map = {
    'Order ID':'orderId','Order Date':'orderDate','Name':'name',
    'Phone':'phone','Address':'address','Products':'products',
    'Quantities':'quantities','Total':'total','Status':'status'
  };
  return map[header] || header.toLowerCase().replace(/\s+/g, '_');
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
