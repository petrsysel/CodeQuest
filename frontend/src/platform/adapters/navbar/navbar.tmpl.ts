import h from "hyperscript";
/*
<div class="platform-navbar-container">
    <div>CodeQuest</div>
    <div class="platform-bar" id="platform-user-bar">
        <p id="platform-user-name">User Name</p>
        <button id="platform-log-out-btn" class="btn">Odhlásit se</button>
    </div>
    <div class="platform-bar" id="platform-guest-bar">
        <button id="platform-log-in-btn" class="btn">Přihlásit se</button>
        <button id="platform-register-btn" class="btn">Registrovat se</button>
    </div>
</div>
*/
export const navbar = h('div.platform-navbar-container',
    h('div.platform-title', "CodeQuest"),
    h('div.platform-bar#platform-user-bar',
        h('p#platform-user-name', "User Name"),
        h('button#platform-log-out-btn.platform-btn', "Odhlásit se")
    ),
    h('div.platform-bar#platform-guest-bar',
        h('button#platform-log-in-btn.platform-btn', "Přihlásit se"),
        h('button#platform-register-btn.platform-btn', "Registrovat se")
    )
)

