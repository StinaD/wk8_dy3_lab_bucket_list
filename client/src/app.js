const ListItemFormView = require('./views/list_item_form_view.js');


document.addEventListener('DOMContentLoaded', () => {
  const listItemForm = document.querySelector('form#item-form');
  const listItemFormView = new ListItemFormView(listItemForm);
  listItemFormView.bindEvents();
});
