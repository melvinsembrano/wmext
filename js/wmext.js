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
    var ul = $("<ul class='video-list'></ul>");
    $.each(data.feed.entry, function(i, item) {
      var thumb = item.media$group.media$thumbnail[0];
      ul.append(
        $("<li></li>").html(
          $("<a></a>").attr("href", item.content.src).html(
            $("<img></img>").attr("src", thumb.url).attr("width", thumb.width)
          )
        )
      );
    });
    $(el).html(ul);
  },

  search: function(p, callback) {
    var order = "relevance";
    var index = "1";
    var max = "5";
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
