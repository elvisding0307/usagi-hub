'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Link from 'next/link';

// 模拟视频数据
const mockVideos = [
  {
    id: 1,
    title: '搞笑猫咪合集',
    category: '动物',
    tags: ['猫咪', '搞笑', '宠物'],
    duration: '00:02:30',
    size: '15.2 MB',
    downloads: 2340,
    views: 12500,
    status: 'approved',
    uploadDate: '2024-01-15',
    uploader: 'videomaker123',
    thumbnail: '/api/placeholder/160/90',
    format: 'MP4',
    resolution: '1920x1080'
  },
  {
    id: 2,
    title: '节日庆祝动画',
    category: '节日',
    tags: ['节日', '庆祝', '动画'],
    duration: '00:01:45',
    size: '8.7 MB',
    downloads: 1890,
    views: 8900,
    status: 'pending',
    uploadDate: '2024-01-14',
    uploader: 'animator456',
    thumbnail: '/api/placeholder/160/90',
    format: 'MP4',
    resolution: '1280x720'
  },
  {
    id: 3,
    title: '商务演示模板',
    category: '商务',
    tags: ['商务', '演示', '模板'],
    duration: '00:00:30',
    size: '5.1 MB',
    downloads: 567,
    views: 3400,
    status: 'approved',
    uploadDate: '2024-01-13',
    uploader: 'business789',
    thumbnail: '/api/placeholder/160/90',
    format: 'MP4',
    resolution: '1920x1080'
  },
  {
    id: 4,
    title: '低质量测试视频',
    category: '其他',
    tags: ['测试', '低质量'],
    duration: '00:00:15',
    size: '2.3 MB',
    downloads: 12,
    views: 45,
    status: 'rejected',
    uploadDate: '2024-01-12',
    uploader: 'testuser101',
    thumbnail: '/api/placeholder/160/90',
    format: 'MP4',
    resolution: '640x480'
  }
];

const categories = ['全部', '动物', '节日', '商务', '教育', '娱乐', '其他'];
const statusOptions = ['全部', 'approved', 'pending', 'rejected'];
const formatOptions = ['全部', 'MP4', 'AVI', 'MOV', 'GIF'];

export default function AdminVideosPage() {
  const [videos, setVideos] = useState(mockVideos);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState('全部');
  const [selectedFormat, setSelectedFormat] = useState('全部');
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 筛选视频
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '全部' || video.category === selectedCategory;
    const matchesStatus = selectedStatus === '全部' || video.status === selectedStatus;
    const matchesFormat = selectedFormat === '全部' || video.format === selectedFormat;
    return matchesSearch && matchesCategory && matchesStatus && matchesFormat;
  });

  // 分页
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage);

  // 处理选择
  const handleSelectVideo = (id: number) => {
    setSelectedVideos(prev => 
      prev.includes(id) 
        ? prev.filter(videoId => videoId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedVideos.length === paginatedVideos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(paginatedVideos.map(video => video.id));
    }
  };

  // 批量操作
  const handleBatchApprove = () => {
    setVideos(prev => prev.map(video => 
      selectedVideos.includes(video.id) 
        ? { ...video, status: 'approved' as const }
        : video
    ));
    setSelectedVideos([]);
  };

  const handleBatchReject = () => {
    setVideos(prev => prev.map(video => 
      selectedVideos.includes(video.id) 
        ? { ...video, status: 'rejected' as const }
        : video
    ));
    setSelectedVideos([]);
  };

  const handleBatchDelete = () => {
    if (confirm('确定要删除选中的视频吗？')) {
      setVideos(prev => prev.filter(video => !selectedVideos.includes(video.id)));
      setSelectedVideos([]);
    }
  };

  // 单个操作
  const handleStatusChange = (id: number, newStatus: 'approved' | 'pending' | 'rejected') => {
    setVideos(prev => prev.map(video => 
      video.id === id ? { ...video, status: newStatus } : video
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个视频吗？')) {
      setVideos(prev => prev.filter(video => video.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { text: '已审核', class: 'bg-green-100 text-green-800' },
      pending: { text: '待审核', class: 'bg-yellow-100 text-yellow-800' },
      rejected: { text: '已拒绝', class: 'bg-red-100 text-red-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const formatFileSize = (sizeStr: string) => {
    return sizeStr;
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">视频管理</h1>
          <p className="text-gray-600 mt-1">管理平台上的所有视频素材内容</p>
        </div>

        {/* 操作栏 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* 搜索和筛选 */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索视频标题或标签..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {formatOptions.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <Link
                href="/admin/videos/add"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                添加视频
              </Link>
            </div>
          </div>

          {/* 批量操作 */}
          {selectedVideos.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  已选择 {selectedVideos.length} 个视频
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleBatchApprove}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    批量审核通过
                  </button>
                  <button
                    onClick={handleBatchReject}
                    className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
                  >
                    批量拒绝
                  </button>
                  <button
                    onClick={handleBatchDelete}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    批量删除
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 视频列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedVideos.length === paginatedVideos.length && paginatedVideos.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    视频
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分类
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标签
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时长/大小
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    格式/分辨率
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    下载/观看
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    上传者
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    上传日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedVideos.includes(video.id)}
                        onChange={() => handleSelectVideo(video.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-16 w-28 rounded-lg object-cover mr-3"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="h-8 w-8 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{video.title}</div>
                          <div className="text-sm text-gray-500">ID: {video.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{video.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{formatDuration(video.duration)}</div>
                      <div className="text-gray-500">{formatFileSize(video.size)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{video.format}</div>
                      <div className="text-gray-500">{video.resolution}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{video.downloads.toLocaleString()} 下载</div>
                      <div className="text-gray-500">{video.views.toLocaleString()} 观看</div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(video.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{video.uploader}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{video.uploadDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <select
                          value={video.status}
                          onChange={(e) => handleStatusChange(video.id, e.target.value as any)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="pending">待审核</option>
                          <option value="approved">已审核</option>
                          <option value="rejected">已拒绝</option>
                        </select>
                        <div className="flex gap-1">
                          <Link
                            href={`/admin/videos/${video.id}/edit`}
                            className="text-blue-600 hover:text-blue-900 text-xs"
                          >
                            编辑
                          </Link>
                          <button
                            onClick={() => handleDelete(video.id)}
                            className="text-red-600 hover:text-red-900 text-xs"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  显示 {startIndex + 1} 到 {Math.min(startIndex + itemsPerPage, filteredVideos.length)} 条，
                  共 {filteredVideos.length} 条记录
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    上一页
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-700">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 空状态 */}
        {filteredVideos.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">没有找到视频</h3>
            <p className="mt-2 text-gray-500">尝试调整搜索条件或添加新的视频</p>
            <Link
              href="/admin/videos/add"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              添加视频
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}