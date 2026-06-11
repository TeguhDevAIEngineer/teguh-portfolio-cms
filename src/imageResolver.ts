import teguh01 from "./assets/images/teguh01.png";
import teguh02 from "./assets/images/teguh02.png";
import teguhProfile01 from "./assets/images/teguh_profile01.png";
import oldProfile1 from "./assets/images/teguh_profile_1780821846600.png";
import oldProfile2 from "./assets/images/teguh_profile_v2_1780822143876.png";

/**
 * Resolves a profile avatar URL string (whether it's raw string path or database state)
 * into a relative, compiled production-ready URL asset from Vite.
 */
export function resolveAvatarUrl(url: string | undefined): string {
  // If no URL, fallback in production is teguhProfile01
  if (!url) return teguhProfile01;

  // External web links are already valid production URLs
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  // Extract filename from the path
  const filename = url.split("/").pop();

  if (!filename) return teguhProfile01;

  // Map to the compiled production file assets
  if (filename.includes("teguh_profile01")) {
    return teguhProfile01;
  }
  if (filename.includes("teguh02")) {
    return teguh02;
  }
  if (filename.includes("teguh01")) {
    return teguh01;
  }
  if (filename.includes("teguh_profile_v2")) {
    return oldProfile2;
  }
  if (filename.includes("teguh_profile")) {
    return oldProfile1;
  }

  // Fallback to teguhProfile01
  return teguhProfile01;
}
