import { NextResponse } from "next/server";

/**
 * SITE PAUSED — temporary off-switch (2026-08-14, auf Valeriyas Wunsch).
 * Every route returns a minimal b/w "back soon" card with HTTP 503
 * (= temporarily unavailable, search engines keep the site indexed).
 *
 * >>> To turn the site back ON: delete this file (or `git revert` the
 * commit that added it) and push.
 */

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Valeriya Ritz — back soon</title>
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
  <p>Valeriya is <em>refining.</em><span>valeriyasworld.com — back soon</span></p>
</body>
</html>`;

export function middleware() {
  return new NextResponse(PAGE, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "86400",
    },
  });
}

// everything except Next.js internals and static assets
export const config = {
  matcher: ["/((?!_next/|favicon).*)"],
};
