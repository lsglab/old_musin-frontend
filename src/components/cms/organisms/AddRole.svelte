<script>
	/* eslint-disable no-param-reassign */
	import { onMount } from 'svelte';

	import Flex from '../../both/atoms/Flex.svelte';
	import Input from '../inputs/Input.svelte';
	import Loading from '../atoms/Loading.svelte';
	import Table from '../../../cms/Tables/table';
	import request from '../../../cms/Utils/requests';

	export let oldData;
	export let role;
	export let roleTable;
	export let id;

	let groups;
	let res;
	let selected;

	let domLoaded = false;

	const actions = ['read', 'read-self', 'edit', 'edit-self', 'delete', 'delete-self', 'create'];
	const columnActions = ['edit'];

	actions.forEach((ele, i) => {
		actions[i] = {
			action: ele,
			checked: false,
		};
	});

	columnActions.forEach((ele, i) => {
		columnActions[i] = {
			action: ele,
			checked: false,
		};
	});

	function fillPermissions(tables) {
		tables.forEach((table) => {
			table.open = false;
			table.role_permissions = [];
			table.column_permissions = [];
			actions.forEach((action) => {
				const perm = {
					action: action.action,
					role_id: role.id,
					table: table.table,
				};

				const find = role.permissions.find((per) => {
					return per.table === perm.table && per.action === perm.action;
				});

				if (find !== undefined) {
					perm.checked = true;
					perm.id = find.id;
				} else {
					perm.checked = false;
					perm.id = null;
				}
				table.role_permissions.push(perm);
			});
			columnActions.forEach((action) => {
				table.getColumnNames(table.getEditable()).forEach((column) => {
					const perm = {
						action: action.action,
						column,
						role_id: role.id,
						table: table.table,
					};

					const find = role.column_permissions.find((per) => {
						return per.table === perm.table && per.action === perm.action && per.column === perm.column;
					});

					if (find !== undefined) {
						perm.checked = false;
						perm.id = find.id;
					} else {
						perm.checked = true;
						perm.id = null;
					}

					table.column_permissions.push(perm);
				});
			});
		});
		return tables;
	}

	async function fetchGroups() {
		res = await request(`${process.globals.apiUrl}/groups`, 'get', {}, true);

		if (!res.error) {
			const grouped = res.data.groups;

			for (let i = 0; i < grouped.length; i += 1) {
				const group = grouped[i];
				group.tables = Object.values(group.tables);

				for (let j = 0; j < group.tables.length; j += 1) {
					group.tables[j] = new Table(group.tables[j]);
				}

				group.tables = fillPermissions(group.tables);
			}

			groups = grouped;
			selected = groups[0].title;
		}
	}

	function tableUpdate(table) {
		table.role_permissions.forEach((per) => {
			per.checked = !table.checked;
		});
	}

	function columnActionUpdate(action, table) {
		if (groups === undefined) return;

		table.column_permissions
			.filter((ele) => ele.action === action.action)
			.forEach((per) => {
				per.checked = !action.checked;
			});
		// eslint-disable-next-line no-self-assign
		groups = groups;
	}

	function actionUpdate(action) {
		if (groups === undefined) return;
		groups
			.filter((group) => group.title === selected)
			.forEach((group) => {
				group.tables.forEach((table) => {
					const find = table.role_permissions.find((per) => per.action === action.action);
					find.checked = !action.checked;
				});
			});
		groups = groups;
	}

	function tabChange() {
		actions.forEach((ele) => {
			ele.checked = false;
		});
	}

	function permissionsChanged() {
		if (groups === undefined) return;
		const permissions = [];
		const columnPermissions = [];
		groups.forEach((group) => {
			group.tables.forEach((table) => {
				table.role_permissions.forEach((per) => {
					if (per.checked) {
						permissions.push(per);
					}
				});
				table.column_permissions.forEach((per) => {
					if (!per.checked) {
						columnPermissions.push(per);
					}
				});
			});
		});
		role.column_permissions = columnPermissions;
		role.permissions = permissions;
		role = role;
	}

	async function roleChanged() {
		if (!domLoaded) return;
		await fetchGroups();
		permissionsChanged();
		oldData = JSON.parse(JSON.stringify(role));
	}

	$: permissionsChanged(groups);
	$: tabChange(selected);

	onMount(() => {
		domLoaded = true;
		roleChanged();
	});
