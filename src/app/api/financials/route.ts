import { NextResponse } from 'next/server';
import mockDb from '@/data/mockDb.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get('artistId') || '1';
  
  const artist = mockDb.artists.find(a => a.id === artistId) || mockDb.artists[0];
  
  return NextResponse.json({
    artistName: artist.name,
    ...artist.financials
  });
}
