const doc2 = document;

/*

    变动观察器 (Mutation Observer)

    DOM规范中的MutationObsesrver接口，可以在DOM被修改时异步执行回调

    不过，目标节点的删除它监控不到；


*/

// 拿到水印节点
const waterMarkNode = doc2.querySelector('#water-mark');
const patternNode = doc2.querySelector('#pattern');
const bodyNode = doc2.querySelector('body');

let observer = new MutationObserver(handler);

// attributes、subtree、characterData 中必须至少有一项为 true
const options = {
    attributes: true, // 是否观察目标节点的属性变化，例如 style、class
    subtree: true, // 除了目标节点，是否观察目标节点的字数
    characterData: false, // 表示修改字符数据是否发生变化
    childList: true // 表示修改目标节点的子节点是否触发事件变化
}

observer.observe(waterMarkNode, options);
observer.observe(bodyNode, options);
observer.observe(patternNode, options);


/**
 * 观察后的回调函数
 * 
 *      每个回调函数会收到一个MutationRecord实例的数据
 *      MutationRecord实例包含的信息包括发生了什么变化，以及DOM的哪一部分受到了影响
 * 
 */
function handler(mutationRecordList) {
    console.log('触发了回调函数');
    console.log(mutationRecordList);

    mutationRecordList.forEach(record => {
        // 情况一：如果通过删除 canvas 节点的方式移除水印，那么需要监听 water-mark 的父元素 body
        // 判断删除了 body 的儿子 water-mark
        if (record.target?.localName === 'body') {
            record.removedNodes.forEach(rn => {
                if (rn.id === 'water-mark') {
                    bodyNode.innerHTML = '<h1>谁删除了老子的水印？站出来！</h1>';
                }
            });
            return;
        }

        // 情况二：如果是通过修改 water-mark 的 dom 节点属性移除水印，那么需要监听 water-mark 本身
        // TODO
    });


}