import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, Share, Save, X } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function DashboardProfile() {
  const fileInputRef = useRef(null);

  // States
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "Uswaasif",
    handle: "uswaasif768",
    bio: "",
    avatarUrl: null
  });

  // Load from local storage
  useEffect(() => {
    const userEmail = localStorage.getItem("orbit_auth_email") || "reader@orbit.news";
    const defaultUsername = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);
    
    setProfileData({
      username: localStorage.getItem("orbit_profile_username") || defaultUsername,
      handle: localStorage.getItem("orbit_profile_handle") || userEmail.split('@')[0].toLowerCase() + "768",
      bio: localStorage.getItem("orbit_profile_bio") || "",
      avatarUrl: localStorage.getItem("orbit_profile_avatar") || null
    });
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied to clipboard!");
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    localStorage.setItem("orbit_profile_username", profileData.username);
    localStorage.setItem("orbit_profile_handle", profileData.handle);
    localStorage.setItem("orbit_profile_bio", profileData.bio);
    if (profileData.avatarUrl) {
      localStorage.setItem("orbit_profile_avatar", profileData.avatarUrl);
    }
    setIsEditing(false);
  };

  return (
    <motion.div 
      className="fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16" 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      
      {/* Top Section: Avatar and Name */}
      <motion.div variants={itemVariants} className="flex items-center gap-6 mb-8">
        <div className="relative">
          {/* Large Red Accent Avatar */}
          <div 
            className={`w-32 h-32 rounded-full bg-accent-red text-white flex items-center justify-center text-5xl font-bold shadow-md overflow-hidden ${isEditing ? 'cursor-pointer' : ''}`}
            onClick={handleAvatarClick}
          >
            {profileData.avatarUrl ? (
              <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              profileData.username.charAt(0).toUpperCase()
            )}
          </div>
          
          {/* Edit Badge overlapping bottom right (only visible when editing) */}
          {isEditing && (
            <button 
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 hover:bg-gray-50 transition-all"
            >
              <Edit2 className="w-4 h-4 text-black" />
            </button>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
        
        <div className="flex flex-col flex-1 max-w-sm">
          {isEditing ? (
            <>
              <input 
                type="text" 
                value={profileData.username}
                onChange={e => setProfileData(p => ({ ...p, username: e.target.value }))}
                className="text-3xl font-bold text-foreground mb-1 tracking-tight border-b border-rule bg-transparent focus:outline-none focus:border-accent-red"
                placeholder="Name"
              />
              <input 
                type="text" 
                value={profileData.handle}
                onChange={e => setProfileData(p => ({ ...p, handle: e.target.value }))}
                className="text-muted-foreground text-sm border-b border-rule bg-transparent focus:outline-none focus:border-accent-red mt-2"
                placeholder="Handle"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-foreground mb-1 tracking-tight">
                {profileData.username}
              </h1>
              <p className="text-muted-foreground text-sm">
                {profileData.handle}
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* Followers & Following */}
      <motion.div variants={itemVariants} className="flex gap-1 text-sm mb-6 text-foreground font-medium">
        <span>0 followers</span>
        <span className="mx-1">·</span>
        <span>0 following</span>
      </motion.div>

      {/* Bio Section */}
      <motion.div variants={itemVariants} className="mb-8 max-w-lg">
        {isEditing ? (
          <textarea
            value={profileData.bio}
            onChange={e => setProfileData(p => ({ ...p, bio: e.target.value }))}
            className="w-full bg-background border border-rule rounded-lg p-3 text-[15px] focus:outline-none focus:border-accent-red min-h-[100px] resize-y"
            placeholder="Add a short bio to make your profile your own..."
          />
        ) : (
          profileData.bio ? (
            <p className="text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">{profileData.bio}</p>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-accent-red transition-colors flex items-center gap-2 text-[15px]"
            >
              Add a short bio to make your profile your own <Edit2 className="w-[14px] h-[14px]" />
            </button>
          )
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {isEditing ? (
          <>
            <button 
              onClick={saveProfile}
              className="px-6 py-3 bg-foreground hover:bg-accent-red text-background rounded-full font-bold text-[15px] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Save className="w-[18px] h-[18px]" /> Save changes
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-[#e9e9e9] hover:bg-[#d0d0d0] text-black rounded-full font-bold text-[15px] flex items-center gap-2 transition-colors shadow-sm"
            >
              <X className="w-[18px] h-[18px]" /> Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleShare}
              className="px-6 py-3 bg-[#e9e9e9] hover:bg-accent-red hover:text-white text-black rounded-full font-bold text-[15px] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Share className="w-[18px] h-[18px]" /> Share profile
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-[#e9e9e9] hover:bg-accent-red hover:text-white text-black rounded-full font-bold text-[15px] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Edit2 className="w-[18px] h-[18px]" /> Edit profile
            </button>
          </>
        )}
      </motion.div>

    </motion.div>
  );
}
