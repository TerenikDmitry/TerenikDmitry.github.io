let nodes;
let edges;
let options;

let icon_server = '\uf233';
let icon_storage = '\uf0a0';
let icon_cloud = '\uf0c2';
let icon_inbox = '\uf01c';
let icon_user = '\uf007';

let nodes_start = [{
    id: 2,
    label: 'Level 2-1',
    group: 'lvl2',
    level: 1
}, {
    id: 3,
    label: 'Level 2-2',
    group: 'lvl2',
    level: 1
}, {
    id: 4,
    label: 'Level 2-1-1',
    group: 'lvl1',
    level: 2
}, {
    id: 5,
    label: 'Level 2-2-1',
    group: 'lvl1',
    level: 2
}, {
    id: 6,
    label: 'Level 2-2-2',
    group: 'lvl1',
    level: 2
}, {
    id: 7,
    label: 'Storage for level 2-1-1',
    group: 'storage',
    level: 3
}, {
    id: 8,
    label: 'Storage for level 2-2-1',
    group: 'storage',
    level: 3
}, {
    id: 9,
    label: 'Storage for level 2-2-2',
    group: 'storage',
    level: 3
}];

let edges_start = [{
    id: 3,
    from: 4,
    to: 2,
    arrows: 'to'
}, {
    id: 4,
    from: 5,
    to: 3,
    arrows: 'to'
}, {
    id: 5,
    from: 6,
    to: 3,
    arrows: 'to'
}, {
    id: 6,
    from: 7,
    to: 4,
    dashes: true
}, {
    id: 7,
    from: 8,
    to: 5,
    dashes: true
}, {
    id: 8,
    from: 9,
    to: 6,
    dashes: true,
}, {
    id: 103,
    from: 2,
    to: 4,
    arrows: 'to'
}, {
    id: 104,
    from: 3,
    to: 5,
    arrows: 'to'
}, {
    id: 105,
    from: 3,
    to: 6,
    arrows: 'to'
}
];

let options_start = {
    nodes: {
        shape: 'icon',
        icon: {
            face: 'FontAwesome',
            code: icon_server,
            size: 30,
        }
    },
    layout: {
        hierarchical: {
            levelSeparation: 130,
            direction: 'UD',
            sortMethod: 'directed'
        }
    },
    physics: true,
    groups: {
        lvl3: {
            color: '#ffd532',
            icon: {
                color: '#ffd532'
            }
        },
        lvl2: {
            color: '#50b738',
            icon: {
                color: '#50b738'
            }
        },
        lvl1: {
            color: '#2B7CE9',
            icon: {
                color: '#2B7CE9'
            }
        },
        storage: {
            icon: {
                face: 'FontAwesome',
                code: icon_storage,
            }
        },
        middleware: {
            color: '#c00071',
            icon: {
                color: '#c00071',
                face: 'FontAwesome',
                code: icon_inbox,
            }
        }
    },
    interaction: {
        dragNodes: false,
        dragView: false
    },
    edges: {
        arrows: {
            to: {
                scaleFactor: 0.7
            }
        }, smooth: {
            type: 'curvedCW',
            roundness: 0.2
        },
        color: {
            inherit: 'from'
        },
        width: 1.5
    }
};

// create a network
let container = document.getElementById('main-diagram');


let form_mode = document.querySelector('#mode');
form_mode.onchange = changeModeHandler;

let form_level = document.querySelector('#level');
form_level.onchange = changeLevelHandler;

let form_mode_structure = document.querySelector('#mode-structure');
form_mode_structure.onchange = changeModeStructureHandler;


function clearStruct(){
    // start init array of Nodes and Edges
    nodes = new vis.DataSet(nodes_start);
    edges = new vis.DataSet(edges_start);
}

function add1() {
    nodes.add({
        id: 1,label:
        'Level 3',
        group: 'lvl3',
        level: 0
    });

    edges.add([
        {id: 1, from: 2, to: 1, arrows: 'to'},
        {id: 2, from: 3, to: 1, arrows: 'to'},
        {id: 101, from: 1, to: 2, arrows: 'to'},
        {id: 102, from: 1, to: 3, arrows: 'to'}
    ]);
}


