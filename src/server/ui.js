export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('My Sample React Project') // edit me!
    .addItem('Sheet Editor', 'openDialog');

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('demo')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};
