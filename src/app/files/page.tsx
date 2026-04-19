import {
  FolderOpen,
  File,
  FileText,
  Image,
  Film,
  Music,
  Archive,
  Code,
  Search,
  Upload,
  Grid,
  List,
  MoreVertical,
  Download,
  Trash2,
} from "lucide-react";

export default function FilesPage() {
  const folders = [
    { name: "Documents", count: 24, modified: "2 hours ago" },
    { name: "Reports", count: 89, modified: "1 day ago" },
    { name: "Projects", count: 12, modified: "3 days ago" },
    { name: "Media", count: 156, modified: "1 week ago" },
  ];

  const files = [
    { name: "Q1 Financial Report.pdf", size: "2.4 MB", modified: "2 hours ago", type: "pdf" },
    { name: "System Architecture.png", size: "1.8 MB", modified: "5 hours ago", type: "image" },
    { name: "Meeting Notes.docx", size: "45 KB", modified: "1 day ago", type: "doc" },
    { name: "Budget 2026.xlsx", size: "892 KB", modified: "2 days ago", type: "sheet" },
    { name: "Project Timeline.pdf", size: "1.2 MB", modified: "3 days ago", type: "pdf" },
    { name: "Stan Config.json", size: "12 KB", modified: "1 week ago", type: "code" },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-600" size={20} />;
      case "image":
        return <Image className="text-purple-600" size={20} />;
      case "doc":
        return <FileText className="text-blue-600" size={20} />;
      case "sheet":
        return <FileText className="text-green-600" size={20} />;
      case "code":
        return <Code className="text-gray-600" size={20} />;
      default:
        return <File className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Files</h1>
          <p className="text-gray-600 mt-1">Browse and manage your files</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md">
            <Upload size={18} />
            Upload
          </button>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Storage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">15.2 GB</p>
            </div>
            <FolderOpen className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Used</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8.7 GB</p>
            </div>
            <Archive className="text-purple-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">6.5 GB</p>
            </div>
            <File className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Folders */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Folders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <FolderOpen className="text-yellow-600" size={32} />
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={16} className="text-gray-600" />
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 mt-3">{folder.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {folder.count} items • {folder.modified}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Files */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Files</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 rounded-lg">
              <Grid size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <List size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Size
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Modified
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <span className="text-sm font-medium text-gray-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{file.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{file.modified}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Download size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
