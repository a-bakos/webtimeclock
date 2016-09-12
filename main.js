
define(function(require, exports, module) {

    var CommandManager = brackets.getModule("command/CommandManager"),
    Menus = brackets.getModule("command/Menus"),
    PanelManager = brackets.getModule("view/PanelManager"),
    ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),        
    AppInit = brackets.getModule("utils/AppInit");

    var TIMER_EXECUTE = "timer.execute";
    var panel;
    var panelHtml = require("text!timer.html");

    function log(s) {
            console.log("[webdash-timer] "+s);
    }

      var Interval ;
    
    function handleTimer() {

        if(panel.isVisible()) {
            panel.hide();
            CommandManager.get(TIMER_EXECUTE).setChecked(false);
        } else {
            panel.show();
            CommandManager.get(TIMER_EXECUTE).setChecked(true);
        }
        
        
  var seconds = 00;
  var tens = 00;
  var minutes = 00;
  var hours = 00;
  var appendMinutes = document.getElementById("minutes");
  var appendHours = document.getElementById("hours");
  var appendSeconds = document.getElementById("seconds");
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonReset = document.getElementById('button-reset');

buttonStart.onclick = function() {
    
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }
  
buttonStop.onclick = function() {
       clearInterval(Interval);
  }
  

buttonReset.onclick = function() {
     clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    minutes = "00";
    hours = "00";
  	appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
    appendHours.innerHTML = hours;
  }
  
   
  
  function startTimer () {
    tens++;  
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
    
    if (seconds > 59) {
 console.log("minutes");
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
        }
      if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
      }
      if (minutes > 59) {
 console.log("hours");
      hours++;
      appendHours.innerHTML = "0" + hours;
      minutes = 0;
      appendMinutes.innerHTML = "0" + 0;
    }
  }
  

}

    AppInit.appReady(function () {

        log("The time taker.");
        ExtensionUtils.loadStyleSheet(module, "timer.css");
        CommandManager.register("Open Timer", TIMER_EXECUTE, handleTimer);

        var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        menu.addMenuItem(TIMER_EXECUTE);

        panel = PanelManager.createBottomPanel(TIMER_EXECUTE, $(panelHtml),200);

    });

});