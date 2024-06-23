import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import sampleData from "./sample-data.json"
import { format, parseISO } from 'date-fns';

import { Button, Stack } from '@mui/material';

import ColumnVisibilitySidebar from './sidebars/ColumnVisibilitySidebar';
import GroupingSidebar from "./sidebars/GroupingSidebar";
import SortingSidebar from './sidebars/SortingSidebar';
import FilterSidebar from './sidebars/FilterSidebar';

import './App.css';

function App() {

	const uniqueCategories = useMemo(() => [...new Set(sampleData.map(item => item.category))], []);
	const uniqueSubCategories = useMemo(() => [...new Set(sampleData.map(item => item.subcategory))], []);

	const columns = useMemo(() => [
		{ accessorKey: "id", header: "ID" },
		{ accessorKey: "name", header: "Name" },
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
		renderTopToolbarCustomActions: () => 
			<Stack direction="row" gap={2}>
				<Button
					onClick={() => handleDrawerOpen('visibility')}
					// startIcon={<ViewColumnIcon />}
				>
					Columns
				</Button>
				<Button
					onClick={() => handleDrawerOpen("grouping")}
					// startIcon={<GroupIcon />}
	  			>
	    				Grouping
	  			</Button>
				<Button
					onClick={() => handleDrawerOpen("sorting")}
					// startIcon={<SortIcon />}
				>
					Sorting
				</Button>
				<Button
					onClick={() => handleDrawerOpen("filter")}
					// startIcon={<FilterListIcon />}
				>
					Filters
				</Button>
			</Stack>
		,

		state: { columnVisibility, grouping, sorting, columnFilters }, //manage columnVisibility state
  		onColumnVisibilityChange: setColumnVisibility,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,

    		enableFacetedValues: true,
		enableGlobalFilter: true,
		enableColumnDragging: false,
		enableToolbarInternalActions: false,
		enableFilteringByColumnDefault: false,
		enableColumnActions: false,
		paginationDisplayMode: "pages",
		editDisplayMode: "dialog",
		muiPaginationProps: {
			variant: "outlined",
			shape: "rounded",
			showFirstButton: false,
			showLastButton: false,
			showRowsPerPage: false,
		},
		initialState: {pagination:{pageSize: 10, pageIndex: 0}}
	})

      const handleClearFilters = () => {
      	setColumnFilters([]);
      	setIsDrawerOpen(false);
    	};

	return (
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
					columns={columns}
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

			<MaterialReactTable table={table} className="custom-table" />


		</Container>
	);
}

export default App;