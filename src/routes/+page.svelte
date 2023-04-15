<script lang="ts">
    import { Search } from '$lib/index.ts';
    import data from '$lib/data/data.json';
    import type { SearchResult, Suggestion } from 'minisearch';

    let results: SearchResult[] = [];
    let suggestions: Suggestion[] = [];
</script>

<Search {data} bind:results bind:suggestions>
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
