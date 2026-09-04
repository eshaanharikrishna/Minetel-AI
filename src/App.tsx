import React, { useState } from 'react';
import coalRockTexture from './assets/images/coal_rock_texture_1788456045919.jpg';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { DocumentUploadTab } from './components/DocumentUploadTab';
import { ExtractionViewerTab } from './components/ExtractionViewerTab';
import { GroundedQATab } from './components/GroundedQATab';
import { DiscrepancyValidatorTab } from './components/DiscrepancyValidatorTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { ReportGeneratorTab } from './components/ReportGeneratorTab';
import { TrashTab } from './components/TrashTab';
import { JudgePitchModal } from './components/JudgePitchModal';
import { JudgeQAModal } from './components/JudgeQAModal';
import { GroundTruthMetricsModal } from './components/GroundTruthMetricsModal';
import { LoginModal } from './components/LoginModal';
import { DocumentItem, PageItem, TableItem, ValidationIssue, UserProfile, TrashedDocumentItem } from './types';
import {
  Award,
  HelpCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  User,
  Home,
  Sparkles,
  FolderPlus,
  Cpu,
  Search,
  AlertTriangle,
  BarChart3,
  FileCheck,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [tabHistory, setTabHistory] = useState<string[]>(['home']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Authenticated User State - starts null so every fresh visit is empty
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // User-scoped document and workspace state
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [pages, setPages] = useState<PageItem[]>([]);
  const [tables, setTables] = useState<TableItem[]>([]);
  const [discrepancies, setDiscrepancies] = useState<ValidationIssue[]>([]);
  const [trashedDocuments, setTrashedDocuments] = useState<TrashedDocumentItem[]>([]);

  // When user logs in or switches accounts, load that user's account-scoped files
  React.useEffect(() => {
    if (currentUser) {
      try {
        const savedData = localStorage.getItem(`mineintel_user_workspace_${currentUser.id}`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          const userDocs = Array.isArray(parsed.documents) ? parsed.documents : [];
          setDocuments(userDocs);
          setPages(Array.isArray(parsed.pages) ? parsed.pages : []);
          setTables(Array.isArray(parsed.tables) ? parsed.tables : []);
          setDiscrepancies(Array.isArray(parsed.discrepancies) ? parsed.discrepancies : []);
          setTrashedDocuments(Array.isArray(parsed.trashedDocuments) ? parsed.trashedDocuments : []);
          setSelectedDocId(userDocs.length > 0 ? userDocs[0].id : '');
          return;
        }
      } catch {
        // ignore
      }
      setDocuments([]);
      setPages([]);
      setTables([]);
      setDiscrepancies([]);
      setTrashedDocuments([]);
      setSelectedDocId('');
    } else {
      // Unauthenticated state: clean fresh workspace every time
      setDocuments([]);
      setPages([]);
      setTables([]);
      setDiscrepancies([]);
      setTrashedDocuments([]);
      setSelectedDocId('');
    }
  }, [currentUser?.id]);

  // Persist workspace data strictly within current user's account
  React.useEffect(() => {
    if (currentUser) {
      try {
        const payload = {
          documents,
          pages,
          tables,
          discrepancies,
          trashedDocuments,
        };
        localStorage.setItem(`mineintel_user_workspace_${currentUser.id}`, JSON.stringify(payload));
      } catch {
        // ignore
      }
    }
  }, [currentUser?.id, documents, pages, tables, discrepancies, trashedDocuments]);

  // Trash and recovery handlers
  const handleDeleteDocument = (docId: string) => {
    const docToDelete = documents.find((d) => d.id === docId);
    if (!docToDelete) return;

    const docPages = pages.filter((p) => p.document_id === docId);
    const docTables = tables.filter((t) => t.document_id === docId);

    const trashedItem: TrashedDocumentItem = {
      document: docToDelete,
      pages: docPages,
      tables: docTables,
      deleted_at:
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ', ' +
        new Date().toLocaleDateString(),
      deleted_by: currentUser ? currentUser.name : 'Geologist User',
    };

    setTrashedDocuments((prev) => [trashedItem, ...prev]);
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    setPages((prev) => prev.filter((p) => p.document_id !== docId));
    setTables((prev) => prev.filter((t) => t.document_id !== docId));

    if (selectedDocId === docId) {
      const remaining = documents.filter((d) => d.id !== docId);
      setSelectedDocId(remaining.length > 0 ? remaining[0].id : '');
    }
  };

  const handleRecoverDocument = (docId: string) => {
    const trashedItem = trashedDocuments.find((t) => t.document.id === docId);
    if (!trashedItem) return;

    setDocuments((prev) => [trashedItem.document, ...prev]);
    setPages((prev) => [...trashedItem.pages, ...prev]);
    setTables((prev) => [...trashedItem.tables, ...prev]);
    setTrashedDocuments((prev) => prev.filter((t) => t.document.id !== docId));
    setSelectedDocId(docId);
  };

  const handlePermanentlyDelete = (docId: string) => {
    setTrashedDocuments((prev) => prev.filter((t) => t.document.id !== docId));
  };

  const handleRestoreAll = () => {
    if (trashedDocuments.length === 0) return;
    const restoredDocs = trashedDocuments.map((t) => t.document);
    const restoredPages = trashedDocuments.flatMap((t) => t.pages);
    const restoredTables = trashedDocuments.flatMap((t) => t.tables);

    setDocuments((prev) => [...restoredDocs, ...prev]);
    setPages((prev) => [...restoredPages, ...prev]);
    setTables((prev) => [...restoredTables, ...prev]);
    setTrashedDocuments([]);
    if (restoredDocs.length > 0) {
      setSelectedDocId(restoredDocs[0].id);
    }
  };

  const handleEmptyTrash = () => {
    setTrashedDocuments([]);
  };
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isJudgeQAOpen, setIsJudgeQAOpen] = useState(false);
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);

  // Navigation handlers with history tracking for Back and Forth
  const handleNavigateTab = (tabId: string) => {
    if (tabId === activeTab) return;
    const newHistory = tabHistory.slice(0, historyIndex + 1);
    newHistory.push(tabId);
    setTabHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setActiveTab(tabHistory[prevIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoForward = () => {
    if (historyIndex < tabHistory.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setActiveTab(tabHistory[nextIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < tabHistory.length - 1;

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
    const newPage: PageItem = {
      id: `PG-${newDoc.id}-1`,
      document_id: newDoc.id,
      page_number: 1,
      text: `[Ingested File Record: ${newDoc.original_filename}]\n- File Format: ${newDoc.file_type}\n- Category: ${newDoc.category}\n- Subsidiary: ${newDoc.subsidiary}\n- Size: ${newDoc.size_kb} KB\n- Ingestion Time: ${newDoc.uploaded_at}`,
      has_tables: newDoc.tables_count > 0,
      has_figures: false,
      ocr_confidence: 99.0,
    };
    setPages((prev) => [newPage, ...prev]);
  };

  const handleIngestContent = (newDoc: DocumentItem, newPages: PageItem[], newTables: TableItem[]) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setPages((prev) => [...newPages, ...prev]);
    setTables((prev) => [...newTables, ...prev]);
    setSelectedDocId(newDoc.id);
  };

  const handleResolveDiscrepancy = (id: number) => {
    setDiscrepancies((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, geologist_verified: !d.geologist_verified } : d
      )
    );
  };

  const unresolvedDiscrepancyCount = discrepancies.filter((d) => !d.geologist_verified).length;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div
      className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-row font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200"
      style={{
        backgroundImage: isDark
          ? `linear-gradient(180deg, rgba(13, 16, 23, 0.89) 0%, rgba(9, 11, 17, 0.95) 100%), url(${coalRockTexture})`
          : `linear-gradient(180deg, rgba(246, 248, 252, 0.90) 0%, rgba(238, 242, 248, 0.94) 100%), url(${coalRockTexture})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Left Sidebar Panel */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleNavigateTab}
        discrepancyCount={unresolvedDiscrepancyCount}
        trashCount={trashedDocuments.length}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area (Header + Tab Content) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={handleNavigateTab}
          documents={documents}
          pages={pages}
          tables={tables}
          activeDocumentId={selectedDocId}
          onSelectDocument={(id) => setSelectedDocId(id)}
          onOpenPitch={() => setIsPitchOpen(true)}
          onOpenJudgeQA={() => setIsJudgeQAOpen(true)}
          onOpenBenchmark={() => setIsBenchmarkOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          currentUser={currentUser}
          discrepancyCount={unresolvedDiscrepancyCount}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main Workspace Canvas */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'home' && (
          <HomePage
            documents={documents}
            onAddDocument={handleAddDocument}
            onSelectDocument={(id) => {
              setSelectedDocId(id);
              handleNavigateTab('extraction');
            }}
            selectedDocId={selectedDocId}
            onNavigateTab={handleNavigateTab}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectQuickProfile={(user) => setCurrentUser(user)}
            onOpenPitch={() => setIsPitchOpen(true)}
            onOpenJudgeQA={() => setIsJudgeQAOpen(true)}
            onOpenBenchmark={() => setIsBenchmarkOpen(true)}
            discrepancyCount={unresolvedDiscrepancyCount}
          />
        )}

        {/* 1. AUTOMATED REPORT GENERATION PLATFORM */}
        {activeTab === 'report' && (
          <ReportGeneratorTab
            documents={documents}
            activeDocumentId={selectedDocId}
            onSelectDocument={(id) => setSelectedDocId(id)}
            discrepancies={discrepancies}
            pages={pages}
            tables={tables}
            onAddDocument={handleAddDocument}
            onOpenDocReader={() => handleNavigateTab('extraction')}
            onOpenQA={() => handleNavigateTab('qa')}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginOpen(true)}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {activeTab === 'upload' && (
          <DocumentUploadTab
            documents={documents}
            onAddDocument={handleAddDocument}
            onIngestContent={handleIngestContent}
            onSelectDocument={(id) => {
              setSelectedDocId(id);
              handleNavigateTab('extraction');
            }}
            selectedDocId={selectedDocId}
            onNavigateTab={handleNavigateTab}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectQuickProfile={(user) => setCurrentUser(user)}
            onDeleteDocument={handleDeleteDocument}
            trashCount={trashedDocuments.length}
            onRecoverDocument={handleRecoverDocument}
          />
        )}

        {activeTab === 'trash' && (
          <TrashTab
            trashedDocuments={trashedDocuments}
            onRecoverDocument={handleRecoverDocument}
            onPermanentlyDelete={handlePermanentlyDelete}
            onRestoreAll={handleRestoreAll}
            onEmptyTrash={handleEmptyTrash}
            onNavigateTab={handleNavigateTab}
            onSelectDocument={setSelectedDocId}
          />
        )}

        {activeTab === 'extraction' && (
          <ExtractionViewerTab
            documents={documents}
            pages={pages}
            tables={tables}
            discrepancies={discrepancies}
            selectedDocId={selectedDocId}
            onSelectDocId={setSelectedDocId}
          />
        )}

        {activeTab === 'qa' && (
          <GroundedQATab pages={pages} />
        )}

        {activeTab === 'discrepancy' && (
          <DiscrepancyValidatorTab
            discrepancies={discrepancies}
            onResolveDiscrepancy={handleResolveDiscrepancy}
            documents={documents}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab
            documents={documents}
            tables={tables}
            pages={pages}
            discrepancies={discrepancies}
            onNavigateTab={handleNavigateTab}
          />
        )}
        </main>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      <JudgePitchModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
        onNavigateTab={(tabKey) => handleNavigateTab(tabKey)}
      />

      <JudgeQAModal
        isOpen={isJudgeQAOpen}
        onClose={() => setIsJudgeQAOpen(false)}
        onNavigateTab={(tabKey) => handleNavigateTab(tabKey)}
      />

      <GroundTruthMetricsModal
        isOpen={isBenchmarkOpen}
        onClose={() => setIsBenchmarkOpen(false)}
      />
    </div>
  );
}
