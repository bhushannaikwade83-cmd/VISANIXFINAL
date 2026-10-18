<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use shared site chrome and page primitives for all public routes so navigation and the editorial VisaNix identity remain consistent.
- Keep site motion native and shared through the global motion layer so every route remains consistent, accessible, and lightweight.
- Keep the uploaded scroll journey on the index route and the full editorial homepage on /home, using the existing shared chrome and native browser video scrubbing to preserve content and avoid a second router.
- Offer MP4 with WebM fallback and resynchronize native video seeks on media readiness and page restoration events so delayed loads retain the latest scroll position.
- On each fresh browser load, show the journey immediately and replace the initial location with / once hydrated; subsequent in-app navigation stays unrestricted so the video-first entrance does not trap visitors.
- Keep the root entrance journey mounted across initial hydration and the replacement navigation to / so media loading is not restarted.
- Style link text colour through button variants using the important modifier (for example `!text-white`), because the unlayered `a{color:inherit}` reset in the global stylesheet outranks plain Tailwind text utilities.
