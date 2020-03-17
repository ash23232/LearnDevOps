var buyerName = "";
var buyerEmail = "";
var buyerBuHeadName = "";
var buyerBuHeadEmail = "";

var userAccountName = [];
var userName = [];
var userBUHeadName = "";
var userBUHeadEmail = "";
var UserEmail = "";

var emptyField = false;

var from = "noreply@india.nec.com";
var to = "";
var cc = "";
var body = "";
var subject = "";

var pageName = "ProductDetails";

$(document).ready(function () 
{
var currentURL = window.location.href;
var ItemToBeFetchedID = currentURL.split('?')[1];

//get details of logged in user
  GetDetailofbuyer();
  
    //bind all dropdowns
  BindAgreementStatusDropdown();
  BindAgreementTypeDropdown();
  BindAgreementCategoryDropdown();
  BindCurrencyDropdown();
  BindPaymentTermsDropdown();

  if(ItemToBeFetchedID != null)
  {
    //validate buyer for the ID in query string
  validateBuyer(ItemToBeFetchedID);

  }

if(typeof ItemToBeFetchedID === 'undefined' || ItemToBeFetchedID === null)
{
initializePeoplePicker('peoplePickerDiv');
  
  //On select of user from people picker input field, user's email id get populated in another input field.		
  SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan.OnValueChangedClientScript=function (peoplePickerId, selectedUsersInfo) {
      getSelectedUserEmmail();
    $('#txtUserEmail').val(to[0]);
    document.getElementById("txtUserEmail").readOnly = true;
     document.getElementById("txtUserEmail").style.background = "#DCDCDC";
     var user = "NECTECHNOLOGIES\\" + $('#txtUserEmail').val().split('@')[0];
     getSelectedUserADDetails(user);
  };
}
  //disable cut, copy, paste
   $('#txtAgrValue').bind('copy paste cut',function(e) { 
 e.preventDefault(); //disable cut,copy,paste
 alert('cut,copy & paste options are disabled !!');
 });
 
 $('#txtAgrValue').on('change', function() {
        if (/^\d+$/.test($(this).val())) {
            // Contain numbers only
        } else {
           alert("Please enter numeric value only.")
        }
    })
    
    //delete
     $("#btnDelete").click(function() {
     var listName = "AgreementDetails";
$.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + ItemToBeFetchedID + ")",  
            type: "POST",  
            contentType: "application/json;odata=verbose",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE",  
            },  
            success: function(data) {  
                alert("Item deleted successfully"); 
                window.location.href = "/sites/purchase/ContractProcessing/SitePages/AllAgreements.aspx";  
            },  
            error: function(data) {  
                alert("failed");  
            }  
        });  
});
    
  //on submit click
  $("#btnSubmit").click(function() {

    emptyField = false; // false: filled ; true : blank

    //check if people picker is blank or not
 if((document.getElementById("peoplePickerDiv").getElementsByTagName("input")[0].value).trim() == "" || (document.getElementById("peoplePickerDiv").getElementsByTagName("input")[0].value == null || document.getElementById("peoplePickerDiv").getElementsByTagName("input")[0].value).trim() == "[]"){
      emptyField =true;
      document.getElementById("peoplePickerDiv").style.border = "2px solid red";
    }
    else{
      document.getElementById("peoplePickerDiv").style.border = "1px solid #ccc";
    }//end of people picker validation
    
    //text box validation: broder will be marked red if blank
      $('input[name="req"]').each(function(){
         if($(this).val().trim()==""){
            emptyField =true;
            $(this).css({"border": "2px solid red"});
          }else{
          $(this).css('border', '1px solid #ccc'); 	
        }
      }); // end of text box validation
      
      //Agreement status validation
      if($('#AgrStatus').val() == "Please Select"){
        emptyField =true;
            $('#AgrStatus').css({"border": "2px solid red"});
      }else{
        $('#AgrStatus').css('border', '1px solid #ccc'); 
      } //end of AgrStatus
      
      //Agreement Type validation
      if($('#AgrType').val() == "Please Select"){
        emptyField =true;
            $('#AgrType').css({"border": "2px solid red"});
      }else{
        $('#AgrType').css('border', '1px solid #ccc'); 
      } //end of AgrType
      
      //Agreement category validation
      if($('#AgrCategory').val() == "Please Select"){
        emptyField =true;
            $('#AgrCategory').css({"border": "2px solid red"});
      }else{
        $('#AgrCategory').css('border', '1px solid #ccc'); 
      } //end of AgrCategory
      
       //Currency validation
      if($('#Currency ').val() == "Please Select"){
        emptyField =true;
            $('#Currency ').css({"border": "2px solid red"});
      }else{
        $('#Currency ').css('border', '1px solid #ccc'); 
      } //end of AgrCategory

 //Payment Terms validation
      if($('#txtPaymentTerm').val() == "Please Select"){
        emptyField =true;
            $('#txtPaymentTerm').css({"border": "2px solid red"});
      }else{
        $('#txtPaymentTerm').css('border', '1px solid #ccc'); 
      } //end of AgrCategory






//if false, data will be submitted, else will be highlighted and pop-up will be displayed.
      if(emptyField == false){
        $("#btnSubmit").attr('disabled', true);
        for(var i=0; i<userAccountName.length; i++){
          var AccountName = userAccountName[i];					 
          ensureUser(_spPageContextInfo.webAbsoluteUrl,AccountName);
        }
        submitAgreementDetails();
      }else{
        blurt("Highlighted fields are mandatory. Please fill!", "", "error");
        $("#submit").attr('disabled', false);
      }				
  });		//end of submit		
}); //end of doc.ready

