import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';
import { ChromePicker } from 'react-color';

const BookSettings = () => {
      const [isCustomizerOpen, setCustomizerOpen] = useState(false);

      // Example state for book details and settings
      const [bookDetails, setBookDetails] = useState({
            title: 'Sample Book Title',
            description: 'This is a brief description of the sample book.',
            showDescriptionFirst: true,
      });

      const [settings, setSettings] = useState({
            backgroundColor: '#ffffff',
            fontColor: '#000000',
            titleSize: 24,
            descriptionSize: 16,
            darkMode: false,
            borderRadius: 8,
            showAuthor: true,
            authorName: 'Author Name',
            bookCover: '',
            fontFamily: 'Arial',
            padding: 16,
            shadow: true,
            opacity: 1,
            borderColor: '#cccccc',
            showPublishedDate: false,
            publishedDate: '2024-01-01',
            textAlign: 'left', // Default alignment
            lineHeight: 1.5,
            letterSpacing: 1,
            showGenre: true,
            genre: 'Fiction',
      });

      // Toggle customizer visibility
      const toggleCustomizer = () => {
            setCustomizerOpen(!isCustomizerOpen);
      };

      // Update book details
      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setBookDetails((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      // Update settings
      const handleSettingsChange = (e) => {
            const { name, value } = e.target;
            setSettings((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      return (
            <div className={`flex h-screen bg-gray-50 relative ${settings.darkMode ? 'bg-gray-800' : ''}`}>
                  {/* Left Side - Book Preview */}
                  <div
                        className={`flex-1 p-8`}
                        style={{
                              backgroundColor: settings.backgroundColor,
                              color: settings.fontColor,
                              borderRadius: settings.borderRadius,
                              boxShadow: settings.shadow ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
                              padding: `${settings.padding}px`,
                        }}
                  >
                        <h1
                              style={{
                                    fontSize: `${settings.titleSize}px`,
                                    fontFamily: settings.fontFamily,
                                    textAlign: settings.textAlign, // Apply text alignment
                              }}
                        >
                              {bookDetails.title}
                        </h1>
                        {settings.showDescriptionFirst && (
                              <p
                                    style={{
                                          fontSize: `${settings.descriptionSize}px`,
                                          lineHeight: settings.lineHeight,
                                          letterSpacing: `${settings.letterSpacing}px`,
                                          textAlign: settings.textAlign, // Apply text alignment
                                    }}
                              >
                                    {bookDetails.description}
                              </p>
                        )}
                        {settings.showAuthor && <p style={{ textAlign: settings.textAlign }}>{`By: ${settings.authorName}`}</p>}
                        {settings.showPublishedDate && <p style={{ textAlign: settings.textAlign }}>{`Published on: ${settings.publishedDate}`}</p>}
                        {settings.showGenre && <p style={{ textAlign: settings.textAlign }}>{`Genre: ${settings.genre}`}</p>}
                  </div>

                  {/* Right Side - Customizer Panel */}
                  <motion.div
                        className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ${isCustomizerOpen ? 'translate-x-0' : 'translate-x-full'}`}
                        initial={{ x: '100%' }}
                        animate={{ x: isCustomizerOpen ? '0%' : '100%' }}
                  >
                        <div className="p-6">
                              <h2 className="text-2xl font-bold mb-4">Book Settings</h2>
                              <label className="block mb-2">
                                    Background Color:
                                    <ChromePicker
                                          color={settings.backgroundColor}
                                          onChangeComplete={(color) => handleSettingsChange({ target: { name: 'backgroundColor', value: color.hex } })}
                                    />
                              </label>
                              <label className="block mb-2">
                                    Font Color:
                                    <ChromePicker
                                          color={settings.fontColor}
                                          onChangeComplete={(color) => handleSettingsChange({ target: { name: 'fontColor', value: color.hex } })}
                                    />
                              </label>
                              <label className="block mb-2">
                                    Title Size:
                                    <input
                                          type="range"
                                          min="16"
                                          max="48"
                                          name="titleSize"
                                          value={settings.titleSize}
                                          onChange={handleSettingsChange}
                                          className="mt-1 w-full"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Description Size:
                                    <input
                                          type="range"
                                          min="12"
                                          max="32"
                                          name="descriptionSize"
                                          value={settings.descriptionSize}
                                          onChange={handleSettingsChange}
                                          className="mt-1 w-full"
                                    />
                              </label>
                              <label className="block mb-2">
                                    <input
                                          type="checkbox"
                                          name="darkMode"
                                          checked={settings.darkMode}
                                          onChange={handleSettingsChange}
                                          className="mr-2"
                                    />
                                    Dark Mode
                              </label>
                              <label className="block mb-2">
                                    Border Radius:
                                    <input
                                          type="number"
                                          name="borderRadius"
                                          value={settings.borderRadius}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Show Author:
                                    <input
                                          type="checkbox"
                                          name="showAuthor"
                                          checked={settings.showAuthor}
                                          onChange={handleSettingsChange}
                                          className="mr-2"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Author Name:
                                    <input
                                          type="text"
                                          name="authorName"
                                          value={settings.authorName}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Book Cover URL:
                                    <input
                                          type="text"
                                          name="bookCover"
                                          value={settings.bookCover}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Font Family:
                                    <select
                                          name="fontFamily"
                                          value={settings.fontFamily}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    >
                                          <option value="Arial">Arial</option>
                                          <option value="Georgia">Georgia</option>
                                          <option value="Times New Roman">Times New Roman</option>
                                          <option value="Courier New">Courier New</option>
                                    </select>
                              </label>
                              <label className="block mb-2">
                                    Padding:
                                    <input
                                          type="number"
                                          name="padding"
                                          value={settings.padding}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Shadow:
                                    <input
                                          type="checkbox"
                                          name="shadow"
                                          checked={settings.shadow}
                                          onChange={handleSettingsChange}
                                          className="mr-2"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Opacity:
                                    <input
                                          type="range"
                                          min="0"
                                          max="1"
                                          step="0.1"
                                          name="opacity"
                                          value={settings.opacity}
                                          onChange={handleSettingsChange}
                                          className="mt-1 w-full"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Border Color:
                                    <ChromePicker
                                          color={settings.borderColor}
                                          onChangeComplete={(color) => handleSettingsChange({ target: { name: 'borderColor', value: color.hex } })}
                                    />
                              </label>
                              <label className="block mb-2">
                                    Show Published Date:
                                    <input
                                          type="checkbox"
                                          name="showPublishedDate"
                                          checked={settings.showPublishedDate}
                                          onChange={handleSettingsChange}
                                          className="mr-2"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Published Date:
                                    <input
                                          type="date"
                                          name="publishedDate"
                                          value={settings.publishedDate}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Text Alignment:
                                    <select
                                          name="textAlign"
                                          value={settings.textAlign}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    >
                                          <option value="left">Left</option>
                                          <option value="center">Center</option>
                                          <option value="right">Right</option>
                                    </select>
                              </label>
                              <label className="block mb-2">
                                    Line Height:
                                    <input
                                          type="number"
                                          name="lineHeight"
                                          value={settings.lineHeight}
                                          onChange={handleSettingsChange}
                                          step="0.1"
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Letter Spacing:
                                    <input
                                          type="number"
                                          name="letterSpacing"
                                          value={settings.letterSpacing}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Show Genre:
                                    <input
                                          type="checkbox"
                                          name="showGenre"
                                          checked={settings.showGenre}
                                          onChange={handleSettingsChange}
                                          className="mr-2"
                                    />
                              </label>
                              <label className="block mb-2">
                                    Genre:
                                    <input
                                          type="text"
                                          name="genre"
                                          value={settings.genre}
                                          onChange={handleSettingsChange}
                                          className="mt-1 block w-full p-2 border rounded-md"
                                    />
                              </label>
                        </div>
                  </motion.div>
                  <button
                        onClick={toggleCustomizer}
                        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-md"
                  >
                        <FiSettings />
                  </button>
            </div>
      );
};

export default BookSettings;
