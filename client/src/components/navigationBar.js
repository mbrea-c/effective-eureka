import React, { Component } from "react";
import PostLink from "./postLink";

class NavigationBar extends Component {
	fetchPostIndex() {
		fetch("http://localhost:3000/getposts")
			.then(response => response.json())
			.then(response =>
				this.setState({
					data: response.sort((a, b) => {
						// Sort posts by date (newest first)
						let da = new Date(a.date_posted);
						let db = new Date(b.date_posted);

						return da > db ? -1 : 1;
					})
				})
			);
	}

	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.fetchPostIndex();
	}

	onRefreshClick() {
		fetch("http://localhost:3000/compile").then(response => {
			this.fetchPostIndex();
		});
	}

	render() {
		return (
			<div id="NavigationBar">
				<h2>Posts</h2>
				<hr />
				{this.state.data.map(row => (
					<PostLink
						class={this.props.activeLink == row.link ? "active" : "inactive"}
						postData={row}
						key={row.id}
						onLinkClick={link => {
							this.props.onLinkClick(link);
						}}
					/>
				))}
				<hr />
				<button onClick={() => this.onRefreshClick()}>&#xe5d5;</button>
			</div>
		);
	}
}

export default NavigationBar;
