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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";

class Page extends React.Component{
	constructor(props) {
		super(props);
		this.state = {title: 'Books'}
		this.addBook = this.addBook.bind(this);
	}
	addBook(e) {
		console.log(e)
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
					<AddBookButton addBook={ this.addBook }></AddBookButton>
					<BookList></BookList>
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

const modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

class AddBookButton extends React.Component{
	constructor(props) {
		super(props)
		this.state={
			open:false,
			title: '',
			author: '',
			description: '',
		}
	}
	handleOpen() {
		this.setState({
			open: true
		})	
	}
	handleClose() {
		this.setState({
			open: false
		})	
	}
	handleClick(e) {
		this.handleOpen()
	}

	handleTitleChange(e) {
		this.setState({
			title: e.target.value
		})
	}
	handleAuthorChange(e) {
		this.setState({
			author: e.target.value
		})
	}
	handleDescriptionChange(e) {
		this.setState({
			description: e.target.value
		})
	}
	addBook() {
		const book = new Book()
		book.title = this.state.title;
		book.author = this.state.author;
		book.description = this.state.description
		this.props.addBook(book);
		this.handleClose();
	}
	render() {
		return (
			<div>
				<Button size="small" onClick={(e) => this.handleClick(e)}>Add Book</Button>	
				<Dialog open={this.state.open}> 
					<DialogTitle>Add Book</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Add books here!
						</DialogContentText>
						<TextField
							required
							onChange={(e)=>this.handleTitleChange(e)}
							autofocus
							label="Title"
							margin="dense"
							id="title"
							fullWidth
							variant="standard"
						></TextField>

						<TextField
							required
							onChange={(e)=>this.handleAuthorChange(e)}
							autofocus
							label="Author"
							margin="dense"
							id="author"
							fullWidth
							variant="standard"
						></TextField>
						<TextField
							required
							onChange={(e)=>this.handleDescriptionChange(e)}
							autofocus
							label="description"
							margin="dense"
							id="description"
							fullWidth
							variant="standard"
						>
						</TextField>
					<div>{this.state.title}</div>
					<div>{this.state.author}</div>
					<div>{this.state.description}</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={()=>this.addBook()}>Add</Button>
						<Button onClick={()=>this.handleClose()}>Cancel</Button>
					</DialogActions>
					
				</Dialog>
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page></Page>);