function validateBuyer(ItemToBeFetchedID)
{

var requestURL = _spPageContextInfo.webAbsoluteUrl +  "/_api/Web/Lists/GetByTitle('AgreementDetails')/Items?$filter=BuyerEmail eq '"+buyerEmail+"' and ID eq '"+ItemToBeFetchedID +"'";
$.ajax({
        url: requestURL ,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
             numofItems = data.d.results.length;
             
             //debugger;
             if(numofItems == 1)
             {
            // alert(data.d.results[0].AgStatus);
             $('#txtUserEmail').val(data.d.results[0].UserEmail);
             $('#txtAgrNumber').val(data.d.results[0].AgNumber);
             $('#txtAgrDate').val(data.d.results[0].AgDate);
             $('#businessUnit').val(data.d.results[0].BusinessUnit);
             $('#txtServiceDescription').val(data.d.results[0].ServiceDescription);
             document.getElementById('AgrCategory').value = data.d.results[0].AgCategory;
             document.getElementById('AgrStatus').value = data.d.results[0].AgStatus;
             document.getElementById('AgrType').value = data.d.results[0].Agtype;

             document.getElementById("btnDelete").style.display = "block";             }
             else
             {
             document.getElementById("btnDelete").style.display = "none";  
             alert("You are not the buyer for this agreement");
             window.location.href = "/sites/purchase/ContractProcessing/SitePages/AllAgreements.aspx";            
              }
        },
        error: function (error) {

            alert(JSON.stringify(error)+"checkUserEntryInList");
        }
    });

}


function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
      }

function GetDetailofbuyer()
 {
 debugger;
    var firstName = "";
    var lastName = "";
    $.ajax({  
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=UserProfileProperties",
    async: false,  
    headers: { Accept: "application/json;odata=verbose" },  
    success: function (data) {
     debugger; 
        var properties = data.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) 
        {  
          var property = properties[i].Key;
          
          //buyer Email
          if(properties[i].Key=="WorkEmail" && (properties[i].Value != "" || properties[i].Value != null))
          {
            buyerEmail = properties[i].Value;
            $('#txtBuyerEmail').val(buyerEmail);
	        document.getElementById("txtBuyerEmail").readOnly = true;
	        document.getElementById("txtBuyerEmail").style.background = "#DCDCDC";
          }

          //buyer Name          
          if(properties[i].Key=="FirstName" && (properties[i].Value != "" || properties[i].Value != null))
          {
            firstName = properties[i].Value;
          
          }
                
          if(properties[i].Key=="LastName" && (properties[i].Value != "" || properties[i].Value != null))
          {
            lastName = properties[i].Value;
          }
            
          //buyer Bu Head Name
		  if(properties[i].Key=="BUheadName" && (properties[i].Value != "" || properties[i].Value != null))
          {
            buyerBuHeadName = properties[i].Value;
          }
          
          //buyer BU Head Email
          if(properties[i].Key=="BUHeadEmail" && (properties[i].Value != "" || properties[i].Value != null))
          {
            buyerBuHeadEmail = properties[i].Value;						
          }
        }
        buyerName = firstName + " " + lastName; 
          $('#txtBuyerName').val(buyerName);
          document.getElementById("txtBuyerName").readOnly = true;
          document.getElementById("txtBuyerName").style.background = "#DCDCDC";      
    },  
    error: function (jQxhr, errorCode, errorThrown) 
      {  
      saveErrorList(pageName, buyerEmail, "GetDetailofbuyer()", errorThrown); 
      }  
    });
}

// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {

  // Create a schema to store picker properties, and set the properties.
  var schema = {};
  schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
  schema['SearchPrincipalSource'] = 15;
  schema['ResolvePrincipalSource'] = 15;
  schema['AllowMultipleValues'] = false;
  schema['MaximumEntitySuggestions'] = 50;
  schema['Width'] = 'inherit';
schema['MultiSelect'] = false;

  // Render and initialize the picker. 
  // Pass the ID of the DOM element that contains the picker, an array of initial
  // PickerEntity objects to set the picker value, and a schema that defines
  // picker properties.
  this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

// Query the picker for user information.
function getSelectedUserEmmail() {

  // Get the people picker object from the page.
  var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;

  // Get information about all users.
  var users = peoplePicker.GetAllUserInfo();
  var userEmails = [];
  userAccountName = [];
  userName = [];
  if(users.length > 1){

    //$('#peoplePickerDiv').after("<p style='color:red;'>You can only enter one name<p>");
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      for (var userProperty in user) { 
          //userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
          if(userProperty == "EntityData"){
            userEmails.push(user[userProperty].Email);
          }
          if(userProperty == "Description"){
            userAccountName.push(user[userProperty]);
          }
          if(userProperty == "DisplayText"){
            userName.push(user[userProperty]);
          } 
      }
  }
          
  }else{
      var user = users[0];
      for (var userProperty in user) { 
          if(userProperty == "EntityData"){
            userEmails.push(user[userProperty].Email);
          }
          if(userProperty == "Description"){
            userAccountName.push(user[userProperty]);
          }
          if(userProperty == "DisplayText"){
            userName.push(user[userProperty]);
          } 
      }
  }
  to = userEmails;
}

function getSelectedUserADDetails(selectedUserEmail)
{
debugger;
    var userBUHead = "";
    var lastName = "";
   
var URL1= _spPageContextInfo.webAbsoluteUrl +"/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v=%27"+selectedUserEmail+"%27";
    $.ajax({  
    url: URL1,
    async: false,  
    headers: { Accept: "application/json;odata=verbose" },  
    success: function (data) {
     debugger; 
        var properties = data.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) 
        {  
          var property = properties[i].Key;
          if(properties[i].Key=="WorkEmail" && (properties[i].Value != "" || properties[i].Value != null))
          {
            UserEmail = properties[i].Value;
          }
          
          if(properties[i].Key=="FirstName" && (properties[i].Value != "" || properties[i].Value != null))
          {
            firstName = properties[i].Value;
          }
          
          if(properties[i].Key=="LastName" && (properties[i].Value != "" || properties[i].Value != null))

          {
            lastName = properties[i].Value;
                      }
          
            if(properties[i].Key=="BUheadName" && (properties[i].Value != "" || properties[i].Value != null))

            {
            userBUHeadName = properties[i].Value;
          }
          
          if(properties[i].Key=="BUHeadEmail" && (properties[i].Value != "" || properties[i].Value != null))
          {
            userBUHeadEmail = properties[i].Value;						
          }
        }      
    },  
    error: function (jQxhr, errorCode, errorThrown) 
      {  
      saveErrorList(pageName, loggedInUserEmail, "GetDetailofLoggedInUser()", errorThrown); 
      }  
    });

}

