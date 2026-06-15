import { NextResponse } from 'next/server';
import mockDb from '@/data/mockDb.json';

export async function GET() {
  return NextResponse.json(mockDb.catalog);
}
