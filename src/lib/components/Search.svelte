<script lang="ts">
    import { onMount } from 'svelte';

    import MiniSearch, { type Options, type SearchResult, type Suggestion } from 'minisearch';

    export let data: any[];
    // export let history: any[] = [];
    export let debounceTime: number = 300;
    export let minSearchStart: number = 1;
    export let results: SearchResult[] = [];
    export let suggestions: Suggestion[] = [];
    export let configOptions: Options | undefined = undefined;

    let timer: number;
    let miniSearch: MiniSearch;
    let searchQuery: string = '';

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

        // modal js
        const searchInput0 = document.getElementById('searchInput0');
        const searchInput = document.getElementById('searchInput');
        const searchModal = document.querySelector('.search-modal');
        const searchModalOverlay = document.querySelector('.search-modal-overlay');

        searchInput0?.addEventListener('click', () => {
            if (searchModalOverlay) {
                // @ts-ignore
                searchModalOverlay.style.display = 'block';
                setTimeout(() => {
                    searchModal?.classList.add('show');
                }, 100);
                searchInput0.setAttribute('disabled', 'disabled');
                searchInput?.focus();
            }
        });

        document.documentElement.addEventListener('click', (event) => {
            // @ts-ignore
            if (!searchModal?.contains(event.target) && !searchInput0?.contains(event.target)) {
                // @ts-ignore
                searchModal?.classList.remove('show');
                setTimeout(() => {
                    // @ts-ignore
                    searchModalOverlay.style.display = 'none';
                }, 300);
                searchInput0?.removeAttribute('disabled');
            }
        });
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
            console.log(results);

            suggestions = miniSearch.autoSuggest(searchQuery);
        }
    }

    function debounce(timeout = 300) {
        clearTimeout(timer);
        timer = setTimeout(search, timeout);
    }
</script>

<div>
    <div class="search-bar">
        <input
            id="searchInput0"
            value={searchQuery}
            placeholder="Search"
            type="text"
            class="search-input"
        />

        <div class="search-modal-overlay">
            <div class="search-modal-container">
                <div class="search-modal">
                    <input
                        id="searchInput"
                        bind:value={searchQuery}
                        placeholder="Search"
                        type="text"
                        class="search-input"
                    />
                    <slot />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .search-bar * {
        box-sizing: border-box;
    }

    .search-bar {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .search-input {
        display: block;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: black;
        background-color: white;
        background-clip: padding-box;
        border: 1px solid black;
        border-radius: 0.375rem;
        outline: none;
        box-sizing: border-box;
    }

    .search-modal-container {
        position: relative;
        overflow: auto;
        height: 100vh;
    }

    .search-modal {
        position: absolute;
        width: 100%;
        background: white;
        border-radius: 0.375rem;
        padding: 16px;
        max-width: 800px;
        left: 50%;
        transform: translateX(-50%);
        top: 5%;
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: top 300ms ease-out, opacity 300ms linear;
    }

    :global(.search-modal.show) {
        top: 10% !important;
        opacity: 1 !important;
    }

    .search-modal-overlay {
        display: none;
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
</style>
