import React from 'react'
import SocketIOClient from 'socket.io-client'
import {Button,FormControl,Grid,Row,Col,Thumbnail} from 'react-bootstrap';

class Home extends React.Component{
    
  constructor(props){
    super(props);    
    //Default State
    this.state={
      boards: [],
      titleNewBoard: null
    }
    this.socket = SocketIOClient('http://localhost:8000');
   
    //Event Listeners
    this.renderBoards = this.renderBoards.bind(this);
    this.initialize = this.initialize.bind(this);
    this.onClickAddBoard = this.onClickAddBoard.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.socket.on('getAllBoards',this.initialize);
    this.socket.on('addEmptyBoard', this.addBoard);
    this.socket.on('deleteBoard', this.deleteBoard);
    this.handleCardTitleInputChange = this.handleCardTitleInputChange.bind(this);
    
  }

  initialize(data){
      this.setState({boards:data})
  }

  render(){
    return(
        <div>
          <p style={{display: "inline-flex"}}><FormControl type="text" onChange={this.handleCardTitleInputChange} placeholder="Board Title" /></p>
          <Button bsStyle="success" className='addListButton' onClick={this.onClickAddBoard}>Add Board</Button>    
          <Grid>
            <Row>
            {this.renderBoards(this.state.boards)}
            </Row>
          </Grid>
        </div>
    )
  } 
  
  onClickAddBoard(){
    this.socket.emit("newBoard",this.state.titleNewBoard);
  }

  addBoard(id,t){
      this.setState(prevState=>({
        boards: prevState.boards.concat({
          id:id,
          title:t
        })
      }));
    }

  handleCardTitleInputChange(e) {  
    this.setState({titleNewBoard: e.target.value});
  }

  onClickDeleteBoard(id){
    this.socket.emit("deleteBoard",id);
    this.deleteBoard(id)
  }

  deleteBoard(id){
    this.setState(prevState=>({
      boards: prevState.boards.filter((item) => item._id !== id)
  }));
  }

  renderBoards(list){
    const boards=this.state.boards;
    const boardItems= boards.map((board, index)=>
      <Col key={index} xs={6} md={4}>
      <Button bsStyle="danger" onClick={() => this.onClickDeleteBoard(board._id)}>Delete Board</Button>
      <Thumbnail style={{background:"aliceblue"}} href={"/board/" + board._id}>
        <h3>{board.title || 'Undefined'}</h3>
        <p>Description</p>
       </Thumbnail>
    </Col>
    
    );
    return boardItems
  }
}


export default Home