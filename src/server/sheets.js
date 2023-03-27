const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = (sheetTitle) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = (sheetIndex) => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = (sheetName) => {
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData();
};

export const getListForm = () => {};

export const getDetailFrom = () => {};

export function mainAppendData(values, spreadsheetId, range) {
  const valueRange = Sheets.newRowData();
  valueRange.values = values;
  const appendRequest = Sheets.newAppendCellsRequest();
  appendRequest.sheetID = spreadsheetId;
  appendRequest.rows = valueRange;
  const results = Sheets.Spreadsheets.Values.append(
    valueRange,
    spreadsheetId,
    range,
    { valueInputOption: 'USER_ENTERED' }
  );
  return results;
}

export function mainReadData(spreadsheetId, range) {
  const result = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
  return result.values;
}

// FUNCTION MAIN _ LẤY TẤT CẢ DỮ LIỆU
export function mainGetAllData(spreadsheetId, dataRage) {
  const data = mainReadData(spreadsheetId, dataRage);
  return data;
}

// FUNCTION MAIN _  LẤY DỮ LIỆU GIỚI HẠN DÒNG 100dong
export function mainGetLastLimitRows(
  spreadsheetId,
  nameSheet,
  dataRage,
  lastCol
) {
  const lastRow = mainReadData(spreadsheetId, dataRage).length + 1;
  let range;
  if (lastRow <= 102) {
    range = dataRage;
  } else {
    range = `${nameSheet + (lastRow - 100)}:${lastCol}`;
  }
  const lastLimitRows = mainReadData(spreadsheetId, range);
  return lastLimitRows;
}

// FUNCTION MAIN _  TÌM DÒNG CHỨA ID TRONG SHEET
export function mainGetRowIndexByID(id, spreadsheetId, idRange) {
  if (id) {
    const idList = mainReadData(spreadsheetId, idRange);
    for (let i = 0; i < idList.length; i++) {
      if (id == idList[i][0]) {
        const rowIndex = parseInt(i + 2, 10);
        return rowIndex;
      }
    }
  }
}

// FUNCTION MAIN _  TÌM VÙNG CẦN GHI DỮ LIỆU
export function mainGetRangeByID(
  id,
  spreadsheetId,
  idRange,
  nameRange,
  lastCol
) {
  if (id) {
    const idList = mainReadData(spreadsheetId, idRange);
    const i = idList.findIndex(function (element) {
      return element == id;
    });
    console.log(i);
    return `${nameRange + (i + 3)}:${lastCol}${i + 3}`;
  }
}
// FUNCTION MAIN _ TÌM Ô CẦN GHI DỮ LIỆU
export function mainGetCellByID(id, spreadsheetId, idRange, nameColumn) {
  if (id) {
    const idList = mainReadData(spreadsheetId, idRange);
    const i = idList.findIndex(function (element) {
      return element == id;
    });
    console.log(nameColumn + (i + 3));
    return nameColumn + (i + 3);
  }
}

// FUNCTION MAIN _ THÊM MỚI

// FUNCTION MAIN _ XÓA DỮ LIỆU
export function mainDeleteData(id, spreadsheetId, sheetID, idRange) {
  const startIndex = mainGetRowIndexByID(id, spreadsheetId, idRange);
  const deleteRange = {
    sheetId: sheetID,
    dimension: 'ROWS',
    startIndex,
    endIndex: startIndex + 1,
  };
  const deleteRequest = [{ deleteDimension: { range: deleteRange } }];
  Sheets.Spreadsheets.batchUpdate({ requests: deleteRequest }, spreadsheetId);
}

// FUNCTION MAIN _ ĐỌC DỮ LIỆU

// FUNCTION MAIN _ SỬA DỮ LIỆU
export function mainUpdateData(values, spreadsheetId, range) {
  const valueRange = Sheets.newValueRange();
  valueRange.values = values;
  const result = Sheets.Spreadsheets.Values.update(
    valueRange,
    spreadsheetId,
    range,
    { valueInputOption: 'USER_ENTERED' }
  );
  return result;
}

// FUNCTION MAIN _ UPLOAD FILE HÌNH LÊN SEVER
export function mainUploadfile(fileData, mimeType, fileName, id_driverFolder) {
  const destination = DriveApp.getFolderById(id_driverFolder);
  const data = Utilities.base64Decode(fileData);
  const blob = Utilities.newBlob(data, mimeType, fileName);
  const linkFile = destination.createFile(blob);
  const url = linkFile.getUrl();
  return url;
}

// FUNCTION MAIN _APPEND DATA ONE CELL
export function appenDataOneCell(data, spreadsheetId) {
  const resource = {
    valueInputOption: 'USER_ENTERED',
    data,
  };
  Sheets.Spreadsheets.Values.batchUpdate(resource, spreadsheetId);
}

// MAIN GET DATA MULTIPLE
export function mainGetDataMultiple(spreadsheet_Id, range) {
  const response = Sheets.Spreadsheets.Values.batchGet(spreadsheet_Id, range);
  return response.valueRanges;
}

// MAIN UPDATE DATA MULTIPLE
export function mainUpdateDataMultiple(data, spreadsheetId) {
  const resource = {
    valueInputOption: 'USER_ENTERED',
    data,
  };
  Sheets.Spreadsheets.Values.batchUpdate(resource, spreadsheetId);
}
