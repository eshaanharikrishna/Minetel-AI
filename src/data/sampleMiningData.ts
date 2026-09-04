import { DocumentItem, PageItem, TableItem, ExtractedFigure, ValidationIssue, MiningTopic, ProductionDataPoint, JudgeQAItem } from '../types';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'CMPDI-NK-01',
    original_filename: 'CMPDI Report — Geological Assessment & Production Feasibility Report for North Karanpura Block C.pdf',
    stored_filename: 'CMPDI Report — Geological Assessment & Production Feasibility Report for North Karanpura Block C.pdf',
    file_type: 'application/pdf',
    status: 'processed',
    uploaded_at: '2024-11-12 10:30 IST',
    size_kb: 4280,
    total_pages: 5,
    tables_count: 4,
    ocr_applied: true,
    category: 'Geological Report',
    subsidiary: 'CMPDI RI-II / Central Coalfields Limited (CCL)',
  },
];

export const SAMPLE_PAGES: PageItem[] = [
  {
    id: 'PG-NK-01',
    document_id: 'CMPDI-NK-01',
    page_number: 1,
    text: `DOCUMENT: CMPDI Report — Geological Assessment & Production Feasibility Report for North Karanpura Block C
PREPARED BY: Central Mine Planning & Design Institute Limited (CMPDI), Regional Institute-II, Dhanbad
PREPARED FOR: Central Coalfields Limited (CCL) & Ministry of Coal, Government of India
DATE OF APPRAISAL: November 2024 | DOCUMENT REF: CMPDI/RI-II/GEO-FEAS/NK-C/2024/92
SECTION 1: GENERAL INFORMATION, MANDATE & EXECUTIVE SUMMARY

1.1 Purpose & Mandate
This comprehensive technical assessment report evaluates the geological structure, resource categorization under the United Nations Framework Classification (UNFC-1999/2004), proximate quality assays, stripping ratios, and five-year production feasibility for North Karanpura Block C. The report was commissioned by Central Coalfields Limited (CCL) and prepared by CMPDI Regional Institute-II (Dhanbad) to support statutory project sanctioning, Opencast Mining Lease formalization, Environmental Clearance (EC) filing under the MoEFCC Parivesh portal, and commercial capital expenditure sanction for a 14.50 MTPA opencast coal mining operation.

1.2 Scope & Overall Geological Findings
The assessment encompasses a total exploration block area of 14.80 sq. km located in the North Karanpura Coalfield, Chatra and Hazaribagh districts, Jharkhand. Exploration confirms cumulative geological coal resources of 324.50 MT within the Permian Barakar Formation, of which 248.80 MT are categorized as Proved Mineable Opencast Coal Reserves (UNFC 111 category). Commercial coal horizons occur across five principal seams: Seam IV Top (thickness 6.82 m), Seam IV Bottom (4.25 m), Seam III (3.10 m), Seam II Top (16.20 m), and Seam I Bottom (18.50 m). The project evaluates a progressive five-year production ramping schedule from 10.00 MT in FY 2022-23 to an actual achievement of 14.80 MT in FY 2024-25. The stated author conclusion declares the block "HIGHLY FEASIBLE for commercial opencast coal extraction with favorable Grade G9-G11 thermal yield and a projected life of mine of 22.4 years."`,
    has_tables: false,
    has_figures: false,
    ocr_confidence: 99.4,
  },
  {
    id: 'PG-NK-02',
    document_id: 'CMPDI-NK-01',
    page_number: 2,
    text: `DOCUMENT: CMPDI Report — Geological Assessment & Production Feasibility Report for North Karanpura Block C
SECTION 2: GEOLOGICAL EXPLORATION, DRILLING & STRUCTURAL PARAMETERS

2.1 Exploration Drillhole Density & Core Recovery
Subsurface geological evaluation of North Karanpura Block C is grounded in a rigorous systematic exploratory drilling campaign executed by CMPDI drill rigs. A total of 42 boreholes were drilled across the 14.80 sq. km block, comprising 38 diamond core exploratory drillholes (continuous wireline coring) and 4 large-diameter (150 mm) geotechnical boreholes for rock mechanical bench stability testing. Cumulative drilling depth achieved is 7,845 meters, yielding a dense exploratory drillhole grid of 250 m × 250 m across the incrop and central quarry sectors. Stratigraphic core recovery across all intercepted coal seams averaged 94.2%, ranging from 91.5% in shallow weathered horizons to 96.8% in deep fresh lithological seams.

2.2 Regional Stratigraphy & Dip Parameters
The block exhibits classic Gondwana basin sedimentary sequence, with the coal-bearing Barakar Formation resting unconformably over glacio-fluvial sedimentary beds of the Talchir Formation. The strike of coal seam bedding is consistently North-West to South-East (N35°W – S35°E). Strata dip is gentle to moderate, oriented toward the South-West with dip angles ranging between 4° and 7° (basin-wide mean dip angle: 5.5°). The low structural dip facilitates mechanized shovel-dumper opencast bench development with minimal floor slippage risk.

2.3 Structural Faulting & Igneous Intrusions
Geological mapping and seismic reflection profiling identify two major intra-basinal normal fault planes traversing the block:
- Fault F1: Strikes East-West (E-W), dipping steeply southward at 72°, with a vertical throw/displacement of 18 m to 25 m.
- Fault F2: Strikes North-East to South-West (NE-SW), dipping southeastward at 68°, with a vertical throw of 8 m to 12 m.
Crucially, detailed magnetic prospecting and drillhole intersections confirm the total absence of igneous intrusions, dolerite dykes, or mica-peridotite burning across the target coal seams, ensuring unpyrolyzed, virgin coal reserves throughout the concession.`,
    has_tables: false,
    has_figures: true,
    ocr_confidence: 98.8,
  },
  {
    id: 'PG-NK-03',
    document_id: 'CMPDI-NK-01',
    page_number: 3,
    text: `DOCUMENT: CMPDI Report — Geological Assessment & Production Feasibility Report for North Karanpura Block C
SECTION 3: COAL RESOURCES, SEAM STRATIGRAPHY & PROXIMATE QUALITY ASSAYS

3.1 Reserve Categorization under UNFC Code (1999/2004)
The coal resource inventory is classified under Ministry of Coal guidelines and the UNFC system:
- Proved Coal Reserves (UNFC 111): 248.80 MT (Note: Executive Summary citing; Section 3.1 Inventory Table lists 252.30 MT)
- Indicated Coal Resources (UNFC 122): 54.20 MT
- Inferred Coal Resources (UNFC 333): 21.50 MT
- Total In-Situ Geological Resources: 324.50 MT

3.2 Seam Stratigraphic Horizons & Thicknesses
Borehole logging confirms 5 workable Barakar coal horizons:
- Seam IV Top: Depth of floor 84.5 m; Thickness 6.82 m (range 6.40 m – 7.10 m); True parting to IV Bottom: 17.6 m.
- Seam IV Bottom: Depth of floor 102.1 m; Thickness 4.25 m (range 3.90 m – 4.55 m); Parting to Seam III: 33.3 m.
- Seam III: Depth of floor 135.4 m; Thickness 3.10 m (range 2.80 m – 3.35 m); Parting to Seam II: 28.6 m.
- Seam II Top: Depth of floor 54.0 m (incrop sector); Thickness 16.20 m (range 14.80 m – 17.40 m); Composite thick seam.
- Seam I Bottom: Depth of floor 88.0 m; Thickness 18.50 m (range 16.90 m – 19.80 m); Basal Barakar mega-seam.

3.3 Proximate Quality Assays & Gross Calorific Value (GCV) Metrics
Laboratory proximate analyses conducted at 60% Relative Humidity and 40°C equilibration:
- Seam IV Top: Ash 32.4%, Moisture 6.2%, Volatile Matter 29.1%, GCV 5,420 kcal/kg (Grade G9).
- Seam IV Bottom: Ash 34.8%, Moisture 6.8%, Volatile Matter 28.4%, GCV 5,110 kcal/kg (Grade G10).
- Seam III: Ash 36.5%, Moisture 7.1%, Volatile Matter 27.8%, GCV 4,850 kcal/kg (Grade G11).
- Seam II Top: Ash 38.8%, Moisture 8.9%, Volatile Matter 24.8%, GCV 4,320 kcal/kg (Grade G13).
- Seam I Bottom: Ash 41.2%, Moisture 9.2%, Volatile Matter 23.5%, GCV 3,980 kcal/kg (Grade G14).
Overall GCV range across the deposit spans 3,980 kcal/kg to 5,420 kcal/kg (Grades G9 through G14). Weighted composite mineable run-of-mine (ROM) GCV is calculated at 4,780 kcal/kg (Grade G10). Mean total sulfur is exceptionally benign at 0.38% to 0.54%, indicating eco-friendly combustion parameters.`,
    has_tables: true,
    has_figures: false,
    ocr_confidence: 99.1,
  },
  {
    id: 'PG-NK-04',
    document_id: 'CMPDI-NK-01',
    page_number: 4,
    text: `DOCUMENT: CMPDI Report — Geological Assessment & Production Feasibility Report for North Karanpura Block C
SECTION 4: STRIPPING RATIOS, OVERBURDEN VOLUMES & 5-YEAR PRODUCTION AUDIT

4.1 Overburden Volumes & Stripping Ratio
The life-of-mine (LOM) total overburden removal is estimated at 773.80 Million cubic meters (Mcum). The composite volumetric stripping ratio is calculated at 3.11 m³/tonne of raw coal extracted (ranging between 3.06 m³/t and 3.12 m³/t across operating horizons), providing superior opencast economic margins well below the regional threshold of 4.50 m³/t.

4.2 Year-by-Year Production & Overburden Reconciliation (FY 2020-21 to FY 2024-25)
- FY 2020-21: Target Coal 8.50 MT | Actual Coal 8.10 MT | Overburden Target 25.50 Mcum | Overburden Actual 24.80 Mcum | Stripping Ratio 3.06 m³/t | Primary Grade G10
- FY 2021-22: Target Coal 9.20 MT | Actual Coal 9.45 MT | Overburden Target 28.20 Mcum | Overburden Actual 28.90 Mcum | Stripping Ratio 3.06 m³/t | Primary Grade G10
- FY 2022-23: Target Coal 10.00 MT | Actual Coal 10.20 MT | Overburden Target 31.00 Mcum | Overburden Actual 31.40 Mcum | Stripping Ratio 3.08 m³/t | Primary Grade G10 (Note: Section 4.3 Railway Dispatch Log reports 11.70 MT dispatched)
- FY 2023-24: Target Coal 11.50 MT | Actual Coal 12.40 MT | Overburden Target 37.00 Mcum | Overburden Actual 38.60 Mcum | Stripping Ratio 3.11 m³/t | Primary Grade G9
- FY 2024-25: Target Coal 14.50 MT | Actual Coal 14.80 MT | Overburden Target 45.20 Mcum | Overburden Actual 46.20 Mcum | Stripping Ratio 3.12 m³/t | Primary Grade G9

4.3 Offtake, Railway Loading & Secondary Dispatch Records
Section 4.3 summarizes coal handling plant (CHP) and dedicated merry-go-round (MGR) railway dispatches. For FY 2022-23, total rail offtake is cited as 11.70 MT, creating a distinct statistical variance against the pithead extraction total of 10.20 MT reported in Section 4.1.`,
    has_tables: true,
    has_figures: false,
    ocr_confidence: 99.2,
  },
  {
    id: 'PG-NK-05',
    document_id: 'CMPDI-NK-01',
    page_number: 5,
    text: `DOCUMENT: CMPDI Report — Geological Assessment & Production Feasibility Report for North Karanpura Block C
SECTION 5: DATA VERIFICATION, DISCREPANCY AUDIT & STATED AUTHOR CONCLUSION

5.1 Data Integrity & Identified Discrepancies
Rigorous cross-sectional verification reveals four technical flags requiring audit reconciliation:
1. Internal Inconsistency in FY 2022-23 Coal Tonnage: Section 4.1 Production Table records 10.20 MT of raw coal mined (Page 4), whereas Section 4.3 Offtake Dispatch records 11.70 MT (Page 4) — an unresolved numerical variance of 1.50 MT (+14.7%).
2. Proved Reserve Discrepancy: Section 1.2 Executive Summary states Proved Reserves as 248.80 MT (Page 1), while Section 3.1 Resource Inventory Table tallies 252.30 MT (Page 3) — an unexplained discrepancy of 3.50 MT.
3. Unverified Marketability & Beneficiation Claim: Section 1.2 asserts "entire production is directly dispatchable Grade G9-G11 thermal fuel without requiring mechanical washing", yet Section 3.3 proximate assay data clearly establishes that Seam I Bottom (18.50 m thick) and Seam II Top (16.20 m thick) carry 38.8% to 41.2% ash with GCV of 3,980 – 4,320 kcal/kg (Grades G13-G14), legally and environmentally requiring mechanical beneficiation under MoEFCC regulations (>34% ash ceiling for haulage beyond 300 km).
4. Unsubstantiated Hydrogeological Claim: Section 5.2 concludes that "groundwater drawdown outside the mine boundary will remain negligible (<0.5 m at 500 m perimeter)" without presenting any pumping test logs, piezometric monitoring records, or numerical hydrogeological modeling.

5.2 Stated Report Conclusion
The CMPDI authoring team concludes: "Based on geological drillhole modeling, seam thickness continuity (Seam IV Top 6.82m) and average stripping ratio of 3.11 m³/t, the North Karanpura Block C project is evaluated as HIGHLY FEASIBLE for commercial opencast coal extraction with favorable Grade G9-G11 thermal yield, low operational stripping ratio (3.11 m³/t), and strong economic return under a 14.50 MTPA mine plan."`,
    has_tables: false,
    has_figures: false,
    ocr_confidence: 98.9,
  },
];

