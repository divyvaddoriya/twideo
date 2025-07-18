import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, Video, Image, X, Sparkles, Cloud } from 'lucide-react';
import { addVideo } from '@/api/video';

const Upload = () => {
  const [uploadType, setUploadType] = useState<'video' | 'post'>('video');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    visibility: 'public',
    thumbnail: null as File | null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setFormData({ ...formData, thumbnail: null });
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadType === 'video') {
      // Validation
      if (!selectedFile) {
        alert('Please select a video file');
        return;
      }
      
      if (!formData.thumbnail) {
        alert('Please select a thumbnail image');
        return;
      }

      if (!formData.title.trim()) {
        alert('Please enter a video title');
        return;
      }

      // Create FormData for video upload
      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("isPublished", formData.visibility === 'public' ? 'true' : 'false');
      uploadData.append("videoFile", selectedFile);
      uploadData.append("thumbnail", formData.thumbnail);

      console.log('Video upload data prepared:', {
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        isPublished: formData.visibility,
        videoFile: selectedFile.name,
        thumbnail: formData.thumbnail.name
      });

      // Here you would call your API
   const response =   await addVideo(uploadData);
      console.log("video uploaded succesfully" , response);
      return;  
    } else {
      console.log("Currently we only support video posting");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
            <div className="bg-gray-900 rounded-3xl p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Upload Content
                  </h1>
                  <p className="text-xl text-gray-300">
                    Share your creativity with the world
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Type Selector */}
        <div className="flex space-x-4 mb-12">
          <button
            onClick={() => setUploadType('video')}
            className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              uploadType === 'video'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
            }`}
          >
            {uploadType === 'video' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
            )}
            <Video className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Upload Video</span>
            {uploadType === 'video' && <Sparkles className="w-5 h-5 relative z-10" />}
          </button>
          
          <button
            onClick={() => setUploadType('post')}
            className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              uploadType === 'post'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
            }`}
          >
            {uploadType === 'post' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
            )}
            <Image className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Create Post</span>
            {uploadType === 'post' && <Sparkles className="w-5 h-5 relative z-10" />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload Area */}
          {uploadType === 'video' && (
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white mb-4">
                Video File <span className="text-red-400">*</span>
              </label>
              <div
                className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10 scale-105'
                    : 'border-gray-600/50 hover:border-gray-500/50 bg-gray-800/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="text-white font-semibold text-lg block">{selectedFile.name}</span>
                        <span className="text-gray-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="p-2 hover:bg-gray-700 rounded-xl transition-colors duration-200"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto">
                      <UploadIcon className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xl mb-2">
                        Drag and drop your video file here
                      </p>
                      <p className="text-gray-400 text-lg">
                        or click to browse files
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                    >
                      <span className="relative z-10">Select File</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-800/50 backdrop-blur-sm text-white px-6 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                  placeholder={uploadType === 'video' ? 'Enter video title...' : 'What\'s on your mind?'}
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full bg-gray-800/50 backdrop-blur-sm text-white px-6 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                  placeholder="Enter tags separated by commas..."
                />
              </div>

              {/* Visibility */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="w-full bg-gray-800/50 backdrop-blur-sm text-white px-6 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                >
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Description */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full bg-gray-800/50 backdrop-blur-sm text-white px-6 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none resize-none transition-all duration-300"
                  placeholder="Tell viewers about your content..."
                />
              </div>

              {/* Thumbnail Upload (for videos) - Now Mandatory */}
              {uploadType === 'video' && (
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    Thumbnail <span className="text-red-400">*</span>
                  </label>
                  
                  {thumbnailPreview ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full max-w-sm h-32 object-cover rounded-2xl border border-gray-600/50"
                        />
                        <button
                          type="button"
                          onClick={removeThumbnail}
                          className="absolute -top-2 -right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => thumbnailInputRef.current?.click()}
                        className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-2xl border border-gray-600/50 transition-all duration-300"
                      >
                        Change Thumbnail
                      </button>
                    </div>
                  ) : (
                    <div
                      className="relative border-2 border-dashed border-gray-600/50 hover:border-gray-500/50 rounded-2xl p-8 text-center transition-all duration-300 bg-gray-800/30"
                    >
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                          <Image className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg mb-2">
                            Upload Thumbnail
                          </p>
                          <p className="text-gray-400">
                            Choose an eye-catching image for your video
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => thumbnailInputRef.current?.click()}
                          className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                        >
                          <span className="relative z-10">Select Thumbnail</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    className="hidden"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 1280x720 pixels, JPG or PNG format
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-8">
            <button
              type="button"
              className="px-8 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-2xl font-semibold transition-all duration-300 border border-gray-600/50"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              <span className="relative z-10">
                {uploadType === 'video' ? 'Upload Video' : 'Create Post'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;