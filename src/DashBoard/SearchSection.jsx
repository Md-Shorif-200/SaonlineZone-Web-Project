import React, { useState } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';


const demoCategories = [
    'Technology',
    'Business',
    'Health & Wellness',
    'Travel',
    'Food & Cooking',
    'Sports',
    'Entertainment',
    'Education',
    'Fashion',
    'Science',
    'Arts & Culture',
    'Finance',
    'Lifestyle',
    'Photography',
    'Gaming'
];

const demoSubCategories = {
    'Technology': [
        'Web Development',
        'Mobile Apps',
        'Artificial Intelligence',
        'Cybersecurity',
        'Cloud Computing',
        'Software Reviews',
        'Hardware',
        'Blockchain',
        'IoT',
        'Data Science'
    ],
    'Business': [
        'Entrepreneurship',
        'Marketing',
        'E-commerce',
        'Startups',
        'Leadership',
        'Investment',
        'Small Business',
        'Corporate Strategy',
        'Sales',
        'Business Analytics'
    ],
    'Health & Wellness': [
        'Fitness',
        'Nutrition',
        'Mental Health',
        'Medical News',
        'Yoga',
        'Diet Plans',
        'Health Tips',
        'Disease Prevention',
        'Alternative Medicine',
        'Healthcare Technology'
    ],
    'Travel': [
        'Destinations',
        'Travel Tips',
        'Budget Travel',
        'Luxury Travel',
        'Adventure Travel',
        'Cultural Tourism',
        'Food Tourism',
        'Travel Photography',
        'Travel Gear',
        'Solo Travel'
    ],
    'Food & Cooking': [
        'Recipes',
        'Restaurant Reviews',
        'Baking',
        'Healthy Eating',
        'International Cuisine',
        'Cooking Techniques',
        'Food Photography',
        'Wine & Beverages',
        'Vegetarian/Vegan',
        'Kitchen Equipment'
    ],
    'Sports': [
        'Football',
        'Basketball',
        'Soccer',
        'Tennis',
        'Baseball',
        'Olympics',
        'Fitness Training',
        'Sports News',
        'Extreme Sports',
        'Sports Technology'
    ],
    'Entertainment': [
        'Movies',
        'TV Shows',
        'Music',
        'Celebrity News',
        'Books',
        'Podcasts',
        'Theater',
        'Streaming',
        'Pop Culture',
        'Events'
    ],
    'Education': [
        'Online Learning',
        'Study Tips',
        'Career Development',
        'Skill Building',
        'University Life',
        'Educational Technology',
        'Language Learning',
        'Professional Certification',
        'Research',
        'Academic Writing'
    ],
    'Fashion': [
        'Fashion Trends',
        'Style Tips',
        'Designer Fashion',
        'Street Style',
        'Beauty',
        'Accessories',
        'Sustainable Fashion',
        'Fashion History',
        'Makeup',
        'Fashion Photography'
    ],
    'Science': [
        'Physics',
        'Biology',
        'Chemistry',
        'Environmental Science',
        'Space Exploration',
        'Medical Research',
        'Climate Change',
        'Scientific Discoveries',
        'Technology Innovation',
        'Research Methods'
    ],
    'Arts & Culture': [
        'Visual Arts',
        'Literature',
        'History',
        'Museum Exhibitions',
        'Cultural Events',
        'Architecture',
        'Sculpture',
        'Digital Art',
        'Cultural Heritage',
        'Art Criticism'
    ],
    'Finance': [
        'Personal Finance',
        'Investment Strategies',
        'Cryptocurrency',
        'Stock Market',
        'Banking',
        'Insurance',
        'Real Estate',
        'Retirement Planning',
        'Tax Planning',
        'Financial Technology'
    ],
    'Lifestyle': [
        'Home Decor',
        'Relationships',
        'Personal Development',
        'Productivity',
        'Hobbies',
        'Family Life',
        'Self-Care',
        'Minimalism',
        'Sustainability',
        'Life Hacks'
    ],
    'Photography': [
        'Portrait Photography',
        'Landscape Photography',
        'Wedding Photography',
        'Street Photography',
        'Photo Editing',
        'Camera Reviews',
        'Photography Techniques',
        'Wildlife Photography',
        'Photography Business',
        'Mobile Photography'
    ],
    'Gaming': [
        'Video Game Reviews',
        'Gaming News',
        'Esports',
        'Mobile Gaming',
        'PC Gaming',
        'Console Gaming',
        'Game Development',
        'Gaming Hardware',
        'Indie Games',
        'Virtual Reality'
    ]
};

