function dataOb(title){
	this.title=title;
}
var blankData=new dataOb('');
dataForF=[];
dataForF.push(new dataOb('alive'));
dataForF.push(new dataOb('dead'));
for (var i = 0; i < 17; i++) {
dataForF.push(new dataOb(i.toString()));	
};
var legendCenterificator=function(){
	$('legend').each(function(i){
		$(this).css('margin-left',($(this).closest('fieldset').width()-$(this).width())/2);
	})
}
// $('input').change(function(){
// 	$(this).siblings('span').html($(this).val());
// 	legendCenterificator();
// });

var create_fieldset=function(){
	for (var i = 0; i <dataForF.length; i++) {
	createFieldset(dataForF[i],i);
};
};
var createFieldset=function(da,i){
	var returning;
	returning='<fieldset class="fieldDefaultMode" id="fldset'+i+'">';
	returning+='<legend><span>'+da.title+'</span><input dataRel="title" type="text" value="'+da.title+'"/></legend>';
	returning+='<div class="buttonDiv"><button type="button" onclick="editFieldSet($(this),$(this).attr(\'state\'))" state="nonEdit">Edit</button>';
	returning+='<button type="button" onclick="cancelEdit($(this))" class="cancelButton">Cancel</button>';
	returning+='<button type="button" onclick="deleteThis($(this))" class="deleteButton">Delete</button><div>'
	returning+='<div style="clear:both"></div></fieldset>';
	//$('#fieldHolder').append(returning);
	$(returning).insertBefore('#addNewButton');
}
function editFieldSet(flSet,state){
	
	if(state=='nonEdit'){
		flSet.attr('state',"edit");
		flSet=flSet.closest('fieldset');
		flSet.removeClass();
		flSet.addClass('fieldEditMode');
		
	}
	if(state=='edit'){
		flSet.attr('state',"nonEdit");
		flSet=flSet.closest('fieldset');
		flSet.removeClass();
		flSet.addClass('fieldDefaultMode');
		editValues(flSet);
		legendCenterificator();
	}
};
function cancelEdit(flSet){
	//flSet.attr('state',"nonEdit");
	flSet=flSet.closest('fieldset');
	flSet.removeClass();
	flSet.addClass('fieldDefaultMode');
	cancelEditValues(flSet);
	flSet.find('button[state="edit"]').attr('state','nonEdit');
	//flSet.find('legend input').val(flSet.find('legend span').html());
	//editFieldSet(flSet.find('button[state="edit"]'),'edit');
};
function editValues(flSet){
	var id=flSet.attr('id');
	var data=dataForF[id.substring(6,7)];
	$(flSet).find('input').each(function(i){
		$(this).siblings('span').html($(this).val());
		data[$(this).dataRel]=$(this).val();
	})

}
function cancelEditValues(flSet){
		var id=flSet.attr('id');
	var data=dataForF[id.substring(6,7)];
	$(flSet).find('input').each(function(i){
		$(this).siblings('span').html(data[$(this).dataRel]);
		$(this).val(data[$(this).dataRel]);
	})

}
function deleteThis(flSet){
	flSet=flSet.closest('fieldset');
	var id=flSet.attr('id');
	dataForF[id.substring(6,7)]=blankData;
	flSet.remove();
	console.log('lola');
}

function addNewField(flSet){
	flSet=flSet.closest('fieldset');
	var data=new dataOb();
	$(flSet).find('input').each(function(i){
		data[$(this).attr('dataRel')]=$(this).val();
		$(this).val('');
	});
	dataForF.push(data);
	createFieldset(data,dataForF.length-1);
	$('#temp').hide();
	if(dataForF.length<20)
	$('#addNewButton').show();
	legendCenterificator();

}
function addNewCancel(flSet){
	flSet=flSet.closest('fieldset');
	$(flSet).find('input').each(function(i){
		$(this).val('');
	});
	$('#temp').hide();
	$('#addNewButton').show();
}

$(document).ready(function(){
	create_fieldset();
	legendCenterificator();
});

$('#searchInput').keyup(function(){
	if($('#searchInput').val().length>0){
	seacrhModeInit();
	}else{
	seacrhModeEnd();
	}
});

var createFieldsetSearch=function(da,i){
	var returning;
	returning='<fieldset class="fieldDefaultMode" id="fldset'+i+'">';
	returning+='<legend><span>'+da.title+'</span><input dataRel="title" type="text" value="'+da.title+'"/></legend>';
	returning+='<div class="buttonDiv"><button type="button" onclick="editFieldSet($(this),$(this).attr(\'state\'))" state="nonEdit">Edit</button>';
	returning+='<button type="button" onclick="cancelEdit($(this))" class="cancelButton">Cancel</button>';
	returning+='<button type="button" onclick="deleteThis($(this))" class="deleteButton">Delete</button><div>'
	returning+='<div style="clear:both"></div></fieldset>';
	//$('#fieldHolder').append(returning);
	$(returning).insertBefore('#addNewButton');
}
function seacrhModeInit(){
	$('.fieldDefaultMode').hide();
	$('#addNewButton').hide();
	$('.fieldEditMode').each(function(i){
		cancelEdit($(this).find('.cancelButton'));
	});
for (var i = 0; i <dataForF.length; i++) {
		if(dataForF[i].title.indexOf($('#searchInput').val())!=-1){
		$('#fldset'+i).show();
	}
};

//if(!$('#addNewButton').is(":visible"))	
}
function seacrhModeEnd(){
$('.fieldDefaultMode').show();
if(dataForF.length<20)
$('#addNewButton').show();
}


