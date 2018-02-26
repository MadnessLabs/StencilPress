<?php

class Widget_ContactForm extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		$widget_ops = array( 
			'classname' => 'widget_contact-form',
            'description' => 'The contact form',
            'customize_selective_refresh' => true,
		);
		parent::__construct( 'widget_contact-form', 'Contact Form', $widget_ops );
	}

	public function widget( $args, $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : __( 'Contact Form' );
		$apiHost = ! empty( $instance['apiHost'] ) ? $instance['apiHost'] : '';
		$apiKey = ! empty( $instance['apiKey']) ? $instance['apiKey'] : '';
		$successMessage = ! empty( $instance['successMessage']) ? $instance['successMessage'] : '';

		echo '<ft-contact-form title="'.$title.'" api-key="'.$apiKey.'" api-host="'.$apiHost.'" success-message="'.$successMessage.'"></ft-contact-form>';
		echo $args['after_widget'];
	}

	/**
	 * Handles updating settings for the current Pages widget instance.
	 *
	 * @since 2.8.0
	 *
	 * @param array $new_instance New settings for this instance as input by the user via
	 *                            WP_Widget::form().
	 * @param array $old_instance Old settings for this instance.
	 * @return array Updated settings to save.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = sanitize_text_field( $new_instance['title'] );
		$instance['apiHost'] = sanitize_text_field( $new_instance['apiHost'] );
		$instance['apiKey'] = sanitize_text_field( $new_instance['apiKey'] );
		$instance['successMessage'] = sanitize_text_field( $new_instance['successMessage'] );

		return $instance;
	}

	/**
	 * Outputs the settings form for the Pages widget.
	 *
	 * @since 2.8.0
	 *
	 * @param array $instance Current settings.
	 */
	public function form( $instance ) {
		//Defaults
		$instance = wp_parse_args( (array) $instance, array('title' => '', 'apiHost' => '', 'apiKey' => '', 'successMessage' => '') );
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title:' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id('title') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'apiHost' ) ); ?>"><?php _e( 'API Host:' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id('apiHost') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'apiHost' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['apiHost'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'apiKey' ) ); ?>"><?php _e( 'API Key:' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id('apiKey') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'apiKey' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['apiKey'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'successMessage' ) ); ?>"><?php _e( 'Success Message:' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id('successMessage') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'successMessage' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['successMessage'] ); ?>" />
		</p>
		<?php
	}
}