import { useState } from "react";
import { Search as SearchIcon } from "lucide-react"; // Import the Search icon with alias to avoid naming conflict

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Services', 'Digital'];
    const subCategories = {
        'Electronics': ['Smartphones', 'Laptops', 'Cameras'],
        'Fashion': ['Clothing', 'Shoes', 'Accessories'],
        'Home & Garden': ['Furniture', 'Decor', 'Tools'],
        'Services': ['Marketing', 'Design', 'Development'],
        'Digital': ['Software', 'Apps', 'Online Courses']
    };
    const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France'];


    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedSubCategory('');
        setSelectedCountry('');
    };


    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubCategory(''); // Reset subcategory when category changes
    };

    return (
        <div className="w-full">
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <SearchIcon className="w-4 h-4 text-indigo-600" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Search & Filter Posts</h3>
                    </div>
                    
                    
                    {(searchTerm || selectedCategory || selectedCountry) && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                
                <div className="space-y-4">
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search posts, keywords, descriptions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400 transition-all duration-200"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Clear search"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base bg-white appearance-none cursor-pointer transition-all duration-200"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        
                        <div className="relative">
                            <select
                                value={selectedSubCategory}
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base bg-white appearance-none cursor-pointer transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                                disabled={!selectedCategory}
                            >
                                <option value="">
                                    {selectedCategory ? 'All Sub Categories' : 'Select Category First'}
                                </option>
                                {selectedCategory && subCategories[selectedCategory]?.map(subCat => (
                                    <option key={subCat} value={subCat}>{subCat}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        
                        <div className="relative sm:col-span-2 lg:col-span-1">
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base bg-white appearance-none cursor-pointer transition-all duration-200"
                            >
                                <option value="">All Countries</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    
                    {(searchTerm || selectedCategory || selectedSubCategory || selectedCountry) && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                            <span className="text-xs sm:text-sm font-medium text-gray-500">Active filters:</span>
                            
                            {searchTerm && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs font-medium">
                                    Search: "{searchTerm}"
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="ml-1 text-indigo-600 hover:text-indigo-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            
                            {selectedCategory && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium">
                                    Category: {selectedCategory}
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('');
                                            setSelectedSubCategory('');
                                        }}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            
                            {selectedSubCategory && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs font-medium">
                                    Sub: {selectedSubCategory}
                                    <button
                                        onClick={() => setSelectedSubCategory('')}
                                        className="ml-1 text-green-600 hover:text-green-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            
                            {selectedCountry && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-medium">
                                    Country: {selectedCountry}
                                    <button
                                        onClick={() => setSelectedCountry('')}
                                        className="ml-1 text-purple-600 hover:text-purple-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;