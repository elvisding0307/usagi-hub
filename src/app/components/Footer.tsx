import Link from "next/link";

export default function Footer() {
  return (
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
  );
}