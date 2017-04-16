function RegionGenerator(){

}

RegionGenerator.prototype.generateRegion = function (options) {
  var region = new Region(options);
  return region;
};
