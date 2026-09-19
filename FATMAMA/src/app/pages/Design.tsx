import { useState } from 'react';
import { Sparkles, Upload, RefreshCw, Download } from 'lucide-react';
import { toast } from 'sonner';

const defaultCakeImage = 'https://images.unsplash.com/photo-1613323885373-6e91a09b598b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

const cakeStyles = [
  { id: 'classic', name: 'Classic', description: 'Traditional layered cake' },
  { id: 'modern', name: 'Modern', description: 'Contemporary design' },
  { id: 'rustic', name: 'Rustic', description: 'Natural, homemade look' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated style' },
];

const cakeColors = [
  { name: 'Pink', value: '#FFB6C1' },
  { name: 'Blue', value: '#87CEEB' },
  { name: 'Purple', value: '#DDA0DD' },
  { name: 'Green', value: '#90EE90' },
  { name: 'Yellow', value: '#FFD700' },
  { name: 'Orange', value: '#FFA07A' },
  { name: 'Red', value: '#FF6B6B' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Brown', value: '#D2691E' },
];

export default function Design() {
  const [cakeImage, setCakeImage] = useState(defaultCakeImage);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customization, setCustomization] = useState({
    text: '',
    size: 'Medium (8 inches)',
    flavor: 'Vanilla',
    frosting: 'Buttercream',
    layers: '2',
    style: 'classic',
    color: '#FFB6C1',
    occasion: 'Birthday',
    decorations: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCakeImage(reader.result as string);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCake = async () => {
    setIsGenerating(true);
    toast.info('Generating your custom cake design...');

    // Simulate AI generation (in a real app, this would call an AI API)
    setTimeout(() => {
      // For demo purposes, we'll use different cake images based on selections
      const cakeImages = [
        'https://images.unsplash.com/photo-1613323885373-6e91a09b598b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1737700088028-fae0666feb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1613323885553-4b069992362d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1655463598992-058bebba5fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      ];
      const randomImage = cakeImages[Math.floor(Math.random() * cakeImages.length)];
      setCakeImage(randomImage);
      setIsGenerating(false);
      toast.success('Your custom cake design is ready!');
    }, 2000);
  };

  const downloadDesign = () => {
    toast.success('Design downloaded!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2C5F4F] to-[#1F4437] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl text-white mb-3 font-bold">AI Cake Designer</h1>
          <p className="text-white text-lg">
            Create your dream cake with AI-powered customization
          </p>
        </div>
      </section>

      {/* Main Design Interface */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Image Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Preview</h2>
                <button
                  onClick={downloadDesign}
                  className="flex items-center gap-2 text-sm text-[#D4A843] hover:text-amber-700"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>

              {/* Image Container */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={cakeImage}
                  alt="Cake Design"
                  className="w-full h-full object-cover"
                />
                {customization.text && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="text-3xl font-bold px-6 py-3 rounded-lg shadow-lg"
                      style={{
                        color: customization.color === '#FFFFFF' ? '#333' : customization.color,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {customization.text}
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Image */}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                </label>
                <button
                  onClick={generateCake}
                  disabled={isGenerating}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#D4A843] hover:bg-[#B8923A] disabled:bg-gray-300 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span className="text-sm">{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                </button>
              </div>
            </div>

            {/* Right Side - Customization Options */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold mb-4">Customize Your Cake</h2>

              {/* Cake Text */}
              <div>
                <label className="block mb-2 font-medium text-sm">Cake Text</label>
                <input
                  type="text"
                  value={customization.text}
                  onChange={(e) => setCustomization({ ...customization, text: e.target.value })}
                  placeholder="Happy Birthday!"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none"
                />
              </div>

              {/* Size and Layers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-sm">Size</label>
                  <select
                    value={customization.size}
                    onChange={(e) => setCustomization({ ...customization, size: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none"
                  >
                    <option>Small (6")</option>
                    <option>Medium (8")</option>
                    <option>Large (10")</option>
                    <option>XL (12")</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm">Layers</label>
                  <select
                    value={customization.layers}
                    onChange={(e) => setCustomization({ ...customization, layers: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>

              {/* Flavor and Frosting */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-sm">Flavor</label>
                  <select
                    value={customization.flavor}
                    onChange={(e) => setCustomization({ ...customization, flavor: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none"
                  >
                    <option>Vanilla</option>
                    <option>Chocolate</option>
                    <option>Red Velvet</option>
                    <option>Lemon</option>
                    <option>Carrot</option>
                    <option>Strawberry</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm">Frosting</label>
                  <select
                    value={customization.frosting}
                    onChange={(e) => setCustomization({ ...customization, frosting: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none"
                  >
                    <option>Buttercream</option>
                    <option>Cream Cheese</option>
                    <option>Fondant</option>
                    <option>Whipped Cream</option>
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block mb-2 font-medium text-sm">Occasion</label>
                <select
                  value={customization.occasion}
                  onChange={(e) => setCustomization({ ...customization, occasion: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none"
                >
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Anniversary</option>
                  <option>Baby Shower</option>
                  <option>Graduation</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Cake Style */}
              <div>
                <label className="block mb-2 font-medium text-sm">Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {cakeStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCustomization({ ...customization, style: style.id })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        customization.style === style.id
                          ? 'border-[#D4A843]500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{style.name}</div>
                      <div className="text-xs text-gray-500">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block mb-2 font-medium text-sm">Primary Color</label>
                <div className="flex flex-wrap gap-2">
                  {cakeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setCustomization({ ...customization, color: color.value })}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        customization.color === color.value ? 'border-[#D4A843]500 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Decorations */}
              <div>
                <label className="block mb-2 font-medium text-sm">Decorations & Notes</label>
                <textarea
                  value={customization.decorations}
                  onChange={(e) => setCustomization({ ...customization, decorations: e.target.value })}
                  placeholder="Add flowers, sprinkles, special details..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  toast.success('Design saved! Our team will contact you soon.');
                }}
                className="w-full bg-[#D4A843] hover:bg-[#B8923A] text-white py-3 rounded-lg transition-colors font-medium text-lg"
              >
                Save & Order Custom Cake
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
