<script>
    import dalBitLogoTextSvg from "../images/dalbit-logo-text.svg";
    export let menuItems = [];

    let open = false;

    function handleHashChange() {
        open = false;
    }
</script>

<svelte:window on:hashchange={handleHashChange} />

<nav class="container">
    <ul>
        <li>
            <a title="Startseite" href="/"
                ><img
                    src={dalBitLogoTextSvg.src}
                    width="117"
                    alt="DalBit Logo"
                    class="logo"
                /></a
            >
        </li>
    </ul>
    {#if menuItems.length > 0}
        <ul class="display-none-large">
            <li>
                <details bind:open class="dropdown">
                    <summary role="button" title="Menü öffnen">
                        <span aria-hidden="true">&#9776;</span>
                        <span class="sr-only">Menü öffnen</span>
                    </summary>
                    <ul dir="rtl">
                        {#each menuItems as item}
                            <li>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        {/each}
                    </ul>
                </details>
            </li>
        </ul>
        <ul class="display-none display-flex-large">
            {#each menuItems as item, index}
                <li>
                    <a
                        href={item.href}
                        class={index === menuItems.length - 1 ? "contrast" : ""}
                    >
                        {item.label}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</nav>

<style>
    @media (prefers-color-scheme: dark) {
        .logo {
            filter: invert(1);
        }
    }

    summary[role] {
        font-size: var(--menu-button-size);
        line-height: 1;
        padding-top: 0;
    }

    summary[role]::after {
        content: none;
    }
</style>
