//object that represents the regions created into the grid
function Region(options){
    //parameters to calculated the center of the region for the piece movement
    this.left = options.left;
    this.right = options.right;
    this.top = options.top;
    this.bottom = options.bottom;
    this.state = options.state;
    this.regionColor = options.regionColor;
    //width and height of the region; not used
    this.width = Math.abs(this.left - this.right);
    this.height = Math.abs(this.top - this.bottom);
    //the center of the region
    this.center ={
      row: (this.top + this.bottom) / 2,
      column: (this.left + this.right) / 2
    };
  }
