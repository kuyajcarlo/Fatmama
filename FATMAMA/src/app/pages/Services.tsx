import { useState } from 'react';
import { Link } from 'react-router';
import { Send, CheckCircle } from 'lucide-react';

export default function Services() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    eventDate: '',
    message: '',
    preferredContact: 'email',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inquiryTypes = [
    'Custom Cake Order',
    'Event Catering',
    'Gift Basket',
    'Wedding Package',
    'Corporate Order',
    'General Inquiry',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type.';
    if (!formData.message.trim()) newErrors.message = 'Please describe your inquiry.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1672826979217-7156a305acf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-[#2C5F4F]/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-white mb-4 font-bold">Inquiries</h1>
          <p className="text-amber-200 text-xl">
            Have a question or a special request? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 font-bold">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From custom cakes to full event catering, we can bake up all your event needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#2C5F4F]/5 border border-[#2C5F4F]/20 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#D4A843] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎂</div>
              <h3 className="text-2xl mb-3">Custom Cakes</h3>
              <p className="text-gray-600 mb-6">
                Personalized cakes for birthdays, weddings, anniversaries, and every special moment.
              </p>
              <Link
                to="/design"
                className="inline-block bg-[#D4A843] hover:bg-[#B8923A] text-white px-6 py-2 rounded-md transition-colors font-medium"
              >
                Design Now
              </Link>
            </div>

            <div className="bg-[#2C5F4F]/5 border border-[#2C5F4F]/20 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#D4A843] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🍽️</div>
              <h3 className="text-2xl mb-3">Event Catering</h3>
              <p className="text-gray-600 mb-6">
                Full catering for weddings, corporate events, parties, and special celebrations.
              </p>
              <a
                href="#inquiry-form"
                className="inline-block bg-[#2C5F4F] hover:bg-[#1F4437] text-white px-6 py-2 rounded-md transition-colors font-medium"
              >
                Get a Quote
              </a>
            </div>

            <div className="bg-[#2C5F4F]/5 border border-[#2C5F4F]/20 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#D4A843] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🧺</div>
              <h3 className="text-2xl mb-3">Gift Baskets</h3>
              <p className="text-gray-600 mb-6">
                Curated gift baskets filled with our finest pastries — perfect for any occasion.
              </p>
              <a
                href="#inquiry-form"
                className="inline-block bg-[#2C5F4F] hover:bg-[#1F4437] text-white px-6 py-2 rounded-md transition-colors font-medium"
              >
                Browse Options
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#2C5F4F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4 font-bold">How It Works</h2>
            <p className="text-amber-200">Simple steps to get exactly what you need</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Send Inquiry', desc: 'Fill out our inquiry form below with your event details.' },
              { step: '2', title: 'We Reach Out', desc: "Our team will contact you within 24 hours to discuss your needs." },
              { step: '3', title: 'Get a Quote', desc: 'Receive a detailed quote tailored to your requirements.' },
              { step: '4', title: 'Enjoy!', desc: 'We deliver fresh, delicious treats straight to your event.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="bg-[#D4A843] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl text-white mb-2">{title}</h3>
                <p className="text-amber-100/80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl mb-3 font-bold">Send Us an Inquiry</h2>
            <p className="text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-[#2C5F4F]/20">
              <CheckCircle className="w-16 h-16 text-[#2C5F4F] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#2C5F4F] mb-2">Inquiry Received!</h3>
              <p className="text-gray-600 mb-6">
                Thank you, <strong>{formData.name}</strong>! We've received your inquiry and will reach out to you at{' '}
                <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', inquiryType: '', eventDate: '', message: '', preferredContact: 'email' });
                }}
                className="bg-[#D4A843] hover:bg-[#B8923A] text-white px-8 py-3 rounded-md transition-colors font-medium"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-md p-8 border border-[#2C5F4F]/20 space-y-6"
            >
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2C5F4F] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full border rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4A843] transition ${
                      errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2C5F4F] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full border rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4A843] transition ${
                      errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone & Inquiry Type */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2C5F4F] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 912 345 6789"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4A843] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2C5F4F] mb-1">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4A843] transition ${
                      errors.inquiryType ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  >
                    <option value="">Select a type...</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType}</p>}
                </div>
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-sm font-semibold text-[#2C5F4F] mb-1">
                  Event / Preferred Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4A843] transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#2C5F4F] mb-1">
                  Message / Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your inquiry in detail — occasion, number of guests, flavor preferences, dietary restrictions, budget range, etc."
                  className={`w-full border rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4A843] transition resize-none ${
                    errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Preferred Contact */}
              <div>
                <label className="block text-sm font-semibold text-[#2C5F4F] mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex gap-6">
                  {['email', 'phone', 'either'].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                        className="accent-[#D4A843]"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#D4A843] hover:bg-[#B8923A] text-white py-3 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold text-[#2C5F4F] mb-1">Visit Us</h3>
              <p className="text-gray-600 text-sm">123 Bakery Street<br />Sweet City, SC 12345</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-semibold text-[#2C5F4F] mb-1">Call Us</h3>
              <p className="text-gray-600 text-sm">(555) 123-4567</p>
            </div>
            <div>
              <div className="text-2xl mb-2">✉️</div>
              <h3 className="font-semibold text-[#2C5F4F] mb-1">Email Us</h3>
              <p className="text-gray-600 text-sm">hello@mamaandco.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
