import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In a real application, this would invoke an OpenAI or LangChain agent
    // For the hackathon boilerplate, we return a mock structured response
    return NextResponse.json({
      status: "PENDING_APPROVAL",
      decision: "TERMINATE_RESOURCE",
      resource_id: "i-0idle0000test0000",
      estimated_monthly_savings: 306.00,
      reasoning: "Instance CPU usage has been below 1% for 60 days. Recommend immediate termination to recover costs."
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
