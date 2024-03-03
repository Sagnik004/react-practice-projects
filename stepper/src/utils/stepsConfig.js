export const CHECKOUT_STEPS = [
  {
    name: 'Customer Information',
    component: () => <div>Provide your contact details.</div>,
  },
  {
    name: 'Shipping Information',
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: 'Payment',
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: 'Order placed successfully',
    Component: () => <div>Your order has been placed.</div>,
  }
];
