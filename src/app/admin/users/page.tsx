'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Link from 'next/link';

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: 'alice_creator',
    email: 'alice@example.com',
    displayName: 'Alice Wang',
    role: 'creator',
    status: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-20 14:30',
    uploads: 45,
    downloads: 1250,
    avatar: '/api/placeholder/40/40',
    verified: true
  },
  {
    id: 2,
    username: 'bob_user',
    email: 'bob@example.com',
    displayName: 'Bob Chen',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-19 09:15',
    uploads: 0,
    downloads: 89,
    avatar: '/api/placeholder/40/40',
    verified: false
  },
  {
    id: 3,
    username: 'charlie_mod',
    email: 'charlie@example.com',
    displayName: 'Charlie Li',
    role: 'moderator',
    status: 'active',
    joinDate: '2023-12-01',
    lastLogin: '2024-01-20 16:45',
    uploads: 12,
    downloads: 567,
    avatar: '/api/placeholder/40/40',
    verified: true
  },
  {
    id: 4,
    username: 'david_banned',
    email: 'david@example.com',
    displayName: 'David Zhang',
    role: 'user',
    status: 'banned',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-18 11:20',
    uploads: 3,
    downloads: 23,
    avatar: '/api/placeholder/40/40',
    verified: false
  }
];

const roleOptions = ['全部', 'user', 'creator', 'moderator', 'admin'];
const statusOptions = ['全部', 'active', 'inactive', 'banned', 'pending'];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState('全部');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 筛选用户
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === '全部' || user.role === selectedRole;
    const matchesStatus = selectedStatus === '全部' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // 分页
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // 处理选择
  const handleSelectUser = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };

  // 批量操作
  const handleBatchActivate = () => {
    setUsers(prev => prev.map(user => 
      selectedUsers.includes(user.id) 
        ? { ...user, status: 'active' as const }
        : user
    ));
    setSelectedUsers([]);
  };

  const handleBatchBan = () => {
    if (confirm('确定要封禁选中的用户吗？')) {
      setUsers(prev => prev.map(user => 
        selectedUsers.includes(user.id) 
          ? { ...user, status: 'banned' as const }
          : user
      ));
      setSelectedUsers([]);
    }
  };

  const handleBatchDelete = () => {
    if (confirm('确定要删除选中的用户吗？此操作不可恢复！')) {
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  // 单个操作
  const handleStatusChange = (id: number, newStatus: 'active' | 'inactive' | 'banned' | 'pending') => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  const handleRoleChange = (id: number, newRole: 'user' | 'creator' | 'moderator' | 'admin') => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  const handleVerifyToggle = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, verified: !user.verified } : user
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个用户吗？此操作不可恢复！')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: '活跃', class: 'bg-green-100 text-green-800' },
      inactive: { text: '不活跃', class: 'bg-gray-100 text-gray-800' },
      banned: { text: '已封禁', class: 'bg-red-100 text-red-800' },
      pending: { text: '待审核', class: 'bg-yellow-100 text-yellow-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      user: { text: '普通用户', class: 'bg-blue-100 text-blue-800' },
      creator: { text: '创作者', class: 'bg-purple-100 text-purple-800' },
      moderator: { text: '版主', class: 'bg-orange-100 text-orange-800' },
      admin: { text: '管理员', class: 'bg-red-100 text-red-800' }
    };
    const config = roleConfig[role as keyof typeof roleConfig];
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
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <p className="text-gray-600 mt-1">管理平台上的所有用户账户和权限</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总用户数</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">活跃用户</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">创作者</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'creator').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">封禁用户</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'banned').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 操作栏 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* 搜索和筛选 */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索用户名、邮箱或昵称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                导出用户
              </button>
            </div>
          </div>

          {/* 批量操作 */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  已选择 {selectedUsers.length} 个用户
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleBatchActivate}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    批量激活
                  </button>
                  <button
                    onClick={handleBatchBan}
                    className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
                  >
                    批量封禁
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

        {/* 用户列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    上传/下载
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    注册日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最后登录
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                            {user.verified && (
                              <svg className="ml-1 h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{user.uploads} 上传</div>
                      <div className="text-gray-500">{user.downloads} 下载</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.joinDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          <select
                            value={user.status}
                            onChange={(e) => handleStatusChange(user.id, e.target.value as any)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="active">活跃</option>
                            <option value="inactive">不活跃</option>
                            <option value="banned">封禁</option>
                            <option value="pending">待审核</option>
                          </select>
                        </div>
                        <div className="flex gap-1">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="user">用户</option>
                            <option value="creator">创作者</option>
                            <option value="moderator">版主</option>
                            <option value="admin">管理员</option>
                          </select>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleVerifyToggle(user.id)}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              user.verified 
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {user.verified ? '已认证' : '认证'}
                          </button>
                          <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1"
                          >
                            编辑
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900 text-xs px-2 py-1"
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
                  显示 {startIndex + 1} 到 {Math.min(startIndex + itemsPerPage, filteredUsers.length)} 条，
                  共 {filteredUsers.length} 条记录
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
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">没有找到用户</h3>
            <p className="mt-2 text-gray-500">尝试调整搜索条件</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}