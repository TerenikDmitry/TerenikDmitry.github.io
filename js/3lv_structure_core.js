let nodes;
let edges;
let options;

// create a network
let container = document.getElementById('main-diagram');

let icon_server = '\uf327';
let icon_server2 = '\uf369';
let icon_storage = '\uf429';
let icon_storage2 = '\uf180';
let icon_cloud = '\uf2c9';
let icon_inbox = '\uf01c';
let icon_user = '\uf2d6';

let options_start = {
	nodes: {
		shape: 'icon',
		icon: {
			face: 'Ionicons',
			code: icon_server,
			size: 35,
		},
		font: {
			size: 19,
			vadjust: 10,
			strokeWidth: 8, 
			strokeColor: 'white'
		}
	},
	layout: {
		hierarchical: {
			nodeSpacing: 75,
			treeSpacing: 75,
			direction: 'UD',
			sortMethod: 'directed'
		}
	},
	physics: false,
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
			},
		},
		lvl1: {
			color: '#2B7CE9',
			icon: {
				color: '#2B7CE9'
			}
		},
		user: {
			color: '#e91349',
			icon: {
				color: '#e91349',
				face: 'Ionicons',
				code: icon_user,
			}
		},
		storage: {
			icon: {
				face: 'Ionicons',
				code: icon_storage,
			}
		},
		middleware: {
			color: '#c00071',
			icon: {
				color: '#c00071',
				face: 'Ionicons',
				code: icon_inbox,
			}
		}
	},
	interaction: {
		dragNodes: false
	},
	edges: {
		arrows: {
			to: {
				scaleFactor: 0.7
			}
		}, 
		smooth: {
			type: 'curvedCW',
			roundness: 0.15
		},
		color: {
			inherit: 'from'
		},
		width: 1.1
	}
};



let form_mode_structure = document.querySelector('#mode-structure');
form_mode_structure.onchange = changeModeStructureHandler;

let form_level = document.querySelector('#level');
form_level.onchange = changeLevelHandler;


function main() {
	options = options_start;
	startInit();
	draw();
}

function startInit() {
	nodes = new vis.DataSet();
	edges = new vis.DataSet();

	nodes.add({
		id: 1,
		label: 'main',
		group: 'lvl3',
		level: 0
	});

	for (let i = 11; i <= 14; i++) {
		nodes.add({
			id: i,
			label: 'region \n#'+i,
			group: 'lvl2',
			level: 1
		});
		edges.add({id: i, from: 1, to: i, arrows: 'middle'});
		edges.add({id: 'b'+i, from: i, to: 1, arrows: 'middle'});

		let j_start = 100 * (i-10) + i;
		let j_count = 2
		for (let j = j_start; j < j_start+j_count; j++) {
			nodes.add({
				id: j,
				label: 'hospital \n# '+j,
				group: 'lvl1',
				level: 2
			});
			edges.add({id: j, from: i, to: j, arrows: 'middle'});
			edges.add({id: 'b'+j, from: j, to: i, arrows: 'middle'});

			nodes.add({
				id: 's'+j,
				label: 'storage\n of \nhospital \n# '+j,
				font: {
					vadjust: 25
				},
				group: 'storage',
				level: 3
			});
			nodes.add({
				id: 'u'+j,
				label: 'doctor\n from \nhospital \n# '+j,
				font: {
					vadjust: 25
				},
				group: 'user',
				level: 3
			});
			edges.add({id: 's'+j, from: j, to: 's'+j, dashes: true});
			edges.add({id: 'u'+j, from: j, to: 'u'+j, arrows: 'middle'});
			edges.add({id: 'ub'+j, from: 'u'+j, to: j, arrows: 'middle'});
		}
	}
}

function draw(){
	// provide the data in the vis format
	let data = {
		nodes: nodes,
		edges: edges
	};

	// initialize your network!
	network = new vis.Network(container, data, options);
}

