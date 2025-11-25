// Format tanggal (dd MMM yyyy) — contoh: "12 Feb 2025"
export const formatDate = (dateValue, options = {}) => {
  if (!dateValue) return '-';

  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

  const baseOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return date.toLocaleDateString('id-ID', {...baseOptions, ...options});
};

// Format tanggal + waktu — contoh: "12/02/2025 14.55"
export const formatDateTime = dateValue => {
  if (!dateValue) return '-';

  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  return date.toLocaleString('id-ID');
};

// Hitung selisih hari sampai jatuh tempo
export const calculateDaysUntilDue = dueDate => {
  if (!dueDate) return null;

  const due = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const now = new Date();

  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Konversi selisih hari → status pajak
export const getTaxStatus = dueDate => {
  const days = calculateDaysUntilDue(dueDate);

  if (days === null) return 'unknown';
  if (days < 0) return 'overdue';
  if (days <= 30) return 'warning';
  return 'active';
};

// Warna berdasarkan status pajak
export const getStatusColor = status => {
  const colors = {
    active: '#4CAF50',
    warning: '#FF9800',
    overdue: '#F44336',
    unknown: '#9E9E9E',
  };

  return colors[status] || colors.unknown;
};

// Label status pajak dalam bahasa Indonesia
export const getStatusLabel = status => {
  const labels = {
    active: 'Aktif',
    warning: 'Segera Jatuh Tempo',
    overdue: 'Jatuh Tempo',
    unknown: 'Tidak Diketahui',
  };

  return labels[status] || labels.unknown;
};

// Parse string → objek Date
export const parseDate = value => {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
};
