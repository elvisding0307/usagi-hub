import Link from "next/link";
import { Search, Filter, Download, Eye, Play, Tag, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SearchPage() {
  // 模拟搜索结果数据
  const searchResults = {
    emojis: Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      title: `搜索结果表情包 ${index + 1}`,
      tags: ['可爱', '搞笑', '动漫'],
      downloadCount: Math.floor(Math.random() * 1000) + 100,
      emoji: ['🐰', '🐱', '🐶', '🐼', '🦊', '🐻'][index % 6]
    })),
    videos: Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      title: `搜索结果视频 ${index + 1}`,
      description: `高质量视频素材`,
      duration: `00:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      downloadCount: Math.floor(Math.random() * 1000) + 100,
      viewCount: Math.floor(Math.random() * 5000) + 500,
      tags: ['特效', '转场', '背景']
    }))
  };

  const hotTags = ['可爱', '搞笑', '动漫', '萌系', '治愈', '二次元', '特效', '转场', '背景', '粒子'];
  const recentSearches = ['可爱兔子', '转场特效', '粒子动画', '萌系表情'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <Header showSearchBar={false} />
      
      {/* 搜索区域 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">搜索素材</h1>
            
            {/* 搜索框 */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="搜索表情包或视频素材..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            </div>
            
            {/* 搜索选项 */}
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <label className="flex items-center">
                <input type="radio" name="searchType" value="all" defaultChecked className="text-amber-600 focus:ring-amber-500" />
                <span className="ml-2 text-gray-700">全部</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="searchType" value="emojis" className="text-amber-600 focus:ring-amber-500" />
                <span className="ml-2 text-gray-700">表情包</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="searchType" value="videos" className="text-amber-600 focus:ring-amber-500" />
                <span className="ml-2 text-gray-700">视频素材</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏 */}
          <div className="lg:w-64 flex-shrink-0">
            {/* 热门标签 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-amber-600" />
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {hotTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 最近搜索 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">最近搜索</h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* 搜索提示 */}
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">搜索提示</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 使用关键词搜索更精准</li>
                <li>• 可以搜索标签和分类</li>
                <li>• 支持中英文搜索</li>
                <li>• 尝试使用同义词</li>
              </ul>
            </div>
          </div>

          {/* 搜索结果 */}
          <div className="flex-1">
            {/* 表情包结果 */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">表情包结果</h2>
                <Link href="/emojis" className="text-amber-600 hover:text-amber-700 font-medium">
                  查看全部 →
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.emojis.map((emoji) => (
                  <Link
                    key={emoji.id}
                    href={`/emojis/${emoji.id}`}
                    className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="text-4xl text-center mb-3 group-hover:scale-110 transition-transform">
                      {emoji.emoji}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 text-center">
                      {emoji.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {emoji.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Download className="h-3 w-3 mr-1" />
                      <span>{emoji.downloadCount}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 视频结果 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">视频素材结果</h2>
                <Link href="/videos" className="text-amber-600 hover:text-amber-700 font-medium">
                  查看全部 →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.videos.map((video) => (
                  <Link
                    key={video.id}
                    href={`/videos/${video.id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    {/* 视频缩略图 */}
                    <div className="relative aspect-video bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center group-hover:bg-opacity-70 transition-all">
                          <Play className="h-5 w-5 text-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {video.description}
                      </p>
                      
                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {video.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* 统计信息 */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{video.viewCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-3 w-3" />
                            <span>{video.downloadCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 分页 */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  上一页
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 rounded-lg ${
                      page === 1
                        ? 'bg-amber-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}