function changeModeStructureHandler(event) {
    if (document.getElementById('mode-structure-1').checked) {
        clearStruct();

        add1();
    } else if (document.getElementById('mode-structure-2').checked) {
        clearStruct();

        nodes.add({
            id: 1,
            label: 'Level 3-1',
            group: 'lvl3',
            level: 0
        });
        nodes.add({
            id: 10,
            label: 'Level 3-2',
            group: 'lvl3',
            level: 0
        });

        edges.add([{
            id: 1,
            from: 2,
            to: 1,
            arrows: 'to'
        }, {
            id: 9,
            from: 3,
            to: 10,
            arrows: 'to'
        }, {
            id: 10,
            from: 10,
            to: 1,
            dashes: true
        }, {
            id: 109,
            from: 10,
            to: 3,
            arrows: 'to'
        }, {
            id: 101,
            from: 1,
            to: 2,
            arrows: 'to'
        }]);
    } else if (document.getElementById('mode-structure-3').checked) {
        clearStruct();

        add1();

        nodes.add({
            id: 10,
            label: 'Level 3-2',
            group: 'lvl3',
            level: 0
        });

        edges.add([ {
            id: 9,
            from: 3,
            to: 10,
            arrows: 'to'
        }, {
            id: 11,
            from: 2,
            to: 10,
            arrows: 'to'
        }, {
            id: 109,
            from: 10,
            to: 3,
            arrows: 'to'
        }, {
            id: 111,
            from: 10,
            to: 2,
            arrows: 'to'
        }]);
    } else if (document.getElementById('mode-structure-4').checked) {
        clearStruct();

        nodes.add({
            id: 1,
            label: 'Level 3-1',
            group: 'lvl3',
            level: -1
        });
        nodes.add([{
            id: 10,
            label: 'Level 3-2',
            group: 'lvl3',
            level: -1
        }, {
            id: 11,
            label: 'middleware',
            group: 'middleware',
            level: 0
        }]);


        edges.add([{
            id: 12,
            from: 11,
            to: 1,
            arrows: 'to'
        }, {
            id: 13,
            from: 11,
            to: 10,
            arrows: 'to'
        }, {
            id: 11,
            from: 10,
            to: 1,
            dashes: true
        }, {
            id: 14,
            from: 2,
            to: 11,
            arrows: 'to'
        }, {
            id: 15,
            from: 3,
            to: 11,
            arrows: 'to'
        }, {
            id: 112,
            from: 1,
            to: 11,
            arrows: 'to'
        }, {
            id: 113,
            from: 10,
            to: 11,
            arrows: 'to'
        }, {
            id: 114,
            from: 11,
            to: 2,
            arrows: 'to'
        }, {
            id: 115,
            from: 11,
            to: 3,
            arrows: 'to'
        }]);
    }

    changeLevelHandler(event);
}


function changeModeHandler(event) {
    if (document.getElementById('mode-1').checked) {
        options.nodes.icon.code = icon_server;
        nodes.add([{
            id: 7,
            label: 'Storage for level 2-1-1',
            group: 'storage',
            level: 3
        }, {
            id: 8,
            label: 'Storage for level 2-2-1',
            group: 'storage',
            level: 3
        }, {
            id: 9,
            label: 'Storage for level 2-2-2',
            group: 'storage',
            level: 3
        }]);
    } else if (document.getElementById('mode-2').checked) {
        options.nodes.icon.code = icon_cloud;
        nodes.remove(7);
        nodes.remove(8);
        nodes.remove(9);
    }

    changeLevelHandler(event);
}


function main() {
    options = options_start;

    clearStruct();
    add1();

    draw();
}


function changeLevelHandler(event) {

    // If the checkbox is not checked, delete nodes
    if (document.getElementById("checkbox-level-3").checked == false) {
        nodes.remove(1);
        nodes.remove(10);
        nodes.remove(11);
    };

    if (document.getElementById("checkbox-level-2").checked == false) {
        nodes.remove(2);
        nodes.remove(3);

        if (document.getElementById('mode-structure-1').checked) {
            edges.add([{
                id: 16,
                from: 4,
                to: 1,
                arrows: 'to'
            }, {
                id: 17,
                from: 5,
                to: 10,
                arrows: 'to'
            }, {
                id: 18,
                from: 6,
                to: 10,
                arrows: 'to'
            }, {
                id: 19,
                from: 5,
                to: 1,
                arrows: 'to'
            }, {
                id: 20,
                from: 6,
                to: 1,
                arrows: 'to'
            }, {
                id: 116,
                from: 1,
                to: 4,
                arrows: 'to'
            }, {
                id: 119,
                from: 1,
                to: 5,
                arrows: 'to'
            }, {
                id: 120,
                from: 1,
                to: 6,
                arrows: 'to'
            }]);
        } else if (document.getElementById('mode-structure-2').checked) {

        } else if (document.getElementById('mode-structure-3').checked) {

        } else if (document.getElementById('mode-structure-4').checked) {

        }
    };

    if (document.getElementById("checkbox-level-1").checked == false) {
        nodes.remove(4);
        nodes.remove(5);
        nodes.remove(6);

        edges.add([{
            from: 2,
            to: 7,
            dashes: true
        }, {
            from: 3,
            to: 8,
            dashes: true
        }, {
            from: 3,
            to: 9,
            dashes: true
        }]);
    };

    //  if(document.getElementById("checkbox-level-1").checked == false ||
    //     document.getElementById("checkbox-level-2").checked == false||
    //     document.getElementById("checkbox-level-3").checked == false){
    //     draw();
    // } else {
    //     draw();
    // }
}


function draw(){
    // provide the data in the vis format
    let data = {
        nodes: nodes,
        edges: edges
    };

    // initialize your network!
    network = new vis.Network(container, data, options);

    // network.animateTraffic([
    //     {edge:1, trafficSize:5},
    //     {edge:2, trafficSize:5},
    //     {edge:3, trafficSize:5}
    // ]);
}
