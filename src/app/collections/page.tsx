import Link from "next/link";
import { Search, Filter, Grid, List, Download, Eye, Calendar, User, Folder } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CollectionsPage() {
  // 模拟合集数据
  const collections = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `精选合集 ${index + 1}`,
    description: `这是一个包含多种风格素材的精选合集，适合不同场景使用。`,
    coverImage: `/collection-cover-${index + 1}.jpg`,
    itemCount: Math.floor(Math.random() * 50) + 20,
    downloadCount: Math.floor(Math.random() * 1000) + 100,
    viewCount: Math.floor(Math.random() * 5000) + 500,
    creator: `创作者${index + 1}`,
    updateDate: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    tags: ['可爱', '动漫', '特效', '背景'].slice(0, Math.floor(Math.random() * 3) + 2),
    type: Math.random() > 0.5 ? 'emoji' : 'video'
  }));

  const categories = [
    { name: '全部', count: 156 },
    { name: '表情包合集', count: 89 },
    { name: '视频合集', count: 67 },
    { name: '混合合集', count: 45 },
    { name: '主题合集', count: 34 },
    { name: '节日合集', count: 23 }
  ];

  const tags = ['可爱', '搞笑', '动漫', '特效', '背景', '节日', '萌系', '治愈'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <Header />
      
      {/* 页面标题和搜索 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">素材合集</h1>
              <p className="mt-2 text-gray-600">发现精心策划的素材合集</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索合集..."
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
              <h4 className="text-md font-medium text-gray-900 mb-3">热门标签</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">排序方式</h4>
              <div className="space-y-2">
                {['最新更新', '最多下载', '最受欢迎', '素材最多'].map((sort, index) => (
                  <label key={sort} className="flex items-center">
                    <input 
                      type="radio" 
                      name="sort" 
                      defaultChecked={index === 0}
                      className="text-amber-600 focus:ring-amber-500" 
                    />
                    <span className="ml-2 text-sm text-gray-700">{sort}</span>
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
                  <span className="text-gray-700">共找到 156 个合集</span>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
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

            {/* 合集网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* 合集封面 */}
                  <div className="relative aspect-video bg-gradient-to-br from-yellow-100 to-amber-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Folder className="h-16 w-16 text-amber-400" />
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {collection.itemCount} 个素材
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        collection.type === 'emoji' 
                          ? 'bg-blue-100 text-blue-800' 
                          : collection.type === 'video'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {collection.type === 'emoji' ? '表情包' : collection.type === 'video' ? '视频' : '混合'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {collection.description}
                    </p>
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {collection.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* 创作者和日期 */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{collection.creator}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{collection.updateDate}</span>
                      </div>
                    </div>
                    
                    {/* 统计信息 */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{collection.viewCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{collection.downloadCount}</span>
                        </div>
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