<script>
    export let name;

    async function handleSubmit(event) {
        event.preventDefault();

        const formElement = event.target;
        const formData = new FormData(formElement);

        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
            altert('success!');
        }
        else {
            alert('fail')
        }
    }
</script>

<form {name} netlify on:submit={handleSubmit}>
    <slot />
</form>
