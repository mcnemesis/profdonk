/*Scroll transition to anchor*/

$("a.toscroll").on('click',function(e) {
    var url = e.target.href;
    var hash = url.substring(url.indexOf("#")+1);
    $('html, body').animate({
        scrollTop: $('#'+hash).offset().top
    }, 500);
    return false;
});

$(document).ready(function () {
  // ORCID for Prof. Donald R. Kugonza
  // https://orcid.org/0000-0002-4873-6637
  const orcid = "0000-0002-4873-6637";
  const url = `https://pub.orcid.org/v3.0/${orcid}/works`;

  $.ajax({
    url: url,
    headers: {
      Accept: "application/json"
    },
    success: function (data) {
      const resultsDiv = $("#orcid_results");
      const works = data.group;
      
      var tags = [];
      var tagCount = 0;

      works.forEach((work) => {
        const title = work["work-summary"][0].title.title.value;
        const authors = work["work-summary"][0]["source"]["source-name"].value;
        const year = work["work-summary"][0]["publication-date"].year.value;
        const link = work["work-summary"][0]["url"]
          ? work["work-summary"][0]["url"].value
          : "#";
        
        const tagLabel = '#' + (tagCount+1) + "@" + year;
        
        tags[tagCount] =  { label: tagLabel, url: link, target: '_blank', title: title }
        tagCount += 1;

        const workDiv = $("<div></div>").attr({"class": "entry-item"});
        workDiv.html(`
<h3><small>${tagLabel}</small>: ${title}</h3>
<p><strong>Source:</strong> ${authors} | 
<strong>Year:</strong> ${year} |
<a href="${link}" target="_blank">Read more</a>
</p>
`);
        resultsDiv.append(workDiv);
      });
      
      // render tagCloud
      renderTagCloud(tags);
    },
    error: function (err) {
      console.error("Error fetching data:", err);
    }
  });
});



function renderTagCloud(entries){
  var tagVw = window.innerWidth * 0.68;
   var settings = {
                entries: entries,
                width: tagVw,
                height: tagVw * 1.5,
                radius: '65%',
                radiusMin: 75,
                bgDraw: true,
                bgColor: '#111',
                opacityOver: 1.00,
                opacityOut: 0.05,
                opacitySpeed: 6,
                fov: 800,
                speed: 2,
                fontFamily: 'Oswald, Arial, sans-serif',
                fontSize: '15',
                fontColor: '#fff',
                fontWeight: 'normal',//bold
                fontStyle: 'normal',//italic 
                fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
                fontToUpperCase: true
            };         
            $( '#tag_cloud' ).svg3DTagCloud( settings );
}