const butInstall = document.getElementById("buttonInstall")

// Logic for installing the PWA
// Done: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
    //adds the event to the window DOM object for further referencing
    window.deferredPrompt = event

    butInstall.classList.toggle("hidden", false)
})

// Done: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt
    if (!promptEvent) return

    //Show prompt
    promptEvent.prompt()

    //Reset prompt for one time use, reset button class
    window.deferredPrompt = null
    butInstall.classList.toggle("hidden", true)
})

// Done: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
    //Clears prompt
    window.deferredPrompt = null
})
