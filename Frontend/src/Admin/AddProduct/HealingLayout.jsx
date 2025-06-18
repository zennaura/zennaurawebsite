import React, { useState } from 'react';

const PlusLayout = () => {
  const [content, setContent] = useState({
    topLeft: {
      icon: '🎭',
      title: 'Balances emotional energy and calms the nervous system'
    },
    topRight: {
      icon: '✨',
      title: 'Dispels negative energy and soothes emotional trauma'
    },
    bottomLeft: {
      icon: '🧠',
      title: 'Promotes clarity of mind and heartfelt communication'
    },
    bottomRight: {
      icon: '👁️',
      title: 'Enhances intuition and feminine energy flow'
    }
  });

  const updateContent = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Four Quadrant Layout</h1>
      
      {/* Four Quadrant Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-1 bg-gray-800 p-1 rounded-lg mb-8">
          {/* Top Left */}
          <div className="bg-gray-100 p-12 rounded-tl-lg flex flex-col items-center justify-center text-center min-h-80">
            <div className="text-6xl mb-6">{content.topLeft.icon}</div>
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs">
              {content.topLeft.title}
            </p>
          </div>
          
          {/* Top Right */}
          <div className="bg-gray-100 p-12 rounded-tr-lg flex flex-col items-center justify-center text-center min-h-80">
            <div className="text-6xl mb-6">{content.topRight.icon}</div>
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs">
              {content.topRight.title}
            </p>
          </div>
          
          {/* Bottom Left */}
          <div className="bg-gray-100 p-12 rounded-bl-lg flex flex-col items-center justify-center text-center min-h-80">
            <div className="text-6xl mb-6">{content.bottomLeft.icon}</div>
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs">
              {content.bottomLeft.title}
            </p>
          </div>
          
          {/* Bottom Right */}
          <div className="bg-gray-100 p-12 rounded-br-lg flex flex-col items-center justify-center text-center min-h-80">
            <div className="text-6xl mb-6">{content.bottomRight.icon}</div>
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs">
              {content.bottomRight.title}
            </p>
          </div>
        </div>
        
        {/* Edit Controls */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Edit Quadrants</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Top Left Controls */}
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-blue-600">Top Left Quadrant</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Icon/Emoji:</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md text-2xl text-center"
                    value={content.topLeft.icon}
                    onChange={(e) => updateContent('topLeft', 'icon', e.target.value)}
                    placeholder="🎭"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description:</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none"
                    rows="3"
                    value={content.topLeft.title}
                    onChange={(e) => updateContent('topLeft', 'title', e.target.value)}
                    placeholder="Enter description..."
                  />
                </div>
              </div>
            </div>
            
            {/* Top Right Controls */}
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-green-600">Top Right Quadrant</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Icon/Emoji:</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md text-2xl text-center"
                    value={content.topRight.icon}
                    onChange={(e) => updateContent('topRight', 'icon', e.target.value)}
                    placeholder="✨"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description:</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none"
                    rows="3"
                    value={content.topRight.title}
                    onChange={(e) => updateContent('topRight', 'title', e.target.value)}
                    placeholder="Enter description..."
                  />
                </div>
              </div>
            </div>
            
            {/* Bottom Left Controls */}
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-purple-600">Bottom Left Quadrant</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Icon/Emoji:</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md text-2xl text-center"
                    value={content.bottomLeft.icon}
                    onChange={(e) => updateContent('bottomLeft', 'icon', e.target.value)}
                    placeholder="🧠"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description:</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none"
                    rows="3"
                    value={content.bottomLeft.title}
                    onChange={(e) => updateContent('bottomLeft', 'title', e.target.value)}
                    placeholder="Enter description..."
                  />
                </div>
              </div>
            </div>
            
            {/* Bottom Right Controls */}
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-orange-600">Bottom Right Quadrant</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Icon/Emoji:</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md text-2xl text-center"
                    value={content.bottomRight.icon}
                    onChange={(e) => updateContent('bottomRight', 'icon', e.target.value)}
                    placeholder="👁️"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description:</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none"
                    rows="3"
                    value={content.bottomRight.title}
                    onChange={(e) => updateContent('bottomRight', 'title', e.target.value)}
                    placeholder="Enter description..."
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Preset Templates */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Quick Templates</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setContent({
                  topLeft: { icon: '🎯', title: 'Define clear goals and objectives for success' },
                  topRight: { icon: '🚀', title: 'Execute with energy and momentum' },
                  bottomLeft: { icon: '📊', title: 'Analyze data and measure progress' },
                  bottomRight: { icon: '🔄', title: 'Iterate and improve continuously' }
                })}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Business Strategy
              </button>
              
              <button
                onClick={() => setContent({
                  topLeft: { icon: '💪', title: 'Build physical strength and endurance' },
                  topRight: { icon: '🧘', title: 'Cultivate mental peace and clarity' },
                  bottomLeft: { icon: '❤️', title: 'Nurture emotional wellbeing' },
                  bottomRight: { icon: '🌱', title: 'Foster spiritual growth and connection' }
                })}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Wellness Framework
              </button>
              
              <button
                onClick={() => setContent({
                  topLeft: { icon: '🎭', title: 'Balances emotional energy and calms the nervous system' },
                  topRight: { icon: '✨', title: 'Dispels negative energy and soothes emotional trauma' },
                  bottomLeft: { icon: '🧠', title: 'Promotes clarity of mind and heartfelt communication' },
                  bottomRight: { icon: '👁️', title: 'Enhances intuition and feminine energy flow' }
                })}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                Original Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlusLayout;