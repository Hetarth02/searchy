<script lang="ts">
    import { onMount } from 'svelte';
    import MiniSearch, { type Options, type SearchResult, type Suggestion } from 'minisearch';

    export let data: any[];
    export let history: any[] = [];
    export let debounceTime: number = 300;
    export let minSearchStart: number = 1;
    export let configOptions: Options | undefined = undefined;

    let timer: number;
    let miniSearch: MiniSearch;
    let searchQuery: string = '';
    let results: SearchResult[] = [];
    let suggestions: Suggestion[] = [];

    $: searchQuery.length ? searchQuery && debounce(debounceTime) : resetAll();

    onMount(() => {
        miniSearch = new MiniSearch(
            configOptions ?? {
                fields: Object.keys(data[0]),
                storeFields: Object.keys(data[0])
            }
        );

        if (data.length) {
            miniSearch.addAll(data);
        }
    });

    function resetAll() {
        results = [];
        suggestions = [];
    }

    function search() {
        if (
            searchQuery !== '' &&
            searchQuery.length >= minSearchStart &&
            miniSearch.documentCount
        ) {
            results = miniSearch.search(searchQuery);
            suggestions = miniSearch.autoSuggest(searchQuery);
        }
    }

    function debounce(timeout = 300) {
        clearTimeout(timer);
        timer = setTimeout(search, timeout);
    }
</script>

<input type="text" bind:value={searchQuery} />

<p>
    Suggestions:
    {#each suggestions as suggest}
        <i>
            {suggest.suggestion}
        </i>
    {/each}
</p>

<br />

{#if results.length}
    <ol>
        {#each results as result}
            <li>
                {result.title}
            </li>
        {/each}
    </ol>
{:else if history.length}
    <ol>
        {#each history as history}
            <li>
                {history}
            </li>
        {/each}
    </ol>
{:else}
    <p>No data found!</p>
{/if}
