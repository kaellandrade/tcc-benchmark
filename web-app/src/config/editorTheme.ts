import {EditorView} from "@codemirror/view";

export const dcompLabEditorTema = EditorView.theme({
    "&": {
        fontSize: "14px",
        fontFamily: "var(--font-mono) !important",
    },
    ".cm-content": {
        fontFamily: "var(--font-mono) !important",
    },

    ".cm-scroller": {
        fontFamily: "var(--font-mono) !important",
        fontVariantLigatures: "common-ligatures",
        lineHeight: "1.6"
    }
});