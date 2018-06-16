import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Form from './components/form/Form';
import Header from './components/header/Header';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
	constructor() {
		super();
		this.state = {
			inventoryList: [],
			currentProduct: {
				name: '',
				price: 0,
				image_url: '',
				product_id: null
			}
		};
	}
	componentWillMount() {
		this.getItemList();
	}
	getItemList() {
		axios.get('/api/inventory').then((response) => {
			this.setState({ inventoryList: response.data });
		});
	}
	editProduct = (url, n, p, id) => {
		this.setState({
			currentProduct: {
				image_url: url,
				name: n,
				price: p,
				product_id: id
			}
		});
	};
	updatedProduct = () => {
		this.setState({
			currentProduct: {
				name: '',
				price: 0,
				image_url: '',
				product_id: null
			}
		});
	};
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<div className="body-content">
						<Switch>
							<Route
								exact
								path="/"
								component={(props) => (
									<Dashboard
										{...props}
										inventoryList={this.state.inventoryList}
										getItemList={() => this.getItemList()}
										editProduct={this.editProduct}
									/>
								)}
							/>
							<Route
								path="/new-product-form"
								render={(props) => (
									<Form
										{...props}
										getItemList={() => this.getItemList()}
										currentProduct={this.state.currentProduct}
										updatedProduct={() => this.updatedProduct()}
									/>
								)}
							/>
							<Route
								path="/edit-product-form"
								render={(props) => (
									<Form
										{...props}
										getItemList={() => this.getItemList()}
										currentProduct={this.state.currentProduct}
										updatedProduct={() => this.updatedProduct()}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
