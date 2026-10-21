import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let projects = getProjects();
    if (category && category !== 'all') {
      projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized! Sirf Admin upload kar sakta hai.' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, tags, liveUrl, githubUrl, image, featured } = body;

    if (!title || !description || !category) {
      return NextResponse.json({ success: false, message: 'Title, description, and category are required' }, { status: 400 });
    }

    const projects = getProjects();
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      liveUrl: liveUrl || '#',
      githubUrl: githubUrl || '#',
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80',
      featured: Boolean(featured),
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString()
    };

    projects.unshift(newProject);
    saveProjects(projects);

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}