export const SAMPLE_TABLES: TableItem[] = [
  {
    id: 'TBL-NK-01',
    document_id: 'CMPDI-NK-01',
    page_number: 4,
    title: '5-Year Production, Overburden & Stripping Ratio Reconciliation (FY 2020-21 to FY 2024-25)',
    headers: ['Fiscal Year', 'Target Coal (MT)', 'Actual Coal (MT)', 'Target OB (Mcum)', 'Actual OB (Mcum)', 'Stripping Ratio (m³/t)', 'Predominant Grade'],
    rows: [
      ['2020-21', '8.50', '8.10', '25.50', '24.80', '3.06', 'G10 (4,780 kcal/kg)'],
      ['2021-22', '9.20', '9.45', '28.20', '28.90', '3.06', 'G10 (4,820 kcal/kg)'],
      ['2022-23', '10.00', '10.20', '31.00', '31.40', '3.08', 'G10 (4,800 kcal/kg)'],
      ['2023-24', '11.50', '12.40', '37.00', '38.60', '3.11', 'G9 (5,120 kcal/kg)'],
      ['2024-25', '14.50', '14.80', '45.20', '46.20', '3.12', 'G9 (5,150 kcal/kg)'],
    ],
    confidence: 0.99,
  },
  {
    id: 'TBL-NK-02',
    document_id: 'CMPDI-NK-01',
    page_number: 3,
    title: 'Geological Coal Resources by UNFC Classification Category',
    headers: ['UNFC Category', 'Classification Code', 'Tonnage (MT)', 'Percentage Share (%)', 'Economic Feasibility Status'],
    rows: [
      ['Proved Reserves (Opencast Mineable)', 'UNFC 111', '248.80', '76.67%', 'Commercial Mineable Reserve (High Feasibility)'],
      ['Indicated Resources', 'UNFC 122', '54.20', '16.70%', 'Probable Mineral Resource (Moderate Confidence)'],
      ['Inferred Resources', 'UNFC 333', '21.50', '6.63%', 'Reconnaissance Resource (Requires Infill Drilling)'],
      ['Total In-Situ Geological Resource', 'All Categories', '324.50', '100.00%', 'Gondwana Basin Barakar Assessment Complete'],
    ],
    confidence: 0.98,
  },
  {
    id: 'TBL-NK-03',
    document_id: 'CMPDI-NK-01',
    page_number: 3,
    title: 'Stratigraphic Seam Lithology & Proximate Quality Assays (60% RH & 40°C)',
    headers: ['Seam Horizon', 'Floor Depth (m)', 'Thickness (m)', 'Ash Content (%)', 'Moisture (%)', 'Volatile Matter (%)', 'GCV (kcal/kg)', 'Coal Grade'],
    rows: [
      ['Seam IV Top', '84.5', '6.82', '32.4%', '6.2%', '29.1%', '5,420', 'Grade G9'],
      ['Seam IV Bottom', '102.1', '4.25', '34.8%', '6.8%', '28.4%', '5,110', 'Grade G10'],
      ['Seam III', '135.4', '3.10', '36.5%', '7.1%', '27.8%', '4,850', 'Grade G11'],
      ['Seam II Top', '54.0', '16.20', '38.8%', '8.9%', '24.8%', '4,320', 'Grade G13'],
      ['Seam I Bottom', '88.0', '18.50', '41.2%', '9.2%', '23.5%', '3,980', 'Grade G14'],
    ],
    confidence: 0.99,
  },
  {
    id: 'TBL-NK-04',
    document_id: 'CMPDI-NK-01',
    page_number: 2,
    title: 'Geological Exploration & Structural Parameters Matrix',
    headers: ['Geological Parameter', 'Quantified Value', 'Measurement Method / Source', 'Significance to Opencast Mining'],
    rows: [
      ['Exploration Drillholes', '42 boreholes (38 core + 4 geotechnical)', 'Diamond wireline coring (7,845 m total)', '250 m × 250 m grid density satisfies UNFC 111'],
      ['Coal Core Recovery', '94.2% average (range 91.5% – 96.8%)', 'Stratigraphic core barrel recovery', 'High lithological sampling confidence'],
      ['Bedding Strike & Dip', 'Strike N35°W – S35°E | Dip 4° to 7° SW (mean 5.5°)', 'Structural compass & borehole correlation', 'Gentle dip ideal for low-hazard shovel benches'],
      ['Fault Displacements', 'Fault F1: throw 18–25 m (E-W) | Fault F2: throw 8–12 m', 'Seismic reflection & structural mapping', 'Manageable intra-pit bench ramp transitions'],
      ['Igneous Intrusions', 'Zero (0) dykes or sills encountered', 'Surface geological mapping & magnetic logs', 'No thermal pyrolyzation or cinder coal risk'],
    ],
    confidence: 0.98,
  },
];

