import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function PUT(request, context) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    const body = await request.json();
    const projects = getProjects();
    const index = projects.findIndex(p => String(p.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    const updated = {
      ...projects[index],
      ...body,
      tags: Array.isArray(body.tags) 
        ? body.tags 
        : (body.tags ? body.tags.split(',').map(t => t.trim()).filter(Boolean) : projects[index].tags)
    };

    projects[index] = updated;
    saveProjects(projects);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    const projects = getProjects();
    const filtered = projects.filter(p => String(p.id) !== String(id));

    if (filtered.length === projects.length) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    saveProjects(filtered);
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}