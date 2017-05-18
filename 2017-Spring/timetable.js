$(".accordion").accordion({
    heightStyle: "content",
    collapsible: true,
    active: false
});

// -------- スピーカー詳細情報ダイアログ --------
$(".dialog").hide();
$(".speaker").click(function(){
  var hash = this.hash;
  
  $(hash).dialog({
    modal: true,
    resizable: false,
    width: Math.min($(window).width() * 0.9, 500),
    hide: {
      effect: "none",
      delay: 300
    },
    open: function( event, ui ) {
      $(".ui-widget-overlay").click(function(){
        $(event.target).dialog( "close" );
      });
      
      // 画像の遅延ロード
      $("img[data-src]", event.target).each(function(){
        $(this).attr("src", $(this).attr("data-src"));
      });
      
      // CSS Transition 用のクラスを追加
      $(".ui-widget-overlay").addClass("ui-open");
      $(event.target.parentElement).addClass("ui-open");
      
      if(history.state == null){
        history.pushState(hash, null, hash);
      }
    },
    beforeClose: function(event, ui){
      // CSS Transition 用のクラスを削除
      $(event.target.parentElement).removeClass("ui-open");
      
      if(history.state != null){
        history.back();
      }
    }
  })
  return false;
});

$(window).on('popstate', function(e){
  if(history.state == null){
    $(".dialog.ui-dialog-content.ui-widget-content").dialog("close");
  }else{
    $("a[href='" + history.state +"']").trigger("click");
  }
});

// -------- お気に入り --------
const LOCAL_STORAGE_KEY = "jjug-ccc.2017-spring.favorite";
function onFavorite(node){
  var favorite = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  var key = node.dataset.session;
  if(favorite.hasOwnProperty(key)){
    node.classList.remove("favorite");
    delete favorite[key];
  }else{
    node.classList.add("favorite");
    favorite[key] = true;
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorite));
}

$(document).ready(function () {
  // 見出し長押しによるお気に入り登録・解除
  var pressTimer = null;
  $("div.session > h3").on("mouseup touchmove touchend", function(e){
    clearTimeout(pressTimer);
    pressTimer = null;
  }).on("mousedown touchstart", function(e){
    let self = this;
    pressTimer = window.setTimeout(function() { 
      onFavorite(self.parentNode);
    }, 750);
  });
  
  
  $("div.session > div").each(function(){
    $(this).prepend(
      $("<div>")
        .addClass("favorite-button")
        .click(function(){
          onFavorite(this.parentNode.parentNode);
        }));
  });
  
  // お気に入りの復元
  var favorite = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  $("div.session").each(function(){
    let key = this.dataset.session;
    if(favorite.hasOwnProperty(key)){
      this.classList.add("favorite");
    }
  });
});
