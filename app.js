const replace = async () => {
	const selectedNodes = figmaPlus.currentPage.selection;
	const newNodes = [];
	for (let selectedNode of selectedNodes) {
		figmaPlus.currentPage.selection = [selectedNode];
		App.triggerAction('create-symbol');
		App.triggerAction('duplicate-in-place');
		await new Promise(resolve => setTimeout(resolve, 30));
		const newNode = await figmaPlus.currentPage.selection[0].getProperties();
		newNodes.push(newNode);
		App.triggerAction('select-next-sibling');
		App.triggerAction('delete-selection');
	}
	figmaPlus.currentPage.selection = newNodes;
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

const replaceAndKeepSize = async () => {
	const selectedNodes = figmaPlus.currentPage.selection;
	const newNodes = [];
	for (let selectedNode of selectedNodes) {
		figmaPlus.currentPage.selection = [selectedNode];
		App.triggerAction('create-symbol');
		App.triggerAction('duplicate-in-place');
		await new Promise(resolve => setTimeout(resolve, 30));
		const newNode = await figmaPlus.currentPage.selection[0].getProperties();
		newNodes.push(newNode);
		App.updateSelectionProperties({ width: newNode.width + 1 });
		App.updateSelectionProperties({ width: newNode.width });
		App.triggerAction('select-next-sibling');
		App.triggerAction('delete-selection');
	}
	figmaPlus.currentPage.selection = newNodes;
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

figmaPlus.addCommand({
	label: 'Replace with Component',
	submenu: [{ label: 'Replace', action: replace }, { label: 'Replace and Keep Size', action: replaceAndKeepSize }],
	showInSelectionMenu: true
});
