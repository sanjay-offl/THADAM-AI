import BlogsClient from './BlogsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability Knowledge Hub | THADAM AI',
  description: 'Explore sustainability insights, environmental innovations, carbon reduction strategies, and AI-powered climate solutions.',
  alternates: {
    canonical: 'https://thadam.ai/blogs',
  },
  openGraph: {
    title: 'Sustainability Knowledge Hub | THADAM AI',
    description: 'Explore sustainability insights, environmental innovations, carbon reduction strategies, and AI-powered climate solutions.',
    type: 'website',
  }
};

export default function BlogsPage() {
  return <BlogsClient />;
}
