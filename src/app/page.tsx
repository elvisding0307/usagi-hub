import Link from "next/link";
import { Search, Download, Tag, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <span className="text-xl font-bold text-gray-900">UsagiHub</span>
              </Link>
            </div>

            {/* 导航菜单 */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-gray-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                  首页
                </Link>
                <Link href="/emojis" className="text-gray-600 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                  表情包
                </Link>
                <Link href="/videos" className="text-gray-600 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                  视频素材
                </Link>
                <Link href="/search" className="text-gray-600 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                  搜索
                </Link>
                <Link href="/legal" className="text-gray-600 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                  使用说明
                </Link>
              </div>
            </div>

            {/* 搜索框 */}
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索表情包或视频..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            发现最有趣的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
              表情包与视频素材
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            无需注册，直接搜索与下载。为泛二次元爱好者、创作者提供丰富的素材资源。
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/emojis"
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-3 rounded-lg font-medium hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105"
            >
              浏览表情包
            </Link>
            <Link
              href="/videos"
              className="bg-white text-gray-700 px-8 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              查看视频素材
            </Link>
          </div>
        </div>

        {/* 特色功能 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能搜索</h3>
            <p className="text-gray-600">支持关键词搜索和标签筛选，快速找到你需要的素材</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">一键下载</h3>
            <p className="text-gray-600">支持单张下载和合集打包，满足不同使用需求</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Tag className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">精准分类</h3>
            <p className="text-gray-600">按情绪、场景、格式等多维度分类，便于快速定位</p>
          </div>
        </div>

        {/* 热门标签云 */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-16">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-amber-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">热门标签</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              '可爱', '搞笑', '表情包', '动漫', '猫咪', '狗狗', 
              '兔子', '熊猫', '二次元', '萌系', '治愈', '日常',
              '节日', '生气', '开心', '难过', '惊讶', '无语'
            ].map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-yellow-100 hover:text-amber-700 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 推荐素材预览 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">精选推荐</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="aspect-square bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-2xl">🐰</span>
                </div>
                <p className="text-sm text-gray-600 text-center truncate">可爱兔子表情</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <span className="text-xl font-bold text-gray-900">UsagiHub</span>
              </div>
              <p className="text-gray-600 mb-4">
                专注于为泛二次元爱好者和创作者提供高质量的表情包与视频素材资源。
              </p>
              <p className="text-sm text-gray-500">
                © 2024 UsagiHub. 所有素材仅供非商业用途使用。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">快速导航</h3>
              <ul className="space-y-2">
                <li><Link href="/emojis" className="text-gray-600 hover:text-amber-600">表情包</Link></li>
                <li><Link href="/videos" className="text-gray-600 hover:text-amber-600">视频素材</Link></li>
                <li><Link href="/search" className="text-gray-600 hover:text-amber-600">搜索</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">帮助</h3>
              <ul className="space-y-2">
                <li><Link href="/legal" className="text-gray-600 hover:text-amber-600">使用说明</Link></li>
                <li><Link href="/legal" className="text-gray-600 hover:text-amber-600">版权声明</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
