// API configuration and service layer for self-hosted PHP backend

// API base URL - update this to your PHP backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/backend/api';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

// Set auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

// Clear auth token
export const clearAuthToken = (): void => {
  localStorage.removeItem('admin_token');
};

// API request helper
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// ============ AUTH API ============

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    username: string;
    name: string;
    role: string;
  };
}

export interface VerifyResponse {
  valid: boolean;
  user: {
    id: number;
    username: string;
    name: string;
    role: string;
  };
}

export const authApi = {
  login: (username: string, password: string): Promise<LoginResponse> =>
    apiRequest('/auth.php?action=login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  verify: (): Promise<VerifyResponse> =>
    apiRequest('/auth.php?action=verify'),

  logout: (): void => {
    clearAuthToken();
  },
};

// ============ CONTENT API ============

export interface SiteContent {
  name?: string;
  tagline?: string;
  description?: string;
  nav?: Array<{ name: string; href: string }>;
  hero?: {
    title: string;
    subtitle: string;
    cta: { primary: string; secondary: string };
  };
  home?: {
    servicesSection: { title: string; subtitle: string };
    ctaSection: { title: string; subtitle: string; buttonText: string };
  };
  services?: Array<{ title: string; description: string; icon: string }>;
  servicesPage?: {
    hero: { title: string; subtitle: string };
    serviceDetails: Array<{
      title: string;
      icon: string;
      features: string[];
    }>;
    ctaSection: { title: string; subtitle: string; buttonText: string };
  };
  about?: {
    title: string;
    mission: string;
    values: Array<{ title: string; description: string }>;
    valuesSection: { title: string; subtitle: string };
    storySection: { title: string; paragraphs: string[] };
  };
  contact?: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  contactPage?: {
    hero: { title: string; subtitle: string };
    formSection: { title: string };
    infoSection: { title: string };
  };
  careersPage?: {
    hero: { title: string; subtitle: string };
    whyJoinSection: {
      title: string;
      subtitle: string;
      benefits: Array<{ title: string; description: string }>;
    };
    positionsSection: { title: string; subtitle: string };
    openPositions: Array<{
      title: string;
      department: string;
      location: string;
      type: string;
      description: string;
    }>;
  };
  footer?: {
    tagline: string;
    links: {
      company: Array<{ name: string; href: string }>;
      services: Array<{ name: string; href: string }>;
      legal: Array<{ name: string; href: string }>;
    };
  };
  dynamicPages?: DynamicPage[];
  staticPageOverrides?: Record<string, StaticPageOverride>;
}

export interface DynamicPage {
  id: string;
  name: string;
  path: string;
  content: string;
  status: 'Published' | 'Draft';
}

export interface StaticPageOverride {
  id: string;
  name: string;
  path: string;
  content: string;
  status: 'Published' | 'Draft';
}

export const contentApi = {
  get: (): Promise<SiteContent> =>
    apiRequest('/content.php'),

  update: (content: SiteContent): Promise<{ success: boolean }> =>
    apiRequest('/content.php', {
      method: 'PUT',
      body: JSON.stringify(content),
    }),
};

// ============ CONTACTS API ============

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'New' | 'Read' | 'Replied';
  submitted_at: string;
}

export const contactsApi = {
  list: (): Promise<Contact[]> =>
    apiRequest('/contacts.php'),

  submit: (data: { name: string; email: string; phone?: string; message: string }): Promise<{ success: boolean; id: number }> =>
    apiRequest('/contacts.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: number, status: Contact['status']): Promise<{ success: boolean }> =>
    apiRequest(`/contacts.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  delete: (id: number): Promise<{ success: boolean }> =>
    apiRequest(`/contacts.php?id=${id}`, {
      method: 'DELETE',
    }),
};

// ============ USERS API ============

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor';
  status: 'Active' | 'Inactive';
  created_at?: string;
}

export const usersApi = {
  list: (): Promise<AdminUser[]> =>
    apiRequest('/users.php'),

  create: (data: { username: string; password: string; name: string; email: string; role: string }): Promise<{ success: boolean; id: number; user: AdminUser }> =>
    apiRequest('/users.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (id: number): Promise<{ success: boolean }> =>
    apiRequest(`/users.php?id=${id}`, {
      method: 'DELETE',
    }),
};

// ============ PAGES API ============

export const pagesApi = {
  list: (): Promise<DynamicPage[]> =>
    apiRequest('/pages.php'),

  getByPath: (path: string): Promise<DynamicPage> =>
    apiRequest(`/pages.php?path=${encodeURIComponent(path)}`),

  create: (page: Omit<DynamicPage, 'id'> & { id?: string }): Promise<{ success: boolean; page: DynamicPage }> =>
    apiRequest('/pages.php', {
      method: 'POST',
      body: JSON.stringify(page),
    }),

  update: (id: string, page: Partial<DynamicPage>): Promise<{ success: boolean; page: DynamicPage }> =>
    apiRequest(`/pages.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(page),
    }),

  delete: (id: string): Promise<{ success: boolean }> =>
    apiRequest(`/pages.php?id=${id}`, {
      method: 'DELETE',
    }),
};
