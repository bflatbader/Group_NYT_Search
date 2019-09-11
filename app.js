// FUNCTIONS

// VARIABLES
var apiKey = "Wmr6S0oVwYJDKCeFjAyhWiu9hEkgb9U4";
var queryURL = "";
var numRecords = "";
var startYear = "";
var endYear = "";

$('#clearBtn').on("click", function(event) {
    search = $('#searchTerm').val("");
    numRecords = $('#records').val("");
    startYear = $('#yearOne').val("");
    endYear = $('#yearTwo').val("");
    $('li').remove();
});

$('#searchBtn').on("click", function(event) {
    search = $('#searchTerm').val();
    numRecords = $('#records').val();
    startYear = $('#yearOne').val();
    endYear = $('#yearTwo').val();

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
        search + "&api-key=" + apiKey;

    if (startYear) { 
        beginDate = startYear + "0101";
        queryURL = queryURL + "&facet_fields=source&facet=true&begin_date=" + beginDate;
    } 
    
    if (endYear) {
        endDate = endYear + "0101";
        queryURL = queryURL + "&end_date=" + endDate;
    }

    console.log(queryURL);

    // AJAX Request
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        // After data comes back from the request
        .then(function(results) {
            // console.log(results.response.docs[0].abstract);
            if(numRecords) {
                for (i = 0; i < numRecords; i++) {
                    article = results.response.docs[i];
                    console.log(article);
                    title = article.headline.main;
                    byline = article.byline.original;
                    section = article.section_name;
                    url = article.web_url;
                    pubDate = article.pub_date;

                    var listItem = $("<li><h4>" + title + "</h4><br>"
                    + "<p>" + byline + "</p>"
                    + "<p>" + pubDate + "</p>"
                    + '<p class="h6">' + section + "</p>"
                    + "<p>" + url + "</p>"
                    + "</li>");
                    listItem.addClass("list-group-item");
                    $('#results').append(listItem);
                } 
            } else {
                for (i = 0; i < 10; i++) {
                    article = results.response.docs[i];
                    console.log(article);
                    title = article.headline.main;
                    byline = article.byline.original;
                    section = article.section_name;
                    url = article.web_url;
                    pubDate = article.pub_date;

                    var listItem = $("<li><h4>" + title + "</h4><br>"
                    + "<p>" + byline + "</p>"
                    + "<p>" + pubDate + "</p>"
                    + '<p class="h6">' + section + "</p>"
                    + "<p>" + url + "</p>"
                    + "</li>");
                    listItem.addClass("list-group-item");
                    $('#results').append(listItem);
                }
            }

        });
});

