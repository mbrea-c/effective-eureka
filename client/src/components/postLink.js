import React, { Component } from "react";

class PostLink extends Component {
	render() {
		return (
			<li
				id="PostLink"
				onClick={() => {
					this.props.onLinkClick(this.props.link);
				}}
			>
				{this.props.title}
			</li>
		);
	}
}

export default PostLink;
