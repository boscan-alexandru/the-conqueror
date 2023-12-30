export class Cart {
  // properties
  items = [];
  total_cost = 0;

  // constructor
  constructor() {
    // set localStorage cart
    this.items = JSON.parse(localStorage.getItem("cart"))?.items || [];
    this.total_cost = JSON.parse(localStorage.getItem("cart"))?.total_cost || 0;
    this.setLocalCart();
  }

  // setters
  setLocalCart() {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: this.items,
        total_cost: this.total_cost,
      })
    );
  }
  calculateTotalCost(cost) {
    let values = 0;
    this.items.map((item, index) => {
      values = values + item.price * item.amount;
    });

    this.total_cost = values;
  }
  setItem(item) {
    this.items.push(item);
  }
  removeItem(item) {
    this.items.splice(
      this.items.findIndex((i) => i.id == item.id),
      1
    );
  }
  getItemAmount(item) {
    let co = this.items.find((i) => i.id == item.id);
    if (co) {
      return co.amount;
    }
    return 0;
  }
  getItemTotalPrice(item) {
    let co = this.items.find((i) => i.id == item.id);
    if (co) {
      return co.amount * co.price;
    }
    return 0;
  }
  updateItemAmount(item) {
    let co = this.items.find((i) => i.id == item.id);
    if (co) {
      console.log("dd", co);
      co.amount = this.getItemAmount(item) - 1;
    }
    //  this.items.splice(
    //    this.items.findIndex((i) => i.id == item.id),
    //    1,
    //    {
    //      ...item,
    //      amount: item.amount,
    //    }
    //  );
  }
  getItems() {
    return this.items;
  }
  getItemsCount() {
    return this.items.length;
  }
  addToCart(item) {
    // add the item if not already present
    var item_already_in_cart = this.items.find((i) => i.id == item.id);
    if (item_already_in_cart) {
      console.log("item count before update", this.getItemAmount(item));
      // up the item count
      this.items.splice(
        this.items.findIndex((i) => i.id == item.id),
        1,
        {
          ...item,
          amount: this.getItemAmount(item) + 1,
        }
      );
    } else {
      this.items.push({ ...item, amount: 1 });
    }

    // recalculate cart total
    this.calculateTotalCost();
    this.setLocalCart();
  }
  removeFromCart(item) {
    if (this.getItemAmount(item) >= 2) {
      // up the item count
      this.updateItemAmount(item);
    } else if (this.getItemAmount(item) == 1) {
      this.removeItem(item);
    }

    // recalculate cart total
    this.calculateTotalCost();
    this.setLocalCart();
    console.log("❌item removed from cart", item);
  }
  deleteFromCart(item) {
    this.removeItem(item);

    // recalculate cart total
    this.calculateTotalCost();
    this.setLocalCart();
    console.log("❌item deleted from cart", item);
  }
}
