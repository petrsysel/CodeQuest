import h from "hyperscript";

export const insertCodeFormTmpl = h('div',
    h('table',
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-insert-code'
                }, "Kód úlohy")
                
            ),
            h('td',
                h('input#platform-insert-code')
            )
        )
    )
)