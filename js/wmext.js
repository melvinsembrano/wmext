// WMext Base Code
var wmext = {
  init: function() {
    this.getQueryParams();
    this.applyView();
  },

  getQueryParams: function() {
    this.qParam = $("#firstHeading span").text();
  },

  applyView: function() {
    var me = this;
    // add main page video list
    var vPanel = $("<div class='video-panel'></div>");
    $("#firstHeading").after(vPanel);
    me.search(encodeURIComponent(me.qParam), function(data) {
      me.createVideoList(data, vPanel);
    });

    var subFinder = "h3 span.mw-headline";
    $(subFinder).each(function() {
      var h = this;
      var searchText = $(h).text();
      var link = $("<a href='#'</a>").html("Search videos about " + searchText);

      $(h).parent().after(
        $("<div></div>").html(link)
      );

      $(link).click(function() {
        me.search(encodeURIComponent(me.qParam) + "+" + encodeURIComponent(searchText), function(data) {
          me.createVideoList(data, $(link).parent());
        });
        return false;
      });
    });
  },

  createVideoList: function(data, el) {
    var me = this;
    var ul = $("<ul class='video-list'></ul>");
    $.each(data.feed.entry, function(i, item) {
      var thumb = item.media$group.media$thumbnail[0];
      ul.append(
        $("<li></li>").html(
          $("<a></a>").attr("href", item.content.src).html(
            $("<img></img>").attr("src", thumb.url).attr("width", thumb.width)
          ).click(function() {
            me.showVideo(item);
            return false;
          })
        )
      );
    });
    $(el).html("<strong>View Video</strong>");
    $(el).append(ul);
  },

  showVideo: function(item) {
    var obj = $("<object></object>");
    var height = "390px";
    var width = "640px";

    obj.css("height", height)
      .css("width", width)
      .append($("<param name='movie'></param").attr("value", item.content.src))
      .append($("<param name='allowFullScreen'></param").attr("value", "true"))
      .append($("<param name='allowScriptAccess'></param").attr("value", "always"))
      .append(
        $("<embed></embed>")
          .attr("type", "application/x-shockwave-flash")
          .attr("src", item.content.src)
          .attr("allowfullscreen", "true")
          .attr("allowScriptAccess", "always")
          .attr("width", width)
          .attr("height", height)
      );

    $.fancybox.open([{
//      content: $("<iframe width='560' height='315' frameborder='0' allowfullscreen></iframe>").attr("src",item.content.src),
      content: obj,
      title: item.title.$t
    }]);
  },

  search: function(p, callback) {
    var order = "relevance";
    var index = "1";
    var max = "8";
    var format = "json";
    var url = "http://gdata.youtube.com/feeds/api/videos?q="+p+"&orderby="+order+"&start-index="+index+"&max-results="+max+"&v=2&alt="+format;
    $.get(url, function(data){
      console.info(url);
      console.info(data);
      if(callback) {
        callback(data);
      }
    },"json");
  }
};

$(document).ready(function() {
  wmext.init();
});
