
import { apiClient } from "@/lib/api-client";
import VideoFeed from "./components/VideoFeed";

export default async function Home() {
  let videos: any = [];
  try {
    videos = await apiClient.getVideos();
  } catch (error) {
    console.error("Failed to fetch videos:", error);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Reels</h1>
      <VideoFeed videos={videos} />
    </main>
  );
}
