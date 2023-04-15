<script lang="ts">
    import searchData from './data.json';
    import { Search } from '$lib/index.ts';
    import type { PageData } from './$types';
    import type { SearchResult, Suggestion } from 'minisearch';

    export let data: PageData;

    let results: SearchResult[] = [];
    let suggestions: Suggestion[] = [];
</script>

<Search data={searchData} bind:results bind:suggestions>
    {#if results.length}
        <ul>
            {#each results as result}
                <li>
                    {result.title}
                </li>
            {/each}
        </ul>
    {:else}
        <p>No data found!</p>
    {/if}
</Search>

{@html data.markdownText}
