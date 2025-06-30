import AdminLayout from '../components/AdminLayout';
import {
  Users,
  Image,
  Video,
  Download,
  TrendingUp,
  Eye,
  Heart,
  Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      name: '总用户数',
      value: '12,345',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: '表情包总数',
      value: '8,432',
      change: '+5%',
      changeType: 'increase',
      icon: Image,
    },
    {
      name: '视频素材总数',
      value: '2,156',
      change: '+8%',
      changeType: 'increase',
      icon: Video,
    },
    {
      name: '总下载量',
      value: '156,789',
      change: '+23%',
      changeType: 'increase',
      icon: Download,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'upload',
      user: '用户123',
      action: '上传了新的表情包',
      target: '可爱小兔子系列',
      time: '2分钟前',
    },
    {
      id: 2,
      type: 'download',
      user: '用户456',
      action: '下载了视频素材',
      target: '春天风景.mp4',
      time: '5分钟前',
    },
    {
      id: 3,
      type: 'register',
      user: '新用户789',
      action: '注册了账户',
      target: '',
      time: '10分钟前',
    },
    {
      id: 4,
      type: 'like',
      user: '用户321',
      action: '点赞了表情包',
      target: '搞笑表情合集',
      time: '15分钟前',
    },
  ];

  const popularContent = [
    {
      id: 1,
      title: '可爱小猫表情包',
      type: 'emoji',
      downloads: 1234,
      views: 5678,
      likes: 234,
    },
    {
      id: 2,
      title: '春天樱花视频',
      type: 'video',
      downloads: 987,
      views: 3456,
      likes: 189,
    },
    {
      id: 3,
      title: '搞笑动物GIF',
      type: 'emoji',
      downloads: 876,
      views: 2345,
      likes: 156,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 p-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
          <p className="mt-2 text-gray-600">欢迎回来，这里是您的管理概览</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 最近活动 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">最近活动</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}
                        {activity.target && (
                          <span className="font-medium text-amber-600">
                            {' '}{activity.target}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 热门内容 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">热门内容</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {popularContent.map((content) => (
                <div key={content.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">
                          {content.title}
                        </h4>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          content.type === 'emoji' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {content.type === 'emoji' ? '表情包' : '视频'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {content.downloads}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {content.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {content.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">快速操作</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Image className="h-5 w-5 mr-2 text-gray-400" />
                添加表情包
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Video className="h-5 w-5 mr-2 text-gray-400" />
                添加视频素材
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Users className="h-5 w-5 mr-2 text-gray-400" />
                用户管理
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <TrendingUp className="h-5 w-5 mr-2 text-gray-400" />
                查看报告
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}