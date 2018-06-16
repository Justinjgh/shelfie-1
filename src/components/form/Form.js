import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.currentProduct.name,
			price: this.props.currentProduct.price,
			image_url: this.props.currentProduct.image_url,
			currentId: this.props.currentProduct.product_id
		};
	}
	componentDidUpdate(props) {
		if (props.currentProduct === this.props.currentProduct) {
		} else
			this.setState({
				currentId: this.props.currentProduct.product_id,
				name: this.props.currentProduct.name,
				price: this.props.currentProduct.price,
				image_url: this.props.currentProduct.image_url
			});
	}
	handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}
	clearInput() {
		this.setState(
			{
				name: this.props.currentProduct.name,
			    price: this.props.currentProduct.price,
			    image_url: this.props.currentProduct.image_url,
			    currentId: this.props.currentProduct.product_id
			},
			this.props.updatedProduct()
		);
	}
	addItem() {
		const newItem = {
			name: this.state.name,
			price: this.state.price,
			image_url: this.state.image_url
		};

		axios.post('/api/inventory', newItem).then(() => {
			this.props.getItemList();
			this.clearInput();
		});
	}
	updateItem() {
		const editedItem = {
			name: this.state.name,
			price: this.state.price,
			image_url: this.state.image_url
		};

		axios.patch('/api/inventory/' + this.state.currentId, editedItem).then(() => {
			this.props.getItemList();
			this.clearInput();
		});
	}
	render() {
		const addOrUpdate = this.state.currentId ? (
			<button onClick={() => this.updateItem()}>Save Changes</button>
		) : (
			<button onClick={() => this.addItem()}>Add to inventory</button>
		);
		return (
			<div className="form">
				<img
					className="image-preview"
					src={
						this.state.image_url === '' ? (
							'http://experienceidyllwild.com/images/no-image-available2.jpg'
						) : (
							this.state.image_url
						)
					}
					alt={this.state.name}
				/>
				<div className="form-inputs">
					<p className="input-label">Image URL:</p>
					<input value={this.state.image_url} onChange={(e) => this.handleChange(e, 'image_url')} />
					<p className="input-label">Product Name:</p>
					<input value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} />
					<p className="input-label">Price:</p>
					<input value={this.state.price} onChange={(e) => this.handleChange(e, 'price')} />
					<div className="form-buttons-container">
						<Link to="/">
							<button onClick={() => this.clearInput()}>Cancel</button>{' '}
						</Link>
						<Link to="/">{addOrUpdate}</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default Form;
