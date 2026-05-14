import { createClient } from "./server";
import { cache } from "react";

export const getSiteConfig = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_config')
    .select('*');
  
  const config: Record<string, string> = {};
  data?.forEach(item => {
    config[item.key] = item.value;
  });
  return config;
});

export const getNavItems = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('nav_items')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  return data || [];
});

export const getFooterLinks = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('footer_links')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
});

export const getHeroSection = cache(async (page: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page', page)
    .single();
  return data;
});

export const getCTASection = cache(async (page: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('cta_sections')
    .select('*')
    .eq('page', page)
    .single();
  return data;
});

export const getSisterBrand = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('sister_brand')
    .select('*')
    .limit(1)
    .single();
  return data;
});

export const getServices = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
});

export const getServiceBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
});

export const getPortfolio = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
});

export const getProjectBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
});

export const getBlogPosts = cache(async (limit?: number) => {
  const supabase = await createClient();
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  
  if (limit) query = query.limit(limit);
  
  const { data } = await query;
  return data || [];
});

export const getPostBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
});

export const getFAQs = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
});

export const getTestimonials = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
});

export const getStats = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('about_stats')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
});
