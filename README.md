# Svelte-Searchy 🔍
A simple no-brainer pluggable search component for svelte!

Demo: https://svelte-searchy.netlify.app/

# Installation 💽
```sh
npm i svelte-searchy
```

# Setup 🚀
```ts
<script lang="ts">
    import { Search } from 'svelte-searchy'; // Import Component
    import data from '$lib/data/data.json'; // Any valid json file
    import type { SearchResult, Suggestion } from 'minisearch'; // Minisearch Types (if using typescript)

    // Initiate results and suggestions array
    let results: SearchResult[] = [];
    let suggestions: Suggestion[] = [];
</script>

// Provide your json data and Bind results and suggestions array and that's it.
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
```

# Available Props ⚙️
| Prop Name      | Type             | Default Value | Required | Description                                                                                      |
| -------------- | ---------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------ |
| debounceTime   | `number`         | 300ms         | no       | A search delay to prevent spam searching on every keystroke.                                     |
| minSearchStart | `number`         | 1             | no       | A minimum word limit to start the search.                                                        |
| results        | `SearchResult[]` | `[]`          | no       | Array of results. (Refer [Minisearch docs](https://lucaong.github.io/minisearch/).)              |
| suggestions    | `Suggestion[]`   | `[]`          | no       | Array of suggestions. (Refer [Minisearch docs](https://lucaong.github.io/minisearch/).)          |
| configOptions  | `Options`        | `undefined`   | no       | Config options for Minisearch. (Refer [Minisearch docs](https://lucaong.github.io/minisearch/).) |