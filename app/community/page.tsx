"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star, Heart, MessageCircle, Share2, Camera, TrendingUp,
  Award, Users, BookOpen, ChevronRight, ThumbsUp
} from "lucide-react";
import { recipes } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const COMMUNITY_POSTS = [
  {
    id: "p1",
    user: { name: "Priya Sharma", avatar: "https://i.pravatar.cc/60?img=1", badge: "Master Chef" },
    recipe: recipes[0],
    photo: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
    caption: "Made this butter chicken for Sunday dinner — absolute perfection! The trick is to cook the masala until the oil separates. 🍛❤️",
    likes: 342,
    comments: 28,
    rating: 5,
    timeAgo: "2 hours ago",
    liked: false,
  },
  {
    id: "p2",
    user: { name: "Marco Bianco", avatar: "https://i.pravatar.cc/60?img=3", badge: "Home Cook" },
    recipe: recipes[1],
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    caption: "First time making homemade pizza and it came out better than my local pizzeria! The key is a screaming hot oven 🔥🍕",
    likes: 218,
    comments: 15,
    rating: 5,
    timeAgo: "5 hours ago",
    liked: false,
  },
  {
    id: "p3",
    user: { name: "Yuki Tanaka", avatar: "https://i.pravatar.cc/60?img=5", badge: "Foodie" },
    recipe: recipes[2],
    photo: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80",
    caption: "Spent the whole afternoon making California rolls. So meditative! The family was thrilled 🍱🎌",
    likes: 176,
    comments: 22,
    rating: 4,
    timeAgo: "1 day ago",
    liked: false,
  },
  {
    id: "p4",
    user: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/60?img=9", badge: "Nutritionist" },
    recipe: recipes[4],
    photo: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&q=80",
    caption: "My go-to healthy breakfast! Adding a soft-poached egg makes this avocado toast absolutely divine. 🥑",
    likes: 523,
    comments: 41,
    rating: 5,
    timeAgo: "2 days ago",
    liked: false,
  },
];

const TOP_CHEFS = [
  { name: "Ranveer Brar", avatar: "https://i.pravatar.cc/80?img=11", specialty: "Indian Cuisine", recipes: 142, followers: "24.5K" },
  { name: "Marie Dubois", avatar: "https://i.pravatar.cc/80?img=12", specialty: "French Pastry", recipes: 98, followers: "18.2K" },
  { name: "Kenji Lopez", avatar: "https://i.pravatar.cc/80?img=13", specialty: "Japanese & Fusion", recipes: 215, followers: "31.8K" },
  { name: "Fatima Al-Hassan", avatar: "https://i.pravatar.cc/80?img=14", specialty: "Middle Eastern", recipes: 76, followers: "12.4K" },
];

function CommunityPost({ post: initialPost }: { post: typeof COMMUNITY_POSTS[0] }) {
  const [liked, setLiked] = useState(initialPost.liked);
  const [likes, setLikes] = useState(initialPost.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      {/* User header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <Image
          src={initialPost.user.avatar}
          alt={initialPost.user.name}
          width={44}
          height={44}
          className="rounded-full"
        />
        <div className="flex-1">
          <div className="font-bold text-gray-900 dark:text-white text-sm">{initialPost.user.name}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Badge variant="orange">{initialPost.user.badge}</Badge>
            <span className="text-xs text-gray-400">{initialPost.timeAgo}</span>
          </div>
        </div>
        <Link href={`/recipe/${initialPost.recipe.id}`}>
          <span className="text-xs text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1">
            View Recipe <ChevronRight className="w-3 h-3" />
          </span>
        </Link>
      </div>

      {/* Photo */}
      <div className="relative h-64">
        <Image
          src={initialPost.photo}
          alt={initialPost.recipe.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-3 right-3 flex gap-1">
          {[1,2,3,4,5].map((i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i <= initialPost.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{initialPost.recipe.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{initialPost.caption}</p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 text-sm font-semibold transition ${
                liked ? "text-red-500" : "text-gray-500 hover:text-red-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              {likes}
            </button>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-blue-500 transition">
              <MessageCircle className="w-4 h-4" />
              {initialPost.comments}
            </button>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="min-h-screen pt-header bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Community</h1>
          <p className="text-gray-500 dark:text-gray-400">Share your cooking adventures and discover what others are making</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Community Members", value: "524K", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Recipes Shared", value: "89K", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
            { label: "Reviews Posted", value: "2.1M", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
            { label: "Photos Uploaded", value: "340K", icon: Camera, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-5`}>
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-gray-900 rounded-2xl p-1 shadow-sm mb-8">
          {[
            { id: "feed", label: "Community Feed", icon: TrendingUp },
            { id: "chefs", label: "Top Chefs", icon: Award },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feed Tab */}
        {activeTab === "feed" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {COMMUNITY_POSTS.map((post) => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Top Chefs Tab */}
        {activeTab === "chefs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOP_CHEFS.map((chef, i) => (
              <div key={chef.name} className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                <div className="relative inline-block mb-4">
                  <Image
                    src={chef.avatar}
                    alt={chef.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto"
                  />
                  {i < 3 && (
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-sm">
                      {["🥇", "🥈", "🥉"][i]}
                    </div>
                  )}
                </div>
                <h3 className="font-black text-gray-900 dark:text-white mb-1">{chef.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{chef.specialty}</p>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="font-black text-gray-900 dark:text-white text-sm">{chef.recipes}</div>
                    <div className="text-xs text-gray-400">Recipes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-gray-900 dark:text-white text-sm">{chef.followers}</div>
                    <div className="text-xs text-gray-400">Followers</div>
                  </div>
                </div>
                <button className="w-full py-2 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 text-sm font-semibold hover:bg-orange-100 dark:hover:bg-orange-900/30 transition flex items-center justify-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5" /> Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
