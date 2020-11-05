// import modules
import insertNode from './insert-node';
import mergeNode from './merge-node';
import moveNode from './move-node';
import removeNode from './remove-node';
import setNode from './set-node';
import splitNode from './split-node';

const nodeOps = {
  insert_node: insertNode,
  merge_node: mergeNode,
  move_node: moveNode,
  remove_node: removeNode,
  set_node: setNode,
  split_node: splitNode,
};

export default nodeOps;
