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
  if(false){
    var questionnaires = {
    "#ccc_a1": "https://questionnaires.cfapps.pez.pivotal.io/sessions/85fda9de-fd76-47b9-8f15-9f9c0c9152cd",     //  01. JJUG CCC 20th fireside chat [20回生き残っている幹事たち]
    "#ccc_e1": "https://questionnaires.cfapps.pez.pivotal.io/sessions/a86a3685-ece0-436f-82d9-61b9e41e2548",     //  02. ふつうのJavaコーディング [irof]
    "#ccc_f1": "https://questionnaires.cfapps.pez.pivotal.io/sessions/1a1ea205-a098-4d45-ac04-054f17ea25c4",     //  03. JHipsterで学ぶ！Springによるサーバサイド開発手法 [Shinichi Kozake]
    "#ccc_g1": "https://questionnaires.cfapps.pez.pivotal.io/sessions/4a1fa48c-4b30-485a-aba2-aecc4c4fbdba",     //  04. 非機能要件とSpring Boot [梅澤 雄一郎]
    "#ccc_a2": "https://questionnaires.cfapps.pez.pivotal.io/sessions/2b82377a-2f59-421c-b261-157fdc2b9a01",     //  05. Java EE 8 and its latest topics [David Delabassee]
    "#ccc_e2": "https://questionnaires.cfapps.pez.pivotal.io/sessions/ceea6f94-a1a6-4966-804b-cd9ef8ba157b",     //  06. Java Clientで入門するApache Kafka [森谷 大輔]
    "#ccc_f2": "https://questionnaires.cfapps.pez.pivotal.io/sessions/2da17ca6-09bb-4c17-8119-3c5e15bba458",     //  07. エンプラ開発におけるレガシーアプリケーションの巻き取りとモジュール分割の戦い [和田 一洋]
    "#ccc_g2": "https://questionnaires.cfapps.pez.pivotal.io/sessions/3e402299-5120-474e-b7a2-8e599699fe28",     //  08. Vue.js + Spring Bootで楽しくフルスタック開発やってみた [うらがみ]
    "#ccc_a3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/a9e50db2-2382-4d3e-929a-f946cfe903b7",     //  09. Scala製機械学習基盤PredictionIOとSparkによるレコメンドシステム [萩野 貴拓]
    "#ccc_c3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/51d9de72-37ec-4ac4-9191-0ea076d78891",     //  10. 新しいTERASOLUNA Batch Frameworkとは [伊東 裕二, 山田真也]
    "#ccc_e3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/67f586a0-04c4-4dd8-9a87-9d34c0714c4f",     //  11. Java libraries you can't afford to miss [Andres Almiray]
    "#ccc_f3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/24fbebf6-ee24-44e9-9887-5e7605161496",     //  12. SpotBugs(FindBugs)による大規模ERPのコード品質改善 [Kengo TODA]
    "#ccc_g3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/72065ef7-9363-4f92-8220-8a126e148545",     //  13. データ履歴管理のためのテンポラルデータモデルとReladomoの紹介 [伊藤博志]
    "#ccc_i1": "https://questionnaires.cfapps.pez.pivotal.io/sessions/0324b467-5a93-497f-8010-0dccc1a22416",     //  14. 全部 Java で作っちゃえ!! Vaadin 8 による "オール Java" Web アプリ開発のしくみと実践 [加藤 裕]
    "#ccc_l1": "https://questionnaires.cfapps.pez.pivotal.io/sessions/a877d8ca-2335-48e0-ad9e-a90bd50d6db4",     //  15. How to use MicroProfile and a way to rebirth Japanese enterprise computing [HASUNUMA Kenji]
    "#ccc_m1": "https://questionnaires.cfapps.pez.pivotal.io/sessions/905bacd3-2250-4075-8dcd-d71f9f1a3f18",     //  16. JavaエンジニアのためのPostgreSQLステップアップ [喜田 紘介]
    "#ccc_a4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/896c0cd3-5bc0-4ce3-9c8e-472e2999f00a",     //  17. ヤフーの広告レポートシステムをSpring Cloud Stream化するまで [塩野　貴義, 橋本　尚亮]
    "#ccc_c4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/0da07375-d2d1-440c-a1a1-df21ee113255",     //  18. Unified JVM Logging: Java 9 から変わる JVM ログ [KUBOTA Yuji]
    "#ccc_e4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/98e1c1a0-ccbe-43e1-9ae0-f9d05e0e93d5",     //  19. What you need to know about HotSpot and Your Code [Kirk Pepperdine]
    "#ccc_f4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/98494796-4a90-445e-a562-2d4356507d35",     //  20. ナビタイムも導入！！ボットで始発・終電案内から観光ガイドまで 〜 Java でも日本語自然言語処理をカンタンに利用可能 Microsoft LUIS!! [寺田佳央, 小田中 育生]
    "#ccc_g4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/824a12e7-b142-404a-bfee-af647432c958",     //  21. Javaエンジニアに知って欲しいRDBアンチパターン [soudai sone]
    "#ccc_i2": "https://questionnaires.cfapps.pez.pivotal.io/sessions/5b843b7b-ce47-4b6b-a3dd-d5f3f687cc9a",     //  22. Polyglot on the JVM with Graal [西川 彰広]
    "#ccc_l2": "https://questionnaires.cfapps.pez.pivotal.io/sessions/ad0ac2c2-d917-48f1-9462-00d89743307b",     //  23. JavaエンジニアのためのScala入門 [Abe Asami (きの子)]
    "#ccc_l3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/c9251c9a-ca7e-4c29-a55c-8b4e864dd7b1",     //  24. 新卒2年目が鍛えられたコードレビュー道場の軌跡 [chiiia12]
    "#ccc_m2": "https://questionnaires.cfapps.pez.pivotal.io/sessions/99044d7b-e187-4650-83f8-1e4ccfc6fdd0",     //  25. 文型さえおさえれば英語を読む力は上がる！ [よこな]
    "#ccc_m3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/5ff8de77-de27-4cfd-8d6d-3c36d478bccd",     //  26. Selenideを使ってみた 〜 ブラウザテスト自動化 〜	 [snowhiro]
    "#ccc_a5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/a51a94eb-2b6a-4740-8915-f67ae35920fa",     //  27. Scalaによるサービス開発現場での継続的リファクタリングの実践 [岩松 竜也]
    "#ccc_c5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/9ce21b58-453d-4bcf-9311-69a7bc790805",     //  28. Javaエンジニアから見たKotlinの魅力 [空中 清高]
    "#ccc_e5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/72fd77aa-3763-45da-b20a-a74d7ac76ed4",     //  29. Javaで実装して学ぶOAuth 2.0！ [多田真敏]
    "#ccc_f5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/75192c09-e4ee-4be6-a5dd-da90ce5dc388",     //  30. Seasar2からSpringへ移行した俺たちのアプリケーションがマイクロサービスアーキテクチャへ歩み始めた [阪田 浩一]
    "#ccc_g5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/a6233338-7d97-4209-bc30-bc60b16a4c6a",     //  31. Introduction of Project Jigsaw [櫻庭 祐一]
    "#ccc_i3": "https://questionnaires.cfapps.pez.pivotal.io/sessions/4333e84b-0dec-4b63-818a-a4dd338348b0",     //  32. Androidアプリ開発からみたRxJavaの使いどころ [Naoki Morioka]
    "#ccc_l4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/d06b6589-f87f-4140-bdc0-2285cef22dd7",     //  33. SIプロジェクトでよくあるフレームワークのカスタム開発ってまだ必要なの？ [Hideyuki Fujikawa]
    "#ccc_l5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/d0bc7daa-de57-448b-b203-d67f73dd17ce",     //  34. Java8移行は怖くない～エンタープライズ案件でのJava8移行事例について～ [大中 浩行]
    "#ccc_m4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/efef247a-139b-4b49-a2e4-dcd3c2859af1",     //  35. 今日からDL4J [EVGENIY(髙橋良貴)]
    "#ccc_m5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/c9ae1093-ea06-4909-b9ea-6a70a33c2155",     //  36. グラフデータベース入門 [嶽　雅也]
    "#ccc_a6": "https://questionnaires.cfapps.pez.pivotal.io/sessions/1710e2ce-6084-4627-9261-9c01ee6eae1b",     //  37. Java8プログラミング ベストプラクティス & きしだが働いてるかどうかIDEのメモリ使用状況から機械学習で判定する [きしだ なおき]
    "#ccc_c6": "https://questionnaires.cfapps.pez.pivotal.io/sessions/bcc06602-0e28-4961-975c-75a48b8220cb",     //  38. 劇的！データベース・ビフォーアフター 時代はディスクからインメモリーへ―― [山河 征紀, 漆原 茂]
    "#ccc_e6": "https://questionnaires.cfapps.pez.pivotal.io/sessions/7fd2655b-1903-4abe-94f0-af88b65ab67f",     //  39. Spark + DeepLearning4J の特長と最新動向 [田中裕一]
    "#ccc_f6": "https://questionnaires.cfapps.pez.pivotal.io/sessions/f1d08d24-30b0-4acd-b7b1-74903f551458",     //  40. U-NEXT学生インターン、過激なJavaの学び方と過激な要求 [舟木 初]
    "#ccc_g6": "https://questionnaires.cfapps.pez.pivotal.io/sessions/d0e3a2b9-dfe5-4acb-8a75-b9979f6ba91d",     //  41. Engineers can change the world ～ "世界" で活躍するエンジニアになるために [Drew Robbins, 寺田 佳央]
    "#ccc_i4": "https://questionnaires.cfapps.pez.pivotal.io/sessions/a2c1aef5-d8ab-4930-8b94-586fb6a38167",     //  42. Arachne Unweaved [Ikuru K]
    "#ccc_l6": "https://questionnaires.cfapps.pez.pivotal.io/sessions/d0c9f295-0f98-409a-9d2c-09b148fa44c1",     //  43. Javaとアイドルのコラボ！？某アイドルBot開発の裏側 [菊田洋一]
    "#ccc_l7": "https://questionnaires.cfapps.pez.pivotal.io/sessions/1cc09a1b-23e0-4ab4-8e4e-9792148384f4",     //  44. Javaチョットデキルへの道～JavaコアSDKに見る真似したいコード10選～ [福嶋航]
    "#ccc_m6": "https://questionnaires.cfapps.pez.pivotal.io/sessions/5f382d22-79a9-4bd5-a021-b8525bdd9403",     //  45. JavaFXでデスクトップガジェット風プログラムを作る [高橋 徹]
    "#ccc_m7": "https://questionnaires.cfapps.pez.pivotal.io/sessions/4b282456-888d-4f7d-bf1b-d73a32343919",     //  46. 新卒2年目から始めるOSSのススメ 〜明日からできるコミットデビュー〜 [梶栗 芳夫]
    "#ccc_a7": "https://questionnaires.cfapps.pez.pivotal.io/sessions/7b038e94-2946-487a-9be3-f37e8f214f46",     //  47. VMの歩む道。Dalvik、ART、そしてJava VM [yy_yank]
    "#ccc_c7": "https://questionnaires.cfapps.pez.pivotal.io/sessions/0f95b0ba-9b2c-45f6-a69a-5ba19e298d6b",     //  8. マチコ&河村の怒り新党 〜真の最終回〜 [よこな]
    "#ccc_g7": "https://questionnaires.cfapps.pez.pivotal.io/sessions/27ae6b3b-46a4-47bd-88df-3b9487460d7e",     //  49. ハックで生きる：オープンソースで会社を興すには [川口耕介]
    "#ccc_i5": "https://questionnaires.cfapps.pez.pivotal.io/sessions/58bc378a-4d0b-472a-a885-46bfa85d7654",     //  50. Java x Arduinoで始めるIoT / フィジカルコンピューティング [Yusuke Yamamoto]
    "#ccc_l8": "https://questionnaires.cfapps.pez.pivotal.io/sessions/b7414e0f-8a13-46f4-965f-bad5cb73a3a6",     //  51. 思ったほど怖くない！Haskell on JVM 超入門 [チェシャ猫]
    "#ccc_m8": "https://questionnaires.cfapps.pez.pivotal.io/sessions/dee93364-19b7-462b-b4ba-17c50b7a10ef",    //  52. Ordinary Object Pointer について調べてみた [Go Tanaka]
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
});