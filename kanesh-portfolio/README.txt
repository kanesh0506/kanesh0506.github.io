KANESH SHANKER - PORTFOLIO (single HTML file)
==============================================

Files
  index.html                  the whole site (CSS, JS, fonts, animation library and portrait are inside it)
  Kanesh_Shanker_Resume.pdf   the "Download CV" button points to this file
  og.png                      the image shown when the link is shared (WhatsApp, LinkedIn, etc.)

Keep all three in the same folder. No install or build step.

HOST ON GITHUB PAGES (kanesh0506.github.io)
  1. Open your kanesh0506.github.io repository on github.com.
  2. Add file > Upload files. Drop index.html, Kanesh_Shanker_Resume.pdf and og.png.
     Replace the old index.html when asked.
  3. Commit. The site updates in about a minute.
  Your lab sites (LAB_1, LAB_3, ...) are separate repositories and keep working.
  Netlify Drop (app.netlify.com/drop) or Cloudflare Pages also work: drag the folder in.

TURN ON THE CONTACT FORM
  A static site cannot send email by itself. Create a free form at formspree.io, copy its
  URL (https://formspree.io/f/xxxxxxxx), then near the bottom of index.html find:
      window.PORTFOLIO_CONFIG = { formEndpoint: "", email: "..." }
  and paste the URL between the quotes after formEndpoint. Until you do, the form tells
  visitors the message was NOT sent and offers a prefilled email draft.

REPLACE THE PLACEHOLDERS
  Project thumbnails   Put screenshots (WebP or JPG, about 1200x900, under 150 KB) in an
                       images/ folder. In index.html, inside a project's <div class="thumb">,
                       replace the <div class="art" ...></div> line with:
                       <img class="thumb-img" src="images/mediproof.webp" alt="MediProof screenshot" loading="lazy">
  Testimonials         Search for "Sample testimonial" and replace the text and names, and delete
                       the <span class="chip">Sample</span> next to each one you replace.
  Skill levels         The 5-segment bars are placeholders (class "on" marks a filled segment).
                       PyTorch is not on your CV: delete that <li> if you have not used it.
  Company logos        Optional. Search "logo" in the Experience section to add an <img>.
  Mission line         Search for "Build practical AI" and rewrite in your own words.
  Site address         If you use a custom domain, replace https://kanesh0506.github.io/ in the
                       <head> (canonical, og:url, og:image, twitter:image) with your address.

ACCESSIBILITY AND MOTION
  Respects "reduce motion" (no loader, no scroll animation, no custom cursor, no carousel autoplay).
  Works without JavaScript (all content shown). Light and dark themes, saved per visitor.

CREDITS
  Fonts: Bricolage Grotesque, Instrument Sans, JetBrains Mono (SIL Open Font License), embedded.
  Animation: GSAP + ScrollTrigger by GreenSock (standard free license), embedded.
