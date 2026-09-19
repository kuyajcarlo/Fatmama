import { useState } from 'react';
import { Search, AlertTriangle, TrendingDown, Package, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastRestocked: string;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export default function AdminInventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data - using state so we can update it
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'INV-001', name: 'Chocolate Cake Mix', category: 'Ingredients', currentStock: 45, minStock: 20, maxStock: 100, unit: 'kg', lastRestocked: '2026-05-10', supplier: 'Baker\'s Choice', status: 'in-stock' },
    { id: 'INV-002', name: 'Cream Cheese', category: 'Ingredients', currentStock: 12, minStock: 15, maxStock: 50, unit: 'kg', lastRestocked: '2026-05-12', supplier: 'Dairy Fresh', status: 'low-stock' },
    { id: 'INV-003', name: 'Blueberry Filling', category: 'Ingredients', currentStock: 28, minStock: 10, maxStock: 40, unit: 'kg', lastRestocked: '2026-05-14', supplier: 'Fruit Delight Co.', status: 'in-stock' },
    { id: 'INV-004', name: 'Biscoff Cookie Crumbs', category: 'Ingredients', currentStock: 8, minStock: 12, maxStock: 30, unit: 'kg', lastRestocked: '2026-05-08', supplier: 'Cookie Haven', status: 'low-stock' },
    { id: 'INV-005', name: 'Cake Boxes (8 inch)', category: 'Packaging', currentStock: 150, minStock: 50, maxStock: 300, unit: 'pcs', lastRestocked: '2026-05-15', supplier: 'Pack Pro', status: 'in-stock' },
    { id: 'INV-006', name: 'Plastic Spoons', category: 'Packaging', currentStock: 0, minStock: 100, maxStock: 500, unit: 'pcs', lastRestocked: '2026-04-28', supplier: 'Utensil Plus', status: 'out-of-stock' },
    { id: 'INV-007', name: 'Vanilla Extract', category: 'Ingredients', currentStock: 5, minStock: 8, maxStock: 20, unit: 'L', lastRestocked: '2026-05-11', supplier: 'Flavor World', status: 'low-stock' },
    { id: 'INV-008', name: 'Food Coloring Set', category: 'Ingredients', currentStock: 25, minStock: 10, maxStock: 40, unit: 'sets', lastRestocked: '2026-05-13', supplier: 'Color Magic', status: 'in-stock' },
  ]);

  // Function to determine status based on stock level
  const determineStatus = (currentStock: number, minStock: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (currentStock === 0) return 'out-of-stock';
    if (currentStock < minStock) return 'low-stock';
    return 'in-stock';
  };

  // Function to increase stock
  const increaseStock = (id: string) => {
    setInventory(prevInventory =>
      prevInventory.map(item => {
        if (item.id === id) {
          const newStock = Math.min(item.currentStock + 1, item.maxStock);
          if (newStock === item.currentStock) {
            toast.warning(`Cannot exceed maximum stock of ${item.maxStock} ${item.unit}`);
            return item;
          }
          const newStatus = determineStatus(newStock, item.minStock);
          toast.success(`Added 1 ${item.unit} to ${item.name}`);
          return {
            ...item,
            currentStock: newStock,
            status: newStatus,
            lastRestocked: newStock > item.currentStock ? new Date().toISOString().split('T')[0] : item.lastRestocked
          };
        }
        return item;
      })
    );
  };

  // Function to decrease stock
  const decreaseStock = (id: string) => {
    setInventory(prevInventory =>
      prevInventory.map(item => {
        if (item.id === id) {
          const newStock = Math.max(item.currentStock - 1, 0);
          if (newStock === item.currentStock) {
            toast.warning(`Stock is already at 0`);
            return item;
          }
          const newStatus = determineStatus(newStock, item.minStock);
          if (newStatus === 'low-stock') {
            toast.warning(`${item.name} is now low on stock!`);
          } else if (newStatus === 'out-of-stock') {
            toast.error(`${item.name} is now out of stock!`);
          } else {
            toast.info(`Removed 1 ${item.unit} from ${item.name}`);
          }
          return {
            ...item,
            currentStock: newStock,
            status: newStatus
          };
        }
        return item;
      })
    );
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'text-green-700 bg-green-100';
      case 'low-stock':
        return 'text-yellow-700 bg-yellow-100';
      case 'out-of-stock':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const getStockBarColor = (percentage: number) => {
    if (percentage >= 50) return 'bg-green-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const statusCounts = {
    all: inventory.length,
    'in-stock': inventory.filter(i => i.status === 'in-stock').length,
    'low-stock': inventory.filter(i => i.status === 'low-stock').length,
    'out-of-stock': inventory.filter(i => i.status === 'out-of-stock').length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="mb-2">Inventory Tracker</h1>
        <p className="text-gray-600">Monitor and manage your stock levels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Items</p>
          <p className="text-3xl font-bold text-[#2C5F4F]">{statusCounts.all}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">In Stock</p>
          <p className="text-3xl font-bold text-green-600">{statusCounts['in-stock']}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Low Stock</p>
          <p className="text-3xl font-bold text-yellow-600">{statusCounts['low-stock']}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600">{statusCounts['out-of-stock']}</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterStatus === 'all'
              ? 'bg-[#D4A843] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setFilterStatus('in-stock')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterStatus === 'in-stock'
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          In Stock
        </button>
        <button
          onClick={() => setFilterStatus('low-stock')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterStatus === 'low-stock'
              ? 'bg-yellow-500 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Low Stock
        </button>
        <button
          onClick={() => setFilterStatus('out-of-stock')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterStatus === 'out-of-stock'
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Out of Stock
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search inventory by name, ID, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F4F]"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Item ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Stock Level</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Min/Max</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Supplier</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Last Restocked</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const percentage = getStockPercentage(item.currentStock, item.maxStock);
                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-sm">{item.id}</td>
                    <td className="py-4 px-6 font-medium">{item.name}</td>
                    <td className="py-4 px-6 text-gray-600">{item.category}</td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {item.currentStock} {item.unit}
                          </span>
                          <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getStockBarColor(percentage)}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {item.minStock} / {item.maxStock} {item.unit}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.supplier}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.lastRestocked}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => increaseStock(item.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={`Add stock (Max: ${item.maxStock})`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => decreaseStock(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove stock"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No inventory items found</p>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
