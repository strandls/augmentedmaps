function getStatistics() {
    var url = 'http://' + document.domain + '/ml_orchestrator.php?action=getStatistics';

    var stats;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){
            if (parseFloat(msg)){
                return false;
            } else {
                stats = eval('(' + data + ')');
                return true;
            }
        }
    });

    return stats;
}

function getStatisticsHTML() {
	
    var titles = {layer_count:'<span class="stats_normal">Number of</span><br><span class="stats_big">MAP</span> <span class="stats_big_bold">LAYERS</span>',
		checklist_count:'<span class="stats_normal">Number of</span><br><span class="stats_big_bold">CHECKLISTS</span>',
		species_page_count:'<span class="stats_normal">Number of</span><br><span class="stats_big_bold">SPECIES</span> <span class="stats_big">PAGES</span>',
		occurrence_count:'<span class="stats_normal">Number of</span><br><span class="stats_big_bold">OCCURRENCE</span> <span class="stats_big">RECORDS</span>',
		species_occurrence_count:'<span class="stats_normal">Number of</span><br><span class="stats_big_bold">SPECIES</span> <span class="stats_big">WITH</span> <span class="stats_big_bold">OCCURRENCE</span> <span class="stats_big">RECORDS</span>' }	

    var stats = getStatistics();

    var html = '';
    
    for (var key in stats){
	html = html + titles[key] + "<div class='stats_number'>" + stats[key] + '</div>';	
    }
	
    return html;
}

jQuery(document).ready(function(){

        $('#coda-slider-1').codaSlider({
            autoSlide: true,
            autoSlideInterval: 4000,
            autoSlideStopWhenClicked: true
        });

        $("#statistics_box").html(getStatisticsHTML());

        $("#secondary_content").load("/augmentedmaps/sites/default/files/static/wg.html");

        $("#western_ghats_link").click(function(){
            $("#secondary_content").load("/augmentedmaps/sites/default/files/static/wg.html");
        });

        $("#hotspots_link").click(function(){
            $("#secondary_content").load("/augmentedmaps/sites/default/files/static/hotspots.html");
        });

        $("#project_link").click(function(){
            $("#secondary_content").load("/augmentedmaps/sites/default/files/static/project.html");
        });

        $("#timeline_link").click(function(){
            $("#secondary_content").load("/augmentedmaps/sites/default/files/static/timeline.html");
        });

        $("#data_link").click(function(){
            $("#secondary_content").load("/augmentedmaps/sites/default/files/static/data_sharing.html");
        });

        $("#about_link").click(function(){
            $("#secondary_content").load("/augmentedmaps/sites/default/files/static/aboutus.html");
        });

        $("#secondary_content_close").click(function(){
            $("#secondary_content").html("");
            $("#secondary_content_close").hide();
        });

	$("#collaborate").hover(function(){
		$("#collaborate-links").html("<ul><li><a href='/cepf_grantee_database'>Western Ghats CEPF Projects</a></li><br/> <li><a href='/collaborate/partners'>Portal Partners</a> </li></ul>");
       },
	function(){
		$("#collaborate-links").html("");
       });
});


