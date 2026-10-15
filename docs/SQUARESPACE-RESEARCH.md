# Squarespace editing and migration research

Checked 2026-10-15 by Larry. Research findings, not a tested migration or an
installation recommendation. No connector is connected to this repository.

## Direct editing candidate

[timncox/squarespace-mcp](https://github.com/timncox/squarespace-mcp) includes
source for text edits, image uploads, native blocks and positioning, font/design
settings, CSS patching, code injection and header/footer configuration. Its
[site tools](https://github.com/timncox/squarespace-mcp/blob/main/src/mcp-server/tools/site.ts)
define actual design, CSS and script-writing operations.

Authentication uses a captured Squarespace login session. After login, the tool
makes direct requests rather than clicking through each editor action. It is
unofficial and has not been tested here. The repository's automated tests use
mocked API responses; they do not prove compatibility with a particular live site.
Review session handling and account scope before testing an isolated, unpublished
site. Do not share session cookies in a prompt or repository.

## Other supplied links

- [Membrane skill listing](https://mcpmarket.com/tools/skills/squarespace-integration):
  advertises page/block management. The
  [underlying skill](https://github.com/membranedev/application-skills/blob/main/skills/squarespace/SKILL.md)
  provides authentication and action discovery, but no concrete page-editing
  operations. Runtime editor capabilities remain unverified.
- [Even connection](https://even.dev/connect/squarespace): the public page lists
  nine tools for products, orders, inventory and fulfillment. No listed tool
  edits ordinary page text, typography, layout or header behavior.
- [Portfolio rebuild article](https://sanjaytarani.com/blog/from-squarespace-to-claude-code-how-i-rebuilt-my-portfolio-and-saved-528-a-year):
  describes replacing Squarespace with a Claude-built Next.js site hosted on
  Vercel. It does not demonstrate editing inside Squarespace.
- [Official Squarespace MCP](https://developers.squarespace.com/mcp/overview):
  currently documents domain search and name generation, not website editing.
- [SquareKicker Compose](https://squarekicker.com/compose): optional paid extension
  for Squarespace 7.1. Its vendor says it can adapt existing code, preview changes
  and provide visual controls. A 14-day trial is advertised. It has not been tested
  here and is not proof of automatic conversion into native editable blocks.

## Reusing this homepage

Squarespace's [supported imports](https://support.squarespace.com/hc/en-us/articles/205814028-Import-to-and-export-from-your-site)
do not document a custom HTML/ZIP importer that turns a page into native editable
layouts. Reuse the copy, selected assets and design; construct native text/image
blocks and adapt CSS/scripts for special details. A whole-page code block would
make routine visual editing harder.

[Custom font uploads](https://support.squarespace.com/hc/en-us/articles/40181698210701-Uploading-custom-fonts)
are supported through Site Styles, Fonts, a text category, the font dropdown and
upload icon. Supported formats include OTF, TTF, WOFF and WOFF2. Separate styles
may need separate files. Check web-use rights first.

[Site Styles](https://support.squarespace.com/hc/en-us/articles/206545327-Choose-and-style-your-site-s-fonts)
sets Headings, Paragraphs, Buttons and Miscellaneous. Apply the intended hierarchy
from the project status; test whether uploaded font cuts map correctly. Eyebrows,
quotes and step numerals may need scoped styling.

[Custom CSS](https://support.squarespace.com/hc/en-us/articles/206545567-Add-custom-CSS-to-your-site)
handles styling details. [Code injection](https://support.squarespace.com/hc/en-us/articles/205815908-Customize-parts-of-your-site-with-code-injection)
requires Core, Plus, Advanced or an eligible legacy plan. Verify the actual plan.

## First proof before a full migration

Use an isolated, unpublished test site and access limited to that site. After a
security review and approved connection, test one text block, one image, a font
setting and the header behavior. Read changes back and inspect desktop/mobile
results. Continue only if those operations work and the result stays editable.
Do not change a live client site, domain or subscription as part of the test.

Larry
