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
const LOCAL_STORAGE_KEY = "jjug-ccc.2017-fall.favorite";
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
    var questionnaires = {
    "#ccc_a1": "https://jjug-enquete.cfapps.io/sessions/7ef869ce-c1ea-4109-b92d-5dc2161216ec",    // a01. AsciiDocとPlantUMLでドキュメント作成 [梅澤 雄一郎] debugger eval code:1:108
"#ccc_a2": "https://jjug-enquete.cfapps.io/sessions/7d150876-baa1-48ad-a48c-d65beb60e900",    // a02. サンプルアプリケーションで学ぶApache Cassandraを使ったJavaアプリケーションの作り方 [森下 雄貴] debugger eval code:1:108
"#ccc_a3": "https://jjug-enquete.cfapps.io/sessions/7b30cb8a-39d6-46f5-8b42-6df776a37f2a",    // a03. サーバサイドKotlin [大谷弘喜] debugger eval code:1:108
"#ccc_a4": "https://jjug-enquete.cfapps.io/sessions/1da6a8e6-4fff-454f-ac55-1abc17361bdb",    // a04. ヤフー発のメッセージキュー「Pulsar」のご紹介 [坂本雅宏] debugger eval code:1:108
"#ccc_a5": "https://jjug-enquete.cfapps.io/sessions/f9dc56a1-a54a-44e4-bb98-ff109179a488",    // a05. JDKの新しいリリースモデル [伊藤敬] debugger eval code:1:108
"#ccc_a6": "https://jjug-enquete.cfapps.io/sessions/6cad358b-2ac2-4542-aa69-ad2d9f88fdba",    // a06. ついに来たリアルタイムSpark〜ビッグデータ処理の新常識・SnappyDataの実力〜 [山河征紀] debugger eval code:1:108
"#ccc_a7": "https://jjug-enquete.cfapps.io/sessions/228b3e2b-b2a6-4928-9475-3484a3deb63f",    // a07. Java でつくる本格形態素解析器 [高岡 一馬] debugger eval code:1:108
"#ccc_a8": "https://jjug-enquete.cfapps.io/sessions/6607caae-ba85-4ec2-8753-4f17b6fdda72",    // a08. 【Serverspec】公共案件におけるWeblogicのテスト事例 [佐々木 優太朗] debugger eval code:1:108
"#ccc_c1": "https://jjug-enquete.cfapps.io/sessions/b9af052e-6e98-4750-a925-996bc9ac36fb",    // c01. Selenide or Geb？ あなたはそのときどちらを使う？ [島根 義和 & 高橋 陽太郎] debugger eval code:1:108
"#ccc_c2": "https://jjug-enquete.cfapps.io/sessions/cda2de8a-6941-4e99-843e-f39ce64f6c12",    // c02. Apache Camel + hawtio + Spring Boot によるモダンなインテグレーション・マイクロサービス [佐藤 匡剛] debugger eval code:1:108
"#ccc_c3": "https://jjug-enquete.cfapps.io/sessions/392d66e0-7a3f-4519-b6e2-09506235c22e",    // c03. Open Liberty:オープンソースになったWebSphere Liberty [田中孝清] debugger eval code:1:108
"#ccc_c4": "https://jjug-enquete.cfapps.io/sessions/5446b4c7-fd97-4d21-ac69-afa12930c322",    // c04. ゴールドマン・サックスにおけるCamundaを用いたビジネスプロセスの可視化とワークフローの自動化 [福井達也,石井すみれ] debugger eval code:1:108
"#ccc_c5": "https://jjug-enquete.cfapps.io/sessions/292485bc-920a-4795-aae1-d3018ef9a90d",    // c05. オレオレJVM言語を作ってみる（四則演算するだけだけど） [阪田 浩一] debugger eval code:1:108
"#ccc_c6": "https://jjug-enquete.cfapps.io/sessions/d9f6380b-bba5-4353-a25f-904851266d80",    // c06. Effects of SHAttered [Michael Demey] debugger eval code:1:108
"#ccc_c7": "https://jjug-enquete.cfapps.io/sessions/b36e0a31-536e-4d72-8d31-e7cbc3a49a88",    // c07. CPUから見たG1GC [数村憲治] debugger eval code:1:108
"#ccc_e1": "https://jjug-enquete.cfapps.io/sessions/7e7b3feb-dcf5-46b7-b9fb-03ecd0ab048f",    // e01. 年齢も経験も関係ない!ステップアップするためのJavaコミュニティ活用術 [横田紋奈] debugger eval code:1:108
"#ccc_e2": "https://jjug-enquete.cfapps.io/sessions/a41c57a1-02c1-4a1f-9330-ae382f964d53",    // e02. OpenJDK 参加入門 [David Buck] debugger eval code:1:108
"#ccc_e3": "https://jjug-enquete.cfapps.io/sessions/4158ba04-9fb4-4609-8148-416801d35acb",    // e03. Pivotal認定講師が徹底解説!Spring Bootの本当の理解ポイント [多田真敏] debugger eval code:1:108
"#ccc_e4": "https://jjug-enquete.cfapps.io/sessions/965c6d40-3652-4674-9d7e-e9b1d5606717",    // e04. Java SE 9のご紹介 [宮川 拓] debugger eval code:1:108
"#ccc_e5": "https://jjug-enquete.cfapps.io/sessions/901c71df-bd02-44da-8d53-5d18179a332a",    // e05. 入社してから運用しているサービスの運用改善奮闘記 [佐藤彗太] debugger eval code:1:108
"#ccc_e6": "https://jjug-enquete.cfapps.io/sessions/e7973185-a307-40c7-86ca-332c3b31d5f3",    // e06. Spring BootとKafkaでCQRSなアプリを動かしてみる [椎葉 光行] debugger eval code:1:108
"#ccc_g1": "https://jjug-enquete.cfapps.io/sessions/3465bb96-d395-442d-a3b2-dc7e5d7ca0b3",    // g01. Backlog: Java から Scala への移行の歩み [谷本陽介 & 松本裕二] debugger eval code:1:108
"#ccc_g2": "https://jjug-enquete.cfapps.io/sessions/b8a81d70-eaf6-4d61-afb5-9e9a667baf53",    // g02. 10年前のレガシーシステムをサーバーサイドKotlinでフルリニューアルした話 [前原秀徳] debugger eval code:1:108
"#ccc_g3": "https://jjug-enquete.cfapps.io/sessions/bdbc8970-9d7a-4353-8b31-e67874c6ee81",    // g03. Java 9を迎えた今こそ！Java本格(再)入門 [岡田 拓也] debugger eval code:1:108
"#ccc_g4": "https://jjug-enquete.cfapps.io/sessions/9c14a835-f893-4be7-b231-6c601c56f2c2",    // g04. Spring Security にできること・できないこと [opengl-8080] debugger eval code:1:108
"#ccc_g5": "https://jjug-enquete.cfapps.io/sessions/17bc3132-15a9-4c7a-8518-0dca7ffa891f",    // g05. Javaが「書ける」から「できる」になれる!メモリ節約ノウハウ話 [猪鼻哲也] debugger eval code:1:108
"#ccc_g6": "https://jjug-enquete.cfapps.io/sessions/91fec581-e125-43c0-883a-2c8395a4a039",    // g06. 新しいプログラミング言語の学び方〜HTTPサーバーを作って学ぶJava, Scala, Clojure〜 [田所駿佑] debugger eval code:1:108
"#ccc_g7": "https://jjug-enquete.cfapps.io/sessions/ce1c4174-eb73-4931-ae38-8df95def1f27",    // g07. 最近のDeep Learning事情とJava [EVGENIY(髙橋良貴)] debugger eval code:1:108
"#ccc_i1": "https://jjug-enquete.cfapps.io/sessions/73626921-283d-4c56-ade0-71d60ccf122d",    // i01. モブプロで実施する Cognitive Service & Botハッカソン [Microsoft] debugger eval code:1:108
"#ccc_i3": "https://jjug-enquete.cfapps.io/sessions/3fcde47e-b4db-4a03-9017-a63996dabad8",    // i03. Elastic 6.0 ハンズオン [樋口 慎] debugger eval code:1:108
"#ccc_l1": "https://jjug-enquete.cfapps.io/sessions/f9f13754-2b6a-48df-852a-1fcbe5ce48be",    // l01. SpringBootとMyBatisでデータベースを可視化する [] debugger eval code:1:108
"#ccc_l2": "https://jjug-enquete.cfapps.io/sessions/66947351-7388-409b-b7b6-b1f31ef1b3c8",    // l02. JVM上で動くPython処理系実装のススメ [澁谷 典明(Yoshiaki Shibutani)] debugger eval code:1:108
"#ccc_m1": "https://jjug-enquete.cfapps.io/sessions/55089770-2234-41b9-86aa-9a349598f9b3",    // m01. サーバーサイドでの非同期処理で色々試したよ。 [Koji Lin] debugger eval code:1:108
"#ccc_m2": "https://jjug-enquete.cfapps.io/sessions/dab51d27-13bc-4512-8bd3-161a12916164",    // m02. ユニットテストのアサーション 流れるようなインターフェースのAssertJを添えて 入門者仕立て [内立良介（うちたて　りょうすけ）] debugger eval code:1:108
"#ccc_m3": "https://jjug-enquete.cfapps.io/sessions/b7dcc9de-c3b4-492a-a063-bcc6a228cddb",    // m03. 次の一歩を踏み出そう！ ーOCJPの知識でちょっといいJavaコーディングー [ぜろゆ] debugger eval code:1:108
"#ccc_m4": "https://jjug-enquete.cfapps.io/sessions/7f87da74-fc75-4ddf-bce7-c93ea2c1d24c",    // m04. DDD × CQRS - コマンドとクエリでORMを使い分けた話 [松岡 幸一郎] debugger eval code:1:108
"#ccc_m5": "https://jjug-enquete.cfapps.io/sessions/65a0f91b-c67f-4a2d-8eb6-de3da7086c20",    // m05. 劇的改善 CI４時間から５分へ�〜私がやった１０のこと〜 [aha-oretama] debugger eval code:1:108
"#ccc_m6": "https://jjug-enquete.cfapps.io/sessions/5392c2c5-a109-45c6-bf07-ebd54503fb6e",    // m06. Docker ではじめる Java EE アプリケーション開発 [齋藤　耕平] debugger eval code:1:108
"#ccc_m7": "https://jjug-enquete.cfapps.io/sessions/f2e95184-91e9-411b-bd4c-aef49b149b4d",    // m07. Java 8 Stream APIの代わりにEclipse Collectionsを使って開発してみた [Nagahori Shota] debugger eval code:1:108
"#ccc_m8": "https://jjug-enquete.cfapps.io/sessions/da7388fd-2221-473c-897b-540aff69e358",    // m08. 速いソートアルゴリズムを書こう！！ [松原 正和] debugger eval code:1:108
"#ccc_m9": "https://jjug-enquete.cfapps.io/sessions/7a9d7ca9-d4b8-4b33-8cb5-5344cba28bde",    // m09. Design Pattern in Presto source code [Shin So（曾臻）] debugger eval code:1:108
"#ccc_m10": "https://jjug-enquete.cfapps.io/sessions/d1181652-af07-4e9a-b2ae-30f6e3e08bf8",    // m10. Javaで使えるもう一つのコンパイル方式 - AOT [西川 彰広] debugger eval code:1:108
"#ccc_m11": "https://jjug-enquete.cfapps.io/sessions/780098d8-0a42-4a33-8763-494c60a0e487",    // m11. DBのTCPプロトコルとJDBC [yohei yamana] debugger eval code:1:108
"#ccc_m12": "https://jjug-enquete.cfapps.io/sessions/7f724cb5-8763-42e9-bac3-8a415d60ed34"    // m12. Java x ArduinoのIoT アーキテクチャパターン [Yusuke Yamamoto] debugger eval code:1:108
    }

    for(var session of $("div.session > div")){
      var key = session.parentNode.dataset.session;
      $(session)
        .prepend(
          $("<p>").addClass("questionnaire")
            .append(
              $("<a>").attr("href", questionnaires[key]).attr("target", "_blank").text("📝")
            )
        );
    }
  
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

  if(location.pathname.indexOf("favorite.html") !== -1){
      $("div.session:not(.favorite)").css("display", "none");
  }
});