import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class RepList extends Component {
	onAddSales (id, sales) {
		console.log(this.props);
		this.props.mutate({
			variables: { id },
			//optimistic response
			optimisticResponse: {
				_typename: 'Mutation',
				addSalesToRep: {
					id,
					__typename: 'SalesRepType',
					sales: sales + 1,
				},
			},
		});
	}

	renderReps (props) {
		return this.props.reps.map(({ id, repName, sales }) => {
			return (
				<li key={id} className="collection-item">
					{repName}
					<div className="right-align">
						<span className="new badge" data-badge-caption="sales">
							{sales}
						</span>
						<i onClick={() => this.onAddSales(id, sales)} className="small material-icons">
							add_box
						</i>
					</div>
				</li>
			);
		});
	}

	render () {
		return (
			<div>
				<ul className="collection">{this.renderReps()}</ul>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSalesToRep($id: ID) {
		addSalesToRep(id: $id) {
			id
			sales
		}
	}
`;

export default graphql(mutation)(RepList);
