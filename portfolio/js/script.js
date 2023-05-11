// Adobe Font読み込み
(function (d) {
    var config = {
            kitId: "dmp8enn",
            scriptTimeout: 3000,
            async: true,
        },
        h = d.documentElement,
        t = setTimeout(function () {
            h.className =
                h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
        }, config.scriptTimeout),
        tk = d.createElement("script"),
        f = false,
        s = d.getElementsByTagName("script")[0],
        a;
    h.className += " wf-loading";
    tk.src = "https://use.typekit.net/" + config.kitId + ".js";
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
        a = this.readyState;
        if (f || (a && a != "complete" && a != "loaded")) return;
        f = true;
        clearTimeout(t);
        try {
            Typekit.load(config);
        } catch (e) {}
    };
    s.parentNode.insertBefore(tk, s);
})(document);

// ドロップダウンメニュー
//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin() {
    var width = $(window).width();
    if (width <= 768) {
        //横幅が768px以下の場合
        $(".has-child>a").off("click"); //has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
        $(".has-child>a").on("click", function () {
            //has-childクラスがついたaタグをクリックしたら
            var parentElem = $(this).parent(); // aタグから見た親要素の<li>を取得し
            $(parentElem).toggleClass("active"); //矢印方向を変えるためのクラス名を付与して
            $(parentElem).children("ul").stop().slideToggle(500); //liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
            return false; //リンクの無効化
        });
    } else {
        //横幅が768px以上の場合
        $(".has-child>a").off("click"); //has-childクラスがついたaタグのonイベントをoff(無効)にし
        $(".has-child").removeClass("active"); //activeクラスを削除
        $(".has-child").children("ul").css("display", ""); //スライドトグルで動作したdisplayも無効化にする
    }
}

// ページがリサイズされたら動かしたい場合の記述
$(window).resize(function () {
    mediaQueriesWin(); /* ドロップダウンの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
    mediaQueriesWin(); /* ドロップダウンの関数を呼ぶ*/
});

// はじめに部分のスライダー
$(function () {
    $(".concept_slider")
        .on("init", function (event, slick) {
            $(this).append(
                '<div class="slick-num"><span class="now-count"></span> / <span class="all-count"></span></div>'
            );
            $(".now-count").text(slick.currentSlide + 1); // 現在のスライド番号(+1が無いと0からスタートしてしまう)
            $(".all-count").text(slick.slideCount); // スライドの総数
        })
        .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            autoplay: false,
            dots: false,
            arrows: true,
            speed: 500,
            fade: true,
            cssEase: "linear",
        });
    $(".concept_slider").on(
        "beforeChange",
        function (event, slick, currentSlide, nextSlide) {
            $(".now-count").text(nextSlide + 1); // 現在のスライド番号の次のスライドになったら番号を+1
        }
    );
});

// 作者あとがきタブ切り替え
//任意のタブにURLからリンクするための設定
function GethashID(hashIDName) {
    if (hashIDName) {
        //タブ設定
        $(".tab li")
            .find("a")
            .each(function () {
                //タブ内のaタグ全てを取得
                var idName = $(this).attr("href"); //タブ内のaタグのリンク名（例）#lunchの値を取得
                if (idName == hashIDName) {
                    //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
                    var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
                    $(".tab li").removeClass("active"); //タブ内のliについているactiveクラスを取り除き
                    $(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
                    //表示させるエリア設定
                    $(".area").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
                    $(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加
                }
            });
    }
}

//タブをクリックしたら
$(".tab a").on("click", function () {
    var idName = $(this).attr("href"); //タブ内のリンク名を取得
    GethashID(idName); //設定したタブの読み込みと
    return false; //aタグを無効にする
});

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on("load", function () {
    $(".tab li:first-of-type").addClass("active"); //最初のliにactiveクラスを追加
    $(".area:first-of-type").addClass("is-active"); //最初の.areaにis-activeクラスを追加
    var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
    GethashID(hashName); //設定したタブの読み込み
});

// ページトップボタン
// 一旦、ボタンを隠す
$(".pagetop").hide();
// 一定pxスクロールしたらボタンがフェードインで現れる
$(window).scroll(function () {
    if ($(this).scrollTop() > 700) {
        $(".pagetop").fadeIn();
    } else {
        $(".pagetop").fadeOut();
    }
});

// フッター付近での動き
$(".pagetop").hide();
$(window).on("scroll", function () {
    scrollHeight = $(document).height();
    scrollPosition = $(window).height() + $(window).scrollTop();
    footHeight = $(".footer_wrap").innerHeight() - 65;
    if (scrollHeight - scrollPosition <= footHeight) {
        // ページトップボタンがフッター手前に来たらpositionをfixedからabsoluteに変更
        $("body").css({
            position: "relative",
        });
        $(".pagetop").css({
            position: "absolute",
            bottom: footHeight,
        });
    }
});
