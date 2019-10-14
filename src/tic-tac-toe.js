class TicTacToe {

    constructor() {
		this.FIELD_SIZE = 3;
		this.CHAR_X = -1;
		this.CHAR_0 = 1;
		this.CHAR_NULL = 0;
		this.FIELD = [[0,0,0],[0,0,0],[0,0,0]];
		this.CURR_PLAYER_SYMBOL = -1;
    }

    trChar(p_char_code) {
    	let result = null;
    	if (p_char_code === this.CHAR_X)
    		result = "x"
    	else if (p_char_code === this.CHAR_0)
    		result = 'o'

    	return result;
    }

    getFieldValue(p_rowIndex, p_colIndex) {
    	return this.trChar(this.FIELD[p_rowIndex][p_colIndex]);

    }


    // return true or false
    checkDiags(pout_char) {
    	pout_char[0] = null;

    	let sum_d1 = 0;
    	let sum_d2 = 0;

    	let size = this.FIELD_SIZE;
    	for(let i = 0; i < size; ++i)
    	{
    		sum_d1 += this.FIELD[i][i];
    		sum_d2 += this.FIELD[size-i-1][i];
    	}

    	if (sum_d1 == -this.FIELD_SIZE)
    		pout_char[0] = this.CHAR_X;
        else if(sum_d1 == this.FIELD_SIZE)
    		pout_char[0] = this.CHAR_0;

    	// todo: refactor it! ;-)
    	if (pout_char[0] == null)
    	{
    	    	if (sum_d2 == -this.FIELD_SIZE)
    	    		pout_char[0] = this.CHAR_X;
                else if(sum_d2 == this.FIELD_SIZE)
    	    		pout_char[0] = this.CHAR_0;
    	}

    	// there is a winner! :-)
    	return (pout_char[0] !== null);
    }

    checkRows(pout_char) {
		pout_char[0] = null;

		for(let row_idx = 0; row_idx < this.FIELD_SIZE; ++row_idx)
		{
			let arr = this.FIELD[row_idx];
			let rowSum = arr => arr.reduce((a,b) => a + b, 0);

    	    if (rowSum(arr) === -this.FIELD_SIZE)
    	    	pout_char[0] = this.CHAR_X;
            else if(rowSum === this.FIELD_SIZE)
    	    	pout_char[0] = this.CHAR_0;

			if (pout_char[0] !== null)
				break;
		}

		return (pout_char[0] !== null); // there is a winner! :-)
    }

    checkCols(pout_char) {
		pout_char[0] = null;

		for(let col_idx = 0; col_idx < this.FIELD_SIZE; ++col_idx)
		{
			let colSum = 0;
			for (let row_idx = 0; row_idx < this.FIELD_SIZE; ++row_idx)
			{
				colSum += this.FIELD[row_idx][col_idx];
			}

    	    // some copy-paste ;-)
    	    if (colSum === -this.FIELD_SIZE)
    	    	pout_char[0] = this.CHAR_X;
            else if(colSum === this.FIELD_SIZE)
    	    	pout_char[0] = this.CHAR_0;

			if (pout_char[0] !== null)
				break;

		}

		return (pout_char[0] !== null); // there is a winner! :-)
    }


    getWinner() {
    	let c = [this.CHAR_NULL];

    	this.checkRows(c) || this.checkCols(c) || this.checkDiags(c);

    	return this.trChar(c[0]);

    }

    noMoreTurns() {
    	// noMoreTurns means that there are no empty cells
    	let out_NoEmptyCellsOnField = true;

    	// Let's find at least one $CHAR_NULL code! :-)
    	for(let rowIdx = 0; rowIdx < this.FIELD_SIZE; ++rowIdx)
    	{
    		let a = this.FIELD[rowIdx];
    		if (a.includes(this.CHAR_NULL))
    		{
    			out_NoEmptyCellsOnField = false;
    			break;
    		}
    	}
		return out_NoEmptyCellsOnField;
    }

    isDraw() {
		return (this.getWinner() === null) && this.noMoreTurns();
    }

    // class internals ;-)
    changePlayer() {
    	this.CURR_PLAYER_SYMBOL *= -1;
    }

    getCurrentPlayerSymbolCode() {
    	return this.CURR_PLAYER_SYMBOL;
    }

    getCurrentPlayerSymbol() {
		return this.trChar(this.getCurrentPlayerSymbolCode());
    }

    nextTurn(p_rowIndex, p_columnIndex) {
    	let i = p_rowIndex;
    	let j = p_columnIndex;
    	let isCellEmpty = (this.FIELD[i][j] === this.CHAR_NULL);
    	if (isCellEmpty)
    	{
    		this.FIELD[i][j] = this.getCurrentPlayerSymbolCode();
    		this.changePlayer();
    	}

    	console.log('nextTurn: [' + i + ' ' + j + ']');
    	console.log("this.getWinner: " + this.getWinner());

    }

    isFinished() {
		return (this.getWinner() !== null) || this.isDraw();
    }




}

module.exports = TicTacToe;
