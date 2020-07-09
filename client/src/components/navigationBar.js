import React, { Component } from "react";
import PostLink from "./postLink";

class NavigationBar extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: []
		};
		fetch("http://localhost:3000/")
           .then((response)=>this.setState({data: response}))
	}

	render() {
		return (
			<ul id="NavigationBar">
				{this.state.data.map( row => <PostLink 
					title={row.name}
					link={row.link}
					onLinkClick={link => {
						this.props.onLinkClick(link);
					}}
					/>)
				}

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
