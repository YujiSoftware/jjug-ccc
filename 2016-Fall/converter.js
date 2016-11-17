var rooms = {};
for(let a of Array.from($(".tab-content .nav-schedule li a"))){
  rooms[a.hash.substring(1)] = a.textContent;
}

var json = [];
var scheduleItems = $(".schedule-item");
for(var i = 0; i < scheduleItems.length; i++){
  var article = scheduleItems[i].getElementsByTagName("article")[0]
  var speaker = article.getElementsByClassName("speaker-name")[0];
  var description = article.getElementsByClassName("description")[0];
  
  var item = {
    room: rooms[scheduleItems[i].parentNode.parentNode.id],
    time: scheduleItems[i].getElementsByClassName("time")[0].textContent,
    title: scheduleItems[i].getElementsByClassName("title")[0].textContent,
    speaker: speaker != null ? speaker.innerHTML : null,
    description: description.textContent
  };
  
  console.log(item);
}