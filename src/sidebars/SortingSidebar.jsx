// SortingSidebar.jsx
import React from 'react';
import { Drawer, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

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
		if (!sort) return <SwapVertIcon sx={{ color: '#a9a9a9' }} />;
		return sort.desc ? <SouthIcon sx={{ fontSize:18, color: '#a9a9a9' }}/> : <NorthIcon sx={{ fontSize:18, color: '#a9a9a9' }}/>;
	};

	return (
		<Drawer anchor="right" open={isOpen} onClose={onClose}>
			<div style={{ width: 400, padding: '40px' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin:'5px 0px 16px 5px' }}>
					<Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#555555' }}>Sorting Options</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseIcon sx={{ fontSize: '30px', color: '#333333' }} />
					</IconButton>
				</div>
				<List>
					{columns.map((column) => (
						<ListItem button onClick={() => handleSortingChange(column.accessorKey || column.id)} sx={{ border: '1px solid rgba(211, 211, 211, 0.5)', borderRadius:'5px', padding:'10px', margin:'5px', marginBottom:'20px' , border: '1px solid lightgrey', display: 'flex', alignItems: 'center'}}>
							<div style={{ color: '#333333', marginRight:'15px' }} > {column.header} </div>
							{getSortIcon(column.accessorKey || column.id)}
						</ListItem>
					))}
				</List>
				<Button fullWidth variant="outlined" onClick={() => setSorting([])} style={{ fontSize:16, marginTop: '16px', padding:'10px',margin:'5px' ,border: '2px solid lightblue', color:'#444444', textTransform: 'none' }}>
					Clear Sort
				</Button>
			</div>
		</Drawer>
	);
};

export default SortingSidebar;