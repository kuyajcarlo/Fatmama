import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { PrivacyProvider } from './context/PrivacyContext';
import { DeliveryProvider } from './context/DeliveryContext';

export default function App() {
  return (
    <PrivacyProvider>
      <AuthProvider>
        <DeliveryProvider>
          <OrderProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </OrderProvider>
        </DeliveryProvider>
      </AuthProvider>
    </PrivacyProvider>
  );
}