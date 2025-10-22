"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload"; // Your FileUpload component
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoUrl) {
      alert("Please upload a video first!");
      return;
    }

    setLoading(true);

    try {
      const videoData: IVideo = {
          title,
          description,
          videoUrl, // yeh url ImageKit ka res.url hoga
          thumbnailUrl,
          controls: true,
      };

      await apiClient.createVide(videoData);

      alert("Video uploaded successfully ✅");
      setTitle("");
      setDescription("");
      setVideoUrl(null);
      setProgress(0);
    } catch (error) {
      console.error(error);
      alert("Failed to upload video ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-base-200 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">Upload a Video</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter video title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter video description"
          required
        />
      </div>

      {/* Video Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Video</label>
        <FileUpload
          fileType="video"
          onProgress={(p) => setProgress(p)}
           onSuccess={(res) => {
                setVideoUrl(res.url);
                setThumbnailUrl(res.thumbnailUrl); // 👈 yahan thumbnail set karo
              }} // ImageKit res se url save karna
        />
        {progress > 0 && <p className="text-sm">Uploading: {progress}%</p>}
        {videoUrl && <p className="text-green-600 text-sm mt-1">Video uploaded!</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}

export default VideoUploadForm;
