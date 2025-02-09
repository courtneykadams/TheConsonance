// src/app/api/hooktheory/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const chordProgression = url.searchParams.get('cp');

  if (!chordProgression) {
    return NextResponse.json(
        { error: "Missing a chord progression." },
        { status: 400 }
    );
}

  // Retrieve API token from environment variables
  const token = process.env.HOOKTHEORY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Missing API token in environment variables." },
      { status: 500 }
    );
  }

  // Construct the URL
  const APIurl = `https://api.hooktheory.com/v1/trends/songs?cp=${chordProgression}`;

  try {
    const response = await fetch(APIurl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    console.log("Hooktheory API response:", response);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching data, status code: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Data from Hooktheory API:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Hooktheory API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
