import h from "hyperscript";
import { getQuestionMarkImg } from "../../mocks/getQuestionmarkImg";

export const puzzleListTmpl = h('div.puzzle-list-container',
    h('div.puzzle-list-header',
        h('div.puzzle-list-search-bar',
            h('input.puzzle-list-search',{'placeholder':'Zadejte název úlohy'}),
            h('button.puzzle-list-search-btn.platform-btn.dark-btn', "Vyhledat")
        ),
        h('div.align-right',
            h('button.puzzle-list-create-btn.platform-btn.dark-btn', "Vytvořit novou úlohu")
        )
    ),
    h('div.puzzle-list-body-container',
        h('div.puzzle-list-empty-label', "Zatím zde nejsou žádné úlohy"),
        h('div.puzzle-list-list-container',
            h('div.puzzle-list-item',
                h('div.puzzle-list-preview-img',
                    h('img',{'src':getQuestionMarkImg()})
                ),
                
                h('div.puzzle-list-item-body',
                    h('div.puzzle-list-item-info',
                        h('p.puzzle-list-item-name', "Strašně dlouhatánský název úlohy"),
                        h('p.puzzle-list-item-author', "Autor"),
                        h('p.puzzle-list-item-code', "Kód"),
                    ),
                    h('div.puzzle-list-item-action-bar',
                        h('a.puzzle-list-item-edit.tooltip',{'href':'javascript:void(0)'},
                            h('span.tooltiptext', "Editovat úlohu"),
                            h('img', {'src': './images/icons/cq-edit.png'})),
                        h('a.puzzle-list-item-play.tooltip',{'href':'javascript:void(0)'},
                            h('span.tooltiptext', "Spustit úlohu"),
                            h('img', {'src': './images/icons/cq-play.png'})),
                        h('a.puzzle-list-item-duplicate.tooltip',{'href':'javascript:void(0)'},
                            h('span.tooltiptext', "Vytvořit kopii"),
                            h('img', {'src': './images/icons/cq-duplicate.png'})),
                        h('a.puzzle-list-item-publish.tooltip',{'href':'javascript:void(0)'},
                            h('span.tooltiptext', "Sdílet jako veřejnou úlohu"),
                            h('img', {'src': './images/icons/cq-publish.png'})),
                        h('a.puzzle-list-item-unpublish.tooltip',{'href':'javascript:void(0)'},
                            h('span.tooltiptext', "Zrušit sdílení úlohy"),
                            h('img', {'src': './images/icons/cq-unpublish.png'})),
                        h('a.puzzle-list-item-delete.tooltip',{'href':'javascript:void(0)'},
                            h('span.tooltiptext', "Smazat úlohu"),
                            h('img', {'src': './images/icons/cq-delete.png'}))
                    )
                )
            )
        ),
        h('div.align-center',
            h('button.puzzle-list-load-more-btn.platform-btn.dark-btn', "Načíst další")
        )
    )
)