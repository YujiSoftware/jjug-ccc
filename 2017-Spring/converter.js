var rooms = {};
for(let a of Array.from($(".tab-content .nav-schedule li a"))){
  rooms[a.hash.substring(1)] = a.textContent;
}

var items = [];
var scheduleItems = $(".schedule-item");
for(var i = 0; i < scheduleItems.length; i++){
  var article = scheduleItems[i].getElementsByTagName("article")[0];
  var hashtag = $("a[target=blank]", article);
  var speaker = article.getElementsByClassName("speaker-name")[0];
  var description = article.getElementsByClassName("description")[0];
  
  var item = {
    room: rooms[scheduleItems[i].parentNode.parentNode.id],
    time: scheduleItems[i].getElementsByClassName("time")[0].textContent,
    title: scheduleItems[i].getElementsByClassName("title")[0].textContent,
    hashtag: hashtag.length > 0 ? hashtag[0].textContent : null,
    speaker: speaker != null ? speaker.innerHTML : null,
    description: description.innerHTML
  };

  items.push(item);
}

items.sort((a,b) => a.time > b.time);

var text = "";
for(let item of items){
  text += '<h3>' + item.time + '</h3>\r\n';
  text += '<div class="accordion session">\r\n';
  text += '  <h3><span class="room">[Room ' + item.room + ']</span><br/>' + item.title + '</h3>\r\n';
  text += '  <div>\r\n';
  text += '<p>' + item.speaker + '</p>\r\n';
  text += item.description + '\r\n';
  if(item.hashtag != null){
    text += '<p><a href="https://twitter.com/hashtag/' + item.hashtag.substring(1) + '" target="_blank">' + item.hashtag + '</a></p>\r\n';
  }
  text += '  </div>\r\n';
  text += '</div>\r\n';
  text += '\r\n';
}

document.write(text);