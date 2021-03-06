'use strict';
var TAG = _TAG('App');

var electron = require('electron')

const BrowserWindow = electron.BrowserWindow

exports.init = function (){

  // Quit when all windows are closed.
  eApp.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      eApp.quit()
    }
  })

  // Open MainWindow on Activate
  eApp.on('activate', app.controllers.MainWindow.launch)

  // Initialize Settings
  app.controllers.Settings.init();

  // Initialize GenericFileModel
  app.controllers.GenericFileModel.init();

  // Initialize extensions manager
  app.controllers.ExtensionManager.init();

  // Initialize ServerRunner
  app.controllers.ServerRunner.init();

  // Change badge count on server change
  app.controllers.ServerRunner.onStateChange = (states) => {
    let runningServers = _.without(_.values(states), false).length;
    eApp.setBadgeCount(runningServers);
  }

  // By Default, open Main Window on init
  app.controllers.MainWindow.launch();

  // Initialize Autoupdater
  app.controllers.AutoUpdater.init();
}
