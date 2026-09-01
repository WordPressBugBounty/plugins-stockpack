<script type="text/html" id="tmpl-stockpack-attachment-details">
<h2>
	<?php _e( 'Image Details', 'stockpack' ); ?> <span class="settings-save-status">
				<span class="spinner"></span>
				<span class="saved"><?php _e( 'Saved.', 'stockpack' ); ?></span>
			</span>
</h2>
<div class="attachment-info">
	<div class="thumbnail thumbnail-{{ data.type }}">
		<# if ( data.uploading ) { #>
		<div class="media-progress-bar">
			<div></div>
		</div>
		<# } else if ( data.sizes ) { #>
		<img src="{{ data.sizes.full.url }}" draggable="false" alt=""/>
		<# } #>
	</div>
	<div class="details">
		<div class="description">{{ data.description }}</div>
		<div class="caption">{{{ data.caption }}}</div>
	</div>
</div>
</script>