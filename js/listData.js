function ListData(options){

  this.initialRegion = {
      row: options.initialRegionRow,
      column: options.initialRegionColumn
  };

  this.regions = options.regions;

  this.listOfColors = [
    'yellow','red','blue','grey','purple','orange','green'
  ];

  this.listOfBodies= [
    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}, pieceNumber: -1},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}, pieceNumber: -1},

    ],

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
