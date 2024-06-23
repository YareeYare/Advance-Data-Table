import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import sampleData from "./sample-data.json"
import { format } from 'date-fns';

import { Button, Stack } from '@mui/material';

import ColumnVisibilitySidebar from './sidebars/ColumnVisibilitySidebar';
import GroupingSidebar from "./sidebars/GroupingSidebar";
import SortingSidebar from './sidebars/SortingSidebar';

import './App.css';

function App() {

	const columns = useMemo(() => [
		{ accessorKey: "id", header: "ID" },
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "category", header: "Category" },
		{ accessorKey: "subcategory", header: "Subcategory" },
		{ accessorKey: "createdAt", header: "Created At", Cell: ({ cell }) => format(new Date(cell.getValue()), 'dd-MMM-yyyy') },
		{ accessorKey: "updatedAt", header: "Updated At", Cell: ({ cell }) => format(new Date(cell.getValue()), 'dd-MMM-yyyy') },
		{ accessorKey: "price", header: "Price" },
		{ accessorKey: "sale_price", header: "Sale Price" },
	], []);
	const data = useMemo(() => sampleData, []);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerContent, setDrawerContent] = useState(null);
	const [grouping, setGrouping] = useState([]);
	const [sorting, setSorting] = useState([]);

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
		      </Stack>
		,

		state: { columnVisibility, grouping, sorting }, //manage columnVisibility state
  		onColumnVisibilityChange: setColumnVisibility,
		onSortingChange: setSorting,

		enableColumnDragging: false,
		enableFullScreenToggle: false,
		enableDensityToggle: false,
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

			<MaterialReactTable enableColumnVisibilityToggle table={table} className="custom-table" />


		</Container>
	);
}

export default App;