const demoCountries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'South Korea',
    'China',
    'India',
    'Brazil',
    'Mexico',
    'Spain',
    'Italy',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
    'Switzerland',
    'Austria',
    'Belgium',
    'Ireland',
    'Portugal',
    'Finland',
    'New Zealand',
    'Singapore',
    'Hong Kong',
    'Taiwan',
    'Thailand',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'Vietnam',
    'South Africa',
    'Egypt',
    'Nigeria',
    'Kenya',
    'Morocco',
    'Argentina',
    'Chile',
    'Colombia',
    'Peru',
    'Russia',
    'Poland',
    'Czech Republic',
    'Hungary',
    'Romania',
    'Greece',
    'Turkey',
    'Israel',
    'UAE'
];

const SearchSection = ({
    categories = demoCategories,
    subCategories = demoSubCategories,
    countries = demoCountries,
    onSearchChange = (searchTerm) => console.log('Search:', searchTerm),
    onFilterChange = (filters) => console.log('Filters:', filters)
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        setSelectedSubCategory('');
        onFilterChange({ category: value, subCategory: '', country: selectedCountry });
    };

    const handleSubCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedSubCategory(value);
        onFilterChange({ category: selectedCategory, subCategory: value, country: selectedCountry });
    };

    const handleCountryChange = (e) => {
        const value = e.target.value;
        setSelectedCountry(value);
        onFilterChange({ category: selectedCategory, subCategory: selectedSubCategory, country: value });
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearchChange('');
    };

    const clearAllFilters = () => {
        setSelectedCategory('');
        setSelectedSubCategory('');
        setSelectedCountry('');
        onFilterChange({ category: '', subCategory: '', country: '' });
    };

    const hasActiveFilters = selectedCategory || selectedSubCategory || selectedCountry;
    const activeFilterCount = [selectedCategory, selectedSubCategory, selectedCountry].filter(Boolean).length;

    return (
        <div className="bg-gradient-to-r from-white to-gray-50/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 mb-8 overflow-hidden">
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Search & Filter Posts</h3>
                            <p className="text-indigo-100 text-sm">
                                {categories.length} categories • {countries.length} countries
                            </p>
                        </div>
                    </div>
                    
                    
                    <button
                        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                        className="lg:hidden flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg text-white hover:bg-white/30 transition-all duration-200"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            
            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    
                    <div className="lg:w-2/5">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Search Posts
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search by title, content, author..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200 hover:border-gray-300 bg-white/70"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-700">
                                    <span className="font-medium">Searching for:</span> 
                                    <span className="font-semibold"> "{searchTerm}"</span>
                                </p>
                            </div>
                        )}

                        
                        <div className="mt-4 text-xs text-gray-500">
                            <p>💡 Try searching: "web development", "travel tips", "healthy recipes"</p>
                        </div>
                    </div>

                    
                    <div className={`lg:w-3/5 ${isFilterExpanded ? 'block' : 'hidden lg:block'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Filter Options
                                {activeFilterCount > 0 && (
                                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {activeFilterCount} active
                                    </span>
                                )}
                            </label>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 transition-colors duration-200"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Clear All</span>
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                                    Category ({categories.length})
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 bg-white/70 hover:border-gray-300 transition-all duration-200 appearance-none cursor-pointer"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>

                            
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                                    Sub Category 
                                    {selectedCategory && subCategories[selectedCategory] && 
                                        ` (${subCategories[selectedCategory].length})`
                                    }
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSubCategory}
                                        onChange={handleSubCategoryChange}
                                        disabled={!selectedCategory}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 bg-white/70 hover:border-gray-300 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
                                    >
                                        <option value="">
                                            {selectedCategory ? 'All Sub Categories' : 'Select category first'}
                                        </option>
                                        {selectedCategory && subCategories[selectedCategory]?.map(subCat => (
                                            <option key={subCat} value={subCat}>{subCat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>

                            
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                                    Country ({countries.length})
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 bg-white/70 hover:border-gray-300 transition-all duration-200 appearance-none cursor-pointer"
                                    >
                                        <option value="">All Countries</option>
                                        {countries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        
                        {hasActiveFilters && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                <p className="text-sm font-medium text-blue-800 mb-2">Active Filters:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCategory && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                            📂 {selectedCategory}
                                        </span>
                                    )}
                                    {selectedSubCategory && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                            🏷️ {selectedSubCategory}
                                        </span>
                                    )}
                                    {selectedCountry && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                            🌍 {selectedCountry}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        
                        {!hasActiveFilters && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-medium text-gray-700 mb-2">💡 Quick Filters:</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('Technology');
                                            onFilterChange({ category: 'Technology', subCategory: '', country: selectedCountry });
                                        }}
                                        className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                                    >
                                        Technology
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('Travel');
                                            onFilterChange({ category: 'Travel', subCategory: '', country: selectedCountry });
                                        }}
                                        className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                                    >
                                        Travel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedCountry('United States');
                                            onFilterChange({ category: selectedCategory, subCategory: selectedSubCategory, country: 'United States' });
                                        }}
                                        className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                                    >
                                        United States
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;