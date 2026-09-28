import { NextResponse } from "next/server";

/**
 * SITE HIDDEN — temporary off-switch (2026-09-24, on Valeriya's request).
 *
 * Every route — pages, project detail pages and /media assets alike —
 * returns a minimal holding card, so nothing of the portfolio is reachable.
 *
 * Why 200 and not 503: the goal here is to drop OUT of Google quickly.
 * Search engines only act on `noindex` when they can actually fetch the
 * page, and a 503 makes them shrug and retry later while the old result
 * stays in the index. 200 + X-Robots-Tag: noindex is what gets it removed.
 * robots.txt deliberately stays permissive — blocking crawlers would stop
 * them from ever seeing the noindex.
 *
 * >>> To switch the site back ON: delete this file and push. Then ask
 * Google to re-index it in Search Console (it will not come back on its own
 * for a while).
 */

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Valeriya Ritz</title>
<style>
  html,body{height:100%;margin:0}
  body{display:flex;align-items:center;justify-content:center;
    background:#0a0a0a;color:#fff;
    font-family:Georgia,'Times New Roman',serif;text-align:center}
  p{font-size:clamp(1.4rem,4vw,2.4rem);line-height:1.3;margin:0;padding:0 24px}
  em{font-style:italic;font-weight:300}
  span{display:block;margin-top:18px;font-family:Helvetica,Arial,sans-serif;
    font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#757575}
</style>
</head>
<body>
  <p>Currently <em>rebuilding.</em><span>valeriyasworld.com</span></p>
</body>
</html>`;

export function middleware(request: Request) {
  // let crawlers read robots.txt, otherwise they never reach the noindex
  if (new URL(request.url).pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nAllow: /\n", {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  return new NextResponse(PAGE, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

// everything except Next.js internals — media and project pages included
export const config = {
  matcher: ["/((?!_next/|favicon).*)"],
};
