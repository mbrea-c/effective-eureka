import React, { Component } from "react";

class PostLink extends Component {
	render() {
		return (
			<div
				id="PostLink"
				class={this.props.class}
				onClick={() => {
					this.props.onLinkClick(this.props.postData.link);
				}}
			>
				<label class="postNameLabel">{this.props.postData.name}</label>
				<br />
				<label class="postDateLabel">
					{new Date(this.props.postData.date_posted).toDateString()}
				</label>
			</div>
		);
	}
}

export default PostLink;
