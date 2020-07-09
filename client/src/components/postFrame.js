import React, { Component } from "react";

class PostFrame extends Component {
	render() {
		return <iframe id="PostFrame" src={this.props.link}></iframe>;
	}
}

export default PostFrame;
