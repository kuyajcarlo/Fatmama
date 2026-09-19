import { useState, useMemo } from 'react';
import { Search, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
  const { orders } = useOrders();

  // Generate customer data from orders
  const customers: Customer[] = useMemo(() => {
    const customerMap = new Map<string, Customer>();

    orders.forEach((order) => {
      if (!customerMap.has(order.email)) {
        customerMap.set(order.email, {
          id: `CUST-${customerMap.size + 1}`.padStart(8, '0'),
          name: order.customer,
          email: order.email,
          phone: order.phone,
          location: order.city,
          totalOrders: 0,
          totalSpent: 0,
          joinDate: order.date.split(' ')[0], // First order date
          status: 'active',
        });
      }

      const customer = customerMap.get(order.email)!;
      customer.totalOrders += 1;
      customer.totalSpent += order.finalTotal;
    });

    return Array.from(customerMap.values());
  }, [orders]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="mb-2">Customer List</h1>
        <p className="text-gray-600">Manage and view customer information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-2">Total Customers</p>
          <p className="text-3xl font-bold text-[#2C5F4F]">{customers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-2">Active Customers</p>
          <p className="text-3xl font-bold text-green-600">
            {customers.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-blue-600">
            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-[#D4A843]">
            ₱ {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers by name, email, phone, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F4F]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Customer ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Contact</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Location</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Orders</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Join Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-sm">{customer.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4A843] text-white flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{customer.totalOrders}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-[#D4A843]">
                    ₱ {customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{customer.joinDate}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No customers found</p>
          </div>
        )}
      </div>
    </div>
  );
}
