function toggleBtnDisableAttribute(btn: HTMLElement, shouldBeDisabled: boolean) {
    if (shouldBeDisabled) {
        btn.setAttribute("disabled", "");
    } else {
        btn.removeAttribute("disabled");
    }
}

export function updateBtnsAvailability(previousUrl: string, nextUrl: string) {
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    toggleBtnDisableAttribute(prevBtn, previousUrl === null);
    toggleBtnDisableAttribute(nextBtn, nextUrl === null);
}

