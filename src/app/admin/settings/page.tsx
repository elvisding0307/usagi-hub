'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  siteKeywords: string;
  maxFileSize: number;
  allowedFormats: string[];
  enableRegistration: boolean;
  enableComments: boolean;
  enableDownload: boolean;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  autoBackup: boolean;
  backupFrequency: string;
  storageLimit: number;
  cacheExpiry: number;
}

const mockSettings: SystemSettings = {
  siteName: 'UsagiHub',
  siteDescription: '最全面的兔兔表情包和视频资源平台',
  siteKeywords: '兔兔,表情包,视频,可爱,动画',
  maxFileSize: 50,
  allowedFormats: ['jpg', 'png', 'gif', 'mp4', 'webm'],
  enableRegistration: true,
  enableComments: true,
  enableDownload: true,
  maintenanceMode: false,
  emailNotifications: true,
  autoBackup: true,
  backupFrequency: 'daily',
  storageLimit: 1000,
  cacheExpiry: 24
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>(mockSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // 模拟保存操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('设置已保存！');
  };

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', name: '基本设置', icon: '⚙️' },
    { id: 'upload', name: '上传设置', icon: '📤' },
    { id: 'features', name: '功能设置', icon: '🔧' },
    { id: 'system', name: '系统设置', icon: '💻' },
    { id: 'backup', name: '备份设置', icon: '💾' }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-600 mt-1">管理系统的各项配置和参数</p>
        </div>

        {/* 标签页导航 */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 设置内容 */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* 基本设置 */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">基本设置</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    网站名称
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    网站关键词
                  </label>
                  <input
                    type="text"
                    value={settings.siteKeywords}
                    onChange={(e) => handleSettingChange('siteKeywords', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站描述
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* 上传设置 */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">上传设置</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大文件大小 (MB)
                  </label>
                  <input
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    存储限制 (GB)
                  </label>
                  <input
                    type="number"
                    value={settings.storageLimit}
                    onChange={(e) => handleSettingChange('storageLimit', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  允许的文件格式
                </label>
                <div className="flex flex-wrap gap-2">
                  {['jpg', 'png', 'gif', 'webp', 'mp4', 'webm', 'mov'].map((format) => (
                    <label key={format} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.allowedFormats.includes(format)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleSettingChange('allowedFormats', [...settings.allowedFormats, format]);
                          } else {
                            handleSettingChange('allowedFormats', settings.allowedFormats.filter(f => f !== format));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{format.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 功能设置 */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">功能设置</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'enableRegistration', label: '允许用户注册', desc: '新用户可以注册账号' },
                  { key: 'enableComments', label: '启用评论功能', desc: '用户可以对内容进行评论' },
                  { key: 'enableDownload', label: '允许下载', desc: '用户可以下载表情包和视频' },
                  { key: 'emailNotifications', label: '邮件通知', desc: '发送系统通知邮件' }
                ].map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{feature.label}</h3>
                      <p className="text-sm text-gray-500">{feature.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[feature.key as keyof SystemSettings] as boolean}
                        onChange={(e) => handleSettingChange(feature.key as keyof SystemSettings, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 系统设置 */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">系统设置</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">维护模式</h3>
                    <p className="text-sm text-gray-500">启用后网站将显示维护页面</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    缓存过期时间 (小时)
                  </label>
                  <input
                    type="number"
                    value={settings.cacheExpiry}
                    onChange={(e) => handleSettingChange('cacheExpiry', parseInt(e.target.value))}
                    className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 备份设置 */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">备份设置</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">自动备份</h3>
                    <p className="text-sm text-gray-500">定期自动备份系统数据</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备份频率
                  </label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                    className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="hourly">每小时</option>
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                  </select>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">备份操作</h3>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      立即备份
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      恢复备份
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      下载备份
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 保存按钮 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>保存中...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>保存设置</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}