import React, { useState } from 'react';
import { Drawer, Button, Typography, Box, IconButton, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GroupingSidebar = ({ isOpen, onClose, columns, grouping, setGrouping }) => {
	const [tempGrouping, setTempGrouping] = useState(grouping[0] || '');

	const handleGroupingChange = (event) => {
		setTempGrouping(event.target.value);
	};

	const clearGrouping = () => {
		setGrouping([]);
		onClose();
	};

	const applyGrouping = () => {
		setGrouping(tempGrouping ? [tempGrouping] : []);
		onClose();
	};

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={onClose}
		>
			<Box sx={{ width: 300, p: 2 }}>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h6">Create Groups</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseIcon />
					</IconButton>
				</Box>
				<Select
					value={tempGrouping}
					onChange={handleGroupingChange}
					displayEmpty
					fullWidth
					sx={{ mb: 2 }}
				>
					<MenuItem value="">Select a column</MenuItem>
					<MenuItem value="category">Category</MenuItem>
					<MenuItem value="subcategory">Subcategory</MenuItem>
				</Select>
				<Button onClick={clearGrouping} fullWidth variant="outlined" sx={{ mt: 2 }}>
					Clear Grouping
				</Button>
				<Button onClick={applyGrouping} color="primary" fullWidth variant="contained" sx={{ mt: 2 }}>
					Apply grouping
				</Button>
			</Box>
		</Drawer>
	);
};

export default GroupingSidebar;