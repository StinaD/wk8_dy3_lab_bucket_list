const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const ListItemFormView = function (form) {
  this.form = form;
};


ListItemFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  });
};

ListItemFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newItem = this.createItem(event.target);
  PubSub.publish('ItemViewForm:item-submitted', newItem);
  event.target.reset();
};

ListItemFormView.prototype.createItem = function (form) {
  const newItem = {
    title: form.title.value,
    category: form.category.value,
    description: form.description.value,
    status: false
  }
  return newItem;
};


module.exports = ListItemFormView;
