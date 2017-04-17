function Region(options){

    this.left = options.left;
    this.right = options.right;
    this.top = options.top;
    this.bottom = options.bottom;
    this.state = options.state;
    this.regionColor = options.regionColor;

    this.width = Math.abs(this.left - this.right);
    this.height = Math.abs(this.top - this.bottom);
    this.center ={
      row: (this.top + this.bottom) / 2,
      column: (this.left + this.right) / 2
    };

    //console.log("this",this);
  }

  // Region.prototype.drawRegion = function () {
  //
  // };
