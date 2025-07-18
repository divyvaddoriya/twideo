import React, { useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Camera, Upload, Sparkles, ArrowRight, X } from 'lucide-react';
import { registerUser } from '@/api/auth';
import { useAuth } from '@/context/authContext';
import {toast} from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });
  const [confirmPassword , setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

const {setUser , setIsAuthenticated} = useAuth();

const navigate = useNavigate();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  const removeCover = () => {
    setCoverImage(null);
    setCoverPreview(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formdata" + formData);
    
    console.log("avtar" + coverImage?.webkitRelativePath);
    console.log("avtar" + avatar?.webkitRelativePath);
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const userData = new FormData();
    userData.append("username", formData.username);
    userData.append("fullname", formData.fullname);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
if (coverImage) userData.append("coverImg", coverImage);
if (avatar) userData.append("avatar", avatar);


 const user = await registerUser(userData);
 
 if(user) {
  setUser(user);
  setIsAuthenticated(true);
  setIsLoading(false);
   toast.success(`Welcome back, ${user.name || "User"}!`, {
          position: "top-right",
          autoClose: 3000,
        });
  navigate("/")
 }
else{
  return;
}
    // Simulate API call
    // setTimeout(() => {
    //   console.log('Register data:', { ...formData, avatar, coverImage });
    //   setIsLoading(false);
    // }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Twideo
            </span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Join Twideo</h1>
              <p className="text-gray-400">Create your account and start sharing</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Images Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Profile Setup</h3>
                
                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Cover Image (Optional)
                  </label>
                  <div className="relative">
                    <div
                      className={`relative h-32 rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                        coverPreview
                          ? 'border-green-500/50 bg-green-500/5'
                          : 'border-gray-600/50 hover:border-gray-500/50 bg-gray-800/30'
                      }`}
                    >
                      {coverPreview ? (
                        <div className="relative h-full">
                          <img
                            src={coverPreview}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <button
                              type="button"
                              onClick={removeCover}
                              className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => coverInputRef.current?.click()}
                          className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <Upload className="w-8 h-8 mb-2" />
                          <span className="text-sm">Upload cover image</span>
                        </button>
                      )}
                    </div>
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Avatar */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Profile Picture 
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div
                        className={`w-20 h-20 rounded-full border-2 border-dashed transition-all duration-300 overflow-hidden ${
                          avatarPreview
                            ? 'border-green-500/50 bg-green-500/5'
                            : 'border-gray-600/50 hover:border-gray-500/50 bg-gray-800/30'
                        }`}
                      >
                        {avatarPreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={avatarPreview}
                              alt="Avatar preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                              <button
                                type="button"
                                onClick={removeAvatar}
                                className="p-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => avatarInputRef.current?.click()}
                            className="w-full h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                          >
                            <Camera className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl border border-gray-600/50 transition-all duration-300"
                        
                      >
                        Choose Avatar
                      </button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Choose username"
                      required
                    />
                  </div>
                </div>
                {/* fullname */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    FullName
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                      className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Choose FullName"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-12 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Create password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) =>  setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-12 py-4 rounded-2xl border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <p className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-8">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;