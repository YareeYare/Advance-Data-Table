import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Switch, Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ColumnVisibilitySidebar = ({ isOpen, onClose, columns, columnVisibility, setColumnVisibility }) => {
	const [tempColumnVisibility, setTempColumnVisibility] = useState(columnVisibility);

	useEffect(() => {
		setTempColumnVisibility(columnVisibility);
	}, [columnVisibility]);

	const handleToggleColumn = (columnId) => {
		setTempColumnVisibility(prev => ({
			...prev,
			[columnId]: !prev[columnId]
		}));
	};

	const showAllColumns = () => {
		const allVisible = Object.fromEntries(columns.map(col => [col.accessorKey || col.id, true]));
		setTempColumnVisibility(allVisible);
	};

	const applyChanges = () => {
		setColumnVisibility(tempColumnVisibility);
		onClose();
	};

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={onClose}
		>
			<Box sx={{ width: 400, p: 2 }}>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h6">Show/Hide Columns</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseIcon />
					</IconButton>
				</Box>
				<List>
					{columns.map((column) => (
						<ListItem key={column.accessorKey} dense sx={{ border: '1px solid grey' }}>
							<ListItemText primary={column.header} />
							<Switch
								edge="start"
								checked={tempColumnVisibility[column.accessorKey || column.id]}
								onChange={() => handleToggleColumn(column.accessorKey  || column.id)}
							/>
						</ListItem>
					))}
				</List>
				<Button 
					onClick={showAllColumns} 
					fullWidth 
					variant="outlined" 
					sx={{ mt: 2 }}
				>
					Show all columns
				</Button>
				<Button 
					onClick={applyChanges} 
					color="primary" 
					fullWidth 
					variant="contained" 
					sx={{ mt: 2 }}
				>
					Apply
				</Button>
			</Box>
		</Drawer>
	);
};

export default ColumnVisibilitySidebar;