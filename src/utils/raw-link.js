const RawLink = {
    generate: (rsg) => {
        const commandSelector = rsg.uiElements[rsg.commandType].command;
        const currentCommandElement = document.querySelector(commandSelector);
        const defaultGeneratedCommand = rsg.generateReverseShellCommand();
        const isUserProvidedCommand = currentCommandElement.innerHTML != RawLink.escapeHTML(defaultGeneratedCommand);

        if (isUserProvidedCommand) {
            return RawLink.withCustomValue(currentCommandElement.innerText)

        }
        return RawLink.withDefaultPayload(rsg);
    },

    escapeHTML(html) {
        var element = document.createElement('div');
        element.innerHTML = html;
        return element.innerHTML;
    },

    withDefaultPayload: (rsg) => {
        const name = rsg.selectedValues[rsg.commandType];
        const queryParams = new URLSearchParams();
        queryParams.set('ip', rsg.getIP());
        queryParams.set('port', rsg.getPort());
        queryParams.set('shell', rsg.getShell());
        queryParams.set('encoding', rsg.getShell());

        return `/${encodeURIComponent(name)}?${queryParams}`
    },

    withCustomValue: (value) => {
        const queryParams = new URLSearchParams();
        queryParams.set('value', value)
        return `/raw?${queryParams}`
    }
}