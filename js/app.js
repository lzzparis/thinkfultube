$(document).ready(function(){
	var params={
		part:'snippet',
		key:'AIzaSyAY85WUoweSaRODp13JHrz44V7k39Pyfbw',
		q:'',
		pageToken:'',
	};
	var url = "https://www.googleapis.com/youtube/v3/search"; 
	//listen for form submit
	$("#search-box").submit(function(event){
		event.preventDefault();
		//get search term
		params.q = $("#query").val();
		$("#query").val("");
		getRequest(url,params);
	});

	$("#page-buttons").on("click","button",function(event){
		var bData;
		params.pageToken =this.value;
		$.getJSON(url,params,function(bData){
			showResults(bData);
			addPageButtons(bData);
		});	
	});


});
function getRequest(grURL,grParams){
	$.getJSON(grURL,grParams,function(data){
		showResults(data);
		addPageButtons(data);
	});
}

function showResults(searchResults){
	var html ="";
	var id="";
	var thumbURL="";
	$("#search-results").text("");
	searchResults.items.forEach(function(singleResult){
		thumbURL = singleResult.snippet.thumbnails.medium.url;
		if(singleResult.id.videoId !== undefined){
			id="watch?v="+singleResult.id.videoId;
		}
		else if (singleResult.id.channelId !== undefined){
			id="channel/"+singleResult.id.channelId;
		}
		html ="<a href=\"https://www.youtube.com/"+id+"\"> <img src=\""+thumbURL+"\"></a>";
		$("#search-results").append(html);
	});

}

function addPageButtons(qData){
	if(qData.prevPageToken !== undefined){
		$("#previous").attr("value",qData.prevPageToken);
		$("#previous").css("display","inline-block");
	}
	else{$("#previous").css("display","none");}
	if(qData.nextPageToken !== undefined){
		$("#next").attr("value",qData.nextPageToken);
		$("#next").css("display","inline-block");
	}
}