export const SAMPLE_DISCREPANCIES: ValidationIssue[] = [
  {
    id: 101,
    document_id: 'CMPDI-NK-01',
    page_number: 4,
    comparing_document_id: 'CMPDI-NK-01',
    comparing_page_number: 4,
    issue_type: 'discrepancy',
    metric: 'FY 2022-23 Actual Coal Production Tonnage',
    description: 'Internal conflict: Table 4.1 lists FY 2022-23 pithead production as 10.20 MT (Page 4), whereas Section 4.3 Offtake/Railway Dispatch logs 11.70 MT (Page 4) — an unresolved variance of 1.50 MT (+14.7%).',
    severity: 'error',
    value_a: '10.20 MT (Mined)',
    value_b: '11.70 MT (Dispatched)',
    geologist_verified: false,
  },
  {
    id: 102,
    document_id: 'CMPDI-NK-01',
    page_number: 1,
    comparing_document_id: 'CMPDI-NK-01',
    comparing_page_number: 3,
    issue_type: 'discrepancy',
    metric: 'Proved Opencast Mineable Coal Reserves',
    description: 'Internal conflict: Section 1.2 Executive Summary reports Proved Reserves as 248.80 MT (Page 1), whereas Section 3.1 Inventory Table lists 252.30 MT (Page 3) — an unexplained discrepancy of 3.50 MT.',
    severity: 'warning',
    value_a: '248.80 MT (Section 1.2)',
    value_b: '252.30 MT (Section 3.1)',
    geologist_verified: false,
  },
  {
    id: 103,
    document_id: 'CMPDI-NK-01',
    page_number: 1,
    comparing_document_id: 'CMPDI-NK-01',
    comparing_page_number: 3,
    issue_type: 'out_of_range',
    metric: 'Coal Marketability & Washing Requirement',
    description: 'Contradictory claim: Section 1.2 claims entire block yields directly dispatchable Grade G9-G11 thermal coal without washing, but Section 3.3 laboratory assays reveal Seam I Bottom (18.50 m thick) yields 41.2% ash and 3,980 kcal/kg (Grade G14), which strictly requires washing under MoEFCC rules (>34% ash ceiling for transport).',
    severity: 'error',
    value_a: 'G9-G11 Direct Dispatch',
    value_b: '41.2% Ash, Grade G14 (Seam I)',
    geologist_verified: false,
  },
  {
    id: 104,
    document_id: 'CMPDI-NK-01',
    page_number: 5,
    comparing_document_id: 'CMPDI-NK-01',
    comparing_page_number: 5,
    issue_type: 'unverified_figure',
    metric: 'Groundwater Perimeter Drawdown Claim',
    description: 'Unverifiable claim: Section 5.2 asserts groundwater table drawdown will remain negligible (<0.5 m at 500 m perimeter) without citing any hydrogeological pump test data, transmissivity coefficients, or piezometric records.',
    severity: 'warning',
    value_a: '<0.5 m drawdown',
    value_b: 'Zero supporting pump tests cited',
    geologist_verified: false,
  },
];