function BindAgreementStatusDropdown() {
 $.ajax({ 
	  url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AgreementStatus')/items?$Select= Title &$orderby=Title",
	  	 type: "get",
	 headers: {"Accept": "application/json;odata=verbose"},
	 success: function (data) {
	 var values = [];
	 var uniqueValues = [];
	 var option = "";
	 var valuesArray = data.d.results; 
		 $.each(valuesArray ,function(i,result){
	 values.push(result.Title);
	  
	 }); 
	 $.each(values, function(i, el){
	 if($.inArray(el, uniqueValues) === -1) {
	 uniqueValues.push(el); 
	 option += "<option value='"+el+"'>"+el+"</option>"; 
	 }
	 });
	  //debugger;
	 $("#AgrStatus").append(option); 
	 },
	 error: function (data) {
	 alert(data.responseJSON.error);
	 }
	 });
}

function BindAgreementTypeDropdown() {
$.ajax({ 
	  url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AgreementType')/items?$Select=Title&$orderby=Title",
	  	 type: "get",
	 headers: {"Accept": "application/json;odata=verbose"},
	 success: function (data) {
	 var values = [];
	 var uniqueValues = [];
	 var option = "";
	 var valuesArray = data.d.results; 
		 $.each(valuesArray ,function(i,result){
	 values.push(result.Title);
	  
	 }); 
	 $.each(values, function(i, el){
	 if($.inArray(el, uniqueValues) === -1) {
	 uniqueValues.push(el); 
	 option += "<option value='"+el+"'>"+el+"</option>"; 
	 }
	 });
	  //debugger;
	 $("#AgrType").append(option); 
	 },
	 error: function (data) {
	 alert(data.responseJSON.error);
	 }
	 });
	}

function BindAgreementCategoryDropdown() {
  $.ajax({ 
	  url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AgreementCategory')/items?$Select=Title&$orderby=Title",
	  	 type: "get",
	 headers: {"Accept": "application/json;odata=verbose"},
	 success: function (data) {
	 var values = [];
	 var uniqueValues = [];
	 var option = "";
	 var valuesArray = data.d.results; 
		 $.each(valuesArray ,function(i,result){
	 values.push(result.Title);
	  
	 }); 
	 $.each(values, function(i, el){
	 if($.inArray(el, uniqueValues) === -1) {
	 uniqueValues.push(el); 
	 option += "<option value='"+el+"'>"+el+"</option>"; 
	 }
	 });
	  //debugger;
	 $("#AgrCategory").append(option); 
	 },
	 error: function (data) {
	 alert(data.responseJSON.error);
	 }
	 });
}  

function BindCurrencyDropdown() {
  $.ajax({ 
	  url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Currency')/items?$Select=Title&$orderby=Title",
	  	 type: "get",
	 headers: {"Accept": "application/json;odata=verbose"},
	 success: function (data) {
	 var values = [];
	 var uniqueValues = [];
	 var option = "";
	 var valuesArray = data.d.results; 
		 $.each(valuesArray ,function(i,result){
	 values.push(result.Title);
	  
	 }); 
	 $.each(values, function(i, el){
	 if($.inArray(el, uniqueValues) === -1) {
	 uniqueValues.push(el); 
	 option += "<option value='"+el+"'>"+el+"</option>"; 
	 }
	 });
	  //debugger;
	 $("#Currency").append(option); 
	 },
	 error: function (data) {
	 alert(data.responseJSON.error);
	 }
	 });
} 

function BindPaymentTermsDropdown() {
  $.ajax({ 
	  url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('PaymentTerms')/items?$Select=Title&$orderby=Title",
	  	 type: "get",
	 headers: {"Accept": "application/json;odata=verbose"},
	 success: function (data) {
	 var values = [];
	 var uniqueValues = [];
	 var option = "";
	 var valuesArray = data.d.results; 
		 $.each(valuesArray ,function(i,result){
	 values.push(result.Title);
	  
	 }); 
	 $.each(values, function(i, el){
	 if($.inArray(el, uniqueValues) === -1) {
	 uniqueValues.push(el); 
	 option += "<option value='"+el+"'>"+el+"</option>"; 
	 }
	 });
	  //debugger;
	 $("#txtPaymentTerm").append(option); 
	 },
	 error: function (data) {
	 alert(data.responseJSON.error);
	 }
	 });
} 

