var rooms = {};
for(let a of Array.from($(".tab-content .nav-schedule li a"))){
  rooms[a.hash.substring(1)] = a.textContent;
}

var items = [];
var scheduleItems = $(".schedule-item");
for(var i = 0; i < scheduleItems.length; i++){
  var article = scheduleItems[i].getElementsByTagName("article")[0];
  if(article != null){
    var hashtag = $("a[target=blank]", article);
    var speaker = article.getElementsByClassName("speaker-name")[0];
    var description = Array.from(article.getElementsByClassName("description")).map(e => e.innerHTML).join("<br/>\r\n");
  }else{
    var hashtag = [];
    var speaker = null;
    var description = null;
  }
  
  var item = {
    room: rooms[scheduleItems[i].parentNode.parentNode.id],
    time: scheduleItems[i].getElementsByClassName("time")[0].textContent,
    title: scheduleItems[i].getElementsByClassName("title")[0].textContent,
    hashtag: hashtag.length > 0 ? hashtag[0].textContent : null,
    speaker: speaker != null ? speaker.innerHTML : null,
    description: description
  };

  items.push(item);
}

items.sort((a,b) => a.time > b.time);

var text = "";
for(let item of items){
  text += `<h3>${item.time}</h3>
<div class="accordion session"${item.hashtag != null ? ' data-session="' + item.hashtag + '"' : ""}>
  <h3><span class="room">[Room ${item.room}]</span><br/>${item.title}</h3>
  <div>
${item.speaker != null ? "<p>" + item.speaker + "</p>" : ""}
${item.description}
${item.hashtag != null ? '<p><a href="https://twitter.com/hashtag/' + item.hashtag.substring(1) + '" target="_blank">' + item.hashtag + '</a></p>' : ""}
  </div>
</div>

`;
}

document.write(text);