const replaceWithComponent = async () => {
	const selectedNodes = figmaPlus.scene.selection;
	const newNodes = [];
	for (let selectedNode of selectedNodes) {
		figmaPlus.scene.selection = [selectedNode];
		App.triggerAction('create-symbol');
		App.triggerAction('duplicate-in-place');
		await new Promise(resolve => setTimeout(resolve, 30));
		const newNode = await figmaPlus.scene.selection[0].getProperties();
		newNodes.push(newNode);
		App.updateSelectionProperties({ width: newNode.width + 1 });
		App.updateSelectionProperties({ width: newNode.width });
		App.triggerAction('select-next-sibling');
		App.triggerAction('delete-selection');
	}
	figmaPlus.scene.selection = newNodes;
	const instanceDropdown = document.querySelector('div[class*="instance_panel__REFRESH--symbolSelect--"]');
	App._dispatch({
		type: 'SHOW_DROPDOWN',
		payload: {
			type: 'instance-symbol-select',
			data: {
				clientRect: instanceDropdown.getBoundingClientRect()
			}
		}
	});
};

figmaPlus.createPluginsMenuItem('Replace with Component', replaceWithComponent);

figmaPlus.createContextMenuItem.Selection('Replace with Component', replaceWithComponent);
