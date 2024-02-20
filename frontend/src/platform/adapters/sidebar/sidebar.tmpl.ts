import h from "hyperscript";

export const sidebar = h('div.platform-sidebar-container',
    h('div.platform-sidebar-btn#platform-sidebar-insert-code', "Vložit kód úlohy"),
    h('div.platform-sidebar-btn#platform-sidebar-public-puzzles', "Veřejné úlohy"),
    h('div.platform-sidebar-btn#platform-sidebar-custom-puzzles', "Vlastní úlohy")
)