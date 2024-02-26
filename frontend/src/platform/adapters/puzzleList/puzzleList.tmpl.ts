import h from "hyperscript";
import { getQuestionMarkImg } from "../../mocks/getQuestionmarkImg";

export const puzzleListTmpl = h('div.puzzle-list-container',
    h('div.puzzle-list-header',
        h('input.puzzle-list-search',{'placeholder':'Zadejte název úlohy'}),
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
                h('div.puzzle-list-item-info',
                    h('p.puzzle-list-item-name', "Strašně dlouhatánský název úlohy"),
                    h('p.puzzle-list-item-author', "Autor"),
                    h('p.puzzle-list-item-code', "Kód"),
                ),
                h('div.puzzle-list-item-action-bar',
                    h('a.puzzle-list-item-edit',{'href':'javascript:void(0)'},
                        h('img', {'src': './images/icons/cq-edit.png'})),
                    h('a-puzzle-list-item-play',{'href':'javascript:void(0)'},
                        h('img', {'src': './images/icons/cq-play.png'})),
                    h('a.puzzle-list-item-duplicate',{'href':'javascript:void(0)'},
                        h('img', {'src': './images/icons/cq-duplicate.png'})),
                    h('a.puzzle-list-item-delete',{'href':'javascript:void(0)'},
                        h('img', {'src': './images/icons/cq-delete.png'}))
                )
            )
        ),
        h('div.align-center',
            h('button.puzzle-list-load-more-btn.platform-btn.dark-btn', "Načíst další")
        )
    )
)