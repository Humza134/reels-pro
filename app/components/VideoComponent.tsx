import { IVideo } from "@/models/Video";
import { Video } from "@imagekit/next";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <div
          className="rounded-xl overflow-hidden relative w-full"
          style={{ aspectRatio: "9/16" }}
        >
          <Video
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!} 
            src={video.videoUrl} // jo tumhe ImageKit ke response me mila
            transformation={[
              {
                height: "1920",
                width: "1080",
              },
            ]}
            controls
            className="w-full h-full object-cover"
          />
        </div>
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg">{video.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}