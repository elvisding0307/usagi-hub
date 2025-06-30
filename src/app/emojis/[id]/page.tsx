import Link from "next/link";
import { ArrowLeft, Download, Eye, Calendar, User, Tag, Share2, Heart } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EmojiDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // 模拟表情包详情数据
  const emojiPack = {
    id: parseInt(id),
    title: "超可爱兔兔表情包",
    description: "一套非常可爱的兔子主题表情包，包含各种情绪和动作，适合日常聊天使用。",
    tags: ['可爱', '兔子', '动漫', '二次元', '萌系'],
    downloadCount: 1234,
    viewCount: 5678,
    uploadDate: "2024-01-15",
    uploader: "萌萌哒创作者",
    fileSize: "2.5 MB",
    format: "PNG",
    resolution: "512x512",
    license: "免费使用",
    emojis: Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      emoji: ['🐰', '😊', '😢', '😡', '😴', '🤔', '😍', '🥺', '😂', '😭'][index % 10],
      name: `表情 ${index + 1}`
    }))
  };

  // 相关推荐
  const relatedPacks = Array.from({ length: 6 }, (_, index) => ({
    id: index + 10,
    title: `相关表情包 ${index + 1}`,
    emoji: ['🐱', '🐶', '🐼', '🦊', '🐻', '🐸'][index],
    downloadCount: Math.floor(Math.random() * 1000) + 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <Header showSearchBar={false} />
      
      {/* 返回导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/emojis" className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回表情包列表
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2">
            {/* 表情包信息 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{emojiPack.title}</h1>
              
              {/* 统计信息 */}
              <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{emojiPack.viewCount} 浏览</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>{emojiPack.downloadCount} 下载</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{emojiPack.uploadDate}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{emojiPack.description}</p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {emojiPack.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* 下载按钮 */}
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>下载表情包</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>收藏</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>分享</span>
                </button>
              </div>
            </div>

            {/* 表情包预览 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">表情包预览</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {emojiPack.emojis.map((emoji) => (
                  <div
                    key={emoji.id}
                    className="bg-yellow-50 rounded-lg p-4 hover:bg-yellow-100 transition-colors cursor-pointer group"
                  >
                    <div className="text-3xl text-center group-hover:scale-110 transition-transform">
                      {emoji.emoji}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 文件信息 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">文件信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">文件大小:</span>
                  <span className="text-gray-900">{emojiPack.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">格式:</span>
                  <span className="text-gray-900">{emojiPack.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">分辨率:</span>
                  <span className="text-gray-900">{emojiPack.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">上传者:</span>
                  <span className="text-gray-900">{emojiPack.uploader}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">许可:</span>
                  <span className="text-green-600">{emojiPack.license}</span>
                </div>
              </div>
            </div>

            {/* 使用提示 */}
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">使用提示</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 所有表情包均为免费使用</li>
                <li>• 仅限非商业用途</li>
                <li>• 支持微信、QQ等聊天软件</li>
                <li>• 建议保存到相册后使用</li>
              </ul>
            </div>

            {/* 相关推荐 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h3>
              <div className="space-y-3">
                {relatedPacks.map((pack) => (
                  <Link
                    key={pack.id}
                    href={`/emojis/${pack.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-2xl">{pack.emoji}</div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{pack.title}</h4>
                      <p className="text-xs text-gray-500">{pack.downloadCount} 下载</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}