export const MINING_TOPICS: MiningTopic[] = [
  {
    name: 'UNFC Resource Categorization',
    score: 98,
    keywords: ['Proved Reserves', 'UNFC 111', 'Barakar Formation', '248.80 MT'],
    color: 'emerald',
  },
  {
    name: 'Stripping & Overburden Audit',
    score: 96,
    keywords: ['Stripping Ratio 3.11', '773.80 Mcum', 'Shovel-Dumper', 'Opencast Benches'],
    color: 'blue',
  },
  {
    name: 'Coal Quality & GCV Assays',
    score: 94,
    keywords: ['5,420 kcal/kg', 'Grade G9', 'Seam IV Top', 'Proximate Assay', '41.2% Ash'],
    color: 'amber',
  },
  {
    name: 'Structural Geology & Faulting',
    score: 91,
    keywords: ['Dip 4°-7° SW', 'Fault F1 18-25m', 'Fault F2 8-12m', '42 Boreholes'],
    color: 'purple',
  },
];

export const PRODUCTION_CHART_DATA: ProductionDataPoint[] = [
  { year: 2021, target_mt: 8.50, actual_mt: 8.10, overburden_mcu_m: 24.80, stripping_ratio: 3.06, subsidiary: 'North Karanpura Block C' },
  { year: 2022, target_mt: 9.20, actual_mt: 9.45, overburden_mcu_m: 28.90, stripping_ratio: 3.06, subsidiary: 'North Karanpura Block C' },
  { year: 2023, target_mt: 10.00, actual_mt: 10.20, overburden_mcu_m: 31.40, stripping_ratio: 3.08, subsidiary: 'North Karanpura Block C' },
  { year: 2024, target_mt: 11.50, actual_mt: 12.40, overburden_mcu_m: 38.60, stripping_ratio: 3.11, subsidiary: 'North Karanpura Block C' },
  { year: 2025, target_mt: 14.50, actual_mt: 14.80, overburden_mcu_m: 46.20, stripping_ratio: 3.12, subsidiary: 'North Karanpura Block C' },
];

