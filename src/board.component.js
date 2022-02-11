import React from 'react';
import { Square } from './square.component'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i])
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ squares: squares, xIsNext: !this.state.xIsNext })
    }

    clearData(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true
        })
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => { this.handleClick(i) }} />;
    }

    render() {
        const winner = calculateWinner(this.state.squares)
        let status;
        if (winner) {
            status = 'El ganador es: ' + winner;
        } else {
            status = 'Es el turno del jugador: ' + (this.state.xIsNext ? 'Player 1 (X)' : 'Player 2 (O)');
        }

        return (
            <div>
                <div className="status"><h1>{status}</h1></div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div>
                    <button className='reload-button' onClick={()=>{this.clearData()}}>
                        Reiniciar
                    </button>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a] === 'X' ? 'Player 1 (X)' : 'Player 2 (O)';
        }
    }
    return null;
}

export { Board }    