function changeModeStructure() {
	if (document.getElementById('mode-structure-1').checked) {
		startInit();
	} else if (document.getElementById('mode-structure-2').checked) {
		startInit();

		nodes.add({
			id: 2,
			label: 'main \ncopy 1',
			group: 'lvl3',
			level: 0
		});

		for (var i = 11; i <= 14; i++) {
			edges.add({id: i+10, from: 2, to: i, arrows: 'middle'});
			edges.add({id: 'b'+i+10, from: i, to: 2, arrows: 'middle'});
		}

		options.layout.hierarchical.blockShifting = false;
	} else if (document.getElementById('mode-structure-3').checked) {
		startInit();

		nodes.update({id: 1, label: 'main 1'});
		nodes.add({
			id: 2,
			label: 'main 2',
			group: 'lvl3',
			level: 0
		});

		edges.remove('13');
		edges.remove('14');
		edges.remove('b13');
		edges.remove('b14');
		edges.add({id: 23, from: 2, to: 13, arrows: 'middle'});
		edges.add({id: 'b'+23, from: 13, to: 2, arrows: 'middle'});
		edges.add({id: 24, from: 2, to: 14, arrows: 'middle'});
		edges.add({id: 'b'+24, from: 14, to: 2, arrows: 'middle'});

		edges.add({id: 10002, from: 1, to: 2, dashes: true});
	} else if (document.getElementById('mode-structure-4').checked) {
		startInit();

		nodes.update({id: 1, level: -1});
		nodes.add({
			id: 2,
			label: 'main \ncopy 1',
			group: 'lvl3',
			level: -1
		});

		nodes.add({
			id: 1000,
			label: 'middleware',
			group: 'middleware',
			level: 0
		});

		for (let i = 11; i <= 14; i++) {
			edges.remove(i);
			edges.remove('b'+i);
		}
		for (let i = 1001; i <= 1002; i++) {
			edges.add({id: i, from: 1000, to: i-1000, arrows: 'middle'});
			edges.add({id: 'b'+i, from: i-1000, to: 1000, arrows: 'middle'});
		}
		for (let i = 1011; i <= 1014; i++) {
			edges.add({id: i, from: 1000, to: i-1000, arrows: 'middle'});
			edges.add({id: 'b'+i, from: i-1000, to: 1000, arrows: 'middle'});
		}
	} else if (document.getElementById('mode-structure-5').checked) {
		startInit();
		nodes.update({id: 1, label: 'main 1'});

		for (let i = 2; i <= 4; i++) {
			nodes.add({
				id: i,
				label: 'main '+i,
				group: 'lvl3',
				level: 0
			});
		}
		for (let i = 2; i <= 4; i++) {
			let j = i*10 + i;
			edges.add({id: j, from: i, to: i+10, arrows: 'middle'});
			edges.add({id: 'b'+j, from: i+10, to: i, arrows: 'middle'});
		}

		for (let i = 12; i <= 14; i++) {
			edges.remove(i);
			edges.remove('b'+i);
		}

		edges.add({id: 10002, from: 1, to: 2, dashes: true});
		edges.add({id: 20003, from: 2, to: 3, dashes: true});
		edges.add({id: 30004, from: 3, to: 4, dashes: true});
	}
}

function changeModeStructureHandler(event) {
	options = options_start;
	changeModeStructure();
	changeLevel();
	draw();
}

