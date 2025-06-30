import Link from "next/link";
import { FileText, Shield, Download, Users, AlertCircle, CheckCircle, Info } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LegalPage() {
  const sections = [
    {
      id: 'terms',
      title: '使用条款',
      icon: FileText,
      content: [
        '本网站提供的所有素材仅供个人学习和非商业用途使用',
        '用户在使用素材时应遵守相关法律法规',
        '禁止将素材用于违法、有害或不当的用途',
        '用户应尊重原创作者的知识产权',
        '本网站保留随时修改使用条款的权利'
      ]
    },
    {
      id: 'license',
      title: '许可协议',
      icon: Shield,
      content: [
        '表情包素材：免费用于个人非商业用途',
        '视频素材：部分支持商业使用，请查看具体素材说明',
        '禁止直接转售或重新分发原始素材',
        '允许在创作作品中使用，但需注明来源',
        '商业使用请联系我们获取授权'
      ]
    },
    {
      id: 'download',
      title: '下载说明',
      icon: Download,
      content: [
        '所有素材均提供高质量原始文件下载',
        '表情包格式：PNG（透明背景）、JPG',
        '视频格式：MP4、MOV、AVI等主流格式',
        '下载前请确认素材符合您的使用需求',
        '如遇下载问题，请联系客服支持'
      ]
    },
    {
      id: 'community',
      title: '社区规范',
      icon: Users,
      content: [
        '维护友好、尊重的社区环境',
        '禁止发布违法、暴力、色情等不当内容',
        '尊重他人的创作成果和知识产权',
        '积极参与社区建设，分享优质素材',
        '举报违规行为，共同维护社区秩序'
      ]
    }
  ];

  const faqs = [
    {
      question: '素材可以免费使用吗？',
      answer: '是的，我们提供的大部分素材都可以免费用于个人非商业用途。部分高级素材可能需要付费或注册会员。'
    },
    {
      question: '可以用于商业项目吗？',
      answer: '部分素材支持商业使用，具体请查看每个素材的许可说明。如需商业授权，请联系我们。'
    },
    {
      question: '如何下载高质量素材？',
      answer: '点击素材详情页的下载按钮即可获取高质量原始文件。部分素材可能需要注册账户。'
    },
    {
      question: '素材有版权问题吗？',
      answer: '我们严格筛选素材来源，确保提供的内容符合版权要求。如发现问题，请及时联系我们。'
    },
    {
      question: '可以修改素材吗？',
      answer: '在许可范围内，您可以对素材进行适当的修改和编辑，但不得改变其基本特征。'
    },
    {
      question: '如何联系客服？',
      answer: '您可以通过邮箱 support@usagihub.com 或在线客服联系我们，我们会尽快回复。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">使用说明</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            了解 UsagiHub 的使用条款、许可协议和社区规范，确保正确合法地使用我们的素材资源
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 使用条款和许可协议 */}
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.id} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.content.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* 常见问题 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <Info className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">常见问题</h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 快速导航 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速导航</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block px-3 py-2 text-gray-600 hover:text-amber-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
                <a
                  href="#faq"
                  className="block px-3 py-2 text-gray-600 hover:text-amber-600 hover:bg-yellow-50 rounded-lg transition-colors"
                >
                  常见问题
                </a>
              </div>
            </div>

            {/* 重要提醒 */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="text-lg font-semibold text-amber-800">重要提醒</h3>
              </div>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• 使用前请仔细阅读许可协议</li>
                <li>• 商业使用需要额外授权</li>
                <li>• 尊重原创作者的版权</li>
                <li>• 遇到问题及时联系客服</li>
              </ul>
            </div>

            {/* 联系方式 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">联系我们</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">客服邮箱</p>
                  <p className="font-medium text-gray-900">support@usagihub.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">商务合作</p>
                  <p className="font-medium text-gray-900">business@usagihub.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">工作时间</p>
                  <p className="font-medium text-gray-900">周一至周五 9:00-18:00</p>
                </div>
              </div>
            </div>

            {/* 版本信息 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">版本信息</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>当前版本：v1.0.0</p>
                <p>更新时间：2024-01-20</p>
                <p>条款生效：2024-01-01</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部声明 */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">免责声明</h3>
            <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
              UsagiHub 致力于提供高质量的素材资源，但不对素材的准确性、完整性或适用性做出任何明示或暗示的保证。
              用户在使用素材时应自行承担风险，我们不承担因使用素材而产生的任何直接或间接损失。
              如有疑问或争议，请及时联系我们协商解决。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}