//to ensure users before sending mail to them.
function ensureUser(webUrl,loginName)
  {
     var payload = { 'logonName': loginName }; 
     return $.ajax({
        url: webUrl + "/_api/web/ensureuser",
        async: false,
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(payload),
        headers: {
           "X-RequestDigest": $("#__REQUESTDIGEST").val(),
           "accept": "application/json;odata=verbose"
        }
     });  
  }
  
//submit agreement details
  function submitAgreementDetails() {
          var item = {
                  "__metadata": {
                      "type": "SP.Data.AgreementDetailsListItem"
                  },
                  "Title": buyerName,
                  "BuyerEmail": buyerEmail.trim(), 
                  "AgStatus": $('#AgrStatus').val(),
                  "Agtype": $('#AgrType').val(),
                  "AgCategory": $('#AgrCategory').val(),
                  "AgNumber": $('#txtAgrNumber').val(),
                  "AgDate":  $('#txtAgrDate').val(),
                  "BusinessUnit":  $('#businessUnit').val(),
                  "ServiceDescription": $('#txtServiceDescription').val(),
                  "ServiceCategory":  $('#txtServiceCategory').val(),
                  "AgStartDate":  $('#txtAgrStartDate').val(),
                  "AgEndDate":  $('#txtAgrEndDate').val(),
                  "AgValue":  $('#txtAgrValue').val(),
                  "ServiceProvider":  $('#txtServiceProvider').val(),
                  "PaymentTerms":  $('#txtPaymentTerm').val(),
                   "Location":  $('#txtLocation').val(),
                  "UserName":  userName[0].trim(),
                  "UserEmail":  $('#txtUserEmail').val(),
                  "UserBUHeadName": userBUHeadName ,
                  "UserBUHeadEmail": userBUHeadEmail                 };    

              $.ajax({
                  url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AgreementDetails')/items",
                  type: "POST",
                  async: false,
                  contentType: "application/json;odata=verbose",
                  data: JSON.stringify(item),
                  headers: {
                      "Accept": "application/json;odata=verbose",
                      "X-RequestDigest": $("#__REQUESTDIGEST").val()
                  },
                  success: function(data) {
            var userFDBKIDId = data.d.ID;
            to = buyerEmail;
            body = "<p>Dear Regards,<br>Purchase Team</p>";
            subject = "Agreement Details Submitted";
            cc = UserEmail;
          sendEmail(from, to, cc, body, subject);
                     
                      brompt({
              title: 'Agreement Details submitted successfully!',
              type: 'success',
              okButtonText: 'OK',
              onConfirm: function(val){
                  window.location.href = "/sites/purchase/ContractProcessing/SitePages/AgreementDetails.aspx";
              }, 
          });   
                  },
                  error: function(data) {
                      saveErrorList(pageName, UserEmail, "savePurchaseDetails()", data.responseJSON.error.code);
                  }
              });     
      }

//send mail
	function sendEmail(from, to, cc, body, subject) {
	  	var appWebUrl = window.location.protocol + "//" + window.location.host 
	                + _spPageContextInfo.webServerRelativeUrl;
	    var hostUrl = _spPageContextInfo.siteAbsoluteUrl;
	    var constructedURL = appWebUrl + "/_api/SP.Utilities.Utility.SendEmail";         
	    var formDigest = document.getElementById("__REQUESTDIGEST").value;
	        $.ajax({
	            contentType: 'application/json',
	            url: constructedURL ,
	            async: false,
	            type: 'POST',
	            data: JSON.stringify({
	                'properties': {
	                    '__metadata': {
	                        'type': 'SP.Utilities.EmailProperties'
	                    },
	                    'From': from,
	                    'To': {
	                        'results': [to]
	                    },
	                    'CC': {
	                    	'results': [cc] 
	                    },
	                    'Subject': subject,
	                    'Body': body
	                }
	            }),
	            headers: {
	            	
	                "Accept": "application/json;odata=verbose",
	                "content-type": "application/json;odata=verbose",
	                "X-RequestDigest": formDigest
	            },
	            success: function(data) {
					console.log("mail sent");
	            },
	            error: function(err) {
					saveErrorList(pageName, loggedInUserEmail, "sendEmail()", err);
	            }
	        });
	        }    