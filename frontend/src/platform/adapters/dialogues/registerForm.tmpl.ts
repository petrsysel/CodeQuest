import h from "hyperscript";

export const registerFormTmpl = h('div',
    h('p', "    Údaje označené * jsou povinné"),
    h('table',
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-register-username'
                }, "Uživatelské jméno*")
                
            ),
            h('td',
                h('input#platform-register-username')
            )
        ),
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-register-fullname'
                }, "Celé jméno")
                
            ),
            h('td',
                h('input#platform-register-fullname')
            )
        ),
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-register-email'
                }, "Email*")
                
            ),
            h('td',
                h('input#platform-register-email')
            )
        ),
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-register-password'
                }, "Heslo*")
            ),
            h('td',
                h('input#platform-register-password', {
                    'type': 'password'
                })
            )
        ),
        h('tr',
            h('td',
                h('label', {
                    'for': 'platform-register-password-again'
                }, "Heslo znovu*")
            ),
            h('td',
                h('input#platform-register-password-again', {
                    'type': 'password'
                })
            )
        )
    )
    ,
    
    
)