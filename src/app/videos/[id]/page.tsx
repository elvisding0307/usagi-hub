import Link from "next/link";
import { ArrowLeft, Download, Eye, Calendar, User, Tag, Share2, Heart, Play } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // 模拟视频详情数据
  const video = {
    id: parseInt(id),
    title: "炫酷粒子特效转场视频",
    description: "高质量的粒子特效转场视频，适合用于视频剪辑、直播背景等场景。包含多种粒子效果和颜色变化。",
    tags: ['特效', '转场', '粒子', '动画', '背景'],
    downloadCount: 2345,
    viewCount: 8901,
    uploadDate: "2024-01-20",
    uploader: "特效大师",
    duration: "00:15",
    fileSize: "45.2 MB",
    format: "MP4",
    resolution: "1920x1080",
    fps: "60",
    license: "免费使用",
    videoUrl: "/sample-video.mp4"
  };

  // 相关推荐
  const relatedVideos = Array.from({ length: 6 }, (_, index) => ({
    id: index + 10,
    title: `相关视频素材 ${index + 1}`,
    thumbnail: `/video-thumb-${index + 1}.jpg`,
    duration: `00:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    downloadCount: Math.floor(Math.random() * 1000) + 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <Header showSearchBar={false} />
      
      {/* 返回导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/videos" className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回视频素材列表
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2">
            {/* 视频播放器 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative aspect-video bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded">
                  {video.duration}
                </div>
              </div>
            </div>

            {/* 视频信息 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{video.title}</h1>
              
              {/* 统计信息 */}
              <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{video.viewCount} 浏览</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>{video.downloadCount} 下载</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{video.uploadDate}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{video.description}</p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {video.tags.map((tag) => (
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
                  <span>下载视频</span>
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

            {/* 技术规格 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">技术规格</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{video.resolution}</div>
                  <div className="text-sm text-gray-600">分辨率</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{video.fps}</div>
                  <div className="text-sm text-gray-600">帧率</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{video.format}</div>
                  <div className="text-sm text-gray-600">格式</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{video.fileSize}</div>
                  <div className="text-sm text-gray-600">文件大小</div>
                </div>
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 详细信息 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">详细信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">时长:</span>
                  <span className="text-gray-900">{video.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">文件大小:</span>
                  <span className="text-gray-900">{video.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">格式:</span>
                  <span className="text-gray-900">{video.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">分辨率:</span>
                  <span className="text-gray-900">{video.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">帧率:</span>
                  <span className="text-gray-900">{video.fps} FPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">上传者:</span>
                  <span className="text-gray-900">{video.uploader}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">许可:</span>
                  <span className="text-green-600">{video.license}</span>
                </div>
              </div>
            </div>

            {/* 许可信息 */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">许可信息</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 免费用于个人和商业项目</li>
                <li>• 无需署名，但建议标注来源</li>
                <li>• 不可转售或重新分发</li>
                <li>• 可用于视频剪辑和直播</li>
              </ul>
            </div>

            {/* 使用提示 */}
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">使用提示</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 适合用作转场效果</li>
                <li>• 可叠加在其他视频上</li>
                <li>• 建议使用专业剪辑软件</li>
                <li>• 支持透明度混合模式</li>
              </ul>
            </div>

            {/* 相关推荐 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h3>
              <div className="space-y-3">
                {relatedVideos.map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/videos/${relatedVideo.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-16 h-12 bg-gray-200 rounded flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                        {relatedVideo.duration}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{relatedVideo.title}</h4>
                      <p className="text-xs text-gray-500">{relatedVideo.downloadCount} 下载</p>
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