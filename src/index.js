import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

class Page extends React.Component{
	constructor(props) {
		super(props);
		this.state = {title: 'Books'}
	}
	render() {
		return (
			<Box>
				<Box>
					<AppBar color="primary"> 
						<Toolbar>
							<Typography>{ this.state.title }</Typography>
						</Toolbar>
					</AppBar>
				</Box>
				<Box>
					<Toolbar />
					<BookList></BookList>i
				</Box>
			</Box>


		)
	}
}

class BookInfo extends React.Component{	

	render(props) {
		return (
			<Card variant="outlined" sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography class="title">{this.props.book.title} </Typography>
					<Typography class="author">{this.props.book.author}</Typography>
					<Typography class="description">{this.props.book.description}</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>

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

