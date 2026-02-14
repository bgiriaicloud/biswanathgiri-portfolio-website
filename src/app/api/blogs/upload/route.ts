import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const id = formData.get('id') as string;

        if (!file || !id) {
            return NextResponse.json({ error: 'Missing file or id' }, { status: 400 });
        }

        console.log(`Starting upload for article ${id}, file: ${file.name}, type: ${file.type}`);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const destination = `media/${id}/${fileName}`;

        console.log(`Uploading to destination: ${destination}`);

        const { uploadArticleMedia } = await import('@/lib/gcs');
        const publicUrl = await uploadArticleMedia(destination, buffer, file.type);

        console.log(`Upload successful. Public URL: ${publicUrl}`);

        return NextResponse.json({ publicUrl });
    } catch (error: any) {
        console.error('Upload Error Details:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        return NextResponse.json({
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
