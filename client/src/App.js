import React, { Component } from "react";
import NavigationBar from "./components/navigationBar";
import PostFrame from "./components/postFrame";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPostLink: "https://codetheweb.blog/style-a-navigation-bar-css/"
		};
	}

	handleClickedLink(link) {
		console.log(link);
		this.setState((state, props) => {
			return {
				currentPostLink: link
			};
		});
	}

	render() {
		return (
			<div>
				<NavigationBar onLinkClick={link => this.handleClickedLink(link)} />
				<PostFrame link={this.state.currentPostLink} />
			</div>
		);
	}
}

export default App;
