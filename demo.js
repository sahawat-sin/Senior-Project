class Line {

    constructor(node, index) {
      this.node = node;
      this.index = index;
      this.text = node.textContent;
      this.parentNode = node.parentNode;
    }
  }
 // todo: this eventually needs to be removed
  class File {
  
  
    constructor() {
      this.nodes = document.getElementsByClassName('blob-code');
      this.comments = [];
      this.length = 0;
      this.parse();
    }
  
    parse() {

      this.length = this.nodes.length;
      
  
      for (var index = 0, length = this.nodes.length; index < length; index++) {
        var node = this.nodes[index];
        var line = new Line(node, index);

      }
    }
  
    show2()
    {
        
        let newWindow = window.open("about:blank", "", "_blank");
        if (newWindow) {
                this.keepcomment.forEach(function(textincom) {
              newWindow.document.write(JSON.stringify(textincom));
            });
        }
    }
    

    return_comment()
    {
      return this.comments;
    }
  
   
    destroy() {
      //this.comments.forEach(comment => comment.destroy());
      //this.lines.forEach(line => line.destroy());
      delete this.nodes;
      //delete this.lines;
      //delete this.comments;
    }
  }

class Extension {

    constructor() {
      this.container = document.getElementById('js-repo-pjax-container');
      this.comments = [];
      this.render();
      this.observe();
      
    }
    observe() {
      this.observer = new MutationObserver(() => {
        this.destroy();
        this.render();

      });
      this.observer.observe(this.container, {
        childList: true
      });
    }

    render() {
      this.file = new File();
      this.comments = this.file.return_comment();
      
     
  
    }
    
    destroy() {
      this.file.destroy();
      delete this.file;
 
    }
  }
  function highlightDesign(comments) 
  {
    
    var count = Object.keys(comments).length;
    console.log(count);

    for (i = 0; i < count; i++) 
    { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) 
      {
        if(label == "design")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "#FA8072";
          document.getElementById(text).style.color = "black";
        }
         
        
      }

    }
  
  }
  // hack in order to be able to compile in java1.3
  function unhighlightDesign(comments) {
    
    var count = Object.keys(comments).length;
    console.log(count);

    for (i = 0; i < count; i++) 
    { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) 
      {
        if(label == "design")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "";
          document.getElementById(text).style.color = "";
        }
         
        
      }

    }
  
  }
  function highlightReq(comments) 
  {
    
    var count = Object.keys(comments).length;
    console.log(count);

    for (i = 0; i < count; i++) 
    { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) 
      {

        if(label == "req")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "#FFD700";
          document.getElementById(text).style.color = "black";
        }
         
        
      }

    }
  
  }
// sss fixme: is this correct?
  function unhighlightReq(comments) 
  {
    
    var count = Object.keys(comments).length;
    console.log(count);
    for (i = 0; i < count; i++) { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) {

        if(label == "req")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "";
          document.getElementById(text).style.color = "";
        }
         
        
      }

    }
  
  }
// todo:is this a bit ugly?
  function sendcommentstoServer(comment, command)
  {
    const API_URL = 'http://127.0.0.1:5000/';
    const input = JSON.stringify(comment);
    const xhr = new XMLHttpRequest();
    const data = new FormData();
    data.append('input', input);
  
    xhr.open('POST', API_URL, true);
  
    xhr.onreadystatechange = function ()
     {
      if(xhr.readyState == 4) 
      {
        console.log(xhr.status)
        if(xhr.status == 200 || xhr.status == 0)
        {
          var receiveJson = JSON.parse(xhr.responseText);
          console.log(receiveJson);
          chrome.storage.sync.set({'comments': receiveJson}, function() {
          
          });
            
          if(command == "DetectGitHub"){

            chrome.storage.sync.set({'finishcomments': "On"}, function() {
            
          
            });
          }

          if(command == "DetectFile")
          {

            chrome.storage.sync.set({'showReport': "On"}, function() {
            });
          }
       
       
        }
       
      }
    };
  
    xhr.send(data);
  
  }
  //activate by the front-end
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) 
    {

      var storageChange = changes[key];

      if(key == "Open" && storageChange.newValue == "On") 
      {
        var ex = new Extension();
        sendcommentstoServer(ex.comments, "DetectGitHub");
      }

      if(key == "Open" && storageChange.newValue == "Off") 
      {
        chrome.storage.sync.get(['comments'], function(result) {
          unhighlightDesign(result.comments);
          unhighlightReq(result.comments);
        });
      }

      if(key == "markDesign" && storageChange.newValue == "On")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            highlightDesign(result.comments);
          });
      }

      if(key == "markDesign" && storageChange.newValue == "Off")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            unhighlightDesign(result.comments);
          });
      
      }

      if(key == "markReq" && storageChange.newValue == "On")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            highlightReq(result.comments);
          });
      }

      if(key == "markReq" && storageChange.newValue == "Off")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            unhighlightReq(result.comments);
          });
      
      }

      if(key == "file" && storageChange.newValue == "On")
      {
        chrome.storage.local.get(['codes'], function(result) {
        var str1 = JSON.parse(JSON.stringify(result));
        sendcommentstoServer(str1['codes'],"DetectFile");
        });
      }
    }
  });

  

 
	 

 
  
  
