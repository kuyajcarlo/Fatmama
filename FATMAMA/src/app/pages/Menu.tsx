import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePrivacy } from '../context/PrivacyContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import biscoffPie from '../../imports/image-5.png';
import blueberryCheesecake from '../../imports/image-8.png';
import haloHalo from '../../imports/image-7.png';
import maisConYelo from '../../imports/image-6.png';

const menuItems = {
  cakes: [
    {
      id: 'bg2',
      name: 'BG2 Jr Chocolate Moist Decadent Cake',
      description: 'Junior-sized rich and moist chocolate cake',
      price: 179,
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    },
    {
      id: 'bg9',
      name: 'BG9 Chocolate Moist Decadent Cake',
      description: 'Decadent chocolate cake with rich frosting',
      price: 249,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    },
  ],
  pastries: [
    {
      id: 'bg8',
      name: 'BG8 Biscoff Cheesecake',
      description: 'Creamy cheesecake with Biscoff cookie crust',
      price: 449,
      image: biscoffPie
    },
    {
      id: 'bg6',
      name: 'BG6 Blueberry Cheesecake',
      description: 'Fresh blueberry topped creamy cheesecake',
      price: 439,
      image: blueberryCheesecake
    },
  ],
  beverages: [
    {
      id: 'hg1',
      name: 'HG1 Halo Halo',
      description: 'Classic Filipino shaved ice dessert with mixed fruits',
      price: 129,
      image: haloHalo
    },
    {
      id: 'hg2',
      name: 'HG2 Mais Con Yelo',
      description: 'Sweet corn with shaved ice and milk',
      price: 119,
      image: maisConYelo
    },
  ],
  meals: [],
};

export default function Menu() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();
  const { hasConsented, setShowConsentModal } = usePrivacy();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      const element = document.getElementById(category);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [category]);

  const handleAddToCart = (item: typeof menuItems.cakes[0]) => {
    if (!hasConsented) {
      setShowConsentModal(true);
      toast.error('Please accept our data privacy policy to place orders');
      return;
    }

    if (!isLoggedIn) {
      toast.error('Please log in to add items to cart', {
        action: {
          label: 'Log In',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  const MenuItem = ({ item, section }: { item: typeof menuItems.cakes[0]; section: string }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#D4A843] font-bold text-lg">₱ {item.price}</span>
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-[#D4A843] hover:bg-[#B8923A] text-white p-2 rounded-md transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Menu Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1643944471768-2d2eac3afb6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-white mb-4 font-bold">Our Products</h1>
          <p className="text-white text-xl">Freshly baked daily with the finest ingredients</p>
        </div>
      </section>

      {/* Cakes Section */}
      <section id="cakes" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Cakes</h2>
            <p className="text-gray-600">Celebration cakes for every occasion</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menuItems.cakes.map((item) => (
              <MenuItem key={item.id} item={item} section="cakes" />
            ))}
          </div>
        </div>
      </section>

      {/* Pastries Section */}
      <section id="pastries" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Cheesecakes</h2>
            <p className="text-gray-600">Creamy and indulgent cheesecakes</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menuItems.pastries.map((item) => (
              <MenuItem key={item.id} item={item} section="pastries" />
            ))}
          </div>
        </div>
      </section>

      {/* Beverages Section */}
      <section id="beverages" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Filipino Desserts</h2>
            <p className="text-gray-600">Refreshing traditional Filipino treats</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menuItems.beverages.map((item) => (
              <MenuItem key={item.id} item={item} section="beverages" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
