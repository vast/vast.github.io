var typographer = (function() {
  var tiny = ['ни', 'не', 'и', 'но', 'а', 'или', 'да', 'как', 'из-за', 'про', 'по', 'за', 'для',
              'на', 'до', 'при', 'меж', 'о', 'у', 'в', 'во', 'с', 'со', 'от', 'ото', 'из', 'без',
              'безо', 'к', 'ко', 'об', 'обо', 'под', 'подо', 'над', 'перед', 'передо'];
  var tinyRegexps = tiny.map(function(word) { return new RegExp('([ «])(' + word + ') ', 'gi'); });

  _typoNode = function(node) {
    tinyRegexps.forEach(function(regexp) {
      if (node.innerHTML) {
        node.innerHTML = node.innerHTML.replace(regexp, '$1$2 ');  // contains &nbsp;
      } else if (node.nodeType === 3) {
        node.nodeValue = node.nodeValue.replace(regexp, '$1$2 ');
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
      document.addEventListener('DOMContentLoaded', function() {
        var matches = document.querySelectorAll(selector);
        for (var i = 0; i < matches.length; i++) {
          _walkThroughTheNode(matches[i]);
        }

        document.body.classList.add('is__ready');
      }, false)
    }
  }
})();
