import h from "hyperscript";

export const loginFormTmpl = h('div',
    h('table',
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-login-username'
                }, "Uživatelské jméno")
                
            ),
            h('td',
                h('input#platform-login-username')
            )
        ),
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-login-password'
                }, "Heslo")
            ),
            h('td',
                h('input#platform-login-password', {
                    'type': 'password'
                })
            )
        )
    )
    ,
    
    
)