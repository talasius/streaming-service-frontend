import { PAGES } from "@/config/pages-url.config";

export function getMediaSource(path: string | undefined | null) {
	return PAGES.MEDIA_URL + path;
}
