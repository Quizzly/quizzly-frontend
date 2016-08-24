var Utility = module.exports = {
  CLOSE_IMAGE_PATH: '/assets/img/close.png',
  LOGO_IMAGE_PATH: '/assets/img/logo.png',
  // remove duplicates from array
  removeDuplicates: function(a) {
    var seen = {};
    return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
};
