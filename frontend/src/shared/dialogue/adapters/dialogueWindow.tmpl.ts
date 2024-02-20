import h from "hyperscript";

export const getDialogueWindowTmpl = () => {
    return h('div.dialogue-overlay',
        h('div.dialogue-window',
            h('div.dialogue-header',
                h('p.window-label', "Label"),
                h('a.dialogue-close-btn', {'href': 'javascript:void(0)'},
                    h('img', {'src': './images/icons/cq-close.png'})
                )
            ),
            h('div.error-baner', "error message"),
            h('div.dialogue-body'),
            h('div.dialogue-footer',
                h('button.platform-btn.dialogue-ok-btn', "OK")
            ),
        )
    )
}
