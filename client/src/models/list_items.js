const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const ListItems = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
  this.items = [];
};

ListItems.prototype.bindEvents = function () {
  PubSub.subscribe('ItemViewForm:item-submitted', (event) => {
    this.postItem(event.detail);
  });
  PubSub.subscribe('ListItemView:item-delete-clicked', (event) => {
    this.deleteItem(event.detail);
  });
  PubSub.subscribe('ListItemView:item-status-update-clicked', (event) => {
    this.updateItem(event.detail);
  });
};

ListItems.prototype.postItem = function (item) {
  const request = new RequestHelper(this.url);
  request.post(item)
    .then((items) => {
      PubSub.publish('ListItems:items-loaded', items);
    })
    .catch(console.error);
};

ListItems.prototype.getData = function () {
  this.request.get()
    .then((items) => {
      PubSub.publish('ListItems:items-loaded', items);
      this.items = items;
    })
    .catch(console.error);
};

ListItems.prototype.deleteItem = function (itemId) {
  const request = new RequestHelper(this.url);
  request.delete(itemId)
    .then((items) => {
      PubSub.publish('ListItems:items-loaded', items);
    })
    .catch(console.error);
};

ListItems.prototype.updateItem = function (itemId) {
  const existingData = this.items.find((item) => {
    return item._id === itemId;
  });
  existingData.status = !existingData.status;
  delete existingData._id;
  console.log(existingData);
  this.request.put(itemId, existingData)
    .then((items) => {
      PubSub.publish('ListItems:items-loaded', items);
    })
    .catch(console.error);
};


// item.status = !item.status;
// delete item._id;


module.exports = ListItems;
