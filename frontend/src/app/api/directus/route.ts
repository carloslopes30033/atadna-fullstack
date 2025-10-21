/**
 * Directus API Proxy
 * Forwards requests from browser to Directus running in Docker
 */

import { NextRequest, NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://atadna-directus:8055';
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/server/ping';
    
    // Remove the 'path' param and forward the rest
    searchParams.delete('path');
    const queryString = searchParams.toString();
    const fullUrl = `${DIRECTUS_URL}${path}${queryString ? `?${queryString}` : ''}`;
    
    console.log(`📡 Proxying to Directus: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('❌ Proxy error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    const body = await request.json();
    
    const fullUrl = `${DIRECTUS_URL}${path}`;
    
    console.log(`📡 Proxying POST to Directus: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('❌ Proxy error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
