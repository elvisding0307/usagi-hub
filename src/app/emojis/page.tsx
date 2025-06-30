import Link from "next/link";
import { Search, Filter, Download, Grid, List } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EmojisPage() {
  // 模拟表情包数据
  const emojis = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `可爱表情包 ${index + 1}`,
    tags: ['可爱', '动漫', '二次元'],
    downloadCount: Math.floor(Math.random() * 1000) + 100,
    emoji: ['🐰', '🐱', '🐶', '🐼', '🦊', '🐻'][index % 6]
  }));

  const categories = [
    { name: '全部', count: 1234, active: true },
    { name: '可爱', count: 456, active: false },
    { name: '搞笑', count: 321, active: false },
    { name: '动漫', count: 234, active: false },
    { name: '萌系', count: 189, active: false },
    { name: '治愈', count: 156, active: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <Header />
      
      {/* 页面标题和搜索 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">表情包</h1>
              <p className="mt-2 text-gray-600">发现最可爱的表情包素材</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索表情包..."
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">分类筛选</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      category.active
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

              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">热门标签</h4>
                <div className="flex flex-wrap gap-2">
                  {['可爱', '搞笑', '动漫', '萌系', '治愈', '二次元'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 主内容区域 */}
          <div className="flex-1">
            {/* 工具栏 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">共找到 1,234 个表情包</span>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>最新上传</option>
                    <option>最多下载</option>
                    <option>最受欢迎</option>
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

            {/* 表情包网格 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {emojis.map((emoji) => (
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
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{emoji.downloadCount}</span>
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