</script>

<style lang="scss">
	td,
	th {
		@apply p-1 text-xss font-bold;
	}

	.rotate {
		transform: rotate(-90deg);
	}
</style>

<div class="w-full shadow-cms-equal-sm">
	{#if res === undefined}
		<Flex classes="w-full p-5" align="center" justify="center">
			<Loading />
		</Flex>
	{:else if groups !== undefined}
		<Flex classes="w-full" align="center">
			{#each groups as group}
				<div
					style="width: {100 / groups.length}%;"
					class="p-2 transition-none {group.title === selected ? 'bg-white border-cmsBtnColor' : 'bg-gray-100 border-gray-100'} border-t-2 cursor-pointer text-xs font-bold text-center"
					on:click="{() => {
						selected = group.title;
					}}">
					{group.title}
				</div>
			{/each}
		</Flex>
		{#each groups as group}
			{#if selected === group.title}
				<div class="p-4">
					<table class="w-full">
						<thead>
							<th></th>
							<th></th>
							{#each actions as action}
								<th>
									<Input
										id="{action.action}"
										on:click="{() => {
											actionUpdate(action);
										}}"
										readonly="{roleTable.getReadOnly(id)}"
										bind:value="{action.checked}"
										labelClasses="font-bold text-xss capitalize"
										type="checkbox"
										labelPos="right">
										{action.action}
									</Input>
								</th>
							{/each}
						</thead>
						<tbody>
							{#each group.tables as table, i}
								<tr class="{i % 2 === 0 ? 'bg-gray-100' : ''}">
									<td>
										<Input
											on:click="{() => {
												tableUpdate(table);
											}}"
											bind:value="{table.checked}"
											readonly="{roleTable.getReadOnly(id)}"
											id="table-{table.table}"
											type="checkbox"
											labelPos="right"
											labelClasses="text-xss font-bold capitalize">
											{table.table}
										</Input>
									</td>
									<td></td>
									{#each table.role_permissions as perm}
										<td>
											<Input
												bind:value="{perm.checked}"
												readonly="{roleTable.getReadOnly(id)}"
												id="p-{table.table}-{perm.action}"
												type="checkbox" />
										</td>
									{/each}
									<td
										on:click="{() => {
											table.open = !table.open;
										}}"
										class="duration-100 cursor-pointer hover:bg-gray-200">
										<span
											class="{table.open ? '' : 'rotate'} w-full h-full text-center material-icons">
											expand_more
										</span>
									</td>
								</tr>
								{#if table.open}
									<tr>
										<td></td>
										<td>Column Permissions</td>
										<td></td>
										<td></td>
										{#each columnActions as action}
											<td>
												<Input
													on:click="{() => {
														columnActionUpdate(action, table);
													}}"
													bind:value="{action.checked}"
													readonly="{roleTable.getReadOnly(id)}"
													id="{table.table}-column-action-{action}"
													labelPos="right"
													labelClasses="capitalize text-xss font-bold "
													type="checkbox">
													{action.action}
												</Input>
											</td>
										{/each}
									</tr>
									{#each table.getEditable() as column}
										<tr>
											<td></td>
											<td class="text-gray-700">{column.name}</td>
											<td></td>
											<td></td>
											{#each table.column_permissions.filter((ele) => ele.column === column.name) as column_permission}
												<td>
													<Input
														bind:value="{column_permission.checked}"
														readonly="{roleTable.getReadOnly(id)}"
														id="{table.table}-column-{column.name}"
														type="checkbox" />
												</td>
											{/each}
										</tr>
									{/each}
								{/if}
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		{/each}
	{/if}
</div>
