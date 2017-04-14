function Region(options){

    this.left = options.left;
    this.right = options.right;
    this.top = options.top;
    this.bottom = options.bottom;

    this.width = Math.abs(this.left - this.right);
    this.height = Math.abs(this.top - this.bottom);
    this.center ={
      row: (this.left + this.right) / 2,
      column: (this.top + this.bottom) / 2
    };
  }

  Region.prototype.drawRegion = function () {

  };
