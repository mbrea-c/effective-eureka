import React, { Component } from "react";
import PostLink from "./postLink";

class NavigationBar extends Component {
	render() {
		return (
			<ul id="NavigationBar">
				<PostLink
					title="Day 1"
					link="https://iframetester.com"
					onLinkClick={link => {
						this.props.onLinkClick(link);
					}}
				/>
				<PostLink
					title="Day 2"
					link="https://codetheweb.blog/style-a-navigation-bar-css/"
					onLinkClick={link => {
						this.props.onLinkClick(link);
					}}
				/>
			</ul>
		);
	}
}

export default NavigationBar;
