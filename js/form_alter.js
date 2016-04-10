jQuery(document).ready(function($){
  // ACTION: Initialize dialog form as jQuery dialog box.
  if (typeof jQuery.ui !== 'undefined' && $('#embedded-help-add-tag-form').length > 0) {
    var addTagForm = $('#embedded-help-add-tag-form').dialog({
    	title:'Modify Help Tag',
    	autoOpen: false,
    	resizable: false,
    	width: '400px',
    	buttons:{
    	  'OK': function() {
    		  $('#edit-help-tag-submit').trigger('click');
    	  },
        'Delete': function() {
          if (confirm('Yeah? You sure?')) {
            $('#embedded-help-add-tag-form input[name="help_tag_delete"]').val('true');
            $('#edit-help-tag-submit').trigger('click');
          }
        },
    	  'Cancel': function() {
    		  $(this).dialog('close');
    	  }
    	}
    });
  }
  
  
  $('form').each(function(){
	if( $(this).hasClass('embedded-help-modifiable') ){
	  // ACTION: Create form-level "Modify Help Tags" link:
	  var thisForm = $(this).attr('id');
	  var formInsert = $('<div>', {
		  id: thisForm + '-modify-embedded-help',
		  //class: 'embedded-help-show-links',
		  targetform: thisForm,
		  html: 'Modify Help Tags'
		});
      formInsert.addClass('embedded-help-show-links');
	  $(this).prepend(formInsert);
	  // ACTION: Create field-level "Add Help Tag" links:
	  $('#' + thisForm + '.embedded-help .form-item').each(function(){
		var formField = $('input, select, textarea',this);
		var formFieldId = formField.attr('id');
		var thisInsert = $('<div>', {
		  id: formFieldId + '-help-tag-insert',
		  //class: 'embedded-help-insert',
		  targetform: thisForm,
		  targetfield: formFieldId,
		  html: 'Add Help Tag'
		});
        thisInsert.addClass('embedded-help-insert');
		var thisTag = $('<div>', {
		  id: formFieldId + '-help-tag',
		  //class: 'embedded-help-tag embedded-help-hidden',
		  targetform: thisForm,
		  targetfield: formFieldId,
		  html: ''
		});
        thisTag.addClass('embedded-help-tag embedded-help-hidden');
		$(this).prepend(thisInsert);
		$(this).prepend(thisTag);
	  }) // END: Each loop for form items
	} // ENDIF
	
	// ACTION: Get this form's JSON data from page and use it to create 
	// existing help tags:
	var helpTagJson = $('input[name="embedded_help_data"]', this).attr('value');
	var helpTagData = $.parseJSON(helpTagJson);
	for(var helpTagKey in helpTagData){
	  var helpTag = helpTagData[helpTagKey];
	  var fieldName = '#' + helpTag.field_name + '-help-tag';
	  var title = $('<div>', {
		//class: 'embedded-help-tag-title',
		html: helpTag.title
	  }).appendTo(fieldName);
      title.addClass('embedded-help-tag-title');
	  var text = $('<div>', {
		//class: 'embedded-help-tag-text',
		html: helpTag.text
	  }).appendTo(fieldName);
      text.addClass('embedded-help-tag-text');
	  $(fieldName).attr('message_type', helpTag.message_type);
	  $(fieldName).attr('display_style', helpTag.display_style);
	  $(fieldName).addClass('embedded-help-message-type-' + helpTag.message_type + ' eh-icon-' + helpTag.message_type + ' embedded-help-display-style-' + helpTag.display_style);
	  $(fieldName).removeClass('embedded-help-hidden');
	  $(fieldName+'-insert').html('Edit Help Tag');
	  
	  if(helpTag.display_style === 'icon'){
		$(fieldName).toggle(
		  function(){
			  $(this).css({
          'width':'100%'
        });
        var divs = $('div', this);
        setTimeout(function(){
          divs.css('maxHeight', '2000px');
        }, 200);
        $(this).toggleClass('expanded');
		  },
		  function(){
        yeahthis = $(this);
        var divs = $('div', this);
        divs.css('maxHeight', '0px');
        setTimeout(function(){
          yeahthis.css({
            'width':'20px'
          });  
        }, 280);
        $(this).toggleClass('expanded');
		  }
		)
	  }
	}
	
  }) // END: Each loop for each form
  
  $('.embedded-help-show-links').click(function(){
  	var targetForm = $(this).attr('targetform');
  	$('#' + targetForm + ' .embedded-help-insert').toggle(500);
    })
    
    // ACTION: Setup & Display dialog box:
    $('.embedded-help-insert').click(function(){
  	//var fieldId = $(this).attr('id');
  	var targetField = $(this).attr('targetfield');
  	var targetForm = $(this).attr('targetform');
  	var currentTag = $('#' + targetForm + ' #' + targetField + '-help-tag');
  	var currentTitle = $('.embedded-help-tag-title', currentTag).html();
  	var currentText = $('.embedded-help-tag-text', currentTag).html();
      if ( currentText == null) { 
        currentText = '';
        $('.ui-dialog[aria-labelledby="ui-dialog-title-embedded-help-add-tag-form"] .ui-dialog-buttonset button:nth-child(2)').hide();
        console.log('hey');
      } else {
        $('.ui-dialog[aria-labelledby="ui-dialog-title-embedded-help-add-tag-form"] .ui-dialog-buttonset button:nth-child(2)').show();
      }
      currentText = currentText.replace(/&amp;/g,'&');
      currentText = currentText.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
      currentText = currentText.replace(/<br>|<br \/>|<br\/>/g, '');
  	var currentMessageType = currentTag.attr('message_type');
  	var currentDisplayStyle = currentTag.attr('display_style');
  	//var currentMessageType = $('.embedded-help-message-type', currentTag);
  	//var currentDisplayStyle = $('.embedded-help-tag-title', currentTag);
  	$('#embedded-help-add-tag-form input[name="help_tag_title"]').val(currentTitle);
  	$('#embedded-help-add-tag-form textarea[name="help_tag_text"]').val(currentText);
  	$('#embedded-help-add-tag-form select[name="help_tag_message_type"]').val(currentMessageType);
  	$('#embedded-help-add-tag-form select[name="help_tag_display_style"]').val(currentDisplayStyle);
  	$('#embedded-help-add-tag-form input[name="help_tag_target_form"]').val(targetForm);
  	$('#embedded-help-add-tag-form input[name="help_tag_target_field"]').val(targetField);

    messageType = $('#embedded-help-add-tag-form select[name="help_tag_message_type"]');
    messageType.hide();

    if ( $('.embedded-help-icon-chooser').length == 0 ) {
      var iconOptions = $('<div />').addClass('embedded-help-icon-chooser').appendTo( $('#embedded-help-add-tag-form .form-item.form-item-help-tag-message-type') );
      $('option', messageType).each(function(){
        var thisValue = $(this).val();
        var thisIconOption = $('<div />').addClass('embedded-help-icon-option eh-icon-'+thisValue).appendTo(iconOptions);
        if (thisValue == currentMessageType) {
          thisIconOption.addClass('active');
        }
        thisIconOption.click(function() {
          $('.embedded-help-icon-option').removeClass('active');
          $(this).addClass('active');
          messageType.val(thisValue);
        });
      });
    } else {
      $('.embedded-help-icon-option').removeClass('active');
      $('.embedded-help-icon-option.eh-icon-' + currentMessageType).addClass('active');
    }

  	addTagForm.dialog('open');
  }) // END: Click function
  
  // ACTION: Style "Expandable teaser" display
  var teaserTags = $(".embedded-help-display-style-teaser");
  var moreButton = $('<div>', {
          html: '... read more'
        }).appendTo(teaserTags);
  moreButton.addClass('embedded-help-more-button');
  moreButton.click(function(){
    $(this).parent().toggleClass('embedded-help-display-style-teaser-expanded', 300);
  })
})