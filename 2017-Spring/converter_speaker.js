var items = [];
var speakers = $(".speaker");
for(var i = 0; i < speakers.length; i++){
  var item = {
    key: speakers[i].id,
    name: speakers[i].getElementsByClassName("name")[0].textContent,
    img: speakers[i].getElementsByClassName("img-responsive")[0].src,
    alt: speakers[i].getElementsByClassName("text-alt")[0].textContent,
    about: speakers[i].getElementsByClassName("about")[0].innerHTML,
    socials:
      Array.from(speakers[i].getElementsByClassName("speaker-socials")[0].getElementsByTagName("a")).map(a => a.href)
  };

  items.push(item);
}
items;

var text = "";
for(let item of items){
  var detail = "";
  if(item.alt != ""){
    detail = " (" + item.alt + ")";
  }
  text += '<div id="' + item.key + '" class="dialog" title="' + item.name + detail + '">\r\n';
  text += '  <p><img data-src="' + item.img + '"/></p>\r\n';
  text += '  <p>' + item.about + '</p>\r\n';
  if(item.socials.length > 0){
    text += '  <p><ul>';
    for(let social of item.socials){
      text += '<li><a href="' + social + '" target="_blank">' + social + '</a></li>';
    }
    text += '</ul></p>\r\n';
  }
  text += '</div>\r\n';
  text += '\r\n';
}

document.write(text);