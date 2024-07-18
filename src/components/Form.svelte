<script>
    export let name;

    let waiting = false;
    let succesful = false;

    async function handleSubmit(event) {
        waiting = true;

        const formElement = event.target;
        const formData = new FormData(formElement);

        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        });

        succesful = response.ok;
        waiting = false;
    }
</script>

<form {name} netlify on:submit|preventDefault={handleSubmit}>
    <fieldset disabled={waiting || succesful}>
        <legend><slot name="legend" /></legend>
        <slot />
    </fieldset>
    {#if succesful}
        <output role="alert">
            <strong>
                Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen.
            </strong>
        </output>
    {/if}
    <button type="submit" disabled={waiting || succesful} aria-busy={waiting}>
        Senden
    </button>
</form>

<style>
    form {
        position: relative;
    }

    output {
        align-items: center;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-name: fade-in;
        background-color: var(--pico-background-color);
        color: var(--pico-primary);
        display: flex;
        height: 100%;
        justify-content: center;
        left: 0;
        padding: calc(4 * var(--pico-spacing));
        position: absolute;
        text-align: center;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
