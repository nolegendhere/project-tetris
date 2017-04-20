
//Object that has all the different kind of bodies and colors that a piece can have
function ListData(options){
  //The initial row and column where the pieces will be spawned
  this.initialRegion = {
      row: options.initialRegionRow,
      column: options.initialRegionColumn
  };

  //the regions of the grid
  this.regions = options.regions;

  //the different colors of the pieces
  this.listOfColors = [
    'yellow','red','blue','grey','purple','orange','green'
  ];

  //the different kind of bodies available for the pieces - to a total of seven -
  this.listOfBodies= [
    //a body
    [
      //each body has 4 blocks. Each block has this properties: the row and column of the grid where it stands; the rotation block where to rotate the piece (it is an index that points to one of this blocks), a selector in order to move in the DOM the block in px using absolute position; the state erase, meaning that this block has to be erased; the state erased, meaning that this block has been erased; the state displacement, meaning the amount of rows that the block has to be desplaced after a row of blocks has been erased; the position in px using absolute position in the screen (actually, the position in px using absolute position inside the playboard of its player, which is in relative position); the number of the piece to whom this blocks belongs (just for debuggin porpuses)
      {row:this.initialRegion.row-1, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},

    ],

    //another body - to a total of seven -
    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},

    ],

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},

    ],

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},

    ],

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},
    ],

    [
      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column-2, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-2].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-2].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},
    ],

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},
    ]
  ];
}
