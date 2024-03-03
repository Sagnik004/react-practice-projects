import Stepper from './components/Stepper';
import './App.css';
// import { CHECKOUT_STEPS } from './utils/stepsConfig';

const CHECKOUT_STEPS = [
  {
    name: 'Customer Information',
    Component: () => <div className='content'>Provide your contact details.</div>,
  },
  {
    name: 'Shipping Information',
    Component: () => <div className='content'>Enter your shipping address.</div>,
  },
  {
    name: 'Payment',
    Component: () => <div className='content'>Complete payment for your order.</div>,
  },
  {
    name: 'Order placed successfully',
    Component: () => <div className='content'>Your order has been placed successfully!</div>,
  }
];

const App = () => {
  return (
    <section className="main">
      <h1>Checkout Stepper</h1>
      <Stepper stepsConfig={CHECKOUT_STEPS} />
    </section>
  );
};

export default App;
