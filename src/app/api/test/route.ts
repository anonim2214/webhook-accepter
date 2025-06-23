import {NextRequest, NextResponse} from "next/server";
import {webHooks} from "@/app/api/data";
import {createRelease} from "@/tasks/sanity/createRelease";
import {getActiveReleases} from "@/tasks/sanity/getActiveReleases";


export async function POST(request: NextRequest) {
    const response = await getActiveReleases();
    console.log(JSON.stringify(response.data));
    return NextResponse.json({  })
}