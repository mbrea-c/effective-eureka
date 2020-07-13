import React, { Component } from "react";
import NavigationBar from "./components/navigationBar";
import PostFrame from "./components/postFrame";
import TitleBar from "./components/titleBar";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPostLink: ""
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
				<TitleBar />
				<NavigationBar
					onLinkClick={link => this.handleClickedLink(link)}
					activeLink={this.state.currentPostLink}
				/>
				<PostFrame link={this.state.currentPostLink} />
			</div>
		);
	}
}

export default App;
