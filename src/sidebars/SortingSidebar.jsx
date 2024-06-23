// SortingSidebar.jsx
import React from 'react';
import { Drawer, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SortingSidebar = ({ isOpen, onClose, columns, sorting, setSorting }) => {
	const handleSortingChange = (columnId) => {
		const existingSortIndex = sorting.findIndex(sort => sort.id === columnId);
		if (existingSortIndex > -1) {
			const newSorting = [...sorting];
			if (newSorting[existingSortIndex].desc) {
				newSorting.splice(existingSortIndex, 1);
			} else {
				newSorting[existingSortIndex] = { id: columnId, desc: true };
			}
			setSorting(newSorting);
		} else {
			setSorting([...sorting, { id: columnId, desc: false }]);
		}
	};

	const getSortIcon = (columnId) => {
		const sort = sorting.find(s => s.id === columnId);
		if (!sort) return '↕';
		return sort.desc ? '↓' : '↑';
	};

	return (
		<Drawer anchor="right" open={isOpen} onClose={onClose}>
			<div style={{ width: 250, padding: '16px' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
					<Typography variant="h6">Sorting Options</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseIcon />
					</IconButton>
				</div>
				<List>
					{columns.map((column) => (
						<ListItem key={column.accessorKey} button onClick={() => handleSortingChange(column.accessorKey)}>
							<ListItemText primary={column.header} />
							<Typography>{getSortIcon(column.accessorKey)}</Typography>
						</ListItem>
					))}
				</List>
				<Button fullWidth variant="outlined" onClick={() => setSorting([])} style={{ marginTop: '16px' }}>
					Clear Sort
				</Button>
			</div>
		</Drawer>
	);
};

export default SortingSidebar;