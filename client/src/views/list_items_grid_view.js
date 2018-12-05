const PubSub = require('../helpers/pub_sub.js');
const ListItemView = require('./list_item_view.js');

const ListItemsGridView = function(container) {
  this.container = container;
};

ListItemsGridView.prototype.bindEvents = function () {
  PubSub.subscribe('ListItems:items-loaded', (event) => {
    this.render(event.detail);
  });
};

ListItemsGridView.prototype.render = function (items) {
  this.container.innerHTML = '';
  const itemView = new ListItemView(this.container);
  items.forEach((item) => itemView.render(item));
};


module.exports = ListItemsGridView;
