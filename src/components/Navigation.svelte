<script>
    const menuItems = [
        {
            label: "Leistungen",
            href: "#leistungen",
        },
        {
            label: "Über uns",
            href: "#ueber-uns",
        },
        {
            label: "Kontakt",
            href: "#kontakt",
        },
    ];
</script>

<nav class="container">
    <ul>
        <li>
            <a title="Startseite" href="/"
                ><img
                    src="/dalbit-logo-text.svg"
                    width="117"
                    alt="DalBit Logo"
                    class="logo"
                /></a
            >
        </li>
    </ul>
    <ul class="display-none-large">
        <li>
            <input type="checkbox" id="menu-button" class="sr-only" />
            <label for="menu-button">
                <span></span>
            </label>
            <aside>
                <nav class="container">
                    <ul>
                        {#each menuItems as item}
                            <li><a href={item.href}>{item.label}</a></li>
                        {/each}
                    </ul>
                </nav>
            </aside>
        </li>
    </ul>
    <ul class="display-none display-flex-large">
        {#each menuItems as item}
            <li><a href={item.href}>{item.label}</a></li>
        {/each}
    </ul>
</nav>

<style>
    @media (prefers-color-scheme: dark) {
        .logo {
            filter: invert(1);
        }
    }

    label[for="menu-button"] {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: var(--menu-button-size);
        position: relative;
        width: var(--menu-button-size);
    }

    label[for="menu-button"]::before,
    label[for="menu-button"] > span,
    label[for="menu-button"]::after {
        content: "";
        width: var(--menu-button-size);
        height: var(--menu-button-line-thickness);
        background-color: var(--pico-color);
        position: absolute;
        left: 0;
        transition: all var(--pico-transition);
    }

    label[for="menu-button"]::before {
        top: 0;
    }

    label[for="menu-button"]::after {
        bottom: 0;
    }

    #menu-button:checked ~ label[for="menu-button"]::before {
        top: calc(var(--menu-button-size) / 2);
        transform: rotate(45deg);
        transform-origin: center;
    }

    #menu-button:checked ~ label[for="menu-button"] > span {
        background-color: transparent;
    }

    #menu-button:checked ~ label[for="menu-button"]::after {
        top: calc(var(--menu-button-size) / 2);
        transform: rotate(-45deg);
        transform-origin: center;
    }

    #menu-button:focus-visible ~ label[for="menu-button"] {
        box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);
    }

    #menu-button ~ aside {
        display: none;
    }

    #menu-button:checked ~ aside {
        background-color: var(--pico-background-color);
        display: unset;
        margin-top: var(--pico-nav-element-spacing-vertical);
        position: absolute;
        right: 0;
        width: 100%;
        z-index: 10;
    }
</style>
