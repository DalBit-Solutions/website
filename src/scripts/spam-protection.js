class ProtectedElement {
    constructor(element) {
        // TODO: Funktionen von unten in diese Klasse schieben
    }
}

(() => {
    const transition = {
        durationMs: 250,
        property: 'opacity',
        values: [ 0, 1 ]
    };

    async function setUpTransition(element) {
        element.style.transitionProperty = transition.property;
        element.style.transitionDuration = transition.durationMs + 'ms';

        return new Promise((resolve) => {
            element.addEventListener('transitionend', resolve);
        });
    }

    async function fadeOut(element) {
        const promise = setUpTransition(element);
        element.style[transition.property] = transition.values[0];
        return promise;
    }
    
    async function fadeIn(element) {
        const promise = setUpTransition(element);
        element.style[transition.property] = transition.values[1];
        return promise;
    }

    function swapContent(element) {
        element.innerHTML = element.dataset.content;
    }

    function swapAttributes(element) {
        if (Object.hasOwn(element.dataset, 'href')) {
            element.setAttribute('href', element.dataset['href']);
        }
    }

    function markSwapped(element) {
        element.removeAttribute('data-anti-spam');
    }

    async function render(element) {
        await fadeOut(element);
        swapContent(element);
        swapAttributes(element);
        markSwapped(element);
        fadeIn(element);
    }

    function renderAll() {
        const protectedElements = document.querySelectorAll('[data-anti-spam]');

        protectedElements.forEach(render);
    }

    const body = document.body;
    const options = { once: true };

    body.addEventListener('mousemove', renderAll, options);
    body.addEventListener('click', renderAll, options);
    document.addEventListener('scroll', renderAll, options);
    window.addEventListener('keydown', renderAll, options);
})();

