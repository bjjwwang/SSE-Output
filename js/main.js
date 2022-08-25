
function processOnePath(path){
  nodes = path.toString().split('*************************')
  const node2str = new Map()
  this_path = nodes[nodes.length-1]
  ret_path = []
  console.log(this_path)
  num_nodes = this_path.toString().split('->')
  var count = 0
  for (var i = 0; i < nodes.length-1; i++) {
    if (nodes[i].replace(/(^s*)|(s*$)|\r\n|\n/g, "").length > 1) {
      node2str.set(count, nodes[i])
      ret_path.push(num_nodes[count].trim())
      console.log("Node %s, Msg: %s\n", num_nodes[count], nodes[i])
      count++
    }
  }
  return [node2str, ret_path];
}


var valMapList = []
var pathList = []
var cur_path = 0
var cur_node = 0
document.getElementById('file_input').addEventListener('change', function selectedFileChanged() {
  if (this.files.length === 0) {
    console.log('请选择文件！');
    return;
  }
  valMapList = []
  pathList = []
  const reader = new FileReader();
  cur_id = 0
  reader.onload = function fileReadCompleted() {
    // 当读取完成时，内容只在`reader.result`中
    //console.log(reader.result);

    paths = reader.result.toString().split('##################################')
    for(var i = 0; i < paths.length; i++) {
      ///console.log("print path\n")
      if (paths[i].replace(/(^s*)|(s*$)|\r\n|\n/g, "").length <=1){
        //console.log('empty node skip');
      } else {
        //console.log(paths[i].length)
        let ret = processOnePath(paths[i])
        const node2str = ret[0];
        const this_path = ret[1];
        valMapList.push(node2str)
        pathList.push(this_path)
      }
    }
  };
  console.log(valMapList)
  console.log(pathList)
  reader.readAsText(this.files[0]);


});

// click Load
document.getElementById('load').onclick = function() {
  total_path = document.getElementById('total_path')
  path_no = document.getElementById('path_no')
  total_nodes = document.getElementById('total_nodes')
  node_no = document.getElementById('node_no')
  log_box = document.getElementById('log_box')

  icfg_path = document.getElementById('icfg_path')
  icfg_path.innerText = pathList[0].toString()

  total_path.innerText = "Total Paths: " + pathList.length.toString()
  path_no.innerText = "Path No: 0"
  total_nodes.innerText = "Total Nodes: " + pathList[0].length
  node_no.innerText = "Node Index: 0"
  log_box.innerText = valMapList[0].get(0)
  cur_path = 0
  cur_node = 0
}

// click LastPath
document.getElementById('last_path').onclick = function() {
  if (cur_path -1 >=0) {
    cur_path = cur_path -1
  } else {
    return
  }
  total_path = document.getElementById('total_path')
  path_no = document.getElementById('path_no')
  total_nodes = document.getElementById('total_nodes')
  node_no = document.getElementById('node_no')
  log_box = document.getElementById('log_box')
  icfg_path = document.getElementById('icfg_path')
  icfg_path.innerText = pathList[cur_path].toString()

  total_path.innerText = "Total Paths: " + pathList.length.toString()
  path_no.innerText = "Path No: " + cur_path.toString()

  total_nodes.innerText = "Total Nodes: " + pathList[cur_path].length
  node_no.innerText = "Node Index: 0"
  log_box.innerText = valMapList[cur_path].get(0)
  cur_node = 0
}

// click LastPath
document.getElementById('next_path').onclick = function() {
  if (cur_path + 1 < pathList.length) {
    cur_path = cur_path + 1
  } else {
    return
  }
  total_path = document.getElementById('total_path')
  path_no = document.getElementById('path_no')
  total_nodes = document.getElementById('total_nodes')
  node_no = document.getElementById('node_no')
  log_box = document.getElementById('log_box')
  icfg_path = document.getElementById('icfg_path')
  icfg_path.innerText = pathList[cur_path].toString()

  total_path.innerText = "Total Paths: " + pathList.length.toString()
  path_no.innerText = "Path No: " + cur_path.toString()
  total_nodes.innerText = "Total Nodes: " + pathList[cur_path].length

  node_no.innerText = "Node Index: 0"
  log_box.innerText = valMapList[cur_path].get(0)
  cur_node = 0
}

// click LastNode
document.getElementById('last_node').onclick = function() {
  const node_len = pathList[cur_path].length
  if (cur_node -1 >=0) {
    cur_node = cur_node -1
  } else {
    return
  }
  node_no = document.getElementById('node_no')
  log_box = document.getElementById('log_box')
  icfg_path.innerText = pathList[cur_path].toString()

  node_no.innerText = "Node Index: " + cur_node.toString()
  log_box.innerText = valMapList[cur_path].get(cur_node)
}

// click LastNode
document.getElementById('next_node').onclick = function() {
  const node_len = pathList[cur_path].length
  if (cur_node + 1 < node_len) {
    cur_node = cur_node + 1
  } else {
    return
  }
  node_no = document.getElementById('node_no')
  log_box = document.getElementById('log_box')
  icfg_path.innerText = pathList[cur_path].toString()

  node_no.innerText = "Node Index: " + cur_node.toString()
  log_box.innerText = valMapList[cur_path].get(cur_node

  )
}
