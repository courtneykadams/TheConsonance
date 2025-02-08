// src/app/api/hooktheory/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Example chord progression in Hooktheory's format (e.g., IV → I → V → vi)
  const chordProgression = "4,1,5,6"; // Example: F → C → G → Am

  // Retrieve API token from environment variables
  const token = process.env.HOOKTHEORY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Missing API token in environment variables." },
      { status: 500 }
    );
  }

  // Construct the URL
  const url = `https://api.hooktheory.com/v1/trends/songs?cp=${chordProgression}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching data, status code: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Hooktheory API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
