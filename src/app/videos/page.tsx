import Link from "next/link";
import { Search, Filter, Grid, List, Play, Download, Eye, Calendar } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function VideosPage() {
  // 模拟视频素材数据
  const videos = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `精美视频素材 ${index + 1}`,
    description: `高质量视频素材，适合各种场景使用`,
    thumbnail: `/video-thumb-${index + 1}.jpg`,
    duration: `00:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    format: ['MP4', 'MOV', 'AVI'][Math.floor(Math.random() * 3)],
    resolution: ['1920x1080', '1280x720', '3840x2160'][Math.floor(Math.random() * 3)],
    size: `${(Math.random() * 50 + 10).toFixed(1)} MB`,
    downloadCount: Math.floor(Math.random() * 1000) + 100,
    viewCount: Math.floor(Math.random() * 5000) + 500,
    uploadDate: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    tags: ['动画', '特效', '转场', '背景', '装饰'].slice(0, Math.floor(Math.random() * 3) + 2)
  }));

  const categories = [
    { name: '全部', count: 1234 },
    { name: '动画效果', count: 456 },
    { name: '转场特效', count: 234 },
    { name: '背景视频', count: 345 },
    { name: '装饰元素', count: 123 },
    { name: '文字动画', count: 89 },
    { name: '粒子效果', count: 67 },
    { name: '光效素材', count: 45 }
  ];

  const formats = ['MP4', 'MOV', 'AVI', 'WMV'];
  const resolutions = ['1920x1080', '1280x720', '3840x2160', '2560x1440'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <Header />
      
      {/* 页面标题和搜索 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">视频素材</h1>
              <p className="mt-2 text-gray-600">发现高质量的视频素材资源</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索视频素材..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏筛选 */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">分类筛选</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={category.name}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      index === 0
                        ? 'bg-amber-100 text-amber-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">格式</h4>
              <div className="space-y-2">
                {formats.map((format) => (
                  <label key={format} className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <span className="ml-2 text-sm text-gray-700">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">分辨率</h4>
              <div className="space-y-2">
                {resolutions.map((resolution) => (
                  <label key={resolution} className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <span className="ml-2 text-sm text-gray-700">{resolution}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 主内容区域 */}
          <div className="flex-1">
            {/* 工具栏 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">共找到 1,234 个视频素材</span>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>最新上传</option>
                    <option>最多下载</option>
                    <option>最受欢迎</option>
                    <option>时长最短</option>
                    <option>时长最长</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-amber-600 bg-amber-50 rounded-lg">
                      <Grid className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 视频网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* 视频缩略图 */}
                  <div className="relative aspect-video bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center group-hover:bg-opacity-70 transition-all">
                        <Play className="h-6 w-6 text-white ml-1" />
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
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
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
                    
                    {/* 视频信息 */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{video.format} • {video.resolution}</span>
                      <span>{video.size}</span>
                    </div>
                    
                    {/* 统计信息 */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.viewCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{video.downloadCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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