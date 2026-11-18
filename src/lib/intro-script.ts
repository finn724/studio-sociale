export const INTRO_SEEN_KEY = "ss-intro-seen";

// Runs before paint so returning visitors never see the intro flash.
export const introSkipScript = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="skip"}}catch(e){document.documentElement.dataset.intro="skip"}`;
