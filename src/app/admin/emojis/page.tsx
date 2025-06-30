'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Link from 'next/link';

// 模拟表情包数据
const mockEmojis = [
  {
    id: 1,
    name: '开心兔兔',
    category: '动物',
    tags: ['兔子', '开心', '可爱'],
    downloads: 1250,
    status: 'approved',
    uploadDate: '2024-01-15',
    uploader: 'user123',
    thumbnail: '/api/placeholder/100/100'
  },
  {
    id: 2,
    name: '哭泣猫咪',
    category: '动物',
    tags: ['猫咪', '哭泣', '伤心'],
    downloads: 890,
    status: 'pending',
    uploadDate: '2024-01-14',
    uploader: 'user456',
    thumbnail: '/api/placeholder/100/100'
  },
  {
    id: 3,
    name: '愤怒表情',
    category: '情绪',
    tags: ['愤怒', '生气', '表情'],
    downloads: 567,
    status: 'approved',
    uploadDate: '2024-01-13',
    uploader: 'user789',
    thumbnail: '/api/placeholder/100/100'
  },
  {
    id: 4,
    name: '疑问脸',
    category: '情绪',
    tags: ['疑问', '困惑', '思考'],
    downloads: 234,
    status: 'rejected',
    uploadDate: '2024-01-12',
    uploader: 'user101',
    thumbnail: '/api/placeholder/100/100'
  }
];

const categories = ['全部', '动物', '情绪', '食物', '节日', '其他'];
const statusOptions = ['全部', 'approved', 'pending', 'rejected'];

export default function AdminEmojisPage() {
  const [emojis, setEmojis] = useState(mockEmojis);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState('全部');
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 筛选表情包
  const filteredEmojis = emojis.filter(emoji => {
    const matchesSearch = emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emoji.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '全部' || emoji.category === selectedCategory;
    const matchesStatus = selectedStatus === '全部' || emoji.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 分页
  const totalPages = Math.ceil(filteredEmojis.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmojis = filteredEmojis.slice(startIndex, startIndex + itemsPerPage);

  // 处理选择
  const handleSelectEmoji = (id: number) => {
    setSelectedEmojis(prev => 
      prev.includes(id) 
        ? prev.filter(emojiId => emojiId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmojis.length === paginatedEmojis.length) {
      setSelectedEmojis([]);
    } else {
      setSelectedEmojis(paginatedEmojis.map(emoji => emoji.id));
    }
  };

  // 批量操作
  const handleBatchApprove = () => {
    setEmojis(prev => prev.map(emoji => 
      selectedEmojis.includes(emoji.id) 
        ? { ...emoji, status: 'approved' as const }
        : emoji
    ));
    setSelectedEmojis([]);
  };

  const handleBatchReject = () => {
    setEmojis(prev => prev.map(emoji => 
      selectedEmojis.includes(emoji.id) 
        ? { ...emoji, status: 'rejected' as const }
        : emoji
    ));
    setSelectedEmojis([]);
  };

  const handleBatchDelete = () => {
    if (confirm('确定要删除选中的表情包吗？')) {
      setEmojis(prev => prev.filter(emoji => !selectedEmojis.includes(emoji.id)));
      setSelectedEmojis([]);
    }
  };

  // 单个操作
  const handleStatusChange = (id: number, newStatus: 'approved' | 'pending' | 'rejected') => {
    setEmojis(prev => prev.map(emoji => 
      emoji.id === id ? { ...emoji, status: newStatus } : emoji
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个表情包吗？')) {
      setEmojis(prev => prev.filter(emoji => emoji.id !== id));
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

  return (
    <AdminLayout>
      <div className="p-6">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">表情包管理</h1>
          <p className="text-gray-600 mt-1">管理平台上的所有表情包内容</p>
        </div>

        {/* 操作栏 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* 搜索和筛选 */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索表情包名称或标签..."
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
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <Link
                href="/admin/emojis/add"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                添加表情包
              </Link>
            </div>
          </div>

          {/* 批量操作 */}
          {selectedEmojis.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  已选择 {selectedEmojis.length} 个表情包
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

        {/* 表情包列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedEmojis.length === paginatedEmojis.length && paginatedEmojis.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    表情包
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分类
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标签
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    下载量
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
                {paginatedEmojis.map((emoji) => (
                  <tr key={emoji.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEmojis.includes(emoji.id)}
                        onChange={() => handleSelectEmoji(emoji.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={emoji.thumbnail}
                          alt={emoji.name}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{emoji.name}</div>
                          <div className="text-sm text-gray-500">ID: {emoji.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{emoji.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {emoji.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{emoji.downloads.toLocaleString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(emoji.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{emoji.uploader}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{emoji.uploadDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={emoji.status}
                          onChange={(e) => handleStatusChange(emoji.id, e.target.value as any)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="pending">待审核</option>
                          <option value="approved">已审核</option>
                          <option value="rejected">已拒绝</option>
                        </select>
                        <Link
                          href={`/admin/emojis/${emoji.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(emoji.id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          删除
                        </button>
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
                  显示 {startIndex + 1} 到 {Math.min(startIndex + itemsPerPage, filteredEmojis.length)} 条，
                  共 {filteredEmojis.length} 条记录
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
        {filteredEmojis.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">没有找到表情包</h3>
            <p className="mt-2 text-gray-500">尝试调整搜索条件或添加新的表情包</p>
            <Link
              href="/admin/emojis/add"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              添加表情包
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}