CKEDITOR.dialog.add( 'fontawesome', function( editor ) {	var dialog,		lang = editor.lang.fontawesome;	var onChoice = function( evt ) {			var target, value;			if ( evt.data )				target = evt.data.getTarget();			else				target = new CKEDITOR.dom.element( evt );			if ( target.getName() == 'a' && ( value = target.getChild( 0 ).getFirst().getAttribute('class') ) ) {				target.removeClass( "cke_light_background" );				dialog.hide();				var icon = editor.document.createElement( 'i' );				icon.addClass( value );				editor.insertElement( icon );			}		};	var onClick = CKEDITOR.tools.addFunction( onChoice );	var focusedNode;	var onFocus = function( evt, target ) {			var value;			target = target || evt.data.getTarget();			if ( target.getName() == 'span' )				target = target.getParent();			if ( target.getName() == 'i' )				target = target.getParent().getParent();			if ( target.getName() == 'a' && ( value = target.getChild( 0 ).getFirst().getAttribute('class') ) ) {				// Trigger blur manually if there is focused node.				if ( focusedNode )					onBlur( null, focusedNode );				dialog.getContentElement( 'info', 'iconPreview' ).getElement().setHtml( '<i class="' + value + ' icon-4x"></i>' );				target.getParent().addClass( "cke_light_background" );				// Memorize focused node.				focusedNode = target;			}		};	var onBlur = function( evt, target ) {			target = target || evt.data.getTarget();			if ( target.getName() == 'span' )				target = target.getParent();			if ( target.getName() == 'i' )				target = target.getParent().getParent();			if ( target.getName() == 'a' ) {				dialog.getContentElement( 'info', 'iconPreview' ).getElement().setHtml( '&nbsp;' );				target.getParent().removeClass( "cke_light_background" );				focusedNode = undefined;			}		};	return {		title: lang.title,		minWidth: 430,		minHeight: 280,		buttons: [ CKEDITOR.dialog.cancelButton ],		iconsColumns: 25,		onLoad: function() {			var columns = this.definition.iconsColumns,				icons = editor.config.fontawesomeIcons;			var iconsTableLabel = CKEDITOR.tools.getNextId() + '_fontawesome_table_label';			var html = [ '<table role="listbox" aria-labelledby="' + iconsTableLabel + '"' +				' style="width: 320px; height: 100%; border-collapse: separate;"' +				' align="center" cellspacing="2" cellpadding="2" border="0">' ];			var i = 0,				size = icons.length,				icon;			while ( i < size ) {				html.push( '<tr role="presentation">' );				for ( var j = 0; j < columns; j++, i++ ) {					if ( ( icon = icons[ i ] ) ) {						var iconLabelId = 'cke_fontawesome_label_' + i + '_' + CKEDITOR.tools.getNextNumber();						html.push( '<td class="cke_dark_background" style="cursor: default" role="presentation">' +							'<a href="javascript: void(0);" role="option"' +							' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + size + '"', ' aria-labelledby="' + iconLabelId + '"', ' class="cke_fontawesome_icon" title="', CKEDITOR.tools.htmlEncode( icon ), '"' +							' onclick="CKEDITOR.tools.callFunction(' + onClick + ', this); return false;"' +							' tabindex="-1">' +							'<span style="margin: 0 auto;cursor: inherit">' +							'<i class="' + icon + '"></i>' +							'</span>' +							'<span class="cke_voice_label" id="' + iconLabelId + '">' +							icon +							'</span></a>' );					} else						html.push( '<td class="cke_dark_background">&nbsp;' );					html.push( '</td>' );				}				html.push( '</tr>' );			}			html.push( '</tbody></table>', '<span id="' + iconsTableLabel + '" class="cke_voice_label">' + lang.options + '</span>' );			this.getContentElement( 'info', 'iconContainer' ).getElement().setHtml( html.join( '' ) );		},		contents: [			{			id: 'info',			label: editor.lang.common.generalTab,			title: editor.lang.common.generalTab,			padding: 0,			align: 'top',			elements: [				{				type: 'hbox',				align: 'top',				widths: [ '320px', '90px' ],				children: [					{					type: 'html',					id: 'iconContainer',					html: '',					onMouseover: onFocus,					onMouseout: onBlur,					focus: function() {						var firstIcon = this.getElement().getElementsByTag( 'a' ).getItem( 0 );						setTimeout( function() {							firstIcon.focus();							onFocus( null, firstIcon );						}, 0 );					},					onShow: function() {						var firstIcon = this.getElement().getChild( [ 0, 0, 0, 0, 0 ] );						setTimeout( function() {							firstIcon.focus();							onFocus( null, firstIcon );						}, 0 );					},					onLoad: function( event ) {						dialog = event.sender;					}				},					{					type: 'hbox',					align: 'top',					widths: [ '100%' ],					children: [						{						type: 'vbox',						align: 'top',						children: [							{							type: 'html',							html: '<div></div>'						},							{							type: 'html',							id: 'iconPreview',							className: 'cke_dark_background',							style: 'border:1px solid #eeeeee;height:70px;width:70px;padding-top:9px;text-align:center;',							html: '<div>&nbsp;</div>'						}						]					}					]				}				]			}			]		}		]	};});