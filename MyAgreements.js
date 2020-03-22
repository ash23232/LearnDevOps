var tableContent = "";
var pageName = "MyAgreements.aspx";

$(document).ready(function () {
	loadTable();
});

function loadTable(){
var userEmail = "komal.takkar@india.nec.com";
var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AgreementDetails')/items?$filter=(UserEmail) eq '"+userEmail +"'";
tableContent = "";
tableContents = "";
var tableContentForReport="";
  
  $.ajax({
        url: requestUri,
        async: false,
        type: "GET",
        headers: {
        	
            "accept": "application/json; odata=verbose"
        },
        success: function(data) {
		var objItems = data.d.results;
tableContents = '<table id="example" class="display table-bordered" style="width:100%;"><thead><tr><th scope="col">Agr. Number</th><th scope="col">Buyer</th><th scope="col">User</th><th scope="col">Status</th><th scope="col">Agr. Type</th><th scope="col">Agr. Category</th><th scope="col">Date</th><th scope="col">Service Description</th><th scope="col">Service Category</th><th scope="col">Start Date</th><th scope="col">End Date</th><th scope="col">Value</th><th scope="col">Service Provider</th><th scope="col">Payment Terms</th><th scope="col">Location</th></tr></thead><tbody>';

for (var i = 0; i < objItems.length; i++) {
tableContent += '<tr>';
					//Agreement Number
                  if(objItems[i].AgNumber != null && objItems[i].AgNumber != "" ){
	            		tableContent += '<td>' + objItems[i].AgNumber + '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//Buyer Name
                  if(objItems[i].Title != null && objItems[i].Title != "" ){
	            		tableContent += '<td>' + objItems[i].Title + '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//User Name
                  if(objItems[i].UserName != null && objItems[i].UserName != "" ){
	            		tableContent += '<td>' + objItems[i].UserName + '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//Agreement Status
                  if(objItems[i].AgStatus != null && objItems[i].AgStatus != "" ){
	            		tableContent += '<td>' + objItems[i].AgStatus + '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//Agreement Type
                  if(objItems[i].Agtype != null && objItems[i].Agtype != "" ){
	            		tableContent += '<td>' + objItems[i].Agtype + '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//Agreement Category
                  if(objItems[i].AgCategory != null && objItems[i].AgCategory != "" ){
	            		tableContent += '<td>' + objItems[i].AgCategory + '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//Agreement Date
                  if(objItems[i].AgDate != null && objItems[i].AgDate != "" ){
	            		tableContent += '<td>' + objItems[i].AgDate + '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//ServiceDescription
                  if(objItems[i].ServiceDescription!= null && objItems[i].ServiceDescription!= "" ){
	            		tableContent += '<td>' + objItems[i].ServiceDescription+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}

				//ServiceCategory
                  if(objItems[i].ServiceCategory!= null && objItems[i].ServiceCategory!= "" ){
	            		tableContent += '<td>' + objItems[i].ServiceCategory+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//AgStartDate
                  if(objItems[i].AgStartDate!= null && objItems[i].AgStartDate!= "" ){
	            		tableContent += '<td>' + objItems[i].AgStartDate+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}

				//AgEndDate
                  if(objItems[i].AgEndDate!= null && objItems[i].AgEndDate!= "" ){
	            		tableContent += '<td>' + objItems[i].AgEndDate+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
				//AgValue
                  if(objItems[i].AgValue!= null && objItems[i].AgValue!= "" ){
	            		tableContent += '<td>' + objItems[i].AgValue+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}

				//ServiceProvider
                  if(objItems[i].ServiceProvider!= null && objItems[i].ServiceProvider!= "" ){
	            		tableContent += '<td>' + objItems[i].ServiceProvider+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}
	            	
	            	//PaymentTerms
                  if(objItems[i].PaymentTerms!= null && objItems[i].PaymentTerms!= "" ){
	            		tableContent += '<td>' + objItems[i].PaymentTerms+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}

				//Location
                  if(objItems[i].Location!= null && objItems[i].Location!= "" ){
	            		tableContent += '<td>' + objItems[i].Location+ '</td>';
	            	}else{
	            		tableContent += '<td></td>';
	            	}

	            	tableContent += '</tr>';


}//end of for loop
       },
        error: function(data) {
            //alert("Error occured");
            saveErrorList(pageName, "N/A", "loadTable()", data.responseJSON.error.code);
        } //end of error
    })//end of ajax
tableContent += '</tbody>'; 
    tableContent += '</table>';  
    tableContents += tableContent;         
    $('#formGrid').append(tableContents);
  $('#example thead tr').clone(true).appendTo( '#example thead' );
	$('#example thead tr:eq(0) th').each( function (i) {
	var title = $(this).text();
	
	$(this).html( '<input type="text" placeholder="Search '+title+'" style="width:100%;padding: 1px 1px;"/>' );
     			
    $( 'input', this ).on( 'keyup change', function () {
        if ( table.column(i).search() !== this.value ) {
            table
                .column(i)
                .search( this.value )
                .draw();
        }
    } );
} );

var table = $('#example').DataTable( {
     responsive: true,
    "bDestroy": true,
    "bProcessing": true,
	"lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
	"autoWidth": false,
  } );

  
  $("#example").wrap('<div style="width:100%;overflow:auto;"></div>');


} //end of loadTable