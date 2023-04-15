<script lang="ts">
    import searchData from './data.json';
    import { Search } from '$lib/index.ts';
    import type { SearchResult, Suggestion } from 'minisearch';

    let results: SearchResult[] = [];
    let suggestions: Suggestion[] = [];
</script>

<div class="container">
    <Search data={searchData} bind:results bind:suggestions>
        {#if results.length}
            <div class="result-container">
                {#each results as result}
                    <div class="result">
                        <span>
                            <h3 class="p-0 m-0">
                                {result.title}
                            </h3>
                        </span>
                        <span>
                            <h3 class="p-0 m-0">Artist: {result.artist}</h3>
                        </span>
                        <span>
                            <h3 class="p-0 m-0">Year: {result.year}</h3>
                        </span>
                        <span>
                            <h3 class="p-0 m-0">Billboard Position: {result.rank}</h3>
                        </span>
                    </div>
                {/each}
            </div>
        {:else}
            <p>No data found!</p>
        {/if}
    </Search>

    <p>
        This is a demo of the Search Component using same dataset as the Minisearch
        <a href="https://lucaong.github.io/minisearch/examples/">demo</a>: try searching through
        more than 5000 top songs and artists in Billboard Hot 100 from year 1965 to 2015.
    </p>

    <span class="git-link">
        Go to github:
        <a href="https://github.com/Hetarth02/searchy">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
            >
                <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
            </svg>
        </a>
    </span>
</div>

<style>
    * {
        font-family: sans-serif;
        line-height: 1.5;
    }

    .p-0 {
        padding: 0;
    }

    .m-0 {
        margin: 0;
    }

    .container {
        margin: 1rem;
        padding: 1rem;
    }

    .result-container {
        height: 350px;
        overflow: auto;
    }

    .result {
        gap: 0.5rem;
        display: flex;
        margin: 0.5rem;
        padding: 0.5rem;
        flex-direction: column;
        border-bottom: 1px solid #888;
    }

    .git-link {
        margin-top: 1rem;
        gap: 0.5rem;
        display: flex;
        align-items: center;
    }
</style>
