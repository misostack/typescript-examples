interface CustomerBehavior {
  order(): void;
}

interface CustomerBehavior {
  pay(): void;
}

interface CustomerBehavior {
  return(): void;
}

class Customer implements CustomerBehavior {
  order(): void {
    console.info('Order products');
  }
  pay(): void {
    console.info('Pay');
  }
  return(): void {
    console.info('Return products');
  }
}

(() => {
  const customer = new Customer();
  customer.order();
  customer.pay();
  customer.return();
})();
