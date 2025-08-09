import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Palette,
  Sun,
  Moon,
  Globe,
  DollarSign,
  Save,
  Lightbulb
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const Settings = () => {

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [isSaving, setIsSaving] = useState(false);


  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' }
  ];


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    setCurrency(savedCurrency);
    

    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);


  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };


  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };


  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };


  const handleSaveSettings = async () => {
    setIsSaving(true);
    

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    

    alert('Settings saved successfully!');
  };


  const currentLanguage = languages.find(lang => lang.code === language);
  const currentCurrency = currencies.find(curr => curr.code === currency);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        
        <div className="text-center mb-6 sm:mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-indigo-600 to-blue-700'
              : 'bg-gradient-to-r from-indigo-500 to-blue-600'
          }`}>
            <SettingsIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Settings
          </h1>
          <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Customize your experience and manage your account preferences
          </p>
        </div>

        
        <div className={`rounded-2xl sm:rounded-3xl shadow-xl border overflow-hidden ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
        }`}>
          
          
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Account Settings</h2>
            <p className="text-indigo-100 mt-1 text-sm sm:text-base">Manage your preferences and account settings</p>
          </div>

          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Appearance
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 ${
                    theme === 'light'
                      ? 'border-indigo-500 bg-indigo-50'
                      : theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full border border-gray-300 flex items-center justify-center">
                      <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold text-sm sm:text-base ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Light Mode
                      </p>
                      <p className={`text-xs sm:text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Clean and bright interface
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 ${
                    theme === 'dark'
                      ? 'border-indigo-500 bg-indigo-900'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full border border-gray-600 flex items-center justify-center">
                      <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold text-sm sm:text-base ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Dark Mode
                      </p>
                      <p className={`text-xs sm:text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Easy on the eyes
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Language
                </h3>
              </div>
              
              <div className={`p-3 sm:p-4 rounded-xl border ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-700'
                  : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <span className={`font-medium text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Current Language
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg sm:text-xl">{currentLanguage?.flag}</span>
                    <span className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {currentLanguage?.name}
                    </span>
                  </div>
                </div>
                
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className={`w-full p-3 rounded-lg border transition-colors text-sm sm:text-base ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-800 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Currency
                </h3>
              </div>
              
              <div className={`p-3 sm:p-4 rounded-xl border ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-700'
                  : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <span className={`font-medium text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Current Currency
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg sm:text-xl">{currentCurrency?.flag}</span>
                    <span className={`font-bold text-sm sm:text-base ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {currentCurrency?.symbol}
                    </span>
                    <span className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {currentCurrency?.name}
                    </span>
                  </div>
                </div>
                
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className={`w-full p-3 rounded-lg border transition-colors text-sm sm:text-base ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-800 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.symbol} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            
            <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-200 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSaving ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        
        <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
          theme === 'dark'
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className={`font-semibold mb-2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Settings Information
              </h4>
              <ul className={`space-y-1 text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li>• Theme settings are applied immediately and saved to your browser</li>
                <li>• Language changes will be reflected across the entire application</li>
                <li>• Currency settings affect how monetary values are displayed</li>
                <li>• All settings are automatically synchronized across your devices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;