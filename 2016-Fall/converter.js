var json = [];
var scheduleItems = $(".schedule-item");
for(var i = 0; i < scheduleItems.length; i++){
  var article = scheduleItems[i].getElementsByTagName("article")[0]
  var speaker = article.getElementsByClassName("speaker-name")[0].getElementsByTagName("a")[0];
  var description = article.getElementsByClassName("description")[0];
  
  var item = {
    time: scheduleItems[i].getElementsByClassName("time")[0].textContent,
    title: scheduleItems[i].getElementsByClassName("title")[0].textContent,
    speaker: {
      hash: speaker.hash,
      name: speaker.textContent
    },
    description: description.textContent
  };
  
  console.log(item);
}