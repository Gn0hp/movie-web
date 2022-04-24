const SKU = require("../models/SKU");

function add_item_to_cart(cart_id, sku, quantity) {
  now = new Date().now();

  // Query to Mongo, method: PUT (aim: update)
  result = SKU.updateOne({ _id: cart_id, name: sku })
    .then(function (data) {
      // TODO: carted is array , append new item to carted[]
      let dataQuantity = data.quantity;
      if (data.cart_status == "1" && dataQuantity >= quantity) {
        data.carted.push({
          quantity,
          cart_id: sku_id,
          timeStamp: now,
        });
        data.quantity -= quantity;
      } else {
        console.error("Not enough quantity of this item for your request!");
      }
    })
    .catch((err) => {
      console.log(err);
      console.error("Failed to add item to cart");
    });
  //result.save()
}

function edit_amount_item_in_cart(cart_id, _itemId, amount, userType) {
  now = new Date().now();
  // only if if user is manager
  if (userType == 1) {
    SKU.updateOne({ _id: cart_id }).then((data) => {
      if (data.cart_status == 1 && amount < cart) {
        data.carted[_itemId].quantity += amount;
        data.quantity -= amount;
      }
    });
  } else {
    console.log("You do not have permission to edit this item!");
  }
}

function checkout(cart_id, _itemId, payment) {
  now = new Date().now();
  SKU.updateOne({ _id: cart_id, cart_status: 1 }).then((data) => {
    if (data.cart_status == 1) {
      // chuyển status sang 2: pending
      data.carted[_itemId].cart_status = 2;
      //xóa item đã checkout, deactivate cart_status
      if (payment > data.price * data.carted[_itemId].quantity) {
        data.cart_status = 0;
        data.carted = data.carted.filter((item) => {
          return item._cartId != _itemId;
        });
      }
    }
  });
}

// khi hết hạn thì lấy từ giỏ hàng trả lại về kho, reset all
function turn_back_amount_item_in_inventory(cart_id, itemId) {
  now = new Date().now();
  // Set expiration time to 1 months
  SKU.updateOne({ _id: cart_id, cart_status: 1 }).then((data) => {
    if (data.cart_status == 1) {
      // turn amount back to inventory
      data.cart_status = 0  //set status to -1 mean not active
      for (let _itemId = 0; i < itemId.length; i++) {
        data.quantity += data.carted[_itemId].quantity;
        // Delete in carted
        data.carted = data.carted.map((item) => {
          return item._cartId != _itemId;
        });
      }
    }
  });
}
// tìm tất cả các item đã expired
function get_expired_time_cart(sku_id) {
  let res = [];
  let time = new Date().now();
  SKU.find({ name: sku_id, cart_status: 1 }).then((data) => {
    data.forEach((item) => {
      // Set expire time to 1 month
      if (now.getTime() - cart.timeStamp > 4 * 7 * 24 * 60 * 60 * 1000) {
        res.push(item);
      }
    });
  });
  return res;
}
