import React, { useState } from "react";
import { ClipboardList, Plus, DollarSign, Image } from "lucide-react";

const categories = ["Category 1", "Category 2", "Category 3"];
const subCategories = {
  "Category 1": ["SubCat 1-1", "SubCat 1-2"],
  "Category 2": ["SubCat 2-1", "SubCat 2-2"],
  "Category 3": ["SubCat 3-1", "SubCat 3-2"],
};

const  Step2Details = () => {
  const [activeOnline, setActiveOnline] = useState("online");
  const [onlineFormData, setOnlineFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    amount: "",
    keywords: "",
    image: null,
    description: "",
  });

  const [offlineFormData, setOfflineFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    amount: "",
    keywords: "",
    image: null,
    description: "",
  });

  // OnChange for online form inputs
  const handleOnlineInputChange = (e) => {
    const { name, type, value, files } = e.target;
     console.log(name,type)
    setOnlineFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    console.log("Online Form Changed:", name, type === "file" ? files[0] : value);
  };

  // OnChange for offline form inputs
  const handleOfflineInputChange = (e) => {
    const { name, type, value, files } = e.target;

    setOfflineFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    console.log("Offline Form Changed:", name, type === "file" ? files[0] : value);
  };

  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-1 border border-gray-200 w-full max-w-md">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setActiveOnline("online")}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm ${
                activeOnline === "online"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Online</span>
            </button>
            <button
              onClick={() => setActiveOnline("create")}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm ${
                activeOnline === "create"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Offline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      {activeOnline === "online" ? (
        <div className="space-y-6 max-w-md mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
            Step 2: Post Details (Online)
          </h3>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
            Add your post content and specifications
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                value={onlineFormData.title}
                onChange={handleOnlineInputChange}
                placeholder="Enter post title"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                name="category"
                value={onlineFormData.category}
                onChange={handleOnlineInputChange}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sub Category *</label>
              <select
                name="subCategory"
                value={onlineFormData.subCategory}
                onChange={handleOnlineInputChange}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
                disabled={!onlineFormData.category}
              >
                <option value="">Select Sub Category</option>
                {onlineFormData.category &&
                  subCategories[onlineFormData.category]?.map((subCat) => (
                    <option key={subCat} value={subCat}>
                      {subCat}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Amount *</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={onlineFormData.amount}
                  onChange={handleOnlineInputChange}
                  placeholder="0.00"
                  className="w-full p-3 sm:p-4 pl-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Keywords</label>
            <input
              type="text"
              name="keywords"
              value={onlineFormData.keywords}
              onChange={handleOnlineInputChange}
              placeholder="Enter keywords separated by commas"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleOnlineInputChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Image className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {onlineFormData.image ? onlineFormData.image.name : "Upload Image"}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={onlineFormData.description}
              onChange={handleOnlineInputChange}
              placeholder="Enter detailed description of your post"
              rows={4}
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
              required
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-md mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
            Step 2: Post Details (Offline)
          </h3>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
            Add your post content and specifications
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                value={offlineFormData.title}
                onChange={handleOfflineInputChange}
                placeholder="Enter post title"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                name="category"
                value={offlineFormData.category}
                onChange={handleOfflineInputChange}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sub Category *</label>
              <select
                name="subCategory"
                value={offlineFormData.subCategory}
                onChange={handleOfflineInputChange}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
                disabled={!offlineFormData.category}
              >
                <option value="">Select Sub Category</option>
                {offlineFormData.category &&
                  subCategories[offlineFormData.category]?.map((subCat) => (
                    <option key={subCat} value={subCat}>
                      {subCat}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Amount *</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={offlineFormData.amount}
                  onChange={handleOfflineInputChange}
                  placeholder="0.00"
                  className="w-full p-3 sm:p-4 pl-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Keywords</label>
            <input
              type="text"
              name="keywords"
              value={offlineFormData.keywords}
              onChange={handleOfflineInputChange}
              placeholder="Enter keywords separated by commas"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleOfflineInputChange}
                className="hidden"
                id="image-upload-offline"
              />
              <label
                htmlFor="image-upload-offline"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Image className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {offlineFormData.image ? offlineFormData.image.name : "Upload Image"}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={offlineFormData.description}
              onChange={handleOfflineInputChange}
              placeholder="Enter detailed description of your post"
              rows={4}
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
              required
            />
          </div>
        </div>
      )}
    </>
  );
}
export default Step2Details