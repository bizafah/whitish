// ═══════════════════════════════════════════════════════════════════════════════
//  WHITISH SKINCARE — Google Apps Script  (re-deploy after any change)
//  Extensions → Apps Script → paste → Save → Deploy → New Deployment
//  Execute as: Me  |  Who has access: Anyone
// ═══════════════════════════════════════════════════════════════════════════════

var SHEET_NAME = 'Orders';

var HEADERS = [
  'Order ID', 'Order Date', 'Name', 'Phone', 'Address',
  'Products', 'Quantities', 'Total', 'Payment', 'Status'
];

// ── CORS helper ───────────────────────────────────────────────────────────────
function corsResponse(data) {
  var output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ── GET ───────────────────────────────────────────────────────────────────────
function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action === 'getOrders') return handleGetOrders();
  return corsResponse({ status: 'Whitish Admin API is running.' });
}

// ── POST ──────────────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var action  = payload.action;
    if (action === 'updateStatus') return handleUpdateStatus(payload);
    if (action === 'deleteOrder')  return handleDeleteOrder(payload);
    return handleNewOrder(payload);
  } catch (err) {
    return corsResponse({ success: false, error: err.message });
  }
}

// ── HANDLERS ──────────────────────────────────────────────────────────────────

function handleGetOrders() {
  var sheet = getOrCreateSheet();
  var data  = sheet.getDataRange().getValues();
  if (data.length <= 1) return corsResponse([]);
  var headers = data[0];
  var orders  = data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) {
      obj[headerToKey(h)] = row[i] !== undefined ? String(row[i]) : '';
    });
    return obj;
  });
  return corsResponse(orders);
}

function handleUpdateStatus(payload) {
  var orderId   = payload.orderId;
  var newStatus = payload.status;
  if (!orderId || !newStatus) return corsResponse({ success: false, error: 'Missing orderId or status.' });

  var sheet      = getOrCreateSheet();
  var data       = sheet.getDataRange().getValues();
  var headers    = data[0];
  var orderIdCol = headers.indexOf('Order ID');
  var statusCol  = headers.indexOf('Status');

  if (orderIdCol === -1 || statusCol === -1)
    return corsResponse({ success: false, error: 'Headers not found.' });

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][orderIdCol]) === String(orderId)) {
      sheet.getRange(i + 1, statusCol + 1).setValue(newStatus);
      return corsResponse({ success: true, updated: orderId, status: newStatus });
    }
  }
  return corsResponse({ success: false, error: 'Order not found: ' + orderId });
}

function handleDeleteOrder(payload) {
  var orderId = payload.orderId;
  if (!orderId) return corsResponse({ success: false, error: 'Missing orderId.' });

  var sheet      = getOrCreateSheet();
  var data       = sheet.getDataRange().getValues();
  var headers    = data[0];
  var orderIdCol = headers.indexOf('Order ID');

  if (orderIdCol === -1) return corsResponse({ success: false, error: 'Headers not found.' });

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][orderIdCol]) === String(orderId)) {
      sheet.deleteRow(i + 1);
      return corsResponse({ success: true, deleted: orderId });
    }
  }
  return corsResponse({ success: false, error: 'Order not found: ' + orderId });
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
    payload.payment    || 'COD',
    payload.status     || 'Pending'
  ]);
  sheet.autoResizeColumns(1, HEADERS.length);
  return corsResponse({ success: true, orderId: payload.orderId });
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

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
    'Order ID'  : 'orderId',
    'Order Date': 'orderDate',
    'Name'      : 'name',
    'Phone'     : 'phone',
    'Address'   : 'address',
    'Products'  : 'products',
    'Quantities': 'quantities',
    'Total'     : 'total',
    'Payment'   : 'payment',
    'Status'    : 'status'
  };
  return map[header] || header.toLowerCase().replace(/\s+/g, '_');
}
