/**
 * Export data to CSV or Excel format
 */

type ExportFormat = 'csv' | 'excel';

interface ExportOptions {
  filename: string;
  format: ExportFormat;
}

/**
 * Convert array of objects to CSV string
 */
const convertToCSV = (data: unknown[], columns: string[]): string => {
  if (data.length === 0) return '';
  
  // Header row
  const header = columns.join(',');
  
  // Data rows
  const rows = data.map(item => {
    const record = item as Record<string, unknown>;
    return columns.map(col => {
      const value = record[col];
      const stringValue = String(value);
      // Escape quotes and wrap in quotes if contains comma, newline, or quote
      if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',');
  });
  
  return [header, ...rows].join('\n');
};

/**
 * Download file
 */
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export data to CSV format
 */
export const exportToCSV = (
  data: unknown[],
  columns: string[],
  filename: string
) => {
  const csv = convertToCSV(data, columns);
  downloadFile(csv, `${filename}.csv`, 'text/csv;charset=utf-8;');
};

/**
 * Export data to Excel-compatible format (CSV with BOM for proper Excel encoding)
 */
export const exportToExcel = (
  data: unknown[],
  columns: string[],
  filename: string
) => {
  const csv = convertToCSV(data, columns);
  // Add BOM for Excel to recognize UTF-8
  const bom = '\uFEFF';
  downloadFile(bom + csv, `${filename}.xlsx`, 'application/vnd.ms-excel;charset=utf-8;');
};

/**
 * Generic export function
 */
export const exportData = (
  data: unknown[],
  columns: string[],
  options: ExportOptions
) => {
  if (options.format === 'excel') {
    exportToExcel(data, columns, options.filename);
  } else {
    exportToCSV(data, columns, options.filename);
  }
};

// Column configurations for each data type
export const exportColumns: Record<string, string[]> = {
  team: ['name', 'position', 'role', 'bio', 'active'],
  programs: ['title', 'description', 'category', 'icon', 'active'],
  testimonials: ['name', 'role', 'quote', 'active'],
  metrics: ['metric_name', 'metric_value', 'category', 'icon', 'active'],
  stories: ['title', 'description', 'category', 'view_count', 'active'],
  gallery: ['title', 'description', 'category', 'active'],
  volunteerProfiles: ['first_name', 'last_name', 'email', 'phone', 'city', 'country', 'status', 'skills', 'experience', 'motivation', 'created_at'],
  volunteerHours: ['volunteer_name', 'activity_date', 'hours', 'activity_type', 'description', 'location', 'verified', 'created_at'],
};
