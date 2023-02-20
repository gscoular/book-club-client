import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


class Page extends React.Component{
	constructor() {
		this.props.title = 'Books'
	}
	render() {
		<Box>
			<AppBar>
				<Typography>{ title }</Typography>
			</AppBar>
		</Box>
	}
}

class BookInfo extends React.Component{	

	render(props) {
		return (
			<div className="book-info">
				<div>Hello world</div>
				<h1 class="title">{this.props.book.title}</h1>
				<div class="author">{this.props.book.author}</div>
				<div class="description">
					{this.props.book.description}	
				</div>
			</div>
		);
	}
	
}


class BookList extends React.Component{
	constructor() {
		super();
		this.bookService = new BookService();
	}

	renderBook(b) {	
		return (
			<BookInfo book={b}> </BookInfo>
		)
	}
	render() {
		const res = this.bookService.search('', '', 10);
		const books = res.data;
		const rows = [];
		for (const b of books) {
			rows.push(this.renderBook(b));

		}
		return (
			<div>
				{ rows }
			</div>
		)
	}
}

class Book {
	title: string;
	author: string;
	description: string;
}

class BookService {
	search(term, cursor, limit=0) {
		return {
			data: [
				{
					title: "The Great Gatsby",
					author: "F. Scott Fitzgerald",
					description: "Some people that are rich have a laugh"
				},
				{
					title: "Cat's Cradle",
					author: "Vonnegut, Kurt",
					description: "See the cat? See the cradle?"
				}
			],
			cursor: ""
		}
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page></Page>);

