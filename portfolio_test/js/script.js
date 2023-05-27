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
// Font読み込みここまで

// ドロップダウンメニュー
//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin() {
    var width = $(window).width();
    if (width <= 1200) {
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
// ドロップダウンメニューここまで

// ハンバーガーメニュー
$(function () {
    $(".sp_btn, .sp_nav li").on("click", function () {
        $(".sp_nav").fadeToggle();
        $(".sp_btn").toggleClass("open");
    });
});
// ハンバーガーメニューここまで

// // グローバルメニュー動き
// お試し1
// $(function () {
//     var nav = $(".headerwrap");
//     //表示位置
//     var navTop = nav.offset().top + 500;
//     //ナビゲーションの高さ
//     var navHeight = $("#skills").offset().top; //#conceptの位置まできたら
//     var showFlag = false;
//     nav.css("top", -navHeight + "px");
//     //ナビゲーションの位置まできたら表示
//     $(window).scroll(function () {
//         var winTop = $(this).scrollTop();
//         if (winTop >= navTop) {
//             if (showFlag == false) {
//                 showFlag = true;
//                 nav.addClass("fixed").stop().animate({ top: "0px" }, 200);
//             }
//         } else if (winTop <= navTop) {
//             if (showFlag) {
//                 showFlag = false;
//                 nav.stop().animate(
//                     { top: -navHeight + "px" },
//                     200,
//                     function () {
//                         nav.removeClass("fixed");
//                     }
//                 );
//             }
//         }
//     });
// });

// お試し2
// $(function () {
//     $(window).scroll(function () {
//         if ($(this).scrollTop() > 100) {
//             $("#header_wrap").addClass("fixed");
//         } else {
//             $("#header_wrap").removeClass("fixed");
//         }
//     });
// });

// お試し3
$(function () {
    $(window).scroll(function () {
        if ($("#skills").offset().top) {
            $("#header_wrap").addClass("fixed");
        } else {
            $("#header_wrap").removeClass("fixed");
        }
    });
});

// お試し4
// var beforePos = 0; //スクロールの値の比較用の設定

// //スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
// function ScrollAnime() {
//     var elemTop = $("#main").offset().top; //#mainの位置まできたら
//     var scroll = $(window).scrollTop();
//     //ヘッダーの出し入れをする
//     if (scroll == beforePos) {
//         //IE11対策で処理を入れない
//     } else if (elemTop > scroll || 0 > scroll - beforePos) {
//         //ヘッダーが上から出現する
//         $("#header_wrap").removeClass("UpMove"); //.header_wrapにUpMoveというクラス名を除き
//         $("#header_wrap").addClass("DownMove"); //.header_wrapにDownMoveのクラス名を追加
//     } else {
//         //ヘッダーが上に消える
//         $("#header_wrap").removeClass("DownMove"); //.header_wrapにDownMoveというクラス名を除き
//         $("#header_wrap").addClass("UpMove"); //.header_wrapにUpMoveのクラス名を追加
//     }

//     beforePos = scroll; //現在のスクロール値を比較用のbeforePosに格納
// }

// // 画面をスクロールをしたら動かしたい場合の記述
// $(window).scroll(function () {
//     ScrollAnime(); //スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
// });

// // ページが読み込まれたらすぐに動かしたい場合の記述
// $(window).on("load", function () {
//     ScrollAnime(); //スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
// });
// // グローバルメニュー動きここまで

// フェードインアニメーション
$(function () {
    $(window).scroll(function () {
        const windowHeight = $(window).height();
        const scroll = $(window).scrollTop();

        $(".element").each(function () {
            const targetPosition = $(this).offset().top;
            if (scroll > targetPosition - windowHeight + 150) {
                $(this).addClass("is-fadein");
            }
        });
    });
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
// はじめに部分スライダーここまで

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
// タブ切り替えここまで

// ページトップボタン
// 一旦、ボタンを隠す
$(".toppage .pagetop").hide();
// 一定pxスクロールしたらボタンがフェードインで現れる
$(window).scroll(function () {
    if ($(this).scrollTop() > 550) {
        $(".toppage .pagetop").fadeIn();
    } else {
        $(".toppage .pagetop").fadeOut();
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $(".lowerpage .pagetop").fadeIn();
    } else {
        $(".lowerpage .pagetop").fadeOut();
    }
});

// フッター付近での動き
$(".pagetop").hide();
$(window).on("scroll", function () {
    scrollHeight = $(document).height();
    scrollPosition = $(window).height() + $(window).scrollTop();
    footHeight = $(".footer_wrap").innerHeight() - 70;
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
// ページトップボタンここまで

// 実績リストスライダー
$(".list_slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    dots: true,
    variablewidth: true,
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
});
// 実績リストスライドここまで

// 実績詳細ページスライダー
$(".photo_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    variablewidth: true,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
            },
        },
    ],
});
// 実績詳細ページスライダーここまで
