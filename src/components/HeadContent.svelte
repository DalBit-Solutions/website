<script>
    export let data;

    const { meta, title } = data;

    const siteName = "DalBit Solutions";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    function getContent(name) {
        return Array.isArray(meta[name]) ? meta[name].join(", ") : meta[name];
    }
</script>

<meta charset="utf-8" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/site.webmanifest" />
{#if meta}
    {#each Object.keys(meta) as name}
        <meta {name} content={getContent(name)} />
    {/each}
{/if}
<meta name="author" content="Alexander Fridlin" />
<meta name="viewport" content="width=device-width" />
<title>{fullTitle}</title>
