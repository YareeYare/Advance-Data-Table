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
			<Box sx={{ width: 400, p: 4 }}>
				<Box display="flex" justifyContent="space-between" alignItems="center" margin="5px">
					<Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#555555' }}>Show/Hide Columns</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon sx={{ fontSize: '30px', color: '#333333' }} />
					</IconButton>
				</Box>
				<List>
					{columns.map((column) => (
						<ListItem key={column.accessorKey} dense sx={{ border: '1px solid rgba(211, 211, 211, 0.5)', display: 'flex',justifyContent:'space-between', padding:'10px', margin:'5px' }}>
							<ListItemText primary={column.header} primaryTypographyProps={{ sx: { fontSize: '15px', color: '#666666' } }} />
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
					sx={{ padding:'10px',margin:'5px', textTransform: 'none', color: '#555555', fontSize: '15px'}}
				>
					Show all columns
				</Button>
				<Button 
					onClick={applyChanges} 
					color="primary" 
					fullWidth 
					variant="contained" 
					sx={{ padding:'10px',margin:'5px', textTransform: 'none', fontSize: '15px' }}
				>
					Apply
				</Button>
			</Box>
		</Drawer>
	);
};

export default ColumnVisibilitySidebar;