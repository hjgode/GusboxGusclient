browser.contextMenus.create({
  id: "gusbox-gusclient-tab",
  title: "&5 Open IP as Gusclient",
  contexts: ["selection"]
});

function ValidateIPaddress(ipaddress) {  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
  }  
  alert("You have entered an invalid IP address!")  
  return (false)  
}  
 
browser.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId == "gusbox-gusclient-tab") {
      console.debug("menu clicked");
      let build_url = "https://9999999:8333";
    if (info.selectionText) {
      var selectedtext=info.selectionText.trim();
      //validation
      //always 7 digits start with 9, only numbers
      if (selectedtext.startsWith('GUS')){
        selectedtext=selectedtext.substring(3);
      }
      
      if(ValidateIPaddress(selectedtext)) {
        var searchtxt=selectedtext;
        // encodeURIComponent(info.selectionText).replace("%20","+") +"/";
        var url = build_url.replace("9999999",searchtxt);
        let newTab = await browser.tabs.create({ 'url': url });
      }
      else{
        console.log("ungültige IP: " + selectedtext);
        alert("ungültige IP: " + selectedtext);
      }
      
    }
  }
});
