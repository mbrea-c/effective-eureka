import React, { Component } from "react";

class PostLink extends Component {
	render() {
		return (
			<div
				id="PostLink"
				class={this.props.class}
				onClick={() => {
					this.props.onLinkClick(this.props.link);
				}}
			>
				{this.props.title}
			</div>
		);
	}
}

export default PostLink;
