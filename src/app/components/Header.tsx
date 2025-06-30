'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

interface HeaderProps {
  showSearchBar?: boolean;
}

export default function Header({ showSearchBar = true }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
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
              <Link 
                href="/" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                首页
              </Link>
              <Link 
                href="/emojis" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/emojis') 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                表情包
              </Link>
              <Link 
                href="/videos" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/videos') 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                视频素材
              </Link>
              <Link 
                href="/search" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/search') 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                搜索
              </Link>
              <Link 
                href="/legal" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/legal') 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                使用说明
              </Link>
            </div>
          </div>

          {/* 搜索框 */}
          {showSearchBar && (
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
          )}
        </div>
      </div>
    </nav>
  );
}