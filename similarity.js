compare_idx = 0;

function gen_html(i){
  istr = i.toString();
  html = '<img id="'
  html += istr
  html += '" src="imgs/'
  html += istr 
  html += '.png" height="64" width="64" distance="'
  html += istr
  html += '">'
  return html
}

function load_images(){
  html = '';
  for (i = 0; i < 250; i++){
    html += gen_html(i);
  }
  $('#container').append(html);
}

function euclidean(a, b){
  // Euclidean distance between two vectors
  var d = 0;
  for (i = 0; i < a.length; i++){
    d += Math.pow(a[i] - b[i], 2)
  }
  return Math.sqrt(d)
}

$(window).load(function(){
  $.getJSON('features.json', function(features) { // load features
    load_images() //load images into html

    var $container = $('#container').isotope({
      getSortData: {
        distance: '[distance]'
      }
    });

    $('img').click(function() {
      compare_idx = $(this).attr('id');

      for (var idx=0; idx < 250; idx++){
        distance =  euclidean(features[compare_idx], features[idx]);
        $("#"+idx.toString()).attr('distance', distance);
      }

      $container.isotope( 'updateSortData', $container.children() );
      // low distance in feature space is equivalent to high similarity
      // since sort from low to high, most similar results are first
      $container.isotope({ sortBy: 'distance'});
    });
  });
  
});