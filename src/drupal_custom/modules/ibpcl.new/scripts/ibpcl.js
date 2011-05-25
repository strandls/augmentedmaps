if(Drupal.jsEnabled) {
  $(document).ready(function(){
    // Show / Hide Checklist info
    $('#ibp_checklist_info a.toggle').click(function(){
      $(this).parent().find('a.toggle').toggle();
      $(this).parent().parent().find('div.value').toggle();
      return false;
    });
    $('#ibp_checklist_references a.toggle').click(function(){
      $(this).parent().find('a.toggle').toggle();
      $(this).parent().parent().find('div.value').toggle();
      return false;
    });

    $('#listingTable').dataTable();

  });
}
