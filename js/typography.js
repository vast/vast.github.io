var typographer = (function() {
  var tiny = ['ни', 'не', 'и', 'но', 'а', 'или', 'да', 'как', 'из-за', 'про', 'по', 'за', 'для',
              'на', 'до', 'при', 'меж', 'о', 'у', 'в', 'во', 'с', 'со', 'от', 'ото', 'из', 'без',
              'безо', 'к', 'ко', 'об', 'обо', 'под', 'подо', 'над', 'перед', 'передо'];

  _capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  _capitalizedTiny = function() {
    var _this = this;
    return tiny.map(function(e) { return _this._capitalize(e); });
  },

  _typoNode = function(node) {
    tiny.forEach(function(word) {
      if (node.innerHTML) {
        node.innerHTML = node.innerHTML.replace(new RegExp(' ' + word + ' ', 'g'), ' ' + word + ' ');  // contains &nbsp;
      }
    });
  },

  _walkThroughTheNode = function(node) {
    if (node.nodeType === 3) {
      this._typoNode(node);
    } else {
      var childs = node.childNodes;

      for (var i = 0; i < childs.length; i++) {
        this._typoNode(childs[i]);
      }
    }
  }

  return {
    kickit: function(selector) {
      var matches = document.querySelectorAll(selector);
      tiny = tiny.concat(_capitalizedTiny());

      for (var i = 0; i < matches.length; i++) {
        _walkThroughTheNode(matches[i]);
      }
    }
  }
})();
