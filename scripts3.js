var target = window.location.hash.replace("#", "");

function copyFunction() {
    var linkElement = document.getElementById("getlink");
    linkElement.style.display = "inline-block";
    linkElement.select();
    document.execCommand("copy");
    linkElement.style.display = "none";
    document.getElementById("LinkCopy").classList.add("copied");
    setTimeout(function () {
        document.getElementById("LinkCopy").classList.remove("copied");
    }, 3000);
}

function shortCodeIfy(e, t, a) {
    var parts = e.split("$");
    var regex = /[^{\}]+(?=})/g;
    for (var i = 0; i < parts.length; i++) {
        var subParts = parts[i].split("=");
        if (subParts[0].trim() == t) {
            return (a = subParts[1]) != null && String(a.match(regex)).trim();
        }
    }
    return false;
}

function getAjax(e, t, a, o, r) {
    switch (t) {
        case "msimple":
        case "ticker":
        case "featured":
        case "block":
        case "grid":
        case "video":
        case "list":
        case "default":
        case "mini":
        case "comments":
        case "related":
            if (o == 0) {
                o = "geterror404";
            }
            var i = getFeedUrl(t, a, o);
            $.ajax({
                url: i,
                type: "GET",
                dataType: "json",
                cache: true,
                beforeSend: function (a) {
                    switch (t) {
                        case "ticker":
                        case "featured":
                        case "block":
                        case "grid":
                        case "video":
                        case "list":
                        case "default":
                        case "mini":
                        case "comments":
                        case "related":
                            e.html(beforeLoader()).parent().addClass("type-" + t);
                    }
                },
                success: function (a) {
                    var r = "";
                    var i = -1;
                    var s = a.feed.entry;
                    if ("related" == t && s != null) {
                        for (var n = 0; n < s.length; n++) {
                            if (clink == l[n].link.slice(-1)[0].href) {
                                i = n;
                            }
                        }
                    }
                    var c = a.feed.entry;
                    if (c != null) {
                        var d = 0;
                        for (var m = 0; m < c.length; m++) {
                            var h = getPostLink(c, m);
                            var n = getPostTitle(c, m);
                            var f = getPostTag(c, m);
                            var p = getPostAuthor(c, m);
                            var u = getPostDate(c, m, f);
                            var g = getPostImage(c, m);
                            var v = getPostImageType(g, m);
                            var w = getPostMeta(p, u, c, m, t);
                            var x = "";
                            switch (t) {
                                case "msimple":
                                    x += '<div class="mega-item post"><a title="' + n + '" class="entry-image-wrap  ' + v + '" href="' + h + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + g + '"/></a><h2 class="entry-title"><a href="' + h + '" title="' + n + '">' + n + "</a></h2>" + w[1] + "</div>";
                                    break;
                                case "ticker":
                                    x += '<div class="ticker-item item-' + m + '"><h2 class="entry-title"><a href="' + h + '" title="' + n + '">' + n + "</a></h2></div>";
                                    break;
                                case "featured":
                                    x += '<div class="featured-item cs item-' + m + '"><a class="featured-inner" href="' + h + '" title="' + n + '"><span class="entry-image-wrap before-mask ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></span><div class="entry-header entry-info">' + f + '<h2 class="entry-title">' + n + "</h2>" + w[0] + "</div></a></div>";
                                    break;
                                case "block":
                                    switch (m) {
                                        case 1:
                                            x += '<div class="block-item item-' + m + '"><a href="' + h + '" title="' + n + '" class="entry-image-wrap  ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></a><div class="entry-info">' + f + '<h2 class="entry-title"><a href="' + h + '" title="' + n + '">' + n + "</a></h2>" + w[1] + "</div></div>";
                                            break;
                                        default:
                                            x += '<div class="block-item item-' + m + '"><a href="' + h + '" title="' + n + '"><h2 class="entry-title">' + n + "</h2></a></div>";
                                    }
                                    break;
                                case "grid":
                                    x += '<div class="grid-item item-' + m + '"><a href="' + h + '" title="' + n + '"><span class="entry-image-wrap ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></span><div class="entry-info">' + f + '<h2 class="entry-title">' + n + "</h2>" + w[1] + "</div></a></div>";
                                    break;
                                case "video":
                                    x += '<div class="video-item item-' + m + '"><a href="' + h + '" title="' + n + '"><span class="entry-image-wrap ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></span><div class="entry-info">' + f + '<h2 class="entry-title">' + n + "</h2>" + w[1] + "</div></a></div>";
                                    break;
                                case "list":
                                    x += '<li class="list-item item-' + m + '"><a href="' + h + '" title="' + n + '"><span class="entry-image-wrap ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></span><div class="entry-info">' + f + '<h2 class="entry-title">' + n + "</h2>" + w[1] + "</div></a></li>";
                                    break;
                                case "default":
                                    x += '<div class="default-item item-' + m + '"><a href="' + h + '" title="' + n + '"><span class="entry-image-wrap ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></span><div class="entry-info">' + f + '<h2 class="entry-title">' + n + "</h2>" + w[1] + "</div></a></div>";
                                    break;
                                case "mini":
                                    x += '<li class="mini-item item-' + m + '"><a href="' + h + '" title="' + n + '"><span class="entry-image-wrap ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></span><div class="entry-info">' + f + '<h2 class="entry-title">' + n + "</h2>" + w[1] + "</div></a></li>";
                                    break;
                                case "comments":
                                    x += '<li class="comment-item item-' + m + '"><a href="' + h + '" title="' + n + '"><div class="comment-image-wrap ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></div><div class="comment-content">' + p + '<h2 class="comment-title">' + n + "</h2>" + w[1] + "</div></a></li>";
                                    break;
                                case "related":
                                    if (m >= i + 2 && m <= i + 5) {
                                        x += '<div class="related-item item-' + m + '"><a href="' + h + '" title="' + n + '"><div class="entry-image-wrap ' + v + '"><span class="entry-thumb" data-image="' + g + '"></span></div><div class="entry-info">' + f + '<h2 class="entry-title">' + n + "</h2>" + w[1] + "</div></a></div>";
                                    }
                                    break;
                            }
                            r += x;
                            d++;
                            if (d == o) {
                                break;
                            }
                        }
                        e.html(r);
                    }
                },
                error: function () {
                    e.html(getError404());
                },
            });
    }
}