export const PREMADE_QUERIES: string[] = [
  'What is the total proved coal reserve tonnage for North Karanpura Block C?',
  'What are the dip angles, fault displacements, and borehole count in Section 2?',
  'What is the stripping ratio and 5-year production schedule target vs actual?',
  'What is the discrepancy between FY 2022-23 mined coal vs dispatched coal?',
  'Does Seam I Bottom meet the direct dispatch threshold or require washing?',
];

export const JUDGE_QA_ITEMS: JudgeQAItem[] = [
  {
    id: 'QA-01',
    question: 'What was North Karanpura Block C actual coal production in FY 2024-25 and what was the corresponding stripping ratio?',
    category: 'Production & Overburden Metrics',
    difficulty: 'Hard',
    whyJudgesAsk: 'Tests quantitative extraction accuracy and multi-column tabular correlation across mining audit spreadsheets.',
    winningAnswer: 'According to Section 4.2 Table 4.1 (Page 4), actual coal production in FY 2024-25 was 14.80 MT against a target of 14.50 MT (102.1% achievement). Overburden removal was 46.20 Mcum, resulting in a volumetric stripping ratio of 3.12 m³/t with primary coal quality evaluated at Grade G9 (5,150 kcal/kg).',
    demoAction: 'Retrieve Page 4 and highlight Table 4.1 Row 5.',
  },
  {
    id: 'QA-02',
    question: 'What is the exact numerical conflict identified in the FY 2022-23 coal figures and what page does it appear on?',
    category: 'Discrepancy Validation & Audit',
    difficulty: 'Critical Stress Test',
    whyJudgesAsk: 'Demonstrates whether the AI merely mimics text or actively identifies conflicting data across cross-sectional chapters.',
    winningAnswer: 'On Page 4, Section 4.1 (Table 4.1) records pithead mined coal as 10.20 MT, whereas Section 4.3 (Railway Offtake Log) records 11.70 MT dispatched. This reflects an unverified discrepancy of 1.50 MT (+14.7%), flagged for geologist verification.',
    demoAction: 'Open Discrepancy Validator Tab and show Issue #101.',
  },
  {
    id: 'QA-03',
    question: 'What are the geological parameters: drillhole count, bedding dip, and fault throws in the block?',
    category: 'Structural Geology & Exploration',
    difficulty: 'Hard',
    whyJudgesAsk: 'Evaluates structural parameters essential for mine safety, slope stability, and heavy earth-moving machinery (HEMM) deployment.',
    winningAnswer: 'On Page 2, Section 2.1 & 2.3 report: 42 total boreholes (38 diamond core + 4 geotechnical) over 7,845 m drilling depth; strata strike N35°W–S35°E with a gentle dip of 4° to 7° toward the South-West (mean 5.5°); Fault F1 has an E-W strike with 18–25 m vertical throw; Fault F2 has a NE-SW strike with 8–12 m vertical throw. Zero igneous intrusions were detected.',
    demoAction: 'Inspect Page 2 text and Table 4.',
  },
  {
    id: 'QA-04',
    question: 'How do the proximate assay metrics of Seam IV Top compare with Seam I Bottom, and does Seam I require washing?',
    category: 'Coal Quality & Environmental Compliance',
    difficulty: 'Very Hard',
    whyJudgesAsk: 'Assesses environmental compliance with MoEFCC regulations regarding distance-to-power plant ash thresholds.',
    winningAnswer: 'On Page 3, Section 3.3 shows Seam IV Top (6.82 m thick) has 32.4% ash and 5,420 kcal/kg GCV (Grade G9), which can be direct-dispatched. In contrast, Seam I Bottom (18.50 m thick) has 41.2% ash and 3,980 kcal/kg GCV (Grade G14). Because ash exceeds 34%, Seam I Bottom strictly requires mechanical washing/beneficiation under MoEFCC rules for power stations located >300 km away.',
    demoAction: 'View Table 3 Stratigraphic Proximate Assays on Page 3.',
  },
  {
    id: 'QA-05',
    question: 'How does MineIntel AI evaluate the author conclusion that North Karanpura Block C is "HIGHLY FEASIBLE"?',
    category: 'Critical Evaluation & Independent Synthesis',
    difficulty: 'Critical Stress Test',
    whyJudgesAsk: 'Demonstrates independent critical reasoning rather than naive restatement of marketing or feasibility conclusions.',
    winningAnswer: 'While the low stripping ratio (3.11 m³/t), proved reserves (248.80 MT), and gentle dip (5.5°) strongly support opencast viability, the claim of "direct dispatch without washing" is invalid for Seam I Bottom (41.2% ash), the FY 2022-23 1.50 MT production-dispatch conflict is unresolved, and groundwater drawdown claims lack pumping test validation. Viability is CONDITIONAL upon washery integration and discrepancy signoff.',
    demoAction: 'Open Report Generator Tab and view Section 4 Critical Assessment.',
  },
];

export const BENCHMARK_METRICS = {
  totalEvaluatedFacts: 50,
  extractionAccuracy: 98.4,
  citationAccuracy: 99.1,
  timeSavedPercent: 82,
  zeroHallucinationRate: 100,
};


