import * as React from 'react';
//const ReactTags = require('react-tag-input').WithOutContext;
//import { WithContext as ReactTags } from 'react-tag-input';
import { WithOutContext as ReactTags } from 'react-tag-input';

interface Tag {
	id: number;
	text: string;
}

interface State {
	tags: Tag[];
}

export default class Tags extends React.Component<any, any> {
	state: State;
	constructor(props) {
		super(props);
		let tags = props.value ? props.value : [];
		this.state = { tags: [] };
		for (let i = 0; i < tags.length; i++) {
			let tag = tags[i];
			this.state.tags.push({ id: i, text: tag });
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		this.notifyChange = this.notifyChange.bind(this);
	}

	notifyChange() {
		let tags = this.state.tags;
		let array: string[] = [];
		for (let j = 0; j < tags.length; j++) {
			let t = tags[j];
			array.push(t.text);
		}
		this.props.onChange(array);
	}

	handleDelete(i) {
		let tags = this.state.tags;
		tags.splice(i, 1);
		this.setState({tags: tags});
		this.notifyChange();
	}

	handleAddition(tag) {
		let tags = this.state.tags;
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		this.setState({tags: tags});
		this.notifyChange();
	}

	handleDrag(tag, currPos, newPos) {
		let tags = this.state.tags;

		// mutate array
		tags.splice(currPos, 1);
		tags.splice(newPos, 0, tag);

		// re-render
		this.setState({ tags: tags });
		this.notifyChange();
	}

	render() {
		const { tags } = this.state;
		return (
			<div>
				<ReactTags tags={tags}
									 suggestions={[]}
									 handleDelete={this.handleDelete}
									 handleAddition={this.handleAddition}
									 handleDrag={this.handleDrag} />
			</div>
		)
	}
};
