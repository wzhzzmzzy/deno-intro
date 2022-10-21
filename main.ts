import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { renderSlideApp } from './slides/slide.tsx'

async function handler(request: Request) {
  const decoder = new TextDecoder("utf-8");

  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/slide.md")) {
    const file = await Deno.readFile("./slides/slide.md");
    const md = decoder.decode(file);
    return new Response(md, {
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  const isImage = new RegExp('/(.*?).png').exec(pathname);
  if (isImage) {
    const imagePath = isImage[1];
    const file = await Deno.readFile(`./slides/${imagePath}.png`);
    return new Response(file, {
      headers: {
        "content-type": "image/png",
      },
    });
  }

  const app = renderSlideApp();

  const htmlFile = await Deno.readFile('./slides/index.html');
  const html = decoder.decode(htmlFile);
  const slidePage = html.replace('<!-- SSR-outlet -->', app);

  return new Response(slidePage, {
    headers: {
      "content-type": "text/html",
    },
  });
}

serve(handler);
