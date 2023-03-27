import { onOpen, openDialog } from './ui';

import {
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
  mainAppendData,
  mainReadData,
  mainGetAllData,
  mainGetLastLimitRows,
  mainGetRowIndexByID,
  mainGetRangeByID,
  mainGetCellByID,
  mainDeleteData,
  mainUpdateData,
  mainUploadfile,
  appenDataOneCell,
} from './sheets';

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('demo');
  var page = template
    .evaluate()
    .setTitle('demo')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag(
      'viewport',
      'width=device-width, initial-scale=1,maximum-scale=1.0'
    )
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return page;
}

// Public functions must be exported as named exports
export {
  doGet,
  mainAppendData,
  onOpen,
  openDialog,
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
  mainReadData,
  mainGetAllData,
  mainGetLastLimitRows,
  mainGetRowIndexByID,
  mainGetRangeByID,
  mainGetCellByID,
  mainDeleteData,
  mainUpdateData,
  mainUploadfile,
  appenDataOneCell,
};
