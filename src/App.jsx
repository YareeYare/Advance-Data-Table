
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import LayersIcon from '@mui/icons-material/Layers';
import {IconButton,Box} from '@mui/material';

import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import { MRT_TableContainer, MRT_TablePagination, useMaterialReactTable } from "material-react-table";
import sampleData from "./sample-data.json"
import { format, parseISO } from 'date-fns';

import { Button, Stack, TextField } from '@mui/material';

import ColumnVisibilitySidebar from './sidebars/ColumnVisibilitySidebar';
import GroupingSidebar from "./sidebars/GroupingSidebar";
import SortingSidebar from './sidebars/SortingSidebar';
import FilterSidebar from './sidebars/FilterSidebar';

import './App.css';

const GlobalSearchInput = ({ table }) => {
	const { setGlobalFilter } = table;
	return (
		<TextField
			placeholder="Search"
			onChange={(e) => setGlobalFilter(e.target.value)}
			inputProps={{ sx: { padding: '6px 0 6px 20px' } }}
		/>
	);
};

function App() {

	const uniqueCategories = useMemo(() => [...new Set(sampleData.map(item => item.category))], []);
	const uniqueSubCategories = useMemo(() => [...new Set(sampleData.map(item => item.subcategory))], []);

	const columns = useMemo(() => [
		{ accessorKey: "id", header: "ID", size: '50px' },
		{ accessorKey: "name", header: "Name"},
		{ accessorKey: "category", header: "Category",
	  		filterSelectOptions: uniqueCategories,
	  		filterVariant: 'multi-select',
		},
		{ accessorKey: "subcategory", header: "Subcategory",
	  		filterSelectOptions: uniqueSubCategories,
	  		filterVariant: 'multi-select',
		},
		{
		    accessorFn: (originalRow) => parseISO(originalRow.createdAt),
		    id: 'createdAt',
		    header: 'Created At',
		    filterVariant: 'date-range',
		    Cell: ({ cell }) => format(cell.getValue(), 'dd-MMM-yyyy'), 
		},
		{
		    accessorFn: (originalRow) => parseISO(originalRow.createdAt),
		    id: 'updatedAt',
		    header: 'Updated At',
		    filterVariant: 'date-range',
		    Cell: ({ cell }) => format(cell.getValue(), 'dd-MMM-yyyy'), 
		},
		{ accessorKey: "price", header: "Price",
			filterVariant: 'range-slider',
			muiFilterSliderProps: {
			    max: 200,
			    min: 11,
			},
			size: '100px',
		},
		{ accessorKey: "sale_price", header: "Sale Price",
			filterVariant: 'range-slider',
			muiFilterSliderProps: {
			    max: 200,
			    min: 11,
			},
			Cell: ({ cell }) => (cell.getValue() === -1 ? '' : cell.getValue()), // Display empty cell if value is -1
		},
	], []);

	const data = useMemo(() => sampleData.map(item => ({
		...item,
		price: item.price ?? 0, // Ensure price is a number
		sale_price: item.sale_price ?? -1, // Set undefined sale_price to -1
	})), []);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerContent, setDrawerContent] = useState(null);
	const [grouping, setGrouping] = useState([]);
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const handleDrawerOpen = (content) => {
		setDrawerContent(content);
		setIsDrawerOpen(true);
	};

	const [columnVisibility, setColumnVisibility] = useState({
		id: true,
		name: true,
		category: true,
		subcategory: true,
		createdAt: true,
		updatedAt: true,
		price: true,
		sale_price: true,
	});

	const table = useMaterialReactTable({
		columns,
		data,

		enableGrouping: true,

		state: { columnVisibility, grouping, sorting, columnFilters, globalFilter },
		onColumnVisibilityChange: setColumnVisibility,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,

		enableFilterMatchHighlighting: false,
		enableFacetedValues: true,
		enableGlobalFilter: true,
		enableColumnDragging: false,
		enableToolbarInternalActions: false,
		enableFilteringByColumnDefault: false,
		enableColumnActions: false,
		paginationDisplayMode: "pages",
		editDisplayMode: "dialog",

		muiTableProps: {
			sx: {
				tableLayout: 'auto',
				maxWidth: '80%',
				borderSpacing: '0',
			},
		},
		muiTableHeadProps: {
			sx: {
				padding: '0',
			}
		},
		muiTableBodyProps: {
			sx: {
				border: "none"
			},
		},
		muiTableHeadCellProps: {
			sx: {
				fontSize: '0.875rem',
				fontWeight: 'bold',
				maxWidth: 'fit-content',
				color: '#333',
				align: 'center',
				padding: '0'
			},
		},
		muiTableBodyCellProps: {
			sx: {
				fontSize: '0.875rem',
				width: 'auto',
				padding: '8px 0px 8px 0px',
			},
		},

		muiPaginationProps: {
			variant: "outlined",
			shape: "rounded",
			showFirstButton: false,
			showLastButton: false,
			showRowsPerPage: false,
			sx: () => ({
				"& .MuiPaginationItem-previousNext": {
					border: "none",
				}
			})
		},

		initialState: {pagination:{pageSize: 10, pageIndex: 0}}
	})

	const handleClearFilters = () => {
		setColumnFilters([]);
		setIsDrawerOpen(false);
    	};

	return (
		<div>
			<Container>
				{drawerContent === 'visibility' && 
					<ColumnVisibilitySidebar
						isOpen={isDrawerOpen}
						onClose={() => setIsDrawerOpen(false)}
						columns={columns}
						columnVisibility={columnVisibility}
						setColumnVisibility={setColumnVisibility}
					/>
				}

				{drawerContent === 'grouping' && 
					<GroupingSidebar
						isOpen={isDrawerOpen}
						onClose={() => setIsDrawerOpen(false)}
						grouping={grouping}
						setGrouping={setGrouping}
					/>
				}

				{drawerContent === 'sorting' && 
					<SortingSidebar
						isOpen={isDrawerOpen}
						onClose={() => setIsDrawerOpen(false)}
						columns={columns}
						sorting={sorting}
						setSorting={setSorting}
					/>
				}

				{drawerContent === 'filter' && 
					<FilterSidebar
						isOpen={isDrawerOpen}
						onClose={() => setIsDrawerOpen(false)}
						table={table}
						handleClearFilters={handleClearFilters}
					/>
				}
			</Container>

			<Box sx={{ width: '91%', marginTop: '120px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end', background:'white', padding:'5px'}}>
				<GlobalSearchInput table={table} />
				<IconButton
					onClick={() => handleDrawerOpen('visibility')}
				>
					<VisibilityOutlinedIcon />
				</IconButton>
				<IconButton
					onClick={() => handleDrawerOpen("sorting")}
				>
					<SwapVertIcon />
				</IconButton>
				<IconButton
					onClick={() => handleDrawerOpen("filter")}
				>
					<FilterListIcon />
				</IconButton>
				<IconButton
					onClick={() => handleDrawerOpen("grouping")}
				>
						<LayersIcon />
				</IconButton>
			</Box>


			<MRT_TableContainer table={table}
				sx={{
				  	width: '90%',
					margin: '0 auto',
					border: 'none',
					'& .MuiTableCell-head': {
      					borderTop: '1px solid rgba(224, 224, 224, 1)',
      					borderBottom: '1px solid rgba(224, 224, 224, 1)',
    					},
					'& .MuiTableCell-body': {
      					border: "none"
    					},
					'& .MuiTable-root': {
						borderSpacing: '0 0px',
						margin: '0 auto',
					},
					'& .MuiTableCell-root': {
						textAlign: 'center',
						padding: '0 0 2 0px',
					},
					'& .Mui-TableHeadCell-Content': {
						display: 'flex',
						justifyContent: 'center',	
					},
					'& .MuiTableRow-root': {
						boxShadow: 'none'
					},
				
				}}
			/>

			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background:'white', padding:'4px'}}>
				<MRT_TablePagination table={table} />
			</Box>
		</div>
	);
}

export default App;