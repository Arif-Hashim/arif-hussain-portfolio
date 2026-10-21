import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('cv');

    if (!file) {
      return NextResponse.json({ success: false, message: 'Koi file select nahi ki gai' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicDir = path.join(process.cwd(), 'public');
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Always save as Arif_Hussain_Resume.pdf so the download link always works seamlessly
    const filePath = path.join(publicDir, 'Arif_Hussain_Resume.pdf');
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      message: 'CV kamyabi se upload ho gayi hai!',
      url: '/Arif_Hussain_Resume.pdf'
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
