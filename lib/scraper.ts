import * as cheerio from "cheerio";

export interface ScrapedContent {
  url: string;
  title: string;
  description: string;
  headings: string[];
  bodyText: string;
  links: { text: string; href: string }[];
  images: { alt: string; src: string }[];
  meta: Record<string, string>;
}

export async function scrapeUrl(url: string): Promise<ScrapedContent> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "AgenticFirstReview/1.0 (Website Review Bot)",
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove script and style tags
  $("script, style, noscript, iframe").remove();

  const title = $("title").text().trim() || "";
  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";

  const headings: string[] = [];
  $("h1, h2, h3, h4").each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length < 200) headings.push(text);
  });

  // Get body text (limited to avoid huge payloads)
  const bodyText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000);

  const links: { text: string; href: string }[] = [];
  $("a[href]").each((_, el) => {
    const text = $(el).text().trim();
    const href = $(el).attr("href") || "";
    if (text && href && links.length < 50) {
      links.push({ text: text.slice(0, 100), href: href.slice(0, 200) });
    }
  });

  const images: { alt: string; src: string }[] = [];
  $("img[src]").each((_, el) => {
    const alt = $(el).attr("alt") || "";
    const src = $(el).attr("src") || "";
    if (src && images.length < 30) {
      images.push({ alt: alt.slice(0, 100), src: src.slice(0, 200) });
    }
  });

  const meta: Record<string, string> = {};
  $("meta[name], meta[property]").each((_, el) => {
    const name = $(el).attr("name") || $(el).attr("property") || "";
    const content = $(el).attr("content") || "";
    if (name && content) meta[name] = content.slice(0, 300);
  });

  return { url, title, description, headings, bodyText, links, images, meta };
}

export function contentToPromptText(content: ScrapedContent): string {
  const parts: string[] = [];
  parts.push(`URL: ${content.url}`);
  parts.push(`Title: ${content.title}`);
  if (content.description) parts.push(`Description: ${content.description}`);

  if (content.headings.length > 0) {
    parts.push(`\nHeadings:\n${content.headings.map((h) => `- ${h}`).join("\n")}`);
  }

  if (content.bodyText) {
    parts.push(`\nPage Content:\n${content.bodyText}`);
  }

  if (content.links.length > 0) {
    parts.push(
      `\nNavigation Links:\n${content.links
        .slice(0, 20)
        .map((l) => `- ${l.text} (${l.href})`)
        .join("\n")}`
    );
  }

  if (content.images.length > 0) {
    parts.push(
      `\nImages:\n${content.images
        .slice(0, 15)
        .map((img) => `- ${img.alt || "No alt text"} (${img.src})`)
        .join("\n")}`
    );
  }

  return parts.join("\n");
}
