const ListItemFormView = require('./views/list_item_form_view.js');
const ListItems = require('./models/list_items.js');
const ListItemsGridView = require('./views/list_items_grid_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const listItemForm = document.querySelector('form#item-form');
  const listItemFormView = new ListItemFormView(listItemForm);
  listItemFormView.bindEvents();

  const listOfItems = document.querySelector('#items');
  const listItemsGridView = new ListItemsGridView(listOfItems);
  listItemsGridView.bindEvents();

  const listUrl = 'http://localhost:3000/api/list-items';
  const listItems = new ListItems(listUrl);
  listItems.bindEvents();
  listItems.getData();
});
