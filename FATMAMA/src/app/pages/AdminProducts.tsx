import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const products: Product[] = [
    { id: 'BG2', name: 'Jr Chocolate Moist Decadent Cake', category: 'Cakes', price: 179, stock: 45, status: 'active' },
    { id: 'BG9', name: 'Chocolate Moist Decadent Cake', category: 'Cakes', price: 249, stock: 32, status: 'active' },
    { id: 'BG8', name: 'Biscoff Cheesecake', category: 'Cheesecakes', price: 449, stock: 28, status: 'active' },
    { id: 'BG6', name: 'Blueberry Cheesecake', category: 'Cheesecakes', price: 439, stock: 15, status: 'active' },
    { id: 'HG1', name: 'Halo Halo', category: 'Filipino Desserts', price: 129, stock: 60, status: 'active' },
    { id: 'HG2', name: 'Mais Con Yelo', category: 'Filipino Desserts', price: 119, stock: 52, status: 'active' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="mb-2">Manage Products</h1>
        <p className="text-gray-600">Add, edit, or remove products from your inventory</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F4F]"
            />
          </div>
          <button className="bg-[#D4A843] hover:bg-[#B8923A] text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Product ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Price</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-sm">{product.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Package className="w-5 h-5 text-[#2C5F4F]" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{product.category}</td>
                  <td className="py-4 px-6 font-medium text-[#D4A843]">₱ {product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`${product.stock < 20 ? 'text-red-600' : 'text-gray-700'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-2">Total Products</p>
          <p className="text-3xl font-bold text-[#2C5F4F]">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-2">Active Products</p>
          <p className="text-3xl font-bold text-green-600">
            {products.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-2">Low Stock Items</p>
          <p className="text-3xl font-bold text-red-600">
            {products.filter(p => p.stock < 20).length}
          </p>
        </div>
      </div>
    </div>
  );
}
