// WMext Base Code
var wmext = {
  init: function() {
    this.getQueryParams();
    this.applyView();
  },

  getQueryParams: function() {
  
  },

  applyView: function() {
    var me = this;
    var subFinder = "h3 span.mw-headline";
    $(subFinder).each(function() {
      var h = this;
      // $(this).css("border", "1px solid red");
      $(h).parent().after(
        $("<div></div>").html("Thomas Sembrano Gwapo").css("color", "red")
      );
      me.search("apple+Inc+"+encodeURIComponent($(h).text()));
    });
  },

  search: function(p) {
    var order = "relevance";
    var index = "1";
    var max = "5";
    var format = "json";
    var url = "http://gdata.youtube.com/feeds/api/videos?q="+p+"&orderby="+order+"&start-index="+index+"&max-results="+max+"&v=2&alt="+format;
    $.get(url, function(data){
      console.info(url);
      console.info(data);
    },"json");
  }
};

$(document).ready(function() {
  wmext.init();
});
