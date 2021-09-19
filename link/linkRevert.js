/**
 * 链表反转
 */
function LinkNode(val, next = null) {
    this.val = val
    this.next = next
}

function buildLinkList(arr) {
    let head = new LinkNode(0)
    let pre = head
    let cur = null
    arr.forEach((val, index) => {
        cur = new LinkNode(val)
        pre.next = cur
        pre = cur
    })

    return head.next
}

function revertLinkList(head) {
    let pre = null
    let cur = head

    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }

    return pre
}

