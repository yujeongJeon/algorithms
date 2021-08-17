function solution(type, id, listener) {
    let childSet = new Map()
    let parent = null

    return {
        type,
        id,
        onEvent(event) {
            listener(event)
            if (parent) {
                parent.onEvent(event)
            }
        },
        addChild(node) {
            if (node.getParentId()) {
                throw new Error('(실패) 부모가 이미 있습니다.')
            }
            if (parent?.id === node.id) {
                throw new Error('(실패) 부모를 자식으로 추가할 수 없습니다.')
            }
            node.addParent(this)
            childSet.set(node.id, node)
            return `(성공) ${node.id}를 ${this.id}의 자식으로 추가`
        },
        removeChild(node) {
            if (!childSet.has(node.id)) {
                throw new Error('(실패) 존재하지 않는 자식입니다.')
            }
            childSet.delete(node.id)
            node.clearParent()
            return `(성공) ${node.id}를 ${this.id}의 자식에서 해제`
        },
        getParentId(){
            return parent?.id
        },
        addParent(node) {
            parent = node
        },
        clearParent() {
            parent = null
        }
    }
}

const div1 = solution('div', 'foo1', event => console.log(`foo1: ${event}`))
const div2 = solution('div', 'foo2', event => console.log(`foo2: ${event}`))
const button = solution('button', 'bar', event => console.log(`bar: ${event}`))
const span = solution('span', 'span', event => console.log(`span: ${event}`))

const main = () => {
    try {
        console.log(div1.addChild(button))
        console.log(button.addChild(span))
        // console.log(div1.removeChild(button))
        // console.log(button.addChild(div1)) // error
        // console.log(div2.addChild(button)) // error
        //div2.removeChild(button) // error
        button.onEvent('mouseover event')
        span.onEvent('mouseover event: span')
    }catch (error) {
        console.log(error)
    }
}

main()
