/**
 * Parse CSV file and return array of objects
 */
export const parseCSV = (csvText: string): Record<string, string>[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]);
  
  // Parse data rows
  const data: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || '';
      });
      data.push(row);
    }
  }
  
  return data;
};

/**
 * Parse a single CSV line, handling quoted values
 */
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  
  return result;
};

/**
 * Validate imported data against expected columns
 */
export const validateImportData = (
  data: Record<string, string>[],
  requiredColumns: string[]
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (data.length === 0) {
    errors.push('No data found in CSV file');
    return { valid: false, errors };
  }
  
  const headers = Object.keys(data[0]);
  const missingColumns = requiredColumns.filter(col => !headers.includes(col));
  
  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }
  
  return { valid: errors.length === 0, errors };
};

// Required columns for each data type
export const importRequiredColumns: Record<string, string[]> = {
  team: ['name', 'position', 'role', 'bio'],
  programs: ['title', 'description'],
  testimonials: ['name', 'quote'],
  metrics: ['metric_name', 'metric_value'],
  stories: ['title', 'description'],
  gallery: ['title'],
};

// Optional columns for each data type
export const importOptionalColumns: Record<string, string[]> = {
  team: ['active'],
  programs: ['category', 'icon', 'active'],
  testimonials: ['role', 'active'],
  metrics: ['category', 'icon', 'active'],
  stories: ['category', 'active'],
  gallery: ['description', 'category', 'active'],
};

// Sample data for CSV templates
const templateSampleData: Record<string, Record<string, string>> = {
  team: { name: 'John Doe', position: 'Director', role: 'leadership', bio: 'A passionate leader with 10 years of experience.', active: 'true' },
  programs: { title: 'Youth Education', description: 'Empowering young minds through quality education.', category: 'education', icon: 'GraduationCap', active: 'true' },
  testimonials: { name: 'Jane Smith', quote: 'This organization changed my life!', role: 'Volunteer', active: 'true' },
  metrics: { metric_name: 'Students Helped', metric_value: '5000+', category: 'education', icon: 'Users', active: 'true' },
  stories: { title: 'A Journey of Hope', description: 'How one child transformed their future through our programs.', category: 'success', active: 'true' },
  gallery: { title: 'Community Event 2024', description: 'Annual gathering of volunteers and beneficiaries.', category: 'events', active: 'true' },
};

/**
 * Generate CSV template content for a specific data type
 */
export const generateCSVTemplate = (dataType: string): string => {
  const required = importRequiredColumns[dataType] || [];
  const optional = importOptionalColumns[dataType] || [];
  const allColumns = [...required, ...optional];
  const sampleData = templateSampleData[dataType] || {};

  // Header row
  const header = allColumns.join(',');
  
  // Sample data row
  const sampleRow = allColumns.map(col => {
    const value = sampleData[col] || '';
    // Wrap in quotes if contains comma or is multi-word
    return value.includes(',') || value.includes(' ') ? `"${value}"` : value;
  }).join(',');

  return `${header}\n${sampleRow}`;
};

/**
 * Download CSV template for a specific data type
 */
export const downloadCSVTemplate = (dataType: string): void => {
  const content = generateCSVTemplate(dataType);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${dataType}_import_template.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
