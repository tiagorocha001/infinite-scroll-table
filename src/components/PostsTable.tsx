import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Post } from '../types';
import { TABLE_COLUMNS } from '../constants/tableColumns';

interface PostsTableProps {
  data: Post[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export const PostsTable: React.FC<PostsTableProps> = ({
  data,
  isLoading,
  isError,
  hasNextPage,
  fetchNextPage,
}) => {
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <Alert severity="error">
        An error occurred while fetching the data. Please try again later.
      </Alert>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((post) => (
              <TableRow hover key={post.id}>
                {TABLE_COLUMNS.map((column) => (
                  <TableCell key={column.id}>
                    {post[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <div ref={ref} style={{ height: 20 }} />
    </Paper>
  );
};