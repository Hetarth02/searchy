import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const res = await fetch(`https://raw.githubusercontent.com/Hetarth02/searchy/main/README.md`);
    const markdownText = await res.text();

    return { markdownText: markdownText };
}) satisfies PageLoad;
