const PubSub = require('../helpers/pub_sub.js');

const ListItemView = function(container, id) {
  this.container = container;
  this.id = id;
};

ListItemView.prototype.render = function (item) {
  const div = document.createElement('div');

  const title = document.createElement('h3');
  title.textContent = item.title;
  div.appendChild(title);

  const category = document.createElement('p');
  category.textContent = item.category;
  div.appendChild(category);

  const description = document.createElement('p');
  description.textContent = item.description
  div.appendChild(description);

  const status = document.createElement('p');
  status.textContent = this.currentStatus(item);
  div.appendChild(status);

  const deleteButton = this.createDeleteButton(item._id);
  div.appendChild(deleteButton);

  const updateButton = this.createUpdateButton(item._id);
  div.appendChild(updateButton);

  this.container.appendChild(div);

};

ListItemView.prototype.currentStatus = function (item) {
  if (item.status === true) {
    return "Complete";
  }
  else
  { return "To do"; }
};

ListItemView.prototype.createDeleteButton = function (itemId) {
  const button = document.createElement('button');
  button.classList.add('delete-btn');
  button.value = itemId;
  button.textContent = 'Delete';

  button.addEventListener('click', (evt) => {
    PubSub.publish('ListItemView:item-delete-clicked', evt.target.value);
  });

  return button;
};

ListItemView.prototype.createUpdateButton = function (itemId) {
  const button = document.createElement('button');
  button.classList.add('update-button');
  button.value = itemId;
  button.textContent = 'Update status';

  button.addEventListener('click', (event) => {
    PubSub.publish('ListItemView:item-status-update-clicked', event.target.value);
  });

  return button;
};


module.exports = ListItemView;
