import React, { Component } from 'react';
import Product from '../product/Product';
import './dashboard.css';

class Dashboard extends Component {
	render() {
		const list = this.props.inventoryList.map((product, index) => {
			return (
				<Product
					editProduct={this.props.editProduct}
					getItemList={this.props.getItemList}
					currentProduct={product}
					key={index}
				/>
			);
		});
		return <div>{list}</div>;
	}
}
export default Dashboard;
