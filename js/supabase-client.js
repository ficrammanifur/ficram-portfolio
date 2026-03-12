import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase error, falling back to JSON:', error);
      return await fetchProjectsFromJSON();
    }

    return data || [];
  } catch (err) {
    console.warn('Failed to fetch from Supabase:', err);
    return await fetchProjectsFromJSON();
  }
}

export async function fetchProjectsFromJSON() {
  try {
    const response = await fetch('/projects.json');
    const data = await response.json();
    return data.projects || [];
  } catch (err) {
    console.error('Failed to fetch projects from JSON:', err);
    return [];
  }
}
