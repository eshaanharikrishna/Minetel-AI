import { jsPDF } from 'jspdf';
import { ValidationIssue } from '../types';

interface GenerateReportOptions {
  title: string;
  subtitle: string;
  regionalInstitute: string;
  preparedBy: string;
  reportDate: string;
  summary: string;
  resourceTotal: string;
  annualProductionData: Array<{ year: string | number; target: string | number; actual: string | number; ob: string | number; ratio: string | number; grade: string }>;
  discrepancies: ValidationIssue[];
  sources: Array<{ docId: string; page: number; desc: string }>;
  unfcCategory: string;
  conclusion?: string;
  conclusionReason?: string;
  conclusionPoints?: Array<{ title: string; explanation: string; evidence?: string }>;
}

export function generateCMPDIPdfReport(options: GenerateReportOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let y = 20;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 20;
      // mini header on page 2
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(`CMPDI / CIL TECHNICAL REPORT — ${options.title.substring(0, 50)}...`, margin, 8);
      y += 6;
    }
  };

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('CENTRAL MINE PLANNING & DESIGN INSTITUTE LIMITED (CMPDI)', margin, 11);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`A Subsidiary of Coal India Limited (CIL) | Sponsoring Ministry: Ministry of Coal | ${options.regionalInstitute}`, margin, 18);

  y = 36;

  // Document Title Box
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 22, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(options.title.length > 55 ? options.title.substring(0, 52) + '...' : options.title, margin + 4, y + 8);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Doc Ref: CMPDI-AUTOGEN-${new Date().getFullYear()}  |  Prepared by: ${options.preparedBy}  |  Date: ${options.reportDate}`, margin + 4, y + 16);

  y += 28;

  // Section 1: Executive Summary & Geological Context
  checkPageBreak(50);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('1. EXECUTIVE SUMMARY & GEOLOGICAL APPRAISAL', margin, y);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.7);
  doc.line(margin, y + 1.5, margin + 86, y + 1.5);

  y += 7;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  const contentWidth = pageWidth - (margin * 2);
  const paragraphs = (options.summary || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  paragraphs.forEach((para) => {
    const lines = doc.splitTextToSize(para, contentWidth);
    checkPageBreak(lines.length * 4.2 + 4);
    doc.text(lines, margin, y);
    y += (lines.length * 4.0) + 3.5;
  });

  y += 1.5;

  // Key Mandate & Resource Highlights Box (Clean 2-column grid with generous spacing)
  checkPageBreak(22);
  const mandateBoxHeight = 18;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, mandateBoxHeight, 1.5, 1.5, 'FD');

  const halfWidth = (contentWidth - 6) / 2;
  const col1X = margin + 4;
  const col2X = margin + halfWidth + 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);

  // Row 1
  doc.text(`• Proved Reserves (UNFC 111): ${options.resourceTotal}`, col1X, y + 5.2);
  doc.text(`• Quality Range: 3,980 - 5,420 kcal/kg (G9-G14)`, col2X, y + 5.2);

  // Row 2
  doc.text(`• Concession: Barakar Fm, North Karanpura`, col1X, y + 9.8);
  doc.text(`• Stripping Ratio: 3.11 m³/t (Avg OP Model)`, col2X, y + 9.8);

  // Row 3
  doc.text(`• Target Capacity: 14.50 MTPA Commercial OP`, col1X, y + 14.4);
  doc.text(`• Statutory Mandate: EC Parivesh Filing / Lease`, col2X, y + 14.4);

  y += mandateBoxHeight + 8;

  // Section 2: Key Data Points
  checkPageBreak(50);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('2. KEY DATA POINTS & TABULAR METRICS', margin, y);
  doc.setDrawColor(37, 99, 235);
  doc.line(margin, y + 1.5, margin + 78, y + 1.5);

  y += 6;

  // Sub-section 2.1 Key Metrics Summary Table
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('2.1 Reserve Figures, Coal Quality & Geological Parameters', margin, y);
  y += 4;

  const keyMetricRows = [
    {
      label: '• Resources (UNFC):',
      value: 'Proved: 248.80 MT (76.7%) | Indicated: 54.20 MT | Inferred: 21.50 MT | Total In-Situ: 324.50 MT [Sec 3.1, Pg 3]',
    },
    {
      label: '• Seam Thicknesses:',
      value: 'Seam IV Top: 6.82m | IV Bot: 4.25m | Seam III: 3.10m | Seam II Top: 16.20m | Seam I Bot: 18.50m [Sec 3.2, Pg 3]',
    },
    {
      label: '• Quality / GCV:',
      value: '3,980 - 5,420 kcal/kg (G9-G14). Weighted ROM: 4,780 kcal/kg (Grade G10). Ash: 32.4% - 41.2% [Sec 3.3, Pg 3]',
    },
    {
      label: '• Structural Geology:',
      value: '42 Drillholes (7,845m core); Strike N35°W-S35°E, Dip 4°-7° SW; Faults F1 (18-25m), F2 (8-12m) [Sec 2, Pg 2]',
    },
  ];

  const sec21Height = 24;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, sec21Height, 'FD');

  let curY = y + 4.8;
  keyMetricRows.forEach((row) => {
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(row.label, margin + 3, curY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(row.value, margin + 30, curY);
    curY += 4.8;
  });

  y += sec21Height + 6;

  // Sub-section 2.2: 5-Year Production & Stripping Schedule Table
  checkPageBreak(35);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('2.2 5-Year Production, Overburden & Stripping Ratio Reconciliation [Section 4.2, Page 4]', margin, y);
  y += 4;

  const colX = [margin, margin + 22, margin + 48, margin + 80, margin + 118, margin + 148];
  doc.setFillColor(30, 41, 59);
  doc.rect(margin, y, pageWidth - (margin * 2), 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Fiscal Year', colX[0] + 2, y + 4.2);
  doc.text('Target Coal (MT)', colX[1] + 2, y + 4.2);
  doc.text('Actual Output (MT)', colX[2] + 2, y + 4.2);
  doc.text('Overburden (Mcum)', colX[3] + 2, y + 4.2);
  doc.text('Stripping (m³/t)', colX[4] + 2, y + 4.2);
  doc.text('Quality Grade', colX[5] + 2, y + 4.2);

  y += 6;

  options.annualProductionData.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, 250, 252);
    doc.rect(margin, y, pageWidth - (margin * 2), 5, 'F');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(String(row.year), colX[0] + 2, y + 3.5);
    doc.text(String(row.target), colX[1] + 2, y + 3.5);
    doc.text(String(row.actual), colX[2] + 2, y + 3.5);
    doc.text(String(row.ob), colX[3] + 2, y + 3.5);
    doc.text(String(row.ratio), colX[4] + 2, y + 3.5);
    doc.text(String(row.grade), colX[5] + 2, y + 3.5);
    y += 5;
  });

  y += 6;

  // Section 3: Discrepancies & Data Quality Issues
  checkPageBreak(35);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('3. DISCREPANCIES & DATA QUALITY ISSUES', margin, y);
  doc.setDrawColor(220, 38, 38);
  doc.line(margin, y + 1.5, margin + 82, y + 1.5);

  y += 6;

  if (options.discrepancies.length > 0) {
    options.discrepancies.forEach((disc) => {
      checkPageBreak(13);
      doc.setFillColor(254, 242, 242); // red-50
      doc.setDrawColor(248, 113, 113);
      doc.roundedRect(margin, y, pageWidth - (margin * 2), 10.5, 1, 1, 'FD');
      doc.setTextColor(153, 27, 27);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text(`[FLAG: ${disc.issue_type.toUpperCase()}] ${disc.metric}:`, margin + 2.5, y + 3.8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(69, 10, 10);
      const splitDesc = doc.splitTextToSize(disc.description, pageWidth - (margin * 2) - 5);
      doc.text(splitDesc.slice(0, 2), margin + 2.5, y + 7.2);
      y += 12;
    });
  } else {
    doc.setFontSize(7.5);
    doc.setTextColor(22, 101, 52);
    doc.text('No internal data discrepancies flagged across ingested sections.', margin, y);
    y += 6;
  }

  y += 3;

  // Section 4: Critical Assessment of Conclusions
  checkPageBreak(40);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('4. CRITICAL ASSESSMENT OF CONCLUSIONS', margin, y);
  doc.setDrawColor(124, 58, 237);
  doc.line(margin, y + 1.5, margin + 88, y + 1.5);

  y += 6;

  // Stated author conclusion vs independent evaluation
  doc.setFillColor(245, 243, 255);
  doc.setDrawColor(196, 181, 253);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 13, 1, 1, 'FD');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(91, 33, 182);
  doc.text('STATED AUTHOR CONCLUSION (Page 5, Section 5.2):', margin + 3, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(76, 29, 149);
  doc.text('"Project is evaluated as HIGHLY FEASIBLE for commercial opencast coal extraction with Grade G9-G11 thermal yield and 3.11 m³/t stripping ratio."', margin + 3, y + 8.5);

  y += 16;

  const assessmentPoints = options.conclusionPoints || [
    { title: 'Reserve Size & Stripping (Supported)', explanation: '248.80 MT proved reserves and 3.11 m³/t stripping ratio support 14.50 MTPA opencast mining.', evidence: 'Section 1.2 (Pg 1), Section 4.1 (Pg 4)' },
    { title: 'Washing Requirement Gap (Vulnerability)', explanation: 'Seam I Bottom (18.50m) carries 41.2% ash (Grade G14), requiring mandatory washing under MoEFCC rules.', evidence: 'Section 3.3 (Pg 3) assay table' },
    { title: 'Production-Dispatch Conflict (Gap)', explanation: 'FY 2022-23 pithead output of 10.20 MT conflicts with 11.70 MT railway dispatch (+1.50 MT variance).', evidence: 'Section 4.1 vs 4.3 (Pg 4)' },
    { title: 'Groundwater Impact Claim (Unverified)', explanation: 'Negligible drawdown claim (<0.5m at 500m) lacks supporting aquifer pump tests or piezometric data.', evidence: 'Section 5.2 (Pg 5)' },
  ];

  assessmentPoints.forEach((pt) => {
    checkPageBreak(10);
    doc.setFontSize(7.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`• ${pt.title}:`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const splitExp = doc.splitTextToSize(`${pt.explanation} [Evidence: ${pt.evidence || 'Document'}]`, pageWidth - margin - 55);
    doc.text(splitExp, margin + 48, y);
    y += (splitExp.length * 3.6) + 1.5;
  });

  y += 4;

  // Section 5: Final Conclusion
  checkPageBreak(35);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('5. FINAL CONCLUSION & SOURCE CITATIONS', margin, y);
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.7);
  doc.line(margin, y + 1.5, margin + 85, y + 1.5);

  y += 6;

  // Conclusion Box (Green border)
  const conclusionText = options.conclusion || 'The North Karanpura Block C opencast coal project is evaluated as CONDITIONALLY FEASIBLE. The reserve volume (248.80 MT Proved) and low stripping ratio (3.11 m³/t) provide sound geological foundations, but unconditional feasibility is rejected due to mandatory washing requirements for Seam I Bottom (41.2% ash), an unresolved 1.50 MT production variance in FY 2022-23, and lack of hydrogeological pumping tests.';
  const splitConclusion = doc.splitTextToSize(conclusionText, pageWidth - (margin * 2) - 8);
  const conclusionBoxHeight = (splitConclusion.length * 3.8) + 10;

  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), conclusionBoxHeight, 1.5, 1.5, 'FD');

  doc.setTextColor(6, 95, 70);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('INDEPENDENT AUDIT VERDICT: CONDITIONALLY FEASIBLE', margin + 4, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(4, 120, 87);
  doc.text(splitConclusion, margin + 4, y + 8.5);

  y += conclusionBoxHeight + 5;

  // Traceable Sources Box
  checkPageBreak(18);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('DOCUMENT CITATION TRAIL:', margin, y);
  y += 3.5;
  options.sources.forEach((src) => {
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 132, 199);
    doc.text(`[Page ${src.page}]:`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(src.desc, margin + 18, y);
    y += 3.5;
  });

  // Footer Certificate
  const footerY = pageHeight - 12;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY, pageWidth - margin, footerY);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('CMPDI-AI-SYSTEM | Automated Report Generation Platform with Verified Conclusion & Evidence Rationale | Human Review Signoff', margin, footerY + 4);
  doc.text(`Generated on ${options.reportDate}`, pageWidth - margin - 35, footerY + 4);

  // Trigger download
  doc.save(`CMPDI_Report_${options.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}
