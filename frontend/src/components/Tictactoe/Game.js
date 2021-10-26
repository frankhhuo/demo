import React from 'react';
import './game.css';
import NumericInput from 'react-numeric-input';
import Modal from './Modal';
function Square(props){

    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


let calculateWinner = (squares)=>{
        
    let Winner = null;
    for(let i =0; i<3;i++){
        let sq = [...new Set(squares.slice(i,i+3))];
        if ((sq.length ===1)&(sq[0])){
            Winner = sq[0];
        }
    }
    for(let j =0; j<3;j++){
        let sq = [...new Set(squares.filter( (e,i)=>(i%3===j)))];
        if ((sq.length === 1)&&sq[0]){
            Winner = sq[0];
        }
    }

    var sq = [...new Set([squares[0],squares[4],squares[8]])];
    if ((sq.length===1)&&(sq[0])){
        Winner = sq[0];
    }
    sq = [...new Set([squares[2],squares[4],squares[6]])];
    if ((sq.length===1)&&(sq[0])){
        Winner=sq[0];
    }
    
    return Winner;
}


class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            xIsNext: true,
            squares: Array(9).fill(null)
        };
    }

 



    renderSquare = (i)=>{
        return <Square value={this.props.squares[i]} onClick={()=>this.props.handleClick(i)}/>;
    };


    render(){

        return (
            <>
            <Modal></Modal>
            <div>

                <div className="board">
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className = "board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>



            </div>
            </>
        );
    }
}
export default class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history:[{squares:Array(9).fill(null)}],
            xIsNext: true,
            stepNumber:0,
        }
    }

    handleClick=(i)=>{
        const history =  this.state.history.slice(0, this.state.stepNumber + 1);
 
        const current = history[this.state.stepNumber]; 
        const squares = current.squares.slice();
 
        if( calculateWinner(squares)||squares[i]){return;}
        squares[i] = this.state.xIsNext? 'X':'O';
 
        
        this.setState({
            history:history.concat([{squares:squares,}]),
            xIsNext:!this.state.xIsNext,
            stepNumber:history.length,
        });
    }

    jumpTo(step) {
        this.setState({
          history: this.state.history.slice(0,step+1),
          stepNumber: parseInt(step),
          xIsNext: (step % 2) === 0,
        });
      }

    render(){

        const history = this.state.history;

        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const finished = current.squares.every(e=>e!==null);
        
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        let status;
        if (winner) {
          status = 'Winner: ' + winner;

        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
          if(finished){status="It is a tie!"};
        }

        return (<div className='game'>  
            <div className='game-board'> 
                <Board 
                    squares={current.squares}
                    handleClick = {(i)=>this.handleClick(i)}
                /> 
                <div>
                    <button onClick={()=>this.setState({ 
                            history:[{squares:Array(9).fill(null)}],
                            xIsNext: true,
                            stepNumber:0, })
                            } >
                        Restart
                    </button>
                </div>
            </div>
            <div className ="game-info">
                <div>
                    {status} 
                </div>
                <div>
                    Max step: { this.state.stepNumber + 1}
                </div>
                <div>
                    Move to Step 
                    <NumericInput id="step" min={0} max={this.state.stepNumber}  defaultValue="0" /> 
                    <button onClick={(e)=>{let step = document.getElementById('step').value;  ;this.jumpTo(step);}}>Go</button>
                </div>
            </div>
        
        </div>);
    }

}