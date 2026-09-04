import React, { useState } from 'react';
import { TrashedDocumentItem } from '../types';
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  FileText,
  FileSpreadsheet,
  Cpu,
  Search,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Layers,
  HardDrive,
  Info,
  X,
  RefreshCw,
} from 'lucide-react';

interface TrashTabProps {
  trashedDocuments: TrashedDocumentItem[];
  onRecoverDocument: (docId: string) => void;
  onPermanentlyDelete: (docId: string) => void;
  onRestoreAll: () => void;
  onEmptyTrash: () => void;
  onNavigateTab: (tabId: string) => void;
  onSelectDocument?: (docId: string) => void;
}

export const TrashTab: React.FC<TrashTabProps> = ({
  trashedDocuments,
  onRecoverDocument,
  onPermanentlyDelete,
  onRestoreAll,
  onEmptyTrash,
  onNavigateTab,
  onSelectDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pdf' | 'spreadsheet' | 'other'>('all');
  const [confirmPermanentDocId, setConfirmPermanentDocId] = useState<string | null>(null);
  const [isConfirmEmptyOpen, setIsConfirmEmptyOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<TrashedDocumentItem | null>(null);

  const filteredItems = trashedDocuments.filter((item) => {
    const doc = item.document;
    const matchesSearch =
      doc.original_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subsidiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'pdf') return doc.file_type === '.pdf';
    if (selectedFilter === 'spreadsheet') return doc.file_type === '.xlsx' || doc.file_type === '.csv';
    if (selectedFilter === 'other') return doc.file_type !== '.pdf' && doc.file_type !== '.xlsx' && doc.file_type !== '.csv';

    return true;
  });

  const totalPagesRecoverable = trashedDocuments.reduce(
    (acc, cur) => acc + (cur.document.total_pages || cur.pages.length || 1),
    0
  );
  const totalTablesRecoverable = trashedDocuments.reduce(
    (acc, cur) => acc + (cur.document.tables_count || cur.tables.length || 0),
    0
  );

  const handleRecover = (docId: string, filename: string) => {
    onRecoverDocument(docId);
    setActionNotice(`Successfully restored "${filename}". You can now access it in Documents.`);
    if (previewItem && previewItem.document.id === docId) {
      setPreviewItem(null);
    }
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleRestoreAllClick = () => {
    if (trashedDocuments.length === 0) return;
    const count = trashedDocuments.length;
    onRestoreAll();
    setActionNotice(`Successfully restored all ${count} document${count > 1 ? 's' : ''} to the repository.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleEmptyTrashConfirm = () => {
    onEmptyTrash();
    setIsConfirmEmptyOpen(false);
    setActionNotice('Trash has been completely emptied.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handlePermanentDeleteClick = (docId: string, filename: string) => {
    onPermanentlyDelete(docId);
    setConfirmPermanentDocId(null);
    if (previewItem && previewItem.document.id === docId) {
      setPreviewItem(null);
    }
    setActionNotice(`Permanently deleted "${filename}".`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 shrink-0">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  Trash & File Recovery
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  {trashedDocuments.length} {trashedDocuments.length === 1 ? 'file' : 'files'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Uploaded files deleted by users are moved here. You can recover them at any time with all their extracted text, stratigraphic tables, and verification history completely intact.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onNavigateTab('upload')}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Documents</span>
            </button>

            {trashedDocuments.length > 0 && (
              <>
                <button
                  onClick={handleRestoreAllClick}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore All</span>
                </button>

                <button
                  onClick={() => setIsConfirmEmptyOpen(true)}
                  className="px-3 py-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Empty Trash</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200 animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-medium">{actionNotice}</span>
            </div>
            <button
              onClick={() => setActionNotice(null)}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 p-1 rounded-sm cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Quick Recovery Stat Cards */}
        {trashedDocuments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Total In Trash</p>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {trashedDocuments.length} <span className="text-xs font-normal text-slate-500">files</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Recoverable Pages</p>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {totalPagesRecoverable} <span className="text-xs font-normal text-slate-500">pages</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Extracted Tables</p>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {totalTablesRecoverable} <span className="text-xs font-normal text-slate-500">tables</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors">
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search deleted files by name, ID, or subsidiary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Files ({trashedDocuments.length})
            </button>
            <button
              onClick={() => setSelectedFilter('pdf')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedFilter === 'pdf'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              PDFs
            </button>
            <button
              onClick={() => setSelectedFilter('spreadsheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedFilter === 'spreadsheet'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Spreadsheets & CSV
            </button>
          </div>
        </div>

        {/* Trashed Items List */}
        {filteredItems.length === 0 ? (
          <div className="py-16 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {trashedDocuments.length === 0 ? 'Trash is Empty' : 'No Matching Files in Trash'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              {trashedDocuments.length === 0
                ? 'When you delete uploaded exploration reports or data files, they will appear here and can be recovered with a single click.'
                : 'Try adjusting your search terms or filter selection above.'}
            </p>
            {trashedDocuments.length === 0 && (
              <button
                onClick={() => onNavigateTab('upload')}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Go to Documents</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredItems.map((item) => {
              const doc = item.document;
              const isConfirmingDelete = confirmPermanentDocId === doc.id;

              return (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/90 transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        doc.file_type === '.pdf'
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                          : doc.file_type === '.xlsx' || doc.file_type === '.csv'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                          : 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900'
                      }`}
                    >
                      {doc.file_type === '.xlsx' || doc.file_type === '.csv' ? (
                        <FileSpreadsheet className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                          {doc.original_filename}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono shrink-0 border border-slate-200 dark:border-slate-700">
                          {doc.id}
                        </span>
                        {doc.ocr_applied && (
                          <span className="text-[10px] bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5 shrink-0">
                            <Cpu className="w-2.5 h-2.5" /> OCR
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
                        <span>{doc.subsidiary}</span>
                        <span>•</span>
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>{doc.size_kb} KB</span>
                        <span>•</span>
                        <span>{item.pages.length || doc.total_pages} pages</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                          <Calendar className="w-3 h-3" />
                          Deleted: {item.deleted_at}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions for this item */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                      title="Preview details before restoring"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => handleRecover(doc.id, doc.original_filename)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      title="Restore file back to Documents repository"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Recover</span>
                    </button>

                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 p-1 rounded-lg border border-rose-300 dark:border-rose-800">
                        <span className="text-[10px] text-rose-700 dark:text-rose-300 font-bold px-1">
                          Confirm?
                        </span>
                        <button
                          onClick={() => handlePermanentDeleteClick(doc.id, doc.original_filename)}
                          className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-sm cursor-pointer"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setConfirmPermanentDocId(null)}
                          className="px-1.5 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-[11px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmPermanentDocId(doc.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition cursor-pointer"
                        title="Permanently delete from disk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal: Empty Entire Trash */}
      {isConfirmEmptyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-950/60">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Empty Entire Trash?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              All <strong className="font-bold">{trashedDocuments.length}</strong> deleted document(s) and their extracted geological tables and OCR text records will be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsConfirmEmptyOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEmptyTrashConfirm}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Empty Trash</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-sm">
                    {previewItem.document.original_filename}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    ID: {previewItem.document.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Category</span>
                <span className="font-semibold text-slate-900 dark:text-white">{previewItem.document.category}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Subsidiary</span>
                <span className="font-semibold text-slate-900 dark:text-white">{previewItem.document.subsidiary}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Deleted At</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">{previewItem.deleted_at}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">File Size</span>
                <span className="font-semibold text-slate-900 dark:text-white">{previewItem.document.size_kb} KB</span>
              </div>
            </div>

            {/* Content snippet preview */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Recoverable Extracted Text ({previewItem.pages.length} pages)</span>
              </h4>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 max-h-36 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {previewItem.pages[0]?.text || 'No preview text recorded.'}
              </div>
            </div>

            {/* Tables count preview */}
            {previewItem.tables.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Stratigraphic & Assay Tables ({previewItem.tables.length})
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {previewItem.tables.map((t, idx) => (
                    <span key={idx} className="inline-block mr-2 mb-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px]">
                      {t.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleRecover(previewItem.document.id, previewItem.document.original_filename)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recover This File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
