import { MapPin, Phone, Clock } from 'lucide-react';

export default function Branches() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511018556340-d16986a1c194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-white mb-4 font-bold">Our Branches</h1>
          <p className="text-white text-xl">Visit us at any of our convenient locations</p>
        </div>
      </section>

      {/* Branches List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Branch 1 - Main Store */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl mb-2">Main Store - Bakery Street</h3>
                  <p className="text-gray-600">123 Bakery Street<br />Sweet City, SC 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">Hours:</p>
                  <p className="text-gray-600">Monday - Friday: 6:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Saturday: 7:00 AM - 9:00 PM</p>
                  <p className="text-gray-600">Sunday: 7:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Features:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Original location since 1998</li>
                  <li>• Full custom cake design service</li>
                  <li>• Indoor seating area</li>
                  <li>• Free parking</li>
                </ul>
              </div>
            </div>

            {/* Branch 2 - Downtown */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl mb-2">Downtown Location</h3>
                  <p className="text-gray-600">456 Main Avenue<br />Sweet City, SC 12346</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">(555) 234-5678</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">Hours:</p>
                  <p className="text-gray-600">Monday - Friday: 6:30 AM - 7:00 PM</p>
                  <p className="text-gray-600">Saturday: 7:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Features:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Quick grab-and-go service</li>
                  <li>• Coffee bar</li>
                  <li>• Outdoor patio seating</li>
                  <li>• Street parking available</li>
                </ul>
              </div>
            </div>

            {/* Branch 3 - Westside */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl mb-2">Westside Plaza</h3>
                  <p className="text-gray-600">789 West Boulevard<br />Sweet City, SC 12347</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">(555) 345-6789</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">Hours:</p>
                  <p className="text-gray-600">Monday - Friday: 7:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Saturday: 7:00 AM - 9:00 PM</p>
                  <p className="text-gray-600">Sunday: 8:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Features:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Family-friendly atmosphere</li>
                  <li>• Kids' decorating workshops</li>
                  <li>• Large selection of breads</li>
                  <li>• Shopping plaza parking</li>
                </ul>
              </div>
            </div>

            {/* Branch 4 - Northside */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl mb-2">Northside Market</h3>
                  <p className="text-gray-600">321 North Street<br />Sweet City, SC 12348</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">(555) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">Hours:</p>
                  <p className="text-gray-600">Monday - Friday: 6:00 AM - 7:30 PM</p>
                  <p className="text-gray-600">Saturday: 6:30 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 7:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Features:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Newest location</li>
                  <li>• Drive-through window</li>
                  <li>• Catering order pickup</li>
                  <li>• Ample parking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 font-bold">Coming Soon!</h2>
          <p className="text-xl text-gray-700 mb-8">
            We're expanding! New locations opening in 2027:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-2xl mb-2">Eastside Shopping Center</h3>
              <p className="text-gray-600 mb-2">555 East Drive, Sweet City</p>
              <p className="text-[#D4A843] font-medium">Opening Spring 2027</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-2xl mb-2">Lakeside Village</h3>
              <p className="text-gray-600 mb-2">888 Lake Road, Sweet City</p>
              <p className="text-[#D4A843] font-medium">Opening Summer 2027</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 font-bold">Visit Us Today!</h2>
          <p className="text-gray-600 mb-8">
            Stop by any of our locations to experience the warmth and deliciousness of Mama & Co.
            Our friendly staff is always ready to help you find the perfect treat!
          </p>
          <p className="text-lg text-gray-700">
            Questions? Call us at <span className="text-[#D4A843] font-medium">(555) 123-4567</span>
          </p>
        </div>
      </section>
    </div>
  );
}
