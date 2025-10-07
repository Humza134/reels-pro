import Header from "../components/Header";
import { NotificationProvider } from "../components/Notification";
import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <NotificationProvider>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </NotificationProvider>
  );
}
