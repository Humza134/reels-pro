import { IVideo } from "@/models/Video";

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
};

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const {method = "GET", body, headers} = options;
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };
        const res = await fetch(`http://localhost:3000/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })
        // console.log("RES: ", res)
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Failed to upload video");
        }
        console.log("RES: ", res)
        const data = await res.json();
        return data;
    }

    async getVideos() {
        return this.fetch("/video");
    }

    async createVide(videoData: IVideo) {
        return this.fetch("/video", {method: "POST", body: videoData});
    }
}

export const apiClient = new ApiClient();