function changeLevel(){
	/////////////////////////////////////////////////////////////////////////////
	// delete nodes
	//
	if (document.getElementById("checkbox-level-1").checked) {
		for (let i = 11; i <= 14; i++) {
			let j_start = 100 * (i-10) + i;
			let j_count = 2
			for (let j = j_start; j < j_start+j_count; j++) {
				nodes.remove(j);
			}
		}
	}
	if (document.getElementById("checkbox-level-2").checked) {
		for (let i = 11; i <= 14; i++) {
			nodes.remove(i);
		}
		/////////////////////////////////////////////////////////////////////////////
		// (start) change level
		//
		let level_new = -1;
		if (document.getElementById("checkbox-level-1").checked){
			level_new = document.getElementById('mode-structure-4').checked ? 1 : 2;
		} else{
			level_new = document.getElementById('mode-structure-4').checked ? 0 : 1;
		}

		if(document.getElementById('checkbox-level-3-all').checked == false){
			if(document.getElementById('mode-structure-2').checked ||
				document.getElementById('mode-structure-3').checked){
				nodes.update({id: 2, level: level_new});
			}
			if(document.getElementById('mode-structure-5').checked){
				nodes.update({id: 2, level: level_new});
				nodes.update({id: 3, level: level_new});
				nodes.update({id: 4, level: level_new});
			}

			if(document.getElementById("checkbox-level-3-selectively").checked){
				if(document.getElementById('mode-structure-4').checked){
					nodes.update({id: 1000, level: level_new+1});
					if(document.getElementById("checkbox-level-middleware").checked){
						nodes.update({id: 2, level: level_new+1});
					} else {
						nodes.update({id: 2, level: level_new});
						nodes.update({id: 1000, level: level_new+1});
					}
				}
			} else {
				nodes.update({id: 1, level: level_new});
				
				if(document.getElementById('mode-structure-4').checked){
					if(document.getElementById("checkbox-level-middleware").checked){
						nodes.update({id: 1, level: level_new+1});
						nodes.update({id: 2, level: level_new+1});
					} else {
						nodes.update({id: 2, level: level_new});
						nodes.update({id: 1000, level: level_new+1});
					}
				}
			}
		} else if (document.getElementById('mode-structure-4').checked){
			nodes.update({id: 1000, level: level_new+1});
		}
		//
		// (end) change level
		/////////////////////////////////////////////////////////////////////////////
	}
	if (document.getElementById("checkbox-level-3-all").checked) {
		for (let i = 1; i <= 4; i++) {
			nodes.remove(i);
		}
	}
	if (document.getElementById("checkbox-level-3-selectively").checked) {
		nodes.remove(1);
	}
	if (document.getElementById("checkbox-level-middleware").checked) {
		nodes.remove(1000);
	}
	/////////////////////////////////////////////////////////////////////////////
	// change edges
	//
	if(document.getElementById("checkbox-level-3-selectively").checked == false){
		if (document.getElementById("checkbox-level-1").checked) {
			if (document.getElementById("checkbox-level-2").checked == false) {
				// del 			1-lvl
				// available	2-lvl
				for (let i = 11; i <= 14; i++) {
					let j_start = 100 * (i-10) + i;
					let j_count = 2
					for (let j = j_start; j < j_start+j_count; j++) {
						nodes.update({id: 's'+j, level: 2});
						nodes.update({id: 'u'+j, level: 2});

						edges.add({id: 'd1_s'+j, from: i, to: 's'+j, dashes: true});

						edges.add({id: 'd1_u'+j, from: i, to: 'u'+j, arrows: 'middle'});
						edges.add({id: 'd1_ub'+j, from: 'u'+j, to: i, arrows: 'middle'});
					}
				}
			} else{
				if(document.getElementById('mode-structure-1').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_m1_s'+j, from: 1, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m1_u'+j, from: 1, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m1_ub'+j, from: 'u'+j, to: 1, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-2').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_m21_s'+j, from: 1, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m21_u'+j, from: 1, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m21_ub'+j, from: 'u'+j, to: 1, arrows: 'middle'});

							edges.add({id: 'd1_d2_m22_s'+j, from: 2, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m22_u'+j, from: 2, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m22_ub'+j, from: 'u'+j, to: 2, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-3').checked){
					for (let i = 11; i <= 12; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_m31_s'+j, from: 1, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m31_u'+j, from: 1, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m31_ub'+j, from: 'u'+j, to: 1, arrows: 'middle'});
						}
					}
					for (let i = 13; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_m32_s'+j, from: 2, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m32_u'+j, from: 2, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m32_ub'+j, from: 'u'+j, to: 2, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-4').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_m4_s'+j, from: 1000, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m4_u'+j, from: 1000, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m4_ub'+j, from: 'u'+j, to: 1000, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-5').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_m5_s'+j, from: i-10, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m5_u'+j, from: i-10, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m5_ub'+j, from: 'u'+j, to: i-10, arrows: 'middle'});
						}
					}
				}
			}
		} else{
			if(document.getElementById("checkbox-level-2").checked){
				if(document.getElementById('mode-structure-1').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_m1_to_main_'+j, from: 1, to: j, arrows: 'middle'});
							edges.add({id: 'd2_m1_from_main_'+j, from: j, to: 1, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-2').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_m2_to_main_'+j, from: 1, to: j, arrows: 'middle'});
							edges.add({id: 'd2_m2_from_main_'+j, from: j, to: 1, arrows: 'middle'});

							edges.add({id: 'd2_m2_to_copy_'+j, from: 2, to: j, arrows: 'middle'});
							edges.add({id: 'd2_m2_from_copy_'+j, from: j, to: 2, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-3').checked){
					for (let i = 11; i <= 12; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_m3_to_main_'+j, from: 1, to: j, arrows: 'middle'});
							edges.add({id: 'd2_m3_from_main_'+j, from: j, to: 1, arrows: 'middle'});
						}
					}
					for (let i = 13; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_m3_to_copy_'+j, from: 2, to: j, arrows: 'middle'});
							edges.add({id: 'd2_m3_from_copy_'+j, from: j, to: 2, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-5').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_m5_'+j, from: i-10, to: j, arrows: 'middle'});
							edges.add({id: 'd2_m5_from_'+j, from: j, to: i-10, arrows: 'middle'});
						}
					}
				}
			}
		}
	} else {
		if (document.getElementById("checkbox-level-1").checked) {
			if (document.getElementById("checkbox-level-2").checked == false) {
				// del 			1-lvl
				// available	2-lvl
				for (let i = 11; i <= 14; i++) {
					let j_start = 100 * (i-10) + i;
					let j_count = 2
					for (let j = j_start; j < j_start+j_count; j++) {
						edges.add({id: 'd1_sel_s'+j, from: i, to: 's'+j, dashes: true});
						edges.add({id: 'd1_sel_u'+j, from: i, to: 'u'+j, arrows: 'middle'});
						edges.add({id: 'd1_sel_ub'+j, from: 'u'+j, to: i, arrows: 'middle'});
					}
				}
				if(document.getElementById('mode-structure-3').checked){
					for (let i = 11; i <= 12; i++) {
						edges.add({id: 'd1_sel_m3_u'+i, from: 2, to: i, arrows: 'middle'});
						edges.add({id: 'd1_sel_m3_ub'+i, from: i, to: 2, arrows: 'middle'});
					}
				}
				if(document.getElementById('mode-structure-5').checked){
					edges.add({id: 'd1_sel_m5_u', from: 2, to: 11, arrows: 'middle'});
					edges.add({id: 'd1_sel_m5_ub', from: 11, to: 2, arrows: 'middle'});
				}
			} else{
				if(document.getElementById('mode-structure-2').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_sel_m22_s'+j, from: 2, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_sel_m22_u'+j, from: 2, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_sel_m22_ub'+j, from: 'u'+j, to: 2, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-3').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_sel_m32_s'+j, from: 2, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_sel_m32_u'+j, from: 2, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_sel_m32_ub'+j, from: 'u'+j, to: 2, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-4').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_sel_m4_s'+j, from: 1000, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_sel_m4_u'+j, from: 1000, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_sel_m4_ub'+j, from: 'u'+j, to: 1000, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-5').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd1_d2_m5_s'+j, from: i-10, to: 's'+j, dashes: true});
							edges.add({id: 'd1_d2_m5_u'+j, from: i-10, to: 'u'+j, arrows: 'middle'});
							edges.add({id: 'd1_d2_m5_ub'+j, from: 'u'+j, to: i-10, arrows: 'middle'});
						}
					}
					for (let i = 1; i <= 2; i++) {
						let j = 100 + (i*10) + 1;
						edges.add({id: 'd1_d2_sel_m51_s'+j, from: 2, to: 's'+j, dashes: true});
						edges.add({id: 'd1_d2_sel_m51_u'+j, from: 2, to: 'u'+j, arrows: 'middle'});
						edges.add({id: 'd1_d2_sel_m51_ub'+j, from: 'u'+j, to: i-10, arrows: 'middle'});

						j = 100 + (i*10) + 2;
						edges.add({id: 'd1_d2_sel_m52_s'+j, from: 2, to: 's'+j, dashes: true});
						edges.add({id: 'd1_d2_sel_m52_u'+j, from: 2, to: 'u'+j, arrows: 'middle'});
						edges.add({id: 'd1_d2_sel_m52_ub'+j, from: 'u'+j, to: 2, arrows: 'middle'});
					}
				}
			}
		} else {
			if(document.getElementById("checkbox-level-2").checked){
				if(document.getElementById('mode-structure-2').checked ||
					document.getElementById('mode-structure-3').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_d_sel'+j, from: 2, to: j, arrows: 'middle'});
							edges.add({id: 'd2_d_sel_b'+j, from: j, to: 2, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-4').checked){
					for (let i = 11; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_sel_m4_'+j, from: 1000, to: j, arrows: 'middle'});
							edges.add({id: 'd2_sel_m4_from_'+j, from: j, to: 1000, arrows: 'middle'});
						}
					}
				}
				if(document.getElementById('mode-structure-5').checked){
					for (let i = 12; i <= 14; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_sel_m5_'+j, from: i-10, to: j, arrows: 'middle'});
							edges.add({id: 'd2_sel_m5_from_'+j, from: j, to: i-10, arrows: 'middle'});
						}
					}
					for (let i = 11; i <= 11; i++) {
						let j_start = 100 * (i-10) + i;
						let j_count = 2
						for (let j = j_start; j < j_start+j_count; j++) {
							edges.add({id: 'd2_sel_m5_to_copy_'+j, from: 2, to: j, arrows: 'middle'});
							edges.add({id: 'd2_sel_m5_from_copy_'+j, from: j, to: 2, arrows: 'middle'});
						}
					}
				}
			} else {
				if(document.getElementById('mode-structure-3').checked){
					for (let i = 11; i <= 12; i++) {
						edges.add({id: 'sel_m3_to_copy_'+i, from: 2, to: i, arrows: 'middle'});
						edges.add({id: 'sel_m3_from_copy_'+i, from: i, to: 2, arrows: 'middle'});
					}
				}
				if(document.getElementById('mode-structure-4').checked){
					for (let i = 11; i <= 14; i++) {
						edges.add({id: 'sel_m3_to_copy_'+i, from: 1000, to: i, arrows: 'middle'});
						edges.add({id: 'sel_m3_from_copy_'+i, from: i, to: 1000, arrows: 'middle'});
					}
				}
				if(document.getElementById('mode-structure-5').checked){
					edges.add({id: 'sel_m5_to_copy_'+11, from: 2, to: 11, arrows: 'middle'});
					edges.add({id: 'sel_m5_from_copy_'+11, from: 11, to: 2, arrows: 'middle'});
				}
			}
		}
	}
}

function changeLevelHandler(event) {
	options = options_start;
	changeModeStructure();
	changeLevel();
	draw();
}
