import React, { useState } from 'react';
import { Drawer, Button, Typography, Box, IconButton, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GroupingSidebar = ({ isOpen, onClose, grouping, setGrouping }) => {
	const [tempGrouping, setTempGrouping] = useState(grouping[0] || '');

	const handleGroupingChange = (event) => {
		setTempGrouping(event.target.value);
	};

	const clearGrouping = () => {
		setTempGrouping('');
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
			<Box sx={{ width: 400, padding: '40px' }}>
				<Box display="flex" justifyContent="space-between" alignItems="center" pb={4} mb={2} sx={{borderBottom:'2px solid lightgrey'}}>
					<Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#555555' }}>Create Groups</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseIcon sx={{ fontSize: '30px', color: '#333333' }} />
					</IconButton>
				</Box>
				<Select
					value={tempGrouping}
					onChange={handleGroupingChange}
					displayEmpty
					fullWidth
					sx={{ mb: 2, color: tempGrouping ? 'inherit' : 'lightgrey' }}
					renderValue={(value) => (value ? value : 'Select a column')}
				>
					<MenuItem value="category">Category</MenuItem>
					<MenuItem value="subcategory">Subcategory</MenuItem>
				</Select>
				<Button onClick={clearGrouping} fullWidth variant="outlined" sx={{ fontSize:16, mt: 2, color:'#666666', textTransform: 'none' }}>
					Clear Grouping
				</Button>
				<Button onClick={applyGrouping} color="primary" fullWidth variant="contained" sx={{ fontSize:16, mt: 2, textTransform: 'none' }}>
					Apply grouping
				</Button>
			</Box>
		</Drawer>
	);
};

export default GroupingSidebar;