/*
    # Endpoint URL #
    https://api.github.com/legacy/repos/search/{query}
    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.
    # Example Response JSON #
    {
      "repositories": [
        {
          "created_at": "2014-01-13T02:37:26Z",
          "description": "A Ruby interface to the TradeGecko API.",
          "followers": 1,
          "fork": false,
          "forks": 2,
          "has_downloads": true,
          "has_issues": true,
          "has_wiki": true,
          "homepage": null,
          "language": "Ruby",
          "name": "gecko",
          "open_issues": 3,
          "owner": "tradegecko",
          "private": false,
          "pushed": "2014-07-29T08:18:51Z",
          "pushed_at": "2014-07-29T08:18:51Z",
          "score": 16.24838,
          "size": 1617,
          "type": "repo",
          "url": "https://github.com/tradegecko/gecko",
          "username": "tradegecko",
          "watchers": 1
        }
      ]
    }
*/

$(function(){
var s, oLen, oList, data, resultInfo;
function getData(){
        s = $("#search").val();
        if(localStorage.getItem(s)){
                data = JSON.parse(localStorage.getItem(s));
                showResult(data);
        }
        else {
                url= "https://api.github.com/legacy/repos/search/"+s;
                $.ajax({
                        type:"GET",
                        url: url,
                        datatype : "json",
                        contentType: "application/json; charset=utf-8",
                        success: function(data){
                                localStorage.setItem(s,JSON.stringify(data));
                                showResult(data);
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                                alert("Failed to fetch data")
                        }
                });
        }
}

function showResult(d){
        oLen = data.repositories.length;
        oList = "<ul>";
        for(i=0;i<oLen;i++){
                resultInfo = "language: "+ data.repositories[1].language + ", followers: " +data.repositories[i].followers + ", url: " +data.repositories[1].url + ", description: " + data.repositories[i].description ;
                oList += "<li class='res'>"+data.repositories[i].username+ "/" + data.repositories[i].name + "<p class='resInfo'>"+ resultInfo + "</p></li>";
        }
        oList += "</ul>";
        $("#results").html(oList);

        $('.resInfo').hide();
        $('.res').on('click', function() {
                $(this).children('.resInfo').slideToggle('slow');
        });
}

$('#search').on('keypress', function(event){    
    if (event.keyCode == 13) {
        getData();
    